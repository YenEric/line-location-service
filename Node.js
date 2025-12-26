// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Webhook 接收器
app.post('/webhook', async (req, res) => {
    console.log('收到 Webhook:', req.body);
    
    // 處理推播邏輯
    if (req.body.events && req.body.events.length > 0) {
        for (const event of req.body.events) {
            if (event.type === 'message' && event.message.type === 'text') {
                // 推播到指定群組
                await pushToGroup(event.message.text, event.source.groupId);
            }
        }
    }
    
    res.status(200).send('OK');
});

// 推播到群組功能
async function pushToGroup(message, groupId) {
    try {
        const response = await axios.post(
            'https://api.line.me/v2/bot/message/push',
            {
                to: groupId,
                messages: [
                    {
                        type: "text",
                        text: message
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('✅ 成功推播到群組:', response.data);
    } catch (error) {
        console.error('❌ 推播失敗:', error);
    }
}

app.listen(3000, () => {
    console.log('Webhook server running on port 3000');
});
