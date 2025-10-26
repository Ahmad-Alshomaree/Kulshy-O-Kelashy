import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-palette-cream/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/">
              <h1 className="text-3xl font-serif text-palette-darkGreen hover:opacity-80 transition-opacity">
                Kulshy O-Klashy
              </h1>
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-palette-darkGreen">Reset Password</h2>
            <p className="mt-2 text-palette-darkGreen/70">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-palette-darkGreen">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-palette-darkGreen hover:bg-palette-olive text-white py-6"
            >
              Send Reset Link
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-palette-darkGreen/70">
                Remember your password?{" "}
                <Link href="/login" className="text-palette-olive hover:text-palette-darkGreen font-medium">
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-palette-darkGreen/70">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-palette-olive hover:text-palette-darkGreen font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-palette-darkGreen text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">© 2023 Kulshy O-Klashy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
