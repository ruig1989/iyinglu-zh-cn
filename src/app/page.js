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

    // 表单提交（直接调用企业微信 Webhook）
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
          const webhookUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=9a673afe-86fd-4119-8d0e-7a9dcf0f1559';
          const textContent = `📩 网站新留言\n姓名：${name}\n电话：${phone}\n邮箱：${email || '未填写'}\n留言：${message || '无'}\n时间：${new Date().toLocaleString('zh-CN')}`;

          const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msgtype: 'text', text: { content: textContent } })
          });

          const result = await res.json();
          if (result.errcode === 0) {
            feedback.textContent = '感谢留言，我们会尽快回复！';
            feedback.style.color = '#27ae60';
            form.reset();
          } else {
            throw new Error(result.errmsg || 'Webhook 发送失败');
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
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">嬴麓<span>国际</span></div>
          <div className="mobile-menu" id="mobileMenuBtn"><i className="fas fa-bars"></i></div>
          <div className="nav-links" id="navLinks">
            <a href="#home">首页</a>
            <a href="#business">业务体系</a>
            <a href="#cases">成功案例</a>
            <a href="#about">关于我们</a>
            <a href="#insights">嬴麓洞察</a>
            <a href="#contact">联系我们</a>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero-bg-en"><div className="line1">ROOTED IN LAIWU,</div><div className="line2">GOING PLACES</div></div>
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">扎根嬴地<br />麓达天下</h1>
              <p className="hero-subtitle">嬴麓国际 —— 您的全球人才战略合伙人。十八年积淀，从海外留学到产业赋能，构建人才全周期生态。</p>
              <div className="hero-stats">
                <div className="stat-item"><h3>18年</h3><p>行业积淀</p></div>
                <div className="stat-item"><h3>2007</h3><p>初心启航</p></div>
                <div className="stat-item"><h3>2025</h3><p>正式成立</p></div>
              </div>
              <a href="#business" className="btn btn-primary">探索我们的服务 <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </section>

        <section id="business" className="section">
          <div className="container">
            <h2 className="section-title">战略增长三层模型</h2>
            <p className="section-sub">以升学规划为基石，赋能人才、企业与区域生态</p>
            <div className="layers-grid">
              <div className="layer-card"><div className="layer-icon"><i className="fas fa-graduation-cap"></i></div><div className="layer-tag">发展基石</div><h3>国内与国际贯通</h3><p>志愿填报 · 出国留学 · 来华留学<br />多元规划，精准匹配，全球名校通道</p></div>
              <div className="layer-card"><div className="layer-icon"><i className="fas fa-chalkboard-user"></i></div><div className="layer-tag">价值引擎</div><h3>人才与企服协同</h3><p>人才终身服务 · 企业组织赋能<br />从求学到就业，跨文化培训与人才引进</p></div>
              <div className="layer-card"><div className="layer-icon"><i className="fas fa-project-diagram"></i></div><div className="layer-tag">生态愿景</div><h3>平台与战略引领</h3><p>区域战略聚焦 · 平台生态裂变<br />智库研究，国际峰会，嬴麓国际社区</p></div>
            </div>

            <div style={{ marginTop: '72px' }}>
              <div style={{ background: 'linear-gradient(135deg, #fafbfc 0%, #ffffff 100%)', borderRadius: 'var(--card-radius)', padding: '48px 32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-border)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem' }}>
                  <div style={{ flex: '1.2', minWidth: '280px' }}>
                    <div style={{ background: 'rgba(184,146,74,0.12)', color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '40px', fontSize: '0.75rem', fontWeight: '500', marginBottom: '24px' }}>
                      <i className="fas fa-graduation-cap" style={{ fontSize: '0.8rem' }}></i> 发展基石 · 出国留学
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '700', lineHeight: '1.2', marginBottom: '20px', color: 'var(--primary)', letterSpacing: '-0.4px' }}>留学筑梦，共赢未来</h2>
                    <div style={{ background: 'white', borderLeft: '4px solid var(--secondary)', padding: '20px 24px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', margin: '24px 0' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--primary)', letterSpacing: '-0.2px' }}>"支持留学、鼓励回国、来去自由、发挥作用"</div>
                      <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginTop: '8px' }}>—— 新时代留学工作方针</div>
                    </div>
                    <p style={{ marginBottom: '28px', fontSize: '0.95rem', color: 'var(--gray)', lineHeight: '1.7' }}>嬴麓国际立足齐鲁，深入践行新时代留学工作方针，助力有志学子进阶世界顶尖学府，完成从"成功出去"到"出去成功"再到"学成有为"的跃迁，成就国家需要与自我实现的双赢，同心共筑中华民族伟大复兴的中国梦。</p>
                    <a href="#contact" className="btn btn-primary">立即规划评估 <i className="fas fa-arrow-right"></i></a>
                  </div>
                  <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div className="stat-highlight-card"><div><div className="stat-number">77<span>%</span></div><div className="stat-label">高等教育阶段（本硕博）留学意向占比</div></div><div><i className="fas fa-chart-line" style={{ fontSize: '1.6rem', color: 'rgba(184,146,74,0.3)' }}></i></div></div>
                    <div className="stat-highlight-card"><div><div className="stat-number">63<span>%</span></div><div className="stat-label">本科在读学生留学意向占比</div></div><div><i className="fas fa-user-graduate" style={{ fontSize: '1.6rem', color: 'rgba(184,146,74,0.3)' }}></i></div></div>
                    <div className="stat-highlight-card"><div><div className="stat-number">55<span>%</span></div><div className="stat-label">公立中小学普通班学生留学意向占比</div></div><div><i className="fas fa-school" style={{ fontSize: '1.6rem', color: 'rgba(184,146,74,0.3)' }}></i></div></div>
                    <div className="stat-highlight-card"><div><div className="stat-number">15<span>%</span></div><div className="stat-label">留学回国人员考公/考编比例</div></div><div><i className="fas fa-users" style={{ fontSize: '1.6rem', color: 'rgba(184,146,74,0.3)' }}></i></div></div>
                    <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--gray)', marginTop: '0.25rem' }}>数据来源：中国学生出国留学发展报告（2026）</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '72px' }}>
              <h2 className="section-title">深入践行新时代留学工作方针</h2>
              <p className="section-sub">从规划到归国，嬴麓国际将十六字方针贯穿每一个留学服务环节</p>
              <div className="policy-grid">
                <div className="policy-card"><div className="policy-icon"><i className="fas fa-globe"></i></div><h4>支持留学</h4><p>职业规划、院校匹配、文书创作、院校申请、签证办理、行前指南，助您安全入读全球知名院校。</p></div>
                <div className="policy-card"><div className="policy-icon"><i className="fas fa-home"></i></div><h4>鼓励回国</h4><p>分享央国企人才引进、地方海归政策，留学初始即嵌入回国发展路径，让海归人才有舞台、有通道。</p></div>
                <div className="policy-card"><div className="policy-icon"><i className="fas fa-plane"></i></div><h4>来去自由</h4><p>提供客观中立的海外就业与居留咨询，尊重个人选择，不强制、不误导，保障从容决策。</p></div>
                <div className="policy-card"><div className="policy-icon"><i className="fas fa-lightbulb"></i></div><h4>发挥作用</h4><p>倡导结合个人兴趣与十五五规划选择学习方向，学成后切实服务于国家现代化建设与全球竞争。</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="section" style={{ background: 'var(--gray-light)' }}>
          <div className="container">
            <h2 className="section-title">信任 · 源于专业</h2>
            <p className="section-sub">部分名校录取案例展示</p>
            <div className="cases-grid">
              <div className="case-card gb">
                <div className="rank-badges">
                  <div className="rank-item"><span className="rank-number">7</span><span className="rank-name">USN</span></div>
                  <div className="rank-item"><span className="rank-number">22</span><span className="rank-name">THE</span></div>
                  <div className="rank-item"><span className="rank-number">9</span><span className="rank-name">QS</span></div>
                  <div className="rank-item"><span className="rank-number">14</span><span className="rank-name">软科</span></div>
                </div>
                <h3>伦敦大学学院</h3><div className="uni-eng">University College London</div><p>硕士 · 建筑设计</p><small>双非本科+职业导向选校</small>
              </div>
              <div className="case-card us">
                <div className="rank-badges">
                  <div className="rank-item"><span className="rank-number">15</span><span className="rank-name">USN</span></div>
                  <div className="rank-item"><span className="rank-number">14</span><span className="rank-name">THE</span></div>
                  <div className="rank-item"><span className="rank-number">15</span><span className="rank-name">QS</span></div>
                  <div className="rank-item"><span className="rank-number">14</span><span className="rank-name">软科</span></div>
                </div>
                <h3>宾夕法尼亚大学</h3><div className="uni-eng">University of Pennsylvania</div><p>硕士 · 公共管理</p><small>背景提升+精准文书</small>
              </div>
              <div className="case-card us">
                <div className="rank-badges">
                  <div className="rank-item"><span className="rank-number">21</span><span className="rank-name">USN</span></div>
                  <div className="rank-item"><span className="rank-number">23</span><span className="rank-name">THE</span></div>
                  <div className="rank-item"><span className="rank-number">45</span><span className="rank-name">QS</span></div>
                  <div className="rank-item"><span className="rank-number">33</span><span className="rank-name">软科</span></div>
                </div>
                <h3>密歇根大学安娜堡分校</h3><div className="uni-eng">University of Michigan, Ann Arbor</div><p>硕士 · 电气与计算机工程</p><small>全程规划+半DIY</small>
              </div>
              <div className="case-card au">
                <div className="rank-badges">
                  <div className="rank-item"><span className="rank-number">29</span><span className="rank-name">USN</span></div>
                  <div className="rank-item"><span className="rank-number">53</span><span className="rank-name">THE</span></div>
                  <div className="rank-item"><span className="rank-number">25</span><span className="rank-name">QS</span></div>
                  <div className="rank-item"><span className="rank-number">72</span><span className="rank-name">软科</span></div>
                </div>
                <h3>悉尼大学</h3><div className="uni-eng">The University of Sydney</div><p>预科+本科 · 信息技术</p><small>双非大一退学，升入澳洲名校</small>
              </div>
              <div className="case-card us">
                <div className="rank-badges">
                  <div className="rank-item"><span className="rank-number">109</span><span className="rank-name">USN</span></div>
                  <div className="rank-item"><span className="rank-number">134</span><span className="rank-name">THE</span></div>
                  <div className="rank-item"><span className="rank-number">212</span><span className="rank-name">QS</span></div>
                  <div className="rank-item"><span className="rank-number">151-200</span><span className="rank-name">软科</span></div>
                </div>
                <h3>佛罗里达大学</h3><div className="uni-eng">University of Florida</div><p>本科 · 体育管理</p><small>民办国际学校毕业，升入美国名校</small>
              </div>
              <div className="case-card ca">
                <div className="rank-badges">
                  <div className="rank-item"><span className="rank-number">197</span><span className="rank-name">USN</span></div>
                  <div className="rank-item"><span className="rank-number">162</span><span className="rank-name">THE</span></div>
                  <div className="rank-item"><span className="rank-number">119</span><span className="rank-name">QS</span></div>
                  <div className="rank-item"><span className="rank-number">151-200</span><span className="rank-name">软科</span></div>
                </div>
                <h3>滑铁卢大学</h3><div className="uni-eng">University of Waterloo</div><p>本科 · 数学</p><small>公办普通高中毕业，升入加拿大名校</small>
              </div>
            </div>
            <p className="rank-source">排名来源：U.S. News Best Global Universities 2026, THE World University Rankings 2026, QS World University Rankings 2026, 软科ARWU 2025</p>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">嬴麓赋</h2>
            <p className="section-sub">探寻嬴麓二字的文明密码，感悟泰山汶水的精神力量</p>
            <div className="fu-grid">
              <div className="fu-card"><div className="fu-icon"><i className="fas fa-chess-rook"></i></div><p>泰山之阳，嬴地肇始。<br />舜赐伯益，姓启嬴秦。<br />文明之源，华夏之魄。</p></div>
              <div className="fu-card"><div className="fu-icon"><i className="fas fa-book-open"></i></div><p>汶水西流，麓基永固。<br />千载文脉，山麓相依。<br />厚德载物，攀登不息。</p></div>
              <div className="fu-card"><div className="fu-icon"><i className="fas fa-map-location-dot"></i></div><p>嬴麓国际，发轫于斯。<br />承嬴之志，秉麓之实。<br />扎根嬴地，麓达天下。</p></div>
            </div>
            <div style={{ marginTop: '60px', paddingTop: '48px', borderTop: '1px solid var(--gray-border)' }}>
              <h2 className="section-title">从初心到格局</h2>
              <p className="section-sub">每一步积淀，都为了更专业的服务</p>
              <div className="timeline">
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2007</div><p>创始人参加美国康涅狄格州第15学区旁布拉格高中教师在莱芜一中举办的讲座，激发了出国留学的梦想</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2009</div><p>创始人加入青岛大学国际交流协会，接待来华留学生，开始接触国际学生事务</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2010-2012</div><p>创始人DIY申请获得佛罗里达大学录取，并成功帮助同学获得香港大学、奥克兰大学等海外名校录取</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2012-2013</div><p>创始人获得佛罗里达大学硕士学位、沃灵顿商学院全球管理证书、维也纳经济管理大学国际管理证书，<br />留学期间游学德国、阿根廷，参与全球休闲餐饮领军企业（纳斯达克上市）国际零售战略咨询项目</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2014-2024</div><p>创始人先后任职于国内头部留学机构（含纳斯达克上市公司）、知名教育科技集团以及A股上市科技公司，深耕国际教育与商务拓展</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2025.10</div><p>嬴麓国际正式成立</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2026.01</div><p>嬴麓国际受邀出席在舜耕山庄举办的"2026年国际教育项目高质量发展研讨会暨交流活动"，<br />成为山东财经大学出国留学培训基地招生咨询合作伙伴</p></div>
                <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-year">2026.05</div><p>创始人获聘高途（NYSE:GOTU）升学规划研究院研究员</p></div>
              </div>
            </div>
            <div style={{ marginTop: '60px', paddingTop: '48px', borderTop: '1px solid var(--gray-border)' }}>
              <h2 className="section-title">我们的复合基因</h2>
              <p className="section-sub">十八年积累，跨越留学、产业与战略</p>
              <div className="features-grid">
                <div className="feature"><i className="fas fa-school"></i><h3>留学全链专家</h3><p>宾大、密大、UCL等顶尖名校录取案例</p></div>
                <div className="feature"><i className="fas fa-chart-line"></i><h3>国际商务洞察</h3><p>中美上市公司实战经验，直击企业全球化痛点</p></div>
                <div className="feature"><i className="fas fa-lightbulb"></i><h3>战略资源整合</h3><p>从0到1的业务拓展与跨国合作操盘</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="insights" className="section" style={{ background: 'var(--gray-light)' }}>
          <div className="container">
            <h2 className="section-title">嬴麓洞察 · 前沿观点</h2>
            <p className="section-sub">分享海外留学、人才战略与企业出海的政策与思考</p>
            <div className="insights-grid">
              <div className="insight-card"><h3>2026留学趋势展望</h3><p>美英澳加最新政策与申请策略分析</p><span className="insight-date">2025.11.20</span></div>
              <div className="insight-card"><h3>中国企业出海跨文化挑战</h3><p>从人才视角破解海外管理难题</p><span className="insight-date">2025.11.15</span></div>
              <div className="insight-card"><h3>济南国际化人才战略思考</h3><p>区域发展与全球引智的双向奔赴</p><span className="insight-date">2025.11.10</span></div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">开启您的全球人才战略</h2>
            <p className="section-sub">嬴麓国际期待与您同行</p>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item"><i className="fas fa-map-marker-alt"></i><div className="contact-text">济南市莱芜高新区世纪城路1号<br />希尔顿欢朋酒店写字楼802</div></div>
                <div className="contact-item"><i className="fas fa-phone-alt"></i><span className="contact-text">+86 189-5318-1556</span></div>
                <div className="contact-item"><i className="fas fa-envelope"></i><span className="contact-text">info@iyinglu.cn</span></div>
                <div className="contact-item"><i className="fas fa-clock"></i><div className="contact-text">周一至周五 10:00 - 16:00<br />周末节假日 仅限预约</div></div>
                <div className="contact-item"><i className="fab fa-weixin"></i><span className="contact-text">公众号：嬴麓国际</span></div>
              </div>
              <div className="contact-form">
                <form id="demoForm">
                  <div className="form-group"><input type="text" name="name" placeholder="您的姓名" required /></div>
                  <div className="form-group"><input type="tel" name="phone" placeholder="联系电话" required /></div>
                  <div className="form-group"><input type="email" name="email" placeholder="电子邮箱" /></div>
                  <div className="form-group"><textarea name="message" rows="4" placeholder="留言内容"></textarea></div>
                  <button type="submit" className="btn btn-primary" style={{ border: 'none', cursor: 'pointer' }}>提交</button>
                </form>
                <p id="formFeedback" style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem', display: 'none' }}></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div><div className="footer-logo">嬴麓<span>国际</span></div></div>
            <div className="footer-links"><h4>快速链接</h4><div className="footer-links-two-columns"><div className="footer-links-column"><a href="#home">首页</a><a href="#business">业务体系</a><a href="#cases">成功案例</a></div><div className="footer-links-column"><a href="#about">关于我们</a><a href="#insights">嬴麓洞察</a><a href="#contact">联系我们</a></div></div></div>
            <div className="footer-links"><h4>相关链接</h4><div className="footer-links-two-columns"><div className="footer-links-column">
              <a href="https://www.wrsa.net/" target="_blank" rel="noopener noreferrer">欧美同学会</a>
              <a href="https://www.cscse.edu.cn/" target="_blank" rel="noopener noreferrer">中国留学网</a>
              <a href="https://www.csc.edu.cn/" target="_blank" rel="noopener noreferrer">国家留学网</a>
              <a href="https://www.studyinchina.edu.cn/" target="_blank" rel="noopener noreferrer">留学中国网</a>
            </div><div className="footer-links-column">
              <a href="https://palx.cscse.edu.cn/" target="_blank" rel="noopener noreferrer">平安留学</a>
              <a href="https://www.qdu.edu.cn/" target="_blank" rel="noopener noreferrer">青岛大学</a>
              <a href="https://warrington.ufl.edu/" target="_blank" rel="noopener noreferrer">佛罗里达大学沃灵顿商学院</a>
              <a href="https://jsj.moe.gov.cn/" target="_blank" rel="noopener noreferrer">教育部教育涉外监管信息网</a>
            </div></div></div>
          </div>
          <div className="copyright"><p>© 2026 济南嬴麓国际人才合作有限公司 保留所有权利</p></div>
        </div>
      </footer>

      <div className="back-to-top" id="backToTop"><i className="fas fa-arrow-up"></i></div>
    </>
  );
}