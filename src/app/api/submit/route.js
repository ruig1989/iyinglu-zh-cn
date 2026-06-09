export const runtime = 'edge';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, message: '姓名和电话不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9a673afe-86fd-4119-8d0e-7a9dcf0f1559';

    const textContent = `📩 网站新留言\n姓名：${name}\n电话：${phone}\n邮箱：${email || '未填写'}\n留言：${message || '无'}\n时间：${new Date().toLocaleString('zh-CN')}`;

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'text',
        text: { content: textContent }
      })
    });

    const webhookResult = await webhookResponse.json();

    if (webhookResult.errcode !== 0) {
      throw new Error(`企业微信返回错误：${webhookResult.errmsg} (错误码: ${webhookResult.errcode})`);
    }

    return new Response(JSON.stringify({ success: true, message: '留言已发送' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // 返回详细的错误信息，包括堆栈
    return new Response(JSON.stringify({
      success: false,
      message: error.message || '服务器内部错误',
      stack: error.stack || '无堆栈信息'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
