const express = require('express');
const { WebhookClient } = require('line-bot-sdk');
const axios = require('axios');

const app = express();
app.use(express.json());

// LINE Bot 設定
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new WebhookClient(config);

// 🔍 推播到指定群組功能
async function pushToGroup(groupId, message) {
    try {
        await client.pushMessage(groupId, {
            type: "text",
            text: message
        });
        console.log("✅ 成功推播到群組:", groupId);
        return { success: true, message: "推播成功" };
    } catch (error) {
        console.error("❌ 推播失敗:", error);
        return { success: false, error: error.message };
    }
}

// 🔍 從客訴 LIFF 接收推播請求
app.post('/api/push-complaint', async (req, res) => {
    try {
        const { caseNumber, userName, type, description, fileCount, groupId } = req.body;
        
        // 🔍 準備推播訊息
        const message = `🎧 新客訴案件\n案件編號：${caseNumber}\n乘客：${userName}\n問題類型：${type}\n\n描述：${description.substring(0, 200)}${description.length > 200 ? '...' : ''}\n\n📎 附件：${fileCount} 個檔案`;
        
        // 🔍 推播到指定群組
        const result = await pushToGroup(groupId, message);
        
        res.json(result);
        
    } catch (error) {
        console.error("API 錯誤:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔍 取得群組列表
app.get('/api/groups', async (req, res) => {
    try {
        // 🔍 使用 LINE API 取得群組列表
        const response = await axios.get('https://api.line.me/v2/bot/groupSummary/groupId', {
            headers: {
                'Authorization': `Bearer ${config.channelAccessToken}`
            }
        });
        
        res.json(response.data);
        
    } catch (error) {
        console.error("取得群組錯誤:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔍 Webhook 處理（可選）
app.post('/webhook', (req, res) => {
    console.log("收到 Webhook:", req.body);
    res.sendStatus(200);
});

// 啟動伺服器
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 伺服器啟動在 port ${port}`);
});
