
import { NextPage } from 'next';

const TermsOfService: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Mealicious. By accessing our website and using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. User Accounts</h2>
      <p className="mb-4">
        If you create an account on our website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
      </p>

      <h2 className="text-2xl font-bold mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        The content on our website, including text, graphics, logos, and images, is the property of Mealicious and is protected by copyright and other intellectual property laws. You may not use our content without our express written permission.
      </p>

      <h2 className="text-2xl font-bold mb-2">4. Products and Services</h2>
      <p className="mb-4">
        We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
      </p>

      <h2 className="text-2xl font-bold mb-2">5. Payment and Subscriptions</h2>
      <p className="mb-4">
        We accept various forms of payment, as specified on our website. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method and that you authorize us (or our third-party payment processor) to charge your payment method for the total amount of your order (including any applicable taxes and other charges).
      </p>

      <h2 className="text-2xl font-bold mb-2">6. Shipping and Returns</h2>
      <p className="mb-4">
        Our shipping and return policies are available on our website. Please review these policies prior to making a purchase.
      </p>

      <h2 className="text-2xl font-bold mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall Mealicious, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
      </p>

      <h2 className="text-2xl font-bold mb-2">8. Disclaimer of Warranties</h2>
      <p className="mb-4">
        Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
      </p>

      <h2 className="text-2xl font-bold mb-2">9. Dispute Resolution</h2>
      <p className="mb-4">
        Any dispute arising from these Terms will be resolved through binding arbitration in Salem, Tamil Nadu.
      </p>

      <h2 className="text-2xl font-bold mb-2">10. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
      </p>
    </div>
  );
};

export default TermsOfService;
