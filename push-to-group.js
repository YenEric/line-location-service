// push-to-group.js - 後端推送功能
const axios = require('axios');

// LINE Messaging API 設定
const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';
const GROUP_ID = 'YOUR_GROUP_ID'; // 官方帳號被加入的群組ID

/**
 * 推播訊息到指定群組
 * @param {string} message - 要推播的訊息
 * @param {string} groupId - 群組ID
 * @returns {Promise} - 推播結果
 */
async function pushToGroup(message, groupId = GROUP_ID) {
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
                    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
            }
        );
        
        console.log("✅ 成功推播到群組:", response.data);
        return { success: true, data: response.data };
        
    } catch (error) {
        console.error("❌ 推播失敗:", error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
}

/**
 * 獲取群組資訊
 * @param {string} groupId - 群組ID
 * @returns {Promise} - 群組資訊
 */
async function getGroupInfo(groupId) {
    try {
        const response = await axios.get(
            `https://api.line.me/v2/bot/group/${groupId}/summary`,
            {
                headers: {
                    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error("❌ 獲取群組資訊失敗:", error.response?.data || error.message);
        return null;
    }
}

/**
 * 推播客訴案件到群組
 * @param {Object} complaintData - 客訴資料
 * @returns {Promise} - 推播結果
 */
async function pushComplaintToGroup(complaintData) {
    const {
        caseNumber,
        userName,
        problemType,
        description,
        fileCount,
        groupId = GROUP_ID
    } = complaintData;

    const message = `🎧 新客訴案件\n\n案件編號：${caseNumber}\n乘客：${userName}\n問題類型：${problemType}\n\n描述：${description.substring(0, 200)}${description.length > 200 ? '...' : ''}\n\n📎 附件：${fileCount} 個檔案\n\n⏰ 請盡快處理，感謝！`;

    return await pushToGroup(message, groupId);
}

module.exports = {
    pushToGroup,
    getGroupInfo,
    pushComplaintToGroup
};
