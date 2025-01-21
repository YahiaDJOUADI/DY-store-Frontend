import React from "react";
import { FaBook, FaLightbulb, FaGamepad, FaUsers, FaTrophy, FaStar } from "react-icons/fa";

const GuidePage = () => {
  return (
    <div className="min-h-screen bg-[#0b3c5d] text-[#f2f2f2] flex flex-col lg:flex-row">
      {/* Side Navigation */}
      <aside className="w-full lg:w-64 bg-[#1d2731] p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-8 text-[#ffcb05]">Guides</h2>
        <nav>
          <ul className="space-y-4">
            {[
              { name: "Getting Started", link: "#" },
              { name: "Advanced Strategies", link: "#" },
              { name: "Community Tips", link: "#" },
              { name: "Game Walkthroughs", link: "#" },
              { name: "Multiplayer Tactics", link: "#" },
              { name: "Secret Discoveries", link: "#" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="block w-full text-left text-lg text-gray-300 hover:text-[#ffcb05] hover:bg-[#235789] p-3 rounded-lg transition-all duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        {/* Hero Section */}
        <section className="mb-16 lg:mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-[#ffcb05]">
            Guides & Tutorials
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl">
            Master your favorite games with expert tips, tricks, and strategies. Whether you're a beginner or a pro, we've got you covered.
          </p>
        </section>

        {/* Featured Guides */}
        <section>
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#ffcb05]">
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <FaGamepad className="text-5xl mb-4 text-[#ffcb05]" />,
                title: "Getting Started",
                description:
                  "Learn the basics of your favorite games and get started on the right foot.",
                link: "#",
              },
              {
                icon: <FaLightbulb className="text-5xl mb-4 text-[#ffcb05]" />,
                title: "Advanced Strategies",
                description:
                  "Take your skills to the next level with advanced techniques and strategies.",
                link: "#",
              },
              {
                icon: <FaUsers className="text-5xl mb-4 text-[#ffcb05]" />,
                title: "Community Tips",
                description:
                  "Discover tips and tricks shared by the gaming community.",
                link: "#",
              },
              {
                icon: <FaBook className="text-5xl mb-4 text-[#ffcb05]" />,
                title: "Game Walkthroughs",
                description:
                  "Follow step-by-step walkthroughs to complete your favorite games.",
                link: "#",
              },
              {
                icon: <FaTrophy className="text-5xl mb-4 text-[#ffcb05]" />,
                title: "Multiplayer Tactics",
                description:
                  "Dominate multiplayer games with proven tactics and teamwork.",
                link: "#",
              },
              {
                icon: <FaStar className="text-5xl mb-4 text-[#ffcb05]" />,
                title: "Secret Discoveries",
                description:
                  "Unlock hidden secrets, easter eggs, and rare items in games.",
                link: "#",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#235789] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full transform hover:-translate-y-2 hover:border-[#ffcb05] border-2 border-transparent"
              >
                {/* Icon */}
                <div className="flex justify-center">{item.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-[#f2f2f2] text-center">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-300 mb-6 text-center flex-1">
                  {item.description}
                </p>

                {/* Button */}
                <div className="text-center mt-auto">
                  <a
                    href={item.link}
                    className="bg-[#ffcb05] text-[#0b3c5d] py-2 px-6 rounded-lg font-semibold hover:bg-[#f2f2f2] hover:text-[#1d2731] transition-all duration-300 inline-block"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GuidePage;