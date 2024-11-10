import dotenv from "dotenv";

dotenv.config();

console.log("Checking Firebase credentials...\n");

const credentials = {
  projectId: process.env.FB_PROJECT_ID,
  privateKey: process.env.FB_PRIVATE_KEY?.substring(0, 50) + "...",
  clientEmail: process.env.FB_CLIENT_EMAIL,
};

console.log("Credentials found:");
console.log(JSON.stringify(credentials, null, 2));

const missing = Object.entries(credentials)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error("\nMissing credentials:", missing.join(", "));
} else {
  console.log("\nAll required credentials are present!");
}
