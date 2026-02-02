---
title: "LinuxでOpenLM Brokerをインストール"
sidebar_position: 3
---
Linux/Unix 系システムに OpenLM Broker をインストールまたはアップグレードする方法を説明します。本書では systemd を使用するディストリビューションと、別の init システムを使用するディストリビューションの両方を対象とします。本ガイドの手順は Ubuntu 18.04 LTS で検証済みですが、他のディストリビューションにも適用できるはずです。

## システム要件

動作する JDK がマシンにインストールされている必要があります。正しいバージョンについては [システム要件](https://www.openlm.jp/openlm-system-requirements/) を参照してください。

## Broker のインストール

Linux ディストリビューションにより、OpenLM Broker のインストール方法は 2 通りあります:

- systemd を使用するシステムでは、セクション 2.2 で Broker をサービスとしてインストールする方法を説明します。
- systemd を使用しないシステムでは、セクション 2.3 で Broker をバックグラウンドプロセスとして起動する方法を説明します。

### 事前準備

1. OpenLM Web サイトのダウンロードセクションから Unix/Linux 用の最新の Broker をダウンロードします。

2. アーカイブ（OpenLM_Broker_#.#.#.#.tar.gz）を任意の場所に展開します。

3. 任意のエディタで **settings.sh** ファイルを開きます。このファイルには Broker の動作に必要なすべての変数が含まれています。**JAVA_HOME** 変数を JDK 11 のインストールパスに変更する必要があります。

> * **JAVA_HOME** のパス末尾にスラッシュを付けないでください*

必要に応じて **BROKERSRVNAMEUSER** 変数を編集し、"root" 以外のアカウントからサービスを起動することもできます。この場合は、"OpenLM_Broker_X.X.X.X" フォルダー内のファイルすべての所有者を新しいユーザーに再割り当てする必要があります。

**BROKERSRVNAME** 変数は、OpenLM Broker を並列で複数インスタンスインストールする場合に変更できます。

例:

```
#!/usr/bin/env bash

# Edit this file and customize service name in order to install multiple Broker services in parallel

BROKERSRVNAMEUSER="JohnDoe"

BROKERSRVNAME="openlm_broker_$BROKERSRVNAMEUSER"

BROKERSRVNAMEFILE="$BROKERSRVNAME.service"

#Change JAVA_HOME to point at installation folder

[[ -z "$JAVA_HOME" ]] && JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```

4. ファイルを保存し、Linux ディストリビューションに応じて以下のインストール手順に進みます。

### Broker をサービスとしてインストール

Linux が systemd をサポートしている場合、次の手順で OpenLM Broker がサービスとしてインストールされ、システム起動時に自動で開始します:

1. Broker をサービスとしてインストールします:

```
sudo ./broker.sh install
```

2. Broker サービスのステータスを確認します:

```
sudo ./broker.sh status
```

3. このドキュメントのセクション 4（「detect.sh を使った Broker の構成」）の説明に従って Broker の検出スクリプトを実行します。Linux にデスクトップ UI がある場合は、GUI の Broker Configuration ツールを次で起動できます:

```
sudo ./broker.sh config
```

### Broker をバックグラウンドプロセスとして実行

Linux が systemd をサポートしていない場合、次の手順で OpenLM Broker をバックグラウンドプロセスとして実行します:

1. Broker プロセスを起動します:

```
sudo ./broker.sh start
```

Broker の設定画面を開くには:

```
sudo ./run_brokerconfig.sh
```

## 既存の Broker インストールのアップグレード

既存の OpenLM Broker インストールをアップグレードするには:

1. OpenLM [ダウンロード](https://www.openlm.jp/downloads/) セクションから Unix/Linux 用の最新 OpenLM Broker をダウンロードします。
2. 現在の Broker インストールを削除します。
   - systemd を使用している場合は、現在の Broker サービスをアンインストールします:

     ```
     ./broker.sh uninstall
     ```
   - systemd を使用していない場合は、Broker プロセスを停止します:

     ```
     ./broker.sh stop
     ```
3. アーカイブ（OpenLM_Broker_#.#.#.#.tar.gz）を任意の場所に展開します。
4. 以前の Broker インストールフォルダーから **broker.xml** と **settings.sh** を新しいフォルダーにコピーし、必要に応じて上書きします。
5. 新しい OpenLM_Broker_x.x.x.x フォルダーから、新バージョンの Broker サービスをインストールします。
   - systemd を使用している場合は、サービスをインストールします:

     ```
     ./broker.sh install
     ```
   - systemd を使用していない場合は、プロセスを開始します:

     ```
     ./broker.sh start
     ```

> **重要**: OS に systemd がない場合、メインの Broker アーカイブ内にある **broker.sh.tar.gz** から、**broker.sh** を古いスクリプトに置き換える必要があります。

GUI がある場合は ./broker.sh config を実行し、設定とライセンスサーバーが変わらず維持されていることを確認するのが推奨です。また、Broker が監視しているライセンスマネージャーが EasyAdmin の License Servers ウィンドウに表示されていることも確認してください。

## Broker.sh コマンド

|  |  |
| --- | --- |
| **コマンド名** | **説明** |
| install | "systemctl enable" を使用して OpenLM Broker をサービスとしてインストールします |
| uninstall | 既にインストールされている OpenLM Broker インスタンスのサービス起動を無効化します |
| start | OpenLM Broker サービスを開始します |
| stop | OpenLM Broker サービスを停止します |
| restart | OpenLM Broker サービスを再起動します |
| status | OpenLM Broker サービスの現在の状態を表示します |
| config | GUI の Broker 設定ツールを起動します |

コマンド形式:

```
sudo ./broker.sh <command>
```

## detect.sh を使った Broker の構成

このスクリプトは、サポートされているライセンスマネージャーのポートを検出し、Broker 設定ファイルに追加します。

> **適切に動作させるため、detect.sh は root で実行する必要があります。**

このスクリプトには以下の挙動があります:

- 設定ファイルが存在しない状態で detect.sh を実行すると、マシン上で検出されたオープンポートを含むデフォルト設定ファイルが作成されます。
- 設定ファイルが既に存在する状態で detect.sh を実行すると、2 つのファイルがマージされ、broker.xml に不足しているポート情報が追加されます。元のファイルは "broker.xml.backup" として保存されます。

コマンド形式:

```
sudo ./detect.sh <fileName.xml> <On Premise OpenLM SLM IP/Hostname>
```

**注:** 2 つ目のパラメータは任意で、オンプレミスの OpenLM SLM への接続を構成する場合にのみ使用します。

### 例

このコマンドは、addonports.xml のポートをメインの broker.xml に追加します。

```
sudo ./detect.sh addonports.xml
```

このコマンドは、指定した XML ファイルのポートに加えて、10.0.0.12 をオンプレミス OpenLM SLM への接続として追加します。既定のポート設定は 5015 です。

```
sudo ./detect.sh broker.xml 10.0.0.12
```

### detect.sh を使用して OpenLM SLMC 構成をインポート

Broker を OpenLM SLMC に接続するよう構成するには、次を行います:

- OpenLM SLMC のサインアップ後に送付される初回ウェルカムメールに添付された broker.xml をダウンロードします。
- 既存の Broker インストールが 1 つ以上のライセンスマネージャーをアクティブにクエリしている場合、既存の構成ファイルを上書きしないよう新しい broker.xml をリネームします（例: brokerSaaS.xml）。
- OpenLM Broker をインストールした場所にファイルをコピーします。
- detect.sh を実行します:

  ```
  sudo ./detect.sh brokerSaaS.xml
  ```
- Broker サービス/プロセスを再起動します:

```
    sudo ./broker.sh restart

```

## Java で TLS 証明書をインポート

OpenLM Broker と OpenLM Server 間の HTTPS 接続を安全にするため、Java がサーバーの TLS 証明書を信頼するように設定します。以下の手順に従ってください。

1. ****OpenLM Server の URL で HTTPS を使用****

   OpenLM Server の URL が https:// スキームを使用していることを確認します:

   ```
   `https://<your-openlm-server>:<port>`
   ```
2. **Java が証明書を自動インポートするか確認**  
   一部の Java ディストリビューションは、システムのトラストストアから TLS 証明書を自動でインポートします。先に接続をテストし、Broker が正常に接続できる場合は追加作業は不要です。
3. ****SSL エラーのトラブルシューティング****

   SSL 関連エラーが発生する場合は、次のいずれかが原因の可能性があります:

   - Java に信頼されたルート証明書ディレクトリへのアクセス権がない。
   - Java がシステムトラストストアを使用するように構成されていない。
   - 証明書を Java KeyStore に手動で追加する必要がある。
4. **証明書を** ****keytool**** **でインポート**

   必要に応じて、TLS 証明書を Java KeyStore に手動でインポートします:

   ```
   keytool -import -trustcacerts \
     -keystore $JAVA_HOME/lib/security/cacerts \
     -storepass changeit \
     -noprompt \
     -alias mycert \
     -file my-cert.pem
   ```

   > **注:** .crt、.cer、.pem のみサポートされます。.pfx ファイルの場合は、インポート前に .crt に変換してください。
5. **Broker を再起動**

証明書をインポートしたら、OpenLM Broker サービスを再起動して変更を反映します。

## 代替構成

別のマシンから設定ファイルをインポートすることも可能です。GUI がない環境で特定のポートを構成する必要があり、グラフィカルな Broker 設定ツールが使用できない場合に有用です。

この場合は、設定済み Broker マシンから broker.xml をコピーし、detect.sh コマンドでインポートするだけです。broker.xml が既に存在する場合は、コピーしたファイル名を変更してください:

```
sudo ./detect.sh brokerAddon.xml
```
