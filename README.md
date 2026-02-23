# YossyHP

Yossyのペンギンサイト — 予備校英語科講師 Yossy の個人サイトです。

## 機能

- **AI英作文添削** — Cloudflare Worker + Claude API による英作文の自動添削
- **教材ダウンロード** — PDF・Word・Excel などの学習教材配布
- **授業情報・お問い合わせ** — 自己紹介・連絡フォーム

## 構成

```
YossyHP/
├── index.html            # トップページ
├── essay.html            # AI英作文添削ページ
├── files-download.html   # ファイルダウンロードページ
├── about.html            # About ページ
├── contact.html          # お問い合わせフォーム
├── style.css             # 全スタイル（ダーク/ライトテーマ）
├── theme.js              # ダークモード切替ロジック
├── worker.js             # Cloudflare Worker ソース（AI プロキシ）
├── wrangler.toml         # Wrangler 設定
├── files.json            # ダウンロードファイル一覧
└── files/                # 配布ファイル置き場
```

## デプロイ

### GitHub Pages（静的サイト）

`main` ブランチへの push で自動公開されます。

- URL: `https://yossy-ac.github.io/YossyHP/`
- 設定: GitHub → Settings → Pages → Branch: main / (root)

### Cloudflare Worker（AI プロキシ）

`worker.js` または `wrangler.toml` を `main` へ push すると、GitHub Actions が自動的に Cloudflare Workers へデプロイします。

- Worker URL: `https://essay-checker.yoshida-tom-ac.workers.dev`
- ワークフロー: `.github/workflows/deploy-worker.yml`

#### 必要な GitHub Secrets

| シークレット名 | 内容 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Workers Scripts: Edit 権限を持つ API トークン |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |

#### Cloudflare Worker シークレット

Anthropic API キーは Cloudflare Worker のシークレット変数として設定します（リポジトリにはコミットしない）。

```
wrangler secret put ANTHROPIC_API_KEY
```
