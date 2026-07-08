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

export const BreadcrumbJsonLd = ({ items }: { items: { name: string, url: string }[] }) => {
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

export const ServiceJsonLd = ({ name, description, url }: { name: string, description: string, url: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": siteConfig.companyName
    },
    "url": url
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
