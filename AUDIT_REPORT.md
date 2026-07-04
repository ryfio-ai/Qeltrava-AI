# Website Localization & Compliance Audit Report

**Audit Timestamp:** 2026-07-04T08:51:32.378Z
**Total Pages Crawled:** 198 (6 Locales x 33 Routes)
**Compliance Status:** ⚠️ NON-COMPLIANT ISSUES DETECTED

## Executive Summary

| Check Category | Target Metrics | Status |
| --- | --- | --- |
| Status Codes | all 186 page responses return 200 OK | ❌ FAIL |
| Brand Integrity | 0 occurrences of deprecated brand name "Quantra" | ✅ PASS |
| Layout Compliance | Reverted body top padding to pt-20 on all pages | ❌ FAIL |
| RTL Layout Integrity | dir="rtl" applied on html tag for all Arabic pages | ✅ PASS |
| Telemetry Status Bar | Telemetry panel completely removed from Footer | ✅ PASS |
| Header Navigation | "/dashboard" route removed from header navigation links | ✅ PASS |
| Localization Verification | Verify correct translations for header links across locales | ❌ FAIL |
| Cookie Consent Manager | LocalStorage variables matching user consent choice | ✅ PASS |

## Detailed Page Crawl Log

| Locale | Route | Path | Status | Errors |
| --- | --- | --- | --- | --- |
| en | / | `/en` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /about | `/en/about` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services | `/en/services` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services/ai-automation | `/en/services/ai-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services/cloud-devops | `/en/services/cloud-devops` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services/cybersecurity | `/en/services/cybersecurity` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services/data-analytics | `/en/services/data-analytics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services/product-engineering | `/en/services/product-engineering` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /services/saas-development | `/en/services/saas-development` | 🔴 FAIL | Invalid status code: 500 (expected 200); Body element top padding is not pt-20 (classes found: ""); Translation mismatch for Header 'About' nav link. Expected: "About", Found: "null" |
| en | /industries | `/en/industries` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /industries/fintech | `/en/industries/fintech` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /industries/healthcare | `/en/industries/healthcare` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /industries/logistics | `/en/industries/logistics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /industries/saas | `/en/industries/saas` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /solutions | `/en/solutions` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /solutions/ai-customer-service-transformation | `/en/solutions/ai-customer-service-transformation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /solutions/ai-operations-automation | `/en/solutions/ai-operations-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /solutions/legacy-modernization | `/en/solutions/legacy-modernization` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /products | `/en/products` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /case-studies | `/en/case-studies` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /insights | `/en/insights` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /contact | `/en/contact` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /book-consultation | `/en/book-consultation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /security | `/en/security` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /accessibility | `/en/accessibility` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /cookie-policy | `/en/cookie-policy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /government | `/en/government` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /operating-model | `/en/operating-model` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /privacy | `/en/privacy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /terms | `/en/terms` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /demo | `/en/demo` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /quiz | `/en/quiz` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| en | /roi-calculator | `/en/roi-calculator` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | / | `/es` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /about | `/es/about` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services | `/es/services` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services/ai-automation | `/es/services/ai-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services/cloud-devops | `/es/services/cloud-devops` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services/cybersecurity | `/es/services/cybersecurity` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services/data-analytics | `/es/services/data-analytics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services/product-engineering | `/es/services/product-engineering` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /services/saas-development | `/es/services/saas-development` | 🔴 FAIL | Invalid status code: 500 (expected 200); Body element top padding is not pt-20 (classes found: ""); Translation mismatch for Header 'About' nav link. Expected: "Sobre Nosotros", Found: "null" |
| es | /industries | `/es/industries` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /industries/fintech | `/es/industries/fintech` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /industries/healthcare | `/es/industries/healthcare` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /industries/logistics | `/es/industries/logistics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /industries/saas | `/es/industries/saas` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /solutions | `/es/solutions` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /solutions/ai-customer-service-transformation | `/es/solutions/ai-customer-service-transformation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /solutions/ai-operations-automation | `/es/solutions/ai-operations-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /solutions/legacy-modernization | `/es/solutions/legacy-modernization` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /products | `/es/products` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /case-studies | `/es/case-studies` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /insights | `/es/insights` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /contact | `/es/contact` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /book-consultation | `/es/book-consultation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /security | `/es/security` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /accessibility | `/es/accessibility` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /cookie-policy | `/es/cookie-policy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: ""); Translation mismatch for Header 'About' nav link. Expected: "Sobre Nosotros", Found: "null" |
| es | /government | `/es/government` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /operating-model | `/es/operating-model` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /privacy | `/es/privacy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /terms | `/es/terms` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /demo | `/es/demo` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /quiz | `/es/quiz` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| es | /roi-calculator | `/es/roi-calculator` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | / | `/de` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /about | `/de/about` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services | `/de/services` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services/ai-automation | `/de/services/ai-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services/cloud-devops | `/de/services/cloud-devops` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services/cybersecurity | `/de/services/cybersecurity` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services/data-analytics | `/de/services/data-analytics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services/product-engineering | `/de/services/product-engineering` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /services/saas-development | `/de/services/saas-development` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /industries | `/de/industries` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /industries/fintech | `/de/industries/fintech` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /industries/healthcare | `/de/industries/healthcare` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /industries/logistics | `/de/industries/logistics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /industries/saas | `/de/industries/saas` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /solutions | `/de/solutions` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /solutions/ai-customer-service-transformation | `/de/solutions/ai-customer-service-transformation` | 🔴 FAIL | Invalid status code: 500 (expected 200); Body element top padding is not pt-20 (classes found: ""); Translation mismatch for Header 'About' nav link. Expected: "Über uns", Found: "null" |
| de | /solutions/ai-operations-automation | `/de/solutions/ai-operations-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /solutions/legacy-modernization | `/de/solutions/legacy-modernization` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /products | `/de/products` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /case-studies | `/de/case-studies` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /insights | `/de/insights` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /contact | `/de/contact` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /book-consultation | `/de/book-consultation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /security | `/de/security` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /accessibility | `/de/accessibility` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /cookie-policy | `/de/cookie-policy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /government | `/de/government` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /operating-model | `/de/operating-model` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /privacy | `/de/privacy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /terms | `/de/terms` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /demo | `/de/demo` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /quiz | `/de/quiz` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| de | /roi-calculator | `/de/roi-calculator` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | / | `/fr` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /about | `/fr/about` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services | `/fr/services` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services/ai-automation | `/fr/services/ai-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services/cloud-devops | `/fr/services/cloud-devops` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services/cybersecurity | `/fr/services/cybersecurity` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services/data-analytics | `/fr/services/data-analytics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services/product-engineering | `/fr/services/product-engineering` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /services/saas-development | `/fr/services/saas-development` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /industries | `/fr/industries` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /industries/fintech | `/fr/industries/fintech` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /industries/healthcare | `/fr/industries/healthcare` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /industries/logistics | `/fr/industries/logistics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /industries/saas | `/fr/industries/saas` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /solutions | `/fr/solutions` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /solutions/ai-customer-service-transformation | `/fr/solutions/ai-customer-service-transformation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /solutions/ai-operations-automation | `/fr/solutions/ai-operations-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /solutions/legacy-modernization | `/fr/solutions/legacy-modernization` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /products | `/fr/products` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /case-studies | `/fr/case-studies` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /insights | `/fr/insights` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /contact | `/fr/contact` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /book-consultation | `/fr/book-consultation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /security | `/fr/security` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /accessibility | `/fr/accessibility` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /cookie-policy | `/fr/cookie-policy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /government | `/fr/government` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /operating-model | `/fr/operating-model` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /privacy | `/fr/privacy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /terms | `/fr/terms` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /demo | `/fr/demo` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /quiz | `/fr/quiz` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| fr | /roi-calculator | `/fr/roi-calculator` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | / | `/pt-BR` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /about | `/pt-BR/about` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /services | `/pt-BR/services` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /services/ai-automation | `/pt-BR/services/ai-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /services/cloud-devops | `/pt-BR/services/cloud-devops` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /services/cybersecurity | `/pt-BR/services/cybersecurity` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /services/data-analytics | `/pt-BR/services/data-analytics` | 🔴 FAIL | Invalid status code: 500 (expected 200); Body element top padding is not pt-20 (classes found: ""); Translation mismatch for Header 'About' nav link. Expected: "Sobre", Found: "null" |
| pt-BR | /services/product-engineering | `/pt-BR/services/product-engineering` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /services/saas-development | `/pt-BR/services/saas-development` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /industries | `/pt-BR/industries` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /industries/fintech | `/pt-BR/industries/fintech` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /industries/healthcare | `/pt-BR/industries/healthcare` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /industries/logistics | `/pt-BR/industries/logistics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /industries/saas | `/pt-BR/industries/saas` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /solutions | `/pt-BR/solutions` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /solutions/ai-customer-service-transformation | `/pt-BR/solutions/ai-customer-service-transformation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /solutions/ai-operations-automation | `/pt-BR/solutions/ai-operations-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /solutions/legacy-modernization | `/pt-BR/solutions/legacy-modernization` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /products | `/pt-BR/products` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /case-studies | `/pt-BR/case-studies` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /insights | `/pt-BR/insights` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /contact | `/pt-BR/contact` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /book-consultation | `/pt-BR/book-consultation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /security | `/pt-BR/security` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /accessibility | `/pt-BR/accessibility` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /cookie-policy | `/pt-BR/cookie-policy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /government | `/pt-BR/government` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /operating-model | `/pt-BR/operating-model` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /privacy | `/pt-BR/privacy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /terms | `/pt-BR/terms` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /demo | `/pt-BR/demo` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /quiz | `/pt-BR/quiz` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| pt-BR | /roi-calculator | `/pt-BR/roi-calculator` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | / | `/ar` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /about | `/ar/about` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services | `/ar/services` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services/ai-automation | `/ar/services/ai-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services/cloud-devops | `/ar/services/cloud-devops` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services/cybersecurity | `/ar/services/cybersecurity` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services/data-analytics | `/ar/services/data-analytics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services/product-engineering | `/ar/services/product-engineering` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /services/saas-development | `/ar/services/saas-development` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /industries | `/ar/industries` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /industries/fintech | `/ar/industries/fintech` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /industries/healthcare | `/ar/industries/healthcare` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /industries/logistics | `/ar/industries/logistics` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /industries/saas | `/ar/industries/saas` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /solutions | `/ar/solutions` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /solutions/ai-customer-service-transformation | `/ar/solutions/ai-customer-service-transformation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /solutions/ai-operations-automation | `/ar/solutions/ai-operations-automation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /solutions/legacy-modernization | `/ar/solutions/legacy-modernization` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /products | `/ar/products` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /case-studies | `/ar/case-studies` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /insights | `/ar/insights` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /contact | `/ar/contact` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /book-consultation | `/ar/book-consultation` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /security | `/ar/security` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /accessibility | `/ar/accessibility` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /cookie-policy | `/ar/cookie-policy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /government | `/ar/government` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /operating-model | `/ar/operating-model` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /privacy | `/ar/privacy` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /terms | `/ar/terms` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /demo | `/ar/demo` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /quiz | `/ar/quiz` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
| ar | /roi-calculator | `/ar/roi-calculator` | 🔴 FAIL | Body element top padding is not pt-20 (classes found: "min-h-full flex flex-col") |
