# 🎯 THE ROYAL CLUB — Week-by-Week Sprint Guide

**Quick Reference for Development Execution**

Use this guide alongside the main PRD and Technical Spec. Each week has:
- **Priority tasks** (must-do)
- **Optional enhancements** (nice-to-have)
- **Deliverables** (what's done)
- **Testing checklist**
- **Deployment steps** (if applicable)

---

# PHASE 1: MVP (Weeks 1-6)

## Week 1: Project Setup & Design System

### Priority Tasks

- [ ] **GitHub Setup**
  - Create GitHub repo: `theroyalclub/website`
  - Add `.gitignore`, `README.md`, `LICENSE`
  - Create branches: `main` (production), `develop` (dev)

- [ ] **Frontend Setup**
  ```bash
  npm create vite@latest theroyalclub -- --template react
  cd theroyalclub
  npm install
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npm install gsap axios react-router-dom
  ```

- [ ] **Firebase Project Setup**
  - Go to Firebase Console, create new project: `the-royal-club`
  - Enable Firestore Database (Start in test mode, update rules in Week 4)
  - Enable Authentication (Email/Password provider)
  - Enable Storage (for member photos)
  - Create Web App in Firebase
  - Copy config to `.env.local`

- [ ] **Tailwind CSS Configuration**
  - Define custom colors in `tailwind.config.js`:
    ```javascript
    colors: {
      'royal-green': '#1B4D3E',
      'gold': '#C9A227',
      'cream': '#F5F0E6',
      'deep-gold': '#8B6914',
      'dark-green': '#0F2E26'
    }
    ```
  - Set up responsive breakpoints (mobile, tablet, desktop)

- [ ] **Component Library (UI Kit)**
  - Create base components in `src/components/common/`:
    - `Button.jsx` (primary, secondary, outline variants)
    - `Card.jsx` (base card with shadow, hover effects)
    - `Modal.jsx` (reusable modal with close button)
    - `Input.jsx` (text input with labels, error states)
    - `Badge.jsx` (for status indicators: upcoming, live, completed)
  - Document each component with props

- [ ] **Project Structure**
  - Create folder structure (see Technical Spec)
  - Set up routing structure in `App.jsx`
  - Create `constants.js` with app config

- [ ] **Design Tokens**
  - Create `src/styles/tokens.js`:
    ```javascript
    export const colors = { /* ... */ };
    export const typography = { /* ... */ };
    export const spacing = { /* ... */ };
    export const animations = { /* ... */ };
    ```

### Optional Enhancements
- Add ESLint + Prettier for code formatting
- Set up GitHub Actions for auto-deploy on push

### Deliverables
- ✅ GitHub repo with initial structure
- ✅ Firebase project created & configured
- ✅ Tailwind + React project running locally
- ✅ Component library (5-6 base components)
- ✅ Design tokens defined

### Testing Checklist
- [ ] `npm run dev` starts dev server without errors
- [ ] Firebase credentials loaded (check console)
- [ ] Tailwind CSS compiling correctly
- [ ] Component library components render correctly in Storybook (or simple test page)

### Deploy
- No deployment yet (local only)

---

## Week 2: Hero Animation & Navigation

### Priority Tasks

- [ ] **GSAP & ScrollTrigger Setup**
  ```bash
  npm install gsap
  ```
  - Test GSAP basics in a standalone component first
  - Document scroll trigger syntax

- [ ] **Hero Scroll Animation Component**
  - Create `src/components/hero/HeroScroll.jsx`
  - **Implement 6-frame logo assembly:**
    - Frame 0: Scattered pieces (CSS initial state)
    - Frame 1-5: Progressive assembly (GSAP animations)
  - **Messages fade-in/out at scroll triggers:**
    - 20%: "Welcome to THE ROYAL CLUB"
    - 35%: "सम्मान बाँटो, प्यार अपने आप मिलेगा"
    - 50%: "Unity in Diversity"
    - 70%: "Together We Rise"
    - 85%: "Every Voice Matters"
    - 95%: "Enter The Club" CTA appears
  - **Scroll progress: 0-100vh** (full viewport height)
  - Mobile: Reduce to 4 frames, double scroll distance

- [ ] **Hero Image Section**
  - Create `src/components/hero/HeroImage.jsx`
  - Full-width banner (60vh desktop, 50vh mobile)
  - Background image or gradient
  - Centered text: Heading + subtitle + CTA button
  - Scroll fade-in animation

- [ ] **Navigation Bar Component**
  - Create `src/components/common/Navbar.jsx`
  - Logo (left, clickable → /)
  - Nav links (center): Home | Members | Schedule | Live | About
  - Login button (right, outline)
  - Hamburger menu (mobile)
  - Sticky positioning with transparent → solid on scroll
  - Active link highlighting

- [ ] **Mobile Menu (Hamburger)**
  - Slide-in menu from right
  - Overlay (click to close)
  - Same nav links
  - Smooth animations

- [ ] **Routing Setup**
  - Install `react-router-dom`
  - Set up routes in `App.jsx`:
    - `/` → Home (hero + sections)
    - `/login` → Login page (stub)
    - `/admin` → Admin (stub)
  - Error boundary component for error handling

### Optional Enhancements
- Add subtle gold particle effects to hero background (CSS animations, not heavy)
- Keyboard navigation for hero (arrow keys to scroll through frames)
- Accessibility: ARIA labels on buttons, skip-to-content link

### Deliverables
- ✅ Hero scroll animation working (desktop + mobile)
- ✅ Navigation bar sticky & responsive
- ✅ Basic routing structure
- ✅ Hamburger menu functional

### Testing Checklist
- [ ] Hero scroll smooth on Chrome, Firefox, Safari (desktop)
- [ ] Hero animation on mobile (iPhone, Android simulator)
- [ ] Nav links navigate correctly
- [ ] Hamburger menu opens/closes
- [ ] Logo clickable → home
- [ ] Responsive at 768px breakpoint (menu changes to hamburger)

### Deploy
- Deploy to Vercel preview (auto-deploys on git push to develop)
- Test preview URL on mobile

---

## Week 3: Schedule & Member Directory

### Priority Tasks

- [ ] **Schedule Data Model in Firestore**
  - Create Firestore collection: `schedules`
  - Add sample data for 7 days (12 members × 1 session/day = 84 documents)
  - Document structure (see Technical Spec)

- [ ] **Member Data in Firestore**
  - Create Firestore collection: `users`
  - Add 12 member profiles (you provide names, photos, bios)
  - Add CEO profile
  - Document structure (see Technical Spec)

- [ ] **Image Upload to Firebase Storage**
  - Set up Firebase Storage bucket
  - Upload 12 member photos (400×400px, <100KB each)
  - Update user documents with `photoUrl` field
  - Test image loading (use browser DevTools to throttle network)

- [ ] **Schedule Service**
  - Create `src/services/scheduleService.js`:
    ```javascript
    export const fetchSchedulesForDate = (date) => { /* ... */ }
    export const fetchLiveNow = () => { /* ... */ }
    export const fetchUpNext = () => { /* ... */ }
    ```
  - Use Firestore queries to filter by date, status
  - Add caching layer (localStorage)

- [ ] **Schedule Display Component**
  - Create `src/components/schedule/ScheduleCard.jsx`
  - Design: Time | Photo | Name | Topic | Button
  - Status badges: "Upcoming", "Live", "Completed"
  - Mobile: Stack vertically
  - Click → show full topic description

- [ ] **Schedule Grid**
  - Create `src/components/schedule/ScheduleGrid.jsx`
  - Display all 12 slots for today
  - Responsive: 3 cols (desktop), 2 (tablet), 1 (mobile)
  - No edit/delete yet (Phase 1 is view-only for non-admins)

- [ ] **Member Service**
  - Create `src/services/memberService.js`:
    ```javascript
    export const fetchAllMembers = () => { /* ... */ }
    export const fetchMemberById = (memberId) => { /* ... */ }
    ```

- [ ] **Member Card Component**
  - Create `src/components/member/MemberCard.jsx`
  - Design: Photo | Name | Role badge | Bio snippet | Social icons | View Profile button
  - Hover: Scale 1.05, shadow depth

- [ ] **Member Grid**
  - Create `src/components/member/MemberGrid.jsx`
  - Display all 12 members
  - Same responsive grid as schedule

- [ ] **Member Profile Modal/Page**
  - Create `src/components/member/MemberProfile.jsx`
  - Show: Photo | Full bio | Social links | Member since | All scheduled sessions
  - Trigger on card click (modal or route to `/member/:id`)

- [ ] **Today's Schedule Section (Homepage)**
  - Integrate ScheduleGrid into homepage
  - Section heading: "Today's Schedule"
  - Auto-fetch current date's schedule on mount

- [ ] **Member Directory Section (Homepage)**
  - Integrate MemberGrid into homepage
  - Section heading: "Meet The Members"

### Optional Enhancements
- Lazy-load member photos (intersection observer)
- Skeleton loaders while fetching schedule/members
- Toast notification for schedule updates

### Deliverables
- ✅ Schedule & member data in Firestore
- ✅ Member photos uploaded to Firebase Storage
- ✅ Schedule & member services (fetch logic)
- ✅ ScheduleCard, MemberCard components
- ✅ ScheduleGrid, MemberGrid working
- ✅ MemberProfile page/modal working
- ✅ Schedule + Member sections on homepage

### Testing Checklist
- [ ] Schedule data loads and displays correctly
- [ ] Member photos load and display (check network tab)
- [ ] Responsive grid layout at all breakpoints
- [ ] Click member card → profile opens
- [ ] Profile shows all member's scheduled sessions
- [ ] No console errors (Firebase auth warnings are OK for now)
- [ ] Performance: Lighthouse score >80

### Deploy
- Deploy to Vercel
- Test on mobile preview

---

## Week 4: Authentication & Admin Dashboard (Part 1)

### Priority Tasks

- [ ] **Firebase Security Rules**
  - Update Firestore security rules (see Technical Spec)
  - Set to restrict access (test mode → production mode)
  - Test rules with Firestore emulator (optional, advanced)

- [ ] **Auth Service**
  - Create `src/services/authService.js`:
    ```javascript
    export const loginUser = (email, password) => { /* ... */ }
    export const registerUser = (email, password, name) => { /* ... */ }
    export const logoutUser = () => { /* ... */ }
    export const getCurrentUser = () => { /* ... */ }
    ```
  - Use Firebase Authentication API

- [ ] **Auth Context & Hook**
  - Create `src/context/AuthContext.jsx`
  - Provide `useAuth()` hook for components
  - Track: currentUser, loading, error

- [ ] **Login Page**
  - Create `src/pages/Login.jsx`
  - Form: Email + Password
  - Submit button: "Login"
  - Error handling (show error messages)
  - Link to register page
  - Link to password reset (stub)
  - Redirect to home if already logged in

- [ ] **Registration Page**
  - Create `src/pages/Register.jsx`
  - Form: Email + Password + Name + Invite Code
  - Validation: Email format, password strength, invite code validity
  - Error handling
  - Submit creates Firestore user document + Firebase Auth account
  - Redirect to login on success

- [ ] **Invite Code System (Phase 1 Basic)**
  - Create Firestore collection: `inviteCodes`
  - CEO creates invite codes (manual for now, will automate later)
  - Sample code: `ROYAL-2026-ABC123` (expires 7 days)
  - During registration, validate invite code exists & is active

- [ ] **Admin Dashboard Layout**
  - Create `src/pages/Admin.jsx`
  - Check role: only CEO can access
  - Sidebar nav: Schedule Manager | Member Manager | Settings | Analytics
  - Main content area changes based on sidebar selection
  - Logout button

- [ ] **Admin: Schedule Manager (Week 4)**
  - Tab 1: View schedules (this week)
  - Grid view: 7 days × 12 time slots
  - Each cell shows: Member name + Topic
  - Color coding: Green (upcoming), Red (live), Grey (completed)
  - Click cell → modal to edit details
  - No bulk operations yet (Phase 2)

- [ ] **Admin: Member Manager**
  - Tab 2: View all members
  - List: Name | Role | Joined | Active status
  - Click member → modal to view/edit profile
  - Edit form: Name, bio, photo, social links
  - No add/delete yet (Phase 1)

### Optional Enhancements
- Password strength indicator during registration
- Email verification before account activation (advanced, Phase 3)
- Session timeout warning (Phase 2)

### Deliverables
- ✅ Firebase Security Rules configured
- ✅ Auth service (login, register, logout)
- ✅ Auth Context & useAuth hook
- ✅ Login & Register pages
- ✅ Invite code system
- ✅ Admin dashboard structure
- ✅ Schedule Manager (view-only)
- ✅ Member Manager (view-only)

### Testing Checklist
- [ ] Login with valid credentials → redirects to home
- [ ] Login with wrong password → shows error
- [ ] Register with new email + valid invite → creates account
- [ ] Register with invalid invite → shows error
- [ ] Logout → redirects to login
- [ ] Non-CEO user tries to access `/admin` → redirected
- [ ] CEO can access admin dashboard
- [ ] Admin dashboard displays all schedules & members

### Deploy
- Deploy to Vercel
- Test auth flows on live preview

---

## Week 5: Live Now Banner & Auto-Update Logic

### Priority Tasks

- [ ] **Live Now Banner Component**
  - Create `src/components/schedule/LiveNowBanner.jsx`
  - Layout: Full-width, gold border, dark green background
  - Show either "LIVE NOW" or "UP NEXT" state
  - Content: Member photo + name + time + topic + button
  - Mobile: Stack vertically

- [ ] **Live Now Logic**
  - Query Firestore for today's schedules
  - Find schedule with status = "live"
  - If none, show schedule with earliest time > now
  - Update component in real-time using Firestore listener

- [ ] **Auto-Refresh Mechanism**
  - Set up Firestore real-time listener (no polling)
  - Listener triggers on schedule document changes
  - Update "Live Now" banner instantly
  - Cache schedule in Context to reduce Firestore reads

- [ ] **Automated Poster Section**
  - Create `src/components/schedule/PosterSection.jsx`
  - Large vertical poster (500×650px desktop)
  - Background: Royal green + gold ornamental borders (CSS)
  - Content: "TONIGHT ON" | Logo | Member photo | Name | Time | Topic | CTA button
  - Below poster: "Up Next" timeline (next 2 sessions)
  - Updates when schedule changes (listener)

- [ ] **About / Mission Section**
  - Create `src/components/sections/AboutSection.jsx`
  - Two-column layout (desktop): Logo left, text right
  - Content:
    - Heading: "About THE ROYAL CLUB"
    - Tagline: "सम्मान बाँटो, प्यार अपने आप मिलेगा"
    - Mission text (3-4 paragraphs, you provide)
    - Stats row: "12 Members | Daily Lives | Growing Community"
  - Mobile: Single column, centered

- [ ] **Footer Component**
  - Create `src/components/common/Footer.jsx`
  - Logo, quick links, social media icons
  - Copyright text
  - Responsive design

- [ ] **Homepage Assembly**
  - Add all sections to `src/pages/Home.jsx`:
    1. HeroScroll
    2. HeroImage
    3. LiveNowBanner
    4. TodaySchedule section
    5. MemberDirectory section
    6. PosterSection
    7. AboutSection
    8. Footer
  - Test scroll flow & section spacing

- [ ] **Member Scheduled Sessions (Admin Edit)**
  - Allow CEO to edit schedule:
    - Click schedule card in admin → modal opens
    - Edit fields: Topic, description, member (reassign), status
    - Save → updates Firestore → banner updates in real-time
    - Validation: Don't allow empty topic, invalid times

### Optional Enhancements
- Animated transitions between poster updates
- Sound notification when someone goes live (Phase 2)
- Countdown timer to next session

### Deliverables
- ✅ LiveNowBanner component & logic
- ✅ Auto-update listener setup
- ✅ Poster section displays correctly
- ✅ About & Mission section
- ✅ Footer
- ✅ Full homepage assembly
- ✅ Admin: Schedule edit functionality

### Testing Checklist
- [ ] Banner shows correct member when schedule status = "live"
- [ ] Banner shows "UP NEXT" when no one is live
- [ ] Banner updates instantly when schedule changes (test in Firestore Console)
- [ ] Poster displays correct member & time
- [ ] Poster updates when schedule changes
- [ ] All homepage sections responsive on mobile
- [ ] Footer links work
- [ ] Admin schedule edit saves changes to Firestore
- [ ] Lighthouse score still >80

### Deploy
- Deploy to Vercel
- Test real-time updates on live preview

---

## Week 6: Testing, Optimization & MVP Launch

### Priority Tasks

- [ ] **Performance Optimization**
  - Analyze Lighthouse report
  - Compress member photos (WebP, AVIF via Cloudinary)
  - Code-split routes (lazy-load admin, member pages)
  - Remove unused Tailwind classes
  - Minify assets
  - Target: Lighthouse >85

- [ ] **Responsive Testing**
  - Test on real devices: iPhone, Android, iPad, desktop
  - Check all breakpoints: 320px, 768px, 1024px
  - Test touch interactions (hamburger menu, modals)
  - Test form inputs on mobile (keyboard appearance)

- [ ] **End-to-End Testing (Manual)**
  - User flow 1: Visitor lands on home → scrolls hero → views schedules & members
  - User flow 2: New member registers with invite code → logs in → views profile
  - User flow 3: CEO logs in → views admin dashboard → edits schedule → updates reflect instantly
  - User flow 4: Member on different device sees updated schedule in real-time

- [ ] **Cross-Browser Testing**
  - Chrome, Firefox, Safari (desktop)
  - Safari (iPhone), Chrome (Android)
  - No major visual bugs

- [ ] **Accessibility Audit**
  - All buttons/links keyboard-navigable (Tab key)
  - Form labels associated with inputs
  - ARIA labels on icons
  - Color contrast: Gold on dark green readable
  - alt text on images
  - Test with screen reader (NVDA, JAWS, VoiceOver)

- [ ] **Error Handling**
  - Test network errors (dev tools throttle)
  - Test Firebase quota exceeded
  - Test invalid invite codes
  - Test login with wrong credentials
  - Ensure user-friendly error messages

- [ ] **Security Review**
  - No console.log with sensitive data
  - No hardcoded passwords/API keys (use .env)
  - Firebase rules locked down (test mode → production)
  - HTTPS enabled (Vercel default)
  - CORS properly configured

- [ ] **Documentation**
  - Update README.md with:
    - Project overview
    - Setup instructions (npm install, .env setup)
    - How to run locally
    - Deployment steps
    - Known issues & workarounds
  - Create CONTRIBUTING.md for future developers
  - Document API contracts (see Technical Spec)

- [ ] **Final QA Checklist**
  - [ ] No console errors or warnings
  - [ ] All links work (external & internal)
  - [ ] All buttons functional
  - [ ] Forms submit correctly
  - [ ] Images load on slow network
  - [ ] Mobile hamburger menu works
  - [ ] Deep links work (share schedule URL)
  - [ ] Redirects work (admin → login if not authorized)

- [ ] **Prepare for Launch**
  - Backup Firebase data
  - Set up monitoring (Vercel Analytics)
  - Set up error tracking (optional: Sentry)
  - Create status page or monitoring dashboard
  - Prepare launch email to members

### Optional Enhancements
- Add Google Analytics for traffic tracking
- Set up CI/CD pipeline (GitHub Actions)
- Create Storybook for component library

### Deliverables
- ✅ Lighthouse score >85 (all metrics)
- ✅ Responsive on all devices & breakpoints
- ✅ All user flows tested & working
- ✅ Accessibility audit passed
- ✅ Security review completed
- ✅ README & documentation updated
- ✅ QA checklist passed
- ✅ **MVP LIVE! 🚀**

### Testing Checklist
- [ ] Lighthouse score >85
- [ ] Mobile responsive (tested on real devices)
- [ ] All user flows work without errors
- [ ] Cross-browser compatibility checked
- [ ] Accessibility WCAG 2.1 AA compliance
- [ ] No security vulnerabilities
- [ ] Performance budget met (<3s initial load)

### Deploy
- **PRODUCTION DEPLOY**
- Merge develop → main branch
- Vercel auto-deploys production build
- Monitor Vercel Analytics for issues
- Share live URL with members!

---

---

# PHASE 2: Growth & Engagement (Weeks 7-10)

## Week 7: Email Notifications & Invite System

### Priority Tasks

- [ ] **SendGrid Setup**
  - Create SendGrid free account
  - Verify sender domain (optional for free tier)
  - Get API key
  - Store in `.env` as `VITE_SENDGRID_API_KEY`

- [ ] **Email Service**
  - Create `src/services/emailService.js`
  - Functions:
    - `sendScheduleDigest(memberId)` - Daily at 7 AM
    - `sendLiveNowAlert(memberId, memberName)` - When live
    - `sendReminderEmail(memberId)` - 30 mins before slot
  - Use SendGrid email templates (create in dashboard)

- [ ] **Admin: Invite Code Generation**
  - Add button in admin dashboard: "Generate Invite"
  - Form: Email (optional), role, expiration date
  - Create Firestore `inviteCodes` document
  - Generate unique code & link
  - Display link to copy

- [ ] **Notification Preferences Page**
  - Create `src/pages/Settings.jsx` (member only)
  - Sections:
    - Notification Preferences (checkboxes for each email type)
    - Privacy Settings (profile visibility, email sharing)
    - Account Settings (change password, logout all devices)
  - Save preferences to Firestore user document

- [ ] **Firebase Cloud Functions (Optional, Advanced)**
  - Set up Cloud Functions for scheduled emails
  - Function 1: Trigger daily digest at 7 AM
  - Function 2: Trigger reminder 30 mins before session
  - Deploy functions to Firebase

### Optional Enhancements
- SMS notifications (Phase 3+)
- In-app notification toasts (don't need email for everything)

### Deliverables
- ✅ SendGrid email service working
- ✅ Invite code generation in admin
- ✅ Settings page with notification preferences
- ✅ Cloud Functions for scheduled emails (optional)

### Testing Checklist
- [ ] Send test email via SendGrid
- [ ] Generate invite code → receive email with link
- [ ] Settings page saves preferences
- [ ] Daily digest email sent (test with manual trigger)
- [ ] Reminder email sent 30 mins before live

### Deploy
- Deploy to Vercel
- Test email delivery on live environment

---

## Week 8: Chat Room & Forum

### Priority Tasks

- [ ] **Chat Service**
  - Create `src/services/chatService.js`
  - Functions:
    - `fetchMessages(roomId, limit, offset)` - Get messages with pagination
    - `sendMessage(message)` - Post message to Firestore
    - `editMessage(messageId, newText)` - Edit own message
    - `deleteMessage(messageId)` - Delete message
    - `pinMessage(messageId)` - Pin message (CEO only)
  - Use Firestore real-time listeners for instant updates

- [ ] **Chat Context**
  - Create `src/context/ChatContext.jsx`
  - Provide:
    - `messages` array
    - `sendMessage()`, `editMessage()`, `deleteMessage()` functions
    - `unreadCount` (Phase 3)

- [ ] **Chat Room Component**
  - Create `src/components/chat/ChatRoom.jsx`
  - Full-page or modal layout
  - Message thread (scrollable)
  - Message input at bottom with Send button

- [ ] **Chat Message Component**
  - Create `src/components/chat/ChatMessage.jsx`
  - Show: Member photo | Name | Message | Timestamp
  - Actions (hover): Edit (5-min window), Delete, React (Phase 3)
  - Differentiate own messages (align right)

- [ ] **Chat UI Integration**
  - Add Chat link to navbar
  - Create `/chat` route
  - Show unread count badge (Phase 3)

### Optional Enhancements
- Message search functionality
- Emoji picker
- Mention notifications (@MemberName)

### Deliverables
- ✅ Chat service with full CRUD
- ✅ ChatRoom & ChatMessage components
- ✅ Real-time message updates
- ✅ Chat route accessible from navbar

### Testing Checklist
- [ ] Send message → appears instantly for all users
- [ ] Edit message → updates for all users within 5 mins
- [ ] Delete message → removes from all users
- [ ] Message pagination (load older messages on scroll)
- [ ] Firestore collection `chatMessages` populated correctly

### Deploy
- Deploy to Vercel
- Test real-time chat with multiple browser windows

---

## Week 9: Archive & Analytics (Phase 2)

### Priority Tasks

- [ ] **Archive Service**
  - Create `src/services/archiveService.js`
  - Query completed schedules from Firestore
  - Filter by member, date range, topic
  - Get Facebook video metadata (optional)

- [ ] **Archive Page**
  - Create `src/pages/Archive.jsx` or `/archive` route
  - Left sidebar: Filters (member dropdown, date range, search)
  - Main area: Grid of past session cards
  - Each card: Thumbnail | Member | Topic | Date | View button

- [ ] **Archive Card Component**
  - Create `src/components/archive/ArchiveCard.jsx`
  - Click → modal with embedded Facebook video (if available)
  - Show: Full topic description, member bio, estimated views

- [ ] **Analytics Dashboard (Phase 2 Basic)**
  - Create `src/pages/Analytics.jsx` (CEO only)
  - Display 4 key cards:
    1. Total page views (all-time, weekly trend)
    2. Top members by clicks
    3. Schedule completion rate (%)
    4. Chat activity (messages this week)
  - Use Firestore aggregations + Google Analytics 4

- [ ] **Google Analytics 4 Setup**
  - Create GA4 property
  - Add tracking code to React app
  - Track: Page views, user behavior, event tracking
  - Test with Google Analytics DebugView

- [ ] **Analytics Charts**
  - Use Recharts (lightweight charting library)
  - Chart 1: Line chart (daily page views, 30 days)
  - Chart 2: Bar chart (top members by engagement)
  - Chart 3: Pie chart (traffic sources)

### Optional Enhancements
- Export analytics as PDF or CSV
- Scheduled email with weekly digest

### Deliverables
- ✅ Archive page with filters & cards
- ✅ Archive modal with video embed (if available)
- ✅ Analytics dashboard with 4 key metrics
- ✅ Google Analytics 4 integrated
- ✅ Recharts displaying real data

### Testing Checklist
- [ ] Archive shows all completed sessions
- [ ] Filters work (member, date range)
- [ ] Click archive card → modal opens with video
- [ ] Analytics dashboard displays real page view data
- [ ] Charts display correct data (verify in Firestore)
- [ ] GA4 events tracked correctly (check in GA dashboard)

### Deploy
- Deploy to Vercel
- Verify GA4 data collection

---

## Week 10: Facebook Live Detection & Polish

### Priority Tasks

- [ ] **Facebook Graph API Setup (Basic)**
  - Create Facebook App (if not done yet)
  - Get App ID & App Secret
  - Store in `.env`
  - Document API endpoint for live stream detection

- [ ] **Live Detection Logic**
  - When member marks "Going Live" in schedule:
    - Start 5-minute countdown
    - Set status to "going_live_soon"
  - After 5 mins, query Facebook Graph API to check for live stream
  - If found → Update Firestore status to "live"
  - If not found → Keep as "upcoming" (manual fallback)

- [ ] **Going Live Button (Member)**
  - Add to schedule card (if it's their slot):
    - Button: "Mark as Going Live"
    - Countdown timer appears
    - Turns into "Going Live" state with 🔴 badge

- [ ] **Notification When Live**
  - When status changes to "live":
    - Toast notification in app
    - Send email to all members (Phase 2)
    - Update "Live Now" banner

- [ ] **Phase 2 Final Polish**
  - Performance: Re-test Lighthouse (target >85)
  - Accessibility: Re-audit with screen reader
  - Mobile: Test on latest iOS & Android
  - Cross-browser: Re-test Chrome, Firefox, Safari

- [ ] **Phase 2 Documentation**
  - Update README with Phase 2 features
  - Document email templates
  - Document analytics setup
  - Create user guide (for members & CEO)

- [ ] **Known Issues & Workarounds**
  - Document any bugs found during testing
  - Create GitHub Issues for future fixes
  - Mark as "Phase 3+" if not critical

### Optional Enhancements
- Slack integration (post to Slack when live)
- SMS notifications (Twilio integration)

### Deliverables
- ✅ Facebook Live detection logic
- ✅ "Going Live" button on schedules
- ✅ Live notifications working
- ✅ Phase 2 complete & tested
- ✅ Documentation updated

### Testing Checklist
- [ ] Member clicks "Going Live" → countdown starts
- [ ] After 5 mins → Facebook API checks for live stream
- [ ] Live status updates → banner shows live, members notified
- [ ] Manual fallback: CEO can mark as live if detection fails
- [ ] Lighthouse score >85
- [ ] Accessibility audit passed
- [ ] No critical bugs

### Deploy
- **PHASE 2 LAUNCH**
- Merge develop → main
- Deploy to production
- Send announcement email to members

---

---

# PHASE 3: Polish & Scaling (Weeks 11+)

## Weeks 11-12: Custom Domain, Dark Mode, Multi-Language

### Priority Tasks

- [ ] **Custom Domain Setup**
  - Purchase domain: `theroyalclub.com` (GoDaddy, Namecheap, etc.)
  - Point DNS to Vercel (A records, CNAME)
  - Enable SSL (auto-managed by Vercel)
  - Update Firebase allowed domains

- [ ] **Dark Mode Implementation**
  - Create `src/context/ThemeContext.jsx`
  - useTheme hook (similar to useAuth)
  - Dark theme color palette (re-skin existing colors)
  - Toggle button in navbar (sun/moon icon)
  - Persist preference to localStorage
  - Respect `prefers-color-scheme` OS setting

- [ ] **Multi-Language (i18n)**
  - Install `react-i18next`
  - Create translation files:
    - `src/locales/en.json` (English)
    - `src/locales/hi.json` (Hindi)
  - Wrap app with i18nProvider
  - Add language selector in settings
  - Persist language preference to localStorage

- [ ] **Testimonials Section (Phase 3)**
  - Create Firestore collection: `testimonials`
  - Add admin form to submit testimonials
  - Display testimonials grid on homepage or dedicated page
  - Rotation (daily testimonial featured)

### Deliverables
- ✅ Custom domain working
- ✅ Dark mode toggle & persistent
- ✅ Multi-language (Hindi/English) working
- ✅ Testimonials feature complete

### Deploy
- Deploy with custom domain

---

## Weeks 13-14: Direct Messaging & Leaderboard

### Priority Tasks

- [ ] **Direct Messaging Service**
  - Create Firestore collections: `conversations`, `directMessages`
  - DM service functions: send, receive, mark as read, typing indicator

- [ ] **Direct Messages UI**
  - Create messaging page with conversation list
  - Message thread view with real-time updates
  - Read receipts & typing indicators

- [ ] **Leaderboard**
  - Create Firestore collection: `leaderboards` (monthly)
  - Calculate metrics: Sessions hosted, engagement, consistency
  - Display leaderboard page with rankings & badges
  - Award badges for achievements

### Deliverables
- ✅ Direct messaging working
- ✅ Leaderboard with rankings
- ✅ Achievement badges

### Deploy
- Deploy Phase 3 features

---

## Week 15: Advanced Notifications & Newsletter

### Priority Tasks

- [ ] **Web Push Notifications**
  - Set up service worker for push
  - Request browser notification permission
  - Send push notifications when live

- [ ] **Newsletter Signup**
  - Mailchimp or SendGrid list integration
  - Add signup form to homepage
  - Auto-send welcome email to new subscribers

- [ ] **Advanced Analytics**
  - Cohort analysis (member retention by signup week)
  - Funnel analysis (visitor → member → active → leader)
  - Export reports as PDF/CSV

### Deliverables
- ✅ Web push notifications
- ✅ Newsletter feature
- ✅ Advanced analytics

### Deploy
- Deploy Phase 3 final features

---

## Week 16+: Maintenance & Scaling

### Ongoing Tasks

- [ ] **Monitoring**
  - Set up uptime monitoring (StatusPage)
  - Set up error tracking (Sentry)
  - Monitor Firebase quota usage
  - Review Lighthouse scores weekly

- [ ] **User Support**
  - Answer member questions
  - Fix bugs as they arise
  - Gather feedback for future improvements

- [ ] **Future Enhancements**
  - Mobile app (React Native, Phase 4+)
  - Video replay & on-demand content
  - Member-to-member networking features
  - Sponsorship integrations

- [ ] **Security & Compliance**
  - Regular security audits
  - Update dependencies (npm outdated)
  - Backup Firestore data weekly
  - GDPR compliance review (if EU users)

---

---

# Quick Reference: Command Cheatsheet

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run preview               # Preview build locally
npm run lint                  # Run ESLint

# Firebase
firebase emulators:start       # Start local emulator suite
firebase deploy               # Deploy to Firebase Hosting

# Vercel
vercel                         # Deploy to Vercel
vercel --prod                 # Deploy to production

# Git
git checkout -b feature-name   # Create feature branch
git push origin feature-name   # Push to GitHub
git pull origin develop        # Pull latest changes

# Dependencies
npm install package-name       # Add package
npm update                     # Update all packages
npm audit fix                  # Fix security vulnerabilities
```

---

# Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Firebase auth not working | Check `.env` variables, ensure Auth enabled in Firebase Console |
| Images not loading | Verify Firebase Storage bucket, check CORS settings |
| Firestore queries slow | Add indexes (Firebase Console suggests them) |
| Scroll animation janky on mobile | Reduce frame count to 4, test on real device |
| Hero messages not updating | Check `settings` collection in Firestore, ensure listener set up |
| Admin dashboard blank | Check user role in Firestore, verify security rules |
| Email not sending | Check SendGrid API key, verify template created |
| Chat not real-time | Ensure Firestore listener is active, check network tab |

---

# Success Metrics

**Phase 1 MVP:**
- Website live & accessible
- 12 members registered
- 100% schedule completion (members going live on scheduled time)
- Lighthouse score >85

**Phase 2:**
- Email notifications delivered successfully
- Chat room active (messages flowing)
- Archive populated with past sessions
- Analytics dashboard showing real data

**Phase 3:**
- 50%+ members using direct messaging
- Dark mode toggle active
- Custom domain functional
- Newsletter 500+ subscribers

---

**Happy Building! 🚀 Feel free to iterate and adjust based on real user feedback.**

