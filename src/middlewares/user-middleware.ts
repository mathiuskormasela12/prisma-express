// ========= User Middleware
// import all modules
import { type NextFunction, type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'

export const validateCreateUser = [
  body('email', 'Email is required').notEmpty(),
  body('email', 'Email is invalid').isEmail(),

  body('firstName', 'First name is required').notEmpty(),

  body('lastName', 'Last name should be a string').optional().isString(),

  (req: Request, res: Response, next: NextFunction): boolean => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        message: errors.array()
      })

      return false
    }

    next()
    return true
  }
]
