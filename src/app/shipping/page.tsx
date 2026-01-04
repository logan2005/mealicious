
import { NextPage } from 'next';

const ShippingReturns: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shipping & Returns</h1>

      <h2 className="text-2xl font-bold mb-2">Shipping Policy</h2>
      <h3 className="text-xl font-bold mb-2">Order Processing:</h3>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Processing Time: We process orders within 1-2 business days (Monday-Friday, excluding holidays).</li>
        <li>Order Confirmation: You will receive an email confirmation once your order has been placed. You will receive a second email with tracking information once your order has shipped.</li>
      </ul>

      <h3 className="text-xl font-bold mb-2">Shipping Rates & Delivery Estimates:</h3>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Shipping charges for your order will be calculated and displayed at checkout.</li>
        <li>Standard Shipping: Estimated delivery within 5-7 business days.</li>
        <li>Delivery delays can occasionally occur.</li>
      </ul>

      <h3 className="text-xl font-bold mb-2">How do I check the status of my order?</h3>
      <p className="mb-4">
        When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
      </p>
      <p className="mb-4">
        If you haven’t received your order within 7 days of receiving your shipping confirmation email, please contact us at info@mealicious.in with your name and order number, and we will look into it for you.
      </p>

      <h2 className="text-2xl font-bold mb-2">Returns & Exchanges Policy</h2>
      <p className="mb-4">
        We want you to be completely satisfied with your purchase. If for any reason you are not, we will gladly accept returns of unused, unwashed, and undamaged or defective merchandise for a full refund or exchange within 14 days of the original purchase.
      </p>

      <h3 className="text-xl font-bold mb-2">Return & Exchange Process:</h3>
      <ol className="list-decimal list-inside ml-4 mb-4">
        <li>To initiate a return or exchange, please contact us at info@mealicious.in to request a return authorization.</li>
        <li>Pack the item(s) securely in the original product packaging, if possible. Please include all paperwork, parts, and accessories. All products must be returned in good condition to ensure full credit.</li>
        <li>For your protection, we recommend that you use a trackable shipping service. We are not responsible for items lost in transit.</li>
      </ol>

      <h3 className="text-xl font-bold mb-2">Refunds:</h3>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li>Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</li>
        <li>If you are approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 10 business days.</li>
        <li>Please note that shipping and handling charges are not refundable.</li>
      </ul>

      <h3 className="text-xl font-bold mb-2">Damaged or Defective Items:</h3>
      <p className="mb-4">
        If you receive a damaged or defective item, please contact us immediately at info@mealicious.in with your order number and a photo of the item’s condition. We address these on a case-by-case basis but will do our best to work towards a satisfactory solution.
      </p>
    </div>
  );
};

export default ShippingReturns;
