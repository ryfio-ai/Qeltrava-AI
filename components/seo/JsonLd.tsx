import React from 'react';
import { siteConfig } from '@/lib/site-config';

export const JsonLd = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.companyName,
    "url": "https://qeltrava.ai",
    "logo": "https://qeltrava.ai/logo.png",
    "description": siteConfig.description,
    "foundingDate": "2026",
    "founders": [
      {
        "@type": "Person",
        "name": "Founding Team",
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
      "contactType": "customer support",
      "email": "hello@qeltrava.ai"
    },
    "sameAs": [
      siteConfig.social.linkedin,
      siteConfig.social.instagram
    ].filter(Boolean)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
};
