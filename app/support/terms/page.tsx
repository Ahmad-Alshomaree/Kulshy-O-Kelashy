import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Terms & Conditions</h1>
        <p className="text-palette-darkGreen/70">Last updated: May 4, 2023</p>
      </div>

      <div className="prose prose-green max-w-none text-palette-darkGreen/90">
        <p>
          Welcome to Kulshy O-Klashy. These Terms & Conditions govern your use of our website and services. By accessing
          or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you
          may not access the website.
        </p>

        <h2>1. Use of Our Services</h2>
        <p>
          By using our website, you confirm that you are at least 18 years of age or are accessing the site under the
          supervision of a parent or legal guardian. We grant you a non-transferable, non-exclusive right to use our
          platform for personal, non-commercial purposes, subject to these Terms.
        </p>

        <h2>2. Products & Services</h2>
        <p>
          All products and services displayed on our website are subject to availability. We reserve the right to
          discontinue any product or service at any time. Prices for our products are subject to change without notice.
          We reserve the right to modify or discontinue the Service without notice at any time.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features of our website, you may be required to register for an account. You agree to
          provide accurate, current, and complete information during the registration process. You are responsible for
          maintaining the confidentiality of your account and password and for restricting access to your computer, and
          you agree to accept responsibility for all activities that occur under your account.
        </p>

        <h2>4. User Content</h2>
        <p>
          Our website may allow you to post, link, store, share and otherwise make available certain information, text,
          graphics, videos, or other material. You are responsible for the content you post. By posting content, you
          grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content
          on and through our service.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property
          of Kulshy O-Klashy and its licensors. Our trademarks and trade dress may not be used in connection with any
          product or service without the prior written consent of Kulshy O-Klashy.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
          liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
          limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the
          Service, or notify us that you wish to delete your account.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          In no event shall Kulshy O-Klashy, nor its directors, employees, partners, agents, suppliers, or affiliates,
          be liable for any indirect, incidental, special, consequential or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or
          use of or inability to access or use the Service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without
          regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will
          not be considered a waiver of those rights.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to
          access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at legal@kulshyoklashy.com.</p>
      </div>

      <Separator className="my-8" />

      <div className="text-center">
        <p className="text-palette-darkGreen/70">
          By using our services, you acknowledge that you have read and understood these Terms & Conditions and agree to
          be bound by them.
        </p>
      </div>
    </div>
  )
}
