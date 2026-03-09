const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. MOCK: DigiKYC - PAN Card OCR API
app.post('/api/kyc/pan-ocr', (req, res) => {
    console.log("[MOCK] Extracting PAN details...");
    // Simulating a 1.5s delay for image processing/OCR
    setTimeout(() => {
        res.json({
            success: true,
            data: {
                name_on_card: "ROHIT SHARMA",
                pan_number: "ABCDE1234F",
                dob: "30/04/1987",
                status: "VERIFIED"
            }
        });
    }, 1500);
});

// 2. MOCK: DigiCollect - Penny Drop Bank Verification API
app.post('/api/bank/penny-drop', (req, res) => {
    const { account_number, ifsc } = req.body;
    console.log(`[MOCK] Dropping ₹1 into A/C: ${account_number}`);
    
    // Simulating IMPS banking delay
    setTimeout(() => {
        res.json({
            success: true,
            data: {
                beneficiary_name: "ROHIT SHARMA",
                name_match_score: 100, // Matched with PAN name
                bank_reference_number: `IMPS${Math.floor(Math.random() * 1000000000)}`,
                status: "ACTIVE"
            }
        });
    }, 2000);
});

// 3. MOCK: DigiSign - Document Generation API
app.post('/api/sign/generate', (req, res) => {
    console.log("[MOCK] Generating PDF Contract...");
    setTimeout(() => {
        res.json({
            success: true,
            document_id: `DID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            status: "REQUESTED"
        });
    }, 1000);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Full Workflow Mock Backend running on http://localhost:${PORT}`);
});