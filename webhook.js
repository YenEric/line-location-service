// webhook.js - Vercel Serverless Function
const axios = require('axios');

module.exports = async (req, res) => {
    console.log('收到 Webhook:', req.body);
    
    try {
        const { message, groupId, userName, caseNumber } = req.body;
        
        if (!message || !groupId) {
            return res.status(400).json({ error: '缺少必要參數' });
        }
        
        // 🔍 推播到指定群組
        await pushToGroup(message, groupId);
        
        res.status(200).json({ 
            success: true, 
            message: '已成功推播到群組',
            caseNumber: caseNumber 
        });
        
    } catch (error) {
        console.error('Webhook 錯誤:', error);
        res.status(500).json({ error: '推播失敗' });
    }
};

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
        return response.data;
        
    } catch (error) {
        console.error('❌ 推播失敗:', error);
        throw error;
    }
}
