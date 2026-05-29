require('dotenv').config();
const express = require('express'); 
const path = require('path');

const app = require("./src/app"); 
const connectDB = require("./src/config/db");
const { initCronJobs } = require('./src/config/cronService');

// 1. Import your new routes file
const uploadRoutes = require('./src/routes/upload.route.js'); 

// 2. Connect to Database
connectDB();

// 3. Initialize Background Workers
initCronJobs();

// 4. Serve Static Files (Crucial for frontend to view PDFs/Images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. Apply the Routes
// This tells Express: "For any URL that starts with /api/documents, use the uploadRoutes file"
app.use('/api/documents', uploadRoutes);

// 6. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});