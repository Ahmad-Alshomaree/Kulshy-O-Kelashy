import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Privacy Policy</h1>
        <p className="text-palette-darkGreen/70">Last updated: May 4, 2023</p>
      </div>

      <div className="prose prose-green max-w-none text-palette-darkGreen/90">
        <p>
          At Kulshy O-Klashy, we respect your privacy and are committed to protecting your personal data. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or
          make a purchase.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on our website, express
          interest in obtaining information about us or our products, or otherwise contact us.
        </p>
        <p>The personal information we collect may include:</p>
        <ul>
          <li>Name, email address, postal address, phone number, and other contact information</li>
          <li>Billing information, such as credit card number and billing address</li>
          <li>Account credentials, such as usernames and passwords</li>
          <li>Order history and preferences</li>
          <li>Location information</li>
          <li>Information provided in customer service interactions</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Create and manage your account</li>
          <li>Send you order confirmations and updates</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website, products, and services</li>
          <li>Protect against fraud and unauthorized transactions</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>We may share your information with third parties in certain situations, including:</p>
        <ul>
          <li>With service providers who perform services on our behalf</li>
          <li>With shipping partners to deliver your orders</li>
          <li>With payment processors to process your payments</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights, privacy, safety, or property</li>
          <li>In connection with a business transaction, such as a merger or acquisition</li>
        </ul>

        <h2>4. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and hold certain
          information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of
          transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
        <ul>
          <li>The right to access the personal information we hold about you</li>
          <li>The right to request correction of inaccurate information</li>
          <li>The right to request deletion of your information</li>
          <li>The right to opt-out of marketing communications</li>
          <li>The right to data portability</li>
        </ul>

        <h2>7. Children's Privacy</h2>
        <p>
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@kulshyoklashy.com.</p>
      </div>

      <Separator className="my-8" />

      <div className="text-center">
        <p className="text-palette-darkGreen/70">
          By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to its
          terms.
        </p>
      </div>
    </div>
  )
}
