import * as admin from "firebase-admin";
import dotenv from "dotenv";
import { EmulatorConfig } from "./emulator.config";

dotenv.config();

export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private app: admin.app.App;

  private constructor() {
    try {
      EmulatorConfig.setup();

      const privateKey = process.env
        .FB_PRIVATE_KEY!.replace(/\\n/g, "\n")
        .replace(/"/g, "");

      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FB_PROJECT_ID,
        private_key: privateKey,
        client_email: process.env.FB_CLIENT_EMAIL,
      };

      if (!admin.apps.length) {
        this.app = admin.initializeApp({
          credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
          ),
        });

        if (EmulatorConfig.isUsingEmulator()) {
          console.log("🔥 Using Firebase Emulators");
        } else {
          console.log("🔥 Using Production Firebase");
        }
      } else {
        this.app = admin.app();
      }
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      throw error;
    }
  }

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }
    return FirebaseConfig.instance;
  }

  public getApp(): admin.app.App {
    return this.app;
  }

  public getAuth(): admin.auth.Auth {
    return this.app.auth();
  }

  public getFirestore(): admin.firestore.Firestore {
    return this.app.firestore();
  }
}
