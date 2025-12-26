// server.js - 簡單的後端伺服器
const express = require('express');
const cors = require('cors');
const { pushComplaintToGroup } = require('./push-to-group');

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 客訴推播 API
app.post('/api/push-to-group', async (req, res) => {
    try {
        const result = await pushComplaintToGroup(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('🚀 後端伺服器啟動在 port 3000');
});
