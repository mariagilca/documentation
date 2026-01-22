---
title: "OpenLM Virtual License Manager: 総合ガイド"
sidebar_position: 2
---
このドキュメントは OpenLM Virtual License Manager (VLM) の包括的な技術ガイドです。Virtual License Manager の概要を詳しく説明した後、手順付きの説明と画面イメージで機能を体系的に解説します。

## **Virtual License Manager とは？**

VLM は FlexNet Embedded license manager 向けのライセンスを管理・処理するクラウドソフトウェアツールです。将来的には追加の license manager にも対応する予定ですが、その拡張はライセンスマネージャーが API などの外部インターフェースを提供し、情報取得やユーザー/デバイスへのライセンス割り当てが可能であることを条件とします。

Virtual License Manager (VLM) は現在 OpenLM Cloud のみに互換対応しており、将来的にオンプレミス版を提供する予定です。クラウドベースのため、OpenLM Cloud Portal の登録アカウントが必須です。

## **VLM のユーザーロール**

VLM には Admin Role と Manager Role の 2 種類のロールがあります。

### Admin Role

- **Admin Role** のユーザーは Physical License Managers、Virtual License Managers、Virtual Pools、Manager Role のユーザーを管理します。実施できる操作は次のとおりです。
- Physical License Managers とその features を閲覧します。
- Virtual License Managers とその features を閲覧・管理します。Physical License Managers の features から Virtual License Manager を作成できます。例えば、異なる Physical License Managers の複数 feature、または同一 Physical License Manager の複数 feature から 1 つの Virtual License Manager を作成できます。Virtual Pools が作成されていない場合に限り、Virtual License Manager を削除できます。
- Virtual Pools とその features を閲覧・管理します: Virtual License Managers の features から Virtual Pools を作成できます。具体的には、1 つの Virtual License Manager の 1 つの feature のライセンスだけを選んで Virtual Pool を作成します。この Virtual Pool は Manager Role のユーザーに割り当てられ、そのユーザーが社内の特定ユーザー/デバイスへのライセンス割り当てを担当します。つまり **Virtual Pool** は **License Manager の特定の feature に紐づくライセンスのプール** です。Virtual Pool 作成時に、含めるライセンス数を指定し、Virtual Pool を管理する Manager Role ユーザー（割り当て/解除を担当）を指定します。
- ライセンス割り当ては 1 対 1 であり、ある feature の 1 ライセンスは 1 ユーザー/デバイスにのみ割り当て可能です。
- Admin Role が Virtual Pool に割り当てるライセンス数を設定すると、その数量は該当 feature から差し引かれ、利用可能ライセンス数が減少します。
- この減算は各 Virtual Pool ごとに続き、数量が 0 になるまで進みます。feature のライセンス数が 0 になると、その feature は新しい Virtual Pool の作成に使用できなくなります。
- また、Virtual Pool は削除できます。削除すると、その Pool に紐づくライセンス数が作成元の License Manager の feature に戻り、削除した Virtual Pool のライセンス数分だけ増加します。
- Manager Role のユーザーを閲覧・管理します: Admin Role のユーザーは、VLM の Users タブと OpenLM Cloud Portal の Users タブの 2 か所で Manager Role ユーザーを確認できます。OpenLM Cloud Portal の Users タブでは、Manager Role の新規ユーザーの招待や削除も行えます。

### Manager Role

- **Manager Role** のユーザーは Virtual Pools を閲覧し、ライセンス割り当ての管理、割り当て、解除、ユーザーのデバイス管理を行えます。
- Virtual Pools とその features、およびライセンス数量を閲覧できます。
- デバイス ID により、デバイス（そこに紐づくユーザー）へライセンスを割り当てられます。割り当ては 1 対 1 であり、特定 feature の 1 ライセンスは 1 ユーザー/デバイスにのみ割り当て可能です。
- デバイス ID により、デバイス（そこに紐づくユーザー）へのライセンス割り当てを解除できます。解除も 1 対 1 であり、特定 feature の 1 ライセンスは 1 ユーザー/デバイスからのみ解除できます。
- Device または User に説明を追加できます。ユーザーは Device ID の暗号化表示のみのため、Manager Role では誰のユーザーかを把握しづらく、将来に備えて識別するのが困難です。そのため、ライセンス割り当て時に Device ID（ユーザー）へメモや説明を追加できます。Virtual Pool の特定 feature の Device Ids 数をクリックすると専用ページに移動し、そこで管理できます。

## **Virtual License Manager へのアクセス方法**

1. まだアカウントがない場合は、OpenLM Cloud Portal でアカウント登録を行います。次のリンクから登録してください: [OpenLM Cloud Portal Registration](https://www.openlm.com/products/software-license-management-cloud-saas).
2. OpenLM Cloud Portal には、登録ゾーンに応じた URL でログインします:  
   [OpenLM Cloud Portal - Other Countries](https://cloud.openlm.com/)  
   [OpenLM Cloud Portal - EU Countries](https://eu-cloud.openlm.com/)
3. OpenLM Cloud Portal で Virtual License Manager のプロダクトを有効化します。  
   ![](/img/legacy/word-image-56627-1.png)
4. Virtual License Manager (VLM) を開くには "Open" ボタンをクリックします。表示されるユーザーインターフェース (UI) は、割り当てられたロールによって異なります。

- Admin Role のユーザーが Virtual License Manager (VLM) を開くと、次の UI が表示されます:  
  ![](/img/legacy/word-image-56627-2.png)

- Manager Role のユーザーが Virtual License Manager (VLM) を開くと、次の UI が表示されます:  
  ![](/img/legacy/word-image-56627-3.png)

## **Virtual License Manager ユーザーガイド**

### Admin Role User guide

FlexNet Embedded サーバーの License Managers と Virtual License Manager (VLM) を同期するには、次の手順に従います:

1. 左側タブメニューの "Physical LM" をクリックして Physical License Managers ページにアクセスします。
2. Physical License Managers ページには "Available Features" と "Total Features" などの列が表示されます。
3. "Available Features" の数量は Virtual License Manager に割り当て可能な feature 数を示します。各 feature は 1 回だけ Virtual License Manager に割り当て可能です。feature を割り当てると、該当 Physical License Manager の "Available Features" 数が減少します。  
   **![](/img/legacy/word-image-56627-4.png)**
4. Physical License Manager の "Available Features" が 0 になると、新しい Virtual License Managers を作成できなくなります。feature はそれ以上割り当てられず、割り当て一覧にも表示されません。
5. "Total Features" は、可用性に関係なく Physical License Manager に紐づく feature の総数を表します。
6. "Total Features" が 0 の場合、その Physical License Manager によって提供・管理できる feature が存在しないことを意味します。この場合 "Available Features" も 0 になり、Virtual License Manager 作成に使用できません。

#### Search

- 検索フィールドを使って特定の Physical License Manager を簡単に見つけられます。探している名前を入力すると、表が自動的に絞り込まれます。  
  ![](/img/legacy/word-image-56627-5.png)

#### Management

- 表の列は、ヘッダー右上の三点アイコンから順序の入れ替え、サイズ調整、削除ができます。

#### Print and export

- 上記の三点アイコンから印刷やエクスポート機能を利用できます。表データを印刷したり、CSV にエクスポートしたりできます。

#### Information

- 現在のページやタブの情報が必要な場合は、ヘッダー右側の情報 "i" アイコンをクリックします。該当ページやタブに関する詳細が表示されます。  
  ![](/img/legacy/word-image-56627-6.png)

#### View Physical license manager features

- Physical License Manager に関連する Features を見るには、該当レコード末尾の "View" アイコンをクリックします。
- 検索フィールドで Feature 名を検索できます。
- Features 表示を閉じるには、クロスクローズアイコンをクリックします。
- 列の管理、印刷、エクスポートは Physical License Managers 表と同様に行えます。  
  ![](/img/legacy/word-image-56627-7.png)![](/img/legacy/word-image-56627-8.png)

#### Creating a Virtual License Manager

1. Virtual License Manager を作成するには、Physical License Managers タブを選択し、"Create Virtual LM" ボタンをクリックします。  
   ![](/img/legacy/word-image-56627-9.png)
2. フィールドに入力します: Virtual License Manager 名、タイプの選択、自由記述の説明。
3. 片方または両方の Physical License Managers から必要な features を選択して Virtual License Manager に割り当てたら、"SAVE" をクリックします。操作をキャンセルしたり前のページに戻る場合は、"CANCEL" をクリックします。  
   ![](/img/legacy/word-image-56627-10.png)![](/img/legacy/word-image-56627-11.png)

- Virtual License Manager が作成されると、自動的に Virtual License Managers ページへ移動し、左側タブで "Virtual LM" が選択された状態になります。
- このページに戻る、または左側タブメニューから他の項目を選ぶことができます。
- 自明な列に加えて "Available Features" と "Total Features" の列があります。
- "Available Features" の数量は Virtual Pools に割り当て可能な feature 数を示します。
- Virtual Pool を作成する際、割り当てるライセンス数を指定し、管理する Manager Role ユーザーを指定します。
- Admin Role のユーザーが Virtual Pools にライセンスを割り当てると、各 Virtual Pool ごとに数量が減少し、最終的に 0 になります。
- feature のライセンス数が 0 になると、新しい Virtual Pools の作成に使用できなくなり、その Virtual License Manager の利用可能 features 一覧から削除されます。
- Admin は Virtual Pools を削除できます。Virtual Pool を削除すると、この Virtual Pool のライセンス数が作成元の Virtual License Manager の feature に戻り、削除した Virtual Pool のライセンス数分だけ増加します。これにより、0 になっていた "Available Features" が増加し、他の Virtual Pool に割り当て可能になります。
- "Total Features" の数量は、利用可能ライセンスの有無に関係なく Virtual License Manager に紐づく feature の総数を表示し、該当 Virtual License Manager の全 feature を把握できます。  
  ![](/img/legacy/word-image-56627-12.png)
- 検索フィールドで Virtual License Manager 名を検索できます。
- 表の列をカスタマイズするには、表ヘッダー右上の三点アイコンを使用します。ここからサイズ調整や列の削除ができます。
- 同じアイコンで、表を印刷または CSV としてエクスポートできます。
- 現在のページ/タブの情報を確認するには、ヘッダー右側の "i" アイコンをクリックします。ページ名が表示されます。  
  ![](/img/legacy/word-image-56627-13.png)
- features を表示するには、Virtual License Manager レコード末尾の "View" アイコンをクリックします。
- 検索フィールドで feature 名を検索します。
- features 表示を閉じるには、クロスクローズアイコンをクリックします。
- 列の管理、印刷、エクスポートは Virtual License Manager 表と同様に行えます。  
  ![](/img/legacy/word-image-56627-14.png)![](/img/legacy/word-image-56627-15.png)

- Virtual License Manager を削除するには、対象を選択して "Delete" ボタンをクリックします。  
  ![](/img/legacy/word-image-56627-16.png)

#### Creating a Virtual Pool

1. Virtual Pool を作成するには、表の一覧から 1 つの Virtual License Manager を選択し、"Create Virtual Pool" ボタンをクリックします。  
   ![](/img/legacy/word-image-56627-17.png)
2. ヘッダー項目に入力します: Virtual Pool 名、割り当て先の Allocation Manager の選択、自由記述の説明。
3. Virtual License Manager から 1 つの feature を選択し、その feature のライセンス数量を指定して "SAVE" をクリックします。
4. 前のページに戻る、または操作をキャンセルする場合は "CANCEL" をクリックします。  
   ![](/img/legacy/word-image-56627-18.png)
5. Virtual Pool が作成されます。左側タブの "Virtual Pools" が選択された状態で Virtual Pools ページに自動的に移動します。このページや他の項目には左側タブメニューからいつでも移動できます。
6. Virtual Pool のレコード末尾の "View" アイコンをクリックすると、利用可能な Features を確認できます。Feature 名で検索するには検索フィールドを使用します。
7. Features 表示を閉じるには、クロスクローズアイコンをクリックします。列の管理、印刷、エクスポートは Virtual Pool 表と同様に行えます。  
   ![](/img/legacy/word-image-56627-19.png)![](/img/legacy/word-image-56627-20.png)

- Virtual Pool を削除するには、対象を選択して "Delete" ボタンをクリックします。  
  ![](/img/legacy/word-image-56627-21.png)

#### Users

1. Manager Role のユーザーを表示するには "Users" タブを選択します。  
   ![](/img/legacy/word-image-56627-22.png)
2. OpenLM Virtual License Manager の Manager Role ユーザーを作成するには、Cloud Portal にログインし、左側タブメニューから "Identity & Access Management(IAM) → Users" を選択して "Invite User" ボタンをクリックします。  
   ![](/img/legacy/word-image-56627-23.png)
3. 会社のメールアドレスでフォームに入力します。
4. Portal Role を "Viewer" に設定し、Virtual License Manager プロダクトの "Manager" ロールを設定します。
5. "Confirm" をクリックします。
6. ユーザーには Cloud Portal の登録用メール（仮パスワード付き）が送信されます。
7. ユーザーがメール内のリンクをクリックしてパスワードを設定すると、"Manager Role" として Virtual License Manager にログインできます（"Viewer" ロールとして Cloud Portal にもアクセスでき、Cloud Portal の製品一覧から Virtual License Manager を開けます）。  
   ![](/img/legacy/word-image-56627-24.png)

### Manager Role user guide

- Manager Role で利用できるタブは Virtual Pools タブです。利用できる機能と操作は次のとおりです:  
  ![](/img/legacy/word-image-56627-25.png)

#### Searching virtual pools

- 検索フィールドを使って Virtual Pools を名前で検索できます。

#### Managing the appearance of the columns

- 表ヘッダー右上の 3 つの点が並んだアイコンを使って、列の順序変更、サイズ変更、削除ができます。同じアイコンで表の印刷や CSV エクスポートも可能です。現在のページやタブの情報を表示するには、ヘッダー右側の情報 "i" アイコンをクリックします。  
  ![](/img/legacy/word-image-56627-26.png)

#### Obtaining features information

- Virtual Pool のレコード末尾の "View" アイコンをクリックすると Features を表示できます。Feature 名を検索するには検索フィールドを使用します。Features 表示を閉じるにはクロスクローズアイコンをクリックします。列の管理、印刷、エクスポートは Virtual Pool 表と同様に行えます。  
  ![](/img/legacy/word-image-56627-27.png)![](/img/legacy/word-image-56627-28.png)

#### Managing license allocation

- Manager は表の一覧から 1 つの Virtual Pool を選択し、"Manage Licenses Allocations" ボタンをクリックしてライセンス割り当てを管理できます。  
  ![](/img/legacy/word-image-56627-29.png)

- "ALLOCATE POOL" ページが表示されます。  
  ![](/img/legacy/word-image-56627-30.png)
- 列の管理: 表ヘッダー右上の三点アイコンで列の配置変更、サイズ変更、列の削除ができます。
- 表の印刷/エクスポート: 同じアイコンで表を印刷または CSV にエクスポートできます。
- ページ/タブ情報: ヘッダー右側の情報 "i" アイコンでページ名を表示できます。
- 列の詳細: 表には "Quantity"（総ライセンス数）、"Available"（割り当て可能数）、"Device Ids"（ライセンスを持つデバイス/ユーザー数）などの列が含まれます。
- Device/User の詳細: "Device Ids" 列はリンクで、割り当ての解除やデバイス/ユーザーの説明変更が可能なページへ移動します。
- 割り当ての変更: ライセンスを割り当てると "Available" が減り "Device Ids" が増加します。割り当てを解除すると逆になります。  
  ![](/img/legacy/word-image-56627-31.png)

- Device または User にライセンスを割り当てるには、表から feature を選択して "Execute Licenses Allocations" をクリックします。  
  ![](/img/legacy/word-image-56627-32.png)

- フォーム入力: Device ID と Description を含むデータを入力します。
- 暗号化: ユーザー情報は暗号化されているため、Manager は Device ID のみではユーザーを特定できません。
- メモ/説明の追加: Manager はライセンス割り当て時に Device ID へメモや説明を追加できます。
- 割り当ての管理: Virtual Pool の feature にある Device IDs 数をクリックすると専用ページにアクセスできます。
- 変更の保存: "SAVE" をクリックして変更を適用します。  
  ![](/img/legacy/word-image-56627-33.png)

- Device または User にライセンスが割り当てられます。
- "ALLOCATE POOL" に戻ります。
- "Device IDs" の数量が増加していることを確認します。
- Device または User へのライセンス割り当ては、ライセンスマネージャーが存在する実機/サーバー側で反映されるため、時間がかかる場合があります。
- OpenLM Virtual License Manager と実機/サーバー間には 1〜2 分の同期時間があります。  
  ![](/img/legacy/word-image-56627-34.png)

- ライセンス割り当ての解除や Device/User の説明変更を行うには、"Device Ids" 列の数値（リンク）をクリックします。次のページが表示されます:  
  ![](/img/legacy/word-image-56627-35.png)

- 検索フィールドを使って Device または User を ID で検索できます。
- 表ヘッダー右上の 3 つの点が並んだアイコンで列の順序変更、サイズ変更、削除ができます。
- 同じアイコンで表を印刷したり CSV にエクスポートしたりできます。
- ヘッダー右側の情報 "i" アイコンでページ名を表示できます。  
  **![](/img/legacy/word-image-56627-36.png)**

- Device または User の説明を編集するには、該当レコード末尾の "Edit" ボタンをクリックします。説明を変更できるフォームが表示されます:  
  ![](/img/legacy/word-image-56627-37.png)![](/img/legacy/word-image-56627-38.png)

- Device または User へのライセンス割り当てを解除するには、該当レコード末尾の "Delete" ボタンをクリックします。
- Device または User のライセンス割り当ての移動は、ライセンスマネージャーが存在する実機/サーバー側で反映されるため時間がかかります。
- OpenLM Virtual License Manager と実機/サーバー間には 1〜2 分の同期時間があります。  
  ![](/img/legacy/word-image-56627-39.png)![](/img/legacy/word-image-56627-40.png)
