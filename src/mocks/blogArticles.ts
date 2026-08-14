// 2026-06-10: Article added — scaling-africa-1-trillion-digital-economy-trust-tax
// 2026-07-06: Article added — kenya-gra-igaming-vendor-compliance-2026
// 2026-07-13: Article added — why-fintech-doesnt-need-enterprise-compliance-plan
// 2026-07-27: Article added — founders-fear-hiring-ghosts-hr-blind-spot-africa
// 2026-08-10: Article added — enterprise-buyers-aml-policy-product-demo
export const blogCategories = [
  'All Articles',
  'Regulatory Updates',
  'Best Practices',
  'Case Studies',
  'Industry News',
  'Guides & Tutorials',
];

// Image dimension guide:
//   cardImage  → 400x225  (article card on blog listing page, related articles)
//   heroImage  → 896x384  (full-width article page hero, max-w-4xl × h-96)
//   featured   → 800x450  (featured hero card on blog page, ~640x320)
// Serving correctly-sized images avoids downloading 2–4× more bytes than needed.

export const blogArticles = [
  {
    id: 'enterprise-buyers-aml-policy-product-demo',
    title: 'Why Enterprise Buyers Care More About Your AML Policy Than Your Product Demo',
    excerpt:
      "A flawless product demo gets you in the room. But when the Chief Risk Officer asks for your AML policy, a generic template kills the deal. Here's why enterprise buyers evaluate compliance infrastructure — not interfaces — and what your policy document actually needs to pass due diligence.",
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Aug 10, 2026',
    readTime: '9 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20corporate%20boardroom%20compliance%20audit%20document%20shield%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=aml-policy-demo-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20enterprise%20due%20diligence%20policy%20document%20versus%20product%20demo%20screen%20split%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=aml-policy-demo-hero-fresh1&orientation=landscape',
    relatedLinks: [
      {
        id: 'kyc-pricing-trap-verification-bill-3x-budgeted',
        label: 'Related read',
        text: 'The KYC Pricing Trap: Why Your Verification Bill Is 3x What You Budgeted',
        note: 'Enterprise buyers evaluate total cost of compliance, not just sticker price. Learn how the KYC Retry Multiplier silently drains budgets and what audit-ready infrastructure actually costs.',
      },
    ],
    featured: true,
  },
  {
    id: 'kyc-pricing-trap-verification-bill-3x-budgeted',
    title: 'The KYC Pricing Trap: Why Your Verification Bill Is 3x What You Budgeted',
    excerpt:
      "You budgeted $0.50 per identity check. Your bill came back 3x higher. Here's the hidden KYC Retry Multiplier silently draining African fintech budgets — and how infrastructure built for the continent fixes it.",
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Aug 3, 2026',
    readTime: '8 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20fintech%20pricing%20concept%20invoice%20and%20calculator%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=kyc-pricing-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20fintech%20cost%20waterfall%20glowing%20circuit%20paths%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=kyc-pricing-hero-fresh1&orientation=landscape',
    relatedLinks: [
      {
        id: 'enterprise-buyers-aml-policy-product-demo',
        label: 'Related read',
        text: 'Why Enterprise Buyers Care More About Your AML Policy Than Your Product Demo',
        note: 'Before you worry about per-check pricing, make sure your compliance documentation can survive enterprise due diligence. A weak AML policy kills deals faster than a high bill ever could.',
      },
    ],
    featured: false,
  },
  {
    id: 'founders-fear-hiring-ghosts-hr-blind-spot-africa',
    title: "Why Founders Fear Hiring 'Ghosts' — And How to Fix Your HR Blind Spot",
    excerpt:
      "Foreign CEOs and local founders quietly fear the same thing: onboarding a sophisticated fraudster as an executive. The problem isn't African talent — it's broken verification infrastructure. Here's how to fix it with deep-tier HR screening.",
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jul 27, 2026',
    readTime: '7 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20HR%20verification%20professional%20silhouette%20hidden%20network%20shadow%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=ghost-hire-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20executive%20screening%20identity%20portal%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=ghost-hire-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'kenya-gra-igaming-vendor-compliance-2026',
    title: "The Regulators Are Checking the Pipes: Why Kenya's New iGaming Rules Target Your Vendors, Not Just You",
    excerpt:
      "Kenya's Gambling Regulatory Authority now mandates direct vendor authorization for all iGaming operators under the Gambling Control Act 2025. Learn why your KYC provider is a regulatory liability and how direct-to-registry verification keeps your platform compliant.",
    category: 'Regulatory Updates',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jul 6, 2026',
    readTime: '7 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20regulatory%20shield%20inspecting%20vendor%20network%20pipes%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=kenya-gra-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20regulatory%20oversight%20data%20pipeline%20scanning%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=kenya-gra-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'beyond-primary-user-aml-screening-close-associates',
    title: 'Beyond the Primary User: Why AML Screening Must Check Close Associates',
    excerpt:
      'The most dangerous user on your platform has a flawless identity. Discover why standard AML checks fail and how Network AML Screening that maps Relatives and Close Associates (RCAs) stops proxy laundering before it starts.',
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jul 20, 2026',
    readTime: '8 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20identity%20network%20family%20connections%20screening%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=aml-associates-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20AML%20risk%20network%20relationship%20nodes%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=aml-associates-hero-fresh1&orientation=landscape',
    relatedLinks: [
      {
        id: 'founders-fear-hiring-ghosts-hr-blind-spot-africa',
        label: 'Related read',
        text: 'Why Founders Fear Hiring \'Ghosts\' — And How to Fix Your HR Blind Spot',
        note: 'The same PEP and RCA risk that poisons your AML stack can walk in through your hiring process. Learn how deep-tier HR verification closes this blind spot.',
      },
    ],
    featured: false,
  },
  {
    id: 'why-fintech-doesnt-need-enterprise-compliance-plan',
    title: 'Why Fintechs Waste Money on Enterprise Compliance (And What to Buy Instead)',
    excerpt:
      'Stop overpaying for bloated enterprise KYC suites. Learn how Pay-Per-API-Call pricing, modular verification, and startup-friendly Growth plans protect African fintech unit economics while staying audit-ready.',
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jul 13, 2026',
    readTime: '6 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20fintech%20rocket%20modular%20API%20blocks%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=fintech-modular-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20lean%20fintech%20vs%20enterprise%20bundle%20crumbling%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=fintech-modular-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'grv-vs-ocr-government-registry-verification',
    title: 'Government Registry Verification (GRV) vs OCR: The Ultimate Competitive Moat',
    excerpt:
      'Discover why scaling platforms are abandoning OCR for Government Registry Verification (GRV). Learn how direct registry queries create audit-ready onboarding across Africa.',
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jun 29, 2026',
    readTime: '8 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20government%20registry%20verification%20secure%20API%20pipeline%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=grv-ocr-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20GRV%20vs%20OCR%20comparison%20sovereign%20database%20shield%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=grv-ocr-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'understanding-kyc-regulations-west-africa-2025',
    title: 'KYC Regulations in West Africa: 2025 Guide',
    excerpt:
      "A comprehensive breakdown of the evolving Know Your Customer requirements across ECOWAS member states, including Nigeria's updated NDPR framework and Ghana's new digital identity mandates.",
    category: 'Regulatory Updates',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20digital%20compliance%20document%20geometric%20patterns%20teal%20dark%20green%20clean%20minimalist%20professional%20corporate%20style%20no%20text&width=800&height=450&seq=kyc-west-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20regulatory%20compliance%20West%20Africa%20geometric%20network%20teal%20emerald%20dark%20green%20gradient%20clean%20professional%20corporate%20illustration%20no%20text&width=896&height=384&seq=kyc-west-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'aml-screening-best-practices-african-fintechs',
    title: 'AML Screening Best Practices for Africa',
    excerpt:
      'Learn how leading African fintech companies are implementing robust anti-money laundering screening processes while maintaining seamless user onboarding experiences.',
    category: 'Best Practices',
    author: 'Kwame Mensah',
    authorRole: 'Senior Analyst',
    date: 'Jan 10, 2025',
    readTime: '6 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20financial%20security%20shield%20digital%20network%20teal%20accent%20clean%20white%20background%20modern%20corporate%20illustration%20no%20text&width=400&height=225&seq=aml-card-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20AML%20security%20shield%20network%20graph%20nodes%20dark%20teal%20emerald%20gradient%20clean%20professional%20corporate%20illustration%20no%20text&width=896&height=384&seq=aml-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'case-study-paystack-identity-verification',
    title: 'How AI Verification Cut Payment Fraud by 73%',
    excerpt:
      "Discover how one of Africa's largest payment processors leveraged VerifyAfrica's AI-powered identity checks to dramatically cut fraud while improving approval rates.",
    category: 'Case Studies',
    author: 'Fatima Al-Hassan',
    authorRole: 'Product Manager',
    date: 'Jan 5, 2025',
    readTime: '10 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20data%20analytics%20dashboard%20fraud%20reduction%20metrics%20teal%20emerald%20clean%20modern%20business%20intelligence%20no%20text&width=400&height=225&seq=paystack-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20payment%20fraud%20reduction%20shield%20identity%20verification%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=paystack-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'south-africa-fica-amendments-2025',
    title: 'South Africa FICA 2025: Compliance Guide',
    excerpt:
      "The Financial Intelligence Centre Act has undergone significant updates. Here's a detailed guide on the new requirements and how to prepare your compliance workflows.",
    category: 'Regulatory Updates',
    author: 'Thabo Ndlovu',
    authorRole: 'Regulatory Affairs',
    date: 'Dec 28, 2024',
    readTime: '7 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20legal%20compliance%20document%20official%20seal%20geometric%20patterns%20dark%20teal%20gold%20professional%20regulatory%20clean%20modern%20no%20text&width=400&height=225&seq=fica-card-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20South%20Africa%20financial%20regulation%20compliance%20seal%20geometric%20teal%20dark%20green%20gold%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=fica-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'biometric-verification-guide-africa',
    title: 'Biometric Verification in Africa: 2025 Guide',
    excerpt:
      'From facial recognition to fingerprint matching, explore the biometric technologies transforming identity verification across the continent and their regulatory implications.',
    category: 'Guides & Tutorials',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Dec 20, 2024',
    readTime: '12 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20biometric%20facial%20recognition%20digital%20scan%20geometric%20face%20outline%20teal%20cyan%20futuristic%20clean%20modern%20tech%20no%20text&width=400&height=225&seq=biometric-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20biometric%20verification%20African%20identity%20facial%20scan%20fingerprint%20dark%20teal%20cyan%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=biometric-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'igaming-compliance-east-africa',
    title: 'iGaming Compliance in East Africa 2025',
    excerpt:
      "East Africa's iGaming market is booming — but so is regulatory scrutiny. Kenya's BCLB, Tanzania's Gaming Board, and Uganda's NLGRB are tightening KYC, AML, and responsible gambling requirements. Here's what every operator needs to know to stay licensed and compliant in 2025.",
    category: 'Regulatory Updates',
    author: 'Kwame Mensah',
    authorRole: 'Senior Analyst',
    date: 'Mar 28, 2025',
    readTime: '11 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20East%20African%20compliance%20shield%20identity%20verification%20dark%20teal%20gradient%20geometric%20clean%20corporate%20illustration%20minimal%20no%20text&width=400&height=225&seq=igaming-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20East%20Africa%20iGaming%20regulatory%20compliance%20shield%20license%20document%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=igaming-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'building-risk-based-approach-customer-due-diligence',
    title: 'Risk-Based Customer Due Diligence Framework',
    excerpt:
      'Step-by-step framework for implementing risk-based CDD processes that satisfy regulators while keeping onboarding friction low for legitimate customers.',
    category: 'Best Practices',
    author: 'Fatima Al-Hassan',
    authorRole: 'Product Manager',
    date: 'Dec 10, 2024',
    readTime: '8 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20risk%20assessment%20matrix%20layered%20geometric%20shapes%20teal%20emerald%20professional%20corporate%20clean%20minimalist%20no%20text&width=400&height=225&seq=cdd-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20customer%20due%20diligence%20risk%20matrix%20framework%20teal%20emerald%20dark%20gradient%20clean%20professional%20corporate%20illustration%20no%20text&width=896&height=384&seq=cdd-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'case-study-fx-broker-compliance-automation',
    title: 'FX Broker Automates 90% of Compliance Checks',
    excerpt:
      'This forex brokerage serving 12 African markets transformed their manual compliance process into a fully automated pipeline, cutting review time from days to minutes.',
    category: 'Case Studies',
    author: 'Thabo Ndlovu',
    authorRole: 'Regulatory Affairs',
    date: 'Dec 5, 2024',
    readTime: '11 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20automation%20workflow%20connected%20nodes%20process%20arrows%20teal%20dark%20green%20clean%20modern%20corporate%20efficiency%20no%20text&width=400&height=225&seq=fx-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20forex%20compliance%20automation%20workflow%20African%20markets%20nodes%20pipeline%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=fx-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'gdpr-vs-ndpr-comparison-guide',
    title: 'GDPR vs NDPR: Compliance for Africa & EU',
    excerpt:
      'Operating between Europe and Nigeria? This guide breaks down the key differences and overlaps between GDPR and NDPR to help you build a unified data protection strategy.',
    category: 'Guides & Tutorials',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20data%20protection%20privacy%20lock%20shield%20split%20design%20teal%20warm%20gold%20clean%20professional%20corporate%20no%20text&width=400&height=225&seq=gdpr-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20GDPR%20NDPR%20dual%20data%20protection%20split%20design%20teal%20gold%20Europe%20Africa%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=gdpr-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'unmasking-ubo-live-registry-verification-vs-scraped-databases',
    title: 'Unmasking the UBO: Why Live Registry Verification (CAC, CIPC) Beats Scraped Databases',
    excerpt:
      'Discover why scaling B2B platforms in Africa requires Live Government Registry Verification (CAC, CIPC) over outdated, scraped KYC data. Build truly secure, audit-ready compliance infrastructure.',
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jun 15, 2026',
    readTime: '8 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20corporate%20ownership%20layers%20magnifying%20glass%20peeling%20suit%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=800&height=450&seq=ubo-unmasking-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20live%20registry%20verification%20beneficial%20ownership%20tree%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=ubo-hero-fresh1&orientation=landscape',
    featured: false,
  },
  {
    id: 'scaling-africa-1-trillion-digital-economy-trust-tax',
    title: "Scaling Africa's $1 Trillion Digital Economy",
    excerpt:
      'Scaling a pan-African fintech? Learn how to eliminate the "Trust Tax," avoid cross-border KYC bottlenecks, and build infrastructure-level compliance.',
    category: 'Best Practices',
    author: 'Adaeze Okonkwo',
    authorRole: 'Head of Compliance',
    date: 'Jun 10, 2026',
    readTime: '9 min read',
    image:
      'https://readdy.ai/api/search-image?query=Abstract%20African%20digital%20economy%20network%20nodes%20on%20continent%20map%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=400&height=225&seq=trust-tax-fresh1&orientation=landscape',
    heroImage:
      'https://readdy.ai/api/search-image?query=Panoramic%20abstract%20African%20fintech%20infrastructure%20glowing%20network%20nodes%20dark%20teal%20emerald%20gradient%20clean%20corporate%20illustration%20no%20text&width=896&height=384&seq=trust-tax-hero-fresh1&orientation=landscape',
    featured: false,
  },
];

export const popularResources = [
  {
    title: 'African KYC Compliance Checklist 2025',
    downloads: 2340,
    type: 'PDF Guide',
  },
  {
    title: 'AML Risk Assessment Template',
    downloads: 1870,
    type: 'Template',
  },
  {
    title: 'Regulatory Map: Africa 54 Countries',
    downloads: 1650,
    type: 'Interactive Map',
  },
  {
    title: 'Identity Verification API Documentation',
    downloads: 1420,
    type: 'Developer Docs',
  },
  {
    title: "Compliance Officer's Handbook for Africa",
    downloads: 1180,
    type: 'eBook',
  },
];