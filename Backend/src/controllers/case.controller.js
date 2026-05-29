const Case = require('../models/Case');

// Predefined mapping of legal stages to progress percentages
const STAGE_PROGRESS_MAP = {
  'Filed': 20,
  'Admitted': 40,
  'Evidence': 60,
  'Arguments': 80,
  'Judgment': 100
};

// 1. Add a new case
const createCase = async (req, res) => {
  try {
    const { caseNumber, title, court, nextHearingDate } = req.body;
    const userId = req.user.id;

    const parsedDate = nextHearingDate ? new Date(nextHearingDate) : null;
    const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

    const newCase = new Case({
      userId,
      caseNumber,
      title,
      court,
      ...(isValidDate ? { nextHearingDate: parsedDate } : {}),
      currentStage: 'Filed',
      progressPercentage: 20,
      statusTag: 'Filed'
    });

    await newCase.save();
    res.status(201).json({ message: "Case tracked successfully", data: newCase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all cases for the dashboard
const getUserCases = async (req, res) => {
  try {
    const userId = req.user.id;
    const cases = await Case.find({ userId }).sort({ nextHearingDate: 1 });
    
    res.status(200).json({ data: cases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Update the Case Stage & Auto-Calculate Progress
const updateCaseStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStage } = req.body;

    // Validate if the requested stage exists in our map
    if (!STAGE_PROGRESS_MAP.hasOwnProperty(newStage)) {
      return res.status(400).json({ error: "Invalid case stage provided." });
    }

    // Determine the new progress percentage based on the stage
    const updatedProgress = STAGE_PROGRESS_MAP[newStage];

    // Determine the status tag based on the stage
    let newStatusTag = 'Hearing';
    if (newStage === 'Filed') newStatusTag = 'Filed';
    if (newStage === 'Judgment') newStatusTag = 'Judgment';

    // Update the database document
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { 
        currentStage: newStage,
        progressPercentage: updatedProgress,
        statusTag: newStatusTag
      },
      { new: true } // Returns the newly updated document
    );

    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found." });
    }

    res.status(200).json({ 
      message: "Case stage and progress updated successfully", 
      data: updatedCase 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCase, getUserCases, updateCaseStage };