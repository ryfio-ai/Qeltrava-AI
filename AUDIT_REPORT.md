# Website Localization & Compliance Audit Report

**Audit Timestamp:** 2026-06-30T08:34:50.209Z
**Total Pages Crawled:** 186 (6 Locales x 31 Routes)
**Compliance Status:** ⚠️ NON-COMPLIANT ISSUES DETECTED

## Executive Summary

| Check Category | Target Metrics | Status |
| --- | --- | --- |
| Status Codes | all 186 page responses return 200 OK | ❌ FAIL |
| Brand Integrity | 0 occurrences of deprecated brand name "Quantra" | ❌ FAIL |
| Layout Compliance | Reverted body top padding to pt-20 on all pages | ❌ FAIL |
| RTL Layout Integrity | dir="rtl" applied on html tag for all Arabic pages | ❌ FAIL |
| Telemetry Status Bar | Telemetry panel completely removed from Footer | ❌ FAIL |
| Header Navigation | "/dashboard" route removed from header navigation links | ❌ FAIL |
| Localization Verification | Verify correct translations for header links across locales | ❌ FAIL |
| Cookie Consent Manager | LocalStorage variables matching user consent choice | ❌ FAIL |

### Cookie Consent Banner Issues
- ❌ Cookie verification script error: page.goto: Target page, context or browser has been closed

## Detailed Page Crawl Log

| Locale | Route | Path | Status | Errors |
| --- | --- | --- | --- | --- |
| en | / | `/en` | 🟢 PASS | None |
| en | /about | `/en/about` | 🟢 PASS | None |
| en | /services | `/en/services` | 🟢 PASS | None |
| en | /services/ai-automation | `/en/services/ai-automation` | 🟢 PASS | None |
| en | /services/cloud-devops | `/en/services/cloud-devops` | 🟢 PASS | None |
| en | /services/cybersecurity | `/en/services/cybersecurity` | 🔴 FAIL | Execution error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
[2m  - navigating to "http://localhost:3000/en/services/cybersecurity", waiting until "load"[22m
 |
| en | /services/data-analytics | `/en/services/data-analytics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /services/product-engineering | `/en/services/product-engineering` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /services/saas-development | `/en/services/saas-development` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /industries | `/en/industries` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /industries/fintech | `/en/industries/fintech` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /industries/healthcare | `/en/industries/healthcare` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /industries/logistics | `/en/industries/logistics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /industries/saas | `/en/industries/saas` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /solutions | `/en/solutions` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /solutions/ai-customer-service-transformation | `/en/solutions/ai-customer-service-transformation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /solutions/ai-operations-automation | `/en/solutions/ai-operations-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /solutions/legacy-modernization | `/en/solutions/legacy-modernization` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /products | `/en/products` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /case-studies | `/en/case-studies` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /insights | `/en/insights` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /contact | `/en/contact` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /book-consultation | `/en/book-consultation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /security | `/en/security` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /accessibility | `/en/accessibility` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /cookie-policy | `/en/cookie-policy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /government | `/en/government` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /operating-model | `/en/operating-model` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /privacy | `/en/privacy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /terms | `/en/terms` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| en | /demo | `/en/demo` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | / | `/es` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /about | `/es/about` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services | `/es/services` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services/ai-automation | `/es/services/ai-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services/cloud-devops | `/es/services/cloud-devops` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services/cybersecurity | `/es/services/cybersecurity` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services/data-analytics | `/es/services/data-analytics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services/product-engineering | `/es/services/product-engineering` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /services/saas-development | `/es/services/saas-development` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /industries | `/es/industries` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /industries/fintech | `/es/industries/fintech` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /industries/healthcare | `/es/industries/healthcare` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /industries/logistics | `/es/industries/logistics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /industries/saas | `/es/industries/saas` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /solutions | `/es/solutions` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /solutions/ai-customer-service-transformation | `/es/solutions/ai-customer-service-transformation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /solutions/ai-operations-automation | `/es/solutions/ai-operations-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /solutions/legacy-modernization | `/es/solutions/legacy-modernization` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /products | `/es/products` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /case-studies | `/es/case-studies` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /insights | `/es/insights` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /contact | `/es/contact` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /book-consultation | `/es/book-consultation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /security | `/es/security` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /accessibility | `/es/accessibility` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /cookie-policy | `/es/cookie-policy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /government | `/es/government` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /operating-model | `/es/operating-model` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /privacy | `/es/privacy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /terms | `/es/terms` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| es | /demo | `/es/demo` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | / | `/de` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /about | `/de/about` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services | `/de/services` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services/ai-automation | `/de/services/ai-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services/cloud-devops | `/de/services/cloud-devops` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services/cybersecurity | `/de/services/cybersecurity` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services/data-analytics | `/de/services/data-analytics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services/product-engineering | `/de/services/product-engineering` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /services/saas-development | `/de/services/saas-development` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /industries | `/de/industries` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /industries/fintech | `/de/industries/fintech` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /industries/healthcare | `/de/industries/healthcare` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /industries/logistics | `/de/industries/logistics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /industries/saas | `/de/industries/saas` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /solutions | `/de/solutions` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /solutions/ai-customer-service-transformation | `/de/solutions/ai-customer-service-transformation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /solutions/ai-operations-automation | `/de/solutions/ai-operations-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /solutions/legacy-modernization | `/de/solutions/legacy-modernization` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /products | `/de/products` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /case-studies | `/de/case-studies` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /insights | `/de/insights` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /contact | `/de/contact` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /book-consultation | `/de/book-consultation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /security | `/de/security` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /accessibility | `/de/accessibility` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /cookie-policy | `/de/cookie-policy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /government | `/de/government` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /operating-model | `/de/operating-model` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /privacy | `/de/privacy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /terms | `/de/terms` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| de | /demo | `/de/demo` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | / | `/fr` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /about | `/fr/about` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services | `/fr/services` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services/ai-automation | `/fr/services/ai-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services/cloud-devops | `/fr/services/cloud-devops` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services/cybersecurity | `/fr/services/cybersecurity` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services/data-analytics | `/fr/services/data-analytics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services/product-engineering | `/fr/services/product-engineering` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /services/saas-development | `/fr/services/saas-development` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /industries | `/fr/industries` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /industries/fintech | `/fr/industries/fintech` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /industries/healthcare | `/fr/industries/healthcare` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /industries/logistics | `/fr/industries/logistics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /industries/saas | `/fr/industries/saas` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /solutions | `/fr/solutions` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /solutions/ai-customer-service-transformation | `/fr/solutions/ai-customer-service-transformation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /solutions/ai-operations-automation | `/fr/solutions/ai-operations-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /solutions/legacy-modernization | `/fr/solutions/legacy-modernization` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /products | `/fr/products` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /case-studies | `/fr/case-studies` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /insights | `/fr/insights` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /contact | `/fr/contact` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /book-consultation | `/fr/book-consultation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /security | `/fr/security` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /accessibility | `/fr/accessibility` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /cookie-policy | `/fr/cookie-policy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /government | `/fr/government` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /operating-model | `/fr/operating-model` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /privacy | `/fr/privacy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /terms | `/fr/terms` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| fr | /demo | `/fr/demo` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | / | `/pt-BR` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /about | `/pt-BR/about` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services | `/pt-BR/services` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services/ai-automation | `/pt-BR/services/ai-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services/cloud-devops | `/pt-BR/services/cloud-devops` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services/cybersecurity | `/pt-BR/services/cybersecurity` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services/data-analytics | `/pt-BR/services/data-analytics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services/product-engineering | `/pt-BR/services/product-engineering` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /services/saas-development | `/pt-BR/services/saas-development` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /industries | `/pt-BR/industries` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /industries/fintech | `/pt-BR/industries/fintech` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /industries/healthcare | `/pt-BR/industries/healthcare` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /industries/logistics | `/pt-BR/industries/logistics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /industries/saas | `/pt-BR/industries/saas` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /solutions | `/pt-BR/solutions` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /solutions/ai-customer-service-transformation | `/pt-BR/solutions/ai-customer-service-transformation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /solutions/ai-operations-automation | `/pt-BR/solutions/ai-operations-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /solutions/legacy-modernization | `/pt-BR/solutions/legacy-modernization` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /products | `/pt-BR/products` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /case-studies | `/pt-BR/case-studies` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /insights | `/pt-BR/insights` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /contact | `/pt-BR/contact` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /book-consultation | `/pt-BR/book-consultation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /security | `/pt-BR/security` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /accessibility | `/pt-BR/accessibility` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /cookie-policy | `/pt-BR/cookie-policy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /government | `/pt-BR/government` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /operating-model | `/pt-BR/operating-model` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /privacy | `/pt-BR/privacy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /terms | `/pt-BR/terms` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| pt-BR | /demo | `/pt-BR/demo` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | / | `/ar` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /about | `/ar/about` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services | `/ar/services` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services/ai-automation | `/ar/services/ai-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services/cloud-devops | `/ar/services/cloud-devops` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services/cybersecurity | `/ar/services/cybersecurity` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services/data-analytics | `/ar/services/data-analytics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services/product-engineering | `/ar/services/product-engineering` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /services/saas-development | `/ar/services/saas-development` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /industries | `/ar/industries` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /industries/fintech | `/ar/industries/fintech` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /industries/healthcare | `/ar/industries/healthcare` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /industries/logistics | `/ar/industries/logistics` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /industries/saas | `/ar/industries/saas` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /solutions | `/ar/solutions` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /solutions/ai-customer-service-transformation | `/ar/solutions/ai-customer-service-transformation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /solutions/ai-operations-automation | `/ar/solutions/ai-operations-automation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /solutions/legacy-modernization | `/ar/solutions/legacy-modernization` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /products | `/ar/products` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /case-studies | `/ar/case-studies` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /insights | `/ar/insights` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /contact | `/ar/contact` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /book-consultation | `/ar/book-consultation` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /security | `/ar/security` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /accessibility | `/ar/accessibility` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /cookie-policy | `/ar/cookie-policy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /government | `/ar/government` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /operating-model | `/ar/operating-model` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /privacy | `/ar/privacy` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /terms | `/ar/terms` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
| ar | /demo | `/ar/demo` | 🔴 FAIL | Execution error: page.goto: Target page, context or browser has been closed |
