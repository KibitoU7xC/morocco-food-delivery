---
name: Orders au Maroc
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e1'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fb'
  surface-container: '#efecf5'
  surface-container-high: '#eae7ef'
  surface-container-highest: '#e4e1ea'
  on-surface: '#1b1b21'
  on-surface-variant: '#504533'
  inverse-surface: '#303036'
  inverse-on-surface: '#f2eff8'
  outline: '#827560'
  outline-variant: '#d4c4ac'
  surface-tint: '#7b5800'
  primary: '#7b5800'
  on-primary: '#ffffff'
  primary-container: '#f5b301'
  on-primary-container: '#654800'
  inverse-primary: '#febb14'
  secondary: '#5906e7'
  on-secondary: '#ffffff'
  secondary-container: '#723aff'
  on-secondary-container: '#ede4ff'
  tertiary: '#006d43'
  on-tertiary: '#ffffff'
  tertiary-container: '#4fd593'
  on-tertiary-container: '#005936'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#febb14'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5d4200'
  secondary-fixed: '#e7deff'
  secondary-fixed-dim: '#cdbdff'
  on-secondary-fixed: '#20005f'
  on-secondary-fixed-variant: '#4f00d0'
  tertiary-fixed: '#78fbb6'
  tertiary-fixed-dim: '#59de9b'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005232'
  background: '#fbf8ff'
  on-background: '#1b1b21'
  surface-variant: '#e4e1ea'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style
This design system embodies an energetic, reliable, and hyper-convenient on-demand multi-service lifestyle ecosystem tailored for Morocco. Inspired by rapid delivery leaders like Swiggy, the aesthetic pairs the vibrancy of Moroccan saffron with regal violet accents to communicate speed, warmth, and trust across food delivery, rapid grocery, package couriering, and pharmacy needs.

The design movement is **Modern Tactile E-Commerce**:
- Clean surface hierarchy driven by soft layered cards and crisp off-white containers.
- Lively, appetite-inducing high-contrast visual cues with bold badges, punchy action buttons, and animated micro-states.
- High accessibility and bi-directional bilingual support (French and Arabic/RTL) with culturally attuned visual iconography and clear navigation pathways.

## Colors
The palette balances vibrant warmth with professional digital commerce authority:

- **Primary (`#F5B301`) — Saffron Gold:** Used for primary CTAs, delivery status highlights, active tab indicators, and promotional anchors. Signals appetite, speed, and Moroccan sunlight.
- **Secondary (`#5E17EB`) — Royal Violet:** Used for brand anchors, premium delivery badges, checkout guarantees, category brand highlights, and deep visual contrast.
- **Tertiary (`#00A86B`) — Fresh Jade:** Dedicated to quick grocery (Instamart freshness), healthy dietary tags, item stock availability, and verified pharmacy badges.
- **Neutral (`#1E1E24`) — Charcoal Black:** Delivers high-contrast typography, crisp icon strokes, and deep structural grounding, supported by warm sand tones (`#FBF9F4`) and pure card whites (`#FFFFFF`).
- **Surface & Canvas:** Canvas uses a soothing creamy off-white (`#FAFAFA` to `#F8F6F0`), preserving maximum pop for product photography and card tiles.

## Typography
Typographic rhythm relies on `Plus Jakarta Sans`, selected for its friendly geometric curves, tight rhythm at scale, and high readability in transactional interfaces.

- **Headlines:** Set in 700 and 800 weights with compact line-heights to deliver punchy restaurant names, dish titles, and promotional hero banners.
- **Body:** Kept balanced at 400 and 500 weights with generous line height for ingredients, delivery instructions, and merchant descriptions.
- **Labels & Badges:** Use bold/semi-bold uppercase or title-case styling with letter-spacing for delivery time chips (e.g. `20-30 MIN`), price tags (`MAD`), and discount labels.

## Layout & Spacing
A fluid 4-column layout on mobile scales to 8 columns on tablet and 12 columns on desktop web screens.

- **Mobile First Structure:** Base padding along outer viewports conforms strictly to a 16px (`1rem`) gutter, expanding to 24px–40px on wider screens.
- **Vertical Spacing Cadence:** 8px base micro-rhythm. Component interiors use `space-sm` (12px) to `space-md` (16px), while grouped modular banners and horizontal carousels stack using `space-xl` (24px).
- **Horizontal Carousels:** Category shortcuts and featured merchant rows bleed softly past the screen edge with a `16px` lead offset to indicate continuous horizontal scrollability.

## Elevation & Depth
Elevation mimics tangible layered cards with ambient, warm light:

- **Level 0 (Flat):** Neutral canvas surface (`#FAFAFA`).
- **Level 1 (Card Rest):** Background `#FFFFFF` with a warm subtle drop shadow: `0 2px 8px rgba(30, 30, 36, 0.04), 0 1px 2px rgba(245, 179, 1, 0.06)`. Border outline is an ultra-subtle border `1px solid rgba(30, 30, 36, 0.06)`.
- **Level 2 (Hover / Active Cards & Popups):** `0 8px 24px rgba(30, 30, 36, 0.08), 0 2px 6px rgba(245, 179, 1, 0.12)`. Used for active category tiles and floating restaurant item previews.
- **Level 3 (Sticky CTAs & Bottom Sheets):** `0 -4px 20px rgba(30, 30, 36, 0.1)`. Used for checkout bottom bars, cart summaries, and drawer overlays.

## Shapes
Shapes celebrate modern consumer friendliness with soft, approachable architecture:
- **Card Containers & Category Tiles:** Rounded with `16px` (`rounded-2xl`), offering ample corner sweep that frames high-quality food and product photography gracefully.
- **Action Buttons & Inputs:** Form elements, primary action bars, and language selectors employ `12px` to `16px` radiuses.
- **Pills & Chips:** Counter tags, delivery ETAs, and dietary badges leverage full pill radiuses (`rounded-full` / 9999px) to maintain distinct separation from square food cards.

## Components

### Buttons
- **Primary Button:** Background in rich saffron `#F5B301`, Charcoal `#1E1E24` or `#000000` text for maximum legibility, `rounded-2xl` height of 52px on mobile with bold 16px typography. Pressed state deepens to `#DF9F00`.
- **Secondary / Purple Action Button:** Deep royal purple `#5E17EB` with crisp `#FFFFFF` text, applied to high-priority promotions, express courier bookings, or primary loyalty actions.
- **Outline / Light Button:** Off-white background with a 1.5px stroke in `#E5E5EA` or `#5E17EB` for tertiary selection.

### Multi-Category Cards
- **Square Category Tiles (Food, Grocery, Courier, Pharmacy):** Rounded `2xl` white cards with soft saffron or violet glow on hover. Features clear 3D or flat illustrative imagery, bold category titles, and micro-subtitles (e.g., "15-25 min").
- **Merchant & Restaurant Listing Cards:** Dual horizontal or vertical card layouts. Features an image container with an embedded pill badge (`★ 4.8 (500+)` and `25 mins`), followed by merchant title, food genre, distance, and free delivery callouts.

### Input Fields & Search Bars
- **Floating Search:** White pill or `rounded-2xl` background, subtle grey border, magnifying glass icon, placeholder in muted slate (`#8E8E93`), and trailing microphone/filter icon in saffron yellow or violet.
- **Form Inputs:** 48px height, `rounded-xl`, subtle border (`#E5E5EA`), focusing to a distinct 2px ring in saffron gold (`#F5B301`).

### Chips & Badges
- **Delivery Badge:** Pill shaped, pale amber background (`#FEF7E6`) with saffron text (`#B87700`) and a clock/scooter icon.
- **Offer / Discount Tag:** Violet pill (`#F1EAFF`) with royal violet text (`#5E17EB`) and bold percentage labels (`50% OFF up to 30 MAD`).