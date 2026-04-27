---
title: "アラート"
sidebar_position: 3
---
OpenLM Alerts 機能は、ライセンスシステムの安定性と可用性を監視するためのものです。条件を定義し、条件が満たされたときに実行されるアクションを設定できます。

拡張機能は複数のライセンスサーバーと機能に対する複雑な条件を処理できます。アラートの表示方法には次のものがあります:

- EasyAdmin User Interface の Alerts ウィジェットや、Application Event Log のイベントとして表示
- 1 つまたは複数のメールアカウントに送信

本ドキュメントでは、OpenLM Alerts の機能と設定オプションを説明します。

## アラート設定フォーム

新しいアラートを設定するには:

1. OpenLM EasyAdmin User Interface で **Start → Administration → Alerts Management** をクリックします。  
   ![スクリーンショット: Alerts configuration form](/img/legacy/word-image-26598-2.png)
2. **Add Rule** をクリックして新しいアラート条件を追加します。  
   ![スクリーンショット 2: Alerts configuration form](/img/legacy/word-image-26598-3.png)
3. 新しいアラートに名前（例: "alert1"）を付け、通知の重大度レベル（例: "Warning"）を設定します。  
   ![スクリーンショット 3: Alerts configuration form](/img/legacy/word-image-26598-4.png)
4. アラート条件のチェック頻度とタイミングを選択します。次のいずれかです:
   - 日付と時刻を選択する
   - カスタムの CRON パターンを入力する（ラジオボタンを選択すると、オプション A の値が便宜的にパターンに変換されます）
5. **Save** をクリックします。これでアラートルール（条件とアクション）を定義できます。
6. アラート条件: **Type** ドロップダウンから条件タイプを選択します。

   ![スクリーンショット 4: Alerts configuration form](/img/legacy/word-image-26598-5.png)

   利用可能な条件タイプは次のとおりです:

   - **Feature usage percentage**: 機能の使用率が指定したしきい値より上または下になったら通知します。
   - **Duplicate license usage**: 同じユーザーが複数のワークステーションで同じ機能をチェックアウトした場合に通知します。
   - **Feature expiration date**: 機能ライセンスの有効期限が近づいたら通知します。
   - **License servers not responding**: 監視対象のライセンスマネージャーの状態が DOWN または UNKNOWN の場合に通知します。トライアド構成では、すべてのサーバー（またはライセンスサーバーを監視する Broker）がダウンしている必要があります。
   - **Users not assigned to a default group**: ユーザーに既定グループが設定されていない場合（システム既定の "OpenLM_Everyone" を使用している場合）に通知します。
   - **Users not assigned to a default project**: ユーザーに既定のプロジェクトが割り当てられていない場合に通知します。
   - **Usage session duration**: ライセンスのチェックアウト時間が指定時間を超えた場合に通知します。
   - **Total number of denials in a predefined period**: 指定した期間内のライセンス拒否回数がしきい値を超えた場合に通知します。
   - **Persistence queue overflow**: OLM_PERSISTED_MESSAGES DB のレコード数が指定上限を超えた場合に通知します。

   選択後、**Add** をクリックして条件設定ウィンドウを開きます。
7. 条件の設定:  
   条件設定はタイプによって異なります。しきい値や期間の入力が必要なもの、機能やライセンスサーバーの指定が必要なものなどがあります。例として、`<`（未満）と 14 日の期間を持つ機能期限条件を考えます。この条件は、ライセンス期限まで 14 日未満になったときにトリガーされます。**Save** をクリックして変更を保存します。

![スクリーンショット 5: Alerts configuration form](/img/legacy/word-image-26598-6.png)

設定が完了したら **OK** をクリックします。
8. 複数条件の追加:  
   AND / OR ロジックを使って、1 つのアラートに複数の条件を追加できます。AND / OR は括弧なしで順次適用されます。以下の例では 2 つの条件（`expiration < 14 AND feature usage percentage > 80`）が設定されています。これはライセンス期限が 14 日未満で、かつ機能の使用率が 80% を超えた場合にアラートが発生します。![スクリーンショット 6: Alerts configuration form](/img/legacy/word-image-26598-7.png)
9. アクションの設定:  
   **Type** ドロップダウンから、アラート発生時に実行するアクションを選択します。![スクリーンショット 7: Alerts configuration form](/img/legacy/word-image-26598-8.png)
   - **Send an email**（EasyAdmin User Interface の Email 設定が必要）
   - **Show application alert** - EasyAdmin User Interface の Alerts ウィンドウにアラートを表示
   - **Create an Event Log** - Windows Application Event Log にイベントを書き込み
   - **Run a program on OpenLM SLM** - OpenLM SLM をホストするマシン上でプログラムやコマンドを実行
   - **Run a Broker command on LM Server** - ライセンスマネージャーのマシン上で標準の Broker コマンド（start、stop、reread、restart）またはカスタムコマンドを実行
10. アクション種別ごとの設定:  
    ![スクリーンショット 8: Alerts configuration form](/img/legacy/word-image-26598-9.png)
    - **Address**（メールのみ）- アラート送信先のメールアドレス
    - **Users**（メールのみ）- 特定の OpenLM ユーザーにメール送信（ユーザープロファイルにメールが設定されている場合）
    - **Notification mode** - アクションを 1 回だけ実行するか、条件が満たされるたびに実行するかを定義
    - **Command**（Broker と OpenLM SLM のみ）:
      - Broker の場合は start/stop/reread/restart またはカスタムコマンド
      - OpenLM SLM の場合は次のように実行されます:
    - **Limit sending times** - アクション実行時間を制限します。例: 深夜にメール送信しないようにする。時間は選択または CRON 式で指定できます。
    - **Customized Title**（メール、アプリケーション、Event Log のみ）- カスタムタイトル

    設定が完了したら **OK** をクリックして閉じます。

    注: 条件と同様に、1 つのアラートに複数のアクションを設定できます。
11. **Save** をクリックしてアラート設定を保存します。

## アラート通知の自動削除

![スクリーンショット: Automatically delete alert notifications](/img/legacy/word-image-26598-10.png)

## 推奨事項

各アラートクエリはシステムリソースを消費します。安定で効果的なライセンスシステムを保つため、最小限のチェック数に抑えることを推奨します。

## Email

OpenLM Alerts はメールで送信できます。メール設定が必要です:

1. EasyAdmin の **Start → Administration** をクリックします。
2. **Email** をクリックします。
3. メール設定パラメータを入力します。
4. **Save** をクリックして設定を保存します。保存前にテストメールを 1 回送信する必要があります。  
   ![Alerts](/img/legacy/Screenshot-2023-01-21-at-22.51.31.png)

**注:** Google の G-Suite SMTP サーバーを使用する場合は、[Google の手順](https://support.google.com/accounts/answer/185833?hl=en)に従ってパスワードをアプリパスワードに設定する必要があります。
