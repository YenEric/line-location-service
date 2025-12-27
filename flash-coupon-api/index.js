const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 讀 MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());

// 連接 MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/line-coupon');

// ── Coupon 模型（同目錄 models/coupon.js 會被自動載入）
const CouponSchema = new mongoose.Schema({
  userId:     String,
  campaignId: { type: String, default: 'FLASH50' },
  amount:     { type: Number, default: 50 },
  threshold:  { type: Number, default: 100 },
  used:       { type: Boolean, default: false },
  expireAt:   { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
}, { timestamps: true });
const Coupon = mongoose.model('Coupon', CouponSchema);

// ── 每日補券 (手動或 Cron 呼叫)
app.post('/api/init', async (_, res) => {
  const exist = await Coupon.countDocuments({ campaignId: 'FLASH50', userId: null });
  if (exist >= 500) return res.json({ ok: true, msg: '已足夠 500 張' });

  const bulk = Array(500 - exist).fill({ campaignId: 'FLASH50', amount: 50, threshold: 100 });
  await Coupon.insertMany(bulk);
  res.json({ ok: true, msg: '補滿 500 張' });
});

// ── 領券
app.post('/api/coupon/flash', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ ok: false, msg: '缺少 userId' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const had = await Coupon.findOne({ userId, createdAt: { $gte: today, $lt: tomorrow } });
  if (had) return res.json({ ok: false, msg: '今日已領過' });

  const coupon = await Coupon.findOneAndUpdate(
    { campaignId: 'FLASH50', userId: null, used: false },
    { userId },
    { new: true, sort: { createdAt: 1 } }
  );
  if (!coupon) return res.json({ ok: false, msg: '名額已滿' });

  res.json({ ok: true, couponId: coupon._id });
});

// ── 結帳核銷（計程車端呼叫）
app.post('/api/coupon/use', async (req, res) => {
  const { userId, fare } = req.body;
  if (fare < 100) return res.json({ ok: false, msg: '未達門檻' });

  const c = await Coupon.findOneAndUpdate(
    { userId, campaignId: 'FLASH50', used: false, expireAt: { $gte: new Date() } },
    { used: true }
  );
  if (!c) return res.json({ ok: false, msg: '無可用券' });

  res.json({ ok: true, discount: c.amount, finalFare: fare - c.amount });
});

app.get('/', (_, res) => res.send('FlashCoupon API OK'));
module.exports = app;
