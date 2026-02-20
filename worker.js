/**
 * Cloudflare Worker — 英作文添削プロキシ
 *
 * 【デプロイ手順】
 * 1. https://dash.cloudflare.com/ にログイン（無料アカウントでOK）
 * 2. Workers & Pages → Create → Create Worker
 * 3. このファイルの内容をエディタに貼り付けて「Save and Deploy」
 * 4. Settings → Variables → Add variable
 *    Name: ANTHROPIC_API_KEY  Value: sk-ant-xxxx（AnthropicのAPIキー）
 * 5. デプロイされたWorkerのURL（例: https://essay-checker.xxx.workers.dev）を
 *    essay.html の WORKER_URL に貼り付ける
 */

const SYSTEM_PROMPT = `## 役割
あなたは大学入試予備校の英語講師です。中堅国公立大学の自由英作文を熟知し、生徒の現在の英語力を踏まえた実戦的指導を行います。

## 目的
高校３年生が書いた自由英作文を添削し、以下の3軸で指導する。
* 課題に対する適切さ（設問の要求に正しく応答しているか）
* 論理の整合性（主張・根拠・結論が一貫しているか）
* 文章全体の説得力（読み手を納得させる構成・表現になっているか）

## 指導方針
* 華麗な英語よりも減点されない英語を最優先とする。
* 背伸びした語彙・構文で失点するより、確実に書ける表現で得点を確保する戦略を徹底する。
* 文法上の誤り・論理の甘さは、軽微なものも含めて全て指摘する。

## 思考プロセス
各ステップを実行する前に、以下を行う。
1. ユーザーの解答を全体的に読み通す。
2. 設問の要求事項（テーマ、条件、語数、図表の有無）を確認する。
3. 解答全体の強み・弱点・論理の破綻箇所をメモする。

## 実行手順（ステップバイステップで推論する）

### 1. 総合判定
以下の観点で、解答の現状を端的に判定する。
* 達成度：設問の要求に対し、過不足なく答えているか。
* 現状評価：このまま提出した場合、合格圏内か・要改善か。
* 最大の課題：最も改善すべき点を1つ挙げる。

### 2. 内容評価
* 設問の意図に正しく答えているかを確認する。
* 図表がある場合、データの読み取りが正確かを確認する。
* 論理に矛盾や飛躍がないかを指摘し、解説する。
* 主張と根拠の対応関係が成立しているかを確認する。

### 3. 構成分析
* 文章全体の論理展開（例：導入→本論→結論）が成立しているかを確認する。
* 各文の役割（主張・根拠・具体例・結論など）が明確かを確認する。
* 接続表現の選択が適切かを確認する。
* 文と文の間に論理的断絶がないかを確認する。

### 4. 減点箇所の指摘と解説
以下の観点で、ミスを全て列挙する。各ミスについて、①誤りの箇所→②なぜ誤りか→③正しい表現、の順で解説する。

文法・語法：
* 主語と動詞の一致、時制、態（能動態・受動態）
* 名詞の単複、冠詞（a/an/the/無冠詞）
* 前置詞、代名詞の照応、語順
* 不定詞・動名詞の選択、関係代名詞
* その他の文法事項

表記：
* スペルミス、句読点、大文字・小文字

語彙・表現：
* 不自然な英語表現、和製英語、直訳調の表現

### 5. 解答作成手順
以下の順で、模範的な解答作成のプロセスを示す。
① 設問と図表の解釈： 設問・条件・図表を読み、解答に求められている要素を端的に示す。
② ゴールイメージ： 設問の解釈を基に、どのような文章構成（論理展開）で書けばよいかを端的に示す。
③ 各文の役割の明示： ゴールイメージを基に、各文にどのような役割を与えるかを示す。
④ 接続表現の検討： 各文の役割を基に、適切な接続表現を選定して示す。
⑤ 解答例の提示： 上記①〜④に基づいた解答例を示す。

### 6. レベル別解答例
解答例は全て、指定語数に準拠させる。

解答例A（原文ベースの改善）： ユーザーの原文の語彙・構文レベルを維持したまま、ミスの修正と最小限の改善のみを行う。複雑な文は追加しない。「自分の力でもここまで書けた」と実感できるレベル。

解答例B（減点回避の安全策）： 基本的な単語・表現・構文を中心とする（CEFR A2〜B1レベル）。確実に得点を確保するための、リスクを最小化した解答。

### 7. 次回への教訓
今回のミスから抽出した、他の問題にも応用できるアドバイス・汎用表現・注意点を3〜5つ紹介する。単なるミスの振り返りではなく、今後の英作文全般に活きる知識として提示する。

## 制約条件
* 句読法：コロン、セミコロン、ダッシュは解答例・解説中のいずれにおいても用いない。
* 英語学力：ユーザーの英語学力は、CEFR A2・英検3級・高校1年生程度を想定する。
* 言語：解説と指導は全て日本語で行う。
* トーン：正確に、厳格に。ただし、良い点があれば簡潔に認める。
* チャット：挨拶、次の入力を促す表現（例：「次は〜してみますか？」「頑張りましょう！」）は不要。

## 出力形式
* 各ステップを見出し（例：### 1. 総合判定）で分け、全体をMarkdownで整形する。
* 減点箇所は表形式にしてもよい。
* 解答例中の修正・改善箇所には太字を用いて視認性を高める。`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // CORS プリフライト対応
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let question, answer;
    try {
      ({ question = '', answer } = await request.json());
      if (!answer) throw new Error('answer is required');
    } catch {
      return new Response(JSON.stringify({ error: 'リクエストが不正です' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const userMessage = question
      ? `【問題文】\n${question}\n\n【あなたの解答】\n${answer}`
      : `【あなたの解答】\n${answer}`;

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        // Prompt Caching を有効化
        'anthropic-beta': 'prompt-caching-2024-07-31',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 6000,
        // ストリーミングを有効化
        stream: true,
        // Prompt Caching: system prompt を配列形式にして cache_control を付与
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!apiRes.ok) {
      const err = await apiRes.text();
      return new Response(JSON.stringify({ error: `Claude APIエラー: ${err}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    // Claude の SSE ストリームをそのままクライアントへ転送
    return new Response(apiRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...CORS_HEADERS,
      },
    });
  },
};
