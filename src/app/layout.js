import './globals.css';

export const metadata = {
  title: '嬴麓国际 | 您的全球人才战略合伙人',
  description: '嬴麓国际——始于2007，成于2025，专注海外留学、人才服务、企业赋能与战略研究。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}