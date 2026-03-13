---
title: TLS 証明書
sidebar_position: 4
---

import Checklist from '@site/src/components/Checklist';
import ChecklistItem from '@site/src/components/CheckListItem';

# TLS 証明書

OpenLM Platform と通信する主な主体は、フィールドエージェント（Broker、Workstation Agent、Directory Sync Agent）と Web UI にアクセスするユーザーです。これらはすべて、単一の HTTPS エンドポイントを通じて接続します。デプロイ時に設定する TLS 証明書が、この仕組みを成立させます。証明書が正しく設定されていないと、エージェントは暗号化された HTTPS 接続を確立できず、システムと通信できません。

## 要件

### 1. 証明書はドメインと一致している必要があります

証明書の Common Name（CN）または Subject Alternative Name（SAN）は、デプロイ時に設定する完全修飾ドメイン名（FQDN）（例: `openlm.yourcompany.com`）と一致している必要があります。これは、すべてのエージェントと Web UI ユーザーが接続するドメインです。

### 2. エージェントが入るすべてのマシンで証明書が信頼されている必要があります

Broker、Workstation Agent、Directory Sync Agent を実行するすべてのマシンで、この証明書が信頼されている必要があります。公開 CA（Let's Encrypt や DigiCert など）が発行した証明書であれば、通常はそのまま動作します。

証明書が **社内 CA またはプライベート CA** により発行されている場合は、その CA のルート証明書および中間証明書を各エージェントマシンの OS trust store にインストールする必要があります。これがないと、エージェントは接続を拒否します。

### 3. Kubernetes クラスタ内部でも証明書が信頼されている必要があります

`custom-ca-configmap` ConfigMap は、すべてのマイクロサービスにマウントされ、各サービスが CA チェーンを信頼できるようにします。これは、プラットフォームが認証に IdentityServer を使用し、各マイクロサービスが `https://<your-fqdn>/identity` にコールバックして JWT トークンを検証するため重要です。クラスタ内部で証明書が信頼されていない場合、サービスは identity issuer に到達できず、JWT 検証が失敗し、ユーザーはサインインできません。

ConfigMap には、完全な証明書チェーン（ルート CA と中間 CA 証明書）を含める必要があります。

## 設定方法

### Kubernetes TLS secret

証明書と秘密鍵を、`openlm` namespace 内の Kubernetes secret として読み込みます。

```bash
kubectl create secret tls openlm-lb-cert \
  --key your-domain.key \
  --cert your-domain.crt \
  -n openlm
```

### Custom CA ConfigMap

完全な CA チェーン（ルート証明書と中間証明書）を持つ ConfigMap を作成します。

```bash
kubectl apply -f custom-ca-configmap.yaml -n openlm
```

ConfigMap には、信頼を確立するために必要なチェーン上のすべての証明書を含める必要があります。どの証明書を含めるべきか不明な場合は、同じドメインの Web サイトにブラウザでアクセスし、証明書チェーンをエクスポートして確認できます。

証明書が公開 CA 発行でカスタムチェーンがない場合は、上記 TLS secret に使ったものと同じ証明書を使用してください。

## 自己署名証明書または独自 CA 証明書

自己署名証明書、または独自の社内 CA が発行した証明書を使う場合は、**完全な証明書チェーン** を、その証明書を使用するすべての場所で提供する必要があります。

- **Kubernetes TLS secret** (`openlm-lb-cert`) には、リーフ証明書だけでなく完全なチェーンを含める必要があります
- **`custom-ca-configmap`** には、ルート証明書とすべての中間 CA 証明書を含める必要があります
- すべてのエージェントマシンとユーザーワークステーションの **OS trust store** にルート CA をインストールする必要があります

完全なチェーンなしでリーフ証明書だけを渡すことは、TLS エラーの最も一般的な原因のひとつです。これらのいずれかの場所でチェーンが欠けていると、接続は失敗します。

## トラブルシューティング

:::warning
信頼されていない、または不完全な証明書チェーンは、エージェント接続失敗の最も一般的な原因です。デプロイ後にエージェントがプラットフォームへ到達できない場合は、まず証明書の信頼状態とチェーンの完全性を確認してください。
:::

**エージェントが接続できない**: エージェントマシンの OS trust store に CA のルート証明書が入っているか確認してください。Windows では Trusted Root Certification Authorities ストア、Linux では `/etc/pki/ca-trust/` または `/usr/local/share/ca-certificates/` を確認します。

**Web UI に "not secure" 警告が出る**: 証明書がドメインと一致していない、期限切れ、またはブラウザに信頼されていない状態です。

**ユーザーがサインインできない、またはサービスで認証エラーが出る**: `custom-ca-configmap` が欠落しているか不完全である可能性が高いです。各サービスは identity issuer（`https://<your-fqdn>/identity`）に対して JWT を検証するため、この証明書を信頼できる必要があります。ConfigMap に完全な CA チェーンが入っていることを確認し、再デプロイしてください。

## チェックリスト

<Checklist>
  <ChecklistItem title="証明書の CN または SAN がプラットフォーム FQDN と一致している" />
  <ChecklistItem title="証明書と秘密鍵が Kubernetes TLS secret（`openlm-lb-cert`）として読み込まれている" />
  <ChecklistItem title="クラスタ内部の `custom-ca-configmap` に完全な CA チェーンが設定されている" />
  <ChecklistItem title="Broker を実行するすべてのマシンに CA ルート証明書がインストールされている" />
  <ChecklistItem title="Workstation Agent を実行するすべてのマシンに CA ルート証明書がインストールされている" />
  <ChecklistItem title="Directory Sync Agent を実行するすべてのマシンに CA ルート証明書がインストールされている" />
  <ChecklistItem title="Web UI にブラウザの証明書警告なしでアクセスできる" />
</Checklist>
