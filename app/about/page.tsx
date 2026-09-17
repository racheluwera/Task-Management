import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faUsers, faShieldAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const values = [
  { icon: faRocket, color: "text-indigo-500", bg: "bg-indigo-50", title: "Built for Speed", desc: "Designed to be fast and responsive so you can focus on what matters." },
  { icon: faUsers, color: "text-green-500", bg: "bg-green-50", title: "User First", desc: "Every feature is built with the user experience at the center." },
  { icon: faShieldAlt, color: "text-blue-500", bg: "bg-blue-50", title: "Privacy Focused", desc: "Your tasks stay on your device. No accounts, no tracking." },
  { icon: faLightbulb, color: "text-yellow-500", bg: "bg-yellow-50", title: "Always Improving", desc: "We continuously refine and add features based on real feedback." },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold">About TaskFlow</h1>
          <p className="text-indigo-200 text-lg">
            We believe productivity should be simple, not complicated. TaskFlow was built to give you clarity and control over your work.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed">
            TaskFlow was created to solve a simple problem — keeping track of what needs to get done without the overhead of complex project management tools. Whether you're a student, freelancer, or professional, TaskFlow gives you a clean space to manage your day.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map(({ icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${bg} mb-4`}>
                  <FontAwesomeIcon icon={icon} className={`text-xl ${color}`} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Start Managing Your Tasks</h2>
          <p className="text-gray-500">Jump straight into the dashboard and take control of your day.</p>
          <Link
            href="/dashboard"
            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
