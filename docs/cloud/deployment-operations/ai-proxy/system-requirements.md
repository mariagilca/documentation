---
title: System requirements
sidebar_position: 1
description: "Host, runtime, and network requirements for deploying OpenLM AI Proxy."
---

AI Proxy runs as a Docker Compose stack on a single Linux host inside your network. Confirm the following requirements before you deploy.

## Host requirements

- A 64-bit Linux host. AI Proxy is tested on Ubuntu 24.04 LTS.
- Docker Engine with the Docker Compose v2 plugin (`docker compose`).
- Outbound internet access to the LLM providers you route through AI Proxy and to your OpenLM Platform endpoint.

## Hardware requirements

The stack runs four containers: the API, the UI, MongoDB, and Redis. Use the following as a starting point and scale based on request volume and how long you retain usage data.

| Resource | Minimum | Recommended |
| --- | --- | --- |
| CPU | 2 vCPU | 4 vCPU |
| Memory | 4 GB | 8 GB |
| Disk | 20 GB | 50 GB or more |

MongoDB storage grows with the number of usage records you keep. Provision extra disk for long retention windows or high request volumes.

## Network requirements

Ensure the following connectivity:

- **Outbound to providers.** HTTPS (port 443) to each LLM provider you route through AI Proxy, for example Anthropic, OpenAI, or Google Vertex AI.
- **Outbound to OpenLM Platform.** HTTPS (port 443) to your OpenLM Platform endpoint, for the Open Platform Connection that delivers usage data.
- **Inbound from clients.** Clients reach the AI Proxy API and UI on the host ports that you map in the Docker Compose file. Restrict these ports to the networks that need them.

MongoDB and Redis run as internal containers and are not exposed outside the host by default.

## Supported AI platforms

AI Proxy can route and meter requests for the following platforms:

- Anthropic (Claude Code)
- OpenAI
- Google Vertex AI (Gemini)

Cursor is not supported through AI Proxy. For an overview of each platform's status and authentication modes, see [AI Proxy](/cloud/deployment-operations/ai-proxy/).
