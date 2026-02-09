---
title: "非管理プロセス"
sidebar_position: 9
---
## 「非管理」ライセンスの監視方法（手順）:

すべてのソフトウェア機能は PC 上でプロセスとして動作します。対象を特定するには:

1. 監視したいアプリケーションが起動していることを確認します。
2. 監視対象の機能で使用されるプロセスを [プロセスを特定](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/finding-the-process-id) して、プロセス名を控えます。
3. EasyAdmin のユーザーインターフェイスで **Start → Administration → Unmanaged Processes** をクリックします。  
   ![](/img/legacy/Screenshot-2023-02-09-at-10.54.10.png)
4. 「Unmanaged Processes」ウィンドウで「Add Vendor」アイコンをクリックし、ベンダーを監視対象一覧に追加します。  
   ![](/img/legacy/Screenshot-2023-02-09-at-10.56.15.png)
5. 「Add Vendor」ポップアップが開きます。  
   ![](/img/legacy/Screenshot-2023-02-09-at-11.00.01.png)
6. 次の値を入力します。  
   6a. **ソフトウェアベンダー名:** ベンダー名  
   6b. **Feature Name:** 自由入力  
   6c. **Process Name:** 先ほど開いたプロセス一覧ツールに表示されたプロセス名をそのまま入力  
   6d. **Description:** 自由入力

追加の機能は「Add」ボタンで監視対象ベンダーに追加できます。

プロセスを監視対象として設定すると、該当する EasyAdmin 画面および「License Usage Information」ウィンドウに表示されます。
