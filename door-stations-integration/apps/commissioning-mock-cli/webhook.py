#!/usr/bin/env python3
"""Temporary LAN webhook receiver for 2N commissioning verification."""

from __future__ import annotations

import json
import queue
import threading
import time
from dataclasses import dataclass
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Optional
from urllib.parse import urlsplit


MAX_BODY_BYTES = 16 * 1024
WEBHOOK_PATH = "/webhook/2n"


@dataclass(frozen=True)
class ReceivedEvent:
    payload: dict
    source_ip: str
    received_at: float


class WebhookServer:
    def __init__(
        self,
        bind_ip: str,
        port: int,
        *,
        token: str,
        expected_device: Optional[str] = None,
    ) -> None:
        self.events: queue.Queue[ReceivedEvent] = queue.Queue()
        self.token = token
        self.expected_device = expected_device
        receiver = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, message_format, *args):
                return

            def _reply(self, status: int, body: bytes) -> None:
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_GET(self) -> None:
                if urlsplit(self.path).path != "/health":
                    self._reply(404, b'{"error":"not found"}')
                    return
                self._reply(200, b'{"status":"ok"}')

            def do_POST(self) -> None:
                if urlsplit(self.path).path != WEBHOOK_PATH:
                    self._reply(404, b'{"error":"not found"}')
                    return
                try:
                    length = int(self.headers.get("Content-Length", "0"))
                except ValueError:
                    self._reply(400, b'{"error":"invalid content length"}')
                    return
                if length <= 0 or length > MAX_BODY_BYTES:
                    self._reply(413, b'{"error":"invalid body size"}')
                    return
                try:
                    payload = json.loads(self.rfile.read(length))
                except (json.JSONDecodeError, UnicodeDecodeError):
                    self._reply(400, b'{"error":"invalid json"}')
                    return
                if not isinstance(payload, dict) or payload.get("token") != receiver.token:
                    self._reply(401, b'{"error":"unauthorized"}')
                    return
                if payload.get("event") != "button_pressed":
                    self._reply(422, b'{"error":"unexpected event"}')
                    return
                if receiver.expected_device and payload.get("device") != receiver.expected_device:
                    self._reply(422, b'{"error":"unexpected device"}')
                    return
                receiver.events.put(
                    ReceivedEvent(
                        payload=payload,
                        source_ip=self.client_address[0],
                        received_at=time.time(),
                    )
                )
                self._reply(200, b'{"accepted":true}')

        self.httpd = ThreadingHTTPServer((bind_ip, port), Handler)
        self.thread: Optional[threading.Thread] = None

    @property
    def port(self) -> int:
        return int(self.httpd.server_address[1])

    def start(self) -> None:
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()

    def wait(self, timeout: float) -> Optional[ReceivedEvent]:
        try:
            return self.events.get(timeout=timeout)
        except queue.Empty:
            return None

    def close(self) -> None:
        self.httpd.shutdown()
        self.httpd.server_close()
        if self.thread is not None:
            self.thread.join(timeout=2)

    def __enter__(self):
        self.start()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.close()