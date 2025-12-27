const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  userId:     String,
  campaignId: { type: String, default: 'FLASH50' },
  amount:     { type: Number, default: 50 },
  threshold:  { type: Number, default: 100 },
  used:       { type: Boolean, default: false },
  expireAt:   { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', CouponSchema);
