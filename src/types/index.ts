export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Tree {
  id: string;
  name: string;
  species: string;
  description?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  height_cm?: number;
  planting_date: string;
  image_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface TreeLike {
  id: string;
  tree_id: string;
  user_id: string;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  post_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Sponsorship {
  id: string;
  user_id?: string;
  sponsor_name: string;
  sponsor_email: string;
  sponsor_type: string;
  tree_species: string;
  tree_location: string;
  amount: number;
  payment_status?: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export type SponsorshipFormData = Omit<Sponsorship, 'id' | 'created_at' | 'updated_at' | 'payment_status' | 'payment_method'>;
