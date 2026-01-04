
import { NextPage } from 'next';

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Mealicious (the "Site").
      </p>

      <h2 className="text-2xl font-bold mb-2">1. PERSONAL INFORMATION WE COLLECT</h2>
      <p className="mb-4">
        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
      </p>
      <p className="mb-4">
        We collect Device Information using the following technologies:
        <ul className="list-disc list-inside ml-4">
          <li>"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier.</li>
          <li>"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
          <li>"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.</li>
        </ul>
      </p>
      <p className="mb-4">
        Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as "Order Information."
      </p>
      <p className="mb-4">
        When we talk about "Personal Information" in this Privacy Policy, we are talking both about Device Information and Order Information.
      </p>

      <h2 className="text-2xl font-bold mb-2">2. HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
      <p className="mb-4">
        We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
        <ul className="list-disc list-inside ml-4">
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud; and</li>
          <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
        </ul>
      </p>
      <p className="mb-4">
        We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
      </p>

      <h2 className="text-2xl font-bold mb-2">3. SHARING YOUR PERSONAL INFORMATION</h2>
      <p className="mb-4">
        We may share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store. We also use Google Analytics to help us understand how our customers use the Site.
      </p>
      <p className="mb-4">
        Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
      </p>

      <h2 className="text-2xl font-bold mb-2">4. YOUR RIGHTS</h2>
      <p className="mb-4">
        If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
      </p>
      <p className="mb-4">
        Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.
      </p>

      <h2 className="text-2xl font-bold mb-2">5. DATA RETENTION</h2>
      <p className="mb-4">
        When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
      </p>

      <h2 className="text-2xl font-bold mb-2">6. CHANGES</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
      </p>

      <h2 className="text-2xl font-bold mb-2">7. CONTACT US</h2>
      <p className="mb-4">
        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@mealicious.in or by mail using the details provided below:
      </p>
      <p className="mb-4">
        Mealicious<br />
        1477/5/630-E, near Sona College of Technology, Kamarajar Nagar, Subramania Nagar, Suramangalam Salem, Tamil Nadu 636004
      </p>
    </div>
  );
};

export default PrivacyPolicy;
