import type { ArtistInfo, SocialLink, ContactInfo, SEOData, PageContent } from '@/types';

export const artistInfo: ArtistInfo = {
  name: 'Ushaswi Potlapally',
  bio: `Art has been my constant companion since childhood—sketching in the margins of notebooks, experimenting with colors from my first watercolor set, and never quite outgrowing the wonder of making something from nothing.

My practice spans traditional painting (acrylic, watercolor, oil), detailed graphite and charcoal portraiture, and a world of handmade crafts—macramé wall hangings, miniature polymer clay sculptures, pressed flower art, and functional ceramic pieces. Each medium teaches me something different about patience, material, and the joy of tactile creation.

I'm deeply drawn to traditional techniques but love experimenting—mixing gold leaf with acrylic, embedding dried flowers in resin, or combining digital sketching with hand-rendered finals. The boundaries between "fine art" and "craft" feel arbitrary to me; both require vision, skill, and heart.

Every piece I make carries a story—sometimes whispered, sometimes shouted. I create to remember, to process, and to share moments of beauty found in ordinary things.`,
  statement: `"Art is not what you see, but what you make others see. The canvas is a mirror, and every viewer brings their own reflection." — Ushaswi Potlapally, Studio Journal, 2024`,
  portrait: '/images/artist-portrait.jpg',
  cv: {
    education: [
      'Self-taught artist with 5+ years of dedicated practice',
      'Workshops in traditional watercolor techniques',
      'Ceramics study with master potters in Kerala',
      'Macramé and fiber arts apprenticeship',
    ],
    exhibitions: [
      {
        id: 'exh-1',
        title: 'Emerging Voices',
        venue: 'Contemporary Art Gallery',
        location: 'Mumbai, India',
        date: '2024',
        type: 'group',
        description: 'Group exhibition featuring 12 emerging Indian artists working across mediums.',
      },
      {
        id: 'exh-2',
        title: 'Intimate Scale',
        venue: 'Studio Space',
        location: 'Bangalore, India',
        date: '2023',
        type: 'solo',
        description: 'First solo exhibition showcasing miniature sculptures and works on paper.',
      },
      {
        id: 'exh-3',
        title: 'Craft Contemporary',
        venue: 'Design Museum',
        location: 'Delhi, India',
        date: '2023',
        type: 'group',
        description: 'Curated exhibition exploring the intersection of traditional craft and contemporary art.',
      },
    ],
    awards: [
      {
        id: 'awd-1',
        title: 'Emerging Artist Grant',
        organization: 'India Foundation for the Arts',
        year: '2024',
        description: 'Awarded for innovative work combining traditional craft with contemporary practice.',
      },
      {
        id: 'awd-2',
        title: 'Best Portfolio Award',
        organization: 'Art Students League',
        year: '2022',
      },
    ],
    publications: [
      'Featured in "Contemporary Indian Craft" magazine, 2024',
      'Interview in "Studio Visit" podcast, Episode 47, 2023',
      'Work featured in "The Art of Making" online publication, 2023',
    ],
  },
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/ushaswi_014', label: 'Instagram' },
    { platform: 'email', url: 'mailto:hello@ushaswi.art', label: 'Email' },
  ],
  contactInfo: {
    email: 'hello@ushaswi.art',
    location: 'Bangalore, India',
    studioAddress: 'Available for studio visits by appointment',
  },
};

export const siteConfig: SEOData = {
  title: 'Ushaswi Potlapally — Artist',
  description: 'Artist portfolio featuring paintings, sketches, portraits, watercolors, acrylics, DIY crafts, and handmade decor. Explore original artworks and commission inquiries.',
  ogImage: '/images/og-image.jpg',
  canonicalUrl: 'https://ushaswi.art',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ushaswi Potlapally',
    url: 'https://ushaswi.art',
    image: 'https://ushaswi.art/images/og-image.jpg',
    sameAs: [
      'https://instagram.com/ushaswi_014',
    ],
    jobTitle: 'Artist',
    worksFor: {
      '@type': 'Organization',
      name: 'Ushaswi Potlapally Studio',
    },
    knowsAbout: ['Painting', 'Drawing', 'Ceramics', 'Macramé', 'Miniature Sculpture', 'Resin Art'],
  },
};

export const pageContent: PageContent = {
  hero: {
    headline: 'Ushaswi Potlapally',
    subheadline: 'Artist • Painter • Storyteller',
      featuredArtworkId: 'mock_post_0',
    ctaPrimary: { label: 'Explore Gallery', href: '/gallery' },
    ctaSecondary: { label: 'View Featured', href: '/gallery?collection=featured' },
  },
  about: {
    biography: artistInfo.bio,
    statement: artistInfo.statement,
    timeline: [
      {
        year: '2019',
        title: 'First Sketchbook',
        description: 'Picked up a sketchbook again after years. Daily drawing practice began—one page a day, no pressure, just play.',
        category: 'Sketches',
      },
      {
        year: '2020',
        title: 'Discovering Watercolor',
        description: 'First watercolor set. The unpredictability of pigment and water became an obsession. Hundreds of studies later, still learning.',
        category: 'Traditional Art',
      },
      {
        year: '2021',
        title: 'Acrylic & Canvas',
        description: 'Scaled up to canvas. Oil-like richness with acrylic speed. First large floral pieces and abstract landscapes emerged.',
        category: 'Paintings',
      },
      {
        year: '2022',
        title: 'Craft Renaissance',
        description: 'Macramé, polymer clay, pressed flowers—hands needed more than brushes. Functional art entered the practice.',
        category: 'DIY Crafts',
      },
      {
        year: '2023',
        title: 'Portraiture & People',
        description: 'Returned to drawing faces. Graphite and charcoal portraits of loved ones. Capturing essence became the new challenge.',
        category: 'Portraits',
      },
      {
        year: '2024',
        title: 'Resin & Mixed Media',
        description: 'Preserving real flowers in resin. Combining painting with dimensional elements. The practice expands in unexpected directions.',
        category: 'Handmade Decor',
      },
    ],
    stats: [
      { label: 'Artworks Created', value: '100+', icon: 'palette' },
      { label: 'Years Creating', value: '5+', icon: 'award' },
      { label: 'Mediums Explored', value: '8', icon: 'layers' },
      { label: 'Exhibitions', value: '3', icon: 'gallery' },
    ],
  },
  contact: {
    studioInfo: {
      address: artistInfo.contactInfo.studioAddress || 'Bangalore, India',
      hours: 'By appointment only',
        phone: 'Available on request',
      email: artistInfo.contactInfo.email,
    },
    socialLinks: artistInfo.socialLinks,
    formFields: [
      { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'John Doe' },
      { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
      { name: 'subject', label: 'Subject', type: 'select', required: true, options: ['Commission Inquiry', 'Collaboration', 'Artwork Purchase', 'Exhibition Opportunity', 'Press & Media', 'Other'] },
      { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell me about your project, idea, or just say hello...' },
    ],
  },
  seo: siteConfig,
  behindTheScenes: {
    title: 'Process in Motion',
    subtitle: 'Real-time and time-lapse glimpses into the studio—messy, meditative, and magical moments.',
    instagramUrl: 'https://instagram.com/ushaswi_014/reels',
    items: [
      { 
        id: 'bts-1', 
        title: 'Morning Sketch Routine', 
        description: '30 minutes of graphite before coffee. No reference, just muscle memory and whatever\'s on my mind.', 
        duration: '1:24', 
        thumbnail: '/images/sunset-meadow.jpg', 
        category: 'Process',
        instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
      },
      { 
        id: 'bts-2', 
        title: 'Watercolor Wet-on-Wet', 
        description: 'Letting pigment flow and bloom. The paper does half the work—you just guide the water.', 
        duration: '2:10', 
        thumbnail: '/images/pencil-portrait-study.jpg', 
        category: 'Technique',
        instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
      },
      { 
        id: 'bts-3', 
        title: 'Macramé Knot by Knot', 
        description: 'Hours of repetitive knotting become meditation. Square knots, spiral knots, gathering knots—rhythm in rope.', 
        duration: '3:45', 
        thumbnail: '/images/watercolor-dreamscape.jpg', 
        category: 'Craft',
        instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
      },
      { 
        id: 'bts-4', 
        title: 'Miniature Sculpting', 
        description: 'Tiny tools, infinite patience. A mushroom cap no bigger than a fingernail, gills carved one by one.', 
        duration: '2:30', 
        thumbnail: '/images/diy-macrame-wall.jpg', 
        category: 'Detail',
        instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
      },
      { 
        id: 'bts-5', 
        title: 'Pressed Flower Process', 
        description: 'Weeks of pressing, careful arrangement, resin mixing. Preserving a moment of spring forever.', 
        duration: '1:55', 
        thumbnail: '/images/mini-clay-collection.jpg', 
        category: 'Nature',
        instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
      },
      { 
        id: 'bts-6', 
        title: 'Canvas Layering Time-lapse', 
        description: 'From stained underpainting to final highlights. Six hours compressed—color building, form emerging.', 
        duration: '0:45', 
        thumbnail: '/images/handmade-ceramic-vase.jpg', 
        category: 'Painting',
        instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
      }
    ]
  }
};