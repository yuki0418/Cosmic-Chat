import express from 'express';

class GameRoutes {
  public path = '/game';
  public router = express.Router();

  constructor() {
    this.router.get(this.path, this.getGame);
  }

  getGame = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).json({
      message: 'Hello Game'
    });
  }
}

export default GameRoutes;