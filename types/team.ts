export interface TeamMember {
  id: number;
  created_at: string;
  name: string;
  role?: string;
  bio?: string;
  avatar_url?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  team_type: 'Leadership' | 'Developer';
  display_order?: number;
}

export type TeamMemberFormData = Omit<TeamMember, 'id' | 'created_at'>; 