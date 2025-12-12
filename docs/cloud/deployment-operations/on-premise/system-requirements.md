---
title: System requirements
sidebar_position: 1
---

# On-Premise system requirements

These are the general requirements for deploying OpenLM on customer-managed infrastructure. Maintenance, updates, and backups are owned by the customer.

## Minimum cluster resources

- CPU: 16 vCPUs (aggregate across nodes)
- RAM: 70 GB (aggregate across nodes)
- Storage: SSD-backed volumes sized for data retention needs

## Operating system

- Any Kubernetes-supported distribution (for example, Ubuntu, RHEL, or managed K8s on a cloud provider)

## Kubernetes and networking

- Kubernetes cluster with ingress controller and TLS termination
- Persistent storage classes for stateful services
- Connectivity from Brokers/DSA to license managers and directories

## Notes

- Sizing should be validated against expected agent/broker counts and usage volume.
- Provider-specific requirements (AWS, Azure, small VM) are outlined in the install & upgrade page.
