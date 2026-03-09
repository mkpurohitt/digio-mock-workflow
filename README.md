Project Title: End-to-End FinTech Partner Onboarding Portal (Digio Mock)
The Objective:
To build a seamless, conversion-optimized onboarding flow for vendors or financial partners. It simulates a real-world FinTech integration using the core concepts of Digio’s Enterprise API suite (DigiKYC, Penny Drop, and DigiSign).

Because Digio’s live Sandbox requires manual corporate verification to generate API keys, this project demonstrates API integration readiness by utilizing a meticulously crafted mock architecture. It proves that you understand the sequence, data flow, and UI/UX requirements of a complex compliance journey.

The 4-Step Technical Workflow
The application is built as a state machine in Next.js, guiding the user through four strict sequential phases:

1. Identity Verification (Simulating DigiKYC OCR)
The Action: The user uploads an image of their PAN card.

The Simulation: In a production environment, this image would be sent to Digio’s OCR (Optical Character Recognition) API. The app simulates the network latency and returns parsed JSON data (Name, PAN Number, DOB).

Business Value: Automates data entry and ensures the identity document is valid before proceeding.

2. Bank Verification (Simulating "Penny Drop" / IMPS)
The Action: The user inputs their Account Number and IFSC code.

The Simulation: The system simulates a "Penny Drop" API call. In the real world, this drops ₹1 into the user's account via IMPS to fetch the registered beneficiary name from the bank.

Business Value: The app implicitly demonstrates a crucial FinTech compliance step: ensuring the name from the verified PAN Card matches the name registered to the bank account to prevent fraud.

3. Contract Generation (Simulating Digio Document API)
The Action: The system compiles the verified data (Name, Bank Details) into a Master Vendor Agreement.

The Simulation: It mimics making a POST request to Digio to generate a secure PDF document, returning a unique Document ID (e.g., DID-X7Y8Z9).

Business Value: Creates a dynamic, legally binding contract based on the immutable data gathered in Steps 1 and 2.

4. Digital Signing (Simulating Digio Web SDK)
The Action: The user signs the document using a simulated Aadhaar OTP flow.

The Simulation: Instead of redirecting the user away from the website, it opens a secure modal over the existing page. This perfectly mimics Digio’s actual Frontend Javascript SDK, keeping the user in the native app environment for higher conversion rates.

Business Value: Finalizes the onboarding legally while maintaining brand continuity (incorporating the Comfort Fincap branding).

Technical Architecture & Stack
Frontend Framework: Next.js (App Router) with React.

Styling: Tailwind CSS for a highly responsive, enterprise-grade, and trustworthy visual design (using custom brand colors: Slate and Emerald).

State Management: React useState hooks manage the strict progression through the onboarding steps. A user cannot access Step 3 without successfully completing Steps 1 and 2.

Asynchronous Mocking: Utilizes JavaScript Promises and setTimeout to accurately mimic the real-world network latency of external API calls (e.g., waiting 2 seconds for OCR processing).

Deployment Architecture: The Next.js configuration (next.config.ts) was modified to use output: 'export'. This compiles the React application into a purely static HTML/CSS/JS bundle, allowing for lightning-fast, serverless deployment on Netlify's Edge network.
