// Complete architecture for Job Application Tracker

export interface Template {
  id: string;
  name: string;
  type: 'design' | 'dev' | 'business' | 'custom';
  icon: string;
  color: string;
  
  content: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    summary: string;
    experience: string;
    education: string;
    skills: string;
  };
  
  createdAt: number;
  lastModified: number;
  usageCount: number; // How many times used
  successRate: number; // Interview rate
}

export interface CVVersion {
  id: string;
  version: number;
  content: string; // Generated CV text
  generatedBy: 'ai' | 'manual';
  createdAt: number;
  modifiedAt?: number;
}

export interface CoverLetter {
  id: string;
  content: string;
  generatedAt: number;
  modifiedAt?: number;
}

export type ApplicationStatus = 
  | 'draft' 
  | 'sent' 
  | 'waiting'
  | 'interview' 
  | 'offer' 
  | 'rejected' 
  | 'accepted' 
  | 'archived';

export type SentVia = 
  | 'indeed' 
  | 'linkedin' 
  | 'email' 
  | 'company_site' 
  | 'other';

export type InterviewType = 
  | 'phone' 
  | 'video' 
  | 'onsite';

export interface InterviewInfo {
  date: number;
  type: InterviewType;
  interviewer?: string;
  location?: string;
  notes?: string;
}

export interface OutcomeInfo {
  type: 'offer' | 'rejected';
  date: number;
  feedback?: string;
  salaryOffer?: string;
}

export interface ApplicationTracking {
  sentDate?: number;
  sentVia?: SentVia;
  followUpDates: number[];
  interviewScheduled?: InterviewInfo;
  outcome?: OutcomeInfo;
}

export interface StatusChange {
  status: ApplicationStatus;
  timestamp: number;
  note?: string;
}

export interface Application {
  id: string;
  
  // Job Info
  company: string;
  role: string;
  jobDescription: string;
  jobUrl?: string;
  
  // Template & Content
  selectedTemplateId?: string; // Optional - can be created from scratch
  cvVersions: CVVersion[];
  coverLetter?: CoverLetter;
  
  // Status & Timeline
  status: ApplicationStatus;
  statusHistory: StatusChange[];
  tracking: ApplicationTracking;
  
  // Dates
  createdAt: number;
  appliedAt?: number;
  
  // Notes
  notes: string;
  
  // Metadata
  tags: string[];
  isFavorite: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export interface DashboardStats {
  total: number;
  draft: number;
  sent: number;
  waiting: number;
  interview: number;
  offer: number;
  rejected: number;
  interviewRate: number; // percentage
  avgResponseTime: number; // days
}
