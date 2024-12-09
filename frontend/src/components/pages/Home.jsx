// frontend/src/components/pages/Home.jsx
import React from 'react'
import { UserCircle, Video, Brain, FileText } from 'lucide-react'

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold text-gray-800">
          AI-Powered English Communication Assessment
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Enhance your communication skills with advanced AI feedback, tailored for Indian professionals
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          Start Assessment
        </button>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Video className="w-8 h-8 text-blue-600" />,
            title: "Video Analysis",
            description: "Record responses to prompts with real-time feedback"
          },
          {
            icon: <Brain className="w-8 h-8 text-blue-600" />,
            title: "AI Assessment",
            description: "Advanced analysis of grammar, pronunciation & fluency"
          },
          {
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            title: "Detailed Reports",
            description: "Get comprehensive feedback and improvement plans"
          },
          {
            icon: <UserCircle className="w-8 h-8 text-blue-600" />,
            title: "Indian Context",
            description: "Specialized for Indian regional accents"
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex flex-col items-center text-center space-y-4">
              {feature.icon}
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Statistics */}
      <section className="bg-gray-50 py-12 rounded-xl">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "70%+", label: "Accuracy for Indian Accents" },
            { value: "4.8/5", label: "User Satisfaction" },
            { value: "1000+", label: "Daily Assessments" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-50 py-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Communication?</h2>
        <p className="text-gray-600 mb-6">Start your assessment journey today</p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            Learn More
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home