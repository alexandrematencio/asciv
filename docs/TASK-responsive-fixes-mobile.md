# TASK: Responsive UI Fixes - Mobile (Samsung S21 FE)

> **Priority**: P0/P1
> **Device tested**: Samsung S21 FE (360px logical width), Chrome, Android
> **Date**: 2026-01-24

---

## Context

Three screens were audited on mobile and show critical responsive/brand issues that break usability and violate BRAND-IDENTITY.md guidelines.

**Screenshots reference**:
- Screen 1: Applications Dashboard (dark mode)
- Screen 2: Job Import Modal (dark mode)  
- Screen 3: CV Versions panel (light mode)

---

## Issues to Fix

### 🔴 PRIORITY 0 - Navigation & Layout Broken

#### Issue 1.1: Top Navigation Tabs Truncated

**Location**: Main navigation tabs (Applications / Matching)

**Problem**: 
- "Matching" text is cut off, showing "Matchg" or similar
- Target icon partially visible
- Touch target compromised

**Files likely involved**:
- `app/components/Navigation.tsx` or similar
- `app/components/BottomNav.tsx`
- Any component rendering the top tabs

**Fix required**:
```css
/* Ensure tabs don't truncate */
- Remove fixed width on tab container
- Use flex with min-width: 0 and flex-shrink: 0 on tab items
- Or implement horizontal scroll with snap on tabs
- Minimum touch target: 44x44px
```

**Acceptance criteria**:
- [ ] Both "Applications" and "Matching" fully visible on 360px screen
- [ ] Icons fully visible
- [ ] Touch targets ≥ 44px

---

#### Issue 2.1: Modal Toggle Tabs Truncated

**Location**: `JobImportModal.tsx` - Manual/Import toggle

**Problem**:
- "Import" is truncated to "Impo"
- Toggle doesn't fit viewport

**Files likely involved**:
- `app/components/jobs/JobImportModal.tsx`

**Fix required**:
```tsx
/* Toggle should use equal flex distribution */
<div className="flex w-full">
  <button className="flex-1 min-w-0 truncate">Manual</button>
  <button className="flex-1 min-w-0 truncate">Import</button>
</div>

/* Or shorter labels on mobile */
/* Or use icons + text with responsive hiding */
```

**Acceptance criteria**:
- [ ] Both "Manual" and "Import" fully readable
- [ ] Equal width distribution
- [ ] Works on 360px viewport

---

#### Issue 2.3: Modal Missing Horizontal Padding

**Location**: `JobImportModal.tsx`

**Problem**:
- Content touches screen edges (0px left padding visible)
- Form fields edge-to-edge = poor UX

**Fix required**:
```tsx
/* Add safe padding to modal content */
className="px-4 sm:px-6" /* 16px mobile, 24px desktop */
```

**Acceptance criteria**:
- [ ] Minimum 16px padding on left and right
- [ ] Form fields don't touch screen edges
- [ ] Consistent with other modals

---

#### Issue 3.3: CV Panel Not Covering Full View

**Location**: `CVDetailModal.tsx` or drawer component

**Problem**:
- Content from behind visible on right side (letters "N", "S", "P", "D", "CV")
- Panel/drawer doesn't cover full viewport on mobile

**Files likely involved**:
- `app/components/CVDetailModal.tsx`
- Any drawer/slide-panel component

**Fix required**:
```tsx
/* Mobile: full width drawer */
className="w-full sm:w-[480px] md:w-[600px]"

/* Or ensure backdrop covers + z-index correct */
```

**Acceptance criteria**:
- [ ] Panel covers 100% width on mobile
- [ ] No content visible behind
- [ ] Proper z-index layering

---

### 🔴 PRIORITY 1 - Brand Violations

#### Issue 1.3 & 3.1: Green Buttons Too Saturated

**Location**: 
- "Send" button on application cards
- "Create New Version" button in CV panel

**Problem**:
- Using bright green (#22C55E or #10B981 at full saturation)
- Violates BRAND-IDENTITY.md: "accents verts doux (#4CAF9B ou #10B981 mat)"
- Creates aggressive visual focal point

**Files likely involved**:
- `app/components/ApplicationCard.tsx` or similar
- `app/components/CVDetailModal.tsx`
- `tailwind.config.js` (if using custom colors)
- Global button components

**Fix required**:
```tsx
/* BEFORE - Too bright */
className="bg-green-500" /* #22C55E */
className="bg-emerald-500" /* #10B981 */

/* AFTER - Muted per brand */
className="bg-[#4CAF9B]" /* Preferred brand green */
/* OR */
className="bg-emerald-500/80" /* #10B981 at 80% opacity */
/* OR */
className="bg-emerald-600" /* Darker variant */
```

**Recommended brand-compliant greens**:
- Primary action: `#4CAF9B` (muted teal-green)
- Alternative: `#10B981` with `opacity: 0.8` or `brightness: 0.9`
- Hover: darken by 10%

**Acceptance criteria**:
- [ ] No #22C55E or bright #10B981 at full saturation
- [ ] All green CTAs use muted brand green
- [ ] Consistent across all buttons

---

#### Issue 2.2: Input Focus Border Purple/Blue

**Location**: `JobImportModal.tsx` - Company Name input

**Problem**:
- Focus state shows bright blue/purple border
- Looks like "AI vibe" gradient (forbidden)

**Files likely involved**:
- `app/components/jobs/JobImportModal.tsx`
- Global input styles in `globals.css` or Tailwind config

**Fix required**:
```tsx
/* BEFORE */
className="focus:border-blue-500 focus:ring-blue-500"

/* AFTER - Brand compliant */
className="focus:border-[#4A5F77] focus:ring-[#4A5F77]"
/* Or using brand green */
className="focus:border-[#4CAF9B] focus:ring-[#4CAF9B]/30"
```

**Acceptance criteria**:
- [ ] Focus border is bleu-gris (#4A5F77) or muted green (#4CAF9B)
- [ ] No bright blue or purple
- [ ] Consistent across all inputs in the app

---

#### Issue 3.4: Sparkles Icon on CTA

**Location**: "Create New Version" button

**Problem**:
- Uses ✨ sparkles icon suggesting "AI magic"
- Violates: "pas de celebratory micro-interactions"

**Fix required**:
```tsx
/* BEFORE */
<Sparkles className="w-4 h-4" />

/* AFTER - Neutral icon */
<Plus className="w-4 h-4" />
/* Or */
<FilePlus className="w-4 h-4" />
/* Or no icon at all */
```

**Acceptance criteria**:
- [ ] No sparkles/magic icons on standard actions
- [ ] Use neutral icons (Plus, FilePlus, Document)

---

### 🟡 PRIORITY 2 - Text Truncation

#### Issue 1.2: Application Cards Text Overflow

**Location**: Application list cards

**Problem**:
- Company names truncated without ellipsis
- Addresses cut off mid-word
- Badge text ("IN"?) partially visible

**Files likely involved**:
- `app/components/ApplicationCard.tsx`
- `app/components/jobs/JobOfferCard.tsx`

**Fix required**:
```tsx
/* Company name */
<h3 className="font-medium truncate">{company}</h3>

/* Address/location */
<span className="text-sm text-gray-500 truncate max-w-[200px]">
  {location}
</span>

/* Or use line-clamp for multi-line */
<p className="line-clamp-2">{description}</p>
```

**Acceptance criteria**:
- [ ] All text has proper truncation with ellipsis
- [ ] No mid-word cuts
- [ ] Badges fully visible or hidden (not partial)

---

### 🟡 PRIORITY 3 - Theme Consistency

#### Issue 3.2: Light/Dark Mode Inconsistency

**Location**: Global theme

**Problem**:
- Screens 1 & 2 are dark mode
- Screen 3 is light mode
- No apparent user control or system preference

**Investigation needed**:
- Is this intentional (modal = light, main = dark)?
- Is there a theme toggle?
- Should respect system preference?

**Recommendation**:
- Define dark mode as default
- Ensure all components support both themes
- Or: decide on single theme (dark recommended per premium feel)

**Acceptance criteria**:
- [ ] Consistent theme across all screens
- [ ] If dual theme: clear user control
- [ ] All components styled for chosen theme

---

## Files to Audit

Run these searches to find affected components:

```bash
# Find navigation components
grep -r "Matching\|Applications" app/components --include="*.tsx"

# Find modal components
ls -la app/components/*Modal*.tsx
ls -la app/components/jobs/*Modal*.tsx

# Find green color usage
grep -rn "green-500\|emerald-500\|#22C55E\|#10B981" app/ --include="*.tsx"

# Find focus styles
grep -rn "focus:border\|focus:ring" app/ --include="*.tsx"

# Find sparkles icon
grep -rn "Sparkles\|sparkles" app/ --include="*.tsx"
```

---

## Brand Reference (from BRAND-IDENTITY.md)

### Allowed Colors
- **Dominant**: Bleu-gris `#2F3E4F` to `#4A5F77`
- **Neutral**: `#F5F7FA`, `#E5E7EB`
- **Accent green**: `#4CAF9B` (preferred) or `#10B981` muted
- **Accent violet**: `#6D28D9` attenuated (rarely)
- **Max 4 active colors** at once

### Forbidden
- Purple/blue AI gradients
- Bright saturated greens (#22C55E at full)
- Celebratory icons (sparkles, confetti, party)
- Gamification elements

### Spacing Rules
- Minimum padding: 16px (mobile)
- Generous spacing, never cramped
- Touch targets: minimum 44x44px

### Animation Rules
- Max duration: 300ms
- Subtle, not festive

---

## Execution Checklist

Before starting:
- [ ] Read BRAND-IDENTITY.md
- [ ] Read DESIGN-SYSTEM.md

Implementation:
- [ ] Fix tab navigation truncation
- [ ] Fix modal toggle truncation  
- [ ] Add modal horizontal padding
- [ ] Fix CV panel width on mobile
- [ ] Replace all bright greens with `#4CAF9B`
- [ ] Fix input focus borders to `#4A5F77`
- [ ] Replace sparkles icon with neutral icon
- [ ] Add truncate/ellipsis to card text
- [ ] Audit theme consistency

Testing:
- [ ] Test on 360px viewport (Chrome DevTools)
- [ ] Test on 375px viewport
- [ ] Verify all text readable
- [ ] Verify all touch targets ≥ 44px
- [ ] Verify color compliance

---

## Security Gate Reminder

Per AGENTS.md, if any changes touch:
- User data display → verify no PII exposure
- Console.log statements → verify no PII logged

Request Security-Agent audit if needed.

---

## Validation

After fixes, take new screenshots on:
- Samsung S21 FE (360px) or Chrome DevTools mobile emulation
- Test both light and dark mode (if applicable)
- Verify against this checklist

**Definition of Done**:
- All P0 issues fixed
- All P1 brand violations fixed
- P2/P3 addressed or documented as tech debt
- No new regressions introduced
- Screenshots show fixed UI
