// ========== App
// import all modules
import express, { type Application } from 'express'
import cors, { type CorsOptions } from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'
import util from 'util'
import config from '../config'
import userRouter from '../router/user-router'

namespace AppModule {
  export class App {
    private readonly app: Application

    constructor () {
      this.app = express()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      // Setup json & url encoded
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: false }))

      // setup helmet & compression
      this.app.use(helmet())
      this.app.use(compression())

      if (config.env === 'development') this.app.use(require('morgan')('dev'))

      // Setup static files
      this.app.use('/public', express.static(path.join(__dirname, '../../public')))

      // Setup cors
      const corsOption: CorsOptions = {
        origin (origin, callback): void {
          if ((typeof origin === 'undefined') || (typeof origin === 'string' && config.whitelist.includes(origin))) {
            callback(null, true)
          } else {
            callback(new Error('Blocked by cors'))
          }
        }
      }
      this.app.use(cors(corsOption))
    }

    private routes (): void {
      this.app.use('/api/v1', userRouter.route)
    }

    public listen (): void {
      this.app.listen(config.port, () => {
        console.log(util.format('The RESTful API is being run at %s', config.port))
      })
    }
  }
}

export default AppModule
