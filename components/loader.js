// 组件加载器
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    // 加载组件
    async loadComponent(componentName) {
        if (this.components[componentName]) {
            return this.components[componentName];
        }

        try {
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`无法加载组件: ${componentName}`);
            }
            
            const html = await response.text();
            this.components[componentName] = html;
            return html;
        } catch (error) {
            console.error(`加载组件 ${componentName} 失败:`, error);
            return `<div class="error">加载组件失败: ${componentName}</div>`;
        }
    }

    // 渲染组件到指定元素
    async renderComponent(componentName, targetElement) {
        const html = await this.loadComponent(componentName);
        if (targetElement) {
            targetElement.innerHTML = html;
            this.activateCurrentNavLink();
        }
        return html;
    }

    // 激活当前页面的导航链接
    activateCurrentNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a[data-page]');
        
        navLinks.forEach(link => {
            const pageName = link.getAttribute('data-page');
            if (currentPage.includes(pageName) || (currentPage === 'index.html' && pageName === 'index')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 初始化所有组件
    async init() {
        // 加载头部
        const headerElement = document.getElementById('header');
        if (headerElement) {
            await this.renderComponent('header', headerElement);
        }

        // 加载页脚
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            await this.renderComponent('footer', footerElement);
        }

        // 加载Giscus评论（仅在评论页面）
        const giscusElement = document.getElementById('giscus');
        if (giscusElement) {
            await this.renderComponent('giscus', giscusElement);
            // 重新初始化Giscus
            this.reinitializeGiscus();
        }
        
        // 检查是否有Giscus容器（评论页面）
        const giscusContainer = document.querySelector('.giscus');
        if (giscusContainer && !giscusElement) {
            // 重新初始化Giscus
            this.reinitializeGiscus();
        }
    }

    // 重新初始化Giscus
    reinitializeGiscus() {
        // 移除现有的Giscus脚本
        const existingScript = document.querySelector('script[src*="giscus.app"]');
        if (existingScript) {
            existingScript.remove();
        }

        // 获取Giscus容器的配置属性
        const giscusElement = document.querySelector('.giscus');
        if (giscusElement) {
            // 创建新的Giscus脚本
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            
            // 从Giscus元素复制所有data属性
            const attributes = giscusElement.attributes;
            for (let i = 0; i < attributes.length; i++) {
                const attr = attributes[i];
                if (attr.name.startsWith('data-')) {
                    script.setAttribute(attr.name, attr.value);
                }
            }
            
            script.crossOrigin = 'anonymous';
            script.async = true;
            
            // 将脚本添加到页面
            document.body.appendChild(script);
        }
    }
}

// 创建全局组件加载器实例
window.componentLoader = new ComponentLoader();

// 页面加载完成后初始化组件
document.addEventListener('DOMContentLoaded', function() {
    window.componentLoader.init();
});