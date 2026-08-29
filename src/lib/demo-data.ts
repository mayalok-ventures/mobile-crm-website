export interface DemoLead {
  id: string;
  name: string;
  company: string;
  value: string;
  source: "Meta Ads" | "Website" | "WhatsApp" | "Google Ads" | "Referral";
  stage: "new" | "contacted" | "qualified" | "proposal" | "converted";
  assignedTo: string;
  avatar: string;
  timeAgo: string;
  score: number;
  phone: string;
}

export interface DemoAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  assignedLeads: number;
  contactedCount: number;
  dealsWon: number;
  conversionRate: string;
  avgResponseTime: string;
  status: "active" | "in-call" | "offline";
}

export const DEMO_DATA_NOTICE = "Interactive demo data — for visualization only";

export const initialKanbanLeads: DemoLead[] = [
  {
    id: "lead-101",
    name: "Vikram Mehta",
    company: "Apex Tech Labs",
    value: "₹1,80,000",
    source: "Meta Ads",
    stage: "new",
    assignedTo: "Sarah Jenkins",
    avatar: "VM",
    timeAgo: "2 min ago",
    score: 94,
    phone: "+91 98765 43210",
  },
  {
    id: "lead-102",
    name: "Ananya Sharma",
    company: "Blue Horizon Media",
    value: "₹3,20,000",
    source: "Website",
    stage: "contacted",
    assignedTo: "Rahul Verma",
    avatar: "AS",
    timeAgo: "14 min ago",
    score: 88,
    phone: "+91 98123 45678",
  },
  {
    id: "lead-103",
    name: "Karan Singhal",
    company: "Zenith Retail Infra",
    value: "₹5,50,000",
    source: "WhatsApp",
    stage: "qualified",
    assignedTo: "Sarah Jenkins",
    avatar: "KS",
    timeAgo: "1 hour ago",
    score: 96,
    phone: "+91 99887 76655",
  },
  {
    id: "lead-104",
    name: "Pooja Hegde",
    company: "Nimbus Consulting",
    value: "₹2,40,000",
    source: "Google Ads",
    stage: "proposal",
    assignedTo: "Aditi Rao",
    avatar: "PH",
    timeAgo: "3 hours ago",
    score: 82,
    phone: "+91 97654 32109",
  },
  {
    id: "lead-105",
    name: "Rohan Kapoor",
    company: "HyperScale Logistics",
    value: "₹7,20,000",
    source: "Meta Ads",
    stage: "converted",
    assignedTo: "Rahul Verma",
    avatar: "RK",
    timeAgo: "5 hours ago",
    score: 99,
    phone: "+91 98321 09876",
  },
];

export const demoAgents: DemoAgent[] = [
  {
    id: "agent-1",
    name: "Sarah Jenkins",
    role: "Senior Sales Exec",
    avatar: "SJ",
    assignedLeads: 42,
    contactedCount: 39,
    dealsWon: 11,
    conversionRate: "26.2%",
    avgResponseTime: "1.4m",
    status: "active",
  },
  {
    id: "agent-2",
    name: "Rahul Verma",
    role: "Inbound Closer",
    avatar: "RV",
    assignedLeads: 38,
    contactedCount: 36,
    dealsWon: 9,
    conversionRate: "23.7%",
    avgResponseTime: "2.1m",
    status: "in-call",
  },
  {
    id: "agent-3",
    name: "Aditi Rao",
    role: "Growth Specialist",
    avatar: "AR",
    assignedLeads: 31,
    contactedCount: 29,
    dealsWon: 7,
    conversionRate: "22.5%",
    avgResponseTime: "1.8m",
    status: "active",
  },
];

export const demoAnalyticsData = {
  summary: {
    totalPipelineValue: "₹48.6L",
    activeDeals: 124,
    leadVelocity: "+34%",
    avgCloseCycle: "6.2 days",
  },
  sources: [
    { name: "Meta Lead Ads", percentage: 46, leads: 210, color: "#00F0FF" },
    { name: "WhatsApp Chatbot", percentage: 28, leads: 128, color: "#25D366" },
    { name: "Website Contact", percentage: 18, leads: 82, color: "#8A2BE2" },
    { name: "Google & Organic", percentage: 8, leads: 36, color: "#F59E0B" },
  ],
  recentActivity: [
    { text: "Meta lead 'Apex Tech Labs' auto-assigned to Sarah", time: "Just now", type: "assignment" },
    { text: "WhatsApp template 'Follow-up #1' sent to Ananya S.", time: "3m ago", type: "outreach" },
    { text: "Deal 'HyperScale Logistics' moved to Converted (₹7.2L)", time: "18m ago", type: "deal" },
    { text: "Rahul V. scheduled demo with 'Zenith Retail'", time: "42m ago", type: "calendar" },
  ],
};
