---
title: Environment setup
sidebar_position: 2
---

# Environment setup

This page covers machine provisioning, Kubernetes installation, cluster configuration, and infrastructure service deployment for the on-premise machines path.

If your infrastructure team has already prepared the Kubernetes cluster and infrastructure services, skip to [Prerequisites](./prerequisites) to validate readiness, then proceed to [Platform installation](../platform-installation).

## Machine preparation

Provision machines according to the [Requirements](./requirements). Plan for the following node roles:

| Role | Purpose | Recommended spec |
| --- | --- | --- |
| Master node | Cluster control plane and ingress entry point | Runs only Kubernetes system workloads for stability |
| Infrastructure node | Databases, Kafka, Redis | x86 architecture required for some database images |
| Worker nodes (2–3) | OpenLM Platform microservices | ARM or x86 |
| Reporting nodes (2) | Spark workloads and Apache Superset | ARM or x86 |

:::note
ARM and x86 architectures can be mixed in the same cluster. The infrastructure node should be x86 to ensure compatibility with all database container images.
:::

## Network setup

Each machine needs:

- A **private IP address** for intra-cluster communication (no restrictions on the private network)
- Optionally, a **public IP address** for administration (restrict to SSH port 22 only)
- HTTP ports **80** and **443** open on the master node for ingress traffic
- Kubernetes API access over the network for cluster management

## Kubernetes installation

The following example uses MicroK8s. Other distributions (kubeadm, k3s, RKE2) follow a similar pattern.

### Install MicroK8s on each node

```bash
sudo apt update && sudo apt install snapd -y
sudo snap install microk8s --classic
```

### Configure the advertise address

On each node, edit `/var/snap/microk8s/current/args/kube-apiserver` and set the private network IP:

```
--advertise-address=<PRIVATE_IP>
```

Restart MicroK8s after the change:

```bash
sudo snap restart microk8s
```

### Join nodes to the cluster

On the master node, generate a join token:

```bash
microk8s add-node
```

Copy the output command and run it on each worker node:

```bash
microk8s join <MASTER_IP>:<PORT>/<TOKEN>
```

Repeat `add-node` on the master for each node you want to join. Verify all nodes are connected:

```bash
microk8s kubectl get nodes
```

## Cluster topology and node labels

Apply labels to nodes so that workloads are scheduled to the correct machines using affinity rules:

```bash
kubectl label node <infra-node>     openlm.com/role=infrastructure-workload
kubectl label node <worker-node-1>  openlm.com/role=main-workload
kubectl label node <worker-node-2>  openlm.com/role=main-workload
kubectl label node <worker-node-3>  openlm.com/role=main-workload
kubectl label node <report-node-1>  openlm.com/role=reporting-workload
kubectl label node <report-node-2>  openlm.com/role=reporting-workload
```

Verify labels:

```bash
kubectl get nodes --show-labels
```

## Infrastructure installation

After all nodes are connected, deploy the infrastructure services into a dedicated namespace:

```bash
kubectl create namespace openlm-infrastructure
```

### Deploy services

The infrastructure services (MongoDB, MariaDB/PostgreSQL, Kafka, Redis) are deployed using Helm charts included in the deployment package.

For each service:

1. Configure `values.yaml` with your storage class name and storage sizes
2. If needed, add node selectors to schedule infrastructure pods to the infrastructure node
3. Install using Helm:

```bash
helm install <release-name> <chart>.tgz -f values.yaml -n openlm-infrastructure
```

### Verify infrastructure

Confirm all infrastructure pods are running:

```bash
kubectl get pods -n openlm-infrastructure
```

Verify connectivity to each service (MongoDB, SQL database, Kafka, Redis) before proceeding.

## Next steps

Once your cluster is running and infrastructure services are healthy:

1. Complete the [Prerequisites](./prerequisites) checklist
2. Proceed to [Platform installation](../platform-installation)
