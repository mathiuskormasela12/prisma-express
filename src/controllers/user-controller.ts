// ========== User Controller
// import all modules
import { type Request, type Response } from 'express'
import UserServiceModule from '../services/user-service'

namespace UserControllerModule {
  export class UserController {
    public async createUser (req: Request, res: Response): Promise<Response> {
      const userService = new UserServiceModule.UserService(req)
      const result = await userService.createUser()
      return res.status(result.status).json(result)
    }

    public async getUsers (req: Request, res: Response): Promise<Response> {
      const userService = new UserServiceModule.UserService(req)
      const result = await userService.getUsers()
      return res.status(result.status).json(result)
    }

    public async getUser (req: Request, res: Response): Promise<Response> {
      const userService = new UserServiceModule.UserService(req)
      const result = await userService.getUser()
      return res.status(result.status).json(result)
    }

    public async updateUser (req: Request, res: Response): Promise<Response> {
      const userService = new UserServiceModule.UserService(req)
      const result = await userService.updateUser()
      return res.status(result.status).json(result)
    }

    public async deleteUser (req: Request, res: Response): Promise<Response> {
      const userService = new UserServiceModule.UserService(req)
      const result = await userService.deleteUser()
      return res.status(result.status).json(result)
    }
  }
}

export default new UserControllerModule.UserController()
