---
sidebar_position: 18
title: パーソナルダッシュボード(Personal Dashboard)
---
## 前提条件

OpenLM パーソナルダッシュボード（Personal Dashboard）へアクセスするには、以下の前提条件を満たす必要があります。

### 1. [Identity Service でユーザーアカウントを作成](./../openlm-administration/identity#users-management)

パーソナルダッシュボードにアクセスするには、OpenLM Identity Service 上にユーザーアカウントが必要です。

オプション:

- 役割（ロール）の有無にかかわらず、個別アカウントを手動で作成できます。
:::info
 Identity Service は一括ユーザー作成をサポートしていません。ユーザーは個別に追加する必要があります。
:::
- 共有アカウントを作成することもできますが、推奨しません。最も簡単な方法ではありますが、共有アカウントはパーソナルダッシュボードには表示されません。Workstation Agent は常にローカルマシンからユーザー情報を取得し、Identity Service からは取得しません。

### 2. [推奨の認証方式（SSO）の利用](./../openlm-administration/identity#external-providers-sso)

ユーザー数が多い組織では、認証とユーザー管理のためにサードパーティのアイデンティティプロバイダーを統合することを推奨します。サポートされる例:

- Okta  
- Azure AD  
- Windows 認証  

### 3. [Workstation Agent のインストール](../../install/components_installation)

Workstation Agent を PC にインストールした後にのみ、Personal Dashboard へアクセスできます。

### インストール方法:

- **手動インストール**  
  Identity Service で生成した承認ファイルを用意すれば、ユーザー自身で Workstation Agent をインストールできます。インストール後、Personal Dashboard は自動的に起動します。

- **大量/サイレント配布**  
  IT チームは以下のツールなどを使って Workstation Agent を一括配布できます。
  - Microsoft Intune  
  - グループポリシー（GPO）  
  - SCCM（System Center Configuration Manager）  
  - PDQ Deploy  
  - カスタムサイレントスクリプト  

## パーソナルダッシュボードの通知 

パーソナルダッシュボードのユーザーは、Workstation Agent からブラウザー通知を受け取れます。

- 通知には、プロセス解放のアラート、プロジェクト選択の促し、禁止アプリケーションの警告、ライセンス空きの通知などが含まれます。
- ブラウザーのネイティブ通知が許可されていればそれを使用し、許可されていない場合はアプリ内のトースト通知として表示されます。

### 通知の例:

- アクティブなプロジェクトの選択をユーザーに促す。
- ライセンスに空きが出たことを通知する。
- パーソナルダッシュボードの「アプリ内リクエスト送信」機能（制限: 3 分に 1 回）を通じて、他のユーザーからのリクエストによりライセンス解放を促す。

## プロジェクトとライセンスのトラッキング

OpenLM は、ライセンス使用状況を特定のアクティブプロジェクトに紐づけて記録できます。

- EasyAdmin で機能を有効化していれば、ユーザーはパーソナルダッシュボード内でアクティブプロジェクトを作成または選択できます。
- プロジェクト単位のライセンス使用追跡は EasyAdmin から管理できます。

### Recently Closed 最近閉じた項目

- Workstation Agent によって能動的にクローズされたアプリケーションを表示し、ライセンス回収の履歴を確認します。
- プロセス名を選択してアプリケーションを再度開き、ライセンスを再チェックアウトします。

### License Repositoryライセンスリポジトリ

- 使用中、借用中、利用可能数など、ライセンスのリアルタイム使用状況を表示します。
- 現在ライセンスを保持しているユーザーの詳細情報にアクセスします。
- エンドユーザーに表示するライセンスの範囲を制御するためのフィルターオプションを構成します。

### ArcGIS のライセンスレベル（ArcGIS のみ）

ArcGIS ユーザーは、ArcGIS Desktop および ArcGIS Pro 向けに（**Advanced**、**Standard**、**Basic**）のライセンスレベルを選択できます。既定レベルの設定や、パーソナルダッシュボード上でユーザーの選択肢を制限することも可能です。

> [ArcGIS のライセンスレベルについて（英語）](https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm)
