# 📋 THE ROYAL CLUB — Full Phase PRD

**Last Updated:** July 2026  
**Status:** Ready for Development  
**Phases:** MVP (Phase 1) | Growth (Phase 2) | Polish (Phase 3)

---

## Executive Summary

THE ROYAL CLUB is a premium community platform for 12 members (11 + CEO) hosting daily Facebook Live sessions. The website features a scroll-animated hero experience, member profiles, automated live schedules, and a CEO admin dashboard. Built on React + Firebase for rapid iteration on free tier.

**Timeline:** MVP (4-6 weeks) → Phase 2 (4 weeks) → Phase 3 (ongoing)

---

# 🎯 PHASE 1: MVP (Weeks 1-6)

**Goal:** Launch a working website with core features: scroll hero, member profiles, schedule display, basic admin panel.

**Target Audience:** Visitors curious about the club + 12 members who need to broadcast.

## 1.1 Design System (Phase 1 Locked)

| Element | Specification |
|---------|--------------|
| **Primary Colors** | Royal Green `#1B4D3E`, Gold `#C9A227`, Cream `#F5F0E6` |
| **Accent Colors** | Deep Gold `#8B6914`, Dark Green `#0F2E26` |
| **Headings** | Playfair Display (serif, regal, reserved for H1/H2) |
| **Body Text** | Inter (sans-serif, clean, readable) |
| **Logo** | THE ROYAL CLUB shield (green + gold) provided by you |
| **Mood** | Regal, trustworthy, premium, community-driven |
| **Animation Principle** | Smooth, purposeful (not gratuitous) — scroll-driven hero only |

### Typography Scale (Phase 1)
```
H1: Playfair Display, 48px, font-weight 700 (hero, section titles)
H2: Playfair Display, 36px, font-weight 600
H3: Inter, 24px, font-weight 600
Body: Inter, 16px, font-weight 400, line-height 1.6
Small: Inter, 14px, font-weight 400
Label: Inter, 12px, font-weight 500 (badges, metadata)
```

### Spacing System
```
8px (xs), 16px (sm), 24px (md), 32px (lg), 48px (xl), 64px (2xl)
Margins: 24px between sections (desktop), 16px (tablet), 12px (mobile)
Padding: 32px inside cards (desktop), 24px (mobile)
```

---

## 1.2 Hero Section — Scroll-Animated Entrance

### Concept
Visitor lands on a dark, immersive screen. The THE ROYAL CLUB logo (split into 5-6 pieces) scatters across the viewport. As they scroll, pieces animate into place while motivational messages fade in/out. After reaching 100% scroll, the full website below fades in.

### Scroll Timeline (Detailed)

| Scroll % | Visual | Animation | Message |
|----------|--------|-----------|---------|
| **0-10%** | Dark background (#0F2E26), logo pieces scattered randomly | Pieces float in place (parallax depth) | — |
| **10-20%** | Pieces start moving toward center | Translate + rotate to ~20% assembled | "Welcome to THE ROYAL CLUB" (fade in) |
| **20-35%** | Logo ~40% assembled, 2-3 pieces lock in place | Snap animation on piece placement | "सम्मान बाँटो, प्यार अपने आप मिलेगा" (fade in, hold 3s, fade out) |
| **35-50%** | Logo ~60% assembled | More pieces lock in | "Unity in Diversity" (fade in, hold 2.5s) |
| **50-70%** | Logo ~85% assembled, faint gold shimmer begins | Glow effect on pieces | "Together We Rise" (fade in, hold 2.5s) |
| **70-85%** | Logo nearly complete, gold particle effects | Particles orbit logo | "Every Voice Matters" (fade in, hold 2.5s) |
| **85-100%** | Full logo assembled, full gold shimmer, "Enter The Club" CTA button fades in | Button has subtle pulse animation | — |
| **100%+** | Logo stays centered, website sections fade up from below | Navbar + hero image + first section appear | — |

### Technical Implementation

**Animation Library:** GSAP (ScrollTrigger)
```javascript
gsap.registerPlugin(ScrollTrigger);

// Pseudo-code structure
gsap.to(".logo-piece-1", {
  scrollTrigger: {
    trigger: ".hero-section",
    scrub: 1, // smooth scrub tied to scrollbar
    markers: false
  },
  x: 0,
  y: 0,
  rotation: 0,
  duration: 1
});
```

**Key Mechanics:**
- **Scrubbing:** Tied directly to scroll position (not time-based)
- **Easing:** `power2.inOut` for all piece movements
- **Mobile:** Reduce to 4 pieces, increase scroll distance by 50% (users scroll more on mobile, feels natural)
- **Particle Effects:** Subtle CSS animations (keyframes), not heavy three.js
- **Performance:** Debounce scroll listeners, use `will-change: transform` on pieces

### Deliverables You'll Provide
1. **Logo frames (PNG):** 5-6 images of logo in "building" states (recommend: 1200×800px, transparent background, <150KB each)
   - Frame 0: Completely scattered pieces
   - Frame 1: Pieces moving inward
   - Frame 2: ~40% assembled
   - Frame 3: ~60% assembled
   - Frame 4: ~85% assembled
   - Frame 5: Fully assembled
2. **Motivational messages:** Provide exact Hindi/English text for 4-5 messages

**Fallback (No Frames Provided):**
- I'll create pure CSS/SVG animated logo assembly (simpler, but still polished)

---

## 1.3 Pages & Routes (Phase 1)

| Route | Purpose | Access | Status |
|-------|---------|--------|--------|
| `/` | Single-page scroll (hero + all sections) | Public | MVP ✓ |
| `/login` | Member login (email + password) | Public | MVP ✓ |
| `/register` | New member registration (invite-only) | Public | MVP ✓ |
| `/admin` | CEO dashboard (schedule, member mgmt) | CEO only | MVP ✓ |
| `/member/:id` | Individual member profile (full bio + schedule) | Public | MVP ✓ |

---

## 1.4 Navigation & Layout

### Navbar (Sticky, Transparent → Solid on Scroll)
```
Left:     THE ROYAL CLUB logo (small, clickable → /)
Center:   Home | Members | Schedule | Live | About
Right:    Login (outline button, gold border)
Mobile:   Logo + Hamburger menu (slides in from right)
```

**Specs:**
- Height: 60px (desktop), 56px (mobile)
- Background: Transparent initially, becomes semi-transparent dark green on scroll
- Transition: 0.3s ease-in-out when changing
- Text color: Cream (#F5F0E6)
- Active link: Gold underline

---

## 1.5 Hero Image Section (Below Scroll Animation)

**Purpose:** Visual welcome after hero scroll completes.

**Layout:**
- Full-width banner (height: 60vh desktop, 50vh mobile)
- Background: Image or gradient (suggest: THE ROYAL CLUB members in a professional group photo, or a gradient overlay)
- Centered text: "Welcome to THE ROYAL CLUB" (H1) + "Where daily wisdom meets community" (subtitle)
- CTA button: "Explore Members" (gold background, green text)

**Content Needed:** Group photo or background image (1920×1080px min, <300KB)

---

## 1.6 Live Now Banner (Auto-Updating)

### Purpose
Immediate, prominent display of who's live now or up next. High visual priority.

### Layout

**If Someone is LIVE NOW:**
```
┌─────────────────────────────────────────┐
│ 🔴 LIVE NOW (red badge)                 │
│                                         │
│  [Member Photo]  Name                   │
│  [Circular, 80px, gold border]          │
│                                         │
│  Topic: "Understanding Wealth Creation" │
│                                         │
│  🎬 Watch on Facebook (button)          │
│  ⏱️  Started 15 mins ago                 │
└─────────────────────────────────────────┘
```

**If No One is Live (Show UP NEXT):**
```
┌─────────────────────────────────────────┐
│ ⏳ LIVE IN 45 MINUTES (yellow badge)    │
│                                         │
│  [Member Photo]  Name                   │
│  Time: 6:00 PM - 7:00 PM                │
│  Topic: "Building Your Network"         │
│                                         │
│  🎬 Set Reminder (button)               │
└─────────────────────────────────────────┘
```

### Technical Details

**Data Structure:**
```javascript
{
  memberId: "member-001",
  name: "Raj Kumar",
  photo: "url-to-photo",
  topic: "Understanding Wealth Creation",
  status: "live" | "upcoming" | "completed",
  scheduledStartTime: "2026-07-20T18:00:00Z",
  facebookLiveLink: "https://facebook.com/watch/?v=...",
  elapsedTime: 15 // in minutes (only if live)
}
```

**Auto-Refresh Mechanism:**
- Fetch schedule data every **5 minutes** (not 2, to save Firebase quota)
- Use Firestore real-time listener (cheaper than polling)
- If status changes → trigger re-render + "Now Live!" toast notification

**Design:**
- Full-width banner, 140px height
- Gold border on top (4px)
- Dark green background (#1B4D3E)
- Flexbox layout: Photo (left, 100px) | Info (center, flex) | Button (right, 120px)
- Mobile: Stack vertically (photo on top, info + button below)

**Badges:**
- "🔴 LIVE NOW" - Crimson red (#C41E3A) with pulse animation
- "⏳ COMING UP" - Gold (#C9A227)

---

## 1.7 Today's Schedule Section

### Purpose
Display all members' scheduled sessions for today in a clear, scannable format.

### Layout (Desktop)

**Horizontal Timeline Card Grid:**
```
Today's Schedule
═══════════════════════════════════════════════════════

[6:00 PM]        [7:00 PM]        [8:00 PM]
Member A         Member B         Member C
Topic: ...       Topic: ...       Topic: ...
[Watch Button]   [Upcoming]       [Upcoming]


[9:00 PM]        [10:00 PM]
Member D         Member E
Topic: ...       Topic: ...
[Completed]      [Upcoming]
```

### Card Specs (Each Slot)

**Size:** 220px × 180px (desktop)

**Content:**
- Time: "6:00 PM - 7:00 PM" (label, small)
- Member photo: 60px circular, gold border
- Member name: 16px, bold
- Topic: 14px, truncated to 2 lines
- Status badge: "Upcoming" (green) | "LIVE NOW" (red) | "Completed" (grey)
- Button: "Watch on Facebook" (if live) | "Set Reminder" (if upcoming) | "Archived" (if completed)

**Design:**
- Background: Cream (#F5F0E6) on desktop
- Border: 2px solid gold when highlighted (current/live)
- Hover: Scale 1.05, shadow depth
- Mobile: Stack vertically (full width, 1 per row)

### Data Model
```javascript
{
  scheduleId: "sched-001",
  date: "2026-07-20",
  memberId: "member-001",
  memberName: "Raj Kumar",
  memberPhoto: "url",
  startTime: "18:00", // 24-hour
  endTime: "19:00",
  topic: "Understanding Wealth Creation",
  facebookLiveLink: "https://...", // nullable
  status: "upcoming" | "live" | "completed",
  createdAt: "2026-07-19T10:00:00Z",
  updatedAt: "2026-07-19T12:00:00Z"
}
```

### Interaction
- Click card → expands to show full topic description
- "Watch on Facebook" → opens link in new tab
- "Set Reminder" → adds to browser notifications (Phase 2 enhancement)

### Mobile Layout
- Single column, full width
- Cards are 100% wide, 140px tall
- Time + Member name on left, status badge on right
- Swipe for more details (or tap to expand)

---

## 1.8 Member Directory Section

### Purpose
Showcase all 12 members with quick access to their profiles and schedules.

### Layout

**Grid:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px

**Card Design (Each Member):**

```
┌────────────────────┐
│  [Photo - 120px]   │  (circular, gold border)
│                    │
│  Member Name       │  (16px bold)
│  CEO | Member      │  (12px, gold badge)
│                    │
│  "A passionate..." │  (14px, 2-3 lines, bio snippet)
│                    │
│ 🔗 Facebook        │  (social icons, small)
│ 🔗 Instagram       │
│                    │
│ [View Profile]     │  (button, outline)
└────────────────────┘
```

**Card Dimensions:**
- Width: 280px (desktop), 300px (constrained in 2-col)
- Height: Auto (content-driven, ~380px average)

**Interaction:**
- Click card → modal or dedicated member page showing:
  - Full bio (500-1000 characters)
  - All scheduled sessions (for this member, all dates)
  - Social links (clickable)
  - Member since (join date)
  - Member quote or tagline

### Data Model
```javascript
{
  memberId: "member-001",
  name: "Raj Kumar",
  role: "member" | "ceo",
  photo: "url",
  bio: "Passionate about wealth creation...",
  bioFull: "Longer bio for profile page...",
  socialLinks: {
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
    linkedin: "https://linkedin.com/...",
    website: "https://..."
  },
  joinDate: "2026-01-15",
  quote: "Success is 1% inspiration, 99% execution.",
  isActive: true,
  isVerified: true
}
```

### Content You'll Provide
- 12 member profiles (name, photo, short bio, social links)
- Designate which member is CEO
- Photos: Square JPG/PNG, 400×400px min, <100KB each

---

## 1.9 Automated Poster Section

### Purpose
Eye-catching "Who's Live Tonight" poster that updates automatically based on the schedule.

### Design

**Single Large Poster Card (Desktop):**
- Width: 500px
- Height: 650px
- Background: Royal green (#1B4D3E) with gold ornamental borders (decorative SVG frame)
- Centered content:
  - "TONIGHT ON" (small header, 14px, gold)
  - "THE ROYAL CLUB" (large, Playfair, 48px, cream)
  - [Member photo, 200×200px circular, gold border]
  - Member name (Playfair, 36px)
  - Time: "6:00 PM - 7:00 PM" (24px)
  - Topic: "Understanding Wealth" (20px, italics)
  - [CTA Button: "Join Live on Facebook", gold bg, green text]

**Mobile:**
- Width: 100% - 32px padding
- Height: Auto
- Stack: Title → Photo → Name → Time → Topic → Button

**Auto-Update Logic:**
- Fetch "next live session" from schedule
- If no session today, show next session this week
- Re-fetch every 5 minutes
- Animate fade-in/out when poster changes

**Below Poster: "Up Next" Cards**
- Show next 2 upcoming sessions (timeline view)
- 2 cards side-by-side (desktop), stacked (mobile)
- Each card: Time | Member photo (40px) | Name | Topic (truncated)

---

## 1.10 About / Mission Section

### Purpose
Communicate the group's values and story.

### Layout (Two-Column Desktop)

```
LEFT COLUMN:                RIGHT COLUMN:
[Logo image, 200px]         Heading: About THE ROYAL CLUB
                            
                            Mission text (2-3 paragraphs):
                            "We believe in the power of shared wisdom..."
                            
                            Tagline (bold, gold): 
                            "सम्मान बाँटो, प्यार अपने आप मिलेगा"
                            (Share Respect, Receive Love Naturally)
                            
                            Stats Row:
                            ┌──────────────┬──────────────┬──────────────┐
                            │ 12 Members   │ Daily Lives  │ Growing      │
                            │              │              │ Community    │
                            └──────────────┴──────────────┴──────────────┘
```

**Mobile:** Single column (logo on top, text below)

**Design:**
- Section padding: 64px vertical, 32px horizontal
- Text color: Dark green (#0F2E26)
- Stats: Use gold accents on numbers

---

## 1.11 Footer

### Layout
```
┌─────────────────────────────────────────┐
│                                         │
│  [Logo]  About  |  Members  |  Schedule │
│          Privacy Policy | Contact       │
│                                         │
│  🔗 Facebook  |  🔗 Instagram           │
│                                         │
│  © 2026 THE ROYAL CLUB. All rights...  │
│                                         │
└─────────────────────────────────────────┘
```

**Content:**
- Logo (small, 60px)
- Quick links (5-6 most important)
- Social icons (clickable, to Facebook group/page)
- Copyright notice

**Design:**
- Dark green background (#0F2E26)
- Cream text (#F5F0E6)
- Padding: 48px vertical
- Mobile: Stack vertically, centered

---

## 1.12 Authentication (Phase 1)

### Registration Flow

**Strategy: Invite-Only (CEO generates links)**

1. CEO logs in → Admin panel → "Invite Member" button
2. Generates unique invite link (e.g., `https://theroyalclub.com/register?code=xyz123`)
3. Email link to new member
4. New member clicks link → registration form (pre-filled with invite code)
5. Form asks for: Name, Email, Password, Profile Photo, Bio
6. Submit → Account created, member can log in

### Login Flow

**Email + Password (simple, Firebase Auth)**

```
Input:
- Email (required)
- Password (required)

Buttons:
- Login
- Forgot Password (link to password reset)
- Don't have account? Register

Error States:
- "Email not found" (if no account)
- "Incorrect password" (max 5 attempts, then lockout 15 mins)
- "Account not active" (if not yet approved by CEO)
```

### Data Security
- **Firebase Authentication** handles password hashing
- No passwords stored in Firestore
- Invite codes expire after 7 days
- Session timeout: 1 hour of inactivity

---

## 1.13 Member Profile Management

**Logged-In Member Features:**

1. **Edit Own Profile** (accessible via navbar dropdown or profile page)
   - Upload/change profile photo
   - Edit bio (short 100 chars, long 500 chars)
   - Add/update social links
   - Change password
   - Log out

2. **View My Schedule**
   - All your scheduled time slots (past, present, future)
   - Edit topic for today's slot
   - Post Facebook Live link when going live
   - View past recordings (if links archived)

3. **Dashboard (Simple, 1 card layout)**
   - "Your Next Live" card (if upcoming today)
   - "My Profile" quick link
   - "My Schedule" link
   - "Logout" button

---

## 1.14 CEO Admin Dashboard (Phase 1)

**Restricted Access:** Only logged-in CEO account can access `/admin`

### Features (Phase 1)

#### 1. Schedule Manager
- **View:** Week view grid (7 days × 12 members)
- **Edit:** Click cell to edit:
  - Member assigned to slot
  - Start/end time
  - Topic
  - Status (upcoming/completed/cancelled)
  - Facebook Live link (if manually inputted)
- **Add:** "Add Slot" button to create new schedule entries
- **Bulk Actions:** Mark all as completed, bulk reassign members

#### 2. Member Manager
- **List:** All 12 members with status (active/inactive)
- **Add Member:** Button to create new member (if needed)
- **Edit:** Click member card to edit:
  - Name, photo, bio, social links, role
- **Deactivate:** Soft-delete (hides from public, data retained)
- **Invite:** Generate invite link for new members

#### 3. Content Manager
- **Edit Hero Messages:** Update motivational messages for scroll animation
- **Edit About Section:** Mission statement, tagline
- **Manage Social Links:** Group's Facebook page, Instagram, etc.

#### 4. Analytics Dashboard (Phase 1 Minimal)
- Total page views (daily, weekly)
- Most popular member (most clicks to their Facebook live)
- Schedule completion rate (how many slots had active live streams)
- Member engagement (login frequency, profile completeness)

**Design:** Simple card-based dashboard, left sidebar nav

---

## 1.15 Mobile Responsiveness (Phase 1)

### Breakpoints
```
Mobile:  0 - 767px
Tablet:  768px - 1023px
Desktop: 1024px+
```

### Key Changes per Breakpoint

**Mobile (0-767px):**
- Navbar: Logo + Hamburger (slides in menu)
- Hero scroll: 4 frames (instead of 6)
- Schedule cards: Full width, stacked
- Member grid: 1 column
- Poster: Full width - 16px padding
- Footer: Centered, single column
- Fonts: Reduce H1 to 36px, body to 15px

**Tablet (768px-1023px):**
- Navbar: Logo + nav links (smaller)
- Member grid: 2 columns
- Schedule: 2 columns side-by-side
- Poster: 80% width, centered

**Desktop (1024px+):**
- Full experience as designed

### Performance Optimization (Mobile)
- Lazy-load member photos (intersection observer)
- Debounce scroll animations
- Compress images (Cloudinary free tier)
- Minimize initial bundle (code splitting)

---

## 1.16 Technical Stack (Phase 1)

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18 + Vite | Fast HMR, modern tooling |
| **Animation** | GSAP + ScrollTrigger | Smooth scroll-driven animations |
| **Styling** | Tailwind CSS | Rapid styling, responsive utilities |
| **State** | React Context + Firebase | Simple state, real-time data |
| **Auth** | Firebase Authentication | Built-in, secure, free tier |
| **Database** | Firestore | Real-time updates, free tier |
| **Hosting** | Vercel or Firebase Hosting | Free tier, auto-deploy from Git |
| **Images** | Firebase Storage or Cloudinary | Free tier for storage/optimization |

### Dependencies (Minimal)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^latest",
  "tailwindcss": "^latest",
  "gsap": "^3.12.2",
  "firebase": "^9.23.0",
  "react-router-dom": "^6.15.0",
  "@headlessui/react": "^1.7.0" (modals, dropdowns)
}
```

### Firebase Spark Plan (Free Tier)
- **Hosting:** 10 GB/month bandwidth, 10 GB storage
- **Firestore:** 50K reads/day, 20K writes/day, 1 GB storage
- **Authentication:** 10K users/month (plenty for 12 members)
- **Storage:** 5 GB (for photos)

**Optimization:**
- Use Firestore real-time listeners (cheaper than polling)
- Cache schedule data client-side
- Image compression (Cloudinary free tier)
- Lazy-load non-critical sections

---

## 1.17 Deliverables Checklist (What You Provide)

- [ ] THE ROYAL CLUB logo (vector, PNG options: full + isolated frames for hero)
- [ ] 12 member photos (square, 400×400px min, <100KB each)
- [ ] 12 member profiles (name, role, short bio, long bio, social links, join date)
- [ ] CEO member profile + password credentials
- [ ] Initial 7-day schedule (12 members × 12 slots/day = sample data)
- [ ] Hero scroll messages (3-5, Hindi/English mix)
- [ ] Group photo or banner image (1920×1080px, <300KB)
- [ ] Facebook group/page link
- [ ] Color palette confirmation (or tweaks to provided palette)
- [ ] Any brand guidelines (fonts, logo usage, tone)

---

## 1.18 MVP Success Criteria

- [ ] Hero scroll animation works smoothly on desktop + mobile
- [ ] All 12 members display with photos and bios
- [ ] Schedule updates in real-time (member can post live link, banner updates within 1 min)
- [ ] Admin can edit schedule + manage members
- [ ] Mobile fully responsive (tested on iPhone + Android)
- [ ] Loads in <3 seconds (Lighthouse score >80)
- [ ] No console errors
- [ ] Deployed to public URL
- [ ] All links work (Facebook, social profiles)

---

---

# 🚀 PHASE 2: Growth & Engagement (Weeks 7-10)

**Goal:** Add member engagement features, notifications, analytics, and polish.

## 2.1 New Features Overview

### A. Email Notifications
- **Daily Schedule Digest:** Every morning, members get email with today's schedule (who's live when)
- **Live Now Alert:** When someone goes live, send email to all members + opt-in subscribers
- **Reminder:** 30 mins before your scheduled slot, reminder email
- **Opt-In/Out:** Members manage notification preferences in settings

**Technology:** SendGrid (free tier: 100 emails/day)

### B. Member Chat / Forum (Simple)
- **Group Chat Room:** One shared channel for all members to discuss, share links, ask questions
- **Real-time:** Powered by Firestore real-time listeners
- **Moderation:** CEO can delete messages, pin important ones
- **Search:** Find past messages by member or keyword

**Technology:** Firestore + React Context (no external chat library needed)

### C. Member Engagement Settings
- **Notification Preferences:** Toggle email/in-app notifications
- **Privacy:** Public bio vs. private
- **Timezone:** For accurate schedule display
- **Language:** Hindi / English preference

### D. Enhanced Analytics Dashboard
- **Top Performers:** Members with most Facebook live engagement (approximated by link clicks)
- **Engagement Trends:** Weekly chart of page views, member clicks, live links clicked
- **Schedule Completion:** % of scheduled slots that went live (with data)
- **Member Growth:** New member registrations over time

**Technology:** Google Analytics 4 (free)

### E. Automated Facebook Live Detection (Beta)
- **Manual Confirmation:** Member marks "I'm Going Live" → 5-min countdown before auto-detecting
- **Fallback:** If not marked, check at scheduled time (manual API call, not real-time)
- **Status Update:** Banner updates from "Upcoming" → "Live" when detected

**Technology:** Facebook Graph API (basic, not full integration yet)

### F. Gallery / Past Sessions
- **Archive:** All past live streams with links, member, date, topic
- **Filterable:** By member, date range, topic
- **Embed:** Show embedded Facebook video (if available)
- **Stats:** View count (estimated from Facebook)

---

## 2.2 Email Notifications (Details)

### Service Setup
- **SendGrid Free Tier:** 100 emails/day (enough for 12 members × 7 days)
- **API Integration:** Firebase Cloud Functions to trigger emails

### Email Templates

#### 1. Daily Schedule Digest
**When:** 7:00 AM (adjustable, sent to all members)
**Content:**
```
Subject: Today's Schedule - THE ROYAL CLUB

Hi [Member Name],

Here's today's lineup on THE ROYAL CLUB:

6:00 PM - Raj Kumar | "Wealth Creation 101"
7:00 PM - Sarah Singh | "Leadership Lessons"
8:00 PM - Priya Patel | "Health & Wellness"
...

Join us and support your fellow members! 

🔗 View Full Schedule: [link to website]

[Unsubscribe link]
```

#### 2. Live Now Alert
**When:** Immediately when member marks as "Going Live"
**To:** All members (or subscribers)
**Content:**
```
Subject: 🔴 LIVE NOW - [Member Name] on THE ROYAL CLUB

[Member Name] is going live NOW on THE ROYAL CLUB!

Topic: [Topic]
Duration: [Time]

🎬 Watch Live: [Facebook Link]

This is a 1-hour session. Join and engage!

[Unsubscribe link]
```

#### 3. Reminder Email
**When:** 30 mins before your scheduled slot
**To:** Only the member scheduled to go live
**Content:**
```
Subject: Reminder: Your Live Session Starts in 30 Minutes!

Hi [Member Name],

You're scheduled to go live on THE ROYAL CLUB in 30 minutes!

Topic: [Topic]
Time: [Time]
Duration: 1 hour

Preparation Checklist:
- Test your camera/audio ✓
- Have your talking points ready ✓
- Post your Facebook Live link here: [URL to dashboard]

Good luck! We're excited to hear from you.

[Link to admin panel to post live link]
```

### Notification Preferences (Member Settings Page)
```
□ Daily Schedule Digest (7:00 AM)
□ Live Now Alerts (immediately)
□ Reminder Before My Session (30 mins)
□ Weekly Engagement Report (Sunday, 6 PM)
□ New Member Announcements
□ Chat Mentions (when someone replies to you)

Email Frequency:
○ Immediately
○ Daily Digest
○ Weekly Digest
○ Never
```

---

## 2.3 Chat / Forum System

### UI/UX

**Location:** New navbar link "Chat" → Modal or dedicated page

**Layout:**
- Left sidebar: "General" chat room (only 1 room in Phase 2)
- Main area: Message thread
- Input box at bottom with "Send" button

**Messages Display:**
```
[Member Photo, 40px]  Member Name
Message sent at 2:30 PM

"Hey everyone, excited for tonight's session!"

[Like icon]  [Reply icon]  [More options]
```

**Features (Phase 2):**
- Send text messages
- Mention members (@MemberName)
- Emoji support
- Edit own messages (within 5 mins)
- Delete own messages
- Pinned messages (CEO only)
- Message search (Ctrl+F)

**No Features Yet:**
- File uploads
- Video/audio messages
- Direct messages (Phase 3)

### Data Model
```javascript
{
  chatId: "chat-msg-001",
  roomId: "general",
  memberId: "member-001",
  memberName: "Raj Kumar",
  memberPhoto: "url",
  message: "Hey everyone!",
  timestamp: "2026-07-20T14:30:00Z",
  edited: false,
  editedAt: null,
  isPinned: false
}
```

### Moderation (CEO Dashboard)
- View all messages
- Delete inappropriate messages
- Ban users (soft, can reactivate)
- Pin/unpin messages
- Export chat history (for records)

---

## 2.4 Enhanced Admin Analytics

### Dashboard Layout

**4 Key Cards:**
1. **Total Page Views (This Week)** — Big number, trend chart (↑/↓)
2. **Member Engagement (Top 5)** — Leaderboard: Member name | Click count | Sessions hosted
3. **Schedule Completion Rate** — % (e.g., "85% of sessions were live")
4. **Chat Activity** — Messages sent this week, most active member

**Charts:**
- **Line Chart:** Daily page views (last 30 days)
- **Bar Chart:** Live sessions by member (last 30 days)
- **Pie Chart:** Traffic source (direct, social, search)

### Implementation
- **Google Analytics 4:** Automatic page view tracking, user behavior
- **Firestore Aggregation:** Custom queries for engagement metrics
- **Lightweight:** No heavy charting library (use Recharts or Chart.js)

---

## 2.5 Facebook Live Detection (Beta)

### How It Works

**Step 1: Member Marks "Going Live"**
- In schedule card or dashboard, button "Mark as Going Live"
- Starts 5-minute countdown (time to actually go live on Facebook)
- Banner updates to "🟡 Going Live Soon"

**Step 2: Auto-Detection**
- After 5 mins, system checks if member's Facebook page has active live stream
- Uses Facebook Graph API (basic, not real-time)
- If found → Banner updates to "🔴 LIVE NOW", members notified

**Step 3: Fallback**
- If auto-detection fails, CEO can manually mark as "Live" from dashboard
- Or member posts Facebook link in schedule card directly (old method still works)

### Requirements
- Facebook App ID (created by you in Facebook Developer Portal)
- Facebook Graph API token (generated in Portal)
- Member Facebook page URL (stored in profile)

### Limitations (Phase 2)
- Not real-time (checks every 2 mins)
- Requires member Facebook page to be public
- May take up to 2 mins to detect live stream
- Phase 3 upgrade: Real-time via Facebook Webhooks

---

## 2.6 Gallery / Archive Section

### New Page: `/archive`

**Layout:**
- Sidebar filters (left)
- Grid of past sessions (right)

**Filters:**
- Member (dropdown)
- Date range (from/to)
- Topic (search)

**Each Archive Card:**
```
[Video Thumbnail or Placeholder Image]

Member Name
Topic: "Wealth Creation 101"
Date: July 15, 2026
Duration: 57 mins

[Views: ~200]  [Likes: ~45]  [Watch Video]
```

**Click Card:** Opens modal with:
- Embedded Facebook video (if available)
- Full topic description
- Member bio
- Attendee count (if available)
- Discussion comments (Phase 3)

### Data Model
```javascript
{
  archiveId: "archive-001",
  memberId: "member-001",
  memberName: "Raj Kumar",
  topic: "Wealth Creation 101",
  date: "2026-07-15",
  duration: 57, // in minutes
  facebookVideoUrl: "https://facebook.com/watch/?v=...",
  facebookVideoId: "...",
  thumbnail: "url or auto-generated",
  views: 200,
  description: "In this session...",
  tags: ["wealth", "creation", "finance"]
}
```

---

## 2.7 Member Engagement Settings

### New Page: `/settings` (logged-in member only)

**Sections:**

1. **Notification Preferences**
   - [ ] Daily Schedule
   - [ ] Live Now Alerts
   - [ ] Reminder Before My Session
   - [ ] Chat Mentions

2. **Privacy & Profile**
   - [ ] Make profile public
   - [ ] Show email to other members
   - Bio visibility (public / members only)

3. **Timezone**
   - Dropdown: Select timezone (auto-detect + manual override)
   - Preview: "Your scheduled time: 6:00 PM IST (3:30 AM UTC)"

4. **Language**
   - ○ English
   - ○ Hindi
   - ○ English + Hindi

5. **Account**
   - Change password
   - Delete account (soft, CEO can restore)
   - Log out all devices

---

## 2.8 Phase 2 Success Criteria

- [ ] Email notifications working (test with real SendGrid account)
- [ ] Chat room displays messages in real-time
- [ ] Analytics dashboard shows real data (GA4 + Firestore)
- [ ] Facebook Live detection works (manual + auto, 80% success rate)
- [ ] Archive section displays past sessions correctly
- [ ] Settings page saves preferences
- [ ] All new features responsive on mobile
- [ ] No performance regression (Lighthouse score still >80)

---

---

# ✨ PHASE 3: Polish & Scaling (Weeks 11+)

**Goal:** Premium features, custom domain, multi-language, advanced engagement.

## 3.1 New Features Overview

### A. Custom Domain & SSL
- **Domain:** theroyalclub.com (purchased separately)
- **SSL:** Auto-managed by hosting provider
- **Email:** support@theroyalclub.com (optional, Phase 3+)

### B. Dark Mode Toggle
- **Settings:** User preference in settings
- **Theme:** Re-skin all colors for dark background
- **Persistence:** Save preference to localStorage

### C. Multi-Language Support
- **Hindi + English:** Toggle in navbar
- **Translation:** Store all text in i18n JSON files
- **RTL Support:** If adding Arabic/Urdu later
- **Auto-detect:** Browser language preference

### D. Direct Messaging (1-on-1 Chat)
- **Feature:** Private chat between members
- **Notification:** In-app + email notification for new messages
- **Read receipts:** Show if message is read
- **Typing indicators:** "Member is typing..."

### E. Member Leaderboard
- **Metrics:**
  - Most sessions hosted (count)
  - Most engagement (estimated from likes/comments)
  - Highest attendance (estimated)
  - Most consistent (sessions hosted on schedule)
- **Ranking:** Top 5 displayed on home, full leaderboard on separate page
- **Monthly:** Reset rankings monthly, show top performers of the month

### F. Advanced Notifications
- **Web Push:** Browser push notifications (in addition to email)
- **SMS:** (Optional) Text alerts for live sessions
- **Slack Integration:** (Optional) Post to Slack channel when live
- **Reminders:** 1 hour, 30 mins, 15 mins, 5 mins before session

### G. Member Testimonials / Spotlight
- **Gallery:** Member quotes, stories, impact stories
- **Form:** CEO can submit testimonials on behalf of members
- **Display:** Rotate testimonials on home page
- **Voting:** Members can upvote favorite testimonials

### H. Advanced Analytics
- **Cohort Analysis:** Track member retention, engagement over time
- **Funnel Analysis:** Visitor → Member → Active Member → Leader
- **Attribution:** Which channel brought in most engaged members
- **Export:** Downloadable reports (PDF, CSV)

### I. Sponsorship / Sponsorship Widget
- **Feature:** Display sponsor logos/links on website
- **Admin:** CEO can manage sponsors and tier levels
- **Widget:** Banner at footer or sidebar
- **Revenue:** (For future monetization)

### J. Newsletter Signup
- **Purpose:** Let visitors subscribe to updates
- **Integration:** Mailchimp or SendGrid
- **Content:** Weekly digest, new member announcements, upcoming events
- **Opt-in:** Clear consent checkbox on homepage

### K. Mobile App (Consideration)
- **React Native:** Code sharing with web version
- **Features:** Push notifications, offline schedule, chat
- **Platforms:** iOS + Android
- **Priority:** Post-MVP, based on demand

---

## 3.2 Dark Mode Implementation

### Design System (Dark Mode)

| Element | Light | Dark |
|---------|-------|------|
| Background | Cream #F5F0E6 | Deep Green #0F2E26 |
| Text | Dark Green #1B4D3E | Cream #F5F0E6 |
| Accent | Gold #C9A227 | Gold #D4AF37 (lighter) |
| Card | White | #1A3A33 |
| Border | Light Grey | #2E4D47 |

### Implementation
```javascript
// useTheme hook
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('theme');
  return saved || 'light';
});

useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}, [theme]);

// Tailwind dark: prefix
<div className="bg-cream dark:bg-dark-green">
```

### Toggle Button
- **Location:** Top-right corner of navbar (next to login)
- **Icon:** Sun ☀️ (light mode) / Moon 🌙 (dark mode)
- **Label:** "Dark Mode" on hover

---

## 3.3 Multi-Language Support (i18n)

### Languages Supported
- English (en)
- Hindi (hi)

### Implementation (react-i18next)

```javascript
// src/locales/en.json
{
  "nav.home": "Home",
  "nav.members": "Members",
  "schedule.time": "Time",
  "schedule.live": "🔴 Live Now"
}

// src/locales/hi.json
{
  "nav.home": "होम",
  "nav.members": "सदस्य",
  "schedule.time": "समय",
  "schedule.live": "🔴 लाइव"
}

// Usage in component
<h1>{t('nav.home')}</h1>
```

### Language Selector
- **Location:** Navbar dropdown or settings page
- **Auto-detect:** On first visit, check browser language
- **Persistence:** Save to localStorage

### Content to Translate
- UI labels (buttons, links, headers)
- Section titles and descriptions
- Email templates
- Error messages
- Success messages
- Chat messages (not translated, but UI around them)

### Images/Assets
- Logo: Language-agnostic (no text in logo)
- Hero messages: Already in Hindi/English mix
- Member bios: Store in both languages (or translate via API, Phase 3+)

---

## 3.4 Direct Messaging (1-on-1 Chat)

### UI/UX

**Access:** New navbar link "Messages" → Modal or sidebar

**Layout:**
- Left: List of recent conversations (member names, last message preview)
- Right: Message thread with selected member
- Search: Find member to message

**Conversation View:**
```
Member Name (header)

[Your Message]                      (aligned right, blue bg)
                   [Their Message] (aligned left, grey bg)

[Your Message]
                   [Their Message]
                   "is typing..."
                   
[Message input box] [Send button] [Emoji button]
```

### Features
- Send/receive messages instantly (Firestore real-time)
- Read receipts: "✓ Read at 2:30 PM"
- Typing indicators: "Member is typing..."
- Emoji support
- Edit messages (5-min window)
- Delete messages (both sides)
- Block member (if needed, Phase 3+)

### Notifications
- **In-app:** Red badge on "Messages" navbar link
- **Email:** (Optional) Digest email every 6 hours with new messages
- **Web Push:** (Optional) Push notification when new message arrives

### Data Model
```javascript
{
  conversationId: "conv-001",
  participantIds: ["member-001", "member-002"],
  lastMessage: "Hey, how are you?",
  lastMessageTime: "2026-07-20T14:30:00Z",
  unreadCount: {
    "member-001": 2,
    "member-002": 0
  }
}

{
  messageId: "msg-001",
  conversationId: "conv-001",
  senderId: "member-001",
  content: "Hey, how are you?",
  timestamp: "2026-07-20T14:30:00Z",
  isRead: true,
  readAt: "2026-07-20T14:31:00Z",
  edited: false,
  editedAt: null
}
```

---

## 3.5 Member Leaderboard

### Page: `/leaderboard`

**Layout:**

**Monthly Leaderboard (Current Month)**
```
🏆 TOP PERFORMERS - JULY 2026

┌─────────────────────────────────────┐
│ 🥇 Raj Kumar       | 28 Sessions    │
│ 🥈 Sarah Singh     | 26 Sessions    │
│ 🥉 Priya Patel     | 24 Sessions    │
│    Amit Gupta      | 22 Sessions    │
│    ...             | ...            │
└─────────────────────────────────────┘

[View All Metrics] [Previous Month]
```

**Detailed Metrics (Click Member):**
- Sessions hosted
- Total engagement (est. from clicks)
- Highest attendance session
- Consistency score (on-time starts)
- Member since
- Badge earned (e.g., "👑 Consistency Champion")

**Badges/Achievements:**
- 🚀 First Live: Host first session
- ⭐ Consistent: Host 20+ sessions in a month
- 👑 Top Member: Rank #1 in month
- 🎯 Prepared: Post topic before 2 PM

### Data Model
```javascript
{
  leaderboardId: "lb-july-2026",
  month: "2026-07",
  rankings: [
    {
      memberId: "member-001",
      rank: 1,
      sessionsHosted: 28,
      estimatedEngagement: 1250,
      badge: "top-member",
      score: 95
    },
    ...
  ]
}
```

---

## 3.6 Advanced Notifications

### In-App Notification Toasts
```
✓ Successfully marked as "Going Live"
(appears in top-right, auto-dismisses after 3s)

⚠️ Your session starts in 15 minutes!
(sticky, actionable button "Prepare")

🔴 Member is now live: Check it out!
(dismissible, with link to live)
```

### Web Push Notifications (Service Worker)
```javascript
// Register service worker
navigator.serviceWorker.register('/sw.js');

// Request permission
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Allowed, now can send push
  }
});

// Send push (backend triggers)
self.registration.showNotification('Live Now!', {
  body: 'Raj Kumar is now live on THE ROYAL CLUB',
  tag: 'live-notification',
  requireInteraction: true
});
```

### Notification Schedule
- **1 Hour Before:** In-app toast + email
- **30 Minutes Before:** In-app + web push + email
- **15 Minutes Before:** In-app + web push
- **5 Minutes Before:** In-app + web push (urgent)
- **Session Live:** In-app + web push + email (all members)

### Notification Preferences (Extended Settings)
```
Reminder Timing:
□ 1 hour before
□ 30 mins before
☑ 15 mins before
☑ 5 mins before

Channel:
☑ In-app toast
☑ Email
☑ Web push notification
□ SMS (future)

Frequency:
○ Every session
○ Only my sessions
○ Never
```

---

## 3.7 Member Testimonials

### Testimonials Page: `/testimonials`

**Layout:**
- Carousel or grid of testimonial cards
- Rotating on homepage (1 new testimonial every 24 hours)

**Card Design:**
```
┌──────────────────────────┐
│ [Member Photo, 60px]     │
│ "This community changed  │
│  my life. I learned so   │
│  much from every member" │
│                          │
│ — Raj Kumar              │
│   Member since Jan 2026  │
│                          │
│ [❤️ 45 likes]            │
└──────────────────────────┘
```

### Submission Form (CEO Dashboard)
- Member dropdown (or free-text name)
- Quote text (500 chars max)
- Optional: Photo override
- Optional: Impact story (1000 chars)
- Publish/Draft/Schedule

### Voting (Members Only)
- Members can like testimonials
- Show like count on card
- Sort by "Most Loved" view

### Display on Homepage
- Rotate testimonial banner (changes daily)
- Link to full testimonials page

---

## 3.8 Advanced Analytics

### Analytics Page: `/analytics` (CEO only)

**Dashboard Sections:**

1. **Key Metrics (Summary Cards)**
   - Total page views (all-time)
   - Total sessions hosted (all-time)
   - Average attendance per session
   - Member retention rate (%)

2. **Trends (Line Charts)**
   - Page views over time (30-day, 90-day, 1-year views)
   - Member registration trend
   - Sessions hosted per week

3. **Cohort Analysis**
   - Members by join date (cohort)
   - Retention: % of members active after 1 week, 1 month, 3 months
   - Churn: Members who stopped hosting sessions

4. **Attribution (Where do visitors come from?)**
   - Direct (link)
   - Search (Google)
   - Social (Facebook, Instagram)
   - Referral (word of mouth)

5. **Export**
   - Download report as PDF
   - Export data as CSV (for spreadsheet analysis)

### Implementation
- **Google Analytics 4:** Page views, user behavior, traffic source
- **Firestore Queries:** Custom metrics (sessions, engagement)
- **Charting:** Recharts or Chart.js (lightweight, zero config)

---

## 3.9 Newsletter Signup

### Form Placement
- **Homepage:** "Join our community" banner (above footer)
- **Sidebar:** Small signup widget (Phase 3+)
- **Exit intent:** Popup when user leaves (Phase 3+)

**Form:**
```
Email signup for THE ROYAL CLUB Newsletter

[Email input box]
[Subscribe button]

☑ I agree to receive emails about THE ROYAL CLUB

[Privacy policy link]
```

### Integration
- **Service:** Mailchimp or SendGrid
- **List:** "Newsletter Subscribers"
- **Welcome Email:** Auto-sent when user subscribes

### Newsletter Content
- **Frequency:** Weekly (Friday, 6 PM)
- **Content:** Highlights of past week, upcoming sessions, member spotlight, tips
- **Unsubscribe:** Easy 1-click unsubscribe

---

## 3.10 Performance & SEO

### SEO Optimization
- **Meta Tags:** Title, description, keywords per page
- **Open Graph:** Facebook sharing cards with preview
- **Structured Data:** JSON-LD for schema.org (Organization, BroadcastEvent)
- **Sitemap:** Auto-generated, submitted to Google
- **Robots.txt:** Guide crawlers, disallow `/admin`

### Performance Targets
- **Lighthouse Score:** >90 (all categories)
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Bundle Size:** <150KB (gzipped)

### Optimization Techniques
- Code splitting (route-based)
- Image optimization (AVIF + WebP)
- Lazy loading (intersection observer)
- Caching strategy (HTTP + service worker)
- CDN for assets (Firebase/Vercel built-in)

---

## 3.11 Scaling & Infrastructure

### Database Migration (If Needed)
- **Firestore Spark → Blaze Plan:** Pay-as-you-go (still free for low traffic)
- **Consider:** PostgreSQL + Supabase if Firestore costs exceed budget

### Hosting Upgrade Path
- **Vercel:** Scale automatically, add custom domain
- **Firebase Hosting:** Simple, same provider as DB
- **Option:** Move to AWS/GCP if traffic requires (Phase 4+)

### Monitoring & Alerts
- **Uptime Monitoring:** StatusPage or Pingdom (free tier)
- **Error Tracking:** Sentry (free tier for 5K errors/month)
- **Performance:** Vercel Analytics (built-in)
- **Database:** Firebase console (quota alerts)

---

## 3.12 Phase 3 Success Criteria

- [ ] Custom domain registered and DNS configured
- [ ] Dark mode toggle working, persisted
- [ ] Multi-language (Hindi/English) fully implemented
- [ ] Direct messaging between members working
- [ ] Leaderboard displaying correctly
- [ ] Advanced notifications delivered reliably
- [ ] Testimonials page working, with voting
- [ ] Analytics dashboard showing real data
- [ ] Newsletter signup functional (SendGrid/Mailchimp)
- [ ] SEO: Google Search Console verification, indexed pages
- [ ] Performance: Lighthouse >90 score
- [ ] Accessibility: WCAG 2.1 AA compliance

---

---

# 📊 Timeline & Milestones

| Phase | Duration | Start | End | Deliverables |
|-------|----------|-------|-----|--------------|
| **Phase 1** | 4-6 weeks | Week 1 | Week 6 | MVP live, all core features |
| **Phase 2** | 4 weeks | Week 7 | Week 10 | Engagement features, notifications |
| **Phase 3** | 4-6 weeks | Week 11 | Week 16 | Polish, custom domain, advanced features |

---

# 🛠️ Development Workflow

## Week-by-Week Breakdown (Phase 1)

### Week 1: Setup & Design
- [ ] Set up React + Vite + Tailwind project
- [ ] Configure Firebase (Firestore, Auth, Storage)
- [ ] Design system (tokens, components)
- [ ] Setup GitHub repo + CI/CD (Vercel auto-deploy)
- [ ] Create component library (Button, Card, Modal, etc.)

### Week 2: Hero Animation & Homepage
- [ ] Implement scroll animation (GSAP + ScrollTrigger)
- [ ] Build navigation bar
- [ ] Build hero image section
- [ ] Build "Live Now" banner (static for now)
- [ ] Responsive testing (mobile)

### Week 3: Schedule & Member Directory
- [ ] Create schedule data model in Firestore
- [ ] Build schedule display (card grid)
- [ ] Build member directory (cards + profiles)
- [ ] Set up member photos storage (Firebase Storage)
- [ ] Implement member profile modal/page

### Week 4: Admin Dashboard & Auth
- [ ] Build login/registration flow (Firebase Auth)
- [ ] Create admin dashboard layout
- [ ] Build schedule editor (CRUD operations)
- [ ] Build member manager
- [ ] Implement role-based access control

### Week 5: Auto-Updating & Poster
- [ ] Implement real-time schedule updates (Firestore listeners)
- [ ] Build "Live Now" auto-refresh logic
- [ ] Build automated poster section
- [ ] Build footer + about section
- [ ] Deploy to Vercel

### Week 6: Testing & Polish
- [ ] End-to-end testing (all user flows)
- [ ] Mobile responsiveness testing
- [ ] Performance optimization (Lighthouse)
- [ ] Bug fixes
- [ ] Launch MVP! 🚀

---

# 💡 Important Notes & Assumptions

## Assumptions Made in This PRD

1. **12 Members Fixed:** No membership growth in Phase 1 (easy to scale later)
2. **Daily Schedule:** One schedule per day (can add weekly/monthly views in Phase 2)
3. **No Real Payments:** No billing system yet (if needed, add Stripe Phase 3+)
4. **Facebook-Only:** Integration only with Facebook Live (not YouTube, etc.)
5. **English/Hindi Mix:** UI in English, messages in Hindi/English
6. **India Timezone:** All times default to IST (UTC+5:30), but Phase 2 adds timezone selector

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Firebase quota exceeded | App goes down | Cache data locally, increase scrubbing interval |
| Member photos slow load | Poor UX on mobile | Compress via Cloudinary, lazy-load |
| Scroll animation janky | Bad first impression | Test on real devices, reduce frame count on mobile |
| Admin dashboard complex | Admin confused | Simple CRUD only, good help tooltips |
| Facebook API rate limits | Auto-detection fails | Manual fallback, no hard dependency on API |
| Members don't use chat | Dead feature | Make it prominent, incentivize (Phase 2+) |

---

# 📞 Support & Iteration

## MVP Launch Feedback (Post-Week 6)

Expect to iterate on:
- Hero animation timing (may need tweaks)
- Schedule card layout (based on actual data volume)
- Admin UX (may need additional fields)
- Mobile performance (may find device-specific issues)

## Phase 2 Prioritization (Post-Week 10)

Vote with members on most wanted Phase 2 feature:
- Notifications (likely winner)
- Chat/Forum (engagement)
- Analytics (for CEO)
- Archive (nice-to-have)

## Phase 3 Prioritization (Post-Week 16)

Based on real usage data:
- Dark mode (if requested often)
- Multi-language (if Hindi speakers want it)
- Direct messaging (if used organically)
- Leaderboard (if competitive interest)

---

# ✅ Checklist: Ready to Start?

Before beginning development:

- [ ] You've confirmed the 12 member details (names, photos, roles)
- [ ] You've gathered hero scroll messages (Hindi/English)
- [ ] You've set a CEO password/email
- [ ] You've created initial schedule (7-day sample)
- [ ] You've confirmed color palette
- [ ] You have logo files (vector + PNG)
- [ ] You have Facebook group/page link ready
- [ ] You've created GitHub repo (or will do Week 1)
- [ ] You've created Firebase project (or will do Week 1)
- [ ] You've read through this entire PRD and flagged any questions

---

**Questions? Let's refine before we start building.** 🚀

