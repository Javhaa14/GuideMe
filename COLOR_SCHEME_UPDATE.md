# Color Scheme Update - Gray, Water Blue, White

## Overview

Updated the entire GuideMe application to use a consistent color palette of gray, water blue, and white colors across all pages and components.

## Color Palette

### Primary Colors (Water Blue)

- **Primary**: `#0ea5e9` - Main water blue for buttons, links, and accents
- **Primary-50**: `#f0f9ff` - Very light water blue
- **Primary-100**: `#e0f2fe` - Light water blue
- **Primary-200**: `#bae6fd` - Lighter water blue
- **Primary-300**: `#7dd3fc` - Light water blue
- **Primary-400**: `#38bdf8` - Medium water blue
- **Primary-500**: `#0ea5e9` - Water blue (main)
- **Primary-600**: `#0284c7` - Darker water blue
- **Primary-700**: `#0369a1` - Dark water blue
- **Primary-800**: `#075985` - Darker water blue
- **Primary-900**: `#0c4a6e` - Darkest water blue
- **Primary-950**: `#082f49` - Very dark water blue

### Secondary Colors (Gray)

- **Secondary**: `#64748b` - Main gray
- **Secondary-50**: `#f8fafc` - Very light gray
- **Secondary-100**: `#f1f5f9` - Light gray
- **Secondary-200**: `#e2e8f0` - Lighter gray
- **Secondary-300**: `#cbd5e1` - Light gray
- **Secondary-400**: `#94a3b8` - Medium gray
- **Secondary-500**: `#64748b` - Gray (main)
- **Secondary-600**: `#475569` - Darker gray
- **Secondary-700**: `#334155` - Dark gray
- **Secondary-800**: `#1e293b` - Darker gray
- **Secondary-900**: `#0f172a` - Darkest gray
- **Secondary-950**: `#020617` - Very dark gray

### Background Colors

- **Background**: `#ffffff` - Pure white
- **Card**: `#ffffff` - White cards
- **Muted**: `#f1f5f9` - Light gray for subtle backgrounds

### Text Colors

- **Foreground**: `#0f172a` - Dark gray for main text
- **Muted-foreground**: `#64748b` - Medium gray for secondary text

## Files Updated

### 1. Tailwind Configuration

- **File**: `front/tailwind.config.ts`
- **Changes**: Updated color definitions to use the new gray, water blue, white palette

### 2. Global CSS

- **File**: `front/app/globals.css`
- **Changes**: Updated CSS custom properties for both light and dark modes

### 3. Components Updated

- **Navigation**: Updated button colors and text colors
- **GuideCards**: Updated background, text, and accent colors
- **GuideProfile**: Updated card backgrounds and text colors
- **Gprofile**: Updated form elements and accent colors
- **InfiniteMovingCards**: Updated border and text colors
- **Guidesinfo Page**: Updated background colors

## Key Changes Made

1. **Replaced all hardcoded colors** with semantic color tokens
2. **Updated button styles** to use primary water blue
3. **Updated text colors** to use foreground and muted-foreground
4. **Updated background colors** to use background and card tokens
5. **Updated border colors** to use border token
6. **Updated accent colors** to use primary water blue
7. **Maintained consistency** across light and dark modes

## Benefits

1. **Consistent Design**: All pages now use the same color palette
2. **Maintainable**: Easy to update colors globally by changing CSS variables
3. **Accessible**: Proper contrast ratios maintained
4. **Professional**: Clean, modern appearance with gray, water blue, and white
5. **Scalable**: Easy to add new components with consistent colors

## Usage Examples

```tsx
// Primary button
<Button className="bg-primary hover:bg-primary-600 text-white">

// Secondary text
<p className="text-muted-foreground">

// Card background
<div className="bg-card border border-border">

// Accent color
<span className="text-primary">
```

## Testing

The development server has been started to test the color consistency across all pages. All components should now display with the unified gray, water blue, and white color scheme.
