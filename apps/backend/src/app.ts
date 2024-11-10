import { ExpressServer } from "./infrastructure/http/express-server";
import { FirebaseConfig } from "./infrastructure/config/firebase.config";
import dotenv from "dotenv";

dotenv.config();

const server = new ExpressServer();
export const app = server.getApp();

if (require.main === module) {
  async function startApp() {
    try {
      const firebase = FirebaseConfig.getInstance();
      const auth = firebase.getAuth();
      await auth.listUsers(1);

      console.log("Firebase connection verified");

      const port = parseInt(process.env.PROJECT || "3000", 10);
      server.start(port);
    } catch (error) {
      console.error("Failed to start application:", error);
      process.exit(1);
    }
  }

  startApp();
}
