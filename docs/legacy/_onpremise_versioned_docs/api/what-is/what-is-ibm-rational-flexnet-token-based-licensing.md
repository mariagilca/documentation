---
title: IBM Rational FlexNet token-based licensing
sidebar_position: 10
description: Overview of IBM Rational FlexNet token-based licensing.
---

# Overview

This page explains the FlexNet components used by IBM Rational products and how token-based licensing works.

## FlexNet main components

- **License Manager Daemon (`lmgrd`)**
- **Vendor Daemon (`telelogic`)**
- **Client application** (any IBM Rational application)
- **License file** (`license.dat`)

## How it works (mode of employment)

- When an IBM Rational product starts, it uses the `TELELOGIC_LICENSE_FILE` environment variable to find the hostname of the FlexNet license server and the port.
- The client contacts the license manager (`lmgrd`) on that server and requests a floating license from the Telelogic vendor daemon.
- On the server, `lmgrd` forwards the request to the Telelogic vendor daemon, which checks license availability.
- If a license is available, the daemon grants it and the application runs. If no license is available, the request is denied and the application shows a license denial message.

## Token-based licensing

Token licenses are a form of floating license. Instead of a pool of fixed licenses, there is a pool of tokens. When a feature is checked out, a specific number of tokens is consumed (defined per feature in the `FEATURE`/`INCREMENT` line of the license file). When the application closes, tokens are returned to the pool.

## Advantages of token licensing

- You can apply acquired licenses across multiple products, improving satisfaction when the exact feature mix isn’t known upfront.
- Needs change as projects evolve; token licensing allows shifting usage without paying for unused software.
- Purchasing is simpler: teams can add or try software during a project without a new PO or evaluation cycle.

## Rational tools using token-based licensing

Examples include DOORS, Synergy, Change, Tau, System Architect, Focal Point, Rhapsody, Publishing Engine, Logiscope, and Team Webtop.

## Token license file examples

**Feature token consumption (example):**

```text
INCREMENT Change telelogic 2015.04302 30-apr-2015 1 ...
VENDOR_STRING=T10-999999:t,TLSTOK,1.0,Change,5 ...   # 5 tokens consumed