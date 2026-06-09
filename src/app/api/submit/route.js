export const runtime = 'edge';
export async function POST(request) {
  const WEBHOOK_URL = process.env.WEBHOOK_URL;
  if (!WEBHOOK_URL) {
    return Response.json({ success: false, message: '服务器配置错误' }, { status: 500 });
  }
  try {
    const { name, phone, email, message } = await request.json();
    const content = `📩 嬴麓国际官网新留言\n姓名：${name}\n电话：${phone}\n邮箱：${email || '未填写'}\n留言：${message || '无'}\n时间：${new Date().toLocaleString('zh-CN')}`;
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msgtype: 'text', text: { content } }),
    });
    const result = await res.json();
    if (result.errcode === 0) {
      return Response.json({ success: true, message: '感谢留言，我们会尽快回复！' });
    } else {
      return Response.json({ success: false, message: result.errmsg }, { status: 500 });
    }
  } catch (error) {
    return Response.json({ success: false, message: '服务器内部错误' }, { status: 500 });
  }
}