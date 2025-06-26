import React from 'react';
import { Brain, Trophy, Flame, Target, Star, Play, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn XP, unlock achievements, and level up as you learn new skills.',
    },
    {
      icon: Flame,
      title: 'Streak Tracking',
      description: 'Build consistent learning habits with our streak system and daily goals.',
    },
    {
      icon: Target,
      title: 'Personalized Goals',
      description: 'Set custom daily goals and track your progress with detailed analytics.',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations based on your learning patterns.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CS Student',
      content: 'LearnFlow transformed how I approach coding. The gamification makes studying actually fun!',
      avatar: 'SC',
    },
    {
      name: 'Marcus Johnson',
      role: 'Web Developer',
      content: 'The streak system keeps me motivated. I\'ve learned more in 3 months than I did all last year.',
      avatar: 'MJ',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      content: 'The daily challenges and achievement system make learning feel like playing a game.',
      avatar: 'ER',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
              <Brain className="text-white" size={48} />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Learning Into
            <span className="text-indigo-600 block">An Addictive Experience</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            LearnFlow uses dopamine-driven design to make skill acquisition engaging, 
            rewarding, and sustainable. Turn your education into a game you actually want to play.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2"
            >
              <Play size={20} />
              <span>Get Started Free</span>
            </button>
            <button className="text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors">
              Watch Demo
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>Join 50,000+ learners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why LearnFlow Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've engineered every interaction to trigger your brain's reward system, 
              making learning feel naturally engaging and addictive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-indigo-100 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <feature.icon className="text-indigo-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-indigo-200">Hours of Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-200">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-indigo-200">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Learners Worldwide
            </h2>
            <p className="text-lg text-gray-600">
              See how LearnFlow has transformed learning for thousands of students and professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of learners who have already discovered the power of dopamine-driven education.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Learning Today
          </button>
        </div>
      </div>
    </div>
  );
};