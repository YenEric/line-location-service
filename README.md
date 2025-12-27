# line-location-service
Line LIFF location service
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚗 智慧叫車 LINE 官方帳號系統 - 樹狀圖預覽</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #ffffff;
            padding: 20px;
            margin: 0;
            min-height: 100vh;
        }
        
        .tree-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .tree-title {
            text-align: center;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .tree {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .root {
            background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
            color: #ffffff;
            padding: 20px 40px;
            border-radius: 30px;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 40px;
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        }
        
        .branches {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .branch {
            background: linear-gradient(135deg, #111111 0%, #0a0a1a 100%);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            width: 320px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .branch:hover {
            transform: translateY(-5px);
            border-color: rgba(0, 212, 255, 0.3);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }
        
        .branch-icon {
            font-size: 52px;
            margin-bottom: 15px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        
        .branch-title {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #ffffff;
        }
        
        .branch-subtitle {
            font-size: 16px;
            opacity: 0.8;
            margin-bottom: 15px;
        }
        
        .branch-details {
            font-size: 14px;
            color: #cccccc;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .branch-tech {
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            padding: 10px;
            margin-top: 15px;
            font-size: 12px;
            color: #00d4ff;
        }
        
        .tech-item {
            margin: 5px 0;
        }
        
        .tree-section {
            margin: 60px 0;
        }
        
        .section-title {
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        
        .feature-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #151515 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-3px);
            border-color: rgba(0, 212, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        
        .feature-icon {
            font-size: 40px;
            margin-bottom: 15px;
        }
        
        .feature-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #ffffff;
        }
        
        .feature-desc {
            font-size: 14px;
            color: #cccccc;
            line-height: 1.5;
        }
        
        .file-structure {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin: 40px 0;
        }
        
        .file-tree {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #00d4ff;
            line-height: 1.8;
        }
        
        .tree-branch {
            margin-left: 20px;
        }
        
        .tree-root {
            color: #ffffff;
            font-weight: bold;
        }
        
        .tree-file {
            color: #cccccc;
        }
        
        .tech-specs {
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 15px;
            padding: 30px;
            margin: 40px 0;
        }
        
        .spec-title {
            font-size: 20px;
            font-weight: 600;
            color: #00d4ff;
            margin-bottom: 20px;
        }
        
        .spec-item {
            margin: 10px 0;
            font-size: 14px;
            color: #cccccc;
        }
        
        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
        }
        
        .footer-text {
            font-size: 18px;
            color: #cccccc;
            margin-bottom: 10px;
        }
        
        .footer-highlight {
            color: #00d4ff;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="tree-container">
        <h1 class="tree-title">🚗 智慧叫車 LINE 官方帳號系統</h1>
        
        <div class="tree">
            <div class="root">🚗 智慧叫車生態系</div>
            
            <div class="branches">
                <!-- 即時叫車 -->
                <div class="branch">
                    <div class="branch-icon">🚗</div>
                    <div class="branch-title">即時叫車</div>
                    <div class="branch-subtitle">Call a Car</div>
                    <div class="branch-details">
                        • 一鍵獲取當前位置<br>
                        • Uber 黑色系專業 UI<br>
                        • 自動回傳完整地址
                    </div>
                    <div class="branch-tech">
                        <div class="tech-item">LIFF ID: 2008784977-JQ8QvDIR</div>
                        <div class="tech-item">Google Maps Geocoding API</div>
                    </div>
                </div>
                
                <!-- 估算車資 -->
                <div class="branch">
                    <div class="branch-icon">💰</div>
                    <div class="branch-title">估算車資</div>
                    <div class="branch-subtitle">Estimate the Fare</div>
                    <div class="branch-details">
                        • 輸入下車地址自動計算<br>
                        • 智能計價 + 浮動範圍<br>
                        • 確認叫車功能
                    </div>
                    <div class="branch-tech">
                        <div class="tech-item">LIFF ID: 2008784977-s1enHy4P</div>
                        <div class="tech-item">Google Maps Directions API</div>
                    </div>
                </div>
                
                <!-- 客訴服務 -->
                <div class="branch">
                    <div class="branch-icon">🎧</div>
                    <div class="branch-title">客訴服務</div>
                    <div class="branch-subtitle">Customer Service</div>
                    <div class="branch-details">
                        • 多欄位結構化表單<br>
                        • LINE 使用者名稱整合<br>
                        • 日期時間案件編號
                    </div>
                    <div class="branch-tech">
                        <div class="tech-item">LIFF ID: 2008784977-HdgsRmmR</div>
                        <div class="tech-item">個人化 + 時間編號</div>
                    </div>
                </div>
            </div>
            
            <!-- 技術規格 -->
            <div class="tech-specs">
                <div class="spec-title">🛠️ 技術規格</div>
                <div class="spec-item">📱 放大20%置中顯示</div>
                <div class="spec-item">🎨 Uber 黑色系專業UI</div>
                <div class="spec-item">📐 跨平台iOS/Android相容</div>
                <div class="spec-item">✅ 完整表單驗證系統</div>
                <div class="spec-item">👤 LINE使用者名稱整合</div>
                <div class="spec-item">📅 智能日期時間編號</div>
            </div>
            
            <!-- 檔案結構 -->
            <div class="file-structure">
                <div class="spec-title">📁 檔案結構</div>
                <div class="file-tree">
                    <div class="tree-root">📁 專案根目錄</div>
                    <div class="tree-branch">├─ 📄 index.html</div>
                    <div class="tree-branch">├─ 📄 fare-calculator.html</div>
                    <div class="tree-branch">├─ 📄 complaint-service.html</div>
                    <div class="tree-branch">├─ 📄 menu-6grid.html</div>
                    <div class="tree-branch">└─ 📄 README.md</div>
                </div>
            </div>
            
            <!-- 功能特色 -->
            <div class="tree-section">
                <div class="section-title">🎯 核心功能</div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🎯</div>
                        <div class="feature-title">個人化體驗</div>
                        <div class="feature-desc">顯示LINE使用者名稱，提供個人化歡迎訊息</div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">📅</div>
                        <div class="feature-title">智能編號</div>
                        <div class="feature-desc">日期時間精準標記，格式：2024/12/27-1435</div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">📐</div>
                        <div class="feature-title">跨平台相容</div>
                        <div class="feature-desc">iOS/Android 完美支援，日期選擇器正常顯示</div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">✅</div>
                        <div class="feature-title">完整驗證</div>
                        <div class="feature-desc">自動表單驗證，確保資料完整性</div>
                    </div>
                </div>
            </div>
            
            <!-- 未來擴充 -->
            <div class="tree-section">
                <div class="section-title">🚀 未來擴充</div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🎁</div>
                        <div class="feature-title">優惠訊息</div>
                        <div class="feature-desc">推播最新優惠與促銷活動</div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">📤</div>
                        <div class="feature-title">分享好友</div>
                        <div class="feature-desc">推薦獎勵與分享機制</div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">⭐</div>
                        <div class="feature-title">點數積分</div>
                        <div class="feature-desc">忠誠度計畫與積分系統</div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <div class="feature-title">大數據分析</div>
                        <div class="feature-desc">乘車行為分析與優化</div>
                    </div>
                </div>
            </div>
            
            <!-- 技術架構 -->
            <div class="tech-specs">
                <div class="spec-title">🔧 技術架構</div>
                <div class="spec-item">📱 前端：Pure HTML5 + CSS3 + JavaScript</div>
                <div class="spec-item">🌐 後端：Vercel 自動部署 + GitHub 版本控制</div>
                <div class="spec-item">📍 地圖：Google Maps Platform API</div>
                <div class="spec-item">💬 整合：LINE LIFF 官方帳號</div>
                <div class="spec-item">🎨 設計：Uber 黑色系專業風格</div>
            </div>
            
            <!-- 完整檔案樹狀圖 -->
            <div class="file-structure">
                <div class="spec-title">🌳 完整檔案樹狀圖</div>
                <div class="file-tree">
                    <div class="tree-root">🚗 智慧叫車 LINE 官方帳號系統</div>
                    
                    <div class="tree-branch">├─ 🚀 即時叫車系統</div>
                    <div class="tree-branch">│  ├─ 📄 index.html</div>
                    <div class="tree-branch">│  ├─ 🎯 LIFF: 2008784977-JQ8QvDIR</div>
                    <div class="tree-branch">│  ├─ 🌐 Google Maps Geocoding API</div>
                    <div class="tree-branch">│  └─ 🎨 Uber 黑色系專業UI</div>
                    
                    <div class="tree-branch">├─ 💰 估算車資系統</div>
                    <div class="tree-branch">│  ├─ 📄 fare-calculator.html</div>
                    <div class="tree-branch">│  ├─ 🎯 LIFF: 2008784977-s1enHy4P</div>
                    <div class="tree-branch">│  ├─ 🌐 Google Maps Directions API</div>
                    <div class="tree-branch">│  └─ 💡 智能計價演算法</div>
                    
                    <div class="tree-branch">├─ 🎧 客訴服務系統</div>
                    <div class="tree-branch">│  ├─ 📄 complaint-service.html</div>
                    <div class="tree-branch">│  ├─ 🎯 LIFF: 2008784977-HdgsRmmR</div>
                    <div class="tree-branch">│  ├─ 👤 個人化體驗</div>
                    <div class="tree-branch">│  ├─ 📅 日期時間案件編號</div>
                    <div class="tree-branch">│  └─ 📋 結構化多欄位表單</div>
                    
                    <div class="tree-branch">├─ 🖼️ 圖文選單設計</div>
                    <div class="tree-branch">│  ├─ 📄 menu-6grid.html</div>
                    <div class="tree-branch">│  ├─ 🎨 6格專業設計</div>
                    <div class="tree-branch">│  └─ 🎯 LINE 官方帳號整合</div>
                    
                    <div class="tree-branch">└─ 📄 README.md</div>
                    <div class="tree-branch">   └─ 📖 完整專案說明</div>
                </div>
            </div>
            
            <!-- 完成狀態 -->
            <div class="footer">
                <div class="footer-text">🎉 恭喜你完成專業級的叫車平台！</div>
                <div class="footer-highlight">✅ 已完成核心功能 | 🚀 隨時準備擴充</div>
            </div>
        </div>
    </div>
</body>
</html>
