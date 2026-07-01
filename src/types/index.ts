export interface Artwork {
  id: string;
  title: string;
  category: string;
  medium: string;
  year: string;
  dimensions: string;
  imageUrl: string;
  thumbUrl: string;
  desc: string;
  artistsNote?: string;
  featured: boolean;
  order: number;
  collectionId?: string;
  available?: boolean;
  price?: number;
  instagramUrl?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  artworkIds: string[];
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface ArtistInfo {
  name: string;
  bio: string;
  statement: string;
  portrait: string;
  cv: {
    education: string[];
    exhibitions: Exhibition[];
    awards: Award[];
    publications: string[];
  };
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  type: 'solo' | 'group' | 'fair';
  description?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'email' | 'website';
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  studioAddress?: string;
  location: string;
}

export interface SEOData {
  title: string;
  description: string;
  ogImage: string;
  canonicalUrl: string;
  structuredData?: Record<string, unknown>;
}

export interface PageContent {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  seo: SEOData;
  behindTheScenes: BehindTheScenesContent;
}

export interface BehindTheScenesContent {
  title: string;
  subtitle: string;
  instagramUrl: string;
  items: BehindTheScenesItem[];
}

export interface BehindTheScenesItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
  instagramUrl: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  featuredArtworkId: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutContent {
  biography: string;
  statement: string;
  timeline: TimelineEvent[];
  stats: Stat[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: string;
  image?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface ContactContent {
  studioInfo: {
    address: string;
    hours: string;
    phone: string;
    email: string;
  };
  socialLinks: SocialLink[];
  formFields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
}

export interface SessionData {
  userId: string;
  role: string;
  expiresAt: number;
}