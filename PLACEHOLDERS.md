# Qeltrava AI - Client Handoff Placeholders

The following content slots require real client data before production launch.
To maintain the integrity of the enterprise brand, **do not invent fake data**.

## Testimonials (`{{TESTIMONIAL_PLACEHOLDER}}`)
1. **Home Page**: Provide a quote from a CTO or VP of Engineering regarding an AI Automation or SaaS Launch engagement.
2. **Case Studies Hub**: Provide quotes for each individual case study once uploaded to the CMS.

## Client Logos (`{{CLIENT_LOGO_PLACEHOLDER}}`)
1. **Home Page Trust Bar**: Needs 6 high-resolution, monochrome SVG logos of past or current enterprise clients.
2. **About Page**: Partner logos (e.g. AWS Advanced Tier, Microsoft Gold, etc.).

## Certifications & Compliance (`{{CERTIFICATION_PLACEHOLDER}}`)
1. **Footer**: ISO 27001, SOC 2 Type II, HIPAA (if applicable).
2. **Cybersecurity Service Page**: Relevant security certifications or audit badges.

## Metrics (`{{METRIC_PLACEHOLDER}}`)
1. **Home Page Metrics Band**: Needs 4 real statistics (e.g., "40% reduction in cloud spend", "99.99% uptime achieved", "6-week average deployment cycle").

## Environment Variables
Ensure the following variables are configured in the Vercel production environment:
- `CRM_WEBHOOK_URL`: The endpoint to receive lead submissions (e.g., Salesforce, Hubspot, or Zapier).
- `SANITY_PROJECT_ID`: The project ID for the headless CMS.
- `SANITY_DATASET`: Usually "production".
