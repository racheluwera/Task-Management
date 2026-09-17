"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt, faClock, faPaperPlane, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold">Contact Us</h1>
          <p className="text-indigo-200 text-lg">Have a question or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
              <p className="text-gray-500">Fill out the form and we'll get back to you as soon as possible.</p>
            </div>
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-500 text-sm">hello@taskflow.app</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-500 text-sm">Remote — Available Worldwide</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <FontAwesomeIcon icon={faClock} className="text-indigo-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Response Time</p>
                  <p className="text-gray-500 text-sm">Within 24 hours on business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <FontAwesomeIcon icon={faCheck} className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Message Sent!</h3>
                <p className="text-gray-500">Thanks for reaching out. We'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-indigo-600 text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
