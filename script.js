// JavaScript 文件 - 苹果风格交互功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 激活当前页面的导航链接
    activateCurrentNavLink();
    
    // 添加滚动动画效果
    addScrollAnimations();
    
    // 添加按钮交互效果
    addButtonInteractions();
    
    // 添加卡片悬停效果
    addCardHoverEffects();
});

// 激活当前页面的导航链接
function activateCurrentNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 添加滚动动画效果
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 添加按钮交互效果
function addButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // 鼠标悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // 点击效果
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
}

// 添加卡片悬停效果
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .download-card, .platform-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// 平滑滚动到指定元素
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 显示通知消息
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--surface-color);
            color: var(--text-primary);
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.05);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.querySelector('div').style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.querySelector('div').style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 移除模拟下载功能
// function simulateDownload(platform) {
//     showNotification(`正在跳转 ${platform} 版本...`, 'info');
    
//     // 模拟下载延迟
//     setTimeout(() => {
//         showNotification(`${platform} 版本跳转完成！`, 'success');
//     }, 2000);
// }

// 添加下载按钮事件监听器
// document.addEventListener('DOMContentLoaded', function() {
//     const downloadButtons = document.querySelectorAll('.download-card .btn');
    
//     downloadButtons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             e.preventDefault();
//             const platform = this.closest('.download-card').querySelector('h3').textContent;
//             simulateDownload(platform);
//         });
//     });
// });

// 移动端菜单切换
function initMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // 如果是移动设备，添加菜单切换按钮
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            color: var(--text-primary);
            cursor: pointer;
            padding: 8px;
        `;
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
        });
        
        header.querySelector('.header-content').appendChild(menuToggle);
    }
}

// 页面加载时初始化移动端菜单
document.addEventListener('DOMContentLoaded', initMobileMenu);

// 窗口大小改变时重新初始化
window.addEventListener('resize', initMobileMenu);