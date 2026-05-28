/**
 * Surya Ghosh Academy - Data Store
 * Contains all static datasets used throughout the personal education website.
 * Highly structured and modular, ideal for future CMS integration.
 */

const ACADEMY_DATA = {
  instructor: {
    name: "Surya Ghosh",
    title: "Finance Educator & Multi-Topic Mentor",
    tagline: "Learn money, career, and life skills that actually matter.",
    shortBio: "Practical finance teacher and relatable mentor who simplifies complex topics into simple, actionable lessons for students, freshers, and young professionals.",
    detailedBio: "Surya Ghosh is a finance educator and multi-topic mentor dedicated to teaching the next generation the critical skills that traditional education systems often skip. Breaking away from textbook definitions and boring corporate jargon, Surya has helped thousands of students and young professionals navigate the complexities of money management, career planning, and personal productivity. He believes that financial independence and continuous self-improvement are not reserved for a select few, but are practical skills anyone can master with the right guidance.",
    stats: {
      studentsCount: "15,000+",
      rating: "4.9/5",
      coursesCount: "5+",
      youtubeSubscribers: "100K+"
    },
    expertise: [
      { topic: "Personal Finance", desc: "Budgeting, investing, mutual funds, taxes, and compound wealth systems." },
      { topic: "Career Growth", desc: "ATS-optimized resume building, LinkedIn branding, and high-impact salary negotiation." },
      { topic: "Productivity", desc: "Time-blocking, digital minimalism, habit loops, and focus optimization." },
      { topic: "Micro-Business", desc: "Nocode setups, validating ideas, freelancing, and digital product sales." }
    ],
    socials: {
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com"
    }
  },

  courses: [
    {
      id: "personal-finance-masterclass",
      title: "Personal Finance Masterclass: From Debt to Financial Freedom",
      slug: "personal-finance-masterclass",
      category: "finance",
      categoryName: "Finance",
      tag: "Popular",
      level: "Beginner Friendly",
      duration: "6 Weeks",
      lessonsCount: 24,
      rating: 4.9,
      studentsCount: "6,200+",
      price: 1499,
      originalPrice: 4999,
      status: "active",
      shortDescription: "Learn to manage your salary, invest in stock markets, clear bad debt, and build long-term wealth through a step-by-step practical blueprint.",
      bannerSvg: "wallet",
      outcomes: [
        "Master budgeting and modern wealth-building systems",
        "Understand mutual funds, index funds, ETFs, and direct stock selection",
        "Build a robust emergency fund and pick optimized insurance policies",
        "Save lakhs in taxes using legal deduction frameworks and smart allocation"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: The Psychology of Money",
          lessons: [
            "Introduction: The Mindset of Wealth vs. Riches",
            "Why High Income Doesn't Equal Wealth: Case Studies",
            "Deconstructing Indian Money Myths and Family Conditioning"
          ]
        },
        {
          moduleTitle: "Module 2: The Core Budgeting & Emergency System",
          lessons: [
            "The 50/30/20 Rule: Customized for Modern Indian Living",
            "Designing a Fail-Proof Cashflow Tracker",
            "Emergency Funds: Exactly How Much and Where to Keep It",
            "Slaying Bad Debt: The Snowball vs. Avalanche Methods"
          ]
        },
        {
          moduleTitle: "Module 3: Direct Mutual Funds & Stock Market Investing",
          lessons: [
            "Demystifying the Stock Market: How it actually works",
            "Active vs. Passive Investing: The Power of Index Funds",
            "How to Analyze and Select Direct Mutual Funds step-by-step",
            "Asset Allocation: Aligning investments with life goals",
            "SIPs (Systematic Investment Plans): The Magic of Compounding"
          ]
        },
        {
          moduleTitle: "Module 4: Protection: Health, Life, and Tax Optimization",
          lessons: [
            "Term Insurance vs. Endowment Plans: Avoid the biggest scams",
            "Health Insurance Checklist: Co-payments, exclusions, and super top-ups",
            "Income Tax Decoding: New vs. Old Tax Regime simplified",
            "Investments under Section 80C, 80D and Smart NPS Allocations"
          ]
        },
        {
          moduleTitle: "Module 5: Templates & Wealth Maintenance Blueprint",
          lessons: [
            "Building Your Interactive Personal Net Worth Sheet",
            "Automating Your Financial Portfolio: Set it and forget it",
            "Annual Financial Audits: How to adjust as your income scales"
          ]
        }
      ],
      faqs: [
        { q: "Is this course suitable for complete beginners in finance?", a: "Absolutely! This masterclass is custom-designed for individuals with zero financial background. We start from absolute basics—like what a bank balance represents—and systematically transition to advanced stock-market and tax-saving concepts without complex mathematics." },
        { q: "Will I get lifetime access to the material?", a: "Yes, you receive lifetime access to all core video lessons, spreadsheet checklists, and interactive calculators. Plus, you will get all future curriculum upgrades for free!" },
        { q: "Are direct investment suggestions included?", a: "We teach practical analysis frameworks so you can make confident independent investment choices. We do not provide speculative tips, stock alerts, or financial advisory services." }
      ]
    },
    {
      id: "career-accelerate-blueprint",
      title: "The Career Accelerate Blueprint: Stand Out & Earn More",
      slug: "career-accelerate-blueprint",
      category: "career",
      categoryName: "Career",
      tag: "Popular",
      level: "Intermediate",
      duration: "4 Weeks",
      lessonsCount: 18,
      rating: 4.8,
      studentsCount: "4,100+",
      price: 999,
      originalPrice: 2999,
      status: "active",
      shortDescription: "Supercharge your professional growth. Learn high-value networking, ATS resume optimization, LinkedIn personal branding, and elite salary negotiation.",
      bannerSvg: "briefcase",
      outcomes: [
        "Create an ATS-proof resume that lands 5x more interview calls",
        "Position yourself as a thought leader on LinkedIn to attract outbound recruiters",
        "Master the psychology of high-stakes salary negotiation strategies",
        "Communicate complex ideas with executive confidence to managers"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Positioning Yourself in the Modern Workforce",
          lessons: [
            "The Power of Skill Stacking: Becoming irreplaceable",
            "Mapping Your Career Trajectory: Strategy vs. Luck",
            "Identifying High-Value Corporate Pain Points"
          ]
        },
        {
          moduleTitle: "Module 2: The High-Conversion Resume & LinkedIn Brand",
          lessons: [
            "Cracking the ATS (Applicant Tracking System) Algorithms",
            "Action Verbs and Quantifiable Metrics: Resume Rewrites",
            "LinkedIn Optimization Checklist: From Headline to About Section",
            "Inbound Opportunities: The Art of writing outreach messages that get replies"
          ]
        },
        {
          moduleTitle: "Module 3: Elite Interview Preparation & Behavioral Selling",
          lessons: [
            "Deconstructing Behavioral Interview Questions (STAR Method)",
            "The 'Tell Me About Yourself' Blueprint that seals the deal",
            "Asking High-Context Questions that impress interviewers"
          ]
        },
        {
          moduleTitle: "Module 4: The Art of Elite Salary Negotiation",
          lessons: [
            "Negotiation Psychology: The Anchoring Effect",
            "Handling the 'What are your salary expectations?' Trap",
            "Counter-offering professionally with templates",
            "Leveraging multiple job offers for maximum advantage"
          ]
        }
      ],
      faqs: [
        { q: "Is this course only for software engineers?", a: "Not at all! The networking, resume, LinkedIn, and negotiation strategies are highly universal. They apply to business development, marketing, product management, operations, finance, design, and other professionals alike." },
        { q: "What if I am a college fresher with no job experience?", a: "This course is exceptionally valuable for freshers. We include a specialized module on translating college projects, internships, and extracurricular leadership roles into professional resumes that standout." }
      ]
    },
    {
      id: "high-performance-habits",
      title: "High-Performance Habits: Time, Focus & Goal Hacking",
      slug: "high-performance-habits",
      category: "productivity",
      categoryName: "Productivity",
      tag: "New",
      level: "Beginner Friendly",
      duration: "3 Weeks",
      lessonsCount: 12,
      rating: 4.9,
      studentsCount: "2,400+",
      price: 799,
      originalPrice: 1999,
      status: "active",
      shortDescription: "Build bulletproof routines, eliminate digital distractions, and structure your day for deep focus and maximum compound personal growth.",
      bannerSvg: "zap",
      outcomes: [
        "Eliminate procrastination by mastering micro-habit design",
        "Organize your professional and personal projects using high-end Notion frameworks",
        "Incorporate deep work techniques to finish 8 hours of work in 4 hours",
        "Setup digital minimalism systems to control screen time and improve mental focus"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: The Science of Habits & Procrastination",
          lessons: [
            "Why Motivation Fails and Systems Succeed",
            "The Habit Loop: Cue, Craving, Response, Reward",
            "Identity-Based Habits: Changing who you believe you are"
          ]
        },
        {
          moduleTitle: "Module 2: High-Performance Operating System",
          lessons: [
            "Time-Blocking: Structuring days for deep and shallow work",
            "Digital Minimalism: Reclaiming attention from notification algorithms",
            "Building a Second Brain: Capturing ideas using Notion & Keep"
          ]
        },
        {
          moduleTitle: "Module 3: Energy Management & Consistency Loops",
          lessons: [
            "Circadian Rhythms: Matching energy levels to complex tasks",
            "The 2-Minute Rule and Habit Stacking strategies",
            "Weekly and Monthly Review loops to stay on track"
          ]
        }
      ],
      faqs: [
        { q: "Will I need to buy expensive software or subscription apps?", a: "No! All methods we teach utilize completely free, robust tools like Google Calendar, Notion (Free Tier), and simple notebooks." }
      ]
    },
    {
      id: "entrepreneurship-101",
      title: "Entrepreneurship 101: Launch Your First Digital Side Hustle",
      slug: "entrepreneurship-101",
      category: "entrepreneurship",
      categoryName: "Entrepreneurship",
      tag: "Coming Soon",
      level: "Intermediate",
      duration: "8 Weeks",
      lessonsCount: 30,
      rating: 5.0,
      studentsCount: "0 (Waitlist)",
      price: 1999,
      originalPrice: 4999,
      status: "upcoming",
      shortDescription: "The complete roadmap to turn your skills or ideas into profitable digital micro-businesses, side-hustles, or high-ticket freelance gigs.",
      bannerSvg: "rocket",
      outcomes: [
        "Validate business ideas with zero upfront investment",
        "Build modern high-converting landing pages in hours without writing code",
        "Setup international payment getaways and invoice setups",
        "Acquire and retain your first 10 paying customers using organic growth loops"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: The Micro-Business Mindset & Ideation",
          lessons: [
            "The Solopreneur Era: Earning leverage with nocode tools",
            "Mapping Your Skills to Monetizable Digital Services",
            "Validating Demand: Pre-selling before building anything"
          ]
        },
        {
          moduleTitle: "Module 2: Setup and Launch Mechanics",
          lessons: [
            "Building high-converting pages on Carrd or Framer",
            "Setting up payment rails: Razorpay, Stripe, and Instamojo",
            "Packaging your knowledge into e-books, templates, or consultations"
          ]
        },
        {
          moduleTitle: "Module 3: Inorganic & Organic Lead Channels",
          lessons: [
            "Cold outreach that doesn't feel spammy: Templates & workflows",
            "Content Marketing: Attracting inbound clients via value posts",
            "Establishing customer loyalty and getting referrals"
          ]
        }
      ],
      faqs: [
        { q: "When will this course launch?", a: "This course is currently in production and is scheduled to launch in late Q3. By joining the waitlist today, you will lock in an exclusive 60% early-bird discount!" }
      ]
    },
    {
      id: "decision-making-mental-models",
      title: "Smart Choices: Decision Making & Mental Models",
      slug: "decision-making-mental-models",
      category: "life-skills",
      categoryName: "Life Skills",
      tag: "New",
      level: "Beginner Friendly",
      duration: "3 Weeks",
      lessonsCount: 10,
      rating: 4.7,
      studentsCount: "1,100+",
      price: 699,
      originalPrice: 1999,
      status: "active",
      shortDescription: "Learn core cognitive frameworks used by top minds to make clear, low-risk, high-reward life, career, and financial choices.",
      bannerSvg: "brain",
      outcomes: [
        "Master the top 10 mental models to analyze complex business problems",
        "Leverage second-order thinking to prevent long-term career mistakes",
        "Optimize critical decisions using inversion frameworks and risk matrices",
        "Identify and neutralize subtle cognitive biases that trigger impulse shopping"
      ],
      curriculum: [
        {
          moduleTitle: "Module 1: Re-wiring the Decision Engine",
          lessons: [
            "The Psychology of Bad Decisions: Why smart people make foolish calls",
            "First Principles Thinking: Stripping problems down to core truths",
            "Inversion: How avoiding failure guarantees success"
          ]
        },
        {
          moduleTitle: "Module 2: High-Performance Decision Frameworks",
          lessons: [
            "Second-Order Thinking: Factoring in long-term side-effects",
            "Regret Minimization Framework (Jeff Bezos' system)",
            "The Eisenhower Matrix: Separating urgent from important"
          ]
        }
      ],
      faqs: [
        { q: "Is this course theoretical?", a: "Not at all. Every single cognitive tool is taught via relatable real-world case studies: from buying a home vs. renting, changing a career track, to ending toxic relationships." }
      ]
    }
  ],

  testimonials: [
    {
      name: "Rohan Sharma",
      role: "Software Engineer, Bengaluru",
      quote: "Surya's Personal Finance Masterclass completely changed how I look at my salary. I went from saving zero to automating 40% of my income into index funds and direct mutual funds. The tax-saving sheet alone saved me ₹45,000 this year! Practical, simple, and worth every rupee.",
      rating: 5,
      avatarInitials: "RS"
    },
    {
      name: "Anjali Mehta",
      role: "Final Year Student, Mumbai",
      quote: "Before this course, investing felt like a foreign language. Surya explains stock concepts like a friendly senior rather than a strict college professor. I've already started my first mutual fund SIP with confidence!",
      rating: 5,
      avatarInitials: "AM"
    },
    {
      name: "Vikram Sen",
      role: "Product Marketer, Delhi NCR",
      quote: "I took the Career Accelerate Blueprint during my job hunt. The ATS-proof resume templates and Surya's negotiation scripts helped me land 3 offers and negotiate a whopping 45% increase on my base salary. Highly recommended for young professionals!",
      rating: 5,
      avatarInitials: "VS"
    },
    {
      name: "Pooja Hegde",
      role: "Freelance Designer, Hyderabad",
      quote: "The High-Performance Habits course is brilliant! I was constantly distracted by social media. Surya's digital minimalism system helped me cut screen time by 3 hours daily, giving me more space to take on premium design clients.",
      rating: 5,
      avatarInitials: "PH"
    }
  ],

  faqs: [
    {
      q: "Are these courses live or self-paced?",
      a: "All current courses are completely self-paced. Once enrolled, you receive instant, lifetime access to all recorded high-definition video modules, downloadable worksheets, resources, and templates. You can learn at your own speed, whenever and wherever fits your lifestyle."
    },
    {
      q: "Will I receive a course completion certificate?",
      a: "Yes! Once you complete 100% of the lessons in any active course and clear the short self-assessment quiz at the end, a premium certificate of completion signed by Surya Ghosh will be instantly generated for your LinkedIn profile."
    },
    {
      q: "What payment options are available?",
      a: "We support all major payment networks in India including UPI (Google Pay, PhonePe, Paytm), Netbanking, Debit/Credit Cards (Visa, Mastercard, RuPay), and convenient pocket wallets. International students can pay seamlessly using standard Stripe and PayPal checkouts."
    },
    {
      q: "Is there a refund policy?",
      a: "Yes! We believe in learner-first satisfaction. If you watch the first 3 lessons of any course and feel it's not the right fit for you, simply email us within 7 days of purchase for a 100% no-questions-asked refund."
    },
    {
      q: "Do you offer community support or Q&A channels?",
      a: "Yes! Every student gets exclusive access to our private Discord learning ecosystem. You can ask doubts directly under specific course channels, share your progress trackers, participate in monthly live AMA sessions with Surya, and network with 15,000+ ambitious peers."
    }
  ],

  achievements: [
    {
      title: "Research Category Award - 2nd Place",
      subtitle: "32nd Indian Paint Association (IPA) Awards, Allure 2025",
      description: "Honored with the 2nd Place Research Category Award along with Hemant Mewada and co-investigators for breakthrough technical research in coatings.",
      image: "assets/images/achievement_1.jpg",
      badge: "Award"
    },
    {
      title: "Patent Filed: Sanitizing Compositions",
      subtitle: "Patents Filed (PS) During 2022-23",
      description: "Filed a formal patent for the invention titled 'Sanitizing Compositions and Processes for Their Preparation' in collaboration with co-inventors Jatindranath and team.",
      image: "assets/images/achievement_2.jpg",
      badge: "Patent"
    },
    {
      title: "FICCI Chemicals & Petrochemicals Award",
      subtitle: "FICCI Chemical Industry Awards Ceremony 2025, New Delhi",
      description: "Received stage recognition at the prestigious FICCI Chemicals & Petrochemicals Awards Ceremony (22nd January 2026, New Delhi) for industrial innovation.",
      image: "assets/images/achievement_3.jpg",
      badge: "Award"
    },
    {
      title: "IPA Technical Paper Award",
      subtitle: "Technical Paper Awards Ceremony, Nutation",
      description: "Recognized with the elite Technical Paper Award by the Indian Paint Association (IPA) for publishing outstanding technical reviews on advanced materials.",
      image: "assets/images/achievement_4.jpg",
      badge: "Award"
    },
    {
      title: "Patent Filed: Advanced Coating System",
      subtitle: "Patents Filed During 2021-22",
      description: "Inventor and patent-holder for a pioneering coating invention titled 'A coating system and a process of its preparation' developed in collaboration with Randhir Parmar.",
      image: "assets/images/achievement_5.jpg",
      badge: "Patent"
    }
  ]
};
