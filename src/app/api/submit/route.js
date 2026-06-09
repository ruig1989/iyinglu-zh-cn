// app/api/submit/route.js
export const runtime = 'edge';

export async function POST(request) {
  try {
    const { name, phone, email, message } = await request.json();

    // 简单校验
    if (!name || !phone) {
      return new Response(JSON.stringify({ error: '姓名和电话不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9a673afe-86fd-4119-8d0e-7a9dcf0f1559';

    const textContent = `📩 网站新留言\n姓名：${name}\n电话：${phone}\n邮箱：${email || '未填写'}\n留言：${message || '无'}\n时间：${new Date().toLocaleString('zh-CN')}`;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'text',
        text: { content: textContent },
      }),
    });

    const result = await response.json();

    if (result.errcode !== 0) {
      throw new Error(result.errmsg || 'Webhook 发送失败');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('提交失败：', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}