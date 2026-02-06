import React from 'react';
import Layout from '@theme/Layout';
import styles from '@site/src/pages/release-notes.module.css';

export function ArcadeEmbed() {
  const linkLabel = 'デモを新しいタブで開く';

  return (
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
          title="Broad Peak"
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
  'マテリアル移行。',
  'プロセスのコマンドライン引数とウィンドウタイトル監視をサポート。',
  '特定ユーザーに対するプロセス収集を期間指定で無効化。',
  'プロセス監視フローの改善。',
  'プロセスセッション作成の修正。',
  'EUS通知UXの改善。',
  'Currently Consumed Licenses ウィンドウでライセンス削除が可能に。',
  'バグ修正。',
  '新しいアラート種別の統合: LFM Triads。',
  'DSS UI: ドメイン設定に匿名プロパティを追加。',
  'Cloud Admin UIにクラウドパートナーを追加。',
  'UGS: ユーザー別名の自動作成。',
  'UGSのClean Upマネージャー。',
];

const upcoming = [
  '匿名化サービス。',
  'LFMのファイル履歴とSLM同期: テスト完了、機能認識の実装、プッシュ前のライセンスファイル事前検証。',
];

const lacUpdates = [
  'SLMと統合し、ライセンスサーバーの削除/無効化に対する応答性を向上。ライセンスサーバーが必要なポリシー/ルール/アセットにエラーアイコンと説明ツールチップを表示します。',
  'UGSと統合し、Users & Groupsの削除/無効化に対する応答性を向上。該当エンティティが必要なルールにエラーアイコンと説明ツールチップを表示します。',
  'キューのレコードがエラーや履歴を残さず消える誤動作を修正しました。',
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

  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>リリースノート</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
          </div>
        </section>

        <div className={styles.heroDivider} aria-hidden="true" />

        <section className={styles.entries}>
          <article className={styles.entry}>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>2026年2月3日</span>
              <span className={styles.entryBadge}>Broad Peak</span>
            </div>
            <div className={styles.entryBody}>
              <header className={styles.entryHeader}>
                <h2 className={styles.entryTitle}>OpenLM Platform - Broad Peak リリース</h2>
                <p className={styles.entryIntro}>
                  このアップデートは、財務の可視性向上、ソフトウェアのスマートなマッピング、そして
                  利用データを先回りの意思決定に変える新しいインテリジェンスレイヤーを提供します。
                </p>
              </header>

              <section className={styles.spotlight}>
                <div className={styles.spotlightLabel}>スポットライト</div>
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

              <div className={styles.embedCard}>
                <ArcadeEmbed />
              </div>

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
            </div>
          </article>

          <article className={`${styles.entry} ${styles.entryUpcoming}`}>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>近日公開</span>
              <span className={styles.entryBadgeUpcoming}>進行中</span>
            </div>
            <div className={styles.entryBody}>
              <header className={styles.entryHeader}>
                <h2 className={styles.entryTitle}>近日リリース予定</h2>
                <p className={styles.entryIntro}>
                  これらは現在進行中で、Broad Peakの後に順次リリースされます。
                </p>
              </header>
              <UpdateList items={upcoming} />
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
