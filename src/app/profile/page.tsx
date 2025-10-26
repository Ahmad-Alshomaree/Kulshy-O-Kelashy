import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { HomeHeader } from "@/components/home-header"
import { HomeFooter } from "@/components/home-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col min-h-screen bg-palette-cream/50">
        <HomeHeader />

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-palette-darkGreen mb-8">Your Profile</h1>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-palette-cream rounded-full flex items-center justify-center mb-4">
                      <span className="text-4xl text-palette-darkGreen font-semibold">JD</span>
                    </div>
                    <h2 className="text-xl font-semibold text-palette-darkGreen">John Doe</h2>
                    <p className="text-gray-600">Member since May 2023</p>
                    <Button className="mt-4 w-full bg-palette-darkGreen hover:bg-palette-darkGreen/90">
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Account Navigation</h2>
                  <nav className="space-y-2">
                    <a
                      href="/profile"
                      className="block px-4 py-2 bg-palette-cream text-palette-darkGreen rounded-md font-medium"
                    >
                      Profile
                    </a>
                    <a
                      href="/account/personal-info"
                      className="block px-4 py-2 hover:bg-palette-cream/50 text-gray-700 rounded-md"
                    >
                      Personal Information
                    </a>
                    <a
                      href="/account/addresses"
                      className="block px-4 py-2 hover:bg-palette-cream/50 text-gray-700 rounded-md"
                    >
                      Addresses
                    </a>
                    <a
                      href="/account/payment"
                      className="block px-4 py-2 hover:bg-palette-cream/50 text-gray-700 rounded-md"
                    >
                      Payment Methods
                    </a>
                    <a
                      href="/account/orders"
                      className="block px-4 py-2 hover:bg-palette-cream/50 text-gray-700 rounded-md"
                    >
                      Order History
                    </a>
                    <a href="/wishlist" className="block px-4 py-2 hover:bg-palette-cream/50 text-gray-700 rounded-md">
                      Wishlist
                    </a>
                    <a
                      href="/account/notifications"
                      className="block px-4 py-2 hover:bg-palette-cream/50 text-gray-700 rounded-md"
                    >
                      Notification Settings
                    </a>
                  </nav>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Profile Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input id="firstName" type="text" defaultValue="John" className="w-full" />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input id="lastName" type="text" defaultValue="Doe" className="w-full" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" className="w-full" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input id="phone" type="tel" defaultValue="(555) 123-4567" className="w-full" />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        defaultValue="I'm passionate about sustainable living and eco-friendly products."
                        className="w-full min-h-[100px]"
                      />
                    </div>

                    <Button className="bg-palette-darkGreen hover:bg-palette-darkGreen/90">Save Changes</Button>
                  </form>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Password</h2>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <Input id="currentPassword" type="password" className="w-full" />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <Input id="newPassword" type="password" className="w-full" />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <Input id="confirmPassword" type="password" className="w-full" />
                    </div>

                    <Button className="bg-palette-darkGreen hover:bg-palette-darkGreen/90">Update Password</Button>
                  </form>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-palette-darkGreen mb-4">Preferences</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-palette-darkGreen mr-2" defaultChecked />
                        <span className="text-gray-700">Receive promotional emails</span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-palette-darkGreen mr-2" defaultChecked />
                        <span className="text-gray-700">Receive order updates via email</span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-palette-darkGreen mr-2" />
                        <span className="text-gray-700">Receive SMS notifications</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language Preference</label>
                      <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-palette-darkGreen focus:ring focus:ring-palette-darkGreen focus:ring-opacity-50">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <Button className="bg-palette-darkGreen hover:bg-palette-darkGreen/90">Save Preferences</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <HomeFooter />
      </div>
    </PageTransitionWrapper>
  )
}
