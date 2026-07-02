/* =============================================================================
 * Release Notes (JA) — full-page locale override
 * =============================================================================
 *
 * ⚠️ DUAL-SOURCE PAGE — read this before editing.
 *
 * Docusaurus picks this file up for the `ja` locale INSTEAD of the source
 * page at `src/pages/release-notes.js`. <Translate> wraps and
 * `i18n/ja/code.json` entries do NOT apply to this surface — every visible
 * string is authored directly here in Japanese.
 *
 * If you change ANY visible string, link target, image, Spotlight order,
 * or Demo on the English source, mirror the same change here in Japanese.
 *
 * Quick checklist when editing:
 *   1. Make the change in `src/pages/release-notes.js` (EN).
 *   2. Apply the equivalent change here in Japanese.
 *   3. Confirm both files parse, then `npm run build` to verify both
 *      locales render the new content.
 * ===========================================================================*/

import React, { useContext, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import SubscribeButton from '@site/src/components/SubscribeButton';
import { ReleaseList, ReleaseEntry, ReleaseEntryOpenContext } from '@site/src/components/ReleaseTimeline';
import styles from '@site/src/pages/release-notes.module.css';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function ArcadeEmbed() {
  // Defer mounting the third-party iframe until the release is expanded, so a
  // collapsed release never pays the embed's DOM/network cost.
  const open = useContext(ReleaseEntryOpenContext);
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const linkLabel = 'デモを新しいタブで開く';
  if (!mounted) return null;

  // Wrapper lives inside the component (matching the EN <Demo>), so an
  // unmounted/collapsed demo yields no DOM at all — no empty bordered card.
  return (
    <div className={styles.embedCard}>
      <figure style={{ margin: 0 }}>
        <div
          style={{
            position: 'relative',
            paddingBottom: 'calc(45.27777777777778% + 41px)',
            height: '0',
            width: '100%',
          }}
        >
          <iframe
            src="https://demo.arcade.software/z4bEgB46IOOmUcn8NhTv?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
            title="インタラクティブデモ：Broad Peak の License Access Control"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write"
            aria-hidden="true"
            tabIndex={-1}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
          />
        </div>
        <figcaption style={{ marginTop: '0.75rem' }}>
          <a
            href="https://demo.arcade.software/z4bEgB46IOOmUcn8NhTv?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel}
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

// Cho Oyu の全体リリースウォークスルー（イントロ直後、スポットライトの前に配置）。
// 英語版の <Demo {...nextReleaseDemos.release} /> に対応。ArcadeEmbed と同様に、
// リリースが展開されるまで iframe のマウントを遅延する。
function ChoOyuReleaseDemo() {
  const open = useContext(ReleaseEntryOpenContext);
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const src =
    'https://demo.arcade.software/3Zy0dx93OotREscX9mQ2?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true';
  const linkLabel = 'デモを新しいタブで開く';
  if (!mounted) return null;

  return (
    <div className={styles.embedCard}>
      <figure style={{ margin: 0 }}>
        <div
          style={{
            position: 'relative',
            // このレコーディングの公開 Arcade 埋め込みスニペットのアスペクト比。
            paddingBottom: 'calc(58.01713586291309% + 41px)',
            height: '0',
            width: '100%',
          }}
        >
          <iframe
            src={src}
            title="インタラクティブデモ：Cho Oyu リリース"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write"
            aria-hidden="true"
            tabIndex={-1}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
          />
        </div>
        <figcaption style={{ marginTop: '0.75rem' }}>
          <a href={src} target="_blank" rel="noopener noreferrer">
            {linkLabel}
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

const featureOverview = [
  {
    title: '高度なレポーティングとSAMコストモジュール',
    bullets: [
      <>
        機能単位のコスト追跡: 機能ごとにコストを追跡できます。データは購入発注（PO）、
        納品発注、CSVインポート、または手動入力で取り込みます。
      </>,
      <>
        無駄（Wastage）分析: 購入量と実使用量のギャップを特定します。計算式:{' '}
        <code>Wastage = Investment - Usage</code>。例: 1日10時間の稼働料金を支払っているのに、
        年間の実利用が合計50時間しかない場合、失われた金額を特定します。
      </>,
      <>
        時間軸レポート: 時間、週、四半期、年単位でコストを追跡します。
      </>,
      <>
        地域/地理的コンプライアンス: 認可された地域でのライセンス利用を確認します。
      </>,
      <>
        ライセンス利用率: シート効率を深掘りします。
      </>,
      <>
        借用ライセンス: オフライン利用中のライセンス可視化。
      </>,
    ],
  },
  {
    title: 'ソフトウェアカタログとマッピング',
    bullets: [
      <>
        グローバル vs ローカルカタログ: ローカルカタログを提供すると、OpenLMがグローバル
        カタログへマッピングし、名称を標準化します。
      </>,
      <>
        親子マッピング: 例）MS Word などの機能を、MS Office などの親サブスクリプションへ
        シームレスに紐付けます。
      </>,
      <>
        プロセス-機能マッピング: 特定の機能を、それが支える業務プロセスと整合させます。
      </>,
      <>
        コンプライアンス追跡: 未承認機能や未承認ユーザーに起因するリスクを特定します。
      </>,
    ],
  },
  {
    title: 'ビジネスインテリジェンス（BI）：インサイトレイヤー',
    bullets: [
      <>
        Quick Suite インサイト: 事後対応ではなく、先回りの管理を可能にする洞察を提供します。
      </>,
      <>
        過少/過剰利用の検知: 眠っているライセンスと、需要超過によるボトルネックを即座に
        特定します。
      </>,
      <>
        運用インサイト: 更新判断を迅速化する戦略的なデータポイントを提供します。
      </>,
    ],
  },
  {
    title: '人工知能（AI）と自然言語',
    bullets: [
      <>
        シナリオ/What-if分析: ライセンス数やモデル変更が、予算や拒否率に与える影響を
        シミュレーションします。
      </>,
      <>
        NLQ（NLPによる動的クエリ生成）: 自然言語でデータにアクセスできるチャットUIです。
      </>,
    ],
    note: (
      <div className={styles.example}>
        <div className={styles.exampleRow}>
          <span className={styles.exampleLabel}>入力</span>
          <span>先月、ロンドンオフィスでAutoCADライセンスを最も使用した人のチャートを表示して。</span>
        </div>
        <div className={styles.exampleRow}>
          <span className={styles.exampleLabel}>出力</span>
          <span>動的な可視化と、平易なサマリー。</span>
        </div>
      </div>
    ),
  },
];

const additionalUpdates = [
  'エージェント内のドングル監視におけるリアルタイム通信。',
  'プロセスのコマンドライン引数とウィンドウタイトル監視をサポート。',
  '特定ユーザーに対するプロセス収集を期間指定で無効化。',
  'プロセス監視フローの改善。',
  'プロセスセッション作成の修正。',
  'End-User Services（EUS）の通知UXを改善。',
  'Currently Consumed Licenses ウィンドウに「ライセンスを削除」操作を追加。',
  '新しいアラート種別: LFM Triads。',
  'Directory Synchronization Service（DSS）UIのドメイン設定に匿名プロパティを追加。',
  'Cloud Admin UIにクラウドパートナーを追加。',
  'Users & Groups Service（UGS）でユーザー別名を自動作成。',
  'UGSにClean Upマネージャーを追加。',
];

const upcoming = [
  '匿名化サービス。',
  'Broker スタンバイモード — Broker をアンインストールせずに一時停止（対応する Broker Hub コマンドセットを含む）。',
];

const homepageBullets = [
  'オフラインのライセンスサーバー数と拒否されたリクエスト数を表示するKPIサマリーカード。各カードから対応するビューへワンクリックで遷移できます。',
  'ライセンスサーバーステータスのドーナツチャートが、サーバー群を「正常」「保留中」「エラー」の状態別に表示し、個々の障害が集計値の陰に隠れることがなくなります。',
  '拒否された機能トップ5と使用中の機能トップ5を並べて表示。需要が上限に達している箇所と、エンジニアリングチームが予算を投じている箇所を一目で把握できます。',
  '飽和状態のライセンスプールトップ5と未活用のライセンスプールトップ5を並べて表示。カスタムレポートを作成することなく、再配分の機会を確認できます。',
  '使用傾向ウィジェットおよび期限切れ・更新予定ウィジェット、さらに重要度を反映したアラートバーがページ上部に重要なシグナルを表示します。',
  '初回利用の管理者向けの「ツアーを開始」ガイド付きウォークスルーと、Software License Monitoring（SLM）が未アクティベーションの場合に空のウィジェットではなくロックカードを表示するSLMアクティベーションゲートを提供します。',
];

const lfmBullets = [
  'LFMとSLMの自動同期により、ライセンスサーバー名がライセンスファイルと常に同期されます（トライアド構成にも対応）。',
  'ライセンスファイルごとの履歴ビュー。ドラフト、デプロイ、無効化、削除など各イベントを時系列で記録。',
  '解析済みライセンス機能を構造化された表として表示 — 機能名、ベンダー、バージョン、ライセンスタイプ、開始/有効期限、数量、キー。',
  '同一ライセンスファイルの異なるバージョンを比較：原文の並列比較に加え、追加・削除・変更された機能をハイライトする解析済み機能テーブルの比較。',
  'Broker Hubへプッシュする前にライセンスファイルを事前検証（構造的・意味的・サーバー可用性チェックを含む、ファイル本文の検証と警告検出）。',
];

const lacUpdates = [
  'SLMと統合し、ライセンスサーバーの削除/無効化に対する応答性を向上。ライセンスサーバーが必要なポリシー/ルール/アセットにエラーアイコンと説明ツールチップを表示します。',
  'UGSと統合し、Users & Groupsの削除/無効化に対する応答性を向上。該当エンティティが必要なルールにエラーアイコンと説明ツールチップを表示します。',
  'キューのレコードがエラーや履歴を残さず消える誤動作を修正しました。',
];

const nextLacUpdates = [
  <>
    <strong>割り当てとスケジュールの追加/編集フローを効率化。</strong>
    割り当てとスケジュールの作成・編集をシンプルにし、列数を減らして表示を整理することで
    データの見やすさを向上しました。ルールとスケジュールはサーバー割り当て詳細（Server Allocation
    Details）に統合され、一度に 1 つのライセンスマネージャーに集中して操作できます。
  </>,
  <>
    <strong>プロジェクト単位の割り当て。</strong>
    FLEXlm および RLM ライセンスマネージャーでプロジェクト単位の割り当てに対応しました。
    従来のユーザー / グループ / ワークステーションに加え、プロジェクトをエンティティタイプとして
    割り当てられます。
  </>,
  <>
    <strong>エージェント強制（最小実用版）。</strong>
    LACは、ライセンスの割り当てを Agent Activity Manager と突き合わせ、稼働中の Workstation Agent を
    介さずにライセンスを消費しているワークステーションを検出するようになりました。新しいグローバル
    強制トグルを有効にすると、次回のデプロイではそれらのワークステーションへの割り当てがスキップされ、
    高価なライセンスの消費データの正確性を回復します。OpenLM はパッシブな観測者から、能動的な
    コンプライアンス制御へと進化します。一時的にオフラインなエージェントと未インストールの
    エージェントを判別できるため、短時間の切断によって正当な利用者がペナルティを受けることはありません。
  </>,
  <>
    <strong>一括割り当て作成。</strong>
    1 回の操作で、1 つのアセットに対して何百ものエンティティや機能を追加できます。割り当てウィザードで
    複数の機能や複数のエンティティをまとめて選択するだけで、LAC が組み合わせごとに 1 つの割り当てを
    作成します。これにより、200 グループをオプションファイルに登録するのに 1 日仕事だった従来の手順は
    不要になります。新しい <code>AddRules</code> GraphQL ミューテーションが基盤として動作し、既存の{' '}
    <code>AddRule</code> ミューテーションは変更されていません。
  </>,
  <>
    <strong>SaaSデプロイ。</strong>
    ルールを、スケジュール実行と手動実行の両方で SaaS ライセンスサーバーに対してデプロイできるようになり、
    SaaSとオンプレミスの対応範囲のギャップが埋まりました。
  </>,
  <>
    <strong>Users & Groups Service（UGS）の破損エンティティに対する強靱なデプロイ。</strong>
    アセットおよびスケジュールのデプロイは、参照しているユーザーやグループが UGS で
    無効化・削除・空状態になっていてもエラーで停止しなくなりました。該当する割り当てはスキップされ、
    明確な警告とともにログに記録され、デプロイメント履歴に表示されます。これにより、
    管理者はデプロイ全体を失わずに、後続のクリーンアップを進められます。
  </>,
];

const samDiscoveryBullets = [
  'ディスカバリーエージェントを一元的にオーケストレーションする Software Catalog Discovery ページ。',
  '「Discovered Vendors」タブ：ベンダーグリッド、ベンダー管理、オンデマンドのベンダーディスカバリー。',
  '「Discovered Products」タブ：エンリッチ状況の表示と、オンデマンドの製品ディスカバリー。',
  '「Job Runs & History」タブ：実行中ジョブの監視と、過去のディスカバリー実行履歴の閲覧。',
];

const newIntegrationBullets = [
  <>
    <strong>Zendesk。</strong>OpenLM のアラートから Zendesk チケットを自動作成できるようになりました。
    接続の認証と設定を行う新しいセットアップ画面を備えています。
  </>,
  <>
    <strong>Google Chat。</strong>OpenLM のアラートを Google Chat のスペースで受け取り、GraphQL API を
    基盤とするスラッシュコマンドで、会話から離れずに OpenLM のデータへ問い合わせできます。権限は
    同意ページで管理され、保存された連携データはリクエストに応じて削除できます。
  </>,
  <>
    <strong>Monday SAM。</strong>新しい monday.com アプリが、ソフトウェア資産管理を monday に
    持ち込みます。monday アプリから OpenLM のアイデンティティ統合インターフェースへの
    シームレスな登録フローを備えています。
  </>,
];

const biDashboardBullets = [
  <>
    <strong>Multi-License Consumption。</strong>同一の機能・製品に対して複数のライセンスキーを
    同時保持しているユーザーを検出する新しいレポート。回収可能な重複消費を、関係するサーバー・
    ライセンス・ユーザー・機能の KPI とともに表示します。
  </>,
  <>
    <strong>Active Analytics Overview。</strong>エグゼクティブサマリーを改称し、Direct Query モードで
    リアルタイムのハブとして再構築：レポートサマリー、トップ 10 レポート、ホスト可用性、
    アクティブユーザー、現在消費中のライセンス、機能使用状況。
  </>,
  <>
    <strong>QoS 付きライセンス利用率。</strong>スライダーで目標サービス品質（QoS）を設定すると、
    それを満たすライセンス数の統計的な推奨値が得られます。推奨値は実際に観測されたピークを
    上限とするため、現実が必要とした以上の数を勧めることはありません。
  </>,
  <>
    <strong>ユーザーエイリアシング。</strong>複数のアイデンティティが、すべてのレポートで一貫して
    1 人の正規ユーザーに集約されます。詳細が必要な場合は、子ユーザー名フィルタでドリルダウンできます。
  </>,
  <>
    <strong>ソフトウェアカタログ。</strong>ディスカバリーで構築されたカタログエントリーが
    レポーティングの参照レイヤーとなり、生のライセンス文字列ではなく標準化された製品・ベンダーに
    利用状況を紐づけます。関連レポートにはソフトウェア名フィルタが追加されています。
  </>,
];

const nextReleaseAdditionalUpdates = [
  'プラットフォーム全体でインターフェースを刷新し、外観と挙動を統一。',
  'SLM の各画面でフィルタをグリッドヘッダーに内蔵してデータ表示領域を拡大。チェックアウトポリシーをその場で編集可能に。',
  'Broker Hub のハウスキーピング：データを報告しないまま残る Broker エントリーを自動削除、アップロードされた Broker ファイルを設定可能な期限で自動クリーンアップ、承認されないまま報告を続ける Broker には一時停止コマンドを送信。',
  'ServiceNow 連携：日次スケジュール同期と画面上のライブステータス、13 テーブルからのデータ処理、クラウドプラットフォームからの拒否レコード連携、Viewer ロールの操作制限、新しい Event Management / Alerts コンポーネント。',
  'ナビゲーションの読み込みを高速化し、メニュー検索を改善。オンプレミスのメニューに ServiceNow Connector を追加。',
  'Users & Groups：ユーザー一覧とユーザー追加/編集ページを刷新、メールエイリアスの検索、ユーザー作成日でのソート、古いワークステーションの自動クリーンアップ。',
  '監査イベントは製品で Audit サービスが有効な場合にのみ処理され、不正な形式のイベントはクラウド/オンプレミスの両環境で除外されます。',
  'レポーティング：QuickSight ダッシュボードが Direct Query でより新鮮な結果を表示、Superset BI レポートをプラットフォームナビゲーションに統合、レポートでユーザーエイリアスを解決、Reporting Data API が GraphQL の where 句を完全サポート。',
  'アカウントの一時停止・削除イベントを Broker Hub、License Manager、使用状況トラッキング、OpenLM Server で一貫して処理。',
  '20 件を超える注目すべき修正：Personal Dashboard の読み込み高速化、ナビゲーションのクリック時クラッシュ、License Access Control のルール処理、レポートにおける MATLAB クライアントバージョンの欠落、US クラウドでの製品アクティベーション障害など。',
];

function FeatureSection({ title, bullets, note }) {
  return (
    <section className={styles.featureSection}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <ul className={styles.featureList}>
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
      {note}
    </section>
  );
}

function UpdateList({ items }) {
  return (
    <ul className={styles.updateList}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function Changelog() {
  const title = 'リリースノート';
  const description = 'OpenLM Platform の最新の機能リリース、改善、バグ修正。';

  // Advertise the clean Markdown twin emitted by src/plugins/llm-markdown
  // (ja/release-notes.md) so crawlers/AI agents can discover it from the page,
  // matching the rel=alternate links on doc pages. location.pathname carries
  // the locale-prefixed baseUrl, so this resolves to ja/release-notes.md.
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = (siteConfig.url ?? '').replace(/\/$/, '');
  const baseUrl = (siteConfig.baseUrl ?? '/').replace(/\/$/, '');
  const mdHref = `${siteUrl}${location.pathname.replace(/\/$/, '')}.md`;

  // 共有 / リッチリザルト用メタデータ: OG画像と、最新の出荷済みリリースの
  // 日付を機械可読にする TechArticle JSON-LD。
  const ogImage = `${siteUrl}${baseUrl}/img/release-notes/homepage-dashboard.png`;
  const releaseJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'OpenLM Platform — Cho Oyu release',
    description,
    datePublished: '2026-07-02',
    url: `${siteUrl}${location.pathname.replace(/\/$/, '')}#cho-oyu`,
    // docusaurus.config.js の headTags JSON-LD で宣言したサイト共通の Organization /
    // Platform 製品エンティティを @id で参照する。@id 参照はページ単位のグラフに
    // マージされるため、この記事も他ページと同じ 2 製品エンティティグラフに属し、
    // レガシーではなく OpenLM Platform にスコープされる。
    publisher: { '@id': `${siteUrl}/#organization` },
    about: { '@id': `${siteUrl}/#platform` },
  });

  return (
    <Layout title={title} description={description}>
      <Head>
        <link rel="alternate" type="text/markdown" href={mdHref} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{releaseJsonLd}</script>
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>リリースノート</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
            <div className={styles.heroSubscribe}>
              <SubscribeButton />
            </div>
          </div>
        </section>

        <div className={styles.heroDivider} aria-hidden="true" />

        <ReleaseList
          expandAllLabel="すべて展開"
          collapseAllLabel="すべて折りたたむ"
          expandedAllMessage="すべてのリリースを展開しました。"
          collapsedAllMessage="すべてのリリースを折りたたみました。"
        >
          <ReleaseEntry
            defaultOpen
            slug="cho-oyu"
            date="2026年7月2日"
            dateTime="2026-07-02"
            badge="Cho Oyu"
            title="OpenLM Platform — Cho Oyu リリース"
            intro="Cho Oyu リリースは、レポーティングデータを会話で扱えるようにし、「観測」を「強制」へ進化させます。OpenLM MCP コネクターはレポーティングデータを AI アシスタントから自然言語で問い合わせられるようにし、License Access Control には強制エンジンが加わります。再設計されたホームページが QuickSight ベースのロビーに代わり、Agent Activity Manager では Workstation Agent 全体への一括アップグレードを 1 つの操作で実行でき、License File Management はライセンスファイルの編集・検証・デプロイを 1 つのワークスペースに集約します。さらに、OpenLM Platform の一部となった License Parser、SAM のソフトウェアディスカバリースイート、AI 利用レポーティング、3 つの新しいインテグレーション、大幅に拡大した SaaS / AI 監視がこのリリースに加わります。"
          >
              <ChoOyuReleaseDemo />

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>OpenLM MCP コネクター</h3>
                <p className={styles.spotlightSummary}>
                  OpenLMが Model Context Protocol（MCP） — AIアシスタントをライブの業務データへ接続する
                  オープン標準 — に対応しました。Claude、ChatGPT、Cursor、Windsurf、Gemini CLI、その他の
                  MCP対応クライアントをテナントに向けて OAuth で一度サインインするだけで、自然言語で
                  問い合わせができます: <em>「先月もっとも拒否された機能は？」</em>、
                  <em>「オフィス別にAutoCADの未活用シートを表示して。」</em>。OpenLM MCP コネクターは
                  プロンプトをレポーティングデータベースに対する GraphQL クエリへ変換し、表、サマリー、
                  あるいは — 上位 AI プランでは — フルにインタラクティブなダッシュボードを返します。
                  新しい BI ツールも、CSV のエクスポートも、手作業のフィルタも要りません。レポーティング
                  データを、会話で。
                </p>
                <p className={styles.spotlightSummary}>
                  各リージョンのエンドポイントが提供されます — 米国は{' '}
                  <code>https://cloud-us.openlm.com/mcp</code>、EU は{' '}
                  <code>https://cloud-eu.openlm.com/mcp</code>。クライアント設定とツールリファレンスの
                  全容は{' '}
                  <Link to="/cloud/category/openlm-mcp-connector">
                    OpenLM MCP コネクターのドキュメント
                  </Link>
                  を参照してください。
                </p>
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>License Access Control (LAC)</h3>
                <p className={styles.spotlightSummary}>
                  LACが「観測」から「強制」へ進化します。新しいエージェント強制エンジンは、
                  Workstation Agent が稼働していないワークステーションからのライセンス消費を防ぎ、
                  一括ルール作成は大規模なオプションファイル運用を煩雑にしていたルールごとの呼び出しを
                  解消します。さらに、SaaS ライセンスサーバーがデプロイの対象に加わりました。
                  デプロイ自体もより強靱になり、デプロイメント履歴もようやく完全になります。バージョンごとの
                  詳細な履歴については{' '}
                  <Link to="/cloud/changelog/cloud/license-access-control">
                    License Access Control のリリースノート
                  </Link>{' '}
                  をご覧ください。
                </p>
                <UpdateList items={nextLacUpdates} />
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>新しいホームページダッシュボード</h3>
                <p className={styles.spotlightSummary}>
                  新しいホームページは、ロビーではなくダッシュボードです。サインインすれば、ライセンスの
                  健全性、拒否件数、プール利用状況がすぐに見えます。QuickSight ベースのページは廃止され、
                  ネイティブのウィジェットに置き換わりました。表示は速くなり、クラウド専用の
                  依存関係もなくなりました。すべてのウィジェットが共通のシェルを使うため、ロード中・空・
                  エラーの各状態の見え方と挙動が揃います。詳細な履歴は{' '}
                  <Link to="/cloud/changelog/cloud/homepage">ホームページのリリースノート</Link>{' '}
                  をご覧ください。
                </p>
                <UpdateList items={homepageBullets} />
                <figure className={styles.releaseFigure}>
                  <img
                    src="/documentation/img/release-notes/homepage-dashboard.png"
                    alt="オフラインサーバー数と拒否されたリクエスト数のKPIカード、ライセンスサーバーのヘルスドーナツ、拒否された機能と使用中の機能の棒グラフ、飽和状態および未活用のライセンスプールウィジェットを備えた、新しいOpenLMホームページダッシュボード"
                    loading="lazy"
                  />
                  <figcaption className={styles.releaseFigcaption}>
                    再設計されたホームページは、ライセンスサーバーの健全性、拒否件数の傾向、利用度の高い機能、
                    ライセンスプールの利用状況を、ログイン後の単一画面に表示します。
                  </figcaption>
                </figure>
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>Agent Activity Manager から Workstation Agent を一括アップグレード</h3>
                <p className={styles.spotlightSummary}>
                  Workstation Agent を 1 台ずつ更新する時代は終わりです。Agent Activity Manager から、
                  フリート全体のエージェントを任意に選択し、対象の Workstation Agent バージョンを指定して、
                  単一の操作でアップグレードを開始できます。マシンごとの MSI 作業も、エンドポイントを
                  個別に触る必要もなく、ロールアウトの進捗は 1 つの画面で確認できます。特定チームへの
                  ホットフィックス展開、段階的ロールアウト、組織全体の最新エージェントへの同日移行に
                  ご利用ください。
                </p>
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>macOS 版 Workstation Agent</h3>
                <p className={styles.spotlightSummary}>
                  OpenLM Workstation Agent が macOS（Intel および Apple Silicon）で
                  ネイティブに動作するようになりました。.pkg またはシェルインストーラーで
                  インタラクティブにインストールするか、MDM を使って管理対象フリート全体に
                  展開できます。macOS が Windows および Linux と並ぶ第一級のプラットフォームとして、
                  ライセンスおよびプロセスの監視に対応します。バージョンごとの詳細な履歴は{' '}
                  <Link to="/cloud/changelog/components/workstation-agent">
                    Workstation Agent のリリースノート
                  </Link>{' '}
                  をご覧ください。
                </p>
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>License File Management（LFM）</h3>
                <p className={styles.spotlightSummary}>
                  LFM は、ライセンスファイルの編集・検証・配信を 1 か所に集約します。プッシュ前にドラフトで
                  安全に作業し、各ファイルの解析済み機能を構造化された表で確認、テキストと機能の両レベルで
                  バージョンを比較できます。さらに、LFM がライセンスファイルとライセンスサーバーのリンクを
                  SLM と自動同期し、トライアドにも対応、ファイルごとの完全なイベント履歴を保持します。
                  詳細は <Link to="/cloud/lfm">License File Management</Link> のドキュメントをご覧ください。
                </p>
                <UpdateList items={lfmBullets} />
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>License Parser</h3>
                <p className={styles.spotlightSummary}>
                  これまでスタンドアロン製品として提供されていた License Parser が、OpenLM Platform の
                  一部になりました。FlexLM ライセンスファイルをドラッグ＆ドロップするだけで、
                  その内容を即座に構造化して確認できます。サマリービュー、発行日（Issued At）ビュー、
                  解析結果の検索を備えています。ファイルはすべてメモリ上で解析され、ストレージには
                  一切書き込まれません。License Manager と直接統合されており、サポート外のファイルを
                  アップロードした場合は明確なメッセージが表示されます。
                </p>
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>SAM のソフトウェアディスカバリー</h3>
                <p className={styles.spotlightSummary}>
                  Software Asset Management に、AI を活用したディスカバリースイートが加わります。
                  Discovery Agent のパイプラインは、まずソフトウェアベンダー（本社所在地、別名、
                  公式サイト）を発見し、次に個々の製品を発見・エンリッチして、ベンダー定義の
                  機能コード（SKU）やデプロイ形態（オンプレミス、クラウド、ハイブリッド）を抽出します。
                  エンリッチに成功した製品は承認済みカタログエントリーへ自動昇格されるため、
                  手作業のキュレーションなしでカタログの信頼性を維持できます。
                </p>
                <UpdateList items={samDiscoveryBullets} />
              </section>

              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>AI Proxy による AI 利用レポーティング</h3>
                <p className={styles.spotlightSummary}>
                  AI サブスクリプションもまたライセンスです — このリリースはそれを前提に扱い始めます。
                  新しいプラットフォームコンポーネントである AI Proxy は、Anthropic、OpenAI、
                  Google Vertex（Gemini）への LLM API トラフィックの前段に位置し、リクエストの
                  内容を読み取ることなくトークン利用量を取得します。アイデンティティ解決により、
                  利用状況は匿名のキーではなく実際の人に紐づきます：Anthropic の OAuth
                  アイデンティティは claude.ai プロファイルエンドポイント経由で解決され、Anthropic
                  Admin API キーも認識されます。
                </p>
                <p className={styles.spotlightSummary}>
                  新しい QuickSight ダッシュボードは、このデータを 4 つのページで意思決定に
                  つなげます。エグゼクティブ概要は、総コスト、総トークン、ライセンス割り当て済み
                  ユーザーと実際に利用したユーザーの対比、上位利用者を中心に、モデルファミリー別
                  コストとモデル別トークン構成比も表示します。モデル消費分析は、各ユーザーの
                  モデル構成をトークンとコストの台帳とともに分解します。ユーザー消費分析は、
                  日次のトークンとコストの推移に加え、ライセンスティアの適正化にもっとも有効な
                  シグナルである、ユーザーごとのピーク 5 時間トークンバーストを示します。さらに、
                  エクスポート可能な詳細レポートが、ユーザーとモデルごとの日次記録を提供します。
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>3 つの新しいインテグレーション</h3>
                <UpdateList items={newIntegrationBullets} />
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>SaaS / AI 監視の拡大</h3>
                <p className={styles.featureSummary}>
                  SaaS Agent は Canva、Zoom、Claude AI の割り当て（License Access Control 対応）、
                  Cursor AI、Apollo.io、LinkedIn 企業ページを監視できるようになり、Altair と
                  JetBrains Cloud の監視を Cloud Broker から引き継ぎました。Cloud Broker は
                  GitHub Copilot の利用追跡（クレジットとリクエスト）、Google Gemini の初期対応、
                  API ベースの monday.com 監視を追加。さらに SaaS Agent はリモートからの
                  自動アップデートに対応しました。
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>BI ダッシュボード</h3>
                <UpdateList items={biDashboardBullets} />
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>ダウンロードが Platform Administration に集約されました</h3>
                <p className={styles.featureSummary}>
                  Platform と Legacy のインストーラーが、すべて{' '}
                  <strong>Platform Administration → Products → Downloads</strong>{' '}
                  に集約されました。Platform と Legacy のタブを切り替えると、
                  各コンポーネントのバージョンとドキュメントへのリンクを 1 か所で確認できます。
                </p>
                <figure className={styles.releaseFigure}>
                  <img
                    src="/documentation/img/release-notes/downloads-products.png"
                    alt="OpenLM Products の Downloads 画面。Platform と Legacy のタブの下に Workstation Agent、Broker、DSA、SaaS Agent が並び、それぞれに Download ボタンと Documentation リンクが表示されている"
                    loading="lazy"
                  />
                  <figcaption className={styles.releaseFigcaption}>
                    Platform Administration → Products → Downloads:
                    Platform と Legacy のタブを切り替えれば、すべてのインストーラーを 1 か所で確認できます。
                  </figcaption>
                </figure>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>より安全なログイン方法</h3>
                <p className={styles.featureSummary}>
                  OpenLM の Web アプリがシングルサインオン（SSO）に対応しました。
                  いずれかのアプリにログインすれば、Usage、Allocation、Denial、Identity
                  などの他のアプリを再ログインなしで開けます。一度ログアウトすると、
                  OpenLM はすべてのデバイス上のすべてのアプリのセッションを数秒以内に終了します。
                  ログイントークンはブラウザーに保存されなくなり、認証情報は OpenLM
                  サーバー上に保持されるため、ブラウザー拡張機能やマルウェア、画面・
                  ネットワークのキャプチャから読み取られることはありません。これまでと同じ
                  ユーザー名とパスワードをそのまま使用できます。アップデート後に初めて
                  OpenLM を開くときは、一度だけログインが必要になる場合があります。
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>追加アップデート</h3>
                <UpdateList items={nextReleaseAdditionalUpdates} />
              </section>
          </ReleaseEntry>

          <ReleaseEntry
            slug="broad-peak"
            date="2026年2月3日"
            dateTime="2026-02-03"
            badge="Broad Peak"
            title="OpenLM Platform - Broad Peak リリース"
            intro="このアップデートは、財務の可視性向上、ソフトウェアのスマートなマッピング、そして利用データを先回りの意思決定に変える新しいインテリジェンスレイヤーを提供します。"
          >
              <section className={styles.spotlight}>
                <h3 className={styles.spotlightTitle}>License Access Control (LAC)</h3>
                <p className={styles.spotlightSummary}>
                  LACはライセンス管理をポリシー駆動の強制へ進化させます。誰が・どの機能を・いつ
                  使えるかを定義すると、LACがオプションファイルを生成し、ライセンスマネージャーへ
                  デプロイしてチェックアウト時に適用します。ポリシーはルールを束ね（スケジュールも
                  可能）、監査ログは許可/拒否の試行を記録し、UGSやFeatures Serviceとの統合で
                  ユーザー/グループ/機能の検証を行います。
                </p>
                <UpdateList items={lacUpdates} />
              </section>

              <ArcadeEmbed />

              <div className={styles.featureStack}>
                {featureOverview.map((feature) => (
                  <FeatureSection key={feature.title} {...feature} />
                ))}
              </div>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>Identity Discovery</h3>
                <p className={styles.featureSummary}>
                  Identity Discoveryサービスを使って、IdPのログイン活動を追跡できます。ログイン
                  イベントをOpenLMに取り込み、誰が、いつ、どのサービスにログインしたかを確認できます。
                  同一種類を含む複数のアイデンティティアカウントをサポートします。
                </p>
                <p className={styles.featureNote}>
                  注: Identity Discovery はログインのメタデータのみを収集します。パスワードや認証
                  シークレットは収集しません。
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>Cloud Broker: 対応SaaS拡大</h3>
                <p className={styles.featureSummary}>
                  Cloud Brokerが次のSaaSプラットフォームに対応しました: Bentley、Figma、ZoomInfo、
                  Priority、Monday.com、Syncfusion、Adobe、Zoho、Apollo.io、QuickSuite、Cadenas、Canvas、
                  Materialise Magic、Ash Ware、GNS、OGI、ETAP。
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>追加アップデート</h3>
                <UpdateList items={additionalUpdates} />
              </section>
          </ReleaseEntry>

          <ReleaseEntry
            variant="upcoming"
            slug="coming-next"
            date="近日公開"
            badge="進行中"
            title="近日リリース予定"
            intro="これらは現在進行中で、Broad Peakの後に順次リリースされます。"
          >
            <UpdateList items={upcoming} />
          </ReleaseEntry>
        </ReleaseList>
      </main>
    </Layout>
  );
}
