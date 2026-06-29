$routes = @(
  "services",
  "services/ai-automation",
  "services/saas-development",
  "services/product-engineering",
  "services/cloud-devops",
  "services/data-analytics",
  "services/cybersecurity",
  "solutions",
  "solutions/ai-customer-service-transformation",
  "solutions/legacy-modernization",
  "solutions/ai-operations-automation",
  "industries",
  "industries/fintech",
  "industries/healthcare",
  "industries/logistics",
  "industries/saas",
  "products",
  "operating-model",
  "case-studies",
  "insights",
  "about",
  "contact",
  "book-consultation",
  "privacy",
  "terms"
)

foreach ($route in $routes) {
  $dirPath = "app/$route"
  New-Item -ItemType Directory -Force -Path $dirPath
  
  $pagePath = "$dirPath/page.tsx"
  
  # Extract component name
  $parts = $route -split "/"
  $lastPart = $parts[-1]
  $componentName = (Get-Culture).TextInfo.ToTitleCase($lastPart -replace "-", " ") -replace " ", ""
  if ($componentName -eq "") { $componentName = "Index" }
  
  $content = @"
import React from 'react';

export default function $($componentName)Page() {
  return (
    <main className=`"min-h-screen bg-[var(--color-bg-white)] pt-12 pb-24`">
      <div className=`"max-w-7xl mx-auto px-6 md:px-12`">
        <h1 className=`"text-4xl font-bold text-[var(--color-primary-dark)] mb-6`">$componentName</h1>
        <p className=`"text-[var(--color-text-main)]`">This section is currently under development.</p>
      </div>
    </main>
  );
}
"@
  Set-Content -Path $pagePath -Value $content
}

# Create API routes
New-Item -ItemType Directory -Force -Path "app/api/leads"
Set-Content -Path "app/api/leads/route.ts" -Value @"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ success: true });
}
"@

New-Item -ItemType Directory -Force -Path "app/api/newsletter"
Set-Content -Path "app/api/newsletter/route.ts" -Value @"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ success: true });
}
"@

New-Item -ItemType Directory -Force -Path "docs"
Set-Content -Path "docs/DEPLOYMENT.md" -Value "# Deployment Guide"
Set-Content -Path "docs/CONTENT_GUIDE.md" -Value "# Content Guide"
Set-Content -Path "docs/SEO_GUIDE.md" -Value "# SEO Guide"
Set-Content -Path "docs/LEAD_FORM_SETUP.md" -Value "# Lead Form Setup"

Set-Content -Path ".env.example" -Value @"
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
LEAD_NOTIFY_EMAIL=
NEXT_PUBLIC_BOOKING_URL=
"@
