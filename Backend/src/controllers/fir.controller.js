const { GoogleGenAI } = require('@google/genai');
const nodemailer = require('nodemailer');

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 1. Generate an FIR Draft
const generateFirDraft = async (req, res) => {
  try {
    const { complainantName, datePlace, description, accusedDetails } = req.body;

    if (!complainantName || !datePlace || !description) {
      return res.status(400).json({ error: "Complainant Name, Date/Place, and Description are required." });
    }

    const prompt = `Act as an expert Indian legal assistant. Draft a formal First Information Report (FIR) ready to be submitted to a Police Station. Align the terminology with the Bharatiya Nagarik Suraksha Sanhita (BNSS).
    
    Use the following details provided by the user:
    - Name of Complainant: ${complainantName}
    - Date & Place of Incident: ${datePlace}
    - Description of Offence: ${description}
    - Accused Details (if known): ${accusedDetails || "Unknown"}
    
    Structure the response clearly with:
    1. To, The Officer-in-Charge, [Leave Blank for Station Name]
    2. Subject Line
    3. Respected Sir/Madam,
    4. The main body detailing the incident chronologically.
    5. A formal request for registration of the FIR and investigation.
    6. Sign-off with the complainant's name.
    
    Do not include any conversational filler; return only the drafted document text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.status(200).json({
      message: "FIR Draft generated successfully",
      draftText: response.text
    });

  } catch (error) {
    console.error("FIR Generation Error:", error);
    res.status(500).json({ error: "Failed to generate FIR draft." });
  }
};

// 2. Generate a Complaint regarding an existing FIR
const generateFirComplaint = async (req, res) => {
  try {
    const { firDetails, natureOfComplaint, reliefSought } = req.body;

    if (!firDetails || !natureOfComplaint || !reliefSought) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const prompt = `Act as an expert Indian legal assistant. Draft a formal legal complaint regarding an issue with an existing FIR (such as delayed registration, false FIR, or improper investigation). This will be addressed to a Superintendent of Police or a Magistrate.
    
    Use the following details provided by the user:
    - FIR Number & Police Station: ${firDetails}
    - Nature of the Complaint: ${natureOfComplaint}
    - Relief Sought: ${reliefSought}
    
    Structure the response clearly with:
    1. To, [Superintendent of Police / Magistrate - leave placeholder]
    2. Subject Line referencing the FIR number.
    3. Respected Sir/Madam,
    4. The main body explaining the grievance regarding the FIR/Investigation.
    5. The specific relief or action sought.
    6. Sign-off.
    
    Do not include any conversational filler; return only the drafted document text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const draftText = response.text;

    // Send complaint draft to test receiver
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TEST_RECEIVER_EMAIL,
      subject: `FIR Complaint Draft - ${firDetails}`,
      text: draftText
    });

    res.status(200).json({
      message: "FIR Complaint generated successfully",
      draftText
    });

  } catch (error) {
    console.error("Complaint Generation Error:", error);
    res.status(500).json({ error: "Failed to generate complaint draft." });
  }
};

module.exports = { generateFirDraft, generateFirComplaint };