const express = require('express');
const router = express.Router();
const { generateFirDraft, generateFirComplaint } = require('../controllers/fir.controller');

// Route for drafting a new FIR
router.post('/draft', generateFirDraft);

// Route for drafting a complaint about an FIR
router.post('/complaint', generateFirComplaint);

module.exports = router;