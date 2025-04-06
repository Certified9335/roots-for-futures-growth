
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
