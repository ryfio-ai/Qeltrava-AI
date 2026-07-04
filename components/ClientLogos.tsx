"use client";

import React from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';

export const ClientLogos = () => {
  const clients = [
    {
      name: "eDrift",
      logo: "/client/edriftlogo.webp",
      business: "Smart Mobility",
      desc: "Engineering modern software layers for fleet tracking, charging grid optimization, and telemetry.",
      website: "https://www.edriftelectric.com/"
    },
    {
      name: "Thiranoli",
      logo: "/client/thiranoli logo.png",
      business: "EdTech Platform",
      desc: "Building a scalable, interactive learning management system and content delivery network.",
      website: "https://www.thiranoli.com/"
    },
    {
      name: "Tamizh Tech (TTRC)",
      logo: "/client/TTRCLOGO.webp",
      business: "Digital Media",
      desc: "Deploying high-performance content management pipelines and data architecture.",
      website: "https://www.tamizhtech.in/"
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3 block font-mono">
            Client Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Powering Innovative Digital Platforms
          </h2>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            We collaborate with scale-ups and technology leaders to engineer robust platforms that perform at scale.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clients.map((client, idx) => (
            <FadeIn key={client.name} delay={idx * 0.1}>
              <motion.a 
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex flex-col h-full bg-white border border-gray-200/80 rounded-2xl p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300 relative"
              >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-start mb-6">
                  <Image 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    width={130} 
                    height={40} 
                    className="max-h-12 w-auto object-contain filter brightness-95 opacity-90 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold font-mono tracking-wider text-gray-400 mb-2 block">
                      {client.business}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {client.name}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {client.desc}
                    </p>
                  </div>
                </div>

                {/* Link Indicator */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <span>Visit Website</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
