import type { User } from "@/lib/models/user.model"

export class UserService {
  private static instance: UserService
  private readonly STORAGE_KEY = "users"
  private readonly CURRENT_USER_KEY = "currentUser"

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  public getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    const userJson = localStorage.getItem(this.CURRENT_USER_KEY)
    if (!userJson) return null

    try {
      return JSON.parse(userJson) as User
    } catch (error) {
      console.error("Error parsing current user:", error)
      return null
    }
  }

  public getUsers(): User[] {
    if (typeof window === "undefined") return []

    const usersJson = localStorage.getItem(this.STORAGE_KEY)
    if (!usersJson) return []

    try {
      return JSON.parse(usersJson) as User[]
    } catch (error) {
      console.error("Error parsing users:", error)
      return []
    }
  }

  public getUserByEmail(email: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.email === email) || null
  }

  public login(email: string, password: string): User {
    // For demo purposes, we're using a simplified login
    // In a real app, we would hash the password and compare it securely

    // Check if we have any users, if not create a default one for testing
    const users = this.getUsers()
    if (users.length === 0) {
      this.register("test@example.com", "Test", "User", "password")
    }

    const user = this.getUserByEmail(email)

    // For demo purposes, accept any password for existing email
    // In a real app, we would verify the password
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user))
      return user
    }

    // If we reach here, login failed
    throw new Error("Invalid email or password")
  }

  public register(email: string, firstName: string, lastName: string, password: string): User {
    const existingUser = this.getUserByEmail(email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      // In a real app, we would hash the password
      // We're not storing the password for this demo
    }

    const users = this.getUsers()
    users.push(newUser)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users))
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser))

    return newUser
  }

  public logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY)
  }
}
