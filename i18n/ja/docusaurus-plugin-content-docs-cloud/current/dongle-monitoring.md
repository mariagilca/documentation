---
title: "Dongle Monitoring"
sidebar_position: 11
description: "Dongle Monitoring を使用すると、Workstation Agent を介して PC に接続された USB デバイス（ドングルライセンスキー）を追跡できます。"
---

## 概要

**Dongle Monitoring** を使用すると、Workstation Agent を通じて PC に接続された USB デバイス（ドングル ライセンスキー）を追跡できます。これにより、ライセンス管理者はドングル型ライセンスの所在や使用頻度を監視できます。

なお、Dongle Monitoring 自体ではアプリケーションの使用状況を直接監視できません。アプリケーション単位の使用状況を追跡するには、Workstation Agent と併せて **Unmanaged Process** 機能をご利用ください。

盗難・紛失・ベンダー返却などの理由で特定の USB ドングルをブロックリストに登録し、再接続時に通知を受けるようアラートを設定することもできます。これによりコンプライアンス違反の回避に役立ちます。

## 前提条件

- 対象 PC すべてに **Agent Activity Manager** を用いて **Workstation Agent** をインストールし、接続してください。

## 設定

Dongle Monitoring の設定手順:

1. **Home** ページの **Product** マイクロサービスで **Dongle Monitoring** を有効化します。
2. **Dongle Monitoring** を開き、ツアーガイドに従ってセットアップを完了します。

### USB ベンダー情報の追加

監視開始前に、USB ベンダー情報を追加します。

1. Workstation Agent をインストールした PC で、USB デバイスのハードウェア ID（**VendorID** と **ProductID**）を確認します。例: `USB\VID_0411&PID_0241`。
2. 必要なハードウェア ID 情報を Dongle Monitoring に登録します。

デフォルトでは、Workstation Agent は接続された USB デバイス情報を 10 分ごとに自動送信します。

### USB デバイス（ドングルキー）の追跡

**Usage** タブでは、以下が可能です。

- 位置情報、接続/切断時刻など、USB ドングル接続の詳細レコードを閲覧
- フィルターでデータを絞り込み
- テーブルが空の場合は USB デバイスを再接続してデータを更新
- **Export** を選択してデバイス記録をエクスポート

### USB デバイスのブラックリスト登録

USB ドングルを紛失した場合やベンダーへ返却した場合などは、ブラックリストに登録できます。

1. Dongle Monitoring の **Blacklist** にドングルの DeviceID を追加します。
2. **Alerts**（[アラート設定](./automations/alerts.md)）で、ブラックリスト対象デバイスが再接続されたときに通知を受け取れるようアラートを設定します。
3. **Notification**（[通知設定](./automations/notifications.md)）でメール通知を構成します。
4. 通知を **On** に切り替えます。
