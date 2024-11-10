import * as admin from "firebase-admin";
import dotenv from "dotenv";

export class EmulatorConfig {
  static setup(): void {
    dotenv.config();

    process.env.AUTH_EMULATOR_HOST = "localhost:9099";
    process.env.EMULATOR_HOST = "localhost:8080";

    console.log("🔧 Firebase Emulators configured:");
    console.log("- Auth Emulator:", process.env.AUTH_EMULATOR_HOST);
    console.log("- Firestore Emulator:", process.env.EMULATOR_HOST);
  }

  static isUsingEmulator(): boolean {
    return process.env.FIREBASE_CONFIG?.includes('"emulators"') || false;
  }
}
