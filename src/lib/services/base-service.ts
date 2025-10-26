/**
 * Base service that all services will extend
 */
export abstract class BaseService<T> {
  protected abstract storageKey: string

  protected getFromStorage(): T[] {
    if (typeof window === "undefined") return []

    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error retrieving ${this.storageKey} from localStorage:`, error)
      return []
    }
  }

  protected saveToStorage(data: T[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error(`Error saving ${this.storageKey} to localStorage:`, error)
    }
  }
}
