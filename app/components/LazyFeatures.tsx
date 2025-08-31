'use client';

import { ArrowRight } from 'lucide-react';

interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface LazyFeaturesProps {
  features: Feature[];
  activeFeature: number;
  setActiveFeature: (index: number) => void;
}

export default function LazyFeatures({ features, activeFeature, setActiveFeature }: LazyFeaturesProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
          Why Choose viralonX?
        </h2>
        <p className="text-lg leading-8 text-gray-300">
          viralonX combines the latest AI technology with real-time data to help you create content that resonates.
        </p>
      </div>
      
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = index === activeFeature;
          
          return (
            <div
              key={feature.title}
              className={`group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                isActive ? 'ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-500/10 to-teal-500/10' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className={`flex items-center gap-4 mb-4`}>
                  <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                
                <div className="mt-6 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
