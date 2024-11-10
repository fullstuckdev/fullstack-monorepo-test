import { Request, Response } from 'express';
import { Get } from '../../infrastructure/decorators/route.decorator';
import { FirebaseConfig } from '../../infrastructure/config/firebase.config';

export class HealthController {
  @Get('/')
  async check(req: Request, res: Response) {
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  }

  @Get('/detailed')
  async detailed(req: Request, res: Response) {
    try {
      const firebase = FirebaseConfig.getInstance();
      await firebase.getAuth().listUsers(1);

      res.json({
        success: true,
        status: 'healthy',
        services: {
          firebase: 'connected',
          api: 'running'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 'unhealthy',
        services: {
          firebase: 'disconnected',
          api: 'running'
        },
        timestamp: new Date().toISOString()
      });
    }
  }
} 