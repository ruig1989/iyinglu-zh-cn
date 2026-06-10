'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // 移动菜单切换
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => navLinks.classList.toggle('mobile-nav-open'));
    }

    // 平滑滚动（导航链接、按钮、页脚链接）
    const allLinks = document.querySelectorAll('.nav-links a, .btn-primary, .footer-links-column a');
    allLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.getElementById(href.substring(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks) navLinks.classList.remove('mobile-nav-open');
          }
        }
      });
    });

    // 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    const handleScroll = () => {
      if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    if (backToTop) {
      backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 表单提交（通过 Cloudflare Workers 代理调用企业微信 Webhook）
    const form = document.getElementById('demoForm');
    const feedback = document.getElementById('formFeedback');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value.trim();
        const phone = form.querySelector('input[name="phone"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!name || !phone) {
          feedback.textContent = '请填写姓名和联系电话';
          feedback.style.color = '#c0392b';
          feedback.style.display = 'block';
          setTimeout(() => (feedback.style.display = 'none'), 5000);
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';

        try {
          // 替换为你的 Cloudflare Workers URL
          const workerUrl = 'https://iyinglu-webhook.ctd9d8c4dp.workers.dev/';

          const res = await fetch(workerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, message }),
          });

          const data = await res.json();
          if (data.success) {
            feedback.textContent = '感谢留言，我们会尽快回复！';
            feedback.style.color = '#27ae60';
            form.reset();
          } else {
            throw new Error(data.message || '发送失败');
          }
        } catch (err) {
          feedback.textContent = '提交失败，请直接电话联系我们';
          feedback.style.color = '#c0392b';
        } finally {
          feedback.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = '提交';
          setTimeout(() => (feedback.style.display = 'none'), 8000);
        }
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="navbar"> {/* 导航栏内容保持不变 */} </nav>
      <main> {/* 所有主要区域内容保持不变 */} </main>
      <footer> {/* 页脚内容保持不变 */} </footer>
      <div className="back-to-top" id="backToTop"><i className="fas fa-arrow-up"></i></div>
    </>
  );
}