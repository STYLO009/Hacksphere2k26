const fs = require('fs');
const path = require('path');
const Document = require('../models/Document.model');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 1. Upload a Document
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided." });
    }

    const userId = req.user.id;

    const newDoc = new Document({
      userId,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    await newDoc.save();
    res.status(201).json({ message: "Document saved successfully", data: newDoc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get All Documents for a User
const getUserDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const documents = await Document.find({ userId }).sort({ createdAt: -1 }); // Newest first
    
    res.status(200).json({ data: documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Generate AI Insights for a Specific Document
const getDocumentInsights = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }

    // Read the file from the local disk
    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({ error: "File no longer exists on server." });
    }

    const fileBuffer = fs.readFileSync(document.filePath);
    const fileBase64 = fileBuffer.toString("base64");

    const prompt = `Analyze this legal document and provide insights. 
    Return a structured JSON response with two keys:
    1. "summary": A brief, plain-English summary of the document (2-3 sentences).
    2. "keyInsights": An array of 3 to 5 critical bullet points the user should be aware of (deadlines, liabilities, required actions).`;

    // Send to Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            data: fileBase64,
            mimeType: document.mimeType
          }
        },
        prompt
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const aiInsights = JSON.parse(response.text);
    
    res.status(200).json({ 
      message: "Insights generated successfully", 
      data: aiInsights 
    });

  } catch (error) {
    console.error("AI Insight Error:", error);
    res.status(500).json({ error: "Failed to generate AI insights." });
  }
};

module.exports = { uploadDocument, getUserDocuments, getDocumentInsights };