import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-xl">
              <FontAwesomeIcon icon={faTasks} className="text-indigo-400" />
              <span>TaskFlow</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A professional task management solution to help you stay organized, focused, and productive every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-indigo-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex items-center space-x-2 text-sm mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400" />
              <span>hello@taskflow.app</span>
            </div>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-indigo-400 transition" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
