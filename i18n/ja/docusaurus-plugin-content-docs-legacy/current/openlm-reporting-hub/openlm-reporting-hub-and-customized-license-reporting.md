---
title: "Reporting Hubとカスタムライセンスレポート"
description: "現在、OpenLM Reporting Hub とレポートシステムのインストールおよび設定には、OpenLM サポート担当者の関与が必要です。"
sidebar_position: 3
---
## **OpenLM Reporting Hub とは**

## 外部プロセス

- OpenLM データベースから特定データを抽出します。
- クエリと分析のためにデータ構造を変換します。
- 新しく形成されたデータ構造をデータウェアハウス DB にロードします。
- BI ツールがデータウェアハウスから必要なデータを抽出し、計算・カスタマイズ・表示・配信（対応形式）を行います。
![スクリーンショット: Outlying procedure](/img/legacy/Reporting-Hub-Configuration-data-Flow.jpg)

## 利用分析システムのメリット

- 安定したデータ構造 - OpenLM のバージョンが変わってもレポート用 DB 構造は安定。
- カスタムフィールド - OpenLM EasyAdmin ツールにない新しいレポートやデータ照会を作成可能。
- カスタム計算 - BI プラットフォームにより、OpenLM DB にある既存データに対して複雑かつ独自の計算が可能。
- カスタムフィルター - カスタム計算したデータフィールドでフィルターを構成可能。
- ビッグデータ - データウェアハウス技術で巨大な DB を高速検索。
- カスタムチャート/グラフ - 多様な視点での可視化が可能。
- 高い使用状況の解像度 - 異なる時間粒度での集計が可能。

![スクリーンショット: Benefits of the Usage Analytics System](/img/legacy/Advanced-License-Activity-report-1.jpg)

## レポート DB 構造

- 扱いやすいメジャー/ディメンション構造で、各フィールドを簡単に管理可能
- 構造はアップグレードのたびに変更されない
- 新しい計算フィールドの作成が容易
- [レポート DB 構造の可視化](/pdfs/OpenLM-Reporting-Hub-Data-Structure.pdf) を参照

![スクリーンショット: Reporting database structure](/img/legacy/Advanced-Denials-report.jpg)

## OpenLM Reporting Hub とカスタムレポート拡張の入手方法

現在、OpenLM Reporting Hub とレポートシステムのインストール/構成には OpenLM サポート担当者の対応が必要です。

[サポートチーム](mailto:support@openlm.com) までご連絡ください。担当者がオンラインでご案内します。

![スクリーンショット: How do I get the OpenLM Reporting Hub and customized reporting extension?](/img/legacy/Advanced-Unused-Licenses-report.jpg)
