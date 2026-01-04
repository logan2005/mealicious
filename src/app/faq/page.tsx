
import { NextPage } from 'next';

const FAQ: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>

      <h2 className="text-2xl font-bold mb-2">Ordering & Payment</h2>
      <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
      <p className="mb-4">
        We accept a variety of payment methods, including major credit and debit cards (Visa, Mastercard, American Express), PayPal, and other secure payment options. All accepted payment methods will be displayed at checkout.
      </p>

      <h3 className="text-xl font-bold mb-2">Is my personal information secure?</h3>
      <p className="mb-4">
        Yes, we take your privacy and security very seriously. We use industry-standard encryption to protect your personal details and payment information.
      </p>

      <h3 className="text-xl font-bold mb-2">Can I cancel or change my order?</h3>
      <p className="mb-4">
        We process orders quickly, but we'll do our best to accommodate any changes. If you need to cancel or modify your order, please contact us as soon as possible. Please include your order number and the desired changes in your request.
      </p>

      <h2 className="text-2xl font-bold mb-2">Shipping & Delivery</h2>
      <h3 className="text-xl font-bold mb-2">How can I track my order?</h3>
      <p className="mb-4">
        Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on the carrier's website.
      </p>

      <h3 className="text-xl font-bold mb-2">How long will it take for my order to arrive?</h3>
      <p className="mb-4">
        Shipping times vary depending on your location and the shipping method you select at checkout. Estimated delivery times will be provided when you place your order.
      </p>

      <h3 className="text-xl font-bold mb-2">What should I do if I haven't received my order?</h3>
      <p className="mb-4">
        If your order has not arrived within the estimated delivery time, please first check the tracking information provided in your shipping confirmation email. If you still need assistance, please contact our customer support team with your order number.
      </p>

      <h2 className="text-2xl font-bold mb-2">Returns & Exchanges</h2>
      <h3 className="text-xl font-bold mb-2">What is your return policy?</h3>
      <p className="mb-4">
        We want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within 14 days of receipt. Items must be in their original condition. Please visit our Shipping & Returns page for detailed instructions.
      </p>

      <h3 className="text-xl font-bold mb-2">What if my order arrives damaged?</h3>
      <p className="mb-4">
        We apologize for the inconvenience. If your order arrives damaged, please contact us immediately with your order number and a photo of the damaged item. We will be happy to arrange for a replacement or a refund.
      </p>

      <h2 className="text-2xl font-bold mb-2">Account & Support</h2>
      <h3 className="text-xl font-bold mb-2">How do I create an account?</h3>
      <p className="mb-4">
        You can create an account by clicking on the "Sign Up" or "Create Account" link on our website. You will be asked to provide your name, email address, and a password.
      </p>

      <h3 className="text-xl font-bold mb-2">How do I contact customer support?</h3>
      <p className="mb-4">
        You can reach our customer support team through the contact form on our website, by email at info@mealicious.in, or by phone at +91 99999 88888.
      </p>
    </div>
  );
};

export default FAQ;
