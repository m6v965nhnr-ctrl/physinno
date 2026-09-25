import type { User } from "@supabase/supabase-js";

// DBのテーブル定義に対応する型（公開プロフィール・投稿・レビュー）
export type AuthUser = User;

export type PtProfile = {
  id: string;
  user_id: string | null;
  full_name: string | null;
  profile_image: string | null;
  cover_image: string | null;
  id_photo: string | null;
  biography: string | null;
  workplace: string | null;
  department: string | null;
  prefecture: string | null;
  city: string | null;
  experience_years: number | null;
  specialty: string | null;
  qualification: string | null;
  education: string | null;
  birthplace: string | null;
  birth_date: string | null;
  hometown: string | null;
  languages: string | null;
  language: string | null;
  contact: string | null;
  strengths: string | null;
  interests: string | null;
  rating: number | null;
  review_count: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Review = {
  id: string;
  pt_id: string | null;
  user_id: string | null;
  rating: number | null;
  comment: string | null;
  reviewer_type: string | null;
  is_anonymous: boolean;
  created_at: string | null;
};

export type Post = {
  id: string;
  user_id: string;
  post_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  video_url: string | null;
  media_url: string | null;
  like_count: number | null;
  comment_count: number | null;
  case_category: string | null;
  case_title: string | null;
  disease_category: string | null;
  reference_url: string | null;
  conference_name: string | null;
  achieved_on: string | null;
  is_public: boolean;
  details: Record<string, unknown>;
  created_at: string | null;
  updated_at: string | null;
};
