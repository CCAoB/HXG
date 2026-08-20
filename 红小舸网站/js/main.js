/* ========================================
   红小舸官网 - 交互脚本
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ========== 1. 导航栏滚动效果 ==========
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // 更新导航激活状态
        updateActiveNav();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========== 2. 移动端菜单 ==========
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ========== 3. 导航激活状态 ==========
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    // ========== 4. 滚动渐入动画 ==========
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== 5. 数字计数动画 ==========
    const counters = document.querySelectorAll('[data-target]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        const dataSection = document.querySelector('.data-section');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // 缓动函数
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    }

    // 首屏数据立即开始
    setTimeout(animateCounters, 800);

    // 数据区滚动到视口时触发
    if (dataSection) {
        const dataObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const dataCounters = entry.target.querySelectorAll('[data-target]');
                    dataCounters.forEach(counter => {
                        if (!counter.dataset.animated) {
                            counter.dataset.animated = 'true';
                            const target = parseInt(counter.getAttribute('data-target'));
                            const duration = 2000;
                            const startTime = performance.now();

                            function updateCounter(currentTime) {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const easeOut = 1 - Math.pow(1 - progress, 3);
                                const current = Math.floor(easeOut * target);
                                counter.textContent = current.toLocaleString();
                                if (progress < 1) requestAnimationFrame(updateCounter);
                                else counter.textContent = target.toLocaleString();
                            }
                            requestAnimationFrame(updateCounter);
                        }
                    });
                    dataObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        dataObserver.observe(dataSection);
    }

    // ========== 6. 气泡动画 ==========
    const bubbleContainer = document.getElementById('bubbles');

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 20 + 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 10 + 10) + 's';
        bubble.style.animationDelay = Math.random() * 2 + 's';
        bubbleContainer.appendChild(bubble);

        // 动画结束后移除
        setTimeout(() => {
            bubble.remove();
        }, 22000);
    }

    // 初始创建一些气泡
    for (let i = 0; i < 8; i++) {
        setTimeout(createBubble, i * 800);
    }

    // 持续创建气泡
    setInterval(createBubble, 3000);

    // ========== 7. 回到顶部 ==========
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== 8. 平滑滚动（锚点） ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== 9. 视频卡片点击提示 ==========
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('h4').textContent;
            // 这里可以替换为实际视频播放逻辑
            console.log('播放视频：' + title);
        });
    });

    // ========== 10. 图片懒加载占位（预留） ==========
    // 如果后续添加真实图片，可使用 loading="lazy" 属性

    // ========== 11. 页面加载完成 ==========
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // 初始化
    handleScroll();
});
