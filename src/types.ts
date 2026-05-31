export type AppTab = 'home' | 'dashboard' | 'careers' | 'test' | 'jobs' | 'institutions';

export interface UserProfile {
  name: string;
  email: string;
  targetRole: string;
  profileStrength: number;
  completedTestsCount: number;
  activeJobsCount: number;
  recentActivity: ActivityLog[];
  appliedJobIds: string[];
  bookmarkedJobIds: string[];
  bookmarkedCareerIds: string[];
}

export interface ActivityLog {
  id: string;
  type: 'test_completed' | 'career_viewed' | 'goal_updated' | 'job_applied';
  title: string;
  description: string;
  timestamp: string;
  badge?: {
    text: string;
    type: 'success' | 'info' | 'default';
  };
}

export interface CareerPath {
  id: string;
  title: string;
  field: 'Tech' | 'Healthcare' | 'Finance' | 'Finance & Law';
  description: string;
  avgSalary: string;
  salaryNum: number;
  image: string;
  education: string;
  matchScore?: number;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  type: 'Full-time' | 'Remote' | 'Contract' | 'Part-time';
  matchScore: number;
  tags: string[];
  salaryMin: number;
  salaryMax: number;
  salaryStr: string;
  postedTime: string;
  logoUrl: string;
}

export interface Institution {
  id: string;
  name: string;
  location: string;
  rating: number;
  tuition: number;
  tuitionStr: string;
  tags: string[];
  matchScore: number;
  image: string;
  coords: { x: number; y: number }; // Percentage coords on screen plot
  iconType: 'school' | 'account_balance' | 'architecture';
}

export interface QuizQuestion {
  id: number;
  questionStr: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}
