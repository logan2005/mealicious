
import { NextPage } from 'next';

const CookiePolicy: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p className="mb-4">Last Updated: August 5, 2025</p>

      <p className="mb-4">
        This Cookie Policy explains how Mealicious ("we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h2 className="text-2xl font-bold mb-2">What are cookies?</h2>
      <p className="mb-4">
        Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies help websites remember information about your visit, like your preferred language and other settings, which can make your next visit easier and the site more useful to you.
      </p>

      <h2 className="text-2xl font-bold mb-2">Why do we use cookies?</h2>
      <p className="mb-4">
        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our online properties. For example, we use cookies to remember the items in your shopping cart.
      </p>

      <h2 className="text-2xl font-bold mb-2">What types of cookies do we use?</h2>
      <ul className="list-disc list-inside ml-4 mb-4">
        <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas and shopping cart functionality.</li>
        <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality (like remembering your login details or product preferences) may become unavailable.</li>
        <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</li>
        <li><strong>Advertising (Targeting) Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases, selecting advertisements that are based on your interests.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">How can you control cookies?</h2>
      <p className="mb-4">
        You have the right to decide whether to accept or reject cookies. Most web browsers allow you to control your cookie settings. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.
      </p>

      <h2 className="text-2xl font-bold mb-2">Changes to This Cookie Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
      </p>

      <h2 className="text-2xl font-bold mb-2">Where can you get further information?</h2>
      <p className="mb-4">
        If you have any questions about our use of cookies or other technologies, please email us at info@mealicious.in.
      </p>
    </div>
  );
};

export default CookiePolicy;
