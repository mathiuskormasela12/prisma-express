// ========== Types

export interface IUser {
  id: number
  email: string
  firstName: string
  lastName: string | null
  photo: string
  createdAt: Date
  updatedAt?: Date
}

export interface IResponse<T> {
  status: number
  message: string
  data?: T | T[]
}
