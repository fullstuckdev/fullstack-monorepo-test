import dotenv from "dotenv";
dotenv.config();

export function validateEnv() {
  const isEmulator = true

  const required = [
    "FB_PROJECT_ID",
    "FB_PRIVATE_KEY",
    "FB_CLIENT_EMAIL",
    "FB_API_KEY",
  ];


  // If using emulator, we can use dummy values
  if (isEmulator) {
    console.log("🔧 Running in emulator mode - using dummy credentials");
    process.env.FB_PROJECT_ID = process.env.FB_PROJECT_ID || "demo-project";
    process.env.FB_PRIVATE_KEY =
      process.env.FB_PRIVATE_KEY ||
      "-----BEGIN PRIVATE KEY-----\nMIIEv...dummy...key\n-----END PRIVATE KEY-----\n";
    process.env.FB_CLIENT_EMAIL =
      process.env.FB_CLIENT_EMAIL ||
      "firebase-adminsdk-dummy@demo-project.iam.gserviceaccount.com";
    process.env.FB_API_KEY = process.env.FB_API_KEY || "dummy-api-key";
    return;
  }

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  if (!process.env.FB_PRIVATE_KEY?.includes("BEGIN PRIVATE KEY")) {
    throw new Error("Invalid FB_PRIVATE_KEY format");
  }
}
