import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle, faBolt, faChartPie, faArrowRight, faStar,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faCheckCircle,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "Track Tasks Easily",
    desc: "Add, edit, and complete tasks with a clean and intuitive interface.",
  },
  {
    icon: faBolt,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    title: "Quick Actions",
    desc: "Mark all tasks complete or clear finished ones in a single click.",
  },
  {
    icon: faChartPie,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    title: "Live Statistics",
    desc: "See real-time counts of total, completed, pending, and overdue tasks.",
  },
];

const testimonials = [
  { name: "Sarah K.", role: "Product Manager", text: "TaskFlow completely changed how I manage my daily work. Simple and powerful." },
  { name: "James O.", role: "Software Engineer", text: "Clean UI, fast, and everything just works. Exactly what I needed." },
  { name: "Amina R.", role: "Freelancer", text: "I love how easy it is to track deadlines. The overdue alerts are a lifesaver." },
];

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

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Everything You Need</h2>
          <p className="text-gray-500 mt-2">Powerful features to keep you on top of your work.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon, color, bg, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${bg} mb-4`}>
                <FontAwesomeIcon icon={icon} className={`text-2xl ${color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What People Say</h2>
          <p className="text-gray-500 mt-2">Trusted by professionals around the world.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, text }) => (
            <div key={name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm mr-0.5" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">&ldquo;{text}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{name}</p>
                <p className="text-gray-400 text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-bold">Ready to Get Organized?</h2>
          <p className="text-indigo-200">Start managing your tasks today — no sign-up required.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition"
          >
            Open Dashboard <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
