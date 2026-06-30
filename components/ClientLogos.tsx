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
      business: "Electric Mobility & Smart EV Solutions",
      desc: "Engineering modern software layers for electric vehicle fleet tracking, charging grid optimization, and smart IoT telemetry.",
      website: "https://edriftelectric.com/",
      glowColor: "from-emerald-500/10 to-teal-500/10",
      accentBorder: "group-hover:border-emerald-500/30"
    },
    {
      name: "Thiranoli",
      logo: "/client/thiranoli logo.png",
      business: "EdTech & Technology Academy Platform",
      desc: "Building a scalable, interactive learning management system and content delivery network for technology education.",
      website: "https://www.thiranoli.com/",
      glowColor: "from-blue-500/10 to-cyan-500/10",
      accentBorder: "group-hover:border-blue-500/30"
    },
    {
      name: "Tamizh Tech (TTRC)",
      logo: "/client/TTRCLOGO.webp",
      business: "Digital Media & Consumer Tech Platform",
      desc: "Deploying high-performance content management pipelines and data architecture for Tamil Nadu's leading tech media brand.",
      website: "https://www.tamizhtech.in/",
      glowColor: "from-indigo-500/10 to-purple-500/10",
      accentBorder: "group-hover:border-indigo-500/30"
    }
  ];

  return (
    <section className="py-28 bg-[#0B0F19] border-b border-white/[0.05] relative overflow-hidden">
      {/* Background grids and glowing orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
            Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Powering Innovative Digital Platforms
          </h2>
          <p className="mt-4 text-base text-gray-400 leading-relaxed">
            We collaborate with startups, EdTech networks, and EV technology leaders to engineer robust platforms that scale with their business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clients.map((client, idx) => (
            <FadeIn key={client.name} delay={idx * 0.15}>
              <motion.a 
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group flex flex-col h-full bg-white/[0.02] backdrop-blur-md border border-white/[0.08] ${client.accentBorder} rounded-2xl p-8 transition-colors duration-500 shadow-xl overflow-hidden relative`}
              >
                {/* Glow backdrop on card hover */}
                <div className={`absolute -inset-px bg-gradient-to-r ${client.glowColor} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10`} />

                {/* Logo Area */}
                <div className="h-20 w-full flex items-center justify-start mb-8 bg-white/[0.02] border border-white/[0.04] rounded-xl px-6 py-4 group-hover:bg-white/[0.04] group-hover:border-white/[0.08] transition-all duration-300">
                  <div className="relative w-full h-12 flex items-center justify-start">
                    <Image 
                      src={client.logo} 
                      alt={`${client.name} logo`} 
                      width={160} 
                      height={48} 
                      className="max-h-10 w-auto object-contain filter brightness-95 opacity-80 group-hover:brightness-110 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <div className="inline-block text-[10px] uppercase font-mono tracking-wider text-[var(--color-accent)] font-bold px-2.5 py-1 bg-[var(--color-accent)]/10 rounded-full border border-[var(--color-accent)]/20 mb-3">
                    {client.business}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2">
                    {client.name}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {client.desc}
                  </p>
                </div>

                {/* Link Indicator */}
                <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                  <span>Visit Website</span>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.05] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                    <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-sm">↗</span>
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
