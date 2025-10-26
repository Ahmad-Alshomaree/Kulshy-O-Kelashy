/**
 * Base model that all domain models will extend
 */
export abstract class BaseModel {
  id: number
  createdAt: Date
  updatedAt: Date

  constructor(id: number, data?: Partial<BaseModel>) {
    this.id = id
    this.createdAt = data?.createdAt || new Date()
    this.updatedAt = data?.updatedAt || new Date()
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
