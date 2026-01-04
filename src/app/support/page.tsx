
import { NextPage } from 'next';

const Support: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Support Center</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="mb-4">Have a question? We're here to help. Fill out the form below and we'll get back to you as soon as possible.</p>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea id="message" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={5}></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p>For immediate answers to common questions, please visit our <a href="/faq" className="text-blue-500 hover:underline">FAQ page</a>.</p>
      </div>
    </div>
  );
};

export default Support;
