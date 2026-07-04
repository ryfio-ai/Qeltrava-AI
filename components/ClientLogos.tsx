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
      website: "https://www.edriftelectric.com/",
      glowColor: "from-emerald-500/20 to-teal-500/20",
      accentBorder: "group-hover:border-emerald-500/40",
      pillClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      titleClass: "group-hover:text-emerald-400"
    },
    {
      name: "Thiranoli",
      logo: "/client/thiranoli logo.png",
      business: "EdTech & Technology Academy Platform",
      desc: "Building a scalable, interactive learning management system and content delivery network for technology education.",
      website: "https://www.thiranoli.com/",
      glowColor: "from-blue-500/20 to-cyan-500/20",
      accentBorder: "group-hover:border-blue-500/40",
      pillClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      titleClass: "group-hover:text-blue-400"
    },
    {
      name: "Tamizh Tech (TTRC)",
      logo: "/client/TTRCLOGO.webp",
      business: "Digital Media & Consumer Tech Platform",
      desc: "Deploying high-performance content management pipelines and data architecture for Tamil Nadu's leading tech media brand.",
      website: "https://www.tamizhtech.in/",
      glowColor: "from-indigo-500/20 to-purple-500/20",
      accentBorder: "group-hover:border-indigo-500/40",
      pillClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      titleClass: "group-hover:text-indigo-400"
    }
  ];

  return (
    <section className="py-32 bg-[#030712] border-t border-b border-white/[0.06] relative overflow-hidden">
      {/* Background grids and glowing orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/10 blur-[130px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4 block font-mono">
            Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Powering Innovative Digital Platforms
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We collaborate with scale-ups and technology leaders to engineer robust platforms that perform at scale.
            <span className="block mt-3 text-xs text-gray-500 font-medium italic">
              Selected partners — each engagement referenced with permission.
            </span>
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
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`group flex flex-col h-full bg-slate-900/40 backdrop-blur-md border border-white/[0.08] ${client.accentBorder} rounded-2xl p-8 transition-all duration-300 shadow-2xl overflow-hidden relative`}
              >
                {/* Glow backdrop on card hover */}
                <div className={`absolute -inset-px bg-gradient-to-r ${client.glowColor} rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`} />

                {/* Logo Area */}
                <div className="h-28 w-full flex items-center justify-center mb-6 bg-slate-950/40 border border-white/[0.05] rounded-xl relative overflow-hidden group-hover:bg-slate-950/70 transition-all duration-300">
                  {/* Dotted microgrid */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  
                  <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
                    <Image 
                      src={client.logo} 
                      alt={`${client.name} logo`} 
                      width={140} 
                      height={42} 
                      className="max-h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-grow flex flex-col">
                  <div className={`inline-flex self-start text-[10px] uppercase font-mono tracking-wider font-bold px-3 py-1.5 rounded-full border mb-4 ${client.pillClass}`}>
                    {client.business}
                  </div>
                  <h4 className={`text-xl font-bold text-white mb-3 transition-colors duration-300 flex items-center gap-2 ${client.titleClass}`}>
                    {client.name}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-medium">
                    {client.desc}
                  </p>
                </div>

                {/* Link Indicator */}
                <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                  <span>Visit Website</span>
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.05] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
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
