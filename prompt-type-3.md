You are an award-winning UI/UX designer and senior full-stack Next.js engineer.

Your task is to transform this artist portfolio into an Awwwards-quality, production-ready website that feels like a premium digital art exhibition.

The website should be immersive, elegant, fast, responsive, and accessible. Every design decision should highlight the artwork as the primary focus.

========================================================
DESIGN DIRECTION
========================================================

Create a blend of:

• 70% Editorial Magazine
• 20% Modern Art Museum
• 10% Neo-Brutalism

Inspired by:
• Apple
• Framer
• Linear
• Aesop
• Active Theory
• Locomotive
• Awwwards-winning portfolio websites

Avoid template-like layouts.

========================================================
VISUAL STYLE
========================================================

• Large editorial typography
• Elegant serif headings
• Modern sans-serif body
• Spacious layouts
• Strong visual hierarchy
• Soft off-white background (#FAF8F5)
• Rich black typography
• Earth-tone accent colors
• Premium whitespace
• Beautiful grid composition
• Editorial layout
• Artwork always takes center stage

========================================================
HEADER
========================================================

Create a floating premium navigation.

Requirements:

• Glassmorphism
• backdrop-filter: blur(18px)
• Semi-transparent background
• Rounded corners
• Floating shadow
• Sticky navigation
• Shrinks smoothly while scrolling
• Active page indicator
• Smooth transitions
• Mobile animated menu
• Magnetic hover buttons

Navigation should feel like floating glass.

========================================================
HERO
========================================================

Create a cinematic hero.

Include:

• Large artist name
• Elegant introduction
• Featured artwork
• Layered composition
• Mouse parallax
• Soft lighting gradients
• Premium CTA buttons

========================================================
ANIMATIONS
========================================================

Use Framer Motion extensively.

Implement:

• Fade reveal
• Blur reveal
• Scale reveal
• Slide reveal
• Spring animations
• Staggered animations
• Shared layout transitions
• Smooth page transitions
• Scroll-triggered animations

Everything should feel premium.

Never over-animate.

========================================================
3D EXPERIENCE
========================================================

Create depth without WebGL.

Use:

• Perspective
• Mouse parallax
• Floating layers
• Soft shadows
• Glass overlays
• Dynamic lighting

Artwork cards should gently tilt with the cursor.

Maximum:

rotateX(6deg)
rotateY(8deg)

Return smoothly.

========================================================
GALLERY
========================================================

Premium exhibition layout.

Each artwork card includes:

• Artwork
• Title
• Medium
• Year
• Collection
• View Details

Hover:

• Slight zoom
• Lift
• 3D tilt
• Light sweep
• Border glow
• Elegant shadow
• Animated title

Gallery should resemble a luxury art exhibition.

========================================================
ABOUT
========================================================

Editorial split layout.

Include:

• Portrait
• Biography
• Artist Statement
• Timeline
• Awards
• Exhibitions
• Animated statistics

========================================================
CONTACT
========================================================

Glassmorphism contact card.

Include:

• Premium contact form
• Animated inputs
• Loading states
• Success animation
• Social media
• Studio information

========================================================
MICRO INTERACTIONS
========================================================

Buttons

• Lift
• Scale
• Shadow
• Ripple
• Spring easing

Links

• Animated underline
• Sliding arrow

Cards

• Perspective
• Glow
• Floating effect

Images

• Zoom
• Light sweep
• Brightness adjustment

========================================================
CURSOR
========================================================

Replace default cursor.

Custom cursor:

• Outer ring
• Inner dot
• Smooth interpolation
• Magnetic hover
• Expand over buttons
• Artwork interaction

Desktop only.

========================================================
SCROLL EXPERIENCE
========================================================

Create immersive scrolling.

Include:

• Parallax
• Layer movement
• Sticky storytelling sections
• Blur-to-sharp reveals
• Progressive animations

========================================================
THEME
========================================================

Support Light and Dark mode.

Dark mode should use:

• Deep charcoal
• Warm blacks
• Muted accent colors
• Premium glass surfaces

========================================================
RESPONSIVE
========================================================

Perfect experience on:

• Mobile
• Tablet
• Desktop

Animations should gracefully adapt to touch devices.

========================================================
PERFORMANCE
========================================================

Optimize aggressively.

Use:

• Next.js Image
• Lazy loading
• Dynamic imports
• Hardware acceleration
• transform
• opacity
• will-change

Maintain smooth 60 FPS.

========================================================
ACCESSIBILITY
========================================================

Support:

• Keyboard navigation
• Screen readers
• High contrast
• prefers-reduced-motion
• Semantic HTML

========================================================
SEO
========================================================

Implement:

• Dynamic metadata
• Open Graph
• Twitter cards
• robots.txt
• sitemap.xml
• Structured data
• Canonical URLs

========================================================
ADMIN PANEL
========================================================

Create a separate hidden admin panel.

Route:

/admin

The public website must NEVER expose editing functionality.

Authentication:

• Simple password authentication only.
• Do NOT use Google OAuth.
• Do NOT use Supabase Auth.
• Do NOT use Firebase Auth.
• Do NOT use NextAuth/Auth.js.
• Store the admin password securely in an environment variable.
• Validate passwords server-side only.
• Use secure HTTP-only session cookies.
• Protect all admin pages and API routes.
• Include logout functionality.
• Redirect unauthenticated users to the login page.

Admin Features:

Dashboard

• Overview
• Recent updates
• Quick actions

Artwork Management

• Add artworks
• Edit artworks
• Delete artworks
• Upload multiple images
• Drag-and-drop ordering
• Featured toggle
• Categories
• Medium
• Dimensions
• Year
• Description
• Availability

Collections

• Create
• Edit
• Delete
• Reorder

Website Content

Editable:

• Hero
• About
• Artist Statement
• Biography
• Awards
• Exhibitions
• Contact Information
• Social Links
• SEO Metadata

Media

• Drag-and-drop uploads
• Image preview
• Automatic optimization
• Alt text management

UX

• Autosave drafts
• Toast notifications
• Loading indicators
• Delete confirmation
• Error handling

========================================================
TECH STACK
========================================================

Use only:

• Next.js 15 (App Router)
• TypeScript
• Tailwind CSS
• Framer Motion
• React Hook Form
• Zod
• Lucide Icons

Keep the stack simple.

Avoid unnecessary external services.

Only introduce a database or cloud storage if absolutely necessary for content persistence.

========================================================
FINAL GOAL
========================================================

This should not feel like a typical portfolio website.

It should feel like a premium digital art exhibition where every interaction communicates craftsmanship, elegance, and attention to detail.

The artwork must always remain the hero.

The codebase should be clean, scalable, maintainable, and production-ready, with thoughtful architecture, reusable components, and best practices throughout.
