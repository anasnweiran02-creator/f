export enum BusinessType {
  CAFE = 'Café',
  RESTAURANT = 'Restaurant',
  BARBERSHOP = 'Barbershop',
  CLOTHING_STORE = 'Clothing Store',
  REAL_ESTATE = 'Real Estate',
  GYM = 'Gym/Fitness',
  OTHER = 'Other'
}

export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  FACEBOOK = 'Facebook'
}

export interface UserPreferences {
  businessName: string;
  businessType: BusinessType;
  niche: string; // e.g., "Specialty Coffee", "Luxury Homes"
  location: string;
  targetAudience: string;
}

export interface ContentDay {
  day: string;
  theme: string;
  postType: string; // Reel, Carousel, Image, Status
  contentIdea: string;
  captionEnglish: string;
  captionArabic: string;
  hashtags: string[];
  bestTime: string;
}

export interface GeneratedPlan {
  weekGoal: string;
  schedule: ContentDay[];
}
