const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caseNumber: {
    type: String, // e.g., "CASE-001"
    required: true,
    unique: true
  },
  title: {
    type: String, // e.g., "Civil Dispute — Land Ownership"
    required: true
  },
  court: {
    type: String, // e.g., "District Court, Delhi"
    required: true
  },
  nextHearingDate: {
    type: Date
  },
  // The small colored pill status (e.g., Hearing, Filed, Pending)
  statusTag: {
    type: String,
    enum: ['Filed', 'Pending', 'Hearing', 'Judgment', 'Closed'],
    default: 'Filed'
  },
  // The interactive stages that drive the progress bar
  currentStage: {
    type: String,
    enum: ['Filed', 'Admitted', 'Evidence', 'Arguments', 'Judgment'],
    default: 'Filed'
  },
  // The progress percentage (0 to 100)
  progressPercentage: {
    type: Number,
    default: 20
  }
}, { timestamps: true });

module.exports = mongoose.model('Case', CaseSchema);