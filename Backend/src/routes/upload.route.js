const express = require('express');
const router = express.Router();

// Import Middleware and Controllers
const uploadDisk = require('../middleware/upload.middleware');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { 
  uploadDocument, 
  getUserDocuments, 
  getDocumentInsights 
} = require('../controllers/document.controller');

// Define Routes
// Note: The base path '/api/documents' will be applied in server.js, 
// so we only need the relative paths here.

// 1. Upload a new document
router.post('/upload', isLoggedIn, uploadDisk.single('document'), uploadDocument);

// 2. Get all uploaded documents for a user
router.get('/', isLoggedIn, getUserDocuments);

// 3. Generate AI insights for a specific document
router.get('/:id/insights', isLoggedIn, getDocumentInsights);

module.exports = router;