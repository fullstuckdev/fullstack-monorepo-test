import dotenv from "dotenv";
import path from "path";

// Try multiple possible paths for .env file
const envPaths = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "dist", ".env"),
  path.resolve(process.cwd(), "..", ".env"),
];

// Try loading .env from each path until successful
for (const envPath of envPaths) {
  const result = dotenv.config({ path: envPath });
  if (!result.error) break;
}

const required = [
  "FB_PROJECT_ID",
  "FB_PRIVATE_KEY",
  "FB_CLIENT_EMAIL",
  "FB_API_KEY",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missing.join(", ")}`
  );
}

export const environment = {
  isEmulator: process.env.IS_EMULATOR === "true",
  firebase: {
    projectId: process.env.FB_PROJECT_ID,
    privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FB_CLIENT_EMAIL,
    apiKey: process.env.FB_API_KEY,
  },
  port: parseInt(process.env.PROJECT || "3000", 10),
};
