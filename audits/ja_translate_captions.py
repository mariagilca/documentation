"""Translate the centered-italic image captions in ja files.

Scope: i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers/

For every italic caption on the line immediately following an `![alt](src)` image, replace
the English text with Japanese. Two passes:

  1. Exact-match dictionary for common boilerplate captions ("Click Save",
     "Verifying the configuration", "On left menu, select Pending Server").
  2. Pattern-match for vendor-templated captions ("Diagram of how OpenLM interfaces with X",
     "Adding X license manager in OpenLM Broker", "X credential configuration in Cloud Broker").

Captions that don't match any rule are left alone. The colleague reviewer can polish them
in a follow-up pass.

Idempotent.
"""

from __future__ import annotations

import re
from pathlib import Path

REPO = Path(__file__).parent.parent
SCOPE = REPO / "i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers"

# ---- Exact-match dictionary -----------------------------------------------

EXACT: dict[str, str] = {
    "Verifying the configuration": "設定の検証",
    "On left menu, select Pending Server": "左メニューで Pending Server を選択",
    "Approve and Merge": "Approve and Merge を選択",
    "Configure OpenLM Platform": "OpenLM Platform の設定",
    "Click Save.": "Save をクリック",
    "Click Save": "Save をクリック",
    "Save the configuration.": "設定を保存",
    "Save the configuration": "設定を保存",
    "Click Continue, then Save.": "Continue をクリックし、続いて Save をクリック",
    "Click Add Log File.": "Add Log File をクリック",
    "Click Apply": "Apply をクリック",
    "Click Restart Broker": "Restart Broker をクリック",
    "Test the connection": "接続をテスト",
    "Test the connection.": "接続をテスト",
    "Successful connection": "接続成功",
    "Open Pending Server": "Pending Server を開く",
    "Enter a descriptive Display Name": "わかりやすい Display Name を入力",
    "Enter a descriptive Display Name.": "わかりやすい Display Name を入力",
    "Save and restart Broker.": "保存して Broker を再起動",
    "Save and restart Broker": "保存して Broker を再起動",
    "In the Commands tab, browse to the folder containing the L3Harris log file and click Apply.":
        "Commands タブで L3Harris ログファイルを含むフォルダーを参照し、Apply をクリック",
    "Setting executable path for ASH WARE in OpenLM Broker":
        "OpenLM Broker での ASH WARE 実行ファイルのパス設定",
    "Example of a successful execution result": "実行結果が成功した例",
    "Configuring through the Broker UI": "Broker UI での設定",
    "OpenLM Broker configuration": "OpenLM Broker の設定",
    "OpenLM Broker setup with OLicense": "OLicense との OpenLM Broker セットアップ",
    "Adding OLicense manually in Broker": "Broker で OLicense を手動で追加",
    "Defining command path in Broker Web UI": "Broker Web UI でのコマンドパス指定",
    "Direct query between OpenLM Server and OLicense": "OpenLM Server と OLicense の直接クエリ",
    "Automatic Broker detection": "Broker の自動検出",
    "Automatic detection in OpenLM Broker": "OpenLM Broker での自動検出",
    "Open Broker UI at http://localhost:5090/.": "Broker UI を http://localhost:5090/ で開く",
    "Configure Cluster toggle:": "Cluster トグルを設定",
    "Configure Cluster toggle": "Cluster トグルを設定",
    "Configure command and execution options as needed (for example, start/stop toggles, periodic/on-demand inquiry).":
        "必要に応じてコマンドおよび実行オプションを設定（例: start/stop トグル、定期／オンデマンドの問い合わせ）",
    "Add log file configuration (same as earlier).":
        "ログファイル設定を追加（前述と同じ）",
    "Go to the Log Files tab.": "Log Files タブを開く",
    "Click Add Log File, then either enter the path manually or browse for it using the magnifying glass icon.":
        "Add Log File をクリックし、パスを手動で入力するか、虫眼鏡アイコンで参照",
    "In the Control Center, note:": "Control Center で次を確認",
    "At this point, OpenLM should start collecting SEH licensing information.":
        "この時点で OpenLM は SEH ライセンス情報の収集を開始します",
    "How Broker interfaces with OpenLM Server.": "Broker と OpenLM Server の連携",
    "LS-DYNA configuration in Broker web UI.": "Broker Web UI での LS-DYNA 設定",
    "Configuring SlickEdit in Broker web UI.": "Broker Web UI での SlickEdit 設定",
    "Approving SlickEdit in OpenLM Web Interface.": "OpenLM Web Interface での SlickEdit 承認",
    "SlickEdit license server approved in OpenLM Web Interface.":
        "OpenLM Web Interface で承認された SlickEdit ライセンスサーバー",
    "SlickEdit license manager active connection indicator.":
        "SlickEdit ライセンスマネージャーのアクティブ接続インジケーター",
    "Step 3: Configure License File Settings": "ステップ 3: ライセンスファイルの設定",
    "Step 4: Commands tab": "ステップ 4: Commands タブ",
    "Enable remote access in Sentinel Admin Control Center":
        "Sentinel Admin Control Center でリモートアクセスを有効化",
    "Add the FlexLM debug log file": "FlexLM デバッグログファイルを追加",
    "Save the configuration": "設定を保存",
    "Verify the lmutil path and execute": "lmutil のパスを確認し実行",
    "Configure OpenLM Server for EPDM": "EPDM 用に OpenLM Server を設定",
    "Alternatively, navigate to C:\\Program Files\\OpenLM\\OpenLM Broker\\lmsettings\\fva.properties and enter the credentials manually. Restart the Broker service if you use this method.":
        "あるいは、C:\\Program Files\\OpenLM\\OpenLM Broker\\lmsettings\\fva.properties に移動して認証情報を手動で入力します。この方法を使用した場合は Broker サービスを再起動してください。",
    "OpenLM Broker queries the license manager locally. Once collected, the data is sent to OpenLM Server for processing.":
        "OpenLM Broker がローカルでライセンスマネージャーをクエリし、収集したデータを OpenLM Server に送信して処理します。",
    "Successful execution output for Infor SLM license manager":
        "Infor SLM ライセンスマネージャーの実行結果が成功した例",
    "Setting license file path for InfoGraph in OpenLM Broker":
        "OpenLM Broker での InfoGraph ライセンスファイルパスの設定",
    "Setting license file path for Infor SLM in OpenLM Broker":
        "OpenLM Broker での Infor SLM ライセンスファイルパスの設定",
    "Configuring data inquiry for Infor SLM in OpenLM Broker":
        "OpenLM Broker での Infor SLM データ問い合わせの設定",
    "Setting executable path for Materialise Magics in OpenLM Broker":
        "OpenLM Broker での Materialise Magics 実行ファイルパスの設定",
    "Verifying Materialise Magics license manager connection":
        "Materialise Magics ライセンスマネージャー接続の検証",
    "Successful connection output": "接続成功時の出力",
    "Setting executable path for Houdini in OpenLM Broker":
        "OpenLM Broker での Houdini 実行ファイルパスの設定",
    "Manually adding a Houdini license manager in OpenLM Broker":
        "OpenLM Broker で Houdini ライセンスマネージャーを手動で追加",
    "In Settings, configure license files:": "Settings でライセンスファイルを設定",
    "If adding manually, click Add license file path and browse to each feature's license file.":
        "手動で追加する場合は Add license file path をクリックし、各機能のライセンスファイルを参照",
    "In the pop-up, select the license manager type, enter any port number (for example, 888), then click Add.":
        "ポップアップでライセンスマネージャータイプを選択し、任意のポート番号（例: 888）を入力して Add をクリック",
    "Go to Vendors. Click Add Vendor, enter the name, then click Confirm.":
        "Vendors を開き、Add Vendor をクリックして名前を入力し、Confirm をクリック",
    "Adding DSLS in Broker": "Broker で DSLS を追加",
    "Adding a Canvas license manager in OpenLM Broker":
        "OpenLM Broker で Canvas ライセンスマネージャーを追加",
    "Adding a CADENAS Server license manager in OpenLM Broker":
        "OpenLM Broker で CADENAS Server ライセンスマネージャーを追加",
    "Adding a log file for Canvas in OpenLM Broker": "OpenLM Broker で Canvas のログファイルを追加",
    "Adding a log file for CADENAS Server in OpenLM Broker":
        "OpenLM Broker で CADENAS Server のログファイルを追加",
    "Adding a log file for InfoGraph in OpenLM Broker":
        "OpenLM Broker で InfoGraph のログファイルを追加",
    "Adding Canvas vendor in OpenLM Broker": "OpenLM Broker で Canvas ベンダーを追加",
    "Adding CADENAS Server vendor in OpenLM Broker": "OpenLM Broker で CADENAS Server ベンダーを追加",
    "Adding InfoGraph License Manager in OpenLM Broker":
        "OpenLM Broker で InfoGraph ライセンスマネージャーを追加",
    "Adding InfoGraph vendor in OpenLM Broker": "OpenLM Broker で InfoGraph ベンダーを追加",
    "Adding Infor SLM License Manager in OpenLM Broker":
        "OpenLM Broker で Infor SLM ライセンスマネージャーを追加",
    "Adding Materialise vendor in OpenLM Broker": "OpenLM Broker で Materialise ベンダーを追加",
    "Adding Parasoft license manager in OpenLM Broker":
        "OpenLM Broker で Parasoft ライセンスマネージャーを追加",
    "Adding Parasoft vendor in OpenLM Broker": "OpenLM Broker で Parasoft ベンダーを追加",
    "Adding LexFloat Server license manager in OpenLM Broker":
        "OpenLM Broker で LexFloat Server ライセンスマネージャーを追加",
    "Adding LexFloat Server vendor in OpenLM Broker":
        "OpenLM Broker で LexFloat Server ベンダーを追加",
    "Adding Houdini vendor in OpenLM Broker": "OpenLM Broker で Houdini ベンダーを追加",
    "Adding QPS license manager in OpenLM Broker": "OpenLM Broker で QPS ライセンスマネージャーを追加",
    "Adding QPS vendor in OpenLM Broker": "OpenLM Broker で QPS ベンダーを追加",
    "Adding ASH WARE vendor in OpenLM Broker": "OpenLM Broker で ASH WARE ベンダーを追加",
    "Adding ZetaWare license manager in OpenLM Broker":
        "OpenLM Broker で ZetaWare ライセンスマネージャーを追加",
    "Adding ZetaWare vendor in OpenLM Broker": "OpenLM Broker で ZetaWare ベンダーを追加",
    "Adding log files for ZetaWare in OpenLM Broker":
        "OpenLM Broker で ZetaWare のログファイルを追加",
    "Adding log files for QPS in OpenLM Broker": "OpenLM Broker で QPS のログファイルを追加",
    "Configuring command path for QPS in OpenLM Broker":
        "OpenLM Broker での QPS コマンドパスの設定",
    "Broker UI settings for RMS": "RMS の Broker UI 設定",
    "How OpenLM interfaces with AEScripts License Manager": "OpenLM と AEScripts ライセンスマネージャーの連携",
    "How OpenLM interfaces with the COSCOM LicenseMonitor": "OpenLM と COSCOM LicenseMonitor の連携",
    "How OpenLM interfaces with OpenText": "OpenLM と OpenText の連携",
    "How OpenLM Broker queries AMP and forwards data to OpenLM Server":
        "OpenLM Broker が AMP をクエリし OpenLM Server にデータを転送する仕組み",
    "How OpenLM interfaces with TASKING": "OpenLM と TASKING の連携",
    "Approve AMP in Pending Server": "Pending Server で AMP を承認",
    "Step 1: Access the OpenLM Broker Interface": "ステップ 1: OpenLM Broker インターフェイスにアクセス",

    # Remaining entries
    "Go to Log Files.": "Log Files を開く",
    "Click Continue and then Save.": "Continue をクリックし、続いて Save をクリック",
    "Automatic Broker detection of FlexLM": "FlexLM の Broker 自動検出",
    "Broker interface with DSLS": "Broker と DSLS の連携",
    "OpenLM Broker configured to connect to the Materialise Magics license manager":
        "Materialise Magics ライセンスマネージャーに接続するよう設定された OpenLM Broker",
    "Add the vendor: switch to the Vendors tab → Add Vendor → enter a name → Continue.":
        "ベンダーを追加: Vendors タブで Add Vendor を選択し、名前を入力して Continue をクリック",
    "Enable the API OAuth setting and select Full OAuth scope when creating the Connected App. After setup, access Manage Consumer Details to retrieve and save your Consumer Key and Consumer Secret.":
        "Connected App 作成時に API OAuth 設定を有効化し、Full OAuth スコープを選択します。設定後、Manage Consumer Details にアクセスし、Consumer Key と Consumer Secret を取得して保存します。",
    "Monitoring capabilities": "監視機能",
    "Configure OpenLM to interface with EasyCopy": "OpenLM と EasyCopy の連携を設定",
    "Go to the Commands tab. In Executable path, enter:": "Commands タブで Executable path に入力",
    "Go to the Advanced tab and enter the pure::variants login and password.":
        "Advanced タブで pure::variants のログインとパスワードを入力",
    "Diagram of how OpenLM Broker interfaces with ESPRIT License Manager and OpenLM Server":
        "OpenLM Broker と ESPRIT ライセンスマネージャー／OpenLM Server の連携",
    "Go to Vendors tab → Add Vendor. Enter a descriptive name.":
        "Vendors タブで Add Vendor を選択し、わかりやすい名前を入力",
    "Go to Log File tab → Add Log File. Configure:":
        "Log File タブで Add Log File を選択して設定",
    "Save configuration.": "設定を保存",
    "Commands tab": "Commands タブ",
    "Save action to complete Broker configuration": "Save をクリックして Broker の設定を完了",
    "Broker queries Moldex3D License Manager locally using the MDX3DLMUtil utility. Data is then sent to OpenLM Server for processing.":
        "Broker が MDX3DLMUtil ユーティリティを使用してローカルで Moldex3D ライセンスマネージャーをクエリし、収集したデータを OpenLM Server に送信して処理します。",
    "If the Moldex3D service (for example, Moldex3D-LM Service) is running, Broker detects and configures it automatically.":
        "Moldex3D サービス（例: Moldex3D-LM Service）が稼働している場合、Broker が自動的に検出・設定します。",
    "(Optional) If RLM runs as a service, enable Use operating system start/stop commands and enter the Service Name.":
        "（任意）RLM がサービスとして実行されている場合、Use operating system start/stop commands を有効化し、Service Name を入力",
    "Broker queries JetBrains FLS locally over its HTTP port and sends the data to OpenLM Server.":
        "Broker は HTTP ポート経由でローカルから JetBrains FLS をクエリし、データを OpenLM Server に送信します。",
    "From the drop-down, select Pure Variants and enter the port number (for example, 888). Click Add.":
        "ドロップダウンから Pure Variants を選択し、ポート番号（例: 888）を入力して Add をクリック",
    "Go to the Vendors tab -> Add Vendor, enter pure::variants, and click Continue.":
        "Vendors タブで Add Vendor を選択し、pure::variants を入力して Continue をクリック",
    "Select tNavigator from the drop-down list and enter the port number. Click Add.":
        "ドロップダウンリストから tNavigator を選択し、ポート番号を入力して Add をクリック",
    "Go to Vendors -> Add Vendor and enter the name Chaos V-Ray. Click Continue.":
        "Vendors で Add Vendor を選択し、Chaos V-Ray を入力して Continue をクリック",
    "From the drop-down list, select Chaos and enter the port (for example, 35033).":
        "ドロップダウンリストから Chaos を選択し、ポート（例: 35033）を入力",
    "Diagram of how OpenLM Server interfaces with a FlexNet Embedded server":
        "OpenLM Server と FlexNet Embedded サーバーの連携",
    "Freshdesk profile settings with API key option":
        "API キーを表示する Freshdesk のプロファイル設定",
}


# ---- Pattern-based translation -------------------------------------------

PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"^Diagram of how OpenLM interfaces with (?:the )?(.+?)( License Manager| license manager)?\.?$"),
     r"OpenLM と \1 の連携の概要"),
    (re.compile(r"^Diagram of OpenLM (?:interface|Broker querying) (.+?)\.?$"),
     r"OpenLM が \1 を監視する仕組み"),
    (re.compile(r"^Diagram: (.+)$"),
     r"概要図: \1"),
    (re.compile(r"^How OpenLM interfaces with (?:the )?(.+?)\.?$"),
     r"OpenLM と \1 の連携"),
    (re.compile(r"^Adding (?:a )?(.+?) (?:license manager|License Manager) in OpenLM Broker\.?$"),
     r"OpenLM Broker で \1 ライセンスマネージャーを追加"),
    (re.compile(r"^Adding (.+?) vendor in OpenLM Broker\.?$"),
     r"OpenLM Broker で \1 ベンダーを追加"),
    (re.compile(r"^Adding (?:a )?log file for (.+?) in OpenLM Broker\.?$"),
     r"OpenLM Broker で \1 のログファイルを追加"),
    (re.compile(r"^Adding log files for (.+?) in OpenLM Broker\.?$"),
     r"OpenLM Broker で \1 のログファイルを追加"),
    (re.compile(r"^(.+?) credential configuration in Cloud Broker\.?$"),
     r"Cloud Broker での \1 認証情報の設定"),
    (re.compile(r"^(.+?) credentials configuration\.?$"),
     r"\1 認証情報の設定"),
    (re.compile(r"^Setting executable path for (.+?) in OpenLM Broker\.?$"),
     r"OpenLM Broker での \1 実行ファイルパスの設定"),
    (re.compile(r"^Setting license file path for (.+?) in OpenLM Broker\.?$"),
     r"OpenLM Broker での \1 ライセンスファイルパスの設定"),
    (re.compile(r"^Configuring (.+?) in OpenLM Broker\.?$"),
     r"OpenLM Broker での \1 の設定"),
    (re.compile(r"^Verifying (.+?) license manager connection\.?$"),
     r"\1 ライセンスマネージャー接続の検証"),
    (re.compile(r"^From the drop-down list, select (.+)\.?$"),
     r"ドロップダウンリストから \1 を選択"),
]


# ---- Driver --------------------------------------------------------------

IMG_RE = re.compile(r"!\[(?P<alt>[^\]]*)\]\(([^)]+)\)")
CAPTION_RE = re.compile(r"^(?P<indent>\s*)\*(?P<text>[^*\n]+)\*\s*$")


def translate_caption(text: str) -> str:
    if text in EXACT:
        return EXACT[text]
    for pat, repl in PATTERNS:
        m = pat.match(text)
        if m:
            return pat.sub(repl, text)
    return text


def process(path: Path) -> int:
    src = path.read_text(encoding="utf-8")
    lines = src.splitlines()
    n = 0
    for i, line in enumerate(lines):
        if not IMG_RE.search(line):
            continue
        if i + 1 >= len(lines):
            continue
        cap_match = CAPTION_RE.match(lines[i + 1])
        if not cap_match:
            continue
        original = cap_match.group("text").strip()
        translated = translate_caption(original)
        if translated == original:
            continue
        indent = cap_match.group("indent")
        lines[i + 1] = f"{indent}*{translated}*"
        n += 1
    if n:
        new_text = "\n".join(lines)
        if src.endswith("\n") and not new_text.endswith("\n"):
            new_text += "\n"
        path.write_text(new_text, encoding="utf-8")
    return n


def main() -> int:
    total_files = 0
    changed_files = 0
    total_translated = 0
    for p in sorted(SCOPE.rglob("*.mdx")):
        total_files += 1
        n = process(p)
        if n:
            changed_files += 1
            total_translated += n
    print(f"Files scanned:    {total_files}")
    print(f"Files modified:   {changed_files}")
    print(f"Captions changed: {total_translated}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
