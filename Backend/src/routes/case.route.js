const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/authMiddleware');
const { 
  createCase, 
  getUserCases, 
  updateCaseStage 
} = require('../controllers/case.controller');

// Create a new case
router.post('/add', isLoggedIn, createCase);

// Get all cases for the logged-in user
router.get('/', isLoggedIn, getUserCases);

// Update a specific case's stage (This triggers the progress bar change)
router.patch('/:id/stage', isLoggedIn, updateCaseStage);

module.exports = router;