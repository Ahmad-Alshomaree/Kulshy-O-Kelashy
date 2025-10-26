"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { ArrowLeft, Eye, EyeOff, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PrivacySecurityPage() {
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isToggling2FA, setIsToggling2FA] = useState(false)
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true)

  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login/customer")
    }
  }, [session, isPending, router])

  useEffect(() => {
    if (session?.user) {
      fetchPreferences()
    }
  }, [session])

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem("bearer_token")
      const res = await fetch("/api/settings/preferences", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setTwoFactorEnabled(data.twoFactorEnabled || false)
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error)
    } finally {
      setIsLoadingPreferences(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsChangingPassword(true)

    try {
      const token = localStorage.getItem("bearer_token")
      const res = await fetch("/api/settings/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || "Password changed successfully")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast.error(data.error || "Failed to change password")
      }
    } catch (error) {
      toast.error("An error occurred while changing password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleToggle2FA = async () => {
    setIsToggling2FA(true)

    try {
      const token = localStorage.getItem("bearer_token")
      const res = await fetch("/api/settings/two-factor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          enabled: !twoFactorEnabled,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setTwoFactorEnabled(data.twoFactorEnabled)
        toast.success(
          data.twoFactorEnabled ? "2FA enabled successfully" : "2FA disabled successfully"
        )
      } else {
        toast.error(data.error || "Failed to toggle 2FA")
      }
    } catch (error) {
      toast.error("An error occurred while toggling 2FA")
    } finally {
      setIsToggling2FA(false)
    }
  }

  const handleLogoutAll = async () => {
    setIsLoggingOutAll(true)

    try {
      const token = localStorage.getItem("bearer_token")
      const res = await fetch("/api/settings/logout-all", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || "Logged out from all devices")
        localStorage.removeItem("bearer_token")
        await refetch()
        router.push("/login/customer")
      } else {
        toast.error(data.error || "Failed to logout from all devices")
      }
    } catch (error) {
      toast.error("An error occurred while logging out")
    } finally {
      setIsLoggingOutAll(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true)

    try {
      const token = localStorage.getItem("bearer_token")
      const res = await fetch("/api/settings/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || "Account deleted successfully")
        localStorage.removeItem("bearer_token")
        await refetch()
        router.push("/")
      } else {
        toast.error(data.error || "Failed to delete account")
      }
    } catch (error) {
      toast.error("An error occurred while deleting account")
    } finally {
      setIsDeletingAccount(false)
      setIsDeleteDialogOpen(false)
    }
  }

  if (isPending || isLoadingPreferences) {
    return (
      <div className="min-h-screen bg-palette-cream/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-palette-darkGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-palette-darkGreen">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-palette-cream/30">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/settings"
          className="inline-flex items-center text-palette-olive hover:text-palette-darkGreen mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">
            Privacy and Security
          </h1>
          <p className="text-palette-darkGreen/70">Manage your security settings</p>
        </div>

        <div className="space-y-6">
          {/* Change Password */}
          <div className="bg-white rounded-lg p-6 border border-palette-taupe/20">
            <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pr-10"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5 text-palette-darkGreen/70" />
                    ) : (
                      <Eye className="h-5 w-5 text-palette-darkGreen/70" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5 text-palette-darkGreen/70" />
                    ) : (
                      <Eye className="h-5 w-5 text-palette-darkGreen/70" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                    required
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-palette-darkGreen/70" />
                    ) : (
                      <Eye className="h-5 w-5 text-palette-darkGreen/70" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-palette-darkGreen hover:bg-palette-olive"
                disabled={isChangingPassword}
              >
                {isChangingPassword ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-lg p-6 border border-palette-taupe/20">
            <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
              Two-Factor Authentication
            </h2>
            <p className="text-palette-darkGreen/70 mb-4">
              Add an extra layer of security to your account
            </p>
            <div className="flex items-center justify-between">
              <span className="text-palette-darkGreen">
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
              <Button
                onClick={handleToggle2FA}
                variant={twoFactorEnabled ? "destructive" : "default"}
                className={
                  twoFactorEnabled
                    ? ""
                    : "bg-palette-darkGreen hover:bg-palette-olive"
                }
                disabled={isToggling2FA}
              >
                {isToggling2FA
                  ? "Updating..."
                  : twoFactorEnabled
                    ? "Disable 2FA"
                    : "Enable 2FA"}
              </Button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg p-6 border border-palette-taupe/20">
            <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">
              Active Sessions
            </h2>
            <p className="text-palette-darkGreen/70 mb-4">
              You are currently signed in on this device
            </p>
            <Button
              onClick={handleLogoutAll}
              variant="outline"
              className="w-full border-palette-darkGreen text-palette-darkGreen hover:bg-palette-darkGreen hover:text-white"
              disabled={isLoggingOutAll}
            >
              {isLoggingOutAll ? "Logging Out..." : "Log Out from All Devices"}
            </Button>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-lg p-6 border border-red-200">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>
            <p className="text-palette-darkGreen/70 mb-4">
              Permanently delete your account and all associated data. This action cannot be
              undone.
            </p>
            <Button
              onClick={() => setIsDeleteDialogOpen(true)}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and
              remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeletingAccount}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
