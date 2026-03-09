"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // User Data State
  const [panData, setPanData] = useState<any>(null);
  const [bankData, setBankData] = useState<any>(null);
  const [docId, setDocId] = useState("");
  const [showSignModal, setShowSignModal] = useState(false);

  // Form Inputs
  const [accountNo, setAccountNo] = useState("098765432123");
  const [ifsc, setIfsc] = useState("HDFC0001234");

  // NEW: File Upload State
  const [panFile, setPanFile] = useState<File | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPanFile(file);
      setPanPreview(URL.createObjectURL(file)); // Generate a local preview URL
    }
  };

  // --- MOCKED API CALLS FOR DEPLOYMENT ---
  // These now simulate the backend directly in the browser so it works on Netlify

  const handlePanUpload = async () => {
    setLoading(true);
    // Simulate a 2-second OCR processing delay
    await new Promise(r => setTimeout(r, 2000)); 
    
    setPanData({
        name_on_card: "ROHIT SHARMA",
        pan_number: "ABCDE1234F",
        dob: "30/04/1987",
        status: "VERIFIED"
    });
    setLoading(false);
    setStep(2);
  };

  const handleBankVerify = async () => {
    setLoading(true);
    // Simulate bank penny drop delay
    await new Promise(r => setTimeout(r, 1500)); 
    
    setBankData({
        beneficiary_name: "ROHIT SHARMA", // Matches PAN name
        name_match_score: 100,
        bank_reference_number: `IMPS${Math.floor(Math.random() * 1000000000)}`,
        status: "ACTIVE"
    });
    setLoading(false);
    setStep(3);
  };

  const handleGenerateContract = async () => {
    setLoading(true);
    // Simulate contract generation delay
    await new Promise(r => setTimeout(r, 1000));
    
    setDocId(`DID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setLoading(false);
    setShowSignModal(true);
  };

  const handleMockSign = () => {
    setLoading(true); 
    // Simulate digital signing process
    setTimeout(() => {
      setLoading(false);
      setShowSignModal(false);
      setStep(4);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-black font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="bg-slate-950 p-4 rounded-xl shadow-lg mb-6 flex items-center justify-center">
             {/* Ensure you have image_2.png saved as company-logo.png in the /public folder */}
            <Image 
              src="/company-logo.png" 
              alt="Comfort Fincap Logo" 
              width={250} 
              height={70}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Partner Onboarding Portal</h1>
          <p className="mt-2 text-base text-slate-600">Please complete the required verifications to generate your agreement.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 px-8 relative">
          <div className="absolute top-4 left-16 right-16 h-0.5 bg-slate-200 -z-10"></div>
          {["Identity Verification", "Bank Verification", "e-Sign Agreement"].map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            
            return (
              <div key={index} className="flex flex-col items-center w-1/3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold mb-3 border-2 transition ${
                  isCompleted ? 'bg-emerald-600 border-emerald-600 text-white shadow' : isActive ? 'bg-white border-slate-950 text-slate-950 shadow-md ring-2 ring-slate-950/20' : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span className={`text-xs text-center font-semibold tracking-wide ${isActive ? 'text-slate-950' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>{label.toUpperCase()}</span>
              </div>
            );
          })}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-h-[420px]">
          
          {/* STEP 1: PAN KYC */}
          {step === 1 && (
            <div className="p-10 flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 border border-slate-200">
                <span className="text-3xl">🪪</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">PAN Card Identity Verification</h3>
              <p className="text-sm text-slate-600 mb-8 max-w-sm">Use our secure Digio KYC integration to analyze and extract details from your PAN Card automatically.</p>
              
              {/* NEW: Functional File Upload Area */}
              <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 w-full max-w-md bg-slate-50 flex flex-col items-center justify-center hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer group relative overflow-hidden min-h-[160px]">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange} 
                  />
                  
                  {panPreview ? (
                    <div className="flex flex-col items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={panPreview} alt="PAN Preview" className="h-28 object-contain mb-3 rounded shadow-sm border border-slate-200" />
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Image Selected - Click to change</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl mb-3 text-slate-400 group-hover:text-emerald-500 transition-colors">📄</span>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-emerald-700">Click to upload PAN image</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
              </label>

              <button 
                onClick={handlePanUpload} 
                disabled={loading || !panFile} // Button disabled if no image is uploaded
                className="mt-8 bg-slate-950 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>}
                {loading ? "Scanning & Extracting OCR..." : "Analyze & Verify PAN"}
              </button>
            </div>
          )}

          {/* STEP 2: BANK VERIFICATION */}
          {step === 2 && (
            <div className="p-10">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-bold text-slate-950">Bank Account Details</h3>
                 <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                   <span className="text-lg">✓</span>
                   PAN Verified: <strong>{panData?.name_on_card}</strong>
                 </div>
              </div>
              
              <div className="space-y-5 bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Account Number</label>
                  <input type="text" value={accountNo} onChange={(e)=>setAccountNo(e.target.value)} className="w-full border-slate-300 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all" placeholder="Enter bank account number"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">IFSC Code</label>
                  <input type="text" value={ifsc} onChange={(e)=>setIfsc(e.target.value)} className="w-full border-slate-300 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all" placeholder="Enter bank IFSC code"/>
                </div>
              </div>

              <button 
                onClick={handleBankVerify} disabled={loading}
                className="w-full mt-4 bg-slate-950 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-black disabled:bg-slate-400 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>}
                {loading ? "Performing Penny Drop (₹1)..." : "Verify Bank Account Now"}
              </button>
            </div>
          )}

          {/* STEP 3: E-SIGN AGREEMENT */}
          {step === 3 && (
            <div className="p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6 border border-slate-200 mx-auto">
                <span className="text-5xl">✍️</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-6">Master Vendor Agreement</h3>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 text-left text-sm space-y-3 font-medium">
                <p><span className="text-slate-500">Verified Name (PAN/Bank):</span> <strong className="text-slate-950">{bankData?.beneficiary_name}</strong></p>
                <p><span className="text-slate-500">Bank Verification Status:</span> <strong className="text-emerald-700">✅ ACTIVE (IMPS Ref: {bankData?.bank_reference_number})</strong></p>
              </div>
              <p className="text-sm text-slate-600 mb-10 max-w-sm mx-auto">You are now cleared to sign the final contract via the Digio secure digital signing gateway.</p>
              <button 
                onClick={handleGenerateContract} disabled={loading}
                className="bg-slate-950 text-white px-10 py-3 rounded-lg font-semibold hover:bg-black disabled:bg-slate-400 w-full max-w-sm flex items-center justify-center gap-2 mx-auto"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>}
                {loading ? "Preparing Secure Sign..." : "Review & e-Sign Agreement"}
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS FINISH */}
          {step === 4 && (
            <div className="p-16 text-center flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-200 text-emerald-600 flex items-center justify-center text-6xl mb-6 shadow-lg shadow-emerald-500/10">✓</div>
              <h3 className="text-3xl font-extrabold text-slate-950 mb-3">Welcome Aboard!</h3>
              <p className="text-base text-slate-600 mb-10">All verifications are complete. Your onboarding document (ID: <strong className="text-slate-900">{docId}</strong>) has been successfully signed. A copy will be sent to your email.</p>
              <button onClick={() => { setStep(1); setPanFile(null); setPanPreview(null); }} className="text-sm font-semibold text-slate-600 hover:text-slate-950 hover:underline">
                Register New Partner
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mock Digio Signing Popup */}
      {showSignModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[85vh]">
            <div className="bg-slate-950 p-5 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                 <Image 
                  src="/company-logo.png" 
                  alt="Comfort Fincap" 
                  width={150} 
                  height={40}
                  className="object-contain brightness-0 invert" 
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                 <span className="font-semibold text-white">Secure DigiSign Gateway (MOCK)</span>
                 <span className="text-xs bg-emerald-600/20 text-emerald-400 font-mono px-3 py-1 rounded-full border border-emerald-600/30">ID: {docId}</span>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col p-6 sm:p-10 bg-slate-100 items-center justify-center relative">
              <div className="bg-white shadow-xl border border-slate-200 w-full h-full p-8 sm:p-12 flex flex-col rounded-lg">
                <div className="flex justify-between items-center border-b border-slate-200 pb-5 mb-6">
                   <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">MASTER PARTNER AGREEMENT</h2>
                   <div className="text-slate-400 font-mono text-sm hidden sm:block">Page 1 of 1</div>
                </div>
                
                <div className="flex-grow text-sm text-slate-700 overflow-y-auto space-y-5 leading-relaxed">
                  <p>This agreement (the "Agreement") is made effective as of {new Date().toLocaleDateString('en-GB')}, between Comfort Fincap Ltd. (the "Company") and <strong>{bankData?.beneficiary_name}</strong> (the "Partner").</p>
                  <p>WHEREAS, the Company wishes to engage the Partner for specific services. The Partner has provided the following verified banking information to be used for all settlement payments: Account No. <strong>{accountNo}</strong> (IFSC: <strong>{ifsc}</strong>). This data has been validated via simulated Digio banking services.</p>
                  <p>NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows: ...[Terms continued]...</p>
                  {Array(8).fill("").map((_, i) => (
                    <div key={i} className="h-2.5 bg-slate-100 rounded w-full"></div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                   <div className="flex flex-col text-slate-600 text-center sm:text-left">
                      <span className="text-xs font-semibold">AUTHENTICATION METHOD</span>
                      <span className="text-sm font-bold flex items-center justify-center sm:justify-start gap-1.5"><span className="text-lg text-emerald-600">✓</span> Simulated Aadhaar OTP eSign</span>
                   </div>
                   <button 
                    onClick={handleMockSign}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 sm:px-10 rounded-xl shadow-lg shadow-emerald-600/10 transition flex items-center justify-center gap-2.5 w-full sm:w-auto"
                  >
                    {loading && <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>}
                    {loading ? "Signing Document..." : "Authenticate & Sign Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}