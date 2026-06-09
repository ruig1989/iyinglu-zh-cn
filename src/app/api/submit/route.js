export const runtime = 'edge';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // 校验
    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, message: '姓名和电话不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 企业微信机器人 Webhook 地址（确保 key 正确）
    const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9a673afe-86fd-4119-8d0e-7a9dcf0f1559';

    // 构建消息内容
    const textContent = `📩 网站新留言\n姓名：${name}\n电话：${phone}\n邮箱：${email || '未填写'}\n留言：${message || '无'}\n时间：${new Date().toLocaleString('zh-CN')}`;

    // 发送到企业微信
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
      console.error('Webhook error:', webhookResult);
      throw new Error(`Webhook 发送失败：${webhookResult.errmsg || '未知错误'}`);
    }

    return new Response(JSON.stringify({ success: true, message: '留言已发送' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ success: false, message: error.message || '服务器配置错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}