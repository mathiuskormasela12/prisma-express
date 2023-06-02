// ========== User Router
// import all modules
import { Router } from 'express'
import userController from '../controllers/user-controller'
import { validateCreateUser } from '../middlewares/user-middleware'

namespace UserRouterModule {
  export class UserRouter {
    private readonly router: Router

    constructor () {
      this.router = Router()
      this.routes()
    }

    private routes (): void {
      this.router.post('/user', validateCreateUser, userController.createUser)
      this.router.get('/users', validateCreateUser, userController.getUsers)
      this.router.get('/user/:id', validateCreateUser, userController.getUser)
      this.router.put('/user/:id', validateCreateUser, userController.updateUser)
      this.router.delete('/user/:id', validateCreateUser, userController.deleteUser)
    }

    public get route (): Router {
      return this.router
    }
  }
}

export default new UserRouterModule.UserRouter()
