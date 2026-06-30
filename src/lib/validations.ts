import { z } from 'zod';

export const artworkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  category: z.string().min(1, 'Category is required'),
  medium: z.string().min(1, 'Medium is required').max(100),
  year: z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
  dimensions: z.string().min(1, 'Dimensions are required').max(50),
  desc: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  artistsNote: z.string().max(1000).optional(),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  price: z.number().positive().optional(),
  collectionId: z.string().optional(),
});

export const collectionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  artworkIds: z.array(z.string()).default([]),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  slug: z.string().min(1, 'Slug is required').max(50),
  description: z.string().max(500).optional(),
  order: z.number().int().nonnegative().default(0),
});

export const artistInfoSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().min(10).max(5000),
  statement: z.string().min(10).max(2000),
  portrait: z.string().url().optional().or(z.literal('')),
  cv: z.object({
    education: z.array(z.string()),
    exhibitions: z.array(z.object({
      id: z.string(),
      title: z.string(),
      venue: z.string(),
      location: z.string(),
      date: z.string(),
      type: z.enum(['solo', 'group', 'fair']),
      description: z.string().optional(),
    })),
    awards: z.array(z.object({
      id: z.string(),
      title: z.string(),
      organization: z.string(),
      year: z.string(),
      description: z.string().optional(),
    })),
    publications: z.array(z.string()),
  }),
  socialLinks: z.array(z.object({
    platform: z.enum(['instagram', 'twitter', 'facebook', 'linkedin', 'email', 'website']),
    url: z.string().url().or(z.literal('')),
    label: z.string(),
  })),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    studioAddress: z.string().optional(),
    location: z.string(),
  }),
});

export const pageContentSchema = z.object({
  hero: z.object({
    headline: z.string().min(1).max(100),
    subheadline: z.string().min(1).max(200),
    featuredArtworkId: z.string(),
    ctaPrimary: z.object({ label: z.string(), href: z.string() }),
    ctaSecondary: z.object({ label: z.string(), href: z.string() }),
  }),
  about: z.object({
    biography: z.string().min(10).max(5000),
    statement: z.string().min(10).max(2000),
    timeline: z.array(z.object({
      year: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      image: z.string().optional(),
    })),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string(),
      icon: z.string(),
    })),
  }),
  contact: z.object({
    studioInfo: z.object({
      address: z.string(),
      hours: z.string(),
      phone: z.string(),
      email: z.string().email(),
    }),
    socialLinks: z.array(z.object({
      platform: z.enum(['instagram', 'twitter', 'facebook', 'linkedin', 'email', 'website']),
      url: z.string().url().or(z.literal('')),
      label: z.string(),
    })),
    formFields: z.array(z.object({
      name: z.string(),
      label: z.string(),
      type: z.enum(['text', 'email', 'textarea', 'select']),
      required: z.boolean(),
      placeholder: z.string().optional(),
      options: z.array(z.string()).optional(),
    })),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().url(),
    canonicalUrl: z.string().url(),
    structuredData: z.record(z.unknown()).optional(),
  }),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

export type ArtworkInput = z.infer<typeof artworkSchema>;
export type CollectionInput = z.infer<typeof collectionSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type ArtistInfoInput = z.infer<typeof artistInfoSchema>;
export type PageContentInput = z.infer<typeof pageContentSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;