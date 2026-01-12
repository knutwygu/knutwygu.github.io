(function() {
    // 硬核切割配置：左上赛博粉(#ff00de) | 右下电光青(#00ffff)
    // 原理：两个颜色都在 50% 处停止，形成锐利的对角线分界
    const faviconSVG = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <defs>
            <linearGradient id='hard_split' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='50%' style='stop-color:#ff00de;stop-opacity:1' />
                <stop offset='50%' style='stop-color:#00ffff;stop-opacity:1' />
            </linearGradient>
        </defs>
        
        <rect width='100' height='100' fill='%23050505'/>
        
        <text x='50%' y='62%' font-family='Courier New, monospace' font-weight='900' font-size='80' fill='url(#hard_split)' text-anchor='middle' dominant-baseline='middle'>K</text>
    </svg>`.trim();

    const iconUrl = 'data:image/svg+xml;base64,' + btoa(faviconSVG);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = iconUrl;
})();
