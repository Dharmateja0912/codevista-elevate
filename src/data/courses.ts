import {
  Braces,
  Coffee,
  Layers,
  BarChart3,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  PieChart,
  type LucideIcon,
} from "lucide-react";

export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Module {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  difficulty: Level;
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  levels: Level[];
  mode: string;
  certificate: boolean;
  rating: number;
  students: number;
  short: string;
  tagline: string;
  icon: LucideIcon;
  overview: string;
  outcomes: string[];
  curriculum: Module[];
  projects: Project[];
  tools: string[];
  careers: string[];
  faq: { q: string; a: string }[];
}

export const categories = [
  "All",
  "Programming",
  "Web Development",
  "Data",
  "AI & ML",
  "Cloud",
  "Cyber Security",
  "Office & Productivity",
] as const;

const commonFaq = (name: string) => [
  {
    q: `Do I need prior experience for ${name}?`,
    a: "No. The programme starts from fundamentals and progressively moves to advanced, project-based work.",
  },
  {
    q: "Are the sessions live or recorded?",
    a: "Batches run as live instructor-led sessions. Recordings are shared with enrolled students for revision.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. A certificate of completion is issued after the capstone project and final assessment.",
  },
  {
    q: "Is placement assistance included?",
    a: "Career support such as resume reviews, mock interviews and portfolio guidance is included with every course.",
  },
];

export const courses: Course[] = [
  {
    slug: "python-programming",
    title: "Python Programming",
    category: "Programming",
    duration: "8 Weeks",
    level: "Beginner → Intermediate",
    levels: ["Beginner", "Intermediate"],
    mode: "Online / Offline",
    certificate: true,
    rating: 4.9,
    students: 2140,
    short: "Start from zero and write clean, practical Python for automation and analysis.",
    tagline: "Write real Python from week one.",
    icon: Braces,
    overview:
      "A hands-on introduction to programming with Python. You write code in every session, build small utilities each week and finish with a portfolio-ready project.",
    outcomes: [
      "Write clean, idiomatic Python programs",
      "Model problems with functions and classes",
      "Work with files, APIs and external libraries",
      "Debug and test your own code confidently",
    ],
    curriculum: [
      { title: "Python Fundamentals", description: "Setup, syntax, variables, operators and control flow." },
      { title: "Data Types", description: "Strings, lists, tuples, sets, dictionaries and comprehensions." },
      { title: "Functions", description: "Arguments, scope, recursion, lambdas and modular design." },
      { title: "Object Oriented Programming", description: "Classes, inheritance, encapsulation and dunder methods." },
      { title: "File Handling", description: "Reading and writing text, CSV and JSON with context managers." },
      { title: "Libraries", description: "pip, virtual environments, requests, datetime and pandas basics." },
      { title: "Projects", description: "Automation scripts and a capstone command-line application." },
    ],
    projects: [
      { title: "Expense Tracker CLI", description: "Track and summarise spending from the terminal.", tech: ["Python", "JSON"], difficulty: "Beginner" },
      { title: "Web Scraper", description: "Collect and clean structured data from public pages.", tech: ["Python", "requests", "BeautifulSoup"], difficulty: "Intermediate" },
      { title: "Student Management System", description: "CRUD application backed by a local database.", tech: ["Python", "SQLite"], difficulty: "Intermediate" },
    ],
    tools: ["Python 3", "VS Code", "Git", "pandas", "SQLite"],
    careers: ["Python Developer", "Automation Engineer", "Data Analyst (entry)", "QA Automation"],
    faq: commonFaq("Python Programming"),
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    category: "Web Development",
    duration: "12 Weeks",
    level: "Beginner → Advanced",
    levels: ["Beginner", "Intermediate", "Advanced"],
    mode: "Online / Offline / Hybrid",
    certificate: true,
    rating: 4.9,
    students: 3120,
    short: "Master modern frontend and backend development and ship a complete product.",
    tagline: "Master modern frontend and backend development.",
    icon: Layers,
    overview:
      "An end-to-end engineering programme. You build interfaces with React, APIs with Node and Express, persist data in a real database and deploy the finished product.",
    outcomes: [
      "Build responsive interfaces with React and modern CSS",
      "Design and secure REST APIs with Node and Express",
      "Model and query relational and document databases",
      "Deploy and monitor a production web application",
    ],
    curriculum: [
      { title: "HTML & CSS", description: "Semantic markup, flexbox, grid and responsive layout systems." },
      { title: "JavaScript", description: "ES2023 syntax, async/await, DOM APIs and functional patterns." },
      { title: "Git & GitHub", description: "Branching, pull requests, code review and collaboration flow." },
      { title: "React", description: "Components, hooks, state management, routing and performance." },
      { title: "Node.js", description: "Runtime model, modules, streams and the npm ecosystem." },
      { title: "Express", description: "Routing, middleware, validation and error handling." },
      { title: "Databases", description: "Schema design with PostgreSQL and MongoDB, indexing and queries." },
      { title: "REST APIs", description: "Resource design, pagination, versioning and documentation." },
      { title: "Authentication", description: "Sessions, JWT, password hashing and role-based access." },
      { title: "Deployment", description: "Environment config, CI pipelines, hosting and logging." },
      { title: "Capstone Project", description: "Plan, build and present a full production-grade application." },
    ],
    projects: [
      { title: "Portfolio Website", description: "Animated personal site with a contact workflow.", tech: ["React", "Tailwind"], difficulty: "Beginner" },
      { title: "E-Commerce Website", description: "Catalogue, cart, checkout and admin panel.", tech: ["React", "Node", "PostgreSQL"], difficulty: "Advanced" },
      { title: "Task Management Application", description: "Team boards with drag-and-drop and auth.", tech: ["React", "Express", "MongoDB"], difficulty: "Intermediate" },
    ],
    tools: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Git", "Docker"],
    careers: ["Full Stack Developer", "Frontend Engineer", "Backend Engineer", "Web Application Developer"],
    faq: commonFaq("Full Stack Development"),
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    category: "Data",
    duration: "10 Weeks",
    level: "Beginner → Intermediate",
    levels: ["Beginner", "Intermediate"],
    mode: "Online / Offline",
    certificate: true,
    rating: 4.8,
    students: 1860,
    short: "Turn raw spreadsheets and databases into decisions leadership can act on.",
    tagline: "From raw data to confident decisions.",
    icon: BarChart3,
    overview:
      "A practical analytics track covering the full workflow: collect, clean, analyse, visualise and present. Every module ends with a dataset exercise.",
    outcomes: [
      "Clean and reshape messy real-world datasets",
      "Write analytical SQL against relational databases",
      "Analyse data with Python and pandas",
      "Design dashboards that communicate clearly",
    ],
    curriculum: [
      { title: "Excel", description: "Formulas, lookups, pivot tables and analysis add-ins." },
      { title: "SQL", description: "Joins, aggregation, window functions and query tuning." },
      { title: "Python", description: "Scripting for analysts and reproducible notebooks." },
      { title: "Pandas", description: "Series, dataframes, merges, groupby and time series." },
      { title: "Data Visualization", description: "Chart selection, storytelling and visual hierarchy." },
      { title: "Power BI", description: "Data model, DAX measures and interactive reports." },
      { title: "Projects", description: "A full analytics case study with an executive summary." },
    ],
    projects: [
      { title: "Data Analytics Dashboard", description: "Sales performance dashboard with drilldowns.", tech: ["Power BI", "SQL"], difficulty: "Intermediate" },
      { title: "Customer Churn Analysis", description: "Cohort analysis and retention reporting.", tech: ["Python", "pandas"], difficulty: "Intermediate" },
      { title: "Retail Sales Report", description: "Automated monthly reporting workbook.", tech: ["Excel", "SQL"], difficulty: "Beginner" },
    ],
    tools: ["Excel", "PostgreSQL", "Python", "pandas", "Power BI"],
    careers: ["Data Analyst", "Business Analyst", "MIS Executive", "Reporting Analyst"],
    faq: commonFaq("Data Analytics"),
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    category: "AI & ML",
    duration: "12 Weeks",
    level: "Intermediate → Advanced",
    levels: ["Intermediate", "Advanced"],
    mode: "Online / Hybrid",
    certificate: true,
    rating: 4.9,
    students: 1420,
    short: "Build, evaluate and deploy machine learning models on real datasets.",
    tagline: "Build models that actually generalise.",
    icon: BrainCircuit,
    overview:
      "A rigorous but practical machine learning programme. You cover the statistics that matter, then implement and evaluate models end to end.",
    outcomes: [
      "Apply statistics and probability to modelling decisions",
      "Engineer features from raw, imperfect data",
      "Train and tune supervised and unsupervised models",
      "Evaluate models honestly and avoid overfitting",
    ],
    curriculum: [
      { title: "Python", description: "NumPy, pandas and the scientific Python toolchain." },
      { title: "Statistics", description: "Distributions, hypothesis testing and inference." },
      { title: "Machine Learning", description: "Regression, trees, ensembles and clustering." },
      { title: "Data Preparation", description: "Cleaning, encoding, scaling and leakage prevention." },
      { title: "Model Building", description: "Pipelines, cross-validation and hyperparameter search." },
      { title: "Evaluation", description: "Metrics, confusion matrices, ROC and error analysis." },
      { title: "Projects", description: "A complete prediction project with a written report." },
    ],
    projects: [
      { title: "AI Prediction Project", description: "Price prediction with tuned ensemble models.", tech: ["Python", "scikit-learn"], difficulty: "Advanced" },
      { title: "Sentiment Classifier", description: "Text classification pipeline with evaluation.", tech: ["Python", "NLTK"], difficulty: "Intermediate" },
      { title: "Customer Segmentation", description: "Unsupervised clustering of buying behaviour.", tech: ["Python", "scikit-learn"], difficulty: "Intermediate" },
    ],
    tools: ["Python", "NumPy", "pandas", "scikit-learn", "Jupyter", "Matplotlib"],
    careers: ["Machine Learning Engineer", "Data Scientist", "AI Associate", "Research Assistant"],
    faq: commonFaq("AI & Machine Learning"),
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "Cyber Security",
    duration: "10 Weeks",
    level: "Beginner → Intermediate",
    levels: ["Beginner", "Intermediate"],
    mode: "Online / Offline",
    certificate: true,
    rating: 4.8,
    students: 980,
    short: "Understand how systems are attacked and how to defend them responsibly.",
    tagline: "Defend systems with real fundamentals.",
    icon: ShieldCheck,
    overview:
      "A defensive security foundation built on networking and Linux, with lab work in a safe, isolated environment.",
    outcomes: [
      "Explain how networks and protocols actually work",
      "Operate confidently on the Linux command line",
      "Recognise common threats and attack patterns",
      "Apply web security fundamentals to real applications",
    ],
    curriculum: [
      { title: "Networking Fundamentals", description: "TCP/IP, DNS, routing, ports and packet analysis." },
      { title: "Linux", description: "Shell, permissions, processes, services and hardening." },
      { title: "Security Fundamentals", description: "CIA triad, cryptography basics and access control." },
      { title: "Threat Awareness", description: "Phishing, malware families and social engineering." },
      { title: "Web Security Fundamentals", description: "OWASP Top 10, secure headers and safe coding." },
    ],
    projects: [
      { title: "Home Lab Hardening", description: "Secure and audit a virtual Linux server.", tech: ["Linux", "iptables"], difficulty: "Intermediate" },
      { title: "Vulnerability Report", description: "Assess a deliberately vulnerable web app.", tech: ["Burp Suite", "OWASP"], difficulty: "Intermediate" },
      { title: "Network Traffic Analysis", description: "Inspect and document suspicious traffic.", tech: ["Wireshark"], difficulty: "Beginner" },
    ],
    tools: ["Linux", "Wireshark", "Nmap", "Burp Suite", "VirtualBox"],
    careers: ["Security Analyst", "SOC Analyst (L1)", "IT Security Associate", "Network Administrator"],
    faq: commonFaq("Cyber Security"),
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    category: "Cloud",
    duration: "8 Weeks",
    level: "Beginner → Intermediate",
    levels: ["Beginner", "Intermediate"],
    mode: "Online",
    certificate: true,
    rating: 4.7,
    students: 1240,
    short: "Deploy, scale and monitor workloads on modern cloud infrastructure.",
    tagline: "Ship to the cloud with confidence.",
    icon: Cloud,
    overview:
      "A console-and-CLI driven cloud course. You provision infrastructure yourself, deploy an application and set up monitoring and alerts.",
    outcomes: [
      "Describe core cloud service and pricing models",
      "Provision compute, storage and networking",
      "Deploy applications with repeatable configuration",
      "Monitor systems and respond to incidents",
    ],
    curriculum: [
      { title: "Cloud Fundamentals", description: "IaaS, PaaS, SaaS, regions, availability and cost." },
      { title: "Virtual Machines", description: "Instances, images, scaling groups and access keys." },
      { title: "Storage", description: "Object, block and archival storage with lifecycle rules." },
      { title: "Networking", description: "VPCs, subnets, security groups and load balancing." },
      { title: "Deployment", description: "Containers, environment configuration and rollouts." },
      { title: "Monitoring", description: "Metrics, logs, dashboards and alerting policies." },
    ],
    projects: [
      { title: "Static Site on Object Storage", description: "Host and cache a site behind a CDN.", tech: ["S3", "CloudFront"], difficulty: "Beginner" },
      { title: "Containerised API Deployment", description: "Deploy a containerised service with autoscaling.", tech: ["Docker", "EC2"], difficulty: "Intermediate" },
      { title: "Monitoring Dashboard", description: "Metrics and alerts for a live workload.", tech: ["CloudWatch"], difficulty: "Intermediate" },
    ],
    tools: ["AWS Console", "Docker", "Linux CLI", "Terraform basics"],
    careers: ["Cloud Associate", "DevOps Trainee", "Systems Engineer", "Cloud Support Engineer"],
    faq: commonFaq("Cloud Computing"),
  },
  {
    slug: "power-bi",
    title: "Power BI",
    category: "Office & Productivity",
    duration: "6 Weeks",
    level: "Beginner",
    levels: ["Beginner"],
    mode: "Online / Offline",
    certificate: true,
    rating: 4.8,
    students: 1560,
    short: "Build interactive business dashboards that stakeholders genuinely use.",
    tagline: "Dashboards that drive decisions.",
    icon: PieChart,
    overview:
      "A focused business intelligence course. You import messy data, model it properly, write DAX and publish polished dashboards.",
    outcomes: [
      "Connect and transform data with Power Query",
      "Build clean star-schema data models",
      "Write reliable DAX measures",
      "Publish and share interactive dashboards",
    ],
    curriculum: [
      { title: "Data Import", description: "Connectors, queries, refresh and incremental loads." },
      { title: "Data Cleaning", description: "Power Query transformations and error handling." },
      { title: "Data Modeling", description: "Relationships, star schema and cardinality." },
      { title: "DAX Fundamentals", description: "Calculated columns, measures and time intelligence." },
      { title: "Visualizations", description: "Chart choice, formatting, bookmarks and drillthrough." },
      { title: "Dashboards", description: "Layout, performance tuning, publishing and sharing." },
    ],
    projects: [
      { title: "Sales Performance Dashboard", description: "Regional revenue tracking with KPIs.", tech: ["Power BI", "DAX"], difficulty: "Beginner" },
      { title: "HR Analytics Report", description: "Attrition and headcount reporting.", tech: ["Power BI"], difficulty: "Beginner" },
      { title: "Finance Dashboard", description: "Budget vs actual with time intelligence.", tech: ["Power BI", "DAX"], difficulty: "Intermediate" },
    ],
    tools: ["Power BI Desktop", "Power Query", "DAX", "Excel"],
    careers: ["BI Analyst", "Reporting Specialist", "Data Visualization Analyst"],
    faq: commonFaq("Power BI"),
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    category: "Programming",
    duration: "8 Weeks",
    level: "Beginner → Intermediate",
    levels: ["Beginner", "Intermediate"],
    mode: "Online / Offline",
    certificate: true,
    rating: 4.7,
    students: 1730,
    short: "Learn strongly typed, object-oriented engineering the enterprise way.",
    tagline: "Object-oriented engineering, done properly.",
    icon: Coffee,
    overview:
      "A structured Java course focused on object-oriented design, the collections framework and robust error handling.",
    outcomes: [
      "Write well-structured object-oriented Java",
      "Use collections and generics effectively",
      "Handle exceptions and edge cases safely",
      "Build and package a complete Java application",
    ],
    curriculum: [
      { title: "Java Fundamentals", description: "JVM, syntax, types, control flow and arrays." },
      { title: "Object Oriented Programming", description: "Classes, interfaces, inheritance and polymorphism." },
      { title: "Collections", description: "List, Set, Map, iterators, streams and generics." },
      { title: "Exception Handling", description: "Checked vs unchecked, custom exceptions and cleanup." },
      { title: "File Handling", description: "IO, NIO, serialisation and resource management." },
      { title: "Projects", description: "A layered console application with persistence." },
    ],
    projects: [
      { title: "Library Management System", description: "Issue and return workflow with persistence.", tech: ["Java", "JDBC"], difficulty: "Intermediate" },
      { title: "Banking Console App", description: "Accounts, transactions and statements.", tech: ["Java"], difficulty: "Beginner" },
      { title: "Inventory Tracker", description: "Stock management with file-based storage.", tech: ["Java", "IO"], difficulty: "Intermediate" },
    ],
    tools: ["JDK 21", "IntelliJ IDEA", "Maven", "JUnit", "MySQL"],
    careers: ["Java Developer", "Backend Engineer", "Android Developer (foundation)", "Software Engineer Trainee"],
    faq: commonFaq("Java Programming"),
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);