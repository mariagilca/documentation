---
title: "OpenLM にユーザーを手動でインポートする方法 (HT900)"
description: "このドキュメントでは、外部データソースから OpenLM データベースへ手動でユーザーをインポートする方法について説明します。"
sidebar_position: 1
---

このドキュメントでは、外部データソースから OpenLM データベースへユーザーを手動でインポートする方法を説明します。外部データソースは、ディレクトリサービス（例: Active Directory）、会計システム、またはユーザー情報を保持する任意のデータベースなどです。

## OpenLM ユーザーテーブル形式の CSV を準備する

最も簡単な方法は、OpenLM から現在のユーザーをエクスポートしてサンプル CSV を取得することです。

1. OpenLM EasyAdmin User Interface を開きます。
2. **Start** をクリックし、**Users & Groups** に移動します。
3. **Users** を開きます。
4. **Export** をクリックします。
5. CSV ファイルをダウンロードします。

CSV は以下の OpenLM ユーザーテーブル形式で作成する必要があります。

| 列名 | 必須 | 備考 |
| --- | --- | --- |
| Username | はい | 一意である必要があります。単一値。 |
| First Name | いいえ | 単一値。 |
| Last Name | いいえ | 単一値。 |
| Department | いいえ | 単一値。 |
| Display Name | いいえ | 単一値。 |
| Title | いいえ | 単一値。 |
| Phone | いいえ | 単一値。 |
| Office | いいえ | 単一値。 |
| Description | いいえ | 単一値。 |
| Email | いいえ | 単一値。 |
| Enabled | はい | TRUE または FALSE。 |
| Groups | いいえ | 複数指定する場合はパイプ `|` で区切ります。 |
| Default Group | いいえ | 単一値。 |
| Projects | いいえ | 複数指定する場合はパイプ `|` で区切ります。 |
| Default Project | いいえ | 単一値。 |

![OpenLM ユーザーテーブル形式の参考図](/img/legacy/ht900-p02-01.png)

注: CSV で参照するグループやプロジェクトは、インポート前に OpenLM データベース内に存在している必要があります。存在しない場合、インポートは失敗します。

## CSV を OpenLM にインポートする

1. OpenLM EasyAdmin User Interface を開きます。
2. **Start** をクリックし、**Users & Groups** に移動します。
3. **Users** を開きます。
4. **Import** をクリックします。
5. CSV ファイルを参照して **Open** をクリックします。
6. 成功または失敗のダイアログを確認します。

![OpenLM のインポートダイアログ例](/img/legacy/ht900-p04-01.png)

## Active Directory からユーザーをインポートする

OpenLM は Directory Sync コンポーネントによる Active Directory との完全同期に対応していますが、CSV を使って特定のユーザーだけを手動でインポートすることもできます。手順は、Active Directory からのエクスポート、OpenLM 形式に合わせた CSV 編集、そしてインポートの順です。

### Active Directory からユーザーをエクスポートする

1. **Active Directory Users and Computers** を開きます。

![Active Directory Users and Computers ツール](/img/legacy/ht900-p05-01.png)

2. 左ペインでドメインを展開し、**Users** フォルダーを選択します。
3. **Filter** アイコンをクリックします。

![Active Directory Users and Computers の Filter アイコン位置](/img/legacy/ht900-p06-01.png)

4. **Show only the following types of objects** を選択し、**Users** をチェックして **OK** をクリックします。

![Users を選択した Filter Options ウィンドウ](/img/legacy/ht900-p07-01.png)

5. メニューの **View** をクリックし、**Add/Remove Columns** を選択します。

![Add/Remove Columns ダイアログ](/img/legacy/ht900-p08-01.png)

6. 次の列をこの順序で追加し、**OK** をクリックします: `User Logon Name`, `First Name`, `Last Name`, `Department`, `Name`, `Job Title`, `Business Phone`, `Office`, `Description`, `E-mail Address`。
7. **Export** アイコンをクリックします。

![Active Directory Users and Computers の Export アイコン](/img/legacy/ht900-p09-02.png)

8. 保存先を選択します。
9. **Save as type** で **Unicode Text (Comma Delimited) (*.csv)** を選択します。

![Unicode Text CSV の保存形式選択](/img/legacy/ht900-p09-01.png)

10. 任意: 選択したユーザーのみをエクスポートする場合は **Save Only Selected Rows** をチェックします。
11. **Save** をクリックします。

### OpenLM 形式に合わせて CSV を編集する

1. エクスポートした CSV をスプレッドシートアプリで開きます。

![スプレッドシートでの CSV 例](/img/legacy/ht900-p10-01.png)

2. 次の列ヘッダーを変更します。

| 変更前 | 変更後 |
| --- | --- |
| User Logon Name | Username |
| Name | Display Name |
| Job Title | Title |
| Business Phone | Phone |
| E-mail Address | Email |

3. 次の列ヘッダーをファイル末尾にこの順で追加します: `Enabled`, `Groups`, `Default Group`, `Projects`, `Default Project`。
4. `Enabled` 列は必須です。TRUE は有効、FALSE は無効を示します。
5. CSV 形式で保存します。

### 編集した CSV を OpenLM にインポートする

1. OpenLM EasyAdmin User Interface を開きます。
2. **Start** をクリックし、**Users & Groups** に移動します。

![EasyAdmin の Users へのナビゲーション](/img/legacy/ht900-p11-01.png)

3. **Users** を開きます。
4. **Import** をクリックし、編集済み CSV ファイルを参照します。
5. 成功ダイアログを確認します。
