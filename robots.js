/* robots.js - 负责生成网页背景的赛博机器人 
   包含三个机器人：
   1. desktopLeft: 左上角图纸机器人
   2. desktopRight: 右下角维修场景
   3. mobileTop: 手机端趴在框上的机器人
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 定义机器人 SVG 代码 (无样式表，纯净版) ---
    
    // 电脑左上角：标准图纸
    const svgBlueprint = `
        <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <path d="M60 60 L140 60 L140 130 L60 130 Z" fill="none" stroke="#0f0" stroke-width="2"/>
            <path d="M70 20 L130 20 L130 50 L70 50 Z" fill="none" stroke="#0f0" stroke-width="2"/> <circle cx="90" cy="35" r="5" fill="none" stroke="#0f0" stroke-width="1.5"/>
            <circle cx="110" cy="35" r="5" fill="none" stroke="#0f0" stroke-width="1.5"/>
            <rect x="70" y="70" width="30" height="30" fill="none" stroke="#0f0" stroke-width="1"/>
            <text x="74" y="88" fill="#0f0" font-family="monospace" font-weight="bold" font-size="10">CPU</text>
            <rect x="105" y="100" width="30" height="15" fill="none" stroke="#0f0" stroke-width="1"/>
            <text x="108" y="112" fill="#0f0" font-family="monospace" font-size="8">BATT</text>
            <rect x="40" y="70" width="20" height="60" fill="none" stroke="#0f0" stroke-width="1.5"/>
            <rect x="140" y="70" width="20" height="60" fill="none" stroke="#0f0" stroke-width="1.5"/>
            <rect x="60" y="140" width="20" height="50" fill="none" stroke="#0f0" stroke-width="1.5"/>
            <rect x="120" y="140" width="20" height="50" fill="none" stroke="#0f0" stroke-width="1.5"/>
            <line x1="30" y1="20" x2="30" y2="200" stroke="#0f0" stroke-width="1" stroke-dasharray="4"/>
            <text x="25" y="120" fill="#0f0" font-family="monospace" font-size="12" transform="rotate(-90 25,120)">H:800mm</text>
            <line x1="40" y1="210" x2="160" y2="210" stroke="#0f0" stroke-width="1" stroke-dasharray="4"/>
            <text x="80" y="225" fill="#0f0" font-family="monospace" font-size="12">W:400mm</text>
        </svg>`;

    // 电脑右下角：维修场景
    const svgRepair = `
        <svg viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <g transform="translate(120,30)">
                <rect x="40" y="-25" width="150" height="25" fill="none" stroke="#0f0" stroke-width="1" stroke-dasharray="4"/>
                <text x="45" y="-8" fill="#0f0" font-family="monospace" font-weight="bold" font-size="12">WARNING: OVERHEAT</text>
                <path d="M10 0 Q15 -10 10 -20 M20 0 Q25 -10 20 -20 M30 0 Q35 -10 30 -20" fill="none" stroke="#0f0" stroke-width="1.5"/>
            </g>
            <g transform="translate(50,50)">
                <rect x="20" y="0" width="40" height="30" fill="none" stroke="#0f0" stroke-width="2"/>
                <rect x="10" y="35" width="50" height="50" fill="none" stroke="#0f0" stroke-width="2"/>
                <path d="M80 50 L100 50 M100 40 L100 60" fill="none" stroke="#0f0" stroke-width="2"/> <path d="M95 35 L105 35 M95 65 L105 65" fill="none" stroke="#0f0" stroke-width="1"/> </g>
            <g transform="translate(100,180) rotate(10)">
                <rect x="0" y="0" width="80" height="40" fill="none" stroke="#0f0" stroke-width="2"/>
                <rect x="80" y="-10" width="40" height="30" fill="none" stroke="#0f0" stroke-width="2"/>
                <text x="10" y="25" fill="#0f0" font-family="monospace" font-size="10">SYSTEM FAIL</text>
                <path d="M10 5 L30 5 M10 15 L50 15" fill="none" stroke="#0f0" stroke-width="1" stroke-dasharray="2"/>
            </g>
        </svg>`;

    // 手机端：趴在框上的小机器人
    const svgMobile = `
        <svg viewBox="0 0 140 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <style>
                /* 定义眼睛动画：左右看 */
                .eye-move { animation: lookAround 3s infinite alternate; }
                @keyframes lookAround { 0% { transform: translateX(0); } 100% { transform: translateX(4px); } }
            </style>
            <path d="M60 25 L50 5 M70 20 L85 5" fill="none" stroke="#0f0" stroke-width="2"/>
            <circle cx="50" cy="5" r="3" fill="#0f0"/>
            <circle cx="85" cy="5" r="3" fill="#0f0"/>
            <g transform="rotate(-5 70 60)">
                <rect x="45" y="25" width="50" height="45" rx="8" fill="none" stroke="#0f0" stroke-width="2"/>
                <circle cx="60" cy="45" r="8" fill="none" stroke="#0f0" stroke-width="1.5"/>
                <circle cx="60" cy="45" r="3" fill="#0f0" class="eye-move"/>
                <path d="M80 40 Q88 40 88 48 Q80 48 80 48" fill="none" stroke="#0f0" stroke-width="1.5"/>
                <circle cx="84" cy="44" r="3" fill="#0f0" class="eye-move"/>
                <rect x="55" y="58" width="30" height="6" rx="2" fill="none" stroke="#0f0" stroke-width="1.5"/>
            </g>
            <path d="M35 95 Q40 85 45 95 M105 95 Q100 85 95 95" fill="none" stroke="#0f0" stroke-width="3"/>
        </svg>`;

    // --- 2. 注入电脑端机器人 (直接加到 body) ---
    const desktopDivLeft = document.createElement('div');
    desktopDivLeft.className = 'robot-wrapper desktop-left';
    desktopDivLeft.innerHTML = svgBlueprint;
    document.body.appendChild(desktopDivLeft);

    const desktopDivRight = document.createElement('div');
    desktopDivRight.className = 'robot-wrapper desktop-right';
    desktopDivRight.innerHTML = svgRepair;
    document.body.appendChild(desktopDivRight);

    // --- 3. 注入手机端机器人 (加到 .container 顶部) ---
    const container = document.querySelector('.container');
    if (container) {
        const mobileDiv = document.createElement('div');
        mobileDiv.className = 'robot-wrapper mobile-top';
        mobileDiv.innerHTML = svgMobile;
        // 插入到 container 的最前面
        container.insertBefore(mobileDiv, container.firstChild);
    }
});
