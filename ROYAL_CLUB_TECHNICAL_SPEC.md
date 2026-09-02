# 🔧 THE ROYAL CLUB — Technical Specification

**Companion to:** ROYAL_CLUB_PRD_PHASES.md  
**Purpose:** Detailed API contracts, data models, and implementation details

---

## Table of Contents

1. [Database Schema (Firestore)](#database-schema)
2. [API Contracts](#api-contracts)
3. [Authentication & Authorization](#authentication--authorization)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Environment Variables](#environment-variables)
7. [Error Handling](#error-handling)
8. [Testing Strategy](#testing-strategy)

---

## Database Schema (Firestore)

### Collection: `users`

**Document ID:** Firebase Auth UID

```javascript
{
  uid: "auth-uid-001",
  email: "raj@example.com",
  displayName: "Raj Kumar",
  role: "member" | "ceo" | "admin",
  isActive: true,
  profile: {
    bio: "Short bio (100 chars)",
    bioFull: "Long bio (500 chars)",
    photoUrl: "https://...",
    joinDate: Timestamp("2026-01-15"),
    socialLinks: {
      facebook: "https://facebook.com/...",
      instagram: "https://instagram.com/...",
      linkedin: "https://linkedin.com/...",
      website: "https://..."
    },
    timezone: "Asia/Kolkata", // Phase 2
    language: "en" | "hi", // Phase 2
    quote: "Success is 1% inspiration..." // Phase 3
  },
  preferences: {
    notifications: {
      emailScheduleDigest: true,
      emailLiveNow: true,
      emailReminder: true,
      pushNotifications: true // Phase 2
    },
    privacy: {
      profilePublic: true,
      showEmailToMembers: false
    }
  },
  metadata: {
    createdAt: Timestamp("2026-01-15T10:00:00Z"),
    updatedAt: Timestamp("2026-07-20T14:30:00Z"),
    lastLoginAt: Timestamp("2026-07-20T14:30:00Z"),
    sessionsHosted: 28, // Phase 3 denormalization
    engagementScore: 95 // Phase 3 denormalization
  }
}
```

### Collection: `schedules`

**Document ID:** `{date}-{slotIndex}` (e.g., "2026-07-20-0")

```javascript
{
  scheduleId: "2026-07-20-0",
  date: "2026-07-20", // ISO date string
  slotIndex: 0, // 0-11 (12 slots per day)
  memberId: "member-001",
  memberName: "Raj Kumar", // denormalized for fast reads
  memberPhoto: "https://...", // denormalized
  startTime: "18:00", // 24-hour format, IST
  endTime: "19:00",
  topic: "Understanding Wealth Creation",
  description: "In this session...", // longer description, optional
  status: "upcoming" | "live" | "completed" | "cancelled",
  facebookLiveLink: "https://facebook.com/watch/?v=...", // nullable
  facebookVideoId: "video-id-123", // for later archive, Phase 2
  notes: "CEO internal notes", // optional
  metadata: {
    createdAt: Timestamp("2026-07-19T10:00:00Z"),
    updatedAt: Timestamp("2026-07-20T17:30:00Z"),
    markedLiveAt: Timestamp("2026-07-20T18:05:00Z"), // Phase 2
    completedAt: Timestamp("2026-07-20T19:15:00Z")
  }
}
```

**Index:** Composite index on `date` + `status` for quick lookups

### Collection: `chatMessages` (Phase 2)

**Document ID:** Auto-generated

```javascript
{
  messageId: "msg-001",
  roomId: "general", // only "general" in Phase 2
  memberId: "member-001",
  memberName: "Raj Kumar", // denormalized
  memberPhoto: "https://...", // denormalized
  message: "Hey everyone!",
  timestamp: Timestamp("2026-07-20T14:30:00Z"),
  edited: false,
  editedAt: null,
  isPinned: false,
  reactions: {
    "👍": ["member-002", "member-003"],
    "❤️": ["member-004"]
  },
  metadata: {
    deletedAt: null // for soft deletes
  }
}
```

**Index:** Composite index on `roomId` + `timestamp` (descending) for efficient queries

### Collection: `directMessages` (Phase 3)

**Document ID:** Auto-generated

```javascript
{
  messageId: "dm-001",
  conversationId: "conv-001",
  senderId: "member-001",
  recipientId: "member-002",
  content: "Hey, how are you?",
  timestamp: Timestamp("2026-07-20T14:30:00Z"),
  isRead: true,
  readAt: Timestamp("2026-07-20T14:31:00Z"),
  edited: false,
  editedAt: null
}
```

### Collection: `conversations` (Phase 3)

**Document ID:** `{memberId1}-{memberId2}` (sorted lexicographically)

```javascript
{
  conversationId: "member-001-member-002",
  participantIds: ["member-001", "member-002"],
  lastMessage: "Hey, how are you?",
  lastMessageTime: Timestamp("2026-07-20T14:30:00Z"),
  unreadCount: {
    "member-001": 2,
    "member-002": 0
  },
  metadata: {
    createdAt: Timestamp("2026-07-20T14:00:00Z"),
    updatedAt: Timestamp("2026-07-20T14:30:00Z")
  }
}
```

### Collection: `testimonials` (Phase 3)

**Document ID:** Auto-generated

```javascript
{
  testimonialId: "test-001",
  memberId: "member-001",
  memberName: "Raj Kumar",
  memberPhoto: "https://...",
  quote: "This community changed my life!",
  story: "In this session...", // optional, longer version
  status: "published" | "draft" | "scheduled",
  publishedAt: Timestamp("2026-07-15T10:00:00Z"),
  scheduledPublishAt: null,
  likeCount: 45,
  likedBy: ["member-002", "member-003", ...], // array of UIDs
  metadata: {
    createdAt: Timestamp("2026-07-10T10:00:00Z"),
    updatedAt: Timestamp("2026-07-15T10:00:00Z")
  }
}
```

### Collection: `analytics` (Phase 2/3)

**Document ID:** `{date}` (e.g., "2026-07-20")

```javascript
{
  date: "2026-07-20",
  pageViews: 1250,
  uniqueUsers: 320,
  memberClicks: {
    "member-001": 45,
    "member-002": 38,
    ...
  },
  liveLinksClicked: 120,
  sessionsLive: 12,
  messagesSent: 250,
  metadata: {
    recordedAt: Timestamp("2026-07-21T00:00:00Z")
  }
}
```

### Collection: `settings`

**Document ID:** `public` (global settings)

```javascript
{
  settingsId: "public",
  heroMessages: [
    "Welcome to THE ROYAL CLUB",
    "सम्मान बाँटो, प्यार अपने आप मिलेगा",
    "Unity in Diversity",
    "Together We Rise",
    "Every Voice Matters"
  ],
  aboutText: "We believe in the power of...",
  tagline: "सम्मान बाँटो, प्यार अपने आप मिलेगा",
  socialLinks: {
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
    website: "https://..."
  },
  facebookAppId: "app-id-123", // Phase 2
  maintenanceMode: false,
  metadata: {
    updatedAt: Timestamp("2026-07-20T10:00:00Z")
  }
}
```

### Collection: `inviteCodes` (Phase 1 Auth)

**Document ID:** Auto-generated (e.g., "inv-abc123xyz")

```javascript
{
  codeId: "inv-abc123xyz",
  code: "ROYAL-2026-ABC123", // human-readable
  createdBy: "ceo-uid",
  usedBy: "member-uid", // null if not used
  status: "active" | "used" | "expired",
  role: "member", // what role this code grants
  expiresAt: Timestamp("2026-07-27T23:59:59Z"), // 7 days
  createdAt: Timestamp("2026-07-20T10:00:00Z"),
  usedAt: Timestamp("2026-07-21T14:30:00Z") // if used
}
```

---

## API Contracts

### Authentication Endpoints

#### POST `/api/auth/register`

**Request:**
```javascript
{
  email: "newmember@example.com",
  password: "SecurePass123!",
  displayName: "Priya Patel",
  inviteCode: "ROYAL-2026-ABC123",
  bio: "Passionate about wellness"
}
```

**Response (201 Created):**
```javascript
{
  success: true,
  user: {
    uid: "new-uid-123",
    email: "newmember@example.com",
    displayName: "Priya Patel",
    role: "member",
    profileUrl: "/member/new-uid-123"
  },
  token: "jwt-token-here"
}
```

**Error (400 Bad Request):**
```javascript
{
  success: false,
  error: "INVALID_INVITE_CODE",
  message: "Invite code is invalid or expired"
}
```

#### POST `/api/auth/login`

**Request:**
```javascript
{
  email: "raj@example.com",
  password: "SecurePass123!"
}
```

**Response (200 OK):**
```javascript
{
  success: true,
  user: {
    uid: "member-001",
    email: "raj@example.com",
    displayName: "Raj Kumar",
    role: "member"
  },
  token: "jwt-token"
}
```

#### POST `/api/auth/logout`

**Request:** (Headers include Authorization token)

**Response (200 OK):**
```javascript
{
  success: true,
  message: "Logged out successfully"
}
```

#### POST `/api/auth/password-reset`

**Request:**
```javascript
{
  email: "raj@example.com"
}
```

**Response (200 OK):**
```javascript
{
  success: true,
  message: "Password reset link sent to email"
}
```

---

### Schedule Endpoints

#### GET `/api/schedules/today`

**Query Params:**
- `date`: Optional ISO date string (default: today)

**Response (200 OK):**
```javascript
{
  success: true,
  date: "2026-07-20",
  schedules: [
    {
      scheduleId: "2026-07-20-0",
      memberId: "member-001",
      memberName: "Raj Kumar",
      memberPhoto: "https://...",
      startTime: "18:00",
      endTime: "19:00",
      topic: "Understanding Wealth",
      status: "upcoming",
      facebookLiveLink: null
    },
    // ... more slots
  ]
}
```

#### GET `/api/schedules/member/:memberId`

**Query Params:**
- `limit`: Number of slots to return (default: 30)
- `offset`: For pagination (default: 0)

**Response (200 OK):**
```javascript
{
  success: true,
  memberId: "member-001",
  memberName: "Raj Kumar",
  schedules: [
    // ... list of member's schedules
  ]
}
```

#### PUT `/api/schedules/:scheduleId` (CEO only)

**Request:**
```javascript
{
  topic: "Updated Topic",
  description: "Updated description",
  status: "upcoming", // or "live" or "completed"
  facebookLiveLink: "https://facebook.com/watch/?v=..."
}
```

**Response (200 OK):**
```javascript
{
  success: true,
  schedule: {
    scheduleId: "2026-07-20-0",
    topic: "Updated Topic",
    status: "live",
    updatedAt: Timestamp("2026-07-20T18:05:00Z")
  }
}
```

#### POST `/api/schedules` (CEO only)

**Request:**
```javascript
{
  date: "2026-07-20",
  slotIndex: 0,
  memberId: "member-001",
  startTime: "18:00",
  endTime: "19:00",
  topic: "New Session Topic"
}
```

**Response (201 Created):**
```javascript
{
  success: true,
  schedule: {
    scheduleId: "2026-07-20-0",
    // ... full schedule object
  }
}
```

---

### Member Endpoints

#### GET `/api/members`

**Query Params:**
- `limit`: Default 12
- `offset`: For pagination

**Response (200 OK):**
```javascript
{
  success: true,
  members: [
    {
      memberId: "member-001",
      name: "Raj Kumar",
      role: "member",
      photo: "https://...",
      bio: "Passionate about wealth...",
      socialLinks: { facebook: "...", instagram: "..." },
      joinDate: "2026-01-15",
      sessionCount: 28 // Phase 3
    },
    // ... more members
  ]
}
```

#### GET `/api/members/:memberId`

**Response (200 OK):**
```javascript
{
  success: true,
  member: {
    memberId: "member-001",
    name: "Raj Kumar",
    role: "member",
    photo: "https://...",
    bioShort: "Passionate about wealth...",
    bioFull: "Longer bio...",
    socialLinks: { facebook: "...", instagram: "..." },
    joinDate: "2026-01-15",
    schedules: [
      // ... member's scheduled sessions
    ],
    quote: "Success is 1%...", // Phase 3
    sessionCount: 28, // Phase 3
    engagement: 95 // Phase 3
  }
}
```

#### PUT `/api/members/:memberId` (Self or CEO)

**Request:**
```javascript
{
  displayName: "Raj Kumar",
  bio: "Updated bio...",
  bioFull: "Updated full bio...",
  socialLinks: {
    facebook: "https://...",
    instagram: "https://..."
  },
  photo: "base64-encoded-or-url"
}
```

**Response (200 OK):**
```javascript
{
  success: true,
  member: { /* updated member */ }
}
```

#### POST `/api/members` (CEO only)

**Request:**
```javascript
{
  email: "newmember@example.com",
  displayName: "New Member",
  role: "member",
  sendInvite: true
}
```

**Response (201 Created):**
```javascript
{
  success: true,
  member: { /* new member */ },
  inviteCode: "ROYAL-2026-XYZ789"
}
```

---

### Chat Endpoints (Phase 2)

#### GET `/api/chat/messages`

**Query Params:**
- `roomId`: "general" (Phase 2)
- `limit`: 50
- `offset`: 0

**Response (200 OK):**
```javascript
{
  success: true,
  roomId: "general",
  messages: [
    {
      messageId: "msg-001",
      memberId: "member-001",
      memberName: "Raj Kumar",
      message: "Hey everyone!",
      timestamp: "2026-07-20T14:30:00Z",
      edited: false,
      isPinned: false,
      reactions: { "👍": 3 }
    },
    // ... more messages
  ]
}
```

#### POST `/api/chat/messages` (Authenticated)

**Request:**
```javascript
{
  roomId: "general",
  message: "Hey everyone!"
}
```

**Response (201 Created):**
```javascript
{
  success: true,
  message: { /* full message object */ }
}
```

#### PUT `/api/chat/messages/:messageId` (Self or CEO)

**Request:**
```javascript
{
  message: "Updated message text"
}
```

**Response (200 OK):**
```javascript
{
  success: true,
  message: {
    messageId: "msg-001",
    message: "Updated message text",
    edited: true,
    editedAt: "2026-07-20T14:35:00Z"
  }
}
```

#### DELETE `/api/chat/messages/:messageId` (Self or CEO)

**Response (200 OK):**
```javascript
{
  success: true,
  message: "Message deleted"
}
```

---

### Admin Endpoints (CEO only)

#### GET `/api/admin/analytics`

**Query Params:**
- `startDate`: ISO date
- `endDate`: ISO date
- `metric`: "pageViews" | "uniqueUsers" | "engagement" | "liveLinks"

**Response (200 OK):**
```javascript
{
  success: true,
  analytics: {
    totalPageViews: 15000,
    totalUniqueUsers: 2000,
    avgEngagementScore: 87,
    topMembers: [
      { memberId: "member-001", name: "Raj Kumar", clicks: 450 },
      // ...
    ],
    trend: [
      { date: "2026-07-10", pageViews: 500 },
      { date: "2026-07-11", pageViews: 520 },
      // ...
    ]
  }
}
```

#### POST `/api/admin/invite` (CEO only)

**Request:**
```javascript
{
  email: "newmember@example.com",
  role: "member",
  expiresIn: 604800 // 7 days in seconds
}
```

**Response (201 Created):**
```javascript
{
  success: true,
  inviteCode: "ROYAL-2026-ABC123",
  inviteLink: "https://theroyalclub.com/register?code=ROYAL-2026-ABC123",
  expiresAt: "2026-07-27T10:00:00Z"
}
```

#### PUT `/api/admin/settings`

**Request:**
```javascript
{
  heroMessages: ["message1", "message2", ...],
  aboutText: "Updated about text",
  tagline: "Updated tagline",
  socialLinks: { facebook: "...", instagram: "..." }
}
```

**Response (200 OK):**
```javascript
{
  success: true,
  settings: { /* updated settings */ }
}
```

---

## Authentication & Authorization

### Firebase Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - private by default, public profile fields
    match /users/{userId} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == userId || isAdmin();
      allow create: if request.auth.uid != null && isNewMember();
    }

    // Schedules - public read, CEO edit
    match /schedules/{scheduleId} {
      allow read: if true; // public
      allow write: if isAdmin();
    }

    // Chat messages - members can read/write
    match /chatMessages/{messageId} {
      allow read: if request.auth.uid != null;
      allow create: if request.auth.uid != null;
      allow update: if request.auth.uid == resource.data.memberId || isAdmin();
      allow delete: if request.auth.uid == resource.data.memberId || isAdmin();
    }

    // Settings - public read, CEO write
    match /settings/{settingsId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Helper functions
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ceo';
    }

    function isNewMember() {
      return get(/databases/$(database)/documents/inviteCodes/$(request.resource.data.inviteCode)).data.status == 'active';
    }
  }
}
```

### JWT Token Structure

```javascript
{
  sub: "firebase-uid-123",
  email: "raj@example.com",
  displayName: "Raj Kumar",
  role: "member",
  iat: 1684876800,
  exp: 1684963200 // 1 hour
}
```

---

## Component Architecture

### React Folder Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Modal.jsx
│   ├── hero/
│   │   ├── HeroScroll.jsx
│   │   └── HeroImage.jsx
│   ├── schedule/
│   │   ├── ScheduleCard.jsx
│   │   ├── ScheduleGrid.jsx
│   │   └── ScheduleEditor.jsx (admin)
│   ├── member/
│   │   ├── MemberCard.jsx
│   │   ├── MemberGrid.jsx
│   │   ├── MemberProfile.jsx
│   │   └── MemberManager.jsx (admin)
│   ├── chat/
│   │   ├── ChatRoom.jsx
│   │   ├── ChatMessage.jsx
│   │   └── ChatInput.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AnalyticsChart.jsx
│       └── SettingsForm.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Member.jsx
│   ├── Admin.jsx
│   ├── Chat.jsx
│   └── NotFound.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useSchedule.js
│   ├── useMembers.js
│   ├── useChat.js
│   └── useLocalStorage.js
├── services/
│   ├── authService.js
│   ├── scheduleService.js
│   ├── memberService.js
│   ├── chatService.js
│   └── analyticsService.js
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx (Phase 3)
├── utils/
│   ├── firebaseConfig.js
│   ├── formatDate.js
│   ├── validation.js
│   └── constants.js
├── styles/
│   ├── globals.css
│   └── tailwind.config.js
└── App.jsx
```

### Key Component Props Examples

#### `<ScheduleCard />`
```javascript
<ScheduleCard
  scheduleId="2026-07-20-0"
  memberName="Raj Kumar"
  memberPhoto="https://..."
  startTime="18:00"
  endTime="19:00"
  topic="Understanding Wealth"
  status="upcoming" // or "live", "completed"
  facebookLiveLink={null}
  isAdmin={false}
  onEdit={handleEdit}
  onStatusChange={handleStatusChange}
/>
```

#### `<MemberCard />`
```javascript
<MemberCard
  memberId="member-001"
  name="Raj Kumar"
  role="member"
  photo="https://..."
  bio="Passionate about..."
  socialLinks={{ facebook: "...", instagram: "..." }}
  sessionCount={28}
  onViewProfile={handleViewProfile}
/>
```

---

## State Management

### Context API Structure (Recommended over Redux for this scale)

#### `AuthContext`
```javascript
{
  user: {
    uid: "member-001",
    email: "raj@example.com",
    displayName: "Raj Kumar",
    role: "member",
    photoUrl: "https://...",
    preferences: { /* ... */ }
  },
  isLoading: false,
  error: null,
  login: (email, password) => Promise,
  logout: () => Promise,
  register: (email, password, name) => Promise,
  updateProfile: (updates) => Promise
}
```

#### `ScheduleContext`
```javascript
{
  schedules: [
    { scheduleId, memberId, topic, startTime, status, /* ... */ },
    // ...
  ],
  isLoading: false,
  error: null,
  todaySchedules: [/* filtered for today */],
  liveNow: null, // current live schedule or null
  upNext: null, // next upcoming schedule
  fetchSchedules: (date) => Promise,
  updateSchedule: (scheduleId, updates) => Promise,
  addSchedule: (scheduleData) => Promise
}
```

#### `ChatContext` (Phase 2)
```javascript
{
  messages: [{ messageId, memberId, message, timestamp, /* ... */ }, ...],
  isLoading: false,
  unreadCount: 0,
  sendMessage: (message) => Promise,
  editMessage: (messageId, newMessage) => Promise,
  deleteMessage: (messageId) => Promise,
  pinMessage: (messageId) => Promise
}
```

---

## Environment Variables

### `.env.local` (Development)

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=theroyalclub-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=theroyalclub-dev
VITE_FIREBASE_STORAGE_BUCKET=theroyalclub-dev.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456...

VITE_API_URL=http://localhost:5173
VITE_FACEBOOK_APP_ID=987654...
VITE_GA_MEASUREMENT_ID=G-XXXX... (Phase 2)
VITE_SENDGRID_PUBLIC_KEY=SG.xxxx... (Phase 2)
```

### `.env.production`

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=theroyalclub.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=theroyalclub
VITE_FIREBASE_STORAGE_BUCKET=theroyalclub.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654...
VITE_FIREBASE_APP_ID=1:987654...

VITE_API_URL=https://theroyalclub.com
VITE_FACEBOOK_APP_ID=987654...
VITE_GA_MEASUREMENT_ID=G-YYYY...
VITE_SENDGRID_PUBLIC_KEY=SG.yyyy...
```

---

## Error Handling

### Error Codes & Messages

| Code | HTTP | Message | User-Facing Message |
|------|------|---------|-------------------|
| `AUTH_INVALID_EMAIL` | 400 | Invalid email format | "Please enter a valid email" |
| `AUTH_USER_NOT_FOUND` | 401 | No user with that email | "Email not found. Create an account?" |
| `AUTH_WRONG_PASSWORD` | 401 | Password incorrect | "Incorrect password" |
| `AUTH_TOO_MANY_ATTEMPTS` | 429 | Too many login attempts | "Too many attempts. Try again later." |
| `INVITE_EXPIRED` | 400 | Invite code expired | "Invite link expired. Contact CEO." |
| `INVITE_INVALID` | 400 | Invite code not found | "Invite code invalid" |
| `PERMISSION_DENIED` | 403 | User lacks permission | "You don't have access to this" |
| `SCHEDULE_NOT_FOUND` | 404 | Schedule ID not found | "Schedule not found" |
| `MEMBER_NOT_FOUND` | 404 | Member ID not found | "Member not found" |
| `FIRESTORE_ERROR` | 500 | Database error | "Something went wrong. Try again." |
| `NETWORK_ERROR` | 0 | No internet | "No internet connection. Try again?" |

### Error Boundary Component

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error:', error, info);
    // Log to Sentry (Phase 3)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>Oops, something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.href = '/'}>
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

```javascript
// Example: __tests__/components/ScheduleCard.test.js

import { render, screen } from '@testing-library/react';
import ScheduleCard from '../../components/schedule/ScheduleCard';

describe('ScheduleCard', () => {
  it('renders member name and topic', () => {
    render(
      <ScheduleCard
        memberName="Raj Kumar"
        topic="Wealth Creation"
        startTime="18:00"
        status="upcoming"
      />
    );
    expect(screen.getByText('Raj Kumar')).toBeInTheDocument();
    expect(screen.getByText('Wealth Creation')).toBeInTheDocument();
  });

  it('shows "Live Now" badge when status is live', () => {
    render(
      <ScheduleCard
        memberName="Raj Kumar"
        status="live"
        startTime="18:00"
      />
    );
    expect(screen.getByText('🔴 LIVE NOW')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked (admin)', () => {
    const handleEdit = jest.fn();
    render(
      <ScheduleCard
        memberName="Raj Kumar"
        isAdmin={true}
        onEdit={handleEdit}
        status="upcoming"
        startTime="18:00"
      />
    );
    screen.getByRole('button', { name: /edit/i }).click();
    expect(handleEdit).toHaveBeenCalled();
  });
});
```

### Integration Tests (Playwright for E2E)

```javascript
// e2e/login.spec.js

import { test, expect } from '@playwright/test';

test('member login flow', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[type="email"]', 'raj@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Login")');
  
  await expect(page).toHaveURL('/');
  await expect(page.locator('.navbar')).toContainText('Raj Kumar');
});

test('schedule auto-updates when live', async ({ page }) => {
  await page.goto('/');
  
  // Wait for schedule to load
  await page.waitForSelector('[data-testid="schedule-card"]');
  
  // Simulate schedule update in Firestore (requires test setup)
  // ...
  
  // Verify live badge appears
  await expect(page.locator('text=🔴 LIVE NOW')).toBeVisible();
});
```

### Performance Testing (Lighthouse CI)

```yaml
# lighthouserc.json
{
  "ci": {
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "cumululative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
      }
    }
  }
}
```

### Manual Testing Checklist

**Phase 1 MVP:**
- [ ] Hero scroll animation on Chrome, Firefox, Safari (desktop)
- [ ] Hero animation on iPhone, Android (mobile)
- [ ] Member registration flow (valid + invalid inputs)
- [ ] Admin login & schedule edit
- [ ] Live status updates in real-time (use browser DevTools to simulate)
- [ ] Navbar responsive (all breakpoints)
- [ ] Modal closing (ESC key, click outside)
- [ ] Form validation (email, password, topic)
- [ ] Image loading (with slow network simulation)
- [ ] Deep linking (share schedule URL, bookmark)

**Phase 2:**
- [ ] Email notifications sent (use test email)
- [ ] Chat message posting & deletion
- [ ] Auto-detection of Facebook Live (manual trigger)
- [ ] Archive filtering (by member, date range)
- [ ] Analytics dashboard data accuracy

**Phase 3:**
- [ ] Dark mode toggle persists
- [ ] Multi-language switching (all text)
- [ ] Direct messaging (read receipts, typing indicators)
- [ ] Leaderboard sorting & badges
- [ ] Newsletter signup (Mailchimp sync)

---

## Deployment Checklist

### Before Launch (Phase 1)

**Frontend:**
- [ ] Remove console.log statements
- [ ] No hardcoded passwords/secrets
- [ ] ENV vars properly configured
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors (if using)
- [ ] Lighthouse score >80
- [ ] Mobile responsive tested

**Backend/Firebase:**
- [ ] Security rules locked down
- [ ] Backups configured
- [ ] Admin accounts secured
- [ ] Database indexed for queries
- [ ] Storage rules set (photos only, max 5MB)

**Third-Party:**
- [ ] Firebase project created + configured
- [ ] Vercel/Firebase Hosting configured
- [ ] Custom domain DNS ready (Phase 3)
- [ ] Email service tested (Phase 2)
- [ ] Facebook App ID created (Phase 2)

**Documentation:**
- [ ] README.md with setup instructions
- [ ] Environment variables documented
- [ ] Deployment steps recorded
- [ ] Known issues & workarounds listed

---

**This technical spec should be updated as development progresses. Reference it when building features in each phase.**

