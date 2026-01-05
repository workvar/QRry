export interface CreateStep {
  id: string;
  title: string;
  description: string;
  path: string;
  flag?: string;
}

export const CREATE_STEPS: CreateStep[] = [
  { 
    id: 'url', 
    title: 'Content', 
    description: 'Enter the destination link', 
    path: '/create/content' 
  },
  { 
    id: 'logo', 
    title: 'Branding', 
    description: 'Add your identity asset', 
    flag: 'ENABLE_BRANDING_STEP', 
    path: '/create/branding' 
  },
  { 
    id: 'style', 
    title: 'Design', 
    description: 'Refine visual aesthetics', 
    path: '/create/design' 
  },
];
