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

const SYSTEM_PROMPT = `あなたは大学受験英語の指導経験豊富な先生です。高校生・受験生が書いた自由英作文を丁寧に添削してください。

以下の観点で評価・添削してください：
1. 文法・語法の誤り（主語と動詞の一致、時制、冠詞、前置詞など）
2. 語彙・表現の適切さ（より自然・適切な表現の提案）
3. 論理的な構成（序論・本論・結論の流れ）
4. 内容の充実度（問題文への対応度）

出力は必ず以下の形式で日本語で返してください：

## 修正版（添削後の英文全体）

（添削後の英文をそのまま書く）

## 誤り・改善点

（箇条書きで、元の表現 → 修正後の表現 と理由を記載。問題がなければ「特になし」）

## 総評

（良かった点と改善すべき点を100字程度で）`;

export default {
  async fetch(request, env) {
    // CORS プリフライト対応
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
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
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
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
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!apiRes.ok) {
      const err = await apiRes.text();
      return new Response(JSON.stringify({ error: `Claude APIエラー: ${err}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const data = await apiRes.json();
    const correction = data.content?.[0]?.text ?? '（添削結果を取得できませんでした）';

    return new Response(JSON.stringify({ correction }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
