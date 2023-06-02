// ========== User Service
// import all modules
import { type Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { type IUser, type IResponse } from '../types'

namespace UserServiceModule {
  export class UserService {
    private readonly prismaClient: PrismaClient
    private readonly body: Request['body']
    private readonly params: Request['params']
    private readonly query: Request['query']

    constructor (req: Request) {
      this.body = req.body
      this.params = req.params
      this.query = req.query

      this.prismaClient = new PrismaClient()
    }

    public async createUser (): Promise<IResponse<IUser>> {
      try {
        const user = await this.prismaClient.user.findFirst({ where: { email: this.body.email } })

        if (user == null) {
          const result = await this.prismaClient.user.create({
            data: {
              email: this.body.email,
              firstName: this.body.firstName,
              lastName: this.body.lastName
            }
          })

          return {
            status: 201,
            message: 'User created',
            data: {
              id: Number(result.id),
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              photo: result.photo,
              createdAt: result.createdAt,
              updatedAt: result.updated
            }
          }
        }

        return {
          status: 400,
          message: 'User already exists'
        }
      } catch (err) {
        const error = err as { message: string }
        return {
          status: 500,
          message: error.message
        }
      }
    }

    public async getUsers (): Promise<IResponse<IUser>> {
      try {
        const users = await this.prismaClient.user.findMany()

        if (users.length > 0) {
          return {
            status: 200,
            message: 'Success get users',
            data: users
          }
        }

        return {
          status: 404,
          message: 'User not found'
        }
      } catch (err) {
        const error = err as { message: string }
        return {
          status: 500,
          message: error.message
        }
      }
    }

    public async getUser (): Promise<IResponse<IUser>> {
      try {
        const user = await this.prismaClient.user.findFirst({
          where: {
            id: Number(this.params.id)
          }
        })

        if (user !== null) {
          return {
            status: 200,
            message: 'Success get user with id ' + String(this.params.id),
            data: user
          }
        }

        return {
          status: 404,
          message: 'User not found'
        }
      } catch (err) {
        const error = err as { message: string }
        return {
          status: 500,
          message: error.message
        }
      }
    }

    public async updateUser (): Promise<IResponse<IUser>> {
      try {
        const user = await this.prismaClient.user.findFirst({
          where: {
            id: Number(this.params.id)
          }
        })

        if (user !== null) {
          try {
            await this.prismaClient.user.update({
              where: {
                id: Number(this.params.id)
              },
              data: {
                firstName: this.body.firstName,
                lastName: this.body.lastName,
                email: this.body.email
              }
            })

            return {
              status: 200,
              message: 'Success to update data'
            }
          } catch (err) {
            const error = err as { message: string }
            return {
              status: 500,
              message: error.message
            }
          }
        }

        return {
          status: 404,
          message: 'User not found'
        }
      } catch (err) {
        const error = err as { message: string }
        return {
          status: 500,
          message: error.message
        }
      }
    }

    public async deleteUser (): Promise<IResponse<IUser>> {
      try {
        const user = await this.prismaClient.user.findFirst({
          where: {
            id: Number(this.params.id)
          }
        })

        if (user !== null) {
          try {
            await this.prismaClient.user.delete({ where: { id: Number(this.params.id) } })

            return {
              status: 200,
              message: 'Success to delete data'
            }
          } catch (err) {
            const error = err as { message: string }
            return {
              status: 500,
              message: error.message
            }
          }
        }

        return {
          status: 404,
          message: 'User not found'
        }
      } catch (err) {
        const error = err as { message: string }
        return {
          status: 500,
          message: error.message
        }
      }
    }
  }
}

export default UserServiceModule
