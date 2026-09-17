import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-indigo-500 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Productivity Redefined
          </span>
          <h1 className="text-5xl font-extrabold leading-tight">
            Manage Your Tasks <br /> Like a Pro
          </h1>
          <p className="text-lg text-indigo-200">
            Stay organized, meet deadlines, and boost your productivity with TaskFlow — your all-in-one task management dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Go to Dashboard <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-indigo-300 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
