---
title: "Reporting Hubデータ構造"
sidebar_position: 2
---
[Reporting Hub Data Structure 動画をダウンロード](https://www.openlm.com/wp-content/uploads/2017/10/Reporting-Hub-Data-Structure.mp4)

## **ディメンション**

### カレンダー・ディメンション:

日付/時刻に関するフィールドを保持します:

- **Date** - 日付形式のフル日付（年、四半期、月、日、自由形式でのフォーマット）
- **Date_string** - 文字列形式の日付（例: "09-01-2017"）
- **Date_string_long** - 名称付き日付の文字列表現（例: "Jan 9th 2017"）
- **Is_weekend** - 週末かどうか
- **Is_holiday** - 祝日かどうか
- **Week_yyyyww** - 年内週番号（YYYY-01 〜 YYYY-51）
- **Day_of_month** - 月内日付（1 - 31）
- **Day_of_week** - 曜日（Sunday 〜 Saturday）
- **Day_of_year** - 年内日番号（1 - 365）
- **Month** - 年内の月（January - December）


### ライセンス・ディメンション:

ライセンスに関連する情報フィールドを保持します。

- **License_server** - ライセンスサーバー
- **License_vendor** - ベンダー
- **License_feature** - フィーチャー
- **License_description** - 製品名
- **License_type** - ライセンスタイプ
- **License_version** - バージョン
- **License_additional_key** - 追加キー
- **License_expiration_date** - ライセンスの有効期限（空欄は無期限）


### パッケージ・ディメンション:

ライセンスパッケージ情報を保持します。

- **Package_vendor** - パッケージのベンダー名
- **Package_feature** - パッケージのフィーチャー名
- **Package_description** - パッケージの説明名
- **Package_versions** - パッケージバージョン
- **Package_is_fixed** - パッケージが固定かどうか


### プロジェクト・ディメンション:

プロジェクト情報を保持します。

- **Project_allocated_time** - プロジェクト開始からの時間
- **Project_create_date** - プロジェクト作成日
- **Project_end_time** - プロジェクトの有効期限
- **Project_name** - プロジェクト名
- **Project_percent_done** - プロジェクトの進捗率
- **Project_priority** - プロジェクトの優先度
- **Project_source** - プロジェクトのロード元
- **Project_start_time** - プロジェクト開始時間
- **Project_valid** - プロジェクトが有効かどうか


### グループ・ディメンション:

グループ情報を保持します。

- **Group_name** - グループ名
- **Group_source** - グループのソース（License output / LDAP）
- **Group_valid** - グループが有効かどうか

### ユーザー・ディメンション:

ユーザーに関する情報（氏名、部署、オフィス、住所など）を保持します。

- **User_name** - ユーザー名
- **User_first_name** - 名
- **User_last_name** - 姓
- **User_display_name** - 表示名
- **User_title** - 役職
- **User_department** - 部署
- **User_phone_number** - 電話番号
- **User_description** - ユーザー説明
- **User_office** - オフィス
- **User_email** - メールアドレス
- **User_source** - ユーザーのソース（License output / LDAP）
- **User_valid** - ユーザーが有効かどうか


### ワークステーション・ディメンション:

すべてのワークステーションを保持します。

- **Workstation** - ワークステーションのホスト名

## **Raw measures（生メジャー）**

### Raw usage measure:

集計なしでセッションの合計時間を保持します。

- **Usage_time** - セッションの合計時間（時間によるクエリは行わない）
- **Num_of_licenses_used** - 単一セッションで使用されたライセンス数（トークン）
- **Borrowed** - このセッションでライセンスが借用されたか

### Raw denials measure:

集計なしで拒否を保持します。

- **Count(denial_id)** - 拒否件数
- **Major_error** - 拒否のメジャーエラーコード
- **Minor_error** - 拒否のマイナーエラーコード
- **Hour_of_day** - 拒否の発生時刻（拒否でのみ使用）
- **Error_message** - 拒否の詳細エラーメッセージ


### Raw idle time measure:

集計なしでアイドル時間の合計を保持します。

- **Idle_time** - アイドル時間

## **Calculated measures（計算メジャー）**

### Feature usage measure:

日次の使用時間と同時使用数を保持します（単一バージョンのフィーチャー）。

- **Usage_time** - 日別に切り出したセッション時間
- **Concurrent_usage** - 同時使用数（選択した単一フィーチャー単位）
- **Num_of_licenses_used** - 単一セッションで使用されたライセンス数（トークン）
- **Borrowed** - このセッションでライセンスが借用されたか

### Feature idle time measure:

日次のアイドル時間を保持し、異なるフィーチャーやライセンスサーバーを集計できます。

- **Idle_time** - 日別に切り出したアイドル時間


## **Daily measures（デイリーメジャー）**

### Daily concurrent measure:

日次の最大同時使用数を保持し、異なるフィーチャーやライセンスサーバーを集計できます（単一バージョンのフィーチャー）。

- **Max_concurrent_usage** - 日次の最大同時使用数

### Daily concurrent measure all versions:

日次の最大同時使用数を保持し、異なるフィーチャーやライセンスサーバーを集計できます（複数バージョンのフィーチャー）。

EasyAdmin の「Select All Versions」に相当します。

- **Max_concurrent_usage_all_versions** - 複数バージョンのフィーチャーに対する日次最大同時使用数

### Daily quantity measure:

日次の最大ライセンス数量を保持し、正確な日次ライセンス数量情報を取得できます。

- **Max_license_quantity** - ライセンスごとの日次最大数量


## **未使用テーブル**

これらのテーブルは ETL の補助テーブルであり、レポートでは使用しないでください。

- **Version_Table** - ETL のバージョンと最終実行時刻
- **Quantity_Dimension** - すべてのライセンス調達情報を保持（レポート構造ではなく、ETL 補助用）
- **Unfinished_Sessions_Aux** - 未完了セッションの ID 一覧
