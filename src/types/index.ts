export interface Certificate {
  id: number;
  title: string;
  image: string;
  verifyUrl: string;
  issuer: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface TimelineItem {
  id: number;
  title: string;
  institution: string;
  period: string;
  grade: string;
  description: string;
}