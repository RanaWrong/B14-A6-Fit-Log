# ⚒ FITLOG — Train with Intent. Log Every Set.

A dark, no-nonsense gym companion and workout library web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Pick your lifts, track your sets, organize today's plan, and watch your week's training add up.

---

## 🌐 Links
- **Live Demo:** [FitLog Live Website](https://fitlog-nine-jet.vercel.app/)
- **GitHub Repository:** [FitLog Repository](https://github.com/ProgrammingHero1/B14-A6-Fit-Log)

---

## 🚀 Key Features

1. **Exercise Library & Dynamic Discovery**
   - Browse 12 lifts covering every major muscle group (Chest, Legs, Back, Arms, Core, Shoulders, Full Body).
   - Instant search by workout name, equipment, or muscle group.
   - Dynamic sorting by **Duration**, **Calories Burned**, and **Rating**.

2. **Detailed Workout Blueprint (`/workout/[id]`)**
   - Two-column media-rich layout featuring workout illustrations.
   - Comprehensive specs table: Equipment, Difficulty, Sets, Reps, Duration, Calories, and Rating.
   - Step-by-step numbered instructions for perfect form.
   - Quick-action buttons: **Add to today's plan** and **Save for later** with instant toast feedback.

3. **My Plan Dashboard (`/my-plan`)**
   - Live metrics summary displaying total **Exercises**, total **Minutes**, and total **Calories Burned**.
   - Dual-tab navigation for **Today's Plan** (capped at 5 lifts) and **Saved** lifts.
   - Interactive lift management: **Mark as Done** toggle with active indicator and one-click remove (`✕`).
   - Clean empty state with quick return to the library.

4. **Persistent State & Real-Time Navbar Badges**
   - Global state powered by React Context API.
   - Complete persistence via `localStorage` so plans and saved workouts survive reloads.
   - Real-time pill badges in the sticky header showing live counts for Plan and Saved workouts.

5. **Production-Ready UX & Resilience**
   - High-performance Static Site Generation (SSG) with `generateStaticParams`.
   - Dual-endpoint API failover (Primary API & Alternative API) with offline fallback data.
   - Bespoke dark gym theme (`#0b0c0e`, `#15171c`, accent `#baff00`).
   - Custom 404 page and smooth loading states for all routes.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack React framework with server components and static generation |
| **React 19** | Component-driven user interface architecture |
| **TypeScript** | Strict static typing and interface contracts |
| **Tailwind CSS v4** | Modern utility-first styling with sleek dark aesthetic |
| **Context API & Hooks** | Global state management for workout planning and toast feedback |
| **localStorage API** | Client-side persistent data storage across browser sessions |

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.17 or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ProgrammingHero1/B14-A6-Fit-Log.git
   cd B14-A6-Fit-Log
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── layout.tsx             # Root layout with FitLogProvider, Navbar & Footer
│   ├── page.tsx               # Home page with Hero & Library section
│   ├── loading.tsx            # Global loading state animation
│   ├── not-found.tsx          # Custom 404 Not Found page
│   ├── globals.css            # Dark theme tokens, typography, and styling
│   ├── my-plan/
│   │   ├── page.tsx           # My Plan dashboard with metrics, tabs & actions
│   │   └── loading.tsx        # My Plan loading state
│   └── workout/[id]/
│       ├── page.tsx           # SSG dynamic route for workout details
│       └── loading.tsx        # Details page loading state
├── components/
│   ├── Navbar.tsx             # Sticky header with logo & dynamic counters
│   ├── Hero.tsx               # Hero banner with display typography & CTA
│   ├── LibrarySection.tsx     # Filterable, sortable workouts grid
│   ├── WorkoutCard.tsx        # Reusable card with thumbnail, tags & stats
│   ├── WorkoutDetailClient.tsx# Interactive detail page client component
│   └── Footer.tsx             # Dark branding footer
├── context/
│   └── FitLogContext.tsx      # Global state, persistence & toast notifications
├── data/
│   └── fallbackWorkouts.json  # Bundled fallback dataset for 100% uptime
├── lib/
│   └── api.ts                 # Resilient API fetchers with automatic failover
└── types/
    └── workout.ts             # TypeScript interfaces for Workout and SortOption
```

---

## 📄 License
This project is open-source and created as part of the **Next.js Milestone Assignment 06**.
© 2026 FitLog — Workout Library. Train hard, log honest.
