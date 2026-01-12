/* robots.js - 最终版：完美还原三张设计图
   1. desktopLeft: 标准蓝图 (图1)
   2. desktopRight: 维修场景 (图2)
   3. mobileTop: 俏皮抓框 (图3)
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 定义机器人 SVG 代码 (高保真还原) ---
    
    // 电脑左上角：标准图纸 (还原图1)
    const svgBlueprint = `
        <svg viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <g fill="none" stroke="#0f0" stroke-width="4">
                <rect x="100" y="180" width="200" height="220" />
                <rect x="130" y="60" width="140" height="100" rx="10" />
                <circle cx="170" cy="110" r="20" stroke-width="3" />
                <circle cx="230" cy="110" r="20" stroke-width="3" />
                <line x1="170" y1="160" x2="230" y2="160" stroke-width="2" />
                <rect x="140" y="220" width="80" height="80" stroke-width="2" />
                <text x="150" y="270" fill="#0f0" stroke="none" font-family="monospace" font-weight="bold" font-size="24">CPU</text>
                <rect x="240" y="280" width="50" height="30" stroke-width="2" />
                <text x="245" y="305" fill="#0f0" stroke="none" font-family="monospace" font-size="18">BATT</text>
                <rect x="40" y="180" width="40" height="160" /> <rect x="320" y="180" width="40" height="160" /> <rect x="100" y="420" width="60" height="180" /> <rect x="240" y="420" width="60" height="180" /> <g stroke-width="2" stroke-dasharray="10,5">
                    <line x1="20" y1="60" x2="20" y2="600" />
                    <line x1="10" y1="60" x2="30" y2="60" />
                    <line x1="10" y1="600" x2="30" y2="600" />
                    <text x="-350" y="0" fill="#0f0" stroke="none" font-family="monospace" font-size="30" transform="rotate(-90)">H: 800mm</text>
                    <line x1="100" y1="630" x2="300" y2="630" />
                    <line x1="100" y1="620" x2="100" y2="640" />
                    <line x1="300" y1="620" x2="300" y2="640" />
                    <text x="130" y="670" fill="#0f0" stroke="none" font-family="monospace" font-size="30">W: 400mm</text>
                </g>
            </g>
        </svg>`;

    // 电脑右下角：维修场景 (还原图2)
    const svgRepair = `
        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <g fill="none" stroke="#0f0" stroke-width="3">
                <g transform="translate(200,50)">
                    <rect x="0" y="0" width="220" height="40" stroke-dasharray="5,5" />
                    <text x="10" y="28" fill="#0f0" stroke="none" font-family="monospace" font-weight="bold" font-size="18">WARNING: OVERHEAT</text>
                    <g stroke-width="2">
                        <path d="M-40 10 Q-30 0 -40 -10" ><animateTransform attributeName="transform" type="translate" values="0 0; 0 -10" dur="1s" repeatCount="indefinite"/></path>
                        <path d="M-20 10 Q-10 0 -20 -10" ><animateTransform attributeName="transform" type="translate" values="0 0; 0 -10" dur="1s" begin="0.3s" repeatCount="indefinite"/></path>
                        <path d="M0 10 Q10 0 0 -10" ><animateTransform attributeName="transform" type="translate" values="0 0; 0 -10" dur="1s" begin="0.6s" repeatCount="indefinite"/></path>
                    </g>
                </g>
                <g transform="translate(100,150) rotate(-10)">
                    <rect x="0" y="0" width="80" height="60" /> <rect x="20" y="60" width="60" height="80" /> <path d="M80 80 L140 80 M140 70 L140 90" /> <path d="M130 60 L150 60 M130 100 L150 100 M140 70 L140 90" stroke-width="4"/> </g>
                <g transform="translate(250,300) rotate(15)">
                    <rect x="0" y="0" width="120" height="60" /> <rect x="120" y="-20" width="60" height="50" /> <text x="10" y="35" fill="#0f0" stroke="none" font-family="monospace" font-size="14">SYSTEM FAIL</text>
                    <path d="M20 10 L60 10 M20 20 L80 20 M20 30 L50 30" stroke-width="2" stroke-dasharray="3,3"/>
                </g>
                <g stroke-width="2" stroke-dasharray="10,5">
                    <line x1="350" y1="100" x2="550" y2="100" />
                    <line x1="350" y1="90" x2="350" y2="110" />
                    <line x1="550" y1="90" x2="550" y2="110" />
                    <text x="380" y="90" fill="#0f0" stroke="none" font-family="monospace" font-size="16">REPAIR ZONE A</text>
                </g>
            </g>
        </svg>`;

    // 手机端：俏皮抓框 (还原图3)
    const svgMobile = `
        <svg viewBox="0 0 140 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <style>
                .eye-move { animation: look 3s infinite alternate ease-in-out; }
                @keyframes look { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
            </style>
            <g fill="none" stroke="#0f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M60 25 L50 5 M70 20 L85 5" />
                <circle cx="50" cy="5" r="3" fill="#0f0" stroke="none"/>
                <circle cx="85" cy="5" r="3" fill="#0f0" stroke="none"/>
                <g transform="rotate(-10 70 60)">
                    <rect x="45" y="25" width="50" height="45" rx="8" />
                    <circle cx="60" cy="45" r="8" stroke-width="1.5"/>
                    <g class="eye-move"><circle cx="60" cy="45" r="3" fill="#0f0" stroke="none"/></g>
                    <path d="M80 40 Q88 40 88 48 Q80 48 80 48" stroke-width="1.5"/>
                    <g class="eye-move"><circle cx="84" cy="44" r="3" fill="#0f0" stroke="none"/></g>
                    <rect x="55" y="58" width="30" height="6" rx="2" stroke-width="1.5"/>
                    <line x1="65" y1="58" x2="65" y2="64" stroke-width="1"/><line x1="75" y1="58" x2="75" y2="64" stroke-width="1"/>
                </g>
                <rect x="65" y="75" width="10" height="10" />
                <path d="M50 85 Q70 80 90 85 L90 110 L50 110 Z" />
                <g transform="translate(0, 10)" stroke-width="3">
                    <path d="M35 95 Q40 85 45 95 M105 95 Q100 85 95 95" />
                    <path d="M42 95 Q47 85 52 95 M98 95 Q93 85 88 95" />
                </g>
            </g>
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
        container.insertBefore(mobileDiv, container.firstChild);
    }
});
