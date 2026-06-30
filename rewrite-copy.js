const fs = require('fs');
const path = require('path');

const directories = [
    path.join(__dirname, 'app/services'),
    path.join(__dirname, 'app/industries'),
    path.join(__dirname, 'app/solutions')
];

const boilerplateRegex = /Every architecture decision in our [^<]+ is measured against its ability to reduce costs, increase revenue, or mitigate risk\. We build secure, scalable platforms using our Qeltrava Delivery OS\./g;

const customCopy = {
    'cloud-devops': 'We design highly available cloud infrastructures that eliminate deployment bottlenecks. By adopting GitOps and infrastructure-as-code (IaC), your engineering teams can ship faster with zero downtime.',
    'cybersecurity': 'Security is not an afterthought; it is integrated into every layer of our architecture. We implement zero-trust policies, automated threat detection, and continuous compliance monitoring to protect your digital assets.',
    'data-analytics': 'We build robust data pipelines and intelligent analytics dashboards that turn raw information into actionable business insights, enabling real-time decision-making for leadership teams.',
    'product-engineering': 'Our product engineering goes beyond writing code. We architect scalable solutions from the ground up, ensuring that every feature maps directly to user needs and core business objectives.',
    'saas-development': 'We construct scalable, multi-tenant architectures designed for high performance and reliability. Our SaaS platforms are built to handle rapid user growth while maintaining strict data isolation.',
    'ai-automation': 'We develop custom AI agents and intelligent workflows that automate repetitive tasks, allowing your human workforce to focus on high-value, strategic initiatives.',
    'fintech': 'We engineer resilient financial systems that strictly adhere to regulatory standards. From high-frequency trading platforms to secure payment gateways, we deliver low-latency, highly secure solutions.',
    'healthcare': 'Our healthcare architectures prioritize patient data security and HIPAA compliance. We build interoperable systems that seamlessly connect providers, patients, and clinical data.',
    'logistics': 'We build predictive models and real-time tracking systems that optimize supply chain operations, reduce delivery times, and maximize fleet efficiency.',
    'saas': 'Our infrastructure solutions for SaaS companies ensure maximum uptime, effortless scaling, and secure multi-tenant architectures that grow with your customer base.',
    'ai-customer-service-transformation': 'We deploy sophisticated conversational AI agents capable of resolving complex customer queries instantly, drastically reducing support tickets and improving user satisfaction.',
    'ai-operations-automation': 'By integrating AI deeply into your internal workflows, we eliminate operational friction and accelerate processing times across finance, HR, and administrative departments.',
    'legacy-modernization': 'We carefully refactor and migrate monolithic legacy systems into agile, cloud-native microservices, drastically reducing technical debt without disrupting ongoing business operations.'
};

directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(subDir => {
            let pagePath = path.join(dir, subDir, 'page.tsx');
            if (fs.existsSync(pagePath) && fs.lstatSync(pagePath).isFile()) {
                let content = fs.readFileSync(pagePath, 'utf8');
                let originalContent = content;

                if (customCopy[subDir]) {
                    content = content.replace(boilerplateRegex, customCopy[subDir]);
                }

                if (content !== originalContent) {
                    fs.writeFileSync(pagePath, content, 'utf8');
                    console.log("Updated unique copy: " + pagePath);
                }
            }
        });
    }
});
console.log("Boilerplate rewrite complete.");
