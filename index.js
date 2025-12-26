const axios = require('axios');

// 主要 Webhook 接收器
module.exports = async (req, res) => {
    console.log('🔍 收到 Webhook 請求:', req.body);
    
    try {
        const { message, groupId, userName, caseNumber, uploadedFiles } = req.body;
        
        if (!message || !groupId) {
            return res.status(400).json({ 
                error: '缺少必要參數',
                received: req.body 
            });
        }
        
        // 🔍 推播到群組
        const result = await pushToGroup(message, groupId);
        
        res.status(200).json({ 
            success: true, 
            message: '✅ 成功推播到群組',
            caseNumber: caseNumber,
            pushedTo: groupId
        });
        
    } catch (error) {
        console.error('❌ Webhook 錯誤:', error);
        res.status(500).json({ 
            error: '推播失敗',
            details: error.message 
        });
    }
};

// 🔍 推播到群組功能
async function pushToGroup(message, groupId) {
    try {
        const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
        
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
                    'Authorization': `Bearer ${accessToken}`,
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
