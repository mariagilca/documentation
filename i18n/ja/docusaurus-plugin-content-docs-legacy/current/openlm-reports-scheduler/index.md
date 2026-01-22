---
title: "OpenLM Reports Scheduler インストールガイド"
sidebar_position: 1
---
## **システム要件**

OpenLM Reports Scheduler をインストールするには、次の前提条件を満たす必要があります:

1. 中央のネットワークサーバーで稼働する OpenLM SLM の単一インストール。
2. Reports Scheduler 拡張が含まれる OpenLM ライセンス（Administration → OpenLM License で "Reports\_Scheduler" 機能が見つからない場合は [sales](https://www.openlm.com/contact-us/) に連絡してください）。
3. *(任意)* Reports Scheduler インストーラーに同梱される OpenJDK 11 をインストールしない場合、対象マシンに互換性のある Java 11 が必要です。

\* Reports Scheduler インストーラーのパッケージにより異なります（[リリースノート](https://www.openlm.com/cbxchangelog/openlm-reports-scheduler/) を参照してください）。

## **インストール**

OpenLM Reports Scheduler は OpenLM SLM と同じマシンにインストールしてください。

1. [Downloads](https://www.openlm.com/download/) ページから OpenLM Reports Scheduler の最新インストーラーをダウンロードします。

2. インストーラーファイル（Openlm\_Reports\_Scheduler\_XXXX.exe）をダブルクリックしてインストールを開始します。インストーラー画面が表示されます:

![](/img/legacy/word-image-65_2.png)

3. **Next** をクリックしてライセンス同意画面に進みます:

![OpenLM End User License Agreement screen](/img/legacy/openlm-end-user-license-agreement-screen-2.png)

4. **I accept the terms of the License Agreement** にチェックし、**Next** をクリックします。

5. **Choose Install Location** 画面ではインストール先フォルダーを変更できますが、既定のままにすることを推奨します。**Next** をクリックします。

![Installation destination folder](/img/legacy/installation-destination-folder-2.png)

6. **Choose Components** 画面にインストールされるコンポーネントが表示されます。外部の Java 11 を使う場合は JRE のチェックを外せますが、既定のままにすることを推奨します。**Install** をクリックします。

![Check the boxes near the components you want to install and uncheck the ones you do not wish to install](/img/legacy/check-the-boxes-near-the-components-you-want-to-in-2.png)

7. **Next** をクリックし、続いて **Finish** でウィザードを閉じます。

![Completing OpenLM Reports Scheduler Setup](/img/legacy/completing-openlm-reports-scheduler-setup-2.png)

8. Reports Scheduler が動作していることを確認するため、Services ウィンドウを開き「OpenLM Report Scheduler」サービスが稼働していることを確認します。

![Verifying if the Reports Scheduler is fully functional by using "Services"](/img/legacy/verifying-if-the-reports-scheduler-is-fully-functi-2.png)

Reports Scheduler の設定を続けるには、[このガイド](./openlm-reports-scheduler-configuration.md) を参照してください。
