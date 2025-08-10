import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const res = await axios.post("http://localhost:3000/api/shorten", { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Please enter a valid URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full py-6  flex justify-center">
        <h1 className="text-5xl font-bold text-blue-400">ShortX</h1>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-4">
        <h2 className="text-5xl font-extrabold text-blue-400">Shorten Your Links in Seconds</h2>
        <p className="mt-4 max-w-2xl text-gray-300">
          Welcome to <span className="text-blue-400 font-semibold">ShortX</span>, your modern URL shortener.
          Paste your long link below, and we’ll make it short, simple, and shareable.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Enter your long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-3 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Shorten
          </button>
        </form>

        {/* Error / Result */}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {shortUrl && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400">Your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline text-lg font-semibold"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="mt-20 px-6 max-w-3xl text-center">
        <h3 className="text-2xl font-bold text-blue-400">Why Choose ShortX?</h3>
        <p className="mt-4 text-gray-300">
          ShortX is a fast, reliable, and secure link shortener designed to make your online experience smoother.
          Whether you’re sharing links on social media, emails, or anywhere else, ShortX helps keep them clean
          and professional.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-lg font-semibold text-blue-300">⚡ Fast</h4>
            <p className="mt-2 text-gray-400">Generate short links instantly with our optimized servers.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-lg font-semibold text-blue-300">🔒 Secure</h4>
            <p className="mt-2 text-gray-400">Your links are protected and only accessible by you.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-lg font-semibold text-blue-300">📈 Trackable</h4>
            <p className="mt-2 text-gray-400">Easily track clicks and engagement for your shortened links.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 border-t border-gray-700 text-gray-400">
        © {new Date().getFullYear()} ShortX. All rights reserved.
      </footer>
    </div>
  );
}
