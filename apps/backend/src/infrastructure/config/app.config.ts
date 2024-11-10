import dotenv from "dotenv";

dotenv.config();

export class AppConfig {
  private static instance: AppConfig;

  private constructor() {
    this.validateEnv();
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  private validateEnv(): void {
    const requiredEnvVars = [
      "FB_PROJECT_ID",
      "FB_PRIVATE_KEY",
      "FB_CLIENT_EMAIL",
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(", ")}`
      );
    }
  }

  get port(): number {
    return parseInt(process.env.PROJECT || "3000", 10);
  }

  get firebaseConfig() {
    return {
      projectId: process.env.FB_PROJECT_ID!,
      privateKey: process.env.FB_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      clientEmail: process.env.FB_CLIENT_EMAIL!,
    };
  }
}
