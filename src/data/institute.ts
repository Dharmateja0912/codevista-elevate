export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  students: number;
  skills: string[];
  bio: string;
  courses: string[];
  slots: string[];
  accent: string;
}

export const trainers: Trainer[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Senior Full Stack Trainer",
    experience: "7+ Years Experience",
    rating: 4.9,
    students: 1200,
    skills: ["React", "JavaScript", "Node.js", "Databases"],
    bio: "Priya has led product engineering teams across fintech and SaaS. She teaches full stack development the way it is practised in industry: version control from day one, code review every week and a deployed project at the end.",
    courses: ["Full Stack Development", "Python Programming"],
    slots: ["Mon & Wed — 7:00 PM", "Sat — 10:00 AM", "Sun — 11:00 AM"],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    id: "rahul-kumar",
    name: "Rahul Kumar",
    role: "Data Analytics Trainer",
    experience: "6+ Years Experience",
    rating: 4.8,
    students: 940,
    skills: ["Python", "SQL", "Power BI", "Excel"],
    bio: "Rahul spent six years building reporting systems for retail and logistics companies. His classes are dataset-first — every concept is introduced by solving a real business question.",
    courses: ["Data Analytics", "Power BI"],
    slots: ["Tue & Thu — 6:30 PM", "Sat — 4:00 PM"],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    role: "AI & ML Trainer",
    experience: "5+ Years Experience",
    rating: 4.9,
    students: 760,
    skills: ["Python", "Machine Learning", "Data Science"],
    bio: "Ananya works on applied machine learning and mentors students through their first end-to-end model. She focuses on honest evaluation and reproducible experiments.",
    courses: ["AI & Machine Learning", "Data Analytics"],
    slots: ["Mon & Fri — 8:00 PM", "Sun — 9:30 AM"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    id: "vikram-nair",
    name: "Vikram Nair",
    role: "Cloud & DevOps Trainer",
    experience: "8+ Years Experience",
    rating: 4.7,
    students: 1050,
    skills: ["AWS", "Docker", "Linux", "CI/CD"],
    bio: "Vikram has run infrastructure for high-traffic platforms and teaches cloud through live provisioning labs rather than slides.",
    courses: ["Cloud Computing"],
    slots: ["Wed — 7:30 PM", "Sat — 2:00 PM"],
    accent: "from-sky-500 to-teal-500",
  },
  {
    id: "meera-iyer",
    name: "Meera Iyer",
    role: "Cyber Security Trainer",
    experience: "6+ Years Experience",
    rating: 4.8,
    students: 620,
    skills: ["Networking", "Linux", "Web Security", "SOC"],
    bio: "Meera comes from a security operations background and runs isolated lab environments so students learn defensive skills safely and responsibly.",
    courses: ["Cyber Security"],
    slots: ["Tue — 8:00 PM", "Sun — 3:00 PM"],
    accent: "from-emerald-500 to-cyan-500",
  },
  {
    id: "arjun-desai",
    name: "Arjun Desai",
    role: "Java & Backend Trainer",
    experience: "9+ Years Experience",
    rating: 4.8,
    students: 1380,
    skills: ["Java", "Spring", "SQL", "System Design"],
    bio: "Arjun has mentored hundreds of graduates into their first engineering role. His sessions emphasise clean design and interview-grade problem solving.",
    courses: ["Java Programming", "Full Stack Development"],
    slots: ["Mon & Thu — 7:00 PM", "Sat — 11:30 AM"],
    accent: "from-amber-500 to-orange-500",
  },
];

export const getTrainer = (id: string) => trainers.find((t) => t.id === id);

export type BatchMode = "Online" | "Offline" | "Hybrid";

export interface Batch {
  id: string;
  course: string;
  courseSlug: string;
  startDate: string;
  time: string;
  duration: string;
  mode: BatchMode;
  trainer: string;
  seats: number;
}

export const batches: Batch[] = [
  { id: "B-101", course: "Python Programming", courseSlug: "python-programming", startDate: "August 15, 2026", time: "6:00 PM", duration: "8 Weeks", mode: "Online", trainer: "Priya Sharma", seats: 12 },
  { id: "B-102", course: "Full Stack Development", courseSlug: "full-stack-development", startDate: "August 18, 2026", time: "7:30 PM", duration: "12 Weeks", mode: "Hybrid", trainer: "Arjun Desai", seats: 8 },
  { id: "B-103", course: "Data Analytics", courseSlug: "data-analytics", startDate: "August 22, 2026", time: "10:00 AM", duration: "10 Weeks", mode: "Offline", trainer: "Rahul Kumar", seats: 15 },
  { id: "B-104", course: "AI & Machine Learning", courseSlug: "ai-machine-learning", startDate: "September 1, 2026", time: "8:00 PM", duration: "12 Weeks", mode: "Online", trainer: "Ananya Rao", seats: 6 },
  { id: "B-105", course: "Cloud Computing", courseSlug: "cloud-computing", startDate: "September 5, 2026", time: "7:00 PM", duration: "8 Weeks", mode: "Online", trainer: "Vikram Nair", seats: 18 },
  { id: "B-106", course: "Cyber Security", courseSlug: "cyber-security", startDate: "September 9, 2026", time: "6:30 PM", duration: "10 Weeks", mode: "Hybrid", trainer: "Meera Iyer", seats: 10 },
  { id: "B-107", course: "Power BI", courseSlug: "power-bi", startDate: "September 14, 2026", time: "11:00 AM", duration: "6 Weeks", mode: "Offline", trainer: "Rahul Kumar", seats: 14 },
  { id: "B-108", course: "Java Programming", courseSlug: "java-programming", startDate: "September 20, 2026", time: "7:00 PM", duration: "8 Weeks", mode: "Online", trainer: "Arjun Desai", seats: 20 },
];

export interface Testimonial {
  name: string;
  course: string;
  rating: number;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  { name: "Sneha Patil", course: "Python Programming", rating: 5, quote: "CodeVista helped me understand programming concepts through practical projects.", initials: "SP" },
  { name: "Aditya Menon", course: "Full Stack Development", rating: 5, quote: "The weekly code reviews changed how I write software. I finished with three deployed projects.", initials: "AM" },
  { name: "Fatima Sheikh", course: "Data Analytics", rating: 4.8, quote: "Every module used a real dataset, so the dashboard in my portfolio is genuinely mine.", initials: "FS" },
  { name: "Karan Malhotra", course: "AI & Machine Learning", rating: 5, quote: "The trainer insisted on honest evaluation. That habit came up in every interview I attended.", initials: "KM" },
  { name: "Divya Ramesh", course: "Power BI", rating: 4.9, quote: "Six weeks in and I was building reports my team actually uses at work.", initials: "DR" },
  { name: "Nikhil Verma", course: "Cyber Security", rating: 4.8, quote: "Lab-based sessions made networking and Linux finally click for me.", initials: "NV" },
];

export interface CertificateRecord {
  id: string;
  student: string;
  course: string;
  completed: string;
  grade: string;
}

export const certificateRecords: CertificateRecord[] = [
  { id: "CV-2026-001", student: "Sneha Patil", course: "Python Programming", completed: "12 March 2026", grade: "A" },
  { id: "CV-2026-002", student: "Aditya Menon", course: "Full Stack Development", completed: "28 April 2026", grade: "A+" },
  { id: "CV-2026-003", student: "Fatima Sheikh", course: "Data Analytics", completed: "05 May 2026", grade: "A" },
  { id: "CV-2026-004", student: "Karan Malhotra", course: "AI & Machine Learning", completed: "19 June 2026", grade: "A+" },
  { id: "CV-2026-005", student: "Divya Ramesh", course: "Power BI", completed: "02 July 2026", grade: "A" },
];

export const contactInfo = {
  address: "3rd Floor, Nexus Tech Park, MG Road, Bengaluru 560001",
  phone: "+91 98765 43210",
  email: "hello@codevista.academy",
  hours: "Mon – Sat, 9:00 AM – 8:00 PM",
};

export const faqs = [
  { q: "What courses do you offer?", a: "We run eight technical programmes across programming, web development, data, AI & ML, cloud, cyber security and business intelligence." },
  { q: "Are online classes available?", a: "Yes. Every batch runs in online, offline or hybrid mode, and recordings are shared with enrolled students." },
  { q: "Do you provide certificates?", a: "Students who complete an eligible course, its capstone project and the final assessment receive a verifiable certificate of completion." },
  { q: "How can I reserve a seat?", a: "Open the Batches page, choose an upcoming batch and use Reserve Seat. You will get an instant confirmation." },
  { q: "Do you provide placement assistance?", a: "Yes — resume building, mock interviews, aptitude practice and portfolio reviews are included as career support." },
  { q: "What are the course durations?", a: "Courses run from 6 to 12 weeks depending on the programme, with 4–6 hours of live instruction per week." },
];