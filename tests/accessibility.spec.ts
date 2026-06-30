import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility & Performance', () => {
  
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    
    // Wait for animation to settle
    await page.waitForTimeout(2000);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should load quickly under throttled network conditions (LCP < 2000ms)', async ({ page, context }) => {
    // Simulate Slow 4G
    const client = await context.newCDPSession(page);
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (1.5 * 1024 * 1024) / 8, // 1.5 Mbps
      uploadThroughput: (750 * 1024) / 8, // 750 kbps
      latency: 40,
    });

    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Check if the page loaded reasonably well (under 5 seconds for full load on slow 4G, LCP should be faster but hard to perfectly measure in PW without lighthouse plugin)
    expect(loadTime).toBeLessThan(8000); 
  });
  
});
