# Door Stations - Product Capabilities Document
name: product-capabilities
description: Core feature capabilities for the Door Station Integration

> **Source:** [Confluence](https://crestroneng.atlassian.net/wiki/spaces/CHOME/pages/2655060011/Door+Stations+-+Product+Capabilities+Document)  
> **Last Updated:** Version 78 — June 4, 2026

---

## Overview

The goal of this initiative is to establish first-class door station support in Crestron Home, beginning with the ability for homeowners to receive, answer, and act on doorbell and intercom events directly from the Crestron Home mobile application. This work lays the foundation for call-like mobile experiences, reliable visitor awareness, and secure remote access control, while remaining extensible to in-home touch panels and future hardware integrations.

At its core, this effort focuses on delivering a consistent, intuitive, and trustworthy door experience—whether the user is at home or away—by integrating door stations as native participants in the Crestron Home ecosystem rather than as isolated third-party devices. While the initial scope prioritizes essential, "must-just-work" functionality, the long-term vision includes richer automation, access control, and intelligence enabled by deeper door station integration.

This document represents an early, high-level view of the capabilities, phases, and possibilities enabled by door station integration. It is intended to guide discussion, inform architectural decisions, and align stakeholders on both near-term deliverables and longer-term direction across the supported hardware platforms.

---

## 💡 High Level Objectives

This section is an initial dump of ideas that are possible with the door station integration — a 30,000-foot view on the possibilities of what we _could_ do with different door station integrations.

### Supporting Documentation

- Early Mockups *(Needs Update)*: [Figma — Intercoms page](https://www.figma.com/design/uXgBee3HBSx5p05IaZ4oIT/Crestron-Home-4.0-UX?node-id=1207-79280)
- **Research & Designs**
  - Mobile Development: [Mobile Dev Confluence Page](https://crestroneng.atlassian.net/wiki/spaces/MobileDev/pages/2864381956)
  - Platform Development:
    - [CHOME Platform Page](https://crestroneng.atlassian.net/wiki/spaces/CHOME/pages/371064881)
    - [RESCLOUD Page 1](https://crestroneng.atlassian.net/wiki/spaces/RESCLOUD/pages/2811101302)
    - [RESCLOUD Page 2](https://crestroneng.atlassian.net/wiki/spaces/RESCLOUD/pages/2811494401)
- [2N HAPI Documentation](https://wiki.2n.com/hip/hapi/latest/en)
- [Ubiquiti Developer Site Manager](https://developer.ui.com/site-manager/v1.0.0/gettingstarted)
- Jira Initiative: [CHOME-113883](https://crestroneng.atlassian.net/browse/CHOME-113883)
- Jira Initiative for Intercom support (2024): [CHOME-56581](https://crestroneng.atlassian.net/browse/CHOME-56581)

### Basic Functionality (Table Stakes)

Things that should "just work" and are non-negotiable when door stations are integrated.

- Mobile push notifications and audio+video intercom that opens in the Crestron Home app when away from home
- Mobile phone calls and audio+video intercom that opens in the Crestron Home app when away from home
- Door & gate control — engage motors to open gates, doors, garages, etc.
- Lock control — unlock and lock the doors & gates locally & remotely
- Send temporary codes to let people in (deliveries, guests, etc.)
- Lighting Control
  - Scenes or actions performed when something happens at the door/gate
  - Turn on the light/spotlight when there is motion

### More Advanced Functionality

- Whole home audio integration so the "doorbell" rings through the entire house speaker system
- Geolocation support for recognizing when people are at home (to suppress mobile notifications)
- Video + Audio integration to displays & TVs

### Even More Advanced Functionality

- License plate recognition
- 911 override to let emergency personnel in automatically
- NFC Ubiquiti Key Fob access
- Ubiquiti Touch Pass support (Apple Wallet, Google Wallet)
- Biometrics — Fingerprint or Facial recognition for entry
- Logbook of visitors (or intruders?) — with pictures or video (security angle)

### Really, Really Advanced Functionality

- Intent detection — recognize the difference between a delivery (someone with a package) vs a solicitor (empty hands, clipboard)
- In Multiple Dwelling Units, access to package lockers for deliveries

---

## 🚪 Hardware Support

### Ubiquiti

**Hardware Procurement:** [SharePoint Spreadsheet](https://crestron1-my.sharepoint.com/:x:/g/personal/joster_crestron_com/IQAwKQzkmE3YSYmfUlv8BryIAYr-ytMk--pwPOXm3Tlx1yk?e=qcpCKa)

**Minimum Required Support:**
- Ubiquiti UniFi Access Doorbell or Intercom
- UDM Pro, UNVR, Cloud Key Gen2+, or Cloud Gateway Max
- UniFi Access Gate Hub or the UniFi Access Hub Mini
- UniFi Protect ViewPort (optional)

#### Targeted Hardware for First Release

- **Doorbell / Intercom:** [UVC-G6-Pro-Entry](https://techspecs.ui.com/unifi/door-access/uvc-g6-pro-entry?subcategory=door-access-readers)
- **Cloud Gateway:** [UCG-Max](https://techspecs.ui.com/unifi/cloud-gateways/ucg-max?subcategory=all-cloud-gateways)
- **Door Hub:** [UA-Hub-Door-Mini](https://techspecs.ui.com/unifi/door-access/ua-hub-door-mini?subcategory=all-door-access)
  - [Ubiquiti Help Center — Choosing a Door Access Hub](https://help.ui.com/hc/en-us/articles/23964054398871-Choosing-a-UniFi-Access-Control-Hub)

#### Supported Hardware for Future Releases

- More doorbell and intercom products
- UniFi Dream Machine
- [Ubiquiti Cameras](https://techspecs.ui.com/unifi/cameras-nvrs)
- [UniFi Viewport](https://techspecs.ui.com/unifi/cameras-nvrs/ufp-viewport?subcategory=all-cameras-nvrs)
- Ubiquiti Sensors
  - [Entry sensors (USL-Entry)](https://techspecs.ui.com/unifi/cameras-nvrs/usl-entry?subcategory=cameras-superlink-sensors)
  - [Motion sensors (USL-Motion)](https://techspecs.ui.com/unifi/cameras-nvrs/usl-motion?subcategory=cameras-superlink-sensors)
  - [Glass break sensor (USL-Glassbreak)](https://techspecs.ui.com/unifi/cameras-nvrs/usl-glassbreak?subcategory=cameras-superlink-sensors)

### 2N

#### Targeted Hardware for First Release

- **[2N IP Verso 2.0](https://www.2n.com/en-US/products/intercoms/2n-ip-verso-2/):** A highly modular "Unicorn" intercom with Full HD camera, night vision, and up to 30 custom modules (fingerprint, keypad, Bluetooth).
- **2N IP Solo:** A compact, stylish IP intercom ideal for smart home automation, featuring a hidden camera and high-definition audio.
- **[2N IP One](https://www.2n.com/en-US/products/intercoms/2n-ip-one/):** A highly durable IP video intercom designed to protect family homes.
- **[2N Security Relay](https://www.2n.com/en-US/products/security-relay)**

---

## 📖 User Stories

> ⚠️ **NOT Maintained** — **JIRA is the source of truth**

Jira Initiative: [CHOME-113883](https://crestroneng.atlassian.net/browse/CHOME-113883)

---

### 🖥️ Touch Panels: Basic Ubiquiti Functionality

**Goal:** Users that use Ubiquiti doorbell cameras and intercoms can respond to visitors from within the home. Touch panel "rings" when someone is at the door until someone answers — if answered from one panel, all other panels stop ringing.

Related Jira: [CHOME-113611](https://crestroneng.atlassian.net/browse/CHOME-113611)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Launch directly into the relevant call screen with live camera view from a door station press ([CHOME-113614](https://crestroneng.atlassian.net/browse/CHOME-113614)) | As a homeowner/resident, I want to launch directly into the relevant live camera view in the Crestron Home app from a door-related notification so that I can quickly assess the situation. | Homeowner, Resident | |
| Receive a persistent ring on my Crestron touch panel(s) when the doorbell is pressed ([CHOME-113615](https://crestroneng.atlassian.net/browse/CHOME-113615)) | As a homeowner/resident, I want to receive a persistent doorbell notification on my Crestron touch panel(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later. | Homeowner, Resident | The doorbell should prompt the user for actions: Answer / Ignore |
| Answer the call with two-way audio and one-way video from a Crestron touch panel ([CHOME-113616](https://crestroneng.atlassian.net/browse/CHOME-113616)) | As a homeowner/resident, I want to answer a doorbell call with two-way audio and one-way video from a Crestron touch panel so that I can interact with visitors while at home. | Homeowner, Resident | Touch panel auto-launches Call UI. User hears ring and sees one-way video stream. User can answer and establish two-way audio. |
| Trigger predefined quick actions during an active door call (unlock gate, open scenes, send PIN) ([CHOME-113622](https://crestroneng.atlassian.net/browse/CHOME-113622)) | As a homeowner/resident, I want to trigger predefined quick actions during an active door call so that I can manage access and environment conveniently. | Homeowner, Resident | Quick actions visible as overlay on active call video panel. Actions must be secure and logged. |
| View the door station and entry cameras live from the Crestron Home app ([CHOME-113621](https://crestroneng.atlassian.net/browse/CHOME-113621)) | As a homeowner/resident, I want to view the door station and entry cameras live from the Crestron Home app on my touch panel(s) so that I can monitor my property in real time. | Homeowner, Resident | Camera visible on Whole House Camera page after commissioning. Snapshot and Camera Stream available. Should populate automatically. |

#### ➕ Touch Panels: More Advanced Ubiquiti Functionality (Release 2)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Stop ringing all touch panels when one other panel answers the door ring | As a homeowner/resident, I want the system to stop ringing all touch panels when one panel answers the door ring so that I am not disturbed by multiple notifications. | End-User | Detect that 1 active panel has answered the call. End calls on all other panels receiving the call. |

---

### 🔧 Commissioning of the Door Stations

**Goal:** Dealers/Installers can detect, configure, and setup devices in Configure Pro when connected to a Crestron processor.

Related Jira: [CHOME-113671](https://crestroneng.atlassian.net/browse/CHOME-113671)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Commission — Recognize and configure Ubiquiti door station device settings ([CHOME-113676](https://crestroneng.atlassian.net/browse/CHOME-113676)) | As a dealer, I want to be able to commission Ubiquiti devices into the Crestron Home processor & ecosystem so they can be programmed. | Dealer, Installer | Commission the devices in Configure Pro. Auto-discover or manually add device driver. |
| Device Details — Show device model, firmware version, etc. ([CHOME-113677](https://crestroneng.atlassian.net/browse/CHOME-113677)) | As a dealer, I want to see the information about the door station(s) such as the serial number and firmware version. | Dealer, Installer | About tab in Configure Pro: device manufacturer, model, driver & firmware version, online/offline status, signal strength, PoE/power state. |

---

### ✅ Mobile: Basic Functionality (Table Stakes — "Must Just Work")

**Goals & Measurements:**
- % of doorbell calls answered remotely (mobile/panel)
- Average time from doorbell press to call answer
- % of unlock/gate actions performed remotely
- Doorbell-to-notification latency
- Intercom connection setup time
- Unlock command acknowledgment time

Related Jira: [CHOME-113680](https://crestroneng.atlassian.net/browse/CHOME-113680)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Receive a push notification on my mobile device(s) when Door Station button is pressed | As a homeowner/resident, I want to receive a push notification on my mobile device(s) when a doorbell is pressed so that I can quickly decide whether to answer, ignore, or review later. | Homeowner, Resident | Standard mobile OS push notification. Received within 1 second. Sent to iOS & Android. |
| Tapping the push notification for the doorbell opens the Crestron Home app notification action screen | As a homeowner/resident, I want to tap a doorbell notification and open the Crestron Home app and see & hear who is at the door. | Homeowner, Resident | Notification action screen launched on tap. One-way audio and video. Direct actions: Chat (two-way audio/video), Unlock/Lock the door. |
| Interact with the visitor via the Crestron Home App | As a homeowner/resident, I want a way to communicate with the visitor. | Homeowner, Resident | Enable two-way audio (and two-way video if supported) when Chat is chosen from the Notification Action screen. |
| Tapping a late notification launches the app and displays the door station camera | As a homeowner/resident, I want to tap a doorbell notification and open the Crestron Home app and see the camera even if someone is no longer at the door. | Homeowner, Resident | Same experience as if someone is at the door. |
| Receive a push notification on my mobile device(s) when motion is detected | As a homeowner/resident, I want to receive a push notification when motion is detected so that I can quickly decide my next action. | Homeowner, Resident | Standard push notification within 1 second, sent to iOS & Android. |
| Trigger predefined quick actions during an active door call | As a homeowner/resident, I want to trigger predefined quick actions during an active door call so that I can manage access and environment conveniently. | Homeowner, Resident | Quick actions visible as overlay on active call video panel. Actions must be secure and logged. |
| View the door station and entry cameras live from the Crestron Home app (mobile) | As a homeowner/resident, I want to view door station cameras live from the mobile app so that I can monitor my property in real time. | Homeowner, Resident | Camera visible on Whole House Camera page. Snapshot and Camera Stream available. 1-way audio available when viewing. Populates automatically on commissioning. |
| The owner selects who will get notifications for different scenarios | As a homeowner/resident, I want to invite others to respond to notifications and configure users for different notification types. | Homeowner, Resident | Notifications for users defined in the User section of CH end user app. |
| Default notifications on mobile devices | As a homeowner/resident, I expect visitor notifications to instantly tell me someone is at the door. | Homeowner, Resident | Default sound distinct from standard messages. Notifications should repeat/persist, offer immediate actions, and not be silent by default. |
| Use sensible default behaviors for alerts, lighting, and access without advanced configuration | As a homeowner/resident, I want sensible defaults out of the box. | Dealer, Homeowner, Resident | Defaults can be overridden. Specify defaults for alerts, lighting (scenes), and access control. |
| Control — Actuate gates, garage doors, or entry motors using door station controls | As a homeowner/resident, I want to actuate gates, garage doors, or entry motors so that I can grant access to visitors. | Homeowner, Resident | Send open/close commands for gates and garage doors. |
| Control other relay and IO devices with Ubiquiti IO | As a homeowner/resident, I want to control relay-controlled devices and sensors connected to my Ubiquiti devices. | | [Crestron Home Other Devices Docs](https://docs.crestron.com/en-us/8525/Content/CP4R/Installer-Config/Step-2/Other-Devices.htm) |
| Add relay control lock option in Configure Pro | | | Related: [CHOME-80924](https://crestroneng.atlassian.net/browse/CHOME-80924) — same functionality as garage/gates today. |
| Link Relay controlled lock to Ubiquiti door station for PIN code creation | As an end-user, I want the ability to generate codes that when used from my door station can control a lock. | Dealer | |
| Create PIN codes for locks controlled by Crestron or Ubiquiti I/O or Relays | | | Send a temporary PIN (for supported door stations). |
| Use Ubiquiti events, commands & feedback states within the Crestron Home programming ecosystem | As a homeowner/resident, I want to configure lighting scenes to run automatically when a doorbell is pressed or motion is detected. | Dealer, Homeowner, Resident | Add all commands to Sequences. Handle all device-specific events. Device properties supported in Conditionals and Variables. |
| Document device(s) in the Crestron Home OS Documentation — Third Party Devices section | As a dealer, I want to find what 3rd party products are available quickly via the Crestron Manual. | Dealer | |

---

### ➕ Mobile: More Advanced Functionality (Release 2 Differentiation)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Receive a push notification when motion is detected | As a homeowner/resident, I want a push notification when motion is detected so I can quickly decide my next action. | Homeowner, Resident | < 1s notification, iOS & Android, multiple devices. |
| Receive a push notification when noise is detected | As a homeowner/resident, I want a push notification when noise is detected. | Homeowner, Resident | < 1s notification, iOS & Android, multiple devices. |
| Receive a push notification when someone enters the home or passes through the gate | As a homeowner/resident, I want a push notification when someone enters the home. | Homeowner, Resident | < 1s notification, iOS & Android, multiple devices. |
| View a chronological log of door station events | As a homeowner/resident, I want to view a chronological log of door station events so that I can review activity at my entry points. | Homeowner, Resident | Log includes timestamps, event type, pictures/videos/audio. |
| Review captured visitor images and video associated with door events | As a homeowner/resident, I want to review captured visitor images and video so that I can verify who was at my door. | Homeowner, Resident | |
| Ring the doorbell through whole-home audio speakers | As a homeowner/resident, I want the doorbell to ring through whole-home audio speakers so that I can hear visitors from anywhere in the house. | Homeowner, Resident | |
| Route doorbell audio selectively to specific rooms or zones | As a homeowner/resident, I want to route doorbell audio selectively to specific rooms or zones. | Homeowner, Resident | Configurable routing. |
| Answer a doorbell call with two-way audio and video from the Crestron Home app on mobile | As a homeowner/resident, I want to answer a doorbell call with two-way audio and video from mobile so that I can interact with visitors remotely. | Homeowner, Resident | Works over Wi-Fi and cellular. |
| Use motion events at secondary doors or exterior cameras to trigger automations | As a homeowner/resident, I want motion events at secondary doors or exterior cameras to trigger automations. | Homeowner, Resident | Configurable zones and actions. |
| MDU — Access package lockers securely in multi-dwelling environments | As a property manager, I want residents to access package lockers securely. | Property Manager, MDU Resident | Integration with MDU access control. |
| MDU — Support independent access control and logging per unit | As a property manager, I want independent access control and logging per unit. | Property Manager, MDU Resident | Granular permissions and audit. |
| Vehicles — Recognize known vehicles via license plate detection | As a homeowner/resident, I want known vehicles recognized via license plate detection to trigger arrival automations. | Homeowner, Resident | Secure and configurable recognition. [Configuring License Plate Unlock in UniFi Access](https://help.ui.com/hc/en-us/articles/23903814413335-Configuring-License-Plate-Unlock-in-UniFi-Access) |
| Display live door station video and audio automatically on TVs | As a homeowner/resident, I want live door station video and audio to display automatically on TVs. | Homeowner, Resident | Configurable display zones. |
| Improved Camera page with Ubiquiti to start active 2-way session | | | Update existing camera pages to support starting 2-way call. |

---

### ⭐ Mobile: Even More Advanced Functionality (Premium Experience)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Unlock doors using facial recognition at the door station | As a homeowner/resident, I want to unlock doors using facial recognition so that I can gain entry quickly and securely. | Homeowner, Resident | Fast, accurate, secure biometric management. |
| Unlock doors using fingerprint authentication at the door station | As a homeowner/resident, I want to unlock doors using fingerprint authentication so that I can gain entry quickly and securely. | Homeowner, Resident | Fast, accurate, secure biometric management. |
| Allow emergency responders to unlock designated entries automatically during a 911 event | As an emergency responder, I want to unlock designated entries automatically during a 911 event for rapid access. | Emergency Responder, Homeowner, Resident | Secure, audited, and override-able. |
| Provide a complete audit trail for emergency access overrides | As a homeowner/resident, I want a complete audit trail for emergency access overrides. | Homeowner, Resident | Immutable logs. |
| Allow users to manage and delete biometric and recognition data | As a homeowner/resident, I want to manage and delete my biometric and recognition data. | Homeowner, Resident | Privacy controls, secure deletion. |

---

### 🚀 Mobile: Really Advanced Functionality (Platform Intelligence)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Detect and classify visitor intent (delivery, guest, solicitor) using video analysis | As a homeowner/resident, I want the system to detect and classify visitor intent so that I can better understand who is at my door. | Homeowner, Resident | AI/ML integration, configurable thresholds. |
| Adjust notifications and automations based on detected visitor intent | As a homeowner/resident, I want notifications and automations to adjust based on visitor intent. | Homeowner, Resident | Customizable rules per intent type. |
| Reduce unnecessary interruptions by suppressing routine or low-importance events | As a homeowner/resident, I want unnecessary interruptions reduced by suppressing routine events. | Homeowner, Resident | Configurable "do not disturb" and suppression rules. |
| Escalate alerts only when unusual or high-risk activity is detected | As a homeowner/resident, I want alerts to escalate only when unusual or high-risk activity is detected. | Homeowner, Resident | Contextual intelligence, configurable escalation paths. |

---

### 🔧 Health, Reliability, and Trust (Often Forgotten — but Critical)

| Jira Summary | User Story | Personas | Acceptance Criteria |
|---|---|---|---|
| Operate core door and access functions during temporary network or cloud outages | As a homeowner/resident, I want core door and access functions to operate during outages so that I am not locked out or left insecure. | Homeowner, Resident | Local fallback required. |
| Deliver fast and predictable response for doorbell, intercom, and unlock actions | As a homeowner/resident, I want fast and predictable response so that I can trust the system's reliability. | Homeowner, Resident | Performance SLAs. |
| Health Dashboard — See device health parameters | As a dealer, I want to see the health of all installed devices so that I can take preventative action. | Dealer | Online/Offline, Reboot. |
| Review door station connectivity and availability from a system health dashboard | As a homeowner/resident, I want to review door station connectivity and availability from a health dashboard. | Homeowner, Resident, Installer/Admin | Real-time status, diagnostics. |
| Detect and notify users of door station or camera offline states | As a homeowner/resident, I want to be notified of door station or camera offline states immediately. | Homeowner, Resident, Installer/Admin | Proactive alerts. |
| Ensure door and gate access defaults to a safe state during failures | As a homeowner/resident, I want door and gate access to default to a safe state during failures. | Homeowner, Resident, Installer/Admin | Fail-safe mechanisms, security audit. |
| Allow users to control retention and visibility of visitor history data | As a homeowner/resident, I want to control retention and visibility of visitor history data. | Homeowner, Resident, Installer/Admin | Privacy controls, data lifecycle management. |

---

## 📊 Measuring Outcomes

These outcomes should drive the Success Metrics — how do we know the integration was successful? **Bold** metrics feel like things that aren't too difficult to track.

| Release | Problem We Are Trying to Solve | Outcome | How It's Measured |
|---|---|---|---|
| 1 | Installers "shy away" from selling Crestron Home to homeowners that want away-from-home visitor notification and access control. | Installers are confident in Crestron's integration with door station partners (2N and Ubiquiti). | |
| 1 | Installers cannot easily discover and setup door station devices in the Home. | Installers can reliably discover supported door station devices in Configure Pro. Installers can configure and commission Ubiquiti and 2N door stations without custom programming. | |
| 1 | Homeowners cannot see, hear, or communicate with people at the door. | Homeowners can see and speak with visitors through Crestron Home — at home or away. | **% of doorbell calls answered remotely** / **Average time from doorbell press to call answer** / Ratio of missed doorbell events before vs after installation |
| 1 | Homeowners cannot grant access to visitors unless physically present. | Homeowners can unlock doors, open gates, and open garage doors remotely. | **% of unlock/gate actions performed remotely** / Unlocks during active calls |
| 1 | Homeowners are not reliably notified when someone is at the door or approaching the property. | Homeowners reliably notice visitors from anywhere in or outside the home and can assess who is at the door. | % of detection events acknowledged / Audio/visual alert delivery success rate / User-reported "missed visitor" complaints |
| 1 | Visitors go unnoticed when there is a system failure (e.g., network down). | Core door functionality works under failure conditions. | **Successful door events during network outages** / **% of unlock/gate actions completed offline** / **Failure recovery time after connectivity restoration** |
| 1 | Door interactions feel slow, unreliable, or disconnected from real-time. | Door interactions feel fast and responsive. | **Doorbell-to-notification latency** / **Intercom connection setup time** / **Unlock command acknowledgment time** |
| 2+ | | Users are not interrupted unnecessarily by the system. | **Notification open rate** / **Notification mute/disable rate** / Ratio of notifications to user actions taken |
| 2+ | | Users feel confident about who accessed their home. | **Frequency of visitor log views** / % of access events with associated identity / Reduction in "who came by?" support questions |
| 2+ | | Users understand system state at a glance. | Time spent on device status screens / Support tickets related to "is it locked/offline?" / Use of health dashboard |
| 2+ | | Routine access events are handled automatically. | **% of access events requiring no user interaction** / Automated vs manual unlock statistics / **Use of scenes or rules triggered by door events** |
| 2+ | | Users feel safer around entrances at night. | **Motion-triggered lighting activations at night** / **Time lights stay on after detection** / Reduction in user-initiated manual lighting actions |
| 2+ | | Users avoid managing multiple access apps. | % of access actions done from Crestron Home vs other apps / Reduction in external lock/app usage post-install |
| 2+ | | Users feel comfortable with privacy and data handling. | Use of log deletion/retention settings / Opt-in/opt-out rates for biometrics / Privacy-related support inquiries |
| 2+ | | System escalates attention only when needed. | % of alerts leading to action / Alerts classified as "high importance" vs total / False-positive feedback or dismissals |

---

## Appendix

### User Story Maps

[Big Picture (All Personas) User Story Map — Confluence Whiteboard](https://crestroneng.atlassian.net/wiki/spaces/CHOME/whiteboard/2663776299)

#### End User (Homeowner / Resident) User Story Map

**Backbone (activities for this user):** See → Decide → Act → Review → Forget

| See (Get Notified) | Decide | Act | Review | Forget (DND) |
|---|---|---|---|---|
| See & hear visitors when home (touch panel, phone, tablet). Get notifications from visitors when not at home. Lights turn on when door station is "pressed" or motion is detected. "Doorbell" rings on all room speakers. | How can the user gauge importance of the notification quickly to choose how to act (answer, ignore & review later)? | Ignore the notification. Talk to visitors via touch panels. Unlock the door/gate remotely. Send temporary PIN or QR code for entry. Open the garage door remotely. | Review missed or ignored events. Get a timeline of activity throughout the day or week. See who accessed the door and how. | Handle routine events without notification — unlock for package delivery. Configure system settings to notify without ringing or to ring once. |

---

*Exported from Confluence — Door Stations - Product Capabilities Document*
