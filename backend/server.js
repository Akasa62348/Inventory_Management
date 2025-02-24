const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

dotenv.config();
const app = express();

// ✅ Updated CORS setup
app.use(cors({
  origin: "https://akashinventorymanagementapp.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// 🔑 Optional but helps with preflight requests
app.options('*', cors());

const connectDB = require('./utils/connectDB');
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/purchases', purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
