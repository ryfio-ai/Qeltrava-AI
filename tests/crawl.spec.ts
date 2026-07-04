import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const locales = ['en', 'es', 'de', 'fr', 'pt-BR', 'ar'];

const baseRoutes = [
  '',
  '/about',
  '/services',
  '/services/ai-automation',
  '/services/cloud-devops',
  '/services/cybersecurity',
  '/services/data-analytics',
  '/services/product-engineering',
  '/services/saas-development',
  '/industries',
  '/industries/fintech',
  '/industries/healthcare',
  '/industries/logistics',
  '/industries/saas',
  '/solutions',
  '/solutions/ai-customer-service-transformation',
  '/solutions/ai-operations-automation',
  '/solutions/legacy-modernization',
  '/products',
  '/case-studies',
  '/insights',
  '/contact',
  '/book-consultation',
  '/security',
  '/accessibility',
  '/cookie-policy',
  '/government',
  '/operating-model',
  '/privacy',
  '/terms',
  '/demo',
  '/quiz',
  '/roi-calculator'
];

// Expected translation of header 'About' link per locale
const expectedAboutTranslations: Record<string, string> = {
  en: 'About',
  es: 'Sobre Nosotros',
  de: 'Über uns',
  fr: 'À Propos',
  'pt-BR': 'Sobre',
  ar: 'حول'
};

interface AuditResult {
  url: string;
  locale: string;
  route: string;
  status: 'PASSED' | 'FAILED';
  errors: string[];
  featuresVerified: {
    status200: boolean;
    noQuantra: boolean;
    correctPadding: boolean;
    rtlCheck: boolean;
    noTelemetry: boolean;
    noDashboardNav: boolean;
    translationMatch: boolean;
  };
}

test.describe('Programmatic Website Localization & Compliance Crawl', () => {
  
  test('crawl all 186 localized pages and generate AUDIT_REPORT.md', async ({ browser }) => {
    test.setTimeout(600000); // 10 minutes timeout
    const results: AuditResult[] = [];
    let totalErrors = 0;

    let context = await browser.newContext();
    let page = await context.newPage();
    let navCount = 0;

    console.log(`Starting localization crawl across ${locales.length} locales and ${baseRoutes.length} pages...`);

    for (const locale of locales) {
      for (const route of baseRoutes) {
        const urlPath = `/${locale}${route}`;
        const errors: string[] = [];
        const featuresVerified = {
          status200: false,
          noQuantra: false,
          correctPadding: false,
          rtlCheck: false,
          noTelemetry: false,
          noDashboardNav: false,
          translationMatch: false
        };

        try {
          navCount++;
          if (navCount % 30 === 0) {
            await page.close();
            await context.close();
            context = await browser.newContext();
            page = await context.newPage();
          }
          // 1. Visit URL and check status 200 with retry
          let response = null;
          let retries = 3;
          while (retries > 0) {
            try {
              response = await page.goto(urlPath, { waitUntil: 'domcontentloaded', timeout: 15000 });
              break;
            } catch (e) {
              retries--;
              if (retries === 0) throw e;
              await page.waitForTimeout(500);
            }
          }
          const status = response ? response.status() : 0;
          if (status === 200) {
            featuresVerified.status200 = true;
          } else {
            errors.push(`Invalid status code: ${status} (expected 200)`);
          }

          // Wait a tiny bit for hydration
          await page.waitForTimeout(20);

          // 2. Scan for "Quantra" references
          const bodyHTML = await page.evaluate(() => document.documentElement.outerHTML);
          if (/Quantra/i.test(bodyHTML)) {
            // Find specific matching contexts to list in report
            errors.push(`Found 'Quantra' brand reference in HTML content`);
          } else {
            featuresVerified.noQuantra = true;
          }

          // 3. Revert body top padding to pt-20
          const bodyClass = await page.evaluate(() => document.body.className);
          if (bodyClass.includes('pt-20')) {
            featuresVerified.correctPadding = true;
          } else {
            errors.push(`Body element top padding is not pt-20 (classes found: "${bodyClass}")`);
          }

          // 4. Verify RTL layout for Arabic
          const htmlDir = await page.evaluate(() => document.documentElement.getAttribute('dir'));
          if (locale === 'ar') {
            if (htmlDir === 'rtl') {
              featuresVerified.rtlCheck = true;
            } else {
              errors.push(`Arabic page html direction is not 'rtl' (found: "${htmlDir}")`);
            }
          } else {
            if (htmlDir === 'ltr' || !htmlDir) {
              featuresVerified.rtlCheck = true;
            } else {
              errors.push(`Non-Arabic page html direction is unexpected: "${htmlDir}"`);
            }
          }

          // 5. Remove simulated telemetry status bar
          const telemetryTexts = ['qeltrava-node-02', 'latency: 12ms', 'uptime: 99.9972%'];
          let hasTelemetry = false;
          for (const txt of telemetryTexts) {
            if (bodyHTML.includes(txt)) {
              hasTelemetry = true;
              errors.push(`Found telemetry status bar text: "${txt}"`);
            }
          }
          if (!hasTelemetry) {
            featuresVerified.noTelemetry = true;
          }

          // 6. Remove /dashboard from Header navigation
          const dashboardLinksCount = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('header nav a, header a'));
            return anchors.filter(a => (a.getAttribute('href') || '').includes('/dashboard')).length;
          });
          if (dashboardLinksCount === 0) {
            featuresVerified.noDashboardNav = true;
          } else {
            errors.push(`Found ${dashboardLinksCount} references to '/dashboard' in Header navigation links`);
          }

          // 7. Verify non-English translations
          const expectedAboutText = expectedAboutTranslations[locale];
          const aboutNavLinkText = await page.evaluate((aboutRoute: string) => {
            // Find links in header nav matching the about path
            const navLinks = Array.from(document.querySelectorAll('header nav a, header a'));
            const matches = navLinks.filter(a => (a.getAttribute('href') || '').endsWith(aboutRoute));
            return matches.length > 0 ? matches[0].textContent?.trim() : null;
          }, `/${locale}/about`);

          if (aboutNavLinkText === expectedAboutText) {
            featuresVerified.translationMatch = true;
          } else {
            errors.push(`Translation mismatch for Header 'About' nav link. Expected: "${expectedAboutText}", Found: "${aboutNavLinkText}"`);
          }

        } catch (e: unknown) {
          errors.push(`Execution error: ${e instanceof Error ? e.message : String(e)}`);
        }

        const isPassed = errors.length === 0;
        if (!isPassed) {
          totalErrors += errors.length;
        }

        results.push({
          url: urlPath,
          locale,
          route,
          status: isPassed ? 'PASSED' : 'FAILED',
          errors,
          featuresVerified
        });
      }
    }

    // 8. Cookie Consent Analytics Blocking Verification
    const cookieConsentErrors: string[] = [];
    const cookieContext = await browser.newContext();
    const cookiePage = await cookieContext.newPage();
    try {
      console.log('Testing Cookie Consent banner storage behavior...');
      await cookiePage.goto('/en');
      await cookiePage.waitForTimeout(500);

      // Verify localStorage is empty initially
      const initialConsent = await cookiePage.evaluate(() => localStorage.getItem('qeltrava_cookie_consent'));
      if (initialConsent !== null) {
        // Clear it to do a fresh test
        await cookiePage.evaluate(() => localStorage.removeItem('qeltrava_cookie_consent'));
      }

      // Reload
      await cookiePage.goto('/en');
      await cookiePage.waitForTimeout(500);

      // Decline All
      const declineButton = cookiePage.locator('button:has-text("Decline All")');
      if (await declineButton.count() > 0) {
        await declineButton.click();
        await cookiePage.waitForTimeout(200);
        const consentVal = await cookiePage.evaluate(() => localStorage.getItem('qeltrava_cookie_consent'));
        if (consentVal !== 'false') {
          cookieConsentErrors.push(`Declining cookie banner did not store 'false' in localStorage (found: ${consentVal})`);
        }
      } else {
        cookieConsentErrors.push('Decline All button not found on Cookie Banner');
      }

      // Reset and reload
      await cookiePage.evaluate(() => localStorage.removeItem('qeltrava_cookie_consent'));
      await cookiePage.goto('/en');
      await cookiePage.waitForTimeout(500);

      // Accept All
      const acceptButton = cookiePage.locator('button:has-text("Accept All")');
      if (await acceptButton.count() > 0) {
        await acceptButton.click();
        await cookiePage.waitForTimeout(200);
        const consentVal = await cookiePage.evaluate(() => localStorage.getItem('qeltrava_cookie_consent'));
        if (consentVal !== 'true') {
          cookieConsentErrors.push(`Accepting cookie banner did not store 'true' in localStorage (found: ${consentVal})`);
        }
      } else {
        cookieConsentErrors.push('Accept All button not found on Cookie Banner');
      }

    } catch (e: unknown) {
      cookieConsentErrors.push(`Cookie verification script error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      await cookiePage.close();
      await cookieContext.close();
    }

    // Write AUDIT_REPORT.md
    console.log('Generating AUDIT_REPORT.md...');
    const reportPath = path.join(process.cwd(), 'AUDIT_REPORT.md');
    
    let reportContent = `# Website Localization & Compliance Audit Report\n\n`;
    reportContent += `**Audit Timestamp:** ${new Date().toISOString()}\n`;
    reportContent += `**Total Pages Crawled:** ${results.length} (6 Locales x ${baseRoutes.length} Routes)\n`;
    reportContent += `**Compliance Status:** ${totalErrors === 0 && cookieConsentErrors.length === 0 ? '🏆 FULLY COMPLIANT' : '⚠️ NON-COMPLIANT ISSUES DETECTED'}\n\n`;

    reportContent += `## Executive Summary\n\n`;
    reportContent += `| Check Category | Target Metrics | Status |\n`;
    reportContent += `| --- | --- | --- |\n`;
    reportContent += `| Status Codes | all 186 page responses return 200 OK | ${results.every(r => r.featuresVerified.status200) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| Brand Integrity | 0 occurrences of deprecated brand name "Quantra" | ${results.every(r => r.featuresVerified.noQuantra) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| Layout Compliance | Reverted body top padding to pt-20 on all pages | ${results.every(r => r.featuresVerified.correctPadding) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| RTL Layout Integrity | dir="rtl" applied on html tag for all Arabic pages | ${results.every(r => r.featuresVerified.rtlCheck) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| Telemetry Status Bar | Telemetry panel completely removed from Footer | ${results.every(r => r.featuresVerified.noTelemetry) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| Header Navigation | "/dashboard" route removed from header navigation links | ${results.every(r => r.featuresVerified.noDashboardNav) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| Localization Verification | Verify correct translations for header links across locales | ${results.every(r => r.featuresVerified.translationMatch) ? '✅ PASS' : '❌ FAIL'} |\n`;
    reportContent += `| Cookie Consent Manager | LocalStorage variables matching user consent choice | ${cookieConsentErrors.length === 0 ? '✅ PASS' : '❌ FAIL'} |\n\n`;

    if (cookieConsentErrors.length > 0) {
      reportContent += `### Cookie Consent Banner Issues\n`;
      cookieConsentErrors.forEach(err => {
        reportContent += `- ❌ ${err}\n`;
      });
      reportContent += `\n`;
    }

    reportContent += `## Detailed Page Crawl Log\n\n`;
    reportContent += `| Locale | Route | Path | Status | Errors |\n`;
    reportContent += `| --- | --- | --- | --- | --- |\n`;
    results.forEach(res => {
      const errorText = res.errors.join('; ');
      reportContent += `| ${res.locale} | ${res.route || '/'} | \`${res.url}\` | ${res.status === 'PASSED' ? '🟢 PASS' : '🔴 FAIL'} | ${errorText || 'None'} |\n`;
    });

    await page.close();
    await context.close();
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log(`Audit report written to: ${reportPath}`);

    expect(totalErrors).toBe(0);
    expect(cookieConsentErrors.length).toBe(0);
  });
  
});
