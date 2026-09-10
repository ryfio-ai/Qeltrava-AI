import React from 'react';
import { siteConfig } from '@/lib/site-config';

// 1. Core Corporate Organization & Knowledge Graph Schema
export const JsonLd = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://qeltrava.ai/#organization",
    "name": siteConfig.companyName,
    "legalName": siteConfig.legalName,
    "url": "https://qeltrava.ai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://qeltrava.ai/logo.png",
      "width": 512,
      "height": 512
    },
    "image": "https://qeltrava.ai/logo.png",
    "description": siteConfig.description,
    "foundingDate": "2026",
    "founders": [
      {
        "@type": "Person",
        "name": "Founding Engineering Team",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "PSG College of Technology"
        }
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support & sales",
      "email": "hello@qeltrava.ai",
      "availableLanguage": ["English", "Tamil", "Malayalam"]
    },
    "knowsAbout": [
      "Artificial Intelligence Engineering",
      "Manufacturing Intelligence",
      "BIS / ISI Product Compliance & Certification",
      "Indian Standards (IS) Gap Assessment",
      "Statistical Process Control (SPC)",
      "Quality Intelligence & Cp/Cpk Math",
      "Predictive Maintenance Telemetry",
      "No-Code AutoML Platforms",
      "Computer Vision Quality Inspection",
      "Industrial SaaS & Cloud DevOps"
    ],
    "sameAs": [
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.github
    ].filter(Boolean)
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://qeltrava.ai/#website",
    "url": "https://qeltrava.ai",
    "name": siteConfig.companyName,
    "description": siteConfig.description,
    "publisher": {
      "@id": "https://qeltrava.ai/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://qeltrava.ai/en?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

// 2. Breadcrumb JSON-LD
export const BreadcrumbJsonLd = ({ items }: { items: { name: string; url: string }[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// 3. Service JSON-LD (e.g. BIS/ISI Compliance, Manufacturing AI, Cloud DevOps)
export const ServiceJsonLd = ({
  name,
  description,
  url,
  category = "Engineering Services"
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "category": category,
    "provider": {
      "@type": "Organization",
      "@id": "https://qeltrava.ai/#organization",
      "name": siteConfig.companyName,
      "url": "https://qeltrava.ai"
    },
    "url": url,
    "areaServed": "Worldwide"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// 4. Software Application JSON-LD (e.g. Modliqer AutoML Platform)
export const SoftwareApplicationJsonLd = ({
  name,
  description,
  url,
  applicationCategory = "DeveloperApplication",
  operatingSystem = "Web"
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "author": {
      "@type": "Organization",
      "name": siteConfig.companyName,
      "url": "https://qeltrava.ai"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// 5. FAQ JSON-LD (AEO & AI Search Snippet Answers for SearchGPT, Perplexity, Gemini)
export const FaqJsonLd = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
