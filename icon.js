
    (function() {
        // --- 配置区域：赛博渐变 K 图标 ---
        // 渐变色：起始 #ff00de (赛博粉) -> 结束 #00ffff (电光青)
        const faviconSVG = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <defs>
                <linearGradient id='cyber_grad' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' style='stop-color:#ff00de;stop-opacity:1' />
                    <stop offset='100%' style='stop-color:#00ffff;stop-opacity:1' />
                </linearGradient>
            </defs>
            <rect width='100' height='100' fill='%23050505'/>
            <text x='50%' y='62%' font-family='Courier New, monospace' font-weight='900' font-size='80' fill='url(#cyber_grad)' text-anchor='middle' dominant-baseline='middle'>K</text>
        </svg>`.trim();

        // 自动将 SVG 转换为 Data URI
        const iconUrl = 'data:image/svg+xml;base64,' + btoa(faviconSVG);

        // 创建或更新 <link rel="icon">
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = iconUrl;
    })();

