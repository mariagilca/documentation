"""Mirror the updated en docs into ja for engineering-lms and saas-platforms.

Strategy
========
For each en page we identify the variant (Stub / Partner-managed / Full / Landing)
and emit a Japanese version using:

  - Frontmatter: keeps title in English (URLs match), description and keywords kept
    English so search remains consistent.
  - Section headings: translated against a deterministic dictionary, with a few
    pattern-based fallbacks for parameterized headings ("Approve <X> in OpenLM Platform").
  - Boilerplate paragraphs: translated 1:1 from a sentence dictionary.
  - Procedure steps: phrase-level glossary applied longest-first. Untranslated
    fragments stay in English so the human reviewer can spot them.
  - The trailing Approve + Verify block is replaced wholesale with a canonical
    Japanese template.

Idempotent.

Run:
    python3 audits/ja_translate.py
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

REPO = Path(__file__).parent.parent
EN_ELMS = REPO / "docs/cloud/data-collection/connect-license-managers/engineering-lms"
EN_SAAS = REPO / "docs/cloud/data-collection/connect-license-managers/saas-platforms"
JA_ELMS = REPO / "i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers/engineering-lms"
JA_SAAS = REPO / "i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers/saas-platforms"


# ---------- Heading dictionary --------------------------------------------

HEADING_TRANSLATIONS = {
    "Before you begin": "はじめに",
    "Monitoring capabilities": "監視機能",
    "Monitoring capabilities and features": "監視機能",
    "Configure OpenLM Broker": "OpenLM Broker の設定",
    "Configure OpenLM Cloud Broker": "OpenLM Cloud Broker の設定",
    "Configure data collection": "データ収集の構成",
    "Configuring data collection": "データ収集の構成",
    "Verify the integration": "連携の検証",
    "Troubleshooting": "トラブルシューティング",
    "Reference": "参考",
    "Viewing reports": "レポートの閲覧",
    "How OpenLM monitors": "OpenLM による監視の仕組み",
    "What you receive after activation": "有効化後に利用できるもの",
    "Automatic Broker configuration": "Broker の自動検出",
    "Configuring through the Broker UI": "Broker UI での設定",
    "OpenLM Broker configuration": "OpenLM Broker の設定",
    "Configure DSLS log files": "DSLS ログファイルの設定",
    "Locate the JetBrains FLS token": "JetBrains FLS トークンの取得",
    "Manual Broker configuration": "Broker の手動設定",
    "Manual configuration (Broker web UI)": "手動設定（Broker Web UI）",
    "Manual configuration": "手動設定",
    "Configuring Broker (manual setup)": "Broker の手動設定",
    "Remote access settings troubleshoot": "リモートアクセス設定のトラブルシューティング",
    "Activate token calculations": "トークン計算の有効化",
    "Add manually": "手動で追加",
    "Use OpenLM Broker": "OpenLM Broker の利用",
    "Interfacing with OpenLM Server only": "OpenLM Server のみでの連携",
    "Interfacing with OpenLM Server + Broker": "OpenLM Server + Broker での連携",
    "Query using OpenLM Server only (direct method)": "OpenLM Server からの直接クエリ",
    "Adding ArcGIS Online to OpenLM": "ArcGIS Online の OpenLM への追加",
    "(Optional) Activate token support": "（任意）トークンサポートの有効化",
}


# ---------- Boilerplate sentences (exact match) ----------------------------

SENTENCE_TRANSLATIONS = {
    "Sign in to OpenLM Platform.":
        "OpenLM Platform にサインインします。",
    "From the menu, go to **License Servers** > **Pending Server**.":
        "メニューから **License Servers** > **Pending Server** を開きます。",
    "In OpenLM Platform, go to **License Servers Live** > **Server Statistics**.":
        "OpenLM Platform で **License Servers Live** > **Server Statistics** を開きます。",
    "In OpenLM Platform, go to **Allocation**.":
        "OpenLM Platform で **Allocation** を開きます。",
    "It can take up to 3 minutes for the status to update for a new connection.":
        "新規接続の場合、ステータスの反映まで最大 3 分かかります。",
    "It can take up to 3 minutes for data to appear after approval.":
        "承認後、データの反映まで最大 3 分かかります。",
    "Before you begin, make sure you have:":
        "はじめに、次が揃っていることを確認してください。",
    "Before starting, make sure you have:":
        "開始前に、次が揃っていることを確認してください。",
    "Before you query the license manager, install:":
        "ライセンスマネージャーへのクエリ前に、次をインストールしてください。",
    "To query Sentinel HASP, ensure:":
        "Sentinel HASP にクエリするには、次を確認してください。",
    "To query Sentinel RMS:":
        "Sentinel RMS にクエリするには、次を確認してください。",
    "Install the following:":
        "次をインストールしてください。",
    "Before starting, install:":
        "開始前に、次をインストールしてください。",
    "To begin monitoring, ensure you have the following components and permissions in place:":
        "監視を開始する前に、以下のコンポーネントと権限が揃っていることを確認してください。",
    "Follow these steps to configure OpenLM to monitor license usage and retrieve license statistics.":
        "OpenLM でライセンス使用状況および統計を収集するための設定手順は以下のとおりです。",
    "OpenLM Broker must be installed and configured to report to OpenLM before proceeding.":
        "本手順の前提として、OpenLM Broker をインストールし、OpenLM への報告設定を完了しておきます。",
    "OpenLM Broker must be installed and reporting to OpenLM Server before starting these steps.":
        "本手順の前提として、OpenLM Broker をインストールし、OpenLM Server への報告設定を完了しておきます。",
    "Install and configure OpenLM Broker before starting these steps.":
        "本手順の前提として、OpenLM Broker をインストールし設定しておきます。",
    "Install and configure OpenLM Broker on the same machine as":
        "次のマシンに OpenLM Broker をインストールし設定します：",
    "OpenLM Broker must already be installed and configured to report to OpenLM before proceeding.":
        "本手順の前提として、OpenLM Broker をインストールし、OpenLM への報告設定を完了しておきます。",
    "You must install and configure OpenLM Broker before continuing. See the Broker installation guide and the Broker configuration guide.":
        "本手順の前にあらかじめ OpenLM Broker をインストールし設定しておく必要があります。Broker のインストールガイドおよび設定ガイドを参照してください。",
}

# ---------- Phrase glossary (substring replace, longest-first) ------------

PHRASE_GLOSSARY: list[tuple[str, str]] = [
    # Verb phrases — most common in procedure steps
    ("Open the Broker UI at `http://localhost:5090/`",
     "Broker UI を `http://localhost:5090/` で開きます"),
    ("Open the Broker UI at",
     "Broker UI を開きます："),
    ("Open Broker UI at",
     "Broker UI を開きます："),
    ("Open the Broker web UI at",
     "Broker Web UI を開きます："),
    ("Open Broker web UI:",
     "Broker Web UI を開きます："),
    ("Open the OpenLM Cloud Broker dashboard.",
     "OpenLM Cloud Broker ダッシュボードを開きます。"),
    ("Open the OpenLM Platform.",
     "OpenLM Platform を開きます。"),
    ("Open OpenLM Web Interface",
     "OpenLM Web Interface を開きます"),
    # Broker UI navigation
    ("Go to **License Managers** and select **Detect**.",
     "**License Managers** を開き、**Detect** を選択します。"),
    ("Go to **License Managers** > **Add License Manager**.",
     "**License Managers** > **Add License Manager** を開きます。"),
    ("Go to License Managers -> Add License Manager.",
     "**License Managers** > **Add License Manager** を開きます。"),
    ("Go to License Managers -> Detect",
     "**License Managers** > **Detect** を開きます"),
    ("Go to License Managers and click Detect.",
     "**License Managers** を開き、**Detect** をクリックします。"),
    ("Go to License Manager -> Add License Manager.",
     "**License Manager** > **Add License Manager** を開きます。"),
    ("Validate and save.", "内容を確認し、保存します。"),
    ("Validate and save", "内容を確認し、保存します"),
    ("appears.", "が表示されます。"),
    ("appears", "が表示されます"),
    ("appears in the list", "が一覧に表示されます"),
    ("Confirm the test passes.", "テストが成功することを確認します。"),
    ("should appear.", "が表示されます。"),
    ("should appears", "が表示されます"),
    # Common verbs
    ("Select **Add License Manager**.", "**Add License Manager** を選択します。"),
    ("Select **Validate**, then **Save**.", "**Validate** を選択し、**Save** をクリックします。"),
    ("Select **Save**.", "**Save** を選択します。"),
    ("Select **Add**.", "**Add** を選択します。"),
    ("Select **Apply**.", "**Apply** を選択します。"),
    ("Select **Continue**.", "**Continue** を選択します。"),
    ("Select **Test connection** and confirm the test passes.",
     "**Test connection** を選択し、テストが成功することを確認します。"),
    ("Select **Detect**.", "**Detect** を選択します。"),
    ("Select **Execute**", "**Execute** を選択します"),
    ("Click Add License Manager.", "**Add License Manager** をクリックします。"),
    ("Click Add.", "**Add** をクリックします。"),
    ("Click Apply.", "**Apply** をクリックします。"),
    ("Click Save.", "**Save** をクリックします。"),
    ("Click Continue.", "**Continue** をクリックします。"),
    ("Click Continue, then Save.", "**Continue** をクリックし、続いて **Save** をクリックします。"),
    ("Click Save, then Execute to verify no errors appear.",
     "**Save** をクリックし、続いて **Execute** をクリックしてエラーがないことを確認します。"),
    ("Click Update, then Apply.", "**Update** をクリックし、続いて **Apply** をクリックします。"),
    ("Click Save, then click Execute.", "**Save** をクリックし、続いて **Execute** をクリックします。"),
    ("Click Restart Broker.", "**Restart Broker** をクリックします。"),
    ("Click Detect", "**Detect** をクリックします"),
    ("Click Add Vendor", "**Add Vendor** をクリックします"),
    ("Click Add Log File.", "**Add Log File** をクリックします。"),
    ("Click Execute", "**Execute** をクリックします"),
    ("click Add", "**Add** をクリックします"),
    ("click Continue", "**Continue** をクリックします"),
    ("click Save", "**Save** をクリックします"),
    ("click Apply", "**Apply** をクリックします"),
    ("click Detect", "**Detect** をクリックします"),
    ("click Execute", "**Execute** をクリックします"),
    # Status / verification
    ("appears in the list with a green status indicator.",
     "が緑のステータスで一覧に表示されることを確認します。"),
    ("Ensure", "次を確認します："),
    # Common settings
    ("Enter the port number, then select", "ポート番号を入力し、次を選択します："),
    ("Enter the port number,", "ポート番号を入力し、"),
    ("Enter the port number ", "ポート番号を入力します "),
    ("Enter the port number.", "ポート番号を入力します。"),
    ("Enter the port (default:", "ポート（既定:"),
    ("Enter the port number (default:", "ポート番号（既定:"),
    ("Enter the port", "ポートを入力します"),
    ("enter the port number,", "ポート番号を入力し、"),
    ("enter the port number", "ポート番号を入力します"),
    ("In the Commands tab,", "**Commands** タブで、"),
    ("In Commands,", "**Commands** で、"),
    ("In the Vendors tab,", "**Vendors** タブで、"),
    ("In Vendors,", "**Vendors** で、"),
    ("In the Log Files tab,", "**Log Files** タブで、"),
    ("In Log Files,", "**Log Files** で、"),
    ("In the Settings tab,", "**Settings** タブで、"),
    ("In Settings,", "**Settings** で、"),
    ("In the Advanced tab,", "**Advanced** タブで、"),
    ("In Commands, set the Executable path to", "**Commands** で、実行ファイルのパスを次の場所に設定します："),
    ("set the Executable path to", "実行ファイルのパスを次の場所に設定します："),
    ("set the executable path to", "実行ファイルのパスを次の場所に設定します："),
    ("set the path to the vendor's", "ベンダーの"),
    ("set the path to", "次のパスを設定します："),
    ("the executable path field, browse to",
     "**Executable path** フィールドで次の場所を参照します："),
    ("browse to", "次の場所を参照します："),
    ("If the default port is in use, try 5091 or 5092.",
     "既定のポートが使用中の場合は 5091 または 5092 を使用します。"),
    ("(or 5091, 5092 if the default port is in use)", "（既定のポートが使用中の場合は 5091 または 5092 を使用）"),
    ("If autodetect fails:", "自動検出が失敗した場合："),
    ("If auto-detect fails:", "自動検出が失敗した場合："),
    ("If detection fails:", "検出が失敗した場合："),
    ("If detection does not configure the integration, continue with Option 2.",
     "検出で連携が構成されない場合は、オプション 2 に進みます。"),
    ("From **LM type**, select", "**LM type** から次を選択します："),
    ("From the LM Type drop-down list, select", "**LM Type** ドロップダウンリストから次を選択します："),
    ("From the drop-down list, select", "ドロップダウンリストから次を選択します："),
    ("From the drop-down,", "ドロップダウンから、"),
    ("From the drop-down", "ドロップダウンから"),
    ("Save the configuration.", "設定を保存します。"),
    ("save the configuration", "設定を保存します"),
    ("Save the file.", "ファイルを保存します。"),
    # Vendor / Log
    ("Click Add Vendor.", "**Add Vendor** をクリックします。"),
    ("Click Add Vendor,", "**Add Vendor** をクリックし、"),
    ("Click Add Vendor", "**Add Vendor** をクリックします"),
    ("click Add Vendor", "**Add Vendor** をクリックします"),
    ("**Add Vendor** をクリックします and", "**Add Vendor** をクリックし、"),
    # OpenLM platform navigation
    ("Log in to OpenLM Platform.", "OpenLM Platform にサインインします。"),
    ("Login as an Admin", "管理者としてサインイン"),
    ("Log in to your account.", "アカウントにサインインします。"),
    ("From Menu, go to License Servers.", "メニューから **License Servers** を開きます。"),
    ("On left menu, select Pending Server", "左メニューで **Pending Server** を選択"),
    # Common imperatives — leave Enter / Select as English when the label follows so we
    # don't produce "次を入力します：the API key" garbage. The colleague refines vendor lines.
    ("Add the credential in OpenLM Cloud Broker", "OpenLM Cloud Broker に認証情報を登録"),
    ("Add the credential", "認証情報を登録"),
    ("Generate the credential", "認証情報を発行"),
    # Misc
    ("This guide explains how to", "本ガイドでは、次の方法を説明します："),
    ("This document describes how to", "本ドキュメントでは、次の方法を説明します："),
    ("This document describes the steps required to", "本ドキュメントでは、次に必要な手順を説明します："),
    ("This guide describes how to configure OpenLM with",
     "本ガイドでは、OpenLM を次と連携する方法を説明します："),
    ("Follow these steps to configure OpenLM to monitor license usage and retrieve",
     "OpenLM でライセンス使用状況と次を収集するための設定手順："),
    ("OpenLM can monitor", "OpenLM は次を監視できます："),
    ("OpenLM can interface with",
     "OpenLM は次と連携できます："),
    ("OpenLM supports monitoring",
     "OpenLM は次の監視をサポートしています："),
    ("through OpenLM Broker to track license statistics.",
     "を OpenLM Broker 経由でトラッキングします。"),
    ("through OpenLM Broker", "を OpenLM Broker 経由で"),
    ("through OpenLM Cloud Broker", "を OpenLM Cloud Broker 経由で"),
    ("This integration allows OpenLM to monitor",
     "本連携では、OpenLM で次を監視できます："),
    ("for license usage and availability.",
     "のライセンス使用状況と空き状況を監視します。"),
    ("for license usage, denials, and",
     "のライセンス使用状況、否認、および"),
    ("monitor license usage and obtain statistics.",
     "ライセンス使用状況を監視し、統計を収集します。"),
    ("monitor license usage and",
     "ライセンス使用状況と"),
    ("license usage and license statistics from",
     "ライセンス使用状況と統計（"),
    ("license usage and retrieve statistics from the",
     "ライセンス使用状況と統計を次から収集："),
    ("license usage and retrieve statistics from",
     "ライセンス使用状況と統計を次から収集："),
    ("retrieve statistics from",
     "次から統計を収集："),
    ("license usage,", "ライセンス使用状況、"),
    ("license statistics", "ライセンス統計"),
    ("collect statistics", "統計を収集します"),
]


# ---------- Templates ------------------------------------------------------

STUB_LEAD = "OpenLM は OpenLM Broker を介して {p} を監視します。詳細な設定手順は現在準備中で、次回のドキュメントリリースで公開予定です。"
SAAS_STUB_LEAD = "OpenLM は OpenLM Cloud Broker を介して {p} を監視します。詳細な設定手順は現在準備中で、次回のドキュメントリリースで公開予定です。"

STUB_BEFORE_ELMS = (
    "## はじめに\n\n"
    "- OpenLM Platform。\n"
    "- {p} と同じマシンにインストールされ、[Broker Hub](/cloud/data-collection/broker-hub) で承認された OpenLM Broker v25.x 以降。\n\n"
)
STUB_BEFORE_SAAS = (
    "## はじめに\n\n"
    "- OpenLM Platform テナント。\n"
    "- [Broker Hub](/cloud/data-collection/broker-hub) で承認された OpenLM Cloud Broker。\n\n"
)
STUB_NOTE = (
    ":::note[ドキュメント準備中]\n"
    "{p} の設定が今すぐ必要な場合は、[Customer Portal](https://customer.openlm.com) からチケットを発行し、このページを参照してください。"
    "ドキュメント完成までの間、最新の手順を個別にご案内します。\n"
    ":::\n"
)


PARTNER_ELMS_TPL = """\
# {p}

{lead}

## はじめに

- OpenLM Platform テナント。
- {p} 側の管理者アクセス権（連携の承認に必要）。

## OpenLM による監視の仕組み

OpenLM は、お客様の {p} アカウントと OpenLM テナントの間の接続を構成します。有効化後は、{p} の利用状況データが他のデータソースと同様に OpenLM Platform に表示され、同じ更新サイクルで反映されます。

:::info[サポートによる設定が必要]
本連携はお客様のテナントごとに OpenLM サポートが構成します。[Customer Portal](https://customer.openlm.com) からチケットを発行し、以下を記載してください。

- OpenLM テナント名
- {p} アカウント ID
- 連携を承認できる {p} 管理者の連絡先
:::

## 有効化後に利用できるもの

- OpenLM Platform レポートに {p} の利用状況データが表示されます。
- 他のデータソースと並んでアロケーションデータが利用できます。
"""


PARTNER_SAAS_TPL = """\
# {p}

{lead}

## はじめに

- OpenLM Platform テナント。
- {p} 側の管理者アクセス権（連携の承認に必要）。

## OpenLM による監視の仕組み

OpenLM サポートが、お客様の {p} アカウントと OpenLM テナントの間の接続を構成します。有効化後は、{p} の利用状況データが他のデータソースと同様に OpenLM Platform に表示され、同じ更新サイクルで反映されます。

:::info[サポートによる設定が必要]
本連携はお客様のテナントごとに OpenLM サポートが構成します。[Customer Portal](https://customer.openlm.com) からチケットを発行し、以下を記載してください。

- OpenLM テナント名
- {p} アカウント ID
- 連携を承認できる {p} 管理者の連絡先
:::

## 有効化後に利用できるもの

- OpenLM Platform レポートに {p} の利用状況データが表示されます。
- 他のデータソースと並んでアロケーションデータが利用できます。
"""


ELMS_TRAILING_TPL = """\
## OpenLM Platform で {p} を承認

1. OpenLM Platform にサインインします。
2. メニューから **License Servers** > **Pending Server** を開きます。
3. {p} ライセンスマネージャーを選択し、**Approve and Merge** をクリックします。

## 連携の検証

1. OpenLM Platform で **License Servers Live** > **Server Statistics** を開きます。
2. {p} が緑のステータスで表示されることを確認します。

:::note
新規接続の場合、ステータスの反映まで最大 3 分かかります。
:::
"""

SAAS_TRAILING_TPL = """\
## OpenLM Platform で {p} を承認

1. OpenLM Platform にサインインします。
2. メニューから **License Servers** > **Pending Server** を開きます。
3. {p} データソースを選択し、**Approve and Merge** をクリックします。

## 連携の検証

1. OpenLM Platform で **Allocation** を開きます。
2. {p} の利用状況データが表示されることを確認します。

:::note
承認後、データの反映まで最大 3 分かかります。
:::

## レポートの閲覧

- **ユーザーアクティビティの推移** — プラットフォームで活発に活動しているユーザーを把握し、シートの再配分に活用できます。
- **期限切れまたは未使用ライセンス** — 非アクティブなユーザーを特定し、シートを回収します。

## 参考

- [Broker Hub](/cloud/data-collection/broker-hub)
"""


# ---------- Page model + parser -------------------------------------------

@dataclass
class Page:
    name: str
    title: str
    slug: str
    description: str
    keywords: list[str]
    body: str  # body without frontmatter, with original H1 stripped


FRONTMATTER_RE = re.compile(r"^---\n(?P<fm>.*?)\n---\n", re.DOTALL)


def parse(path: Path) -> Page:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        raise ValueError(f"No frontmatter in {path}")
    fm_block = m.group("fm")
    body = text[m.end():]

    fm: dict[str, str] = {}
    keywords: list[str] = []
    in_kws = False
    for line in fm_block.splitlines():
        if line.startswith("keywords:"):
            in_kws = True
            continue
        if in_kws:
            sl = line.strip()
            if sl.startswith("-"):
                kw = sl.lstrip("- ").strip().strip('"').strip("'")
                if kw:
                    keywords.append(kw)
                continue
            else:
                in_kws = False
        if ":" in line:
            k, _, v = line.partition(":")
            fm[k.strip()] = v.strip().strip('"').strip("'")

    # Strip leading blank lines and the original H1 line.
    body = body.lstrip("\n")
    body = re.sub(r"^# [^\n]+\n+", "", body, count=1)

    return Page(
        name=path.name,
        title=fm.get("title", path.stem),
        slug=fm.get("slug", path.stem),
        description=fm.get("description", ""),
        keywords=keywords,
        body=body,
    )


def render_frontmatter(page: Page, *, sidebar_label: str | None = None,
                       sidebar_position: int | None = None) -> str:
    title = page.title
    title_yaml = f'"{title}"' if (" " in title or ":" in title) else title
    parts = ["---", f"title: {title_yaml}"]
    if sidebar_label:
        parts.append(f'sidebar_label: "{sidebar_label}"')
    if sidebar_position is not None:
        parts.append(f"sidebar_position: {sidebar_position}")
    parts.append(f'slug: "{page.slug}"')
    if page.description:
        parts.append(f'description: "{page.description}"')
    if page.keywords:
        parts.append("keywords:")
        for k in page.keywords:
            if any(c in k for c in (":", "#", "&", "%")):
                parts.append(f'  - "{k}"')
            else:
                parts.append(f"  - {k}")
    parts.append("---")
    return "\n".join(parts) + "\n"


def is_stub(body: str) -> bool:
    return "Documentation in progress" in body and len(body) < 1500


def is_partner(body: str) -> bool:
    return ":::info[Support assistance required]" in body


# ---------- Translation engine --------------------------------------------

def translate_headings(body: str) -> str:
    out_lines = []
    for line in body.splitlines(keepends=True):
        m = re.match(r"^(#{1,4})\s+(.*?)\s*$", line.rstrip("\n"))
        if m:
            level = m.group(1)
            heading = m.group(2)
            translated = HEADING_TRANSLATIONS.get(heading)
            if translated is None:
                # Parameterized headings
                m2 = re.match(r"Approve (.+) in OpenLM Platform$", heading)
                if m2:
                    translated = f"OpenLM Platform で {m2.group(1)} を承認"
                m2 = m2 or re.match(r"Generate the (.+) credential$", heading)
                if m2 and translated is None:
                    if "credential" in heading:
                        translated = f"{m2.group(1)} の認証情報を発行"
                m2 = re.match(r"Add the credential in OpenLM Cloud Broker$", heading)
                if m2 and translated is None:
                    translated = "OpenLM Cloud Broker に認証情報を登録"
                m2 = re.match(r"Option (\d+)\s*[—-]\s*Detect (.+) automatically$", heading)
                if m2 and translated is None:
                    translated = f"オプション {m2.group(1)} — {m2.group(2)} を自動検出"
                m2 = re.match(r"Option (\d+)\s*[—-]\s*Add (.+) manually$", heading)
                if m2 and translated is None:
                    translated = f"オプション {m2.group(1)} — {m2.group(2)} を手動で追加"
                m2 = re.match(r"Option (\d+)\s*[—-]\s*Detect automatically$", heading)
                if m2 and translated is None:
                    translated = f"オプション {m2.group(1)} — 自動検出"
                m2 = re.match(r"Option (\d+)\s*[—-]\s*Add manually$", heading)
                if m2 and translated is None:
                    translated = f"オプション {m2.group(1)} — 手動で追加"
                m2 = re.match(r"Configure (.+) in OpenLM Broker$", heading)
                if m2 and translated is None:
                    translated = f"OpenLM Broker で {m2.group(1)} を設定"
                m2 = re.match(r"How OpenLM monitors (.+)$", heading)
                if m2 and translated is None:
                    translated = f"{m2.group(1)} の監視の仕組み"
            if translated is not None:
                out_lines.append(f"{level} {translated}\n")
                continue
        out_lines.append(line)
    return "".join(out_lines)


def apply_phrase_glossary(body: str) -> str:
    sorted_glossary = sorted(PHRASE_GLOSSARY, key=lambda kv: len(kv[0]), reverse=True)
    for en, ja in sorted_glossary:
        body = body.replace(en, ja)
    return body


def apply_sentence_dictionary(body: str) -> str:
    for en, ja in SENTENCE_TRANSLATIONS.items():
        if en:
            body = body.replace(en, ja)
    return body


def translate_lead_paragraph(body: str, page: Page) -> str:
    """The lead paragraph (one sentence under H1, before the first H2) typically describes the
    integration. Replace the first paragraph with a Japanese stand-in if it matches a known
    pattern; otherwise leave the en line so the translator catches edge cases."""
    lines = body.split("\n", 1)
    if not lines:
        return body
    lead = lines[0]
    rest = lines[1] if len(lines) > 1 else ""
    p = page.title
    lead_translations = {
        f"This guide describes how to configure OpenLM with {p} to monitor license usage and collect statistics.":
            f"本ガイドでは、OpenLM を {p} と連携してライセンス使用状況と統計を収集する方法を説明します。",
        f"This guide describes how to configure OpenLM with the {p} License Server (ALS) to monitor license usage and collect statistics.":
            f"本ガイドでは、OpenLM を {p} ライセンスサーバー (ALS) と連携してライセンス使用状況と統計を収集する方法を説明します。",
        f"This document describes how to interface OpenLM with {p} to monitor license usage and obtain statistics.":
            f"本ドキュメントでは、OpenLM を {p} と連携してライセンス使用状況と統計を収集する方法を説明します。",
        f"This document describes the steps required to interface OpenLM with the {p}":
            f"本ドキュメントでは、OpenLM を {p} と連携するために必要な手順を説明します。{p}",
        f"This document describes how to configure OpenLM to monitor {p} License Manager and obtain license statistics.":
            f"本ドキュメントでは、OpenLM で {p} ライセンスマネージャーを監視し、統計を収集する設定方法を説明します。",
        f"This integration allows OpenLM to monitor {p} for license usage, expirations, and denials.":
            f"本連携では、OpenLM で {p} のライセンス使用状況、有効期限、否認を監視できます。",
        f"This integration allows OpenLM to monitor {p} for license usage, denials, and borrowed license reporting.":
            f"本連携では、OpenLM で {p} のライセンス使用状況、否認、借用ライセンスを監視できます。",
        f"This integration allows OpenLM to monitor {p} for license usage and availability.":
            f"本連携では、OpenLM で {p} のライセンス使用状況と空き状況を監視できます。",
        f"OpenLM can monitor {p} License Manager through OpenLM Broker to track license statistics.":
            f"OpenLM は OpenLM Broker を介して {p} ライセンスマネージャーを監視し、ライセンス統計を収集します。",
        f"OpenLM can interface with {p} to monitor license usage and obtain statistics.":
            f"OpenLM は {p} と連携してライセンス使用状況を監視し、統計を収集できます。",
        f"OpenLM supports monitoring of the {p} License Manager to provide reliable license reports and usage statistics.":
            f"OpenLM は {p} ライセンスマネージャーの監視に対応しており、ライセンスレポートと使用統計を信頼性高く提供します。",
        f"Follow these steps to configure OpenLM to monitor license usage and retrieve license statistics from {p}.":
            f"OpenLM で {p} のライセンス使用状況および統計を収集するための設定手順は以下のとおりです。",
        f"Follow these steps to configure OpenLM to monitor license usage and retrieve statistics from the {p} License Manager.":
            f"OpenLM で {p} ライセンスマネージャーのライセンス使用状況および統計を収集するための設定手順は以下のとおりです。",
        f"Follow these steps to configure OpenLM to monitor license usage and retrieve statistics from {p}.":
            f"OpenLM で {p} のライセンス使用状況および統計を収集するための設定手順は以下のとおりです。",
        f"Follow these steps to configure OpenLM to monitor license usage and retrieve license statistics.":
            "OpenLM でライセンス使用状況および統計を収集するための設定手順は以下のとおりです。",
        f"OpenLM monitors {p} seat usage and license assignments through OpenLM Cloud Broker.":
            f"OpenLM は OpenLM Cloud Broker を介して {p} のシート使用状況とライセンス割り当てを監視します。",
        f"OpenLM monitors {p} through OpenLM Cloud Broker.":
            f"OpenLM は OpenLM Cloud Broker を介して {p} を監視します。",
        f"OpenLM monitors {p} through OpenLM Broker.":
            f"OpenLM は OpenLM Broker を介して {p} を監視します。",
        f"OpenLM connects to {p} to retrieve license quantities and usage data.":
            f"OpenLM は {p} に接続し、ライセンス数と使用状況データを取得します。",
    }
    for en, ja in lead_translations.items():
        if lead.strip() == en.strip():
            return ja + ("\n" + rest if rest else "")
    return body


def translate_full_body(body: str, page: Page) -> str:
    body = translate_lead_paragraph(body, page)
    body = translate_headings(body)
    body = apply_sentence_dictionary(body)
    body = apply_phrase_glossary(body)
    return body


# ---------- Variant emitters ----------------------------------------------

def render_stub_elms(page: Page) -> str:
    fm = render_frontmatter(page)
    return fm + (
        f"# {page.title}\n\n"
        f"{STUB_LEAD.format(p=page.title)}\n\n"
        f"{STUB_BEFORE_ELMS.format(p=page.title)}"
        f"{STUB_NOTE.format(p=page.title)}"
    )


def render_stub_saas(page: Page) -> str:
    fm = render_frontmatter(page)
    return fm + (
        f"# {page.title}\n\n"
        f"{SAAS_STUB_LEAD.format(p=page.title)}\n\n"
        f"{STUB_BEFORE_SAAS.format(p=page.title)}"
        f"{STUB_NOTE.format(p=page.title)}"
    )


def render_partner_elms(page: Page) -> str:
    lead = f"OpenLM は {page.title} と連携し、ライセンス利用状況とアカウント統計を収集します。"
    return render_frontmatter(page) + PARTNER_ELMS_TPL.format(p=page.title, lead=lead)


def render_partner_saas(page: Page) -> str:
    lead = f"OpenLM は {page.title} の利用状況を監視し、アクティブユーザーの追跡、コスト最適化、未使用シートの回収に役立てます。"
    return render_frontmatter(page) + PARTNER_SAAS_TPL.format(p=page.title, lead=lead)


REVIEW_NOTE_ELMS = (
    "{/* TRANSLATION-NOTE: 一次翻訳（自動）。"
    "見出し・[Approve / Verify / :::note] のボイラープレートは確定済み。"
    "ベンダー固有の手順本文は人手レビューで仕上げてください。"
    "*/}\n\n"
)
REVIEW_NOTE_SAAS = REVIEW_NOTE_ELMS


def render_full_elms(page: Page) -> str:
    fm = render_frontmatter(page)
    body = page.body
    # Drop trailing canonical Approve+Verify (we replace with Japanese version).
    body = re.sub(
        r"\n+##\s+Approve\s+.+?\s+in OpenLM Platform\s*\n.*\Z",
        "",
        body,
        flags=re.DOTALL,
    ).rstrip()
    # Translate before-you-begin bullet for elms
    body = re.sub(
        r"-\s*OpenLM Platform\.?\s*\n",
        "- OpenLM Platform。\n",
        body,
    )
    body = re.sub(
        r"-\s*OpenLM Broker v25\.x or higher installed on the same machine as ([^,]+), and approve it in \[Broker Hub\]\(/cloud/data-collection/broker-hub\)\.",
        r"- \1 と同じマシンにインストールされ、[Broker Hub](/cloud/data-collection/broker-hub) で承認された OpenLM Broker v25.x 以降。",
        body,
    )
    body = re.sub(
        r"-\s*OpenLM Broker v25\.x or later, installed on the same machine as ([^,]+) and approved in \[Broker Hub\]\(/cloud/data-collection/broker-hub\)\.",
        r"- \1 と同じマシンにインストールされ、[Broker Hub](/cloud/data-collection/broker-hub) で承認された OpenLM Broker v25.x 以降。",
        body,
    )
    body = translate_full_body(body, page)
    return (
        fm
        + REVIEW_NOTE_ELMS
        + f"# {page.title}\n\n"
        + body.rstrip()
        + "\n\n"
        + ELMS_TRAILING_TPL.format(p=page.title)
    )


def render_full_saas(page: Page) -> str:
    fm = render_frontmatter(page)
    body = page.body
    body = re.sub(
        r"\n+##\s+Approve\s+.+?\s+in OpenLM Platform\s*\n.*\Z",
        "",
        body,
        flags=re.DOTALL,
    ).rstrip()
    body = re.sub(
        r"-\s*An active OpenLM Platform tenant\.\s*\n",
        "- OpenLM Platform テナント。\n",
        body,
    )
    body = re.sub(
        r"-\s*OpenLM Cloud Broker, approved in \[Broker Hub\]\(/cloud/data-collection/broker-hub\)\.\s*\n",
        "- [Broker Hub](/cloud/data-collection/broker-hub) で承認された OpenLM Cloud Broker。\n",
        body,
    )
    body = re.sub(
        r"-\s*OpenLM components: OpenLM Cloud Broker, approved in \[Broker Hub\]\(/cloud/data-collection/broker-hub\)\.\s*\n",
        "- OpenLM コンポーネント: [Broker Hub](/cloud/data-collection/broker-hub) で承認された OpenLM Cloud Broker。\n",
        body,
    )
    body = re.sub(
        r"-\s*Platform-specific [Rr]equirements:\s*",
        "- プラットフォーム固有の要件: ",
        body,
    )
    body = translate_full_body(body, page)
    return (
        fm
        + REVIEW_NOTE_SAAS
        + f"# {page.title}\n\n"
        + body.rstrip()
        + "\n\n"
        + SAAS_TRAILING_TPL.format(p=page.title)
    )


# ---------- Driver --------------------------------------------------------

def emit_section(en_root: Path, ja_root: Path, *, kind: str) -> tuple[int, int, int]:
    ja_root.mkdir(parents=True, exist_ok=True)
    n_stub = n_partner = n_full = 0
    for en_path in sorted(en_root.glob("*.mdx")):
        if en_path.name in {"index.mdx", "intro.mdx"}:
            continue
        page = parse(en_path)
        if is_stub(page.body):
            ja_text = render_stub_saas(page) if kind == "saas" else render_stub_elms(page)
            n_stub += 1
        elif is_partner(page.body):
            ja_text = render_partner_saas(page) if kind == "saas" else render_partner_elms(page)
            n_partner += 1
        else:
            ja_text = render_full_saas(page) if kind == "saas" else render_full_elms(page)
            n_full += 1
        (ja_root / en_path.name).write_text(ja_text, encoding="utf-8")
    return n_stub, n_partner, n_full


def emit_landing_elms() -> None:
    en = (EN_ELMS / "index.mdx").read_text(encoding="utf-8")
    fm_match = FRONTMATTER_RE.match(en)
    body = en[fm_match.end():] if fm_match else en
    group_map = {
        "FlexLM family": "FlexLM 系",
        "Sentinel family (Thales / Gemalto)": "Sentinel 系（Thales / Gemalto）",
        "Dassault Systèmes": "Dassault Systèmes",
        "Siemens": "Siemens",
        "Altair": "Altair",
        "PTC": "PTC",
        "Reprise and generic": "Reprise 系および汎用",
        "CodeMeter and dongle servers": "CodeMeter / ドングルサーバー",
        "Cloud licensing and SaaS": "クラウドライセンス／SaaS",
        "Engineering and simulation": "エンジニアリング／シミュレーション",
        "Geosciences and energy": "地球科学／エネルギー",
        "Other engineering license managers": "その他のエンジニアリング系ライセンスマネージャー",
    }
    for en_h, ja_h in group_map.items():
        body = body.replace(f"## {en_h}\n", f"## {ja_h}\n")
    body = body.replace(
        "OpenLM monitors usage across the engineering license managers listed below. Each integration follows the same shape: install OpenLM Broker on the license server, approve the connection in OpenLM Platform, then verify the data flow. Select an integration to see its configuration steps.",
        "OpenLM は、以下のエンジニアリング系ライセンスマネージャーの利用状況を監視します。すべての連携は同じ流れで設定します。ライセンスサーバーに OpenLM Broker をインストールし、OpenLM Platform で接続を承認し、データの流れを検証します。連携を選択すると設定手順が表示されます。",
    )
    body = body.replace(
        "If your license manager is not listed, or you need help configuring an integration, open a ticket from the [Customer Portal](https://customer.openlm.com).",
        "ご利用のライセンスマネージャーが一覧にない場合、または連携の設定に支援が必要な場合は、[Customer Portal](https://customer.openlm.com) からチケットを発行してください。",
    )
    body = body.replace("# Engineering license managers\n", "# エンジニアリング系ライセンスマネージャー\n", 1)
    fm_ja = (
        "---\n"
        'title: "Engineering license managers"\n'
        'sidebar_label: "概要"\n'
        'description: "OpenLM は OpenLM Broker を介して 100 以上のエンジニアリング系ライセンスマネージャーを監視します。"\n'
        "keywords:\n"
        "  - engineering\n"
        "  - license manager\n"
        "  - openlm broker\n"
        "  - integrations\n"
        "---\n"
    )
    (JA_ELMS / "index.mdx").write_text(fm_ja + body, encoding="utf-8")


def emit_landing_saas() -> None:
    en = (EN_SAAS / "intro.mdx").read_text(encoding="utf-8")
    fm_match = FRONTMATTER_RE.match(en)
    body = en[fm_match.end():] if fm_match else en
    group_map = {
        "CRM and sales": "CRM／セールス",
        "Customer support and engagement": "カスタマーサポート／エンゲージメント",
        "HR and people": "人事／HR",
        "Project, planning, and collaboration": "プロジェクト／計画／コラボレーション",
        "DevOps and developer tools": "DevOps／開発者向けツール",
        "Cloud, infrastructure, and identity": "クラウド／インフラ／ID 管理",
        "Productivity, content, and design": "生産性／コンテンツ／デザイン",
        "Engineering and design clouds": "エンジニアリング／デザインクラウド",
        "OpenLM": "OpenLM",
        "Other": "その他",
    }
    for en_h, ja_h in group_map.items():
        body = body.replace(f"## {en_h}\n", f"## {ja_h}\n")
    body = body.replace(
        "OpenLM connects to SaaS platforms through OpenLM Cloud Broker. Each integration follows the same shape: generate a credential in the SaaS platform, add it to OpenLM Cloud Broker, approve the data source in OpenLM Platform, then verify the data flow. Select a platform to see its configuration steps.",
        "OpenLM は OpenLM Cloud Broker を介して SaaS プラットフォームに接続します。すべての連携は同じ流れで設定します。SaaS プラットフォームで認証情報を発行し、OpenLM Cloud Broker に登録し、OpenLM Platform でデータソースを承認し、データの流れを検証します。プラットフォームを選択すると設定手順が表示されます。",
    )
    body = body.replace(
        "If a platform is marked as **Support assistance required**, OpenLM Support configures the integration for your tenant — open a ticket from the [Customer Portal](https://customer.openlm.com).",
        "**サポートによる設定が必要** と表示されているプラットフォームは、OpenLM サポートがお客様のテナントごとに連携を構成します — [Customer Portal](https://customer.openlm.com) からチケットを発行してください。",
    )
    body = body.replace(
        "If your platform is not listed, contact [support@openlm.com](mailto:support@openlm.com).",
        "ご利用のプラットフォームが一覧にない場合は、[support@openlm.com](mailto:support@openlm.com) までご連絡ください。",
    )
    body = body.replace("# SaaS platforms\n", "# SaaS プラットフォーム\n", 1)
    fm_ja = (
        "---\n"
        'title: "SaaS platforms"\n'
        'sidebar_label: "概要"\n'
        "sidebar_position: 0\n"
        'description: "OpenLM は OpenLM Cloud Broker を介して SaaS プラットフォームに接続します。"\n'
        "keywords:\n"
        "  - saas\n"
        "  - openlm cloud broker\n"
        "  - integrations\n"
        "---\n"
    )
    (JA_SAAS / "intro.mdx").write_text(fm_ja + body, encoding="utf-8")


def emit_categories() -> None:
    (JA_ELMS / "_category_.json").write_text(
        '{\n'
        '  "label": "エンジニアリング系ライセンスマネージャー",\n'
        '  "position": 1\n'
        '}\n',
        encoding="utf-8",
    )
    (JA_SAAS / "_category_.json").write_text(
        '{\n'
        '  "label": "SaaS プラットフォーム",\n'
        '  "position": 2,\n'
        '  "link": {\n'
        '    "type": "doc",\n'
        '    "id": "data-collection/connect-license-managers/saas-platforms/intro"\n'
        '  }\n'
        '}\n',
        encoding="utf-8",
    )


def main() -> int:
    elms_counts = emit_section(EN_ELMS, JA_ELMS, kind="elms")
    saas_counts = emit_section(EN_SAAS, JA_SAAS, kind="saas")
    emit_landing_elms()
    emit_landing_saas()
    emit_categories()
    print(f"engineering-lms: stub {elms_counts[0]}, partner {elms_counts[1]}, full {elms_counts[2]}")
    print(f"saas-platforms:  stub {saas_counts[0]}, partner {saas_counts[1]}, full {saas_counts[2]}")
    print("landing pages:   2")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
