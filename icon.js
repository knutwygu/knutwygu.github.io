(function() {
    // --- 1. 定义图标样式 (硬切割: 粉色/青色) ---
    const svgContent = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <defs>
            <linearGradient id='hard_split' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='35%' style='stop-color:#ff00de;stop-opacity:1' />
                <stop offset='52%' style='stop-color:#00ffff;stop-opacity:1' />
            </linearGradient>
        </defs>
        <rect width='100' height='100' fill='%23050505'/>
        <text x='50%' y='52%' font-family='Courier New, monospace' font-weight='900' font-size='150' fill='url(#hard_split)' text-anchor='middle' dominant-baseline='central'>K</text>
    </svg>`.trim();

    // 生成 SVG 的 Data URI (给电脑/安卓)
    const svgUrl = 'data:image/svg+xml;base64,' + btoa(svgContent);

    // --- 2. 设置通用图标 (PC/Android) ---
    function setStandardIcon() {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = svgUrl;
    }

    // --- 3. 专门为 iPad/iPhone 生成 PNG 图标 ---
    function setAppleIcon() {
        // 创建一个画布
        const canvas = document.createElement('canvas');
        canvas.width = 180;
        canvas.height = 180;
        const ctx = canvas.getContext('2d');

        // 创建一个图片对象
        const img = new Image();
        img.onload = function() {
            // 图片加载完后，画到画布上
            ctx.drawImage(img, 0, 0, 180, 180);
            // 将画布导出为 PNG 格式的 Data URI
            const pngUrl = canvas.toDataURL('image/png');

            // 创建或更新 apple-touch-icon 标签
            let appleLink = document.querySelector("link[rel='apple-touch-icon']");
            if (!appleLink) {
                appleLink = document.createElement('link');
                appleLink.rel = 'apple-touch-icon';
                document.head.appendChild(appleLink);
            }
            appleLink.href = pngUrl;
        };
        // 触发图片加载
        img.src = svgUrl;
    }

    // 执行
    setStandardIcon();
    setAppleIcon();
})();
