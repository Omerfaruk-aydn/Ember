# 🎬 Motion.so Clone — AI Video Generation Agent
## Complete System Specification & Architecture Document

**Version:** 2.0.0  
**Date:** June 2026  
**Status:** Production-Ready Specification  
**Classification:** Confidential — Internal Use Only

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Vision & Mission](#2-vision--mission)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Technology Stack — Deep Dive](#4-technology-stack--deep-dive)
5. [Database Design & Data Models](#5-database-design--data-models)
6. [API Architecture & Endpoints](#6-api-architecture--endpoints)
7. [Frontend Architecture](#7-frontend-architecture)
8. [Backend Architecture](#8-backend-architecture)
9. [AI/ML Pipeline — Complete Specification](#9-aiml-pipeline--complete-specification)
10. [Video Generation Engine](#10-video-generation-engine)
11. [Audio Processing Pipeline](#11-audio-processing-pipeline)
12. [Real-time Collaboration System](#12-real-time-collaboration-system)
13. [MCP Integration Layer](#13-mcp-integration-layer)
14. [Authentication & Authorization](#14-authentication--authorization)
15. [Payment & Subscription System](#15-payment--subscription-system)
16. [Deployment & Infrastructure](#16-deployment--infrastructure)
17. [CI/CD Pipeline](#17-cicd-pipeline)
18. [Monitoring & Observability](#18-monitoring--observability)
19. [Security Architecture](#19-security-architecture)
20. [Performance Optimization](#20-performance-optimization)
21. [Testing Strategy](#21-testing-strategy)
22. [Internationalization (i18n)](#22-internationalization-i18n)
23. [Accessibility (a11y)](#23-accessibility-a11y)
24. [Mobile Strategy](#24-mobile-strategy)
25. [Legal & Compliance](#25-legal--compliance)
26. [Team Structure & Roles](#26-team-structure--roles)
27. [Budget Estimation](#27-budget-estimation)
28. [Roadmap & Milestones](#28-roadmap--milestones)
29. [Risk Assessment & Mitigation](#29-risk-assessment--mitigation)
30. [Appendix A: Complete Database Schema](#appendix-a-complete-database-schema)
31. [Appendix B: API Reference](#appendix-b-api-reference)
32. [Appendix C: Configuration Reference](#appendix-c-configuration-reference)
33. [Appendix D: Environment Variables](#appendix-d-environment-variables)
34. [Appendix E: Error Codes](#appendix-e-error-codes)
35. [Appendix F: Glossary](#appendix-f-glossary)

---

# 1. Executive Summary

## 1.1 Project Overview

Motion.so Clone is a next-generation, AI-powered video generation platform that transforms text prompts into professional, broadcast-quality videos. The system employs a multi-agent architecture where specialized AI agents collaborate to research, plan, generate, and edit video content autonomously.

## 1.2 Key Differentiators

| Feature | Motion.so | Our Platform |
|---------|-----------|--------------|
| AI Agents | Limited | Full agentic workflow |
| Brand Learning | Manual | Automatic via web scraping |
| MCP Integration | None | Native from day 1 |
| Self-Hosting | No | Yes (enterprise) |
| Turkish Support | No | First-class |
| Smart Re-render | Full video | Scene-level diff |
| Offline Editing | No | Yes |
| Batch Rendering | No | Parallel processing |

## 1.3 Target Metrics

```
Target KPIs (Year 1):
├─ MRR: $500K
├─ Users: 10,000+
├─ Videos Generated: 100,000+
├─ Average Generation Time: < 3 minutes
├─ User Retention (30-day): 45%
├─ NPS Score: 50+
└─ Uptime: 99.95%
```

## 1.4 Technical Achievements

- Sub-3-minute video generation for 30-second clips
- Intelligent scene-level regeneration (no full re-renders)
- Automatic brand context learning from any website
- Real-time collaborative editing with conflict resolution
- MCP protocol support for AI assistant integration
- Multi-format export (MP4, WebM, GIF, APNG)
- Auto-optimization for social platforms (TikTok, Instagram, YouTube)

---

# 2. Vision & Mission

## 2.1 Vision

To democratize professional video production by making it as simple as writing a sentence. Every creator, startup, and enterprise should have access to broadcast-quality video content without the need for expensive production teams or complex software.

## 2.2 Mission

Build the world's most intelligent video generation platform that understands brand context, learns from references, and produces videos that rival professional production quality — all powered by cutting-edge AI agents.

## 2.3 Core Principles

1. **Quality First**: Every video must meet professional broadcast standards
2. **Intelligence Over Manual**: Automate decisions that would take humans hours
3. **Brand Consistency**: Learn and maintain brand identity across all content
4. **Speed**: Generate content faster than any competitor
5. **Flexibility**: Support any style, format, or platform
6. **Privacy**: Enterprise-grade security and data isolation
7. **Openness**: MCP integration for seamless AI ecosystem connectivity

---

# 3. System Architecture Overview

## 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLIENT LAYER                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │  Web App     │  │  Mobile App │  │  MCP Client │  │  API Client │       │
│  │  (React 19)  │  │  (React     │  │  (Claude,   │  │  (REST/     │       │
│  │              │  │   Native)   │  │   Cursor)   │  │   GraphQL)  │       │
│  └──────┬───────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │
└─────────┼─────────────────┼────────────────┼────────────────┼───────────────┘
          │                 │                │                │
          └─────────────────┼────────────────┼────────────────┘
                            │                │
┌───────────────────────────▼────────────────▼───────────────────────────────┐
│                         API GATEWAY (Kong/AWS API Gateway)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ Rate Limit  │  │ Auth Check  │  │ Load Bal.   │  │ SSL/TLS     │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────────────┐
│                      APPLICATION LAYER                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    FastAPI (Python 3.12)                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Auth Service│  │ User Service│  │ Project Svc │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Video Svc   │  │ Brand Svc   │  │ Billing Svc │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Render Svc  │  │ Export Svc  │  │ Webhook Svc │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                 AGENT ORCHESTRATOR (LangGraph)                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Research    │  │ Storyboard  │  │ Visual      │                │   │
│  │  │ Agent       │  │ Agent       │  │ Agent       │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Audio Agent │  │ Edit Agent  │  │ QA Agent    │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Style Agent │  │ Export Agent│  │ Brand Agent │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────────────┐
│                      MESSAGING LAYER                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    Redis Cluster + BullMQ                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Render Queue│  │ Audio Queue │  │ Image Queue │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Export Queue│  │ Webhook Q   │  │ Analytics Q │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    WebSocket Server (Socket.io)                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │   │
│  │  │ Real-time   │  │ Progress    │  │ Collaboration│               │   │
│  │  │ Updates     │  │ Streaming   │  │ Sessions    │                │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────────────┐
│                      DATA LAYER                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ PostgreSQL  │  │ Redis       │  │ S3/MinIO    │  │ Pinecone    │      │
│  │ (Primary DB)│  │ (Cache +    │  │ (Object     │  │ (Vector DB) │      │
│  │             │  │  Sessions)  │  │  Storage)   │  │             │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       │
│  │ ClickHouse  │  │ Elasticsearch│  │ MinIO       │                       │
│  │ (Analytics) │  │ (Search)    │  │ (Self-host) │                       │
│  └─────────────┘  └─────────────┘  └─────────────┘                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ Claude API  │  │ Flux API    │  │ ElevenLabs  │  │ Stripe      │      │
│  │ (LLM)       │  │ (Images)    │  │ (Voiceover) │  │ (Payments)  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ Whisper     │  │ Replicate   │  │ Firecrawl   │  │ SendGrid    │      │
│  │ (Captions)  │  │ (Render)    │  │ (Scraping)  │  │ (Email)     │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       │
│  │ Cloudflare  │  │ Upstash     │  │ Axiom       │                       │
│  │ (CDN + R2)  │  │ (Rate Limit)│  │ (Logging)   │                       │
│  └─────────────┘  └─────────────┘  └─────────────┘                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 3.2 Service Communication

### 3.2.1 Synchronous Communication
- **HTTP/REST**: Client ↔ API Gateway ↔ Application Services
- **gRPC**: Internal service-to-service (high-performance)
- **WebSocket**: Real-time updates, progress streaming

### 3.2.2 Asynchronous Communication
- **Redis Pub/Sub**: Event broadcasting
- **BullMQ**: Job queues with priorities and delays
- **Webhook**: External service notifications

### 3.2.3 Data Flow — Video Generation

```
User Input (Text Prompt)
    │
    ▼
┌────────────────────────────────────────────────────────────────────┐
│ PHASE 1: INTENT PARSING                                           │
│ ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│ │ NLU Engine   │───▶│ Intent       │───▶│ Parameter    │         │
│ │ (Claude)     │    │ Classifier   │    │ Extractor    │         │
│ └──────────────┘    └──────────────┘    └──────────────┘         │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│ PHASE 2: RESEARCH & CONTEXT                                       │
│ ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│ │ Web Scraper  │───▶│ Brand        │───▶│ Reference    │         │
│ │ (Firecrawl)  │    │ Analyzer     │    │ Collector    │         │
│ └──────────────┘    └──────────────┘    └──────────────┘         │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│ PHASE 3: STORYBOARD GENERATION                                    │
│ ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│ │ Scene        │───▶│ Timeline     │───▶│ Asset        │         │
│ │ Planner      │    │ Optimizer    │    │ List Gen     │         │
│ └──────────────┘    └──────────────┘    └──────────────┘         │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│ PHASE 4: ASSET GENERATION (Parallel)                              │
│                                                                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐      │
│  │ Image Gen      │  │ Audio Gen      │  │ Caption Gen    │      │
│  │ (Flux/SD)      │  │ (ElevenLabs)   │  │ (Whisper)      │      │
│  └────────┬───────┘  └────────┬───────┘  └────────┬───────┘      │
│           │                   │                   │                │
│           └───────────────────┼───────────────────┘                │
│                               │                                    │
│                      ┌────────▼───────┐                           │
│                      │ Asset Merger   │                           │
│                      └────────┬───────┘                           │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│ PHASE 5: VIDEO COMPOSITION                                        │
│ ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│ │ Scene        │───▶│ Animation    │───▶│ Transition   │         │
│ │ Builder      │    │ Engine       │    │ Handler      │         │
│ └──────────────┘    └──────────────┘    └──────────────┘         │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│ PHASE 6: RENDERING & EXPORT                                       │
│ ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│ │ Remotion     │───▶│ FFmpeg       │───▶│ CDN          │         │
│ │ Renderer     │    │ Encoder      │    │ Uploader     │         │
│ └──────────────┘    └──────────────┘    └──────────────┘         │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
                      ┌─────────────────┐
                      │ Video URL       │
                      │ (Ready to view) │
                      └─────────────────┘
```

## 3.3 Event-Driven Architecture

```typescript
// Event Catalog
enum VideoEvent {
  // Generation Events
  VIDEO_GENERATION_STARTED = 'video.generation.started',
  VIDEO_GENERATION_PROGRESS = 'video.generation.progress',
  VIDEO_GENERATION_COMPLETED = 'video.generation.completed',
  VIDEO_GENERATION_FAILED = 'video.generation.failed',
  
  // Scene Events
  SCENE_GENERATION_STARTED = 'scene.generation.started',
  SCENE_GENERATION_COMPLETED = 'scene.generation.completed',
  SCENE_GENERATION_FAILED = 'scene.generation.failed',
  SCENE_RENDERING_STARTED = 'scene.rendering.started',
  SCENE_RENDERING_COMPLETED = 'scene.rendering.completed',
  
  // Asset Events
  IMAGE_GENERATION_STARTED = 'asset.image.generation.started',
  IMAGE_GENERATION_COMPLETED = 'asset.image.generation.completed',
  AUDIO_GENERATION_STARTED = 'asset.audio.generation.started',
  AUDIO_GENERATION_COMPLETED = 'asset.audio.generation.completed',
  
  // Export Events
  EXPORT_STARTED = 'export.started',
  EXPORT_PROGRESS = 'export.progress',
  EXPORT_COMPLETED = 'export.completed',
  EXPORT_FAILED = 'export.failed',
  
  // User Events
  USER_PROJECT_CREATED = 'user.project.created',
  USER_PROJECT_UPDATED = 'user.project.updated',
  USER_SUBSCRIPTION_CHANGED = 'user.subscription.changed',
  
  // Brand Events
  BRAND_CONTEXT_UPDATED = 'brand.context.updated',
  BRAND_STYLE_LEARNED = 'brand.style.learned',
  
  // Collaboration Events
  COLLAB_USER_JOINED = 'collaboration.user.joined',
  COLLAB_USER_LEFT = 'collaboration.user.left',
  COLLAB_CURSOR_MOVED = 'collaboration.cursor.moved',
  COLLAB_EDIT_CONFLICT = 'collaboration.edit.conflict'
}
```

---

# 4. Technology Stack — Deep Dive

## 4.1 Frontend Stack

### 4.1.1 Core Framework

```typescript
// React 19 with TypeScript 5.4+
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.4.0",
  "vite": "^5.4.0",
  "@vitejs/plugin-react": "^4.3.0"
}

// Why React 19:
// - React Compiler (automatic memoization)
// - Server Components support
// - Improved Suspense patterns
// - Better hydration
// - Concurrent features stable
```

### 4.1.2 State Management

```typescript
// Zustand for global state
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AppState {
  // User state
  user: User | null;
  subscription: Subscription | null;
  
  // Project state
  currentProject: Project | null;
  projects: Project[];
  
  // Editor state
  editor: {
    selectedScene: string | null;
    timelinePosition: number;
    isPlaying: boolean;
    zoom: number;
    layers: Layer[];
  };
  
  // Generation state
  generation: {
    status: 'idle' | 'generating' | 'rendering' | 'complete' | 'error';
    progress: number;
    currentPhase: string;
    errors: Error[];
  };
  
  // UI state
  ui: {
    sidebarOpen: boolean;
    modalOpen: string | null;
    theme: 'light' | 'dark';
    language: 'en' | 'tr';
  };
}

// Slices for modular state
const useUserSlice = create<AppState>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        subscription: null,
        setUser: (user) => set((state) => { state.user = user; }),
        setSubscription: (sub) => set((state) => { state.subscription = sub; }),
      })),
      { name: 'user-storage' }
    )
  )
);

const useEditorSlice = create<EditorState>()(
  devtools((set) => ({
    selectedScene: null,
    timelinePosition: 0,
    isPlaying: false,
    zoom: 1,
    layers: [],
    selectScene: (id) => set({ selectedScene: id }),
    setTimelinePosition: (pos) => set({ timelinePosition: pos }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setZoom: (zoom) => set({ zoom }),
  }))
);
```

### 4.1.3 Data Fetching

```typescript
// TanStack Query v5
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Custom hooks for data fetching
function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => api.projects.list(),
    select: (data) => data.sort((a, b) => b.updatedAt - a.updatedAt),
  });
}

function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => api.projects.get(id),
    enabled: !!id,
  });
}

function useGenerateVideo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: GenerateVideoInput) => api.video.generate(data),
    onMutate: async (newVideo) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData(['projects']);
      queryClient.setQueryData(['projects'], (old) => [newVideo, ...old]);
      return { previousProjects };
    },
    onError: (err, newVideo, context) => {
      queryClient.setQueryData(['projects'], context.previousProjects);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
```

### 4.1.4 UI Component Library

```typescript
// shadcn/ui with custom theme
// components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}

// Custom theme tokens
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#8098f9',
          500: '#6172f3',
          600: '#444ce7',
          700: '#3538cd',
          800: '#2d31a6',
          900: '#2b2f83',
          950: '#1a1c50',
        },
        surface: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        dark: {
          bg: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
          text: '#e4e4e7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
}
```

### 4.1.5 Animation System

```typescript
// Framer Motion for page/component animations
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// Scene card animation
const sceneCardVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
  selected: { 
    scale: 1,
    boxShadow: '0 0 0 2px var(--brand-500)',
  },
};

// Timeline animation
const timelineVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { 
      height: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
};

// Drag and drop animations
const draggableVariants = {
  drag: { 
    scale: 1.05,
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    cursor: 'grabbing',
  },
  drop: { 
    scale: 1,
    boxShadow: 'none',
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  },
};

// Progress bar animation
const ProgressBar = ({ progress }: { progress: number }) => {
  const width = useMotionValue(0);
  const scaleX = useTransform(width, [0, 100], [0, 1]);
  
  return (
    <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-brand-500"
        style={{ scaleX, transformOrigin: 'left' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};
```

### 4.1.6 Video Preview Player

```typescript
// Custom video player with React Player
import ReactPlayer from 'react-player';
import { MediaControls } from './MediaControls';

interface VideoPreviewProps {
  url: string;
  playing?: boolean;
  volume?: number;
  playbackRate?: number;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export function VideoPreview({
  url,
  playing = false,
  volume = 1,
  playbackRate = 1,
  onReady,
  onError,
}: VideoPreviewProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  return (
    <div className="relative aspect-video bg-dark-bg rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        playbackRate={playbackRate}
        width="100%"
        height="100%"
        onReady={() => {
          setReady(true);
          setDuration(playerRef.current?.getDuration() || 0);
          onReady?.();
        }}
        onError={(e) => onError?.(new Error(e.message))}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
            forceVideo: true,
          },
        }}
      />
      
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-bg">
          <div className="animate-spin-slow">
            <Loader2 className="w-12 h-12 text-brand-500" />
          </div>
        </div>
      )}
      
      <MediaControls
        playing={playing}
        duration={duration}
        currentTime={currentTime}
        volume={volume}
        playbackRate={playbackRate}
        onPlayPause={() => playerRef.current?.getInternalPlayer().play()}
        onSeek={(time) => playerRef.current?.seekTo(time)}
        onVolumeChange={(vol) => {/* handled by parent */}}
        onPlaybackRateChange={(rate) => {/* handled by parent */}}
      />
    </div>
  );
}
```

---

# 5. Database Design & Data Models

## 5.1 PostgreSQL Schema

### 5.1.1 Core Tables

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255),  -- NULL for OAuth users
    full_name VARCHAR(255),
    avatar_url TEXT,
    locale VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    metadata JSONB DEFAULT '{}',
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NOT NULL;

-- OAuth connections
CREATE TABLE user_oauth_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,  -- 'google', 'github', 'apple'
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    token_type VARCHAR(50),
    scope TEXT,
    raw_profile JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_oauth_user_id ON user_oauth_accounts(user_id);
CREATE INDEX idx_oauth_provider ON user_oauth_accounts(provider, provider_user_id);

-- User sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);

-- ============================================
-- SUBSCRIPTIONS & BILLING
-- ============================================

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    plan_id VARCHAR(50) NOT NULL,  -- 'free', 'pro', 'enterprise'
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    trial_start TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Usage tracking
CREATE TABLE usage_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    metric VARCHAR(50) NOT NULL,  -- 'video_generation', 'storage', 'api_calls'
    quantity DECIMAL(10, 2) NOT NULL,
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_usage_user_period ON usage_records(user_id, period_start, period_end);
CREATE INDEX idx_usage_metric ON usage_records(metric);

-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    stripe_invoice_id VARCHAR(255),
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL,
    invoice_url TEXT,
    invoice_pdf TEXT,
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_stripe ON invoices(stripe_invoice_id);

-- ============================================
-- PROJECTS
-- ============================================

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    prompt TEXT NOT NULL,
    aspect_ratio VARCHAR(10) DEFAULT '16:9',
    duration_seconds INTEGER DEFAULT 30,
    status VARCHAR(50) DEFAULT 'draft',
    -- Status: draft, generating, rendering, ready, failed, archived
    
    -- Brand context reference
    brand_context_id UUID,
    
    -- Generation settings
    settings JSONB DEFAULT '{
        "style": "cinematic",
        "mood": "professional",
        "pacing": "medium",
        "colorGrading": "default",
        "transitions": "smooth",
        "textAnimation": "kinetic",
        "musicGenre": "ambient",
        "voiceType": "professional",
        "voiceGender": "neutral"
    }',
    
    -- Quality settings
    quality VARCHAR(20) DEFAULT 'high',
    -- Quality: draft, standard, high, ultra
    
    -- Output settings
    output_format VARCHAR(10) DEFAULT 'mp4',
    output_fps INTEGER DEFAULT 30,
    output_bitrate VARCHAR(20) DEFAULT '8M',
    
    -- Progress tracking
    progress DECIMAL(5, 2) DEFAULT 0,
    current_phase VARCHAR(50),
    error_message TEXT,
    
    -- Statistics
    generation_time_ms INTEGER,
    render_time_ms INTEGER,
    file_size_bytes BIGINT,
    
    -- Versioning
    version INTEGER DEFAULT 1,
    
    -- Metadata
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_deleted_at ON projects(deleted_at) WHERE deleted_at IS NOT NULL;
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);
CREATE INDEX idx_projects_metadata ON projects USING GIN(metadata);

-- ============================================
-- SCENES
-- ============================================

CREATE TABLE scenes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    
    -- Ordering
    order_index INTEGER NOT NULL,
    
    -- Timing
    start_time_ms INTEGER NOT NULL,
    duration_ms INTEGER NOT NULL,
    
    -- Content
    title VARCHAR(255),
    description TEXT,
    voiceover_text TEXT,
    
    -- Visual
    image_prompt TEXT,
    image_url TEXT,
    image_seed INTEGER,
    image_model VARCHAR(50),
    
    -- Animation
    motion_type VARCHAR(50) DEFAULT 'fade',
    -- Motion types: fade, slide_left, slide_right, slide_up, slide_down,
    --               zoom_in, zoom_out, rotate, parallax, kinetic, kinetic_bold
    
    animation_duration_ms INTEGER DEFAULT 500,
    animation_easing VARCHAR(50) DEFAULT 'easeInOut',
    
    -- Audio
    voiceover_url TEXT,
    voiceover_duration_ms INTEGER,
    voiceover_voice_id VARCHAR(100),
    background_music_volume DECIMAL(3, 2) DEFAULT 0.3,
    
    -- Effects
    effects JSONB DEFAULT '[]',
    -- Example: [{"type": "blur", "intensity": 0.5}, {"type": "glow", "color": "#fff"}]
    
    -- Text overlay
    text_overlays JSONB DEFAULT '[]',
    -- Example: [{"text": "Hello", "position": "center", "style": "bold", "animation": "typewriter"}]
    
    -- Transitions
    transition_in VARCHAR(50) DEFAULT 'fade',
    transition_out VARCHAR(50) DEFAULT 'fade',
    transition_duration_ms INTEGER DEFAULT 300,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending',
    -- Status: pending, generating_image, generating_audio, composing, rendering, ready, failed
    
    -- Quality
    quality_score DECIMAL(3, 2),  -- 0.00 to 1.00
    quality_feedback TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(project_id, order_index)
);

CREATE INDEX idx_scenes_project_id ON scenes(project_id);
CREATE INDEX idx_scenes_order ON scenes(project_id, order_index);
CREATE INDEX idx_scenes_status ON scenes(status);

-- ============================================
-- BRAND CONTEXT
-- ============================================

CREATE TABLE brand_contexts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic info
    name VARCHAR(255) NOT NULL,
    website_url TEXT,
    
    -- Colors
    primary_colors TEXT[] DEFAULT '{}',
    secondary_colors TEXT[] DEFAULT '{}',
    accent_colors TEXT[] DEFAULT '{}',
    
    -- Typography
    primary_font VARCHAR(100),
    secondary_font VARCHAR(100),
    font_weights INTEGER[] DEFAULT '{400, 700}',
    
    -- Style
    style_keywords TEXT[] DEFAULT '{}',
    mood VARCHAR(100),
    industry VARCHAR(100),
    
    -- Visual references
    logo_urls TEXT[] DEFAULT '{}',
    reference_image_urls TEXT[] DEFAULT '{}',
    reference_video_urls TEXT[] DEFAULT '{}',
    
    -- Extracted patterns
    visual_patterns JSONB DEFAULT '{}',
    -- Example: {
    --   "dominantStyle": "minimal",
    --   "typographyStyle": "modern",
    --   "colorScheme": "monochrome",
    --   "animationStyle": "smooth"
    -- }
    
    -- Vector embeddings for similarity search
    embedding vector(1536),
    
    -- Status
    status VARCHAR(50) DEFAULT 'active',
    last_scraped_at TIMESTAMP WITH TIME ZONE,
    
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brand_contexts_user_id ON brand_contexts(user_id);
CREATE INDEX idx_brand_contexts_embedding ON brand_contexts USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================
-- ASSETS (Generated Media)
-- ============================================

CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    scene_id UUID REFERENCES scenes(id) ON DELETE SET NULL,
    
    -- Asset info
    type VARCHAR(50) NOT NULL,
    -- Types: image, audio, video, font, music, sfx
    
    name VARCHAR(255),
    description TEXT,
    
    -- Storage
    storage_provider VARCHAR(50) DEFAULT 's3',
    storage_bucket VARCHAR(255),
    storage_key TEXT NOT NULL,
    cdn_url TEXT,
    
    -- File info
    mime_type VARCHAR(100),
    file_size_bytes BIGINT,
    duration_ms INTEGER,  -- For audio/video
    
    -- Generation metadata
    generator VARCHAR(50),
    -- Generators: flux, stable_diffusion, elevenlabs, whisper, ffmpeg
    
    generation_prompt TEXT,
    generation_params JSONB DEFAULT '{}',
    generation_seed INTEGER,
    generation_model VARCHAR(100),
    generation_time_ms INTEGER,
    
    -- Processing
    processed BOOLEAN DEFAULT FALSE,
    processing_params JSONB DEFAULT '{}',
    
    -- Usage tracking
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Lifecycle
    expires_at TIMESTAMP WITH TIME ZONE,
    is_favorite BOOLEAN DEFAULT FALSE,
    
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_project_id ON assets(project_id);
CREATE INDEX idx_assets_scene_id ON assets(scene_id);
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_assets_storage ON assets(storage_bucket, storage_key);
CREATE INDEX idx_assets_deleted_at ON assets(deleted_at) WHERE deleted_at IS NOT NULL;

-- ============================================
-- RENDER JOBS
-- ============================================

CREATE TABLE render_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Job info
    status VARCHAR(50) DEFAULT 'queued',
    -- Status: queued, processing, rendering, encoding, uploading, completed, failed, cancelled
    
    priority INTEGER DEFAULT 0,
    -- Priority: -2 (low), -1 (normal), 0 (high), 1 (urgent)
    
    -- Worker info
    worker_id VARCHAR(100),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Progress
    progress DECIMAL(5, 2) DEFAULT 0,
    current_step VARCHAR(100),
    total_steps INTEGER,
    completed_steps INTEGER DEFAULT 0,
    
    -- Output
    output_url TEXT,
    output_format VARCHAR(10),
    output_resolution VARCHAR(20),
    output_file_size_bytes BIGINT,
    output_duration_ms INTEGER,
    
    -- Error handling
    error_message TEXT,
    error_stack TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    
    -- Timing
    queue_time_ms INTEGER,
    process_time_ms INTEGER,
    render_time_ms INTEGER,
    encode_time_ms INTEGER,
    upload_time_ms INTEGER,
    total_time_ms INTEGER,
    
    -- Resource usage
    cpu_time_ms INTEGER,
    memory_peak_mb INTEGER,
    gpu_time_ms INTEGER,
    
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_render_jobs_project_id ON render_jobs(project_id);
CREATE INDEX idx_render_jobs_user_id ON render_jobs(user_id);
CREATE INDEX idx_render_jobs_status ON render_jobs(status);
CREATE INDEX idx_render_jobs_priority ON render_jobs(priority DESC, created_at ASC);
CREATE INDEX idx_render_jobs_worker ON render_jobs(worker_id) WHERE worker_id IS NOT NULL;

-- ============================================
-- ANALYTICS & TRACKING
-- ============================================

CREATE TABLE analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    
    -- Event data
    properties JSONB DEFAULT '{}',
    
    -- Context
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    country_code VARCHAR(2),
    device_type VARCHAR(20),
    
    -- Performance
    duration_ms INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Create partitions for each month
CREATE TABLE analytics_events_2026_01 PARTITION OF analytics_events
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
-- ... create more partitions

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);
```

### 5.1.2 Views

```sql
-- User dashboard view
CREATE VIEW user_dashboard AS
SELECT 
    u.id as user_id,
    u.full_name,
    u.email,
    s.plan_id,
    s.status as subscription_status,
    COUNT(DISTINCT p.id) as total_projects,
    COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'ready') as completed_projects,
    COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'generating') as active_projects,
    SUM(p.file_size_bytes) as total_storage_used,
    SUM(p.generation_time_ms) as total_generation_time,
    MAX(p.created_at) as last_project_created
FROM users u
LEFT JOIN subscriptions s ON s.user_id = u.id
LEFT JOIN projects p ON p.user_id = u.id AND p.deleted_at IS NULL
GROUP BY u.id, s.plan_id, s.status;

-- Project details view
CREATE VIEW project_details AS
SELECT 
    p.*,
    COUNT(s.id) as scene_count,
    SUM(s.duration_ms) as total_scene_duration,
    AVG(s.quality_score) as average_quality,
    bc.name as brand_name,
    bc.primary_colors as brand_colors,
    rj.id as latest_render_id,
    rj.status as render_status,
    rj.output_url as render_url
FROM projects p
LEFT JOIN scenes s ON s.project_id = p.id
LEFT JOIN brand_contexts bc ON bc.id = p.brand_context_id
LEFT JOIN render_jobs rj ON rj.project_id = p.id 
    AND rj.created_at = (
        SELECT MAX(created_at) 
        FROM render_jobs 
        WHERE project_id = p.id
    )
WHERE p.deleted_at IS NULL
GROUP BY p.id, bc.id, rj.id;
```

## 5.2 Redis Data Structures

```
# Session storage
session:{session_id}  →  Hash {
    user_id: UUID,
    ip_address: string,
    user_agent: string,
    last_active: timestamp,
    metadata: json
}  TTL: 7d

# Rate limiting
ratelimit:{user_id}:{endpoint}  →  Integer (count)  TTL: 1m
ratelimit:{ip}:{endpoint}  →  Integer (count)  TTL: 1m

# Project cache
project:{project_id}  →  String (JSON)  TTL: 5m
project:{project_id}:scenes  →  String (JSON)  TTL: 5m
project:{project_id}:assets  →  String (JSON)  TTL: 5m

# Generation progress
generation:{project_id}  →  Hash {
    status: string,
    phase: string,
    progress: float,
    current_step: string,
    started_at: timestamp,
    estimated_completion: timestamp,
    error: string | null
}  TTL: 24h

# Render job status
render:{job_id}  →  Hash {
    status: string,
    progress: float,
    worker_id: string,
    started_at: timestamp,
    estimated_completion: timestamp
}  TTL: 24h

# WebSocket connections
ws:user:{user_id}  →  Set {
    connection_id: string,
    connected_at: timestamp,
    last_heartbeat: timestamp
}

# Real-time collaboration
collab:project:{project_id}  →  Hash {
    user_{user_id}: {
        cursor_position: {x, y},
        selected_scene: string,
        last_active: timestamp
    }
}

# Brand context cache
brand:{brand_id}  →  String (JSON)  TTL: 1h
brand:embeddings  →  Vector Set (for similarity search)

# Feature flags
feature_flags:{user_id}  →  Hash {
    flag_name: boolean
}

# Queue priorities
queue:render:high  →  Sorted Set {score: priority, member: job_id}
queue:render:normal  →  Sorted Set {score: priority, member: job_id}
queue:render:low  →  Sorted Set {score: priority, member: job_id}
```

---

# 6. API Architecture & Endpoints

## 6.1 API Design Principles

1. **RESTful**: Standard HTTP methods and status codes
2. **Versioned**: `/api/v1/`, `/api/v2/` for backwards compatibility
3. **Paginated**: Cursor-based pagination for all list endpoints
4. **Filterable**: Query parameters for filtering and sorting
5. **Consistent**: Uniform response format across all endpoints
6. **Documented**: OpenAPI 3.0 specification

## 6.2 Response Format

```typescript
// Standard success response
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    nextCursor?: string;
  };
  request_id: string;
  timestamp: string;
}

// Standard error response
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    field?: string;
  };
  request_id: string;
  timestamp: string;
}

// Paginated response
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    nextCursor?: string;
    previousCursor?: string;
  };
  request_id: string;
  timestamp: string;
}
```

## 6.3 Authentication Endpoints

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/2fa/enable
POST   /api/v1/auth/2fa/disable
POST   /api/v1/auth/2fa/verify

# OAuth
GET    /api/v1/auth/oauth/:provider
POST   /api/v1/auth/oauth/:provider/callback
DELETE /api/v1/auth/oauth/:provider
```

## 6.4 User Endpoints

```
GET    /api/v1/users/me
PUT    /api/v1/users/me
DELETE /api/v1/users/me
GET    /api/v1/users/me/stats
GET    /api/v1/users/me/activity

# Avatar
POST   /api/v1/users/me/avatar
DELETE /api/v1/users/me/avatar

# Preferences
GET    /api/v1/users/me/preferences
PUT    /api/v1/users/me/preferences

# API Keys
GET    /api/v1/users/me/api-keys
POST   /api/v1/users/me/api-keys
DELETE /api/v1/users/me/api-keys/:id
```

## 6.5 Project Endpoints

```
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/:id
PUT    /api/v1/projects/:id
DELETE /api/v1/projects/:id
POST   /api/v1/projects/:id/duplicate

# Scenes
GET    /api/v1/projects/:id/scenes
POST   /api/v1/projects/:id/scenes
GET    /api/v1/projects/:id/scenes/:sceneId
PUT    /api/v1/projects/:id/scenes/:sceneId
DELETE /api/v1/projects/:id/scenes/:sceneId
PUT    /api/v1/projects/:id/scenes/reorder

# Generation
POST   /api/v1/projects/:id/generate
POST   /api/v1/projects/:id/scenes/:sceneId/regenerate
POST   /api/v1/projects/:id/cancel
GET    /api/v1/projects/:id/progress

# Export
POST   /api/v1/projects/:id/export
GET    /api/v1/projects/:id/exports
GET    /api/v1/projects/:id/exports/:exportId

# Collaboration
GET    /api/v1/projects/:id/collaborators
POST   /api/v1/projects/:id/collaborators
DELETE /api/v1/projects/:id/collaborators/:userId
PUT    /api/v1/projects/:id/collaborators/:userId/role

# Versioning
GET    /api/v1/projects/:id/versions
POST   /api/v1/projects/:id/versions
POST   /api/v1/projects/:id/versions/:versionId/restore
```

## 6.6 Video Generation Endpoints

```
POST   /api/v1/videos/generate
GET    /api/v1/videos/:id/status
POST   /api/v1/videos/:id/cancel
GET    /api/v1/videos/:id/progress
WS     /ws/videos/:id/stream

# Templates
GET    /api/v1/templates
GET    /api/v1/templates/:id
POST   /api/v1/templates/:id/use

# Styles
GET    /api/v1/styles
GET    /api/v1/styles/:id
POST   /api/v1/styles/:id/preview
```

## 6.7 Brand Context Endpoints

```
GET    /api/v1/brands
POST   /api/v1/brands
GET    /api/v1/brands/:id
PUT    /api/v1/brands/:id
DELETE /api/v1/brands/:id

# Analysis
POST   /api/v1/brands/:id/analyze
POST   /api/v1/brands/:id/refresh
GET    /api/v1/brands/:id/colors
GET    /api/v1/brands/:id/typography
GET    /api/v1/brands/:id/styles

# References
POST   /api/v1/brands/:id/references
DELETE /api/v1/brands/:id/references/:refId
GET    /api/v1/brands/:id/similar
```

## 6.8 Asset Endpoints

```
GET    /api/v1/assets
POST   /api/v1/assets/upload
GET    /api/v1/assets/:id
DELETE /api/v1/assets/:id

# Generation
POST   /api/v1/assets/generate/image
POST   /api/v1/assets/generate/audio
POST   /api/v1/assets/generate/video

# Stock
GET    /api/v1/assets/stock/images
GET    /api/v1/assets/stock/videos
GET    /api/v1/assets/stock/audio
```

## 6.9 Subscription & Billing Endpoints

```
GET    /api/v1/billing/subscription
POST   /api/v1/billing/subscription
PUT    /api/v1/billing/subscription
DELETE /api/v1/billing/subscription

# Plans
GET    /api/v1/billing/plans
GET    /api/v1/billing/plans/:id

# Checkout
POST   /api/v1/billing/checkout
POST   /api/v1/billing/checkout/complete

# Invoices
GET    /api/v1/billing/invoices
GET    /api/v1/billing/invoices/:id
GET    /api/v1/billing/invoices/:id/pdf

# Payment methods
GET    /api/v1/billing/payment-methods
POST   /api/v1/billing/payment-methods
DELETE /api/v1/billing/payment-methods/:id

# Usage
GET    /api/v1/billing/usage
GET    /api/v1/billing/usage/history

# Webhooks (internal)
POST   /api/v1/billing/webhooks/stripe
```

## 6.10 Admin Endpoints

```
# Dashboard
GET    /api/v1/admin/dashboard/stats
GET    /api/v1/admin/dashboard/metrics

# Users
GET    /api/v1/admin/users
GET    /api/v1/admin/users/:id
PUT    /api/v1/admin/users/:id
DELETE /api/v1/admin/users/:id

# Projects
GET    /api/v1/admin/projects
GET    /api/v1/admin/projects/:id
DELETE /api/v1/admin/projects/:id

# Render jobs
GET    /api/v1/admin/render-jobs
GET    /api/v1/admin/render-jobs/:id
POST   /api/v1/admin/render-jobs/:id/cancel
POST   /api/v1/admin/render-jobs/:id/retry

# System
GET    /api/v1/admin/system/health
GET    /api/v1/admin/system/metrics
GET    /api/v1/admin/system/logs

# Feature flags
GET    /api/v1/admin/feature-flags
POST   /api/v1/admin/feature-flags
PUT    /api/v1/admin/feature-flags/:id
DELETE /api/v1/admin/feature-flags/:id
```

---

# 7. Frontend Architecture

## 7.1 Project Structure

```
src/
├── app/                          # App shell & routing
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # Dashboard routes group
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── brands/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── templates/
│   │   │   └── page.tsx
│   │   ├── assets/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   ├── billing/
│   │   │   ├── api-keys/
│   │   │   └── team/
│   │   └── layout.tsx
│   ├── (editor)/                 # Video editor routes
│   │   └── editor/
│   │       └── [projectId]/
│   │           └── page.tsx
│   ├── api/                      # API routes (BFF)
│   ├── layout.tsx
│   └── page.tsx

├── components/                   # Shared components
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── tooltip.tsx
│   │   └── index.ts
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── Navigation.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── video-editor/             # Video editor components
│   │   ├── Editor.tsx            # Main editor container
│   │   ├── Timeline/
│   │   │   ├── Timeline.tsx
│   │   │   ├── TimelineTrack.tsx
│   │   │   ├── TimelineCursor.tsx
│   │   │   ├── TimelineZoom.tsx
│   │   │   └── TimelineControls.tsx
│   │   ├── Canvas/
│   │   │   ├── Canvas.tsx
│   │   │   ├── CanvasLayer.tsx
│   │   │   ├── CanvasControls.tsx
│   │   │   └── CanvasPreview.tsx
│   │   ├── Sidebar/
│   │   │   ├── PropertiesPanel.tsx
│   │   │   ├── ScenePanel.tsx
│   │   │   ├── AssetsPanel.tsx
│   │   │   ├── EffectsPanel.tsx
│   │   │   └── AudioPanel.tsx
│   │   ├── Player/
│   │   │   ├── Player.tsx
│   │   │   ├── PlayerControls.tsx
│   │   │   ├── PlayerTimeline.tsx
│   │   │   └── PlayerFullscreen.tsx
│   │   └── Toolbar/
│   │       ├── EditorToolbar.tsx
│   │       ├── UndoRedo.tsx
│   │       ├── ZoomControls.tsx
│   │       └── ExportButton.tsx
│   │
│   ├── video-player/             # Video preview player
│   │   ├── VideoPlayer.tsx
│   │   ├── VideoControls.tsx
│   │   ├── VideoProgress.tsx
│   │   └── VideoVolume.tsx
│   │
│   ├── brand/                    # Brand management
│   │   ├── BrandCard.tsx
│   │   ├── BrandEditor.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── FontSelector.tsx
│   │   └── BrandAnalysis.tsx
│   │
│   ├── project/                  # Project management
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ProjectFilters.tsx
│   │   └── ProjectActions.tsx
│   │
│   ├── generation/               # Generation UI
│   │   ├── PromptInput.tsx
│   │   ├── GenerationProgress.tsx
│   │   ├── ScenePreview.tsx
│   │   ├── GenerationHistory.tsx
│   │   └── StyleSelector.tsx
│   │
│   └── shared/                   # Shared components
│       ├── Loading.tsx
│       ├── ErrorBoundary.tsx
│       ├── EmptyState.tsx
│       ├── ConfirmDialog.tsx
│       ├── SearchInput.tsx
│       ├── Pagination.tsx
│       └── UserAvatar.tsx
│
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useProject.ts
│   ├── useVideoGeneration.ts
│   ├── useWebSocket.ts
│   ├── useDragAndDrop.ts
│   ├── useKeyboard.ts
│   ├── useMediaQuery.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── lib/                          # Utilities & helpers
│   ├── api/                      # API client
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   ├── videos.ts
│   │   ├── brands.ts
│   │   └── billing.ts
│   ├── utils.ts
│   ├── constants.ts
│   ├── validations.ts
│   └── formatters.ts
│
├── stores/                       # Zustand stores
│   ├── authStore.ts
│   ├── projectStore.ts
│   ├── editorStore.ts
│   ├── generationStore.ts
│   └── uiStore.ts
│
├── types/                        # TypeScript types
│   ├── api.ts
│   ├── project.ts
│   ├── video.ts
│   ├── brand.ts
│   ├── editor.ts
│   └── user.ts
│
├── styles/                       # Global styles
│   ├── globals.css
│   └── editor.css
│
└── providers/                    # Context providers
    ├── AuthProvider.tsx
    ├── QueryProvider.tsx
    ├── ThemeProvider.tsx
    ├── WebSocketProvider.tsx
    └── EditorProvider.tsx
```

## 7.2 Editor Architecture

```typescript
// editorStore.ts - Complete editor state management
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EditorState {
  // Project
  project: Project | null;
  scenes: Scene[];
  
  // Selection
  selectedSceneId: string | null;
  selectedElementId: string | null;
  multiSelectIds: string[];
  
  // Timeline
  currentTime: number;  // in ms
  duration: number;     // in ms
  isPlaying: boolean;
  playbackRate: number;
  fps: number;
  
  // Canvas
  zoom: number;
  panX: number;
  panY: number;
  canvasWidth: number;
  canvasHeight: number;
  
  // History
  undoStack: EditorAction[];
  redoStack: EditorAction[];
  maxHistorySize: number;
  
  // Collaboration
  cursors: Map<string, CollaboratorCursor>;
  collaborators: Collaborator[];
  
  // UI state
  activePanel: 'scenes' | 'assets' | 'effects' | 'audio' | 'brand';
  showGrid: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
  
  // Generation
  isGenerating: boolean;
  generationProgress: number;
  currentPhase: string;
}

interface EditorActions {
  // Scene actions
  selectScene: (id: string | null) => void;
  addScene: (scene: Omit<Scene, 'id'>) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  deleteScene: (id: string) => void;
  duplicateScene: (id: string) => void;
  reorderScenes: (fromIndex: number, toIndex: number) => void;
  
  // Element actions
  selectElement: (id: string | null) => void;
  addElement: (sceneId: string, element: Omit<Element, 'id'>) => void;
  updateElement: (sceneId: string, elementId: string, updates: Partial<Element>) => void;
  deleteElement: (sceneId: string, elementId: string) => void;
  
  // Timeline actions
  setCurrentTime: (time: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setPlaybackRate: (rate: number) => void;
  
  // Canvas actions
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  fitToScreen: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  
  // History
  undo: () => void;
  redo: () => void;
  pushAction: (action: EditorAction) => void;
  clearHistory: () => void;
  
  // Generation
  startGeneration: (prompt: string) => void;
  updateProgress: (progress: number, phase: string) => void;
  completeGeneration: (result: GenerationResult) => void;
}

const useEditorStore = create<EditorState & EditorActions>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      project: null,
      scenes: [],
      selectedSceneId: null,
      selectedElementId: null,
      multiSelectIds: [],
      currentTime: 0,
      duration: 30000,
      isPlaying: false,
      playbackRate: 1,
      fps: 30,
      zoom: 1,
      panX: 0,
      panY: 0,
      canvasWidth: 1920,
      canvasHeight: 1080,
      undoStack: [],
      redoStack: [],
      maxHistorySize: 50,
      cursors: new Map(),
      collaborators: [],
      activePanel: 'scenes',
      showGrid: false,
      showRulers: true,
      snapToGrid: true,
      isGenerating: false,
      generationProgress: 0,
      currentPhase: '',
      
      // Actions
      selectScene: (id) => set((state) => {
        state.selectedSceneId = id;
        state.selectedElementId = null;
      }),
      
      addScene: (scene) => set((state) => {
        const newScene = {
          ...scene,
          id: crypto.randomUUID(),
        };
        state.scenes.push(newScene);
        state.selectedSceneId = newScene.id;
      }),
      
      updateScene: (id, updates) => set((state) => {
        const index = state.scenes.findIndex(s => s.id === id);
        if (index !== -1) {
          Object.assign(state.scenes[index], updates);
        }
      }),
      
      deleteScene: (id) => set((state) => {
        const index = state.scenes.findIndex(s => s.id === id);
        if (index !== -1) {
          state.scenes.splice(index, 1);
          if (state.selectedSceneId === id) {
            state.selectedSceneId = state.scenes[0]?.id ?? null;
          }
        }
      }),
      
      duplicateScene: (id) => set((state) => {
        const scene = state.scenes.find(s => s.id === id);
        if (scene) {
          const newScene = {
            ...JSON.parse(JSON.stringify(scene)),
            id: crypto.randomUUID(),
          };
          const index = state.scenes.findIndex(s => s.id === id);
          state.scenes.splice(index + 1, 0, newScene);
        }
      }),
      
      reorderScenes: (fromIndex, toIndex) => set((state) => {
        const [scene] = state.scenes.splice(fromIndex, 1);
        state.scenes.splice(toIndex, 0, scene);
      }),
      
      selectElement: (id) => set((state) => {
        state.selectedElementId = id;
      }),
      
      addElement: (sceneId, element) => set((state) => {
        const scene = state.scenes.find(s => s.id === sceneId);
        if (scene) {
          const newElement = {
            ...element,
            id: crypto.randomUUID(),
          };
          scene.elements.push(newElement);
        }
      }),
      
      updateElement: (sceneId, elementId, updates) => set((state) => {
        const scene = state.scenes.find(s => s.id === sceneId);
        if (scene) {
          const element = scene.elements.find(e => e.id === elementId);
          if (element) {
            Object.assign(element, updates);
          }
        }
      }),
      
      deleteElement: (sceneId, elementId) => set((state) => {
        const scene = state.scenes.find(s => s.id === sceneId);
        if (scene) {
          const index = scene.elements.findIndex(e => e.id === elementId);
          if (index !== -1) {
            scene.elements.splice(index, 1);
          }
        }
      }),
      
      setCurrentTime: (time) => set((state) => {
        state.currentTime = Math.max(0, Math.min(time, state.duration));
      }),
      
      play: () => set((state) => { state.isPlaying = true; }),
      pause: () => set((state) => { state.isPlaying = false; }),
      togglePlay: () => set((state) => { state.isPlaying = !state.isPlaying; }),
      setPlaybackRate: (rate) => set((state) => { state.playbackRate = rate; }),
      
      setZoom: (zoom) => set((state) => {
        state.zoom = Math.max(0.1, Math.min(5, zoom));
      }),
      
      setPan: (x, y) => set((state) => {
        state.panX = x;
        state.panY = y;
      }),
      
      fitToScreen: () => set((state) => {
        state.zoom = 1;
        state.panX = 0;
        state.panY = 0;
      }),
      
      zoomIn: () => set((state) => {
        state.zoom = Math.min(5, state.zoom * 1.2);
      }),
      
      zoomOut: () => set((state) => {
        state.zoom = Math.max(0.1, state.zoom / 1.2);
      }),
      
      undo: () => set((state) => {
        const action = state.undoStack.pop();
        if (action) {
          state.redoStack.push(action);
          // Apply reverse action
        }
      }),
      
      redo: () => set((state) => {
        const action = state.redoStack.pop();
        if (action) {
          state.undoStack.push(action);
          // Apply forward action
        }
      }),
      
      pushAction: (action) => set((state) => {
        state.undoStack.push(action);
        state.redoStack = [];
        if (state.undoStack.length > state.maxHistorySize) {
          state.undoStack.shift();
        }
      }),
      
      clearHistory: () => set((state) => {
        state.undoStack = [];
        state.redoStack = [];
      }),
      
      startGeneration: (prompt) => set((state) => {
        state.isGenerating = true;
        state.generationProgress = 0;
        state.currentPhase = 'Initializing';
      }),
      
      updateProgress: (progress, phase) => set((state) => {
        state.generationProgress = progress;
        state.currentPhase = phase;
      }),
      
      completeGeneration: (result) => set((state) => {
        state.isGenerating = false;
        state.generationProgress = 100;
        state.currentPhase = 'Complete';
        state.scenes = result.scenes;
      }),
    }))
  )
);
```

---

# 8. Backend Architecture

## 8.1 FastAPI Application Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app entry
│   ├── config.py                  # Settings & configuration
│   ├── deps.py                    # Dependency injection
│   │
│   ├── api/                       # API routes
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py          # Main v1 router
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── projects.py
│   │   │   ├── videos.py
│   │   │   ├── scenes.py
│   │   │   ├── brands.py
│   │   │   ├── assets.py
│   │   │   ├── billing.py
│   │   │   └── admin.py
│   │   └── websocket/
│   │       ├── __init__.py
│   │       ├── manager.py
│   │       ├── editor.py
│   │       └── generation.py
│   │
│   ├── core/                      # Core modules
│   │   ├── __init__.py
│   │   ├── security.py            # Auth & security
│   │   ├── permissions.py         # RBAC
│   │   ├── exceptions.py          # Custom exceptions
│   │   ├── events.py              # Event system
│   │   └── middleware.py          # Custom middleware
│   │
│   ├── models/                    # Database models (SQLAlchemy)
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── scene.py
│   │   ├── brand.py
│   │   ├── asset.py
│   │   ├── subscription.py
│   │   ├── render_job.py
│   │   └── analytics.py
│   │
│   ├── schemas/                   # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── scene.py
│   │   ├── brand.py
│   │   ├── asset.py
│   │   ├── billing.py
│   │   └── responses.py
│   │
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── project_service.py
│   │   ├── video_service.py
│   │   ├── scene_service.py
│   │   ├── brand_service.py
│   │   ├── asset_service.py
│   │   ├── billing_service.py
│   │   ├── render_service.py
│   │   └── export_service.py
│   │
│   ├── agents/                    # AI agents
│   │   ├── __init__.py
│   │   ├── orchestrator.py        # Main orchestrator
│   │   ├── base_agent.py          # Base agent class
│   │   ├── research_agent.py
│   │   ├── storyboard_agent.py
│   │   ├── visual_agent.py
│   │   ├── audio_agent.py
│   │   ├── style_agent.py
│   │   ├── edit_agent.py
│   │   ├── qa_agent.py
│   │   ├── brand_agent.py
│   │   └── export_agent.py
│   │
│   ├── workers/                   # Background workers
│   │   ├── __init__.py
│   │   ├── celery_app.py
│   │   ├── render_worker.py
│   │   ├── export_worker.py
│   │   ├── analysis_worker.py
│   │   └── cleanup_worker.py
│   │
│   ├── integrations/              # External service integrations
│   │   ├── __init__.py
│   │   ├── anthropic.py           # Claude API
│   │   ├── flux.py                # Flux image generation
│   │   ├── elevenlabs.py          # ElevenLabs TTS
│   │   ├── whisper.py             # OpenAI Whisper
│   │   ├── stripe.py              # Stripe payments
│   │   ├── firecrawl.py           # Web scraping
│   │   ├── s3.py                  # S3 storage
│   │   ├── redis.py               # Redis client
│   │   ├── pinecone.py            # Vector DB
│   │   └── sendgrid.py            # Email service
│   │
│   ├── utils/                     # Utility functions
│   │   ├── __init__.py
│   │   ├── helpers.py
│   │   ├── validators.py
│   │   ├── formatters.py
│   │   ├── transformers.py
│   │   └── image_utils.py
│   │
│   └── db/                        # Database
│       ├── __init__.py
│       ├── session.py
│       ├── base.py
│       └── migrations/
│           ├── versions/
│           └── env.py
│
├── alembic/                       # Database migrations
│   ├── alembic.ini
│   ├── env.py
│   └── versions/
│
├── tests/                         # Test suite
│   ├── conftest.py
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/                       # Utility scripts
│   ├── seed_db.py
│   ├── cleanup.py
│   └── health_check.py
│
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
├── requirements.txt
└── .env.example
```

## 8.2 Agent Orchestrator

```python
# app/agents/orchestrator.py
from typing import Dict, List, Optional, Any
from datetime import datetime
from enum import Enum
import asyncio

from langgraph.graph import StateGraph, END
from langgraph.checkpoint.sqlite import SqliteSaver

from app.agents.base_agent import BaseAgent
from app.agents.research_agent import ResearchAgent
from app.agents.storyboard_agent import StoryboardAgent
from app.agents.visual_agent import VisualAgent
from app.agents.audio_agent import AudioAgent
from app.agents.style_agent import StyleAgent
from app.agents.edit_agent import EditAgent
from app.agents.qa_agent import QAAgent
from app.agents.brand_agent import BrandAgent
from app.agents.export_agent import ExportAgent


class GenerationPhase(str, Enum):
    INIT = "init"
    RESEARCH = "research"
    STORYBOARD = "storyboard"
    VISUAL = "visual"
    AUDIO = "audio"
    COMPOSITION = "composition"
    RENDERING = "rendering"
    QA = "qa"
    EXPORT = "export"
    COMPLETE = "complete"
    FAILED = "failed"


class VideoGenerationState(dict):
    """State for the video generation workflow."""
    
    # Input
    project_id: str
    user_id: str
    prompt: str
    settings: Dict[str, Any]
    brand_context: Optional[Dict[str, Any]]
    
    # Research output
    research_data: Optional[Dict[str, Any]] = None
    style_analysis: Optional[Dict[str, Any]] = None
    
    # Storyboard output
    storyboard: Optional[Dict[str, Any]] = None
    scenes: Optional[List[Dict[str, Any]]] = None
    
    # Visual output
    images: Optional[List[Dict[str, Any]]] = None
    
    # Audio output
    voiceover: Optional[Dict[str, Any]] = None
    music: Optional[Dict[str, Any]] = None
    captions: Optional[List[Dict[str, Any]]] = None
    
    # Final output
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    
    # Progress
    current_phase: GenerationPhase = GenerationPhase.INIT
    progress: float = 0
    errors: List[Dict[str, Any]] = []
    
    # Metadata
    started_at: datetime = datetime.utcnow()
    completed_at: Optional[datetime] = None
    generation_time_ms: Optional[int] = None


class VideoOrchestrator:
    """Main orchestrator for video generation workflow."""
    
    def __init__(self):
        self.agents = {
            "research": ResearchAgent(),
            "storyboard": StoryboardAgent(),
            "visual": VisualAgent(),
            "audio": AudioAgent(),
            "style": StyleAgent(),
            "edit": EditAgent(),
            "qa": QAAgent(),
            "brand": BrandAgent(),
            "export": ExportAgent(),
        }
        self.graph = self._build_graph()
        self.checkpointer = SqliteSaver.from_conn_string("checkpoints.db")
    
    def _build_graph(self) -> StateGraph:
        """Build the LangGraph workflow."""
        graph = StateGraph(VideoGenerationState)
        
        # Add nodes
        graph.add_node("init", self._init_node)
        graph.add_node("research", self._research_node)
        graph.add_node("brand_analysis", self._brand_analysis_node)
        graph.add_node("style_analysis", self._style_analysis_node)
        graph.add_node("storyboard", self._storyboard_node)
        graph.add_node("visual_generation", self._visual_generation_node)
        graph.add_node("audio_generation", self._audio_generation_node)
        graph.add_node("composition", self._composition_node)
        graph.add_node("rendering", self._rendering_node)
        graph.add_node("qa_check", self._qa_check_node)
        graph.add_node("export", self._export_node)
        graph.add_node("complete", self._complete_node)
        graph.add_node("handle_error", self._handle_error_node)
        
        # Add edges
        graph.set_entry_point("init")
        graph.add_edge("init", "research")
        graph.add_conditional_edges(
            "research",
            self._should_analyze_brand,
            {
                "brand_analysis": "brand_analysis",
                "style_analysis": "style_analysis"
            }
        )
        graph.add_edge("brand_analysis", "style_analysis")
        graph.add_edge("style_analysis", "storyboard")
        graph.add_conditional_edges(
            "storyboard",
            self._check_storyboard_quality,
            {
                "regenerate": "storyboard",
                "continue": "visual_generation"
            }
        )
        graph.add_edge("visual_generation", "audio_generation")
        graph.add_edge("audio_generation", "composition")
        graph.add_edge("composition", "rendering")
        graph.add_edge("rendering", "qa_check")
        graph.add_conditional_edges(
            "qa_check",
            self._check_qa_result,
            {
                "pass": "export",
                "fail": "handle_error",
                "retry": "composition"
            }
        )
        graph.add_edge("export", "complete")
        graph.add_edge("complete", END)
        graph.add_edge("handle_error", END)
        
        return graph.compile(checkpointer=self.checkpointer)
    
    async def generate(
        self,
        project_id: str,
        user_id: str,
        prompt: str,
        settings: Dict[str, Any],
        brand_context: Optional[Dict[str, Any]] = None,
        callback: Optional[callable] = None
    ) -> VideoGenerationState:
        """Generate a video from a prompt."""
        
        initial_state = VideoGenerationState(
            project_id=project_id,
            user_id=user_id,
            prompt=prompt,
            settings=settings,
            brand_context=brand_context,
        )
        
        config = {
            "configurable": {
                "thread_id": project_id,
            }
        }
        
        # Run the workflow
        final_state = None
        async for event in self.graph.astream(initial_state, config=config):
            for node_name, node_output in event.items():
                if callback:
                    await callback(node_name, node_output)
                final_state = node_output
        
        return final_state
    
    async def _init_node(self, state: VideoGenerationState) -> Dict:
        """Initialize the generation process."""
        state["current_phase"] = GenerationPhase.INIT
        state["progress"] = 0
        state["started_at"] = datetime.utcnow()
        
        # Validate inputs
        if not state["prompt"]:
            raise ValueError("Prompt is required")
        
        return state
    
    async def _research_node(self, state: VideoGenerationState) -> Dict:
        """Research phase - analyze prompt and gather context."""
        state["current_phase"] = GenerationPhase.RESEARCH
        state["progress"] = 10
        
        result = await self.agents["research"].execute(state)
        state["research_data"] = result
        
        return state
    
    async def _brand_analysis_node(self, state: VideoGenerationState) -> Dict:
        """Analyze brand context if provided."""
        if state.get("brand_context"):
            result = await self.agents["brand"].execute(state)
            state["style_analysis"] = result
        
        return state
    
    async def _style_analysis_node(self, state: VideoGenerationState) -> Dict:
        """Analyze and determine visual style."""
        result = await self.agents["style"].execute(state)
        state["style_analysis"] = result
        state["progress"] = 20
        
        return state
    
    async def _storyboard_node(self, state: VideoGenerationState) -> Dict:
        """Generate storyboard with scenes."""
        state["current_phase"] = GenerationPhase.STORYBOARD
        state["progress"] = 30
        
        result = await self.agents["storyboard"].execute(state)
        state["storyboard"] = result
        state["scenes"] = result.get("scenes", [])
        
        return state
    
    async def _visual_generation_node(self, state: VideoGenerationState) -> Dict:
        """Generate visual assets for all scenes."""
        state["current_phase"] = GenerationPhase.VISUAL
        state["progress"] = 40
        
        # Generate images in parallel
        tasks = []
        for scene in state["scenes"]:
            task = self.agents["visual"].execute_for_scene(scene, state)
            tasks.append(task)
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        state["images"] = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                state["errors"].append({
                    "scene": i,
                    "error": str(result)
                })
            else:
                state["images"].append(result)
        
        state["progress"] = 60
        
        return state
    
    async def _audio_generation_node(self, state: VideoGenerationState) -> Dict:
        """Generate audio assets (voiceover, music, captions)."""
        state["current_phase"] = GenerationPhase.AUDIO
        state["progress"] = 65
        
        # Generate components in parallel
        voiceover_task = self.agents["audio"].generate_voiceover(state)
        music_task = self.agents["audio"].generate_music(state)
        
        voiceover, music = await asyncio.gather(
            voiceover_task, music_task, return_exceptions=True
        )
        
        if not isinstance(voiceover, Exception):
            state["voiceover"] = voiceover
        
        if not isinstance(music, Exception):
            state["music"] = music
        
        # Generate captions from voiceover
        if state.get("voiceover"):
            captions = await self.agents["audio"].generate_captions(state)
            state["captions"] = captions
        
        state["progress"] = 75
        
        return state
    
    async def _composition_node(self, state: VideoGenerationState) -> Dict:
        """Compose the video from all assets."""
        state["current_phase"] = GenerationPhase.COMPOSITION
        state["progress"] = 80
        
        result = await self.agents["edit"].compose_video(state)
        
        return state
    
    async def _rendering_node(self, state: VideoGenerationState) -> Dict:
        """Render the final video."""
        state["current_phase"] = GenerationPhase.RENDERING
        state["progress"] = 90
        
        result = await self.agents["export"].render(state)
        state["video_url"] = result.get("video_url")
        
        return state
    
    async def _qa_check_node(self, state: VideoGenerationState) -> Dict:
        """Quality assurance check."""
        result = await self.agents["qa"].check(state)
        state["qa_result"] = result
        
        return state
    
    async def _export_node(self, state: VideoGenerationState) -> Dict:
        """Export and upload final video."""
        state["current_phase"] = GenerationPhase.EXPORT
        state["progress"] = 95
        
        result = await self.agents["export"].export(state)
        state["video_url"] = result.get("video_url")
        state["thumbnail_url"] = result.get("thumbnail_url")
        
        return state
    
    async def _complete_node(self, state: VideoGenerationState) -> Dict:
        """Complete the generation process."""
        state["current_phase"] = GenerationPhase.COMPLETE
        state["progress"] = 100
        state["completed_at"] = datetime.utcnow()
        state["generation_time_ms"] = int(
            (state["completed_at"] - state["started_at"]).total_seconds() * 1000
        )
        
        return state
    
    async def _handle_error_node(self, state: VideoGenerationState) -> Dict:
        """Handle errors in the workflow."""
        state["current_phase"] = GenerationPhase.FAILED
        state["completed_at"] = datetime.utcnow()
        
        return state
    
    def _should_analyze_brand(self, state: VideoGenerationState) -> str:
        """Determine if brand analysis is needed."""
        if state.get("brand_context"):
            return "brand_analysis"
        return "style_analysis"
    
    def _check_storyboard_quality(self, state: VideoGenerationState) -> str:
        """Check if storyboard needs regeneration."""
        if state.get("storyboard", {}).get("quality_score", 0) < 0.7:
            if state.get("storyboard", {}).get("regeneration_count", 0) < 3:
                return "regenerate"
        return "continue"
    
    def _check_qa_result(self, state: VideoGenerationState) -> str:
        """Check QA result and decide next step."""
        qa_result = state.get("qa_result", {})
        
        if qa_result.get("passed", False):
            return "pass"
        
        if qa_result.get("retry_count", 0) < 2:
            return "retry"
        
        return "fail"
```

## 8.3 Celery Workers

```python
# app/workers/celery_app.py
from celery import Celery
from celery.schedules import crontab

celery_app = Celery(
    "motion_clone",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_routes={
        "app.workers.render_worker.*": {"queue": "render"},
        "app.workers.export_worker.*": {"queue": "export"},
        "app.workers.analysis_worker.*": {"queue": "analysis"},
        "app.workers.cleanup_worker.*": {"queue": "cleanup"},
    },
    beat_schedule={
        "cleanup-expired-assets": {
            "task": "app.workers.cleanup_worker.cleanup_expired_assets",
            "schedule": crontab(hour=2, minute=0),
        },
        "cleanup-old-render-jobs": {
            "task": "app.workers.cleanup_worker.cleanup_old_render_jobs",
            "schedule": crontab(hour=3, minute=0),
        },
        "update-analytics": {
            "task": "app.workers.analysis_worker.update_daily_analytics",
            "schedule": crontab(hour=0, minute=5),
        },
    },
)


# app/workers/render_worker.py
from celery import Task
from app.workers.celery_app import celery_app
from app.agents.orchestrator import VideoOrchestrator


class RenderTask(Task):
    """Base task with retry logic."""
    autoretry_for = (Exception,)
    retry_backoff = True
    retry_backoff_max = 600
    retry_jitter = True
    max_retries = 3


@celery_app.task(
    base=RenderTask,
    bind=True,
    name="app.workers.render_worker.render_video",
    queue="render",
    time_limit=1800,  # 30 minutes
    soft_time_limit=1500,  # 25 minutes
)
def render_video(
    self,
    project_id: str,
    user_id: str,
    prompt: str,
    settings: dict,
    brand_context: dict | None = None,
):
    """Render a video from prompt."""
    
    orchestrator = VideoOrchestrator()
    
    async def run():
        return await orchestrator.generate(
            project_id=project_id,
            user_id=user_id,
            prompt=prompt,
            settings=settings,
            brand_context=brand_context,
            callback=lambda phase, data: self.update_state(
                state="PROGRESS",
                meta={
                    "phase": phase,
                    "progress": data.get("progress", 0),
                }
            ),
        )
    
    import asyncio
    result = asyncio.run(run())
    
    return {
        "project_id": project_id,
        "video_url": result.get("video_url"),
        "thumbnail_url": result.get("thumbnail_url"),
        "generation_time_ms": result.get("generation_time_ms"),
    }


@celery_app.task(
    base=RenderTask,
    name="app.workers.render_worker.render_scene",
    queue="render",
    time_limit=600,
)
def render_scene(
    self,
    scene_id: str,
    project_id: str,
    scene_data: dict,
    style_settings: dict,
):
    """Render a single scene."""
    from app.agents.visual_agent import VisualAgent
    
    agent = VisualAgent()
    result = asyncio.run(agent.render_scene(scene_data, style_settings))
    
    return {
        "scene_id": scene_id,
        "image_url": result.get("image_url"),
        "render_time_ms": result.get("render_time_ms"),
    }
```

---

# 9. AI/ML Pipeline — Complete Specification

## 9.1 Agent Definitions

### 9.1.1 Research Agent

```python
# app/agents/research_agent.py
from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.integrations.anthropic import ClaudeClient
from app.integrations.firecrawl import FirecrawlClient


class ResearchAgent(BaseAgent):
    """Analyzes prompts and gathers context for video generation."""
    
    def __init__(self):
        super().__init__(name="research")
        self.claude = ClaudeClient()
        self.firecrawl = FirecrawlClient()
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Execute research phase."""
        prompt = state["prompt"]
        brand_context = state.get("brand_context")
        
        # Analyze the prompt
        analysis = await self._analyze_prompt(prompt)
        
        # Research visual references
        references = await self._find_references(analysis)
        
        # Analyze brand if available
        brand_analysis = None
        if brand_context:
            brand_analysis = await self._analyze_brand(brand_context)
        
        # Determine video parameters
        parameters = await self._determine_parameters(
            analysis, references, brand_analysis
        )
        
        return {
            "analysis": analysis,
            "references": references,
            "brand_analysis": brand_analysis,
            "parameters": parameters,
        }
    
    async def _analyze_prompt(self, prompt: str) -> Dict[str, Any]:
        """Analyze the prompt to understand intent."""
        
        response = await self.claude.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=2000,
            messages=[{
                "role": "user",
                "content": f"""Analyze this video generation prompt and extract:
1. Main subject/topic
2. Target audience
3. Desired mood/style
4. Key visual elements
5. Suggested duration
6. Platform target (if specified)

Prompt: {prompt}

Return as JSON with these fields:
{{
    "subject": "string",
    "audience": "string",
    "mood": "string",
    "style": "string",
    "visual_elements": ["string"],
    "suggested_duration": number,
    "platform": "string",
    "complexity": "simple|moderate|complex",
    "keywords": ["string"]
}}"""
            }]
        )
        
        return self._parse_json(response.content[0].text)
    
    async def _find_references(
        self, analysis: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Find visual references based on analysis."""
        
        references = []
        
        # Search for reference videos/images
        search_queries = self._generate_search_queries(analysis)
        
        for query in search_queries[:3]:  # Limit to 3 searches
            results = await self._search_references(query)
            references.extend(results)
        
        # Analyze and rank references
        ranked_references = await self._rank_references(references, analysis)
        
        return ranked_references[:5]  # Return top 5
    
    async def _analyze_brand(self, brand_context: Dict) -> Dict[str, Any]:
        """Analyze brand context for style consistency."""
        
        response = await self.claude.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1500,
            messages=[{
                "role": "user",
                "content": f"""Analyze this brand context and extract video style guidelines:

Brand Colors: {brand_context.get('colors', [])}
Typography: {brand_context.get('typography', {})}
Style Keywords: {brand_context.get('style_keywords', [])}
Industry: {brand_context.get('industry', 'unknown')}

Return as JSON:
{{
    "color_palette": {{
        "primary": "hex",
        "secondary": "hex",
        "accent": "hex",
        "background": "hex"
    }},
    "typography_style": "string",
    "visual_style": "string",
    "animation_style": "string",
    "tone": "string",
    "restrictions": ["string"]
}}"""
            }]
        )
        
        return self._parse_json(response.content[0].text)
    
    async def _determine_parameters(
        self,
        analysis: Dict,
        references: List[Dict],
        brand_analysis: Optional[Dict]
    ) -> Dict[str, Any]:
        """Determine video generation parameters."""
        
        # Base parameters
        params = {
            "duration": analysis.get("suggested_duration", 30),
            "aspect_ratio": "16:9",
            "fps": 30,
            "resolution": "1080p",
            "style": analysis.get("style", "cinematic"),
            "mood": analysis.get("mood", "professional"),
        }
        
        # Adjust based on platform
        platform = analysis.get("platform", "").lower()
        if "tiktok" in platform or "reels" in platform or "shorts" in platform:
            params["aspect_ratio"] = "9:16"
            params["duration"] = min(params["duration"], 60)
        elif "instagram" in platform and "post" in platform:
            params["aspect_ratio"] = "1:1"
        elif "youtube" in platform:
            params["aspect_ratio"] = "16:9"
        
        # Apply brand style
        if brand_analysis:
            params["color_palette"] = brand_analysis.get("color_palette")
            params["typography_style"] = brand_analysis.get("typography_style")
            params["animation_style"] = brand_analysis.get("animation_style")
        
        # Determine pacing
        params["pacing"] = self._determine_pacing(analysis)
        
        # Determine transitions
        params["transitions"] = self._determine_transitions(analysis, params)
        
        return params
    
    def _generate_search_queries(self, analysis: Dict) -> List[str]:
        """Generate search queries for finding references."""
        
        queries = [
            f"{analysis['subject']} {analysis['style']} video",
            f"{analysis['mood']} {analysis['subject']} motion graphics",
        ]
        
        if analysis.get("visual_elements"):
            elements = " ".join(analysis["visual_elements"][:3])
            queries.append(f"{elements} {analysis['style']}")
        
        return queries
    
    def _determine_pacing(self, analysis: Dict) -> str:
        """Determine video pacing based on analysis."""
        
        complexity = analysis.get("complexity", "moderate")
        mood = analysis.get("mood", "professional")
        
        if mood in ["energetic", "exciting", "fast"]:
            return "fast"
        elif mood in ["calm", "serene", "elegant"]:
            return "slow"
        elif complexity == "complex":
            return "slow"
        else:
            return "medium"
    
    def _determine_transitions(
        self, analysis: Dict, params: Dict
    ) -> List[str]:
        """Determine transition types."""
        
        style = params.get("style", "cinematic")
        
        transition_map = {
            "cinematic": ["fade", "dissolve", "wipe"],
            "modern": ["slide", "zoom", "morph"],
            "playful": ["bounce", "spin", "pop"],
            "minimal": ["fade", "cut"],
            "kinetic": ["slide", "zoom", "parallax"],
        }
        
        return transition_map.get(style, ["fade", "cut"])
```

### 9.1.2 Storyboard Agent

```python
# app/agents/storyboard_agent.py
from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.integrations.anthropic import ClaudeClient


class StoryboardAgent(BaseAgent):
    """Generates detailed storyboards for video scenes."""
    
    def __init__(self):
        super().__init__(name="storyboard")
        self.claude = ClaudeClient()
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Generate storyboard from research data."""
        
        research = state.get("research_data", {})
        params = research.get("parameters", {})
        style = state.get("style_analysis", {})
        
        # Generate scene breakdown
        scene_breakdown = await self._generate_scene_breakdown(
            research, params, style
        )
        
        # Generate detailed descriptions for each scene
        detailed_scenes = await self._detail_scenes(scene_breakdown, params)
        
        # Generate timing and pacing
        timing = await self._generate_timing(detailed_scenes, params)
        
        # Generate visual style guide
        style_guide = await self._generate_style_guide(style, params)
        
        # Calculate quality score
        quality_score = await self._calculate_quality_score(
            detailed_scenes, timing, style_guide
        )
        
        return {
            "scenes": detailed_scenes,
            "timing": timing,
            "style_guide": style_guide,
            "quality_score": quality_score,
            "regeneration_count": state.get("storyboard", {}).get(
                "regeneration_count", 0
            ) + 1 if state.get("storyboard") else 0,
        }
    
    async def _generate_scene_breakdown(
        self,
        research: Dict,
        params: Dict,
        style: Dict
    ) -> List[Dict]:
        """Generate initial scene breakdown."""
        
        duration = params.get("duration", 30)
        
        response = await self.claude.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=3000,
            messages=[{
                "role": "user",
                "content": f"""Create a {duration}-second video storyboard.

Subject: {research.get('analysis', {}).get('subject', 'unknown')}
Mood: {params.get('mood', 'professional')}
Style: {params.get('style', 'cinematic')}
Pacing: {params.get('pacing', 'medium')}

Generate {self._calculate_scene_count(duration)} scenes with:
1. Scene number
2. Duration in seconds
3. Visual description
4. Text/overlay content
5. Transition to next scene
6. Audio notes

Return as JSON array:
[{{
    "scene_number": 1,
    "duration_seconds": number,
    "description": "string",
    "visual_elements": ["string"],
    "text_overlay": "string | null",
    "transition": "string",
    "audio_notes": "string",
    "mood": "string",
    "key_colors": ["string"]
}}]"""
            }]
        )
        
        return self._parse_json(response.content[0].text)
    
    async def _detail_scenes(
        self,
        scenes: List[Dict],
        params: Dict
    ) -> List[Dict]:
        """Add detailed descriptions and image prompts."""
        
        detailed = []
        
        for scene in scenes:
            detailed_scene = await self._detail_single_scene(scene, params)
            detailed.append(detailed_scene)
        
        return detailed
    
    async def _detail_single_scene(
        self,
        scene: Dict,
        params: Dict
    ) -> Dict:
        """Generate detailed description for a single scene."""
        
        color_palette = params.get("color_palette", {})
        
        response = await self.claude.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1500,
            messages=[{
                "role": "user",
                "content": f"""Detail this video scene:

Scene: {scene.get('description')}
Duration: {scene.get('duration_seconds')} seconds
Style: {params.get('style')}
Mood: {params.get('mood')}
Colors: {color_palette}

Generate:
1. Detailed visual description (for image generation)
2. Image prompt (optimized for Flux/SD)
3. Animation/motion description
4. Text animation details
5. Camera movement

Return as JSON:
{{
    "id": "scene_{scene.get('scene_number')}",
    "title": "string",
    "detailed_description": "string",
    "image_prompt": "string",
    "motion_type": "fade|slide_left|slide_right|slide_up|slide_down|zoom_in|zoom_out|kinetic",
    "animation_duration_ms": number,
    "text_animation": "none|typewriter|fade_in|slide_in|scale_up",
    "camera_movement": "static|zoom_in|zoom_out|pan_left|pan_right",
    "elements": [{{
        "type": "text|image|shape",
        "content": "string",
        "position": {{"x": number, "y": number}},
        "size": {{"width": number, "height": number}},
        "style": {{}}
    }}]
}}"""
            }]
        )
        
        result = self._parse_json(response.content[0].text)
        result["duration_seconds"] = scene.get("duration_seconds")
        result["transition"] = scene.get("transition")
        result["audio_notes"] = scene.get("audio_notes")
        
        return result
    
    async def _generate_timing(
        self,
        scenes: List[Dict],
        params: Dict
    ) -> Dict[str, Any]:
        """Generate timing and pacing information."""
        
        total_duration = sum(s.get("duration_seconds", 5) for s in scenes)
        
        # Calculate frame-level timing
        fps = params.get("fps", 30)
        frame_duration = 1000 / fps  # ms per frame
        
        timing_scenes = []
        current_time = 0
        
        for scene in scenes:
            duration_ms = scene.get("duration_seconds", 5) * 1000
            timing_scenes.append({
                "scene_id": scene.get("id"),
                "start_ms": current_time,
                "duration_ms": duration_ms,
                "end_ms": current_time + duration_ms,
                "start_frame": int(current_time / frame_duration),
                "end_frame": int((current_time + duration_ms) / frame_duration),
            })
            current_time += duration_ms
        
        return {
            "total_duration_ms": current_time,
            "total_frames": int(current_time / frame_duration),
            "fps": fps,
            "scenes": timing_scenes,
        }
    
    async def _generate_style_guide(
        self,
        style: Dict,
        params: Dict
    ) -> Dict[str, Any]:
        """Generate comprehensive style guide."""
        
        return {
            "color_palette": params.get("color_palette", {}),
            "typography": {
                "primary": params.get("typography_style", "sans-serif"),
                "sizes": {
                    "title": "72px",
                    "subtitle": "48px",
                    "body": "32px",
                    "caption": "24px",
                },
                "weights": {
                    "title": "bold",
                    "subtitle": "semibold",
                    "body": "regular",
                },
            },
            "animation": {
                "style": params.get("animation_style", "smooth"),
                "easing": "easeInOut",
                "duration_range": {
                    "fast": 300,
                    "medium": 500,
                    "slow": 800,
                },
            },
            "transitions": {
                "types": params.get("transitions", ["fade"]),
                "duration": 500,
            },
            "effects": {
                "shadows": True,
                "gradients": True,
                "blur": False,
                "glow": False,
            },
        }
    
    async def _calculate_quality_score(
        self,
        scenes: List[Dict],
        timing: Dict,
        style: Dict
    ) -> float:
        """Calculate overall storyboard quality score."""
        
        scores = []
        
        # Scene count appropriateness
        duration = timing.get("total_duration_ms", 30000) / 1000
        scene_count = len(scenes)
        optimal_scenes = duration / 5  # ~5 seconds per scene
        scene_score = 1 - abs(scene_count - optimal_scenes) / optimal_scenes
        scores.append(max(0, min(1, scene_score)))
        
        # Description completeness
        completeness_scores = []
        for scene in scenes:
            has_description = bool(scene.get("detailed_description"))
            has_image_prompt = bool(scene.get("image_prompt"))
            has_motion = bool(scene.get("motion_type"))
            completeness_scores.append(
                (has_description + has_image_prompt + has_motion) / 3
            )
        scores.append(sum(completeness_scores) / len(completeness_scores) if completeness_scores else 0)
        
        # Style guide completeness
        style_score = (
            bool(style.get("color_palette")) +
            bool(style.get("typography")) +
            bool(style.get("animation"))
        ) / 3
        scores.append(style_score)
        
        return sum(scores) / len(scores) if scores else 0
    
    def _calculate_scene_count(self, duration: int) -> int:
        """Calculate optimal number of scenes."""
        if duration <= 15:
            return 3
        elif duration <= 30:
            return 5
        elif duration <= 60:
            return 8
        else:
            return max(8, duration // 7)
```

### 9.1.3 Visual Agent

```python
# app/agents/visual_agent.py
import asyncio
from typing import Dict, Any, Optional
from app.agents.base_agent import BaseAgent
from app.integrations.flux import FluxClient
from app.integrations.anthropic import ClaudeClient


class VisualAgent(BaseAgent):
    """Generates visual assets for video scenes."""
    
    def __init__(self):
        super().__init__(name="visual")
        self.flux = FluxClient()
        self.claude = ClaudeClient()
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Execute visual generation for all scenes."""
        
        scenes = state.get("scenes", [])
        style_guide = state.get("style_analysis", {})
        
        # Generate images for all scenes in parallel
        tasks = [
            self.execute_for_scene(scene, state)
            for scene in scenes
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        images = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                images.append({
                    "scene_id": scenes[i].get("id"),
                    "error": str(result),
                    "status": "failed"
                })
            else:
                images.append(result)
        
        return {
            "images": images,
            "success_count": sum(1 for r in results if not isinstance(r, Exception)),
            "failure_count": sum(1 for r in results if isinstance(r, Exception)),
        }
    
    async def execute_for_scene(
        self,
        scene: Dict[str, Any],
        state: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate image for a single scene."""
        
        style_guide = state.get("style_analysis", {})
        image_prompt = scene.get("image_prompt", "")
        
        # Enhance prompt with style information
        enhanced_prompt = await self._enhance_prompt(
            image_prompt, style_guide, scene
        )
        
        # Generate image
        image_result = await self._generate_image(enhanced_prompt, scene)
        
        # Post-process if needed
        if scene.get("elements"):
            image_result = await self._add_elements(
                image_result, scene["elements"]
            )
        
        return {
            "scene_id": scene.get("id"),
            "image_url": image_result.get("url"),
            "image_seed": image_result.get("seed"),
            "generation_time_ms": image_result.get("generation_time_ms"),
            "prompt_used": enhanced_prompt,
            "status": "completed"
        }
    
    async def _enhance_prompt(
        self,
        base_prompt: str,
        style_guide: Dict,
        scene: Dict
    ) -> str:
        """Enhance image prompt with style information."""
        
        response = await self.claude.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=500,
            messages=[{
                "role": "user",
                "content": f"""Enhance this image generation prompt for a professional video scene:

Base prompt: {base_prompt}
Style: {style_guide.get('style', 'cinematic')}
Colors: {style_guide.get('color_palette', {})}
Mood: {scene.get('mood', 'professional')}
Camera movement: {scene.get('camera_movement', 'static')}

Create an optimized prompt for Flux image generation. Include:
- Artistic style (photorealistic, illustration, 3D render, etc.)
- Lighting description
- Composition guidelines
- Color palette specifics
- Quality modifiers

Return ONLY the enhanced prompt text, no JSON."""
            }]
        )
        
        return response.content[0].text.strip()
    
    async def _generate_image(
        self,
        prompt: str,
        scene: Dict
    ) -> Dict[str, Any]:
        """Generate image using Flux."""
        
        # Determine parameters based on scene
        aspect_ratio = self._get_aspect_ratio(scene)
        quality = self._get_quality_level(scene)
        
        result = await self.flux.generate(
            prompt=prompt,
            width=self._get_width(aspect_ratio),
            height=self._get_height(aspect_ratio),
            num_inference_steps=50 if quality == "high" else 30,
            guidance_scale=7.5,
            seed=scene.get("image_seed"),
        )
        
        return {
            "url": result.get("image_url"),
            "seed": result.get("seed"),
            "generation_time_ms": result.get("generation_time_ms"),
        }
    
    async def _add_elements(
        self,
        image_result: Dict,
        elements: List[Dict]
    ) -> Dict[str, Any]:
        """Add text overlays and other elements to image."""
        
        # This would use image processing (Pillow, Sharp, or similar)
        # to composite elements onto the generated image
        
        for element in elements:
            if element.get("type") == "text":
                image_result = await self._add_text_overlay(
                    image_result, element
                )
            elif element.get("type") == "shape":
                image_result = await self._add_shape(
                    image_result, element
                )
        
        return image_result
    
    def _get_aspect_ratio(self, scene: Dict) -> str:
        """Get aspect ratio for the scene."""
        return scene.get("aspect_ratio", "16:9")
    
    def _get_quality_level(self, scene: Dict) -> str:
        """Determine quality level for generation."""
        importance = scene.get("scene_number", 1)
        if importance <= 2:
            return "high"  # Opening scenes get high quality
        return "standard"
    
    def _get_width(self, aspect_ratio: str) -> int:
        """Get width for aspect ratio."""
        ratios = {
            "16:9": 1920,
            "9:16": 1080,
            "1:1": 1080,
            "4:3": 1440,
        }
        return ratios.get(aspect_ratio, 1920)
    
    async def render_scene(
        self,
        scene_data: Dict,
        style_settings: Dict
    ) -> Dict[str, Any]:
        """Render a single scene (for re-generation)."""
        
        enhanced_prompt = await self._enhance_prompt(
            scene_data.get("image_prompt", ""),
            style_settings,
            scene_data
        )
        
        return await self._generate_image(enhanced_prompt, scene_data)
```

### 9.1.4 Audio Agent

```python
# app/agents/audio_agent.py
import asyncio
from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.integrations.elevenlabs import ElevenLabsClient
from app.integrations.whisper import WhisperClient
from app.integrations.anthropic import ClaudeClient


class AudioAgent(BaseAgent):
    """Handles all audio generation and processing."""
    
    def __init__(self):
        super().__init__(name="audio")
        self.elevenlabs = ElevenLabsClient()
        self.whisper = WhisperClient()
        self.claude = ClaudeClient()
    
    async def execute(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """Execute full audio generation pipeline."""
        
        scenes = state.get("scenes", [])
        params = state.get("research_data", {}).get("parameters", {})
        
        # Generate voiceover
        voiceover = await self.generate_voiceover(state)
        
        # Generate background music
        music = await self.generate_music(state)
        
        # Generate captions from voiceover
        captions = await self.generate_captions(state)
        
        # Generate sound effects
        sfx = await self._generate_sfx(scenes, params)
        
        # Mix audio tracks
        mixed_audio = await self._mix_audio(voiceover, music, sfx)
        
        return {
            "voiceover": voiceover,
            "music": music,
            "captions": captions,
            "sfx": sfx,
            "mixed_audio": mixed_audio,
        }
    
    async def generate_voiceover(
        self,
        state: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate voiceover for the video."""
        
        scenes = state.get("scenes", [])
        params = state.get("research_data", {}).get("parameters", {})
        
        # Collect all voiceover text
        voiceover_text = self._collect_voiceover_text(scenes)
        
        if not voiceover_text:
            return {"text": "", "audio_url": None}
        
        # Select voice based on settings
        voice_id = self._select_voice(params)
        
        # Generate speech
        result = await self.elevenlabs.text_to_speech(
            text=voiceover_text,
            voice_id=voice_id,
            model_id="eleven_multilingual_v2",
            voice_settings={
                "stability": 0.5,
                "similarity_boost": 0.75,
                "style": 0.5,
                "use_speaker_boost": True,
            },
        )
        
        return {
            "text": voiceover_text,
            "audio_url": result.get("audio_url"),
            "duration_ms": result.get("duration_ms"),
            "voice_id": voice_id,
        }
    
    async def generate_music(
        self,
        state: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate or select background music."""
        
        params = state.get("research_data", {}).get("parameters", {})
        style = params.get("style", "cinematic")
        mood = params.get("mood", "professional")
        duration = params.get("duration", 30)
        
        # For MVP, select from stock music library
        # In production, use AI music generation
        
        music = await self._select_stock_music(
            style=style,
            mood=mood,
            duration_seconds=duration
        )
        
        return {
            "music_url": music.get("url"),
            "music_id": music.get("id"),
            "duration_ms": music.get("duration_ms"),
            "volume": 0.3,  # Default background volume
        }
    
    async def generate_captions(
        self,
        state: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Generate captions from voiceover audio."""
        
        voiceover = state.get("voiceover", {})
        
        if not voiceover or not voiceover.get("audio_url"):
            return []
        
        # Transcribe audio with timestamps
        transcription = await self.whisper.transcribe(
            audio_url=voiceover["audio_url"],
            language="auto",
            task="transcribe",
            response_format="verbose_json",
            timestamp_granularities=["word", "segment"],
        )
        
        # Process into caption segments
        captions = self._process_captions(transcription)
        
        # Optimize caption timing
        optimized_captions = await self._optimize_caption_timing(
            captions, state.get("scenes", [])
        )
        
        return optimized_captions
    
    def _collect_voiceover_text(self, scenes: List[Dict]) -> str:
        """Collect and concatenate voiceover text from scenes."""
        
        texts = []
        for scene in scenes:
            if scene.get("voiceover_text"):
                texts.append(scene["voiceover_text"])
        
        return " ".join(texts)
    
    def _select_voice(self, params: Dict) -> str:
        """Select appropriate voice based on parameters."""
        
        voice_type = params.get("voice_type", "professional")
        voice_gender = params.get("voice_gender", "neutral")
        
        voice_map = {
            "professional": {
                "male": "pNInz6obpgDQGcFmaJgB",  # Adam
                "female": "EXAVITQu4vr4xnSDxMaL",  # Bella
                "neutral": "MF3mGyEYCl7XYWbV9V6O",  # Elli
            },
            "friendly": {
                "male": "TX3LPaxmHKxFdv7VOQHJ",  # Liam
                "female": "XrExE9yKIg1WjnnlVkGX",  # Matilda
                "neutral": "FGY2WhTYpPnrIDTdsKH5",  # George
            },
            "authoritative": {
                "male": "ErXwobaYiN019PkySvjV",  # Antoni
                "female": "oWAxZDx7w5VEj9dCyTzz",  # Grace
                "neutral": "onwK4e9ZLuTAKqWW03F9",  # Daniel
            },
        }
        
        return voice_map.get(voice_type, {}).get(voice_gender, "MF3mGyEYCl7XYWbV9V6O")
    
    def _process_captions(self, transcription: Dict) -> List[Dict]:
        """Process transcription into caption segments."""
        
        segments = transcription.get("segments", [])
        captions = []
        
        for segment in segments:
            # Split long segments
            text = segment.get("text", "")
            if len(text) > 50:  # Split at 50 chars
                words = text.split()
                current_chunk = []
                current_length = 0
                
                for word in words:
                    if current_length + len(word) > 42:  # ~42 chars per line
                        captions.append({
                            "text": " ".join(current_chunk),
                            "start_ms": segment.get("start", 0) * 1000,
                            "end_ms": segment.get("end", 0) * 1000,
                            "words": current_chunk,
                        })
                        current_chunk = [word]
                        current_length = len(word)
                    else:
                        current_chunk.append(word)
                        current_length += len(word) + 1
                
                if current_chunk:
                    captions.append({
                        "text": " ".join(current_chunk),
                        "start_ms": segment.get("start", 0) * 1000,
                        "end_ms": segment.get("end", 0) * 1000,
                        "words": current_chunk,
                    })
            else:
                captions.append({
                    "text": text,
                    "start_ms": segment.get("start", 0) * 1000,
                    "end_ms": segment.get("end", 0) * 1000,
                    "words": segment.get("words", []),
                })
        
        return captions
    
    async def _optimize_caption_timing(
        self,
        captions: List[Dict],
        scenes: List[Dict]
    ) -> List[Dict]:
        """Optimize caption timing to align with scenes."""
        
        optimized = []
        
        for caption in captions:
            # Find which scene this caption belongs to
            scene = self._find_scene_for_time(caption["start_ms"], scenes)
            
            if scene:
                # Adjust timing to scene boundaries
                optimized_caption = self._adjust_to_scene_boundaries(
                    caption, scene
                )
                optimized.append(optimized_caption)
            else:
                optimized.append(caption)
        
        return optimized
    
    def _find_scene_for_time(
        self,
        time_ms: int,
        scenes: List[Dict]
    ) -> Optional[Dict]:
        """Find which scene a timestamp belongs to."""
        
        current_time = 0
        for scene in scenes:
            duration = scene.get("duration_seconds", 5) * 1000
            if current_time <= time_ms < current_time + duration:
                return scene
            current_time += duration
        
        return None
    
    def _adjust_to_scene_boundaries(
        self,
        caption: Dict,
        scene: Dict
    ) -> Dict:
        """Adjust caption timing to scene boundaries."""
        
        # Simple adjustment - in production, more sophisticated logic
        return caption
    
    async def _generate_sfx(
        self,
        scenes: List[Dict],
        params: Dict
    ) -> List[Dict]:
        """Generate sound effects for scenes."""
        
        sfx = []
        
        for scene in scenes:
            scene_sfx = scene.get("audio_notes", "")
            if scene_sfx:
                sfx.append({
                    "scene_id": scene.get("id"),
                    "description": scene_sfx,
                    "url": None,  # Would generate/find SFX
                })
        
        return sfx
    
    async def _mix_audio(
        self,
        voiceover: Dict,
        music: Dict,
        sfx: List[Dict]
    ) -> Dict[str, Any]:
        """Mix all audio tracks together."""
        
        # This would use FFmpeg or similar for audio mixing
        # For MVP, return references to individual tracks
        
        return {
            "voiceover_url": voiceover.get("audio_url"),
            "music_url": music.get("music_url"),
            "music_volume": music.get("volume", 0.3),
            "sfx": sfx,
            "mixed_url": None,  # Would be mixed output
        }
```

---

# 10. Video Generation Engine

## 10.1 Remotion Composition

```typescript
// src/video/Root.tsx
import { Composition, Sequence } from 'remotion';
import { Scene } from './components/Scene';
import { useVideoConfig } from './hooks/useVideoConfig';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={30 * 30} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
          settings: {},
        }}
      />
    </>
  );
};

// src/video/MainVideo.tsx
import { AbsoluteFill, Sequence, Audio, Img } from 'remotion';
import { interpolate, spring, useCurrentFrame } from 'remotion';
import { Scene } from './components/Scene';
import { Transition } from './components/Transition';
import { TextOverlay } from './components/TextOverlay';
import { Captions } from './components/Captions';

interface VideoProps {
  scenes: SceneData[];
  settings: VideoSettings;
  voiceover?: AudioData;
  music?: AudioData;
  captions?: CaptionData[];
  brandColors?: ColorPalette;
}

export const MainVideo: React.FC<VideoProps> = ({
  scenes,
  settings,
  voiceover,
  music,
  captions,
  brandColors,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Calculate scene timings
  const sceneTimings = calculateSceneTimings(scenes, fps);
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Background music */}
      {music && (
        <Audio
          src={music.url}
          volume={music.volume || 0.3}
        />
      )}
      
      {/* Voiceover */}
      {voiceover && (
        <Audio
          src={voiceover.url}
          volume={1}
        />
      )}
      
      {/* Scenes */}
      {sceneTimings.map((timing, index) => (
        <Sequence
          key={scenes[index].id}
          from={timing.startFrame}
          durationInFrames={timing.durationFrames}
        >
          <Scene
            data={scenes[index]}
            brandColors={brandColors}
            settings={settings}
          />
          
          {/* Transition to next scene */}
          {index < scenes.length - 1 && (
            <Transition
              type={scenes[index].transition || 'fade'}
              durationFrames={timing.transitionFrames}
              direction="out"
            />
          )}
          
          {/* Transition from previous scene */}
          {index > 0 && (
            <Transition
              type={scenes[index - 1].transition || 'fade'}
              durationFrames={timing.transitionFrames}
              direction="in"
            />
          )}
        </Sequence>
      ))}
      
      {/* Global text overlays */}
      {settings.textOverlays?.map((overlay, index) => (
        <TextOverlay
          key={index}
          text={overlay.text}
          style={overlay.style}
          animation={overlay.animation}
          startFrame={overlay.startFrame}
          durationFrames={overlay.durationFrames}
        />
      ))}
      
      {/* Captions */}
      {captions && (
        <Captions
          captions={captions}
          style={settings.captionStyle}
        />
      )}
    </AbsoluteFill>
  );
};

// src/video/components/Scene.tsx
import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import { applyMotion } from '../utils/motion';
import { applyEffects } from '../utils/effects';

interface SceneProps {
  data: SceneData;
  brandColors?: ColorPalette;
  settings: VideoSettings;
}

export const Scene: React.FC<SceneProps> = ({
  data,
  brandColors,
  settings,
}) => {
  const frame = useCurrentFrame();
  
  // Apply motion based on type
  const motionStyle = applyMotion(
    data.motion_type,
    frame,
    data.duration_ms,
    data.animation_duration_ms,
    data.animation_easing
  );
  
  // Apply effects
  const effectsStyle = applyEffects(data.effects, frame);
  
  // Determine image filter
  const imageFilter = getImageFilter(data.image_filter);
  
  return (
    <AbsoluteFill>
      {/* Background image with motion */}
      <AbsoluteFill
        style={{
          ...motionStyle,
          ...effectsStyle,
        }}
      >
        {data.imageUrl ? (
          <Img
            src={data.imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: imageFilter,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: brandColors?.background || '#0a0a0f',
            }}
          />
        )}
      </AbsoluteFill>
      
      {/* Gradient overlays */}
      <AbsoluteFill
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.3) 100%
            )
          `,
        }}
      />
      
      {/* Text overlays */}
      {data.textOverlays?.map((overlay, index) => (
        <TextOverlayElement
          key={index}
          overlay={overlay}
          frame={frame}
          brandColors={brandColors}
        />
      ))}
      
      {/* Logo watermark */}
      {settings.showWatermark && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            opacity: 0.7,
          }}
        >
          <Img
            src="/logo-watermark.png"
            style={{ width: 100, height: 'auto' }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};

// src/video/utils/motion.ts
import { interpolate, spring } from 'remotion';

export function applyMotion(
  type: string,
  frame: number,
  durationMs: number,
  animationDurationMs: number,
  easing: string
): React.CSSProperties {
  const durationFrames = (durationMs / 1000) * 30;
  const animationFrames = (animationDurationMs / 1000) * 30;
  
  switch (type) {
    case 'fade':
      return {
        opacity: interpolate(
          frame,
          [0, animationFrames],
          [0, 1],
          { extrapolateRight: 'clamp' }
        ),
      };
    
    case 'slide_left':
      return {
        transform: `translateX(${interpolate(
          frame,
          [0, animationFrames],
          [100, 0],
          { extrapolateRight: 'clamp' }
        )}%)`,
      };
    
    case 'slide_right':
      return {
        transform: `translateX(${interpolate(
          frame,
          [0, animationFrames],
          [-100, 0],
          { extrapolateRight: 'clamp' }
        )}%)`,
      };
    
    case 'slide_up':
      return {
        transform: `translateY(${interpolate(
          frame,
          [0, animationFrames],
          [100, 0],
          { extrapolateRight: 'clamp' }
        )}%)`,
      };
    
    case 'slide_down':
      return {
        transform: `translateY(${interpolate(
          frame,
          [0, animationFrames],
          [-100, 0],
          { extrapolateRight: 'clamp' }
        )}%)`,
      };
    
    case 'zoom_in':
      return {
        transform: `scale(${interpolate(
          frame,
          [0, durationFrames],
          [1, 1.2],
          { extrapolateRight: 'clamp' }
        )})`,
      };
    
    case 'zoom_out':
      return {
        transform: `scale(${interpolate(
          frame,
          [0, durationFrames],
          [1.2, 1],
          { extrapolateRight: 'clamp' }
        )})`,
      };
    
    case 'kinetic':
      const kineticProgress = interpolate(
        frame,
        [0, animationFrames],
        [0, 1],
        { extrapolateRight: 'clamp' }
      );
      
      return {
        transform: `
          translateX(${spring({
            frame,
            fps: 30,
            config: { damping: 10, stiffness: 100 }
          }) * 50 - 50}px)
          rotate(${interpolate(
            frame,
            [0, animationFrames],
            [-5, 0],
            { extrapolateRight: 'clamp' }
          )}deg)
        `,
      };
    
    case 'parallax':
      return {
        transform: `translateY(${interpolate(
          frame,
          [0, durationFrames],
          [0, -50],
          { extrapolateRight: 'clamp' }
        )}px) scale(1.1)`,
      };
    
    default:
      return {};
  }
}

// src/video/utils/effects.ts
export function applyEffects(
  effects: Effect[],
  frame: number
): React.CSSProperties {
  let filters: string[] = [];
  
  for (const effect of effects) {
    switch (effect.type) {
      case 'blur':
        filters.push(`blur(${effect.intensity * 10}px)`);
        break;
      case 'brightness':
        filters.push(`brightness(${1 + effect.intensity})`);
        break;
      case 'contrast':
        filters.push(`contrast(${1 + effect.intensity})`);
        break;
      case 'saturate':
        filters.push(`saturate(${1 + effect.intensity})`);
        break;
      case 'grayscale':
        filters.push(`grayscale(${effect.intensity})`);
        break;
      case 'sepia':
        filters.push(`sepia(${effect.intensity})`);
        break;
      case 'hue-rotate':
        filters.push(`hue-rotate(${effect.intensity * 360}deg)`);
        break;
    }
  }
  
  return {
    filter: filters.length > 0 ? filters.join(' ') : undefined,
  };
}
```

## 10.2 Render Pipeline

```python
# app/services/render_service.py
import asyncio
from typing import Dict, Any, Optional
from datetime import datetime

from app.workers.celery_app import celery_app
from app.integrations.remotion import RemotionClient
from app.integrations.s3 import S3Client
from app.models.render_job import RenderJob
from app.db.session import get_db_session


class RenderService:
    """Service for managing video rendering."""
    
    def __init__(self):
        self.remotion = RemotionClient()
        self.s3 = S3Client()
    
    async def start_render(
        self,
        project_id: str,
        user_id: str,
        composition_data: Dict[str, Any],
        settings: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Start a new render job."""
        
        # Create render job record
        async with get_db_session() as db:
            job = RenderJob(
                project_id=project_id,
                user_id=user_id,
                status="queued",
                priority=settings.get("priority", 0),
                output_format=settings.get("format", "mp4"),
                output_resolution=settings.get("resolution", "1080p"),
            )
            db.add(job)
            await db.commit()
            await db.refresh(job)
            job_id = job.id
        
        # Queue render task
        task = celery_app.send_task(
            "app.workers.render_worker.render_video",
            args=[project_id, user_id, composition_data, settings],
            kwargs={"job_id": job_id},
            queue="render",
            priority=settings.get("priority", 0),
        )
        
        return {
            "job_id": job_id,
            "task_id": task.id,
            "status": "queued",
        }
    
    async def get_render_status(
        self,
        job_id: str
    ) -> Dict[str, Any]:
        """Get status of a render job."""
        
        async with get_db_session() as db:
            job = await db.get(RenderJob, job_id)
            
            if not job:
                raise ValueError(f"Render job {job_id} not found")
            
            return {
                "job_id": job.id,
                "status": job.status,
                "progress": job.progress,
                "current_step": job.current_step,
                "output_url": job.output_url,
                "error_message": job.error_message,
                "started_at": job.started_at.isoformat() if job.started_at else None,
                "completed_at": job.completed_at.isoformat() if job.completed_at else None,
                "generation_time_ms": job.generation_time_ms,
                "file_size_bytes": job.file_size_bytes,
            }
    
    async def cancel_render(self, job_id: str) -> bool:
        """Cancel a running render job."""
        
        async with get_db_session() as db:
            job = await db.get(RenderJob, job_id)
            
            if not job:
                raise ValueError(f"Render job {job_id} not found")
            
            if job.status not in ["queued", "processing"]:
                return False
            
            # Update status
            job.status = "cancelled"
            await db.commit()
            
            # Revoke Celery task
            if job.celery_task_id:
                celery_app.control.revoke(
                    job.celery_task_id,
                    terminate=True
                )
            
            return True
    
    async def retry_render(self, job_id: str) -> Dict[str, Any]:
        """Retry a failed render job."""
        
        async with get_db_session() as db:
            job = await db.get(RenderJob, job_id)
            
            if not job:
                raise ValueError(f"Render job {job_id} not found")
            
            if job.status != "failed":
                raise ValueError("Can only retry failed jobs")
            
            if job.retry_count >= job.max_retries:
                raise ValueError("Maximum retries exceeded")
            
            # Reset job status
            job.status = "queued"
            job.retry_count += 1
            job.error_message = None
            job.error_stack = None
            await db.commit()
        
        # Re-queue render
        return await self.start_render(
            job.project_id,
            job.user_id,
            job.composition_data,
            job.settings
        )


# app/integrations/remotion.py
import subprocess
import json
from typing import Dict, Any, Optional
import httpx


class RemotionClient:
    """Client for Remotion render server."""
    
    def __init__(
        self,
        server_url: str = "http://localhost:3000",
        api_key: Optional[str] = None
    ):
        self.server_url = server_url
        self.api_key = api_key
        self.client = httpx.AsyncClient(
            base_url=server_url,
            headers={"Authorization": f"Bearer {api_key}"} if api_key else {},
            timeout=3600,  # 1 hour timeout for renders
        )
    
    async def render(
        self,
        composition: str,
        props: Dict[str, Any],
        output_location: str,
        format: str = "mp4",
        codec: str = "h264",
        quality: str = "high",
    ) -> Dict[str, Any]:
        """Render a composition."""
        
        # Prepare render options
        options = {
            "composition": composition,
            "props": props,
            "output": output_location,
            "format": format,
            "codec": codec,
            **self._get_quality_settings(quality),
        }
        
        # Start render
        response = await self.client.post("/api/render", json=options)
        response.raise_for_status()
        
        render_id = response.json().get("render_id")
        
        # Wait for completion
        result = await self._wait_for_render(render_id)
        
        return result
    
    async def _wait_for_render(
        self,
        render_id: str,
        poll_interval: float = 1.0
    ) -> Dict[str, Any]:
        """Wait for render to complete."""
        
        while True:
            response = await self.client.get(f"/api/render/{render_id}")
            response.raise_for_status()
            
            status = response.json()
            
            if status["status"] == "completed":
                return status
            elif status["status"] == "failed":
                raise Exception(f"Render failed: {status.get('error')}")
            
            await asyncio.sleep(poll_interval)
    
    async def render_still(
        self,
        composition: str,
        props: Dict[str, Any],
        frame: int,
        output_location: str,
    ) -> Dict[str, Any]:
        """Render a single frame (for thumbnails)."""
        
        options = {
            "composition": composition,
            "props": props,
            "frame": frame,
            "output": output_location,
        }
        
        response = await self.client.post("/api/render-still", json=options)
        response.raise_for_status()
        
        return response.json()
    
    def _get_quality_settings(self, quality: str) -> Dict[str, Any]:
        """Get render quality settings."""
        
        settings = {
            "draft": {
                "scale": 0.5,
                "frames_per_second": 15,
            },
            "standard": {
                "scale": 1,
                "frames_per_second": 24,
            },
            "high": {
                "scale": 1,
                "frames_per_second": 30,
            },
            "ultra": {
                "scale": 1.5,
                "frames_per_second": 60,
            },
        }
        
        return settings.get(quality, settings["high"])
```

---

# 11. Audio Processing Pipeline

## 11.1 Voice Generation

```python
# app/services/audio_service.py
from typing import Dict, Any, List, Optional
import httpx
from app.integrations.elevenlabs import ElevenLabsClient
from app.integrations.whisper import WhisperClient
from app.integrations.s3 import S3Client


class AudioService:
    """Complete audio processing service."""
    
    def __init__(self):
        self.elevenlabs = ElevenLabsClient()
        self.whisper = WhisperClient()
        self.s3 = S3Client()
    
    async def generate_voiceover(
        self,
        text: str,
        voice_id: str,
        settings: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Generate voiceover audio."""
        
        settings = settings or {}
        
        # Generate speech
        result = await self.elevenlabs.text_to_speech(
            text=text,
            voice_id=voice_id,
            model_id=settings.get("model_id", "eleven_multilingual_v2"),
            voice_settings={
                "stability": settings.get("stability", 0.5),
                "similarity_boost": settings.get("similarity_boost", 0.75),
                "style": settings.get("style", 0.5),
                "use_speaker_boost": True,
            },
        )
        
        # Upload to storage
        audio_url = await self.s3.upload_audio(
            result["audio_bytes"],
            f"voiceovers/{voice_id}/{hash(text)}.mp3"
        )
        
        return {
            "url": audio_url,
            "duration_ms": result["duration_ms"],
            "voice_id": voice_id,
            "text": text,
        }
    
    async def generate_captions(
        self,
        audio_url: str,
        language: str = "auto"
    ) -> List[Dict[str, Any]]:
        """Generate captions from audio."""
        
        # Transcribe with timestamps
        transcription = await self.whisper.transcribe(
            audio_url=audio_url,
            language=language,
            task="transcribe",
            response_format="verbose_json",
            timestamp_granularities=["word", "segment"],
        )
        
        # Process into caption segments
        captions = self._process_segments(transcription["segments"])
        
        # Optimize for readability
        optimized = self._optimize_captions(captions)
        
        return optimized
    
    async def mix_audio(
        self,
        tracks: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Mix multiple audio tracks."""
        
        # Download all tracks
        track_files = []
        for track in tracks:
            file_path = await self.s3.download(track["url"])
            track_files.append({
                "path": file_path,
                "volume": track.get("volume", 1.0),
                "start_at": track.get("start_at", 0),
                "fade_in": track.get("fade_in", 0),
                "fade_out": track.get("fade_out", 0),
            })
        
        # Mix using FFmpeg
        mixed_path = await self._ffmpeg_mix(track_files)
        
        # Upload mixed audio
        mixed_url = await self.s3.upload_audio(
            mixed_path,
            f"mixed/{hash(str(tracks))}.mp3"
        )
        
        return {
            "url": mixed_url,
            "duration_ms": await self._get_audio_duration(mixed_path),
        }
    
    async def normalize_audio(
        self,
        audio_url: str,
        target_loudness: float = -16.0
    ) -> Dict[str, Any]:
        """Normalize audio loudness."""
        
        # Download audio
        file_path = await self.s3.download(audio_url)
        
        # Normalize using FFmpeg
        normalized_path = await self._ffmpeg_normalize(
            file_path,
            target_loudness
        )
        
        # Upload normalized audio
        normalized_url = await self.s3.upload_audio(
            normalized_path,
            f"normalized/{hash(audio_url)}.mp3"
        )
        
        return {
            "url": normalized_url,
            "original_loudness": await self._get_loudness(file_path),
            "normalized_loudness": target_loudness,
        }
    
    def _process_segments(
        self,
        segments: List[Dict]
    ) -> List[Dict[str, Any]]:
        """Process Whisper segments into captions."""
        
        captions = []
        
        for segment in segments:
            # Split long segments into lines
            text = segment["text"].strip()
            words = text.split()
            
            if len(words) > 8:  # More than 8 words
                # Split into multiple lines
                chunks = self._split_into_chunks(words, max_words=6)
                
                for i, chunk in enumerate(chunks):
                    chunk_text = " ".join(chunk)
                    chunk_duration = len(chunk) / len(words) * (
                        segment["end"] - segment["start"]
                    )
                    
                    captions.append({
                        "text": chunk_text,
                        "start_ms": (segment["start"] + i * chunk_duration) * 1000,
                        "end_ms": (segment["start"] + (i + 1) * chunk_duration) * 1000,
                        "words": chunk,
                        "confidence": segment.get("avg_logprob", 0),
                    })
            else:
                captions.append({
                    "text": text,
                    "start_ms": segment["start"] * 1000,
                    "end_ms": segment["end"] * 1000,
                    "words": words,
                    "confidence": segment.get("avg_logprob", 0),
                })
        
        return captions
    
    def _split_into_chunks(
        self,
        words: List[str],
        max_words: int = 6
    ) -> List[List[str]]:
        """Split words into chunks."""
        
        chunks = []
        current_chunk = []
        
        for word in words:
            current_chunk.append(word)
            if len(current_chunk) >= max_words:
                chunks.append(current_chunk)
                current_chunk = []
        
        if current_chunk:
            chunks.append(current_chunk)
        
        return chunks
    
    def _optimize_captions(
        self,
        captions: List[Dict]
    ) -> List[Dict[str, Any]]:
        """Optimize captions for readability."""
        
        optimized = []
        
        for caption in captions:
            # Ensure minimum display time (500ms)
            min_duration = 500
            actual_duration = caption["end_ms"] - caption["start_ms"]
            
            if actual_duration < min_duration:
                caption["end_ms"] = caption["start_ms"] + min_duration
            
            # Ensure maximum display time (5000ms)
            max_duration = 5000
            if actual_duration > max_duration:
                # Split into multiple captions
                words = caption["words"]
                mid = len(words) // 2
                
                optimized.append({
                    **caption,
                    "text": " ".join(words[:mid]),
                    "end_ms": caption["start_ms"] + (actual_duration / 2),
                    "words": words[:mid],
                })
                optimized.append({
                    **caption,
                    "text": " ".join(words[mid:]),
                    "start_ms": caption["start_ms"] + (actual_duration / 2),
                    "words": words[mid:],
                })
            else:
                optimized.append(caption)
        
        return optimized
    
    async def _ffmpeg_mix(
        self,
        tracks: List[Dict]
    ) -> str:
        """Mix audio tracks using FFmpeg."""
        
        # Build FFmpeg command
        inputs = []
        filters = []
        
        for i, track in enumerate(tracks):
            inputs.extend(["-i", track["path"]])
            
            # Apply volume and timing
            filter_parts = [f"[{i}:a]"]
            filter_parts.append(f"volume={track['volume']}")
            
            if track.get("start_at", 0) > 0:
                filter_parts.append(f"adelay={track['start_at']}")
            
            if track.get("fade_in", 0) > 0:
                filter_parts.append(f"afade=t=in:st=0:d={track['fade_in']}")
            
            if track.get("fade_out", 0) > 0:
                duration = await self._get_audio_duration(track["path"])
                filter_parts.append(
                    f"afade=t=out:st={duration - track['fade_out']}:d={track['fade_out']}"
                )
            
            filters.append("".join(filter_parts))
        
        # Build final command
        filter_complex = ";".join(
            [f"{f}[a{i}]" for i, f in enumerate(filters)]
        )
        filter_complex += f";{''.join([f'[a{i}]' for i in range(len(tracks))])}amix=inputs={len(tracks)}:duration=longest[out]"
        
        output_path = "/tmp/mixed_audio.mp3"
        
        cmd = [
            "ffmpeg",
            *inputs,
            "-filter_complex", filter_complex,
            "-map", "[out]",
            "-y",
            output_path,
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        
        await process.wait()
        
        return output_path
    
    async def _ffmpeg_normalize(
        self,
        input_path: str,
        target_loudness: float
    ) -> str:
        """Normalize audio using FFmpeg."""
        
        output_path = "/tmp/normalized_audio.mp3"
        
        cmd = [
            "ffmpeg",
            "-i", input_path,
            "-af", f"loudnorm=I={target_loudness}:TP=-1:LRA=11",
            "-y",
            output_path,
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        
        await process.wait()
        
        return output_path
    
    async def _get_audio_duration(self, path: str) -> float:
        """Get audio duration in seconds."""
        
        cmd = [
            "ffprobe",
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            path,
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        
        stdout, _ = await process.communicate()
        
        return float(stdout.decode().strip())
    
    async def _get_loudness(self, path: str) -> float:
        """Get audio loudness in LUFS."""
        
        cmd = [
            "ffmpeg",
            "-i", path,
            "-af", "ebur128=framelog=verbose",
            "-f", "null",
            "-",
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        
        _, stderr = await process.communicate()
        
        # Parse output for integrated loudness
        for line in stderr.decode().split("\n"):
            if "I:" in line and "LUFS" in line:
                parts = line.split("I:")
                if len(parts) > 1:
                    return float(parts[1].split("LUFS")[0].strip())
        
        return -16.0  # Default
```

---

# 12. Real-time Collaboration System

## 12.1 WebSocket Manager

```python
# app/api/websocket/manager.py
from typing import Dict, Set, Optional, Any
from datetime import datetime
import json
import asyncio
from fastapi import WebSocket, WebSocketDisconnect
import redis.asyncio as redis


class ConnectionManager:
    """Manages WebSocket connections for real-time collaboration."""
    
    def __init__(self):
        self.connections: Dict[str, Dict[str, WebSocket]] = {}
        self.user_connections: Dict[str, Set[str]] = {}
        self.redis = redis.Redis(host="localhost", port=6379, db=2)
    
    async def connect(
        self,
        websocket: WebSocket,
        project_id: str,
        user_id: str
    ):
        """Handle new WebSocket connection."""
        
        await websocket.accept()
        
        # Store connection
        if project_id not in self.connections:
            self.connections[project_id] = {}
        
        connection_id = f"{user_id}_{datetime.utcnow().timestamp()}"
        self.connections[project_id][connection_id] = websocket
        
        # Track user connections
        if user_id not in self.user_connections:
            self.user_connections[user_id] = set()
        self.user_connections[user_id].add(connection_id)
        
        # Notify others
        await self.broadcast_to_project(
            project_id,
            {
                "type": "user_joined",
                "user_id": user_id,
                "connection_id": connection_id,
                "timestamp": datetime.utcnow().isoformat(),
            },
            exclude=[connection_id],
        )
        
        # Send current state to new user
        await self._send_project_state(websocket, project_id, user_id)
    
    async def disconnect(
        self,
        project_id: str,
        connection_id: str,
        user_id: str
    ):
        """Handle WebSocket disconnection."""
        
        # Remove connection
        if project_id in self.connections:
            self.connections[project_id].pop(connection_id, None)
            
            if not self.connections[project_id]:
                del self.connections[project_id]
        
        # Remove from user connections
        if user_id in self.user_connections:
            self.user_connections[user_id].discard(connection_id)
            
            if not self.user_connections[user_id]:
                del self.user_connections[user_id]
        
        # Notify others
        await self.broadcast_to_project(
            project_id,
            {
                "type": "user_left",
                "user_id": user_id,
                "connection_id": connection_id,
                "timestamp": datetime.utcnow().isoformat(),
            },
        )
    
    async def broadcast_to_project(
        self,
        project_id: str,
        message: Dict[str, Any],
        exclude: Optional[list] = None
    ):
        """Broadcast message to all connections in a project."""
        
        exclude = exclude or []
        
        if project_id not in self.connections:
            return
        
        disconnected = []
        
        for conn_id, websocket in self.connections[project_id].items():
            if conn_id in exclude:
                continue
            
            try:
                await websocket.send_json(message)
            except WebSocketDisconnect:
                disconnected.append(conn_id)
        
        # Clean up disconnected
        for conn_id in disconnected:
            self.connections[project_id].pop(conn_id, None)
    
    async def send_to_user(
        self,
        user_id: str,
        message: Dict[str, Any]
    ):
        """Send message to all connections of a specific user."""
        
        if user_id not in self.user_connections:
            return
        
        disconnected = []
        
        for conn_id in self.user_connections[user_id]:
            # Find the websocket
            for project_id, connections in self.connections.items():
                if conn_id in connections:
                    try:
                        await connections[conn_id].send_json(message)
                    except WebSocketDisconnect:
                        disconnected.append((project_id, conn_id))
                    break
        
        # Clean up disconnected
        for project_id, conn_id in disconnected:
            self.connections.get(project_id, {}).pop(conn_id, None)
            self.user_connections.get(user_id, set()).discard(conn_id)
    
    async def handle_cursor_move(
        self,
        project_id: str,
        user_id: str,
        position: Dict[str, float],
        selected_scene: Optional[str] = None
    ):
        """Handle cursor movement from a user."""
        
        # Store in Redis for persistence
        await self.redis.hset(
            f"collab:{project_id}:cursors",
            user_id,
            json.dumps({
                "position": position,
                "selected_scene": selected_scene,
                "timestamp": datetime.utcnow().isoformat(),
            })
        )
        
        # Broadcast to others
        await self.broadcast_to_project(
            project_id,
            {
                "type": "cursor_moved",
                "user_id": user_id,
                "position": position,
                "selected_scene": selected_scene,
                "timestamp": datetime.utcnow().isoformat(),
            },
            exclude=[f"{user_id}_*"],  # Exclude self
        )
    
    async def handle_edit_operation(
        self,
        project_id: str,
        user_id: str,
        operation: Dict[str, Any]
    ):
        """Handle edit operation from a user."""
        
        # Apply operational transform for conflict resolution
        transformed_op = await self._transform_operation(
            project_id, user_id, operation
        )
        
        # Broadcast transformed operation
        await self.broadcast_to_project(
            project_id,
            {
                "type": "edit_operation",
                "user_id": user_id,
                "operation": transformed_op,
                "timestamp": datetime.utcnow().isoformat(),
            },
            exclude=[f"{user_id}_*"],
        )
    
    async def _send_project_state(
        self,
        websocket: WebSocket,
        project_id: str,
        user_id: str
    ):
        """Send current project state to a new connection."""
        
        # Get active users
        cursors = await self.redis.hgetall(
            f"collab:{project_id}:cursors"
        )
        
        active_users = []
        for uid, data in cursors.items():
            cursor_data = json.loads(data)
            if uid.decode() != user_id:
                active_users.append({
                    "user_id": uid.decode(),
                    "position": cursor_data["position"],
                    "selected_scene": cursor_data.get("selected_scene"),
                })
        
        await websocket.send_json({
            "type": "project_state",
            "active_users": active_users,
            "timestamp": datetime.utcnow().isoformat(),
        })
    
    async def _transform_operation(
        self,
        project_id: str,
        user_id: str,
        operation: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Transform operation for conflict resolution using OT."""
        
        # Get recent operations from Redis
        recent_ops = await self.redis.lrange(
            f"collab:{project_id}:operations",
            0,
            -1
        )
        
        transformed = operation
        
        for op_data in recent_ops:
            op = json.loads(op_data)
            if op["user_id"] != user_id:
                # Apply operational transformation
                transformed = self._ot_transform(transformed, op["operation"])
        
        # Store this operation
        await self.redis.rpush(
            f"collab:{project_id}:operations",
            json.dumps({
                "user_id": user_id,
                "operation": transformed,
                "timestamp": datetime.utcnow().isoformat(),
            })
        )
        
        # Trim old operations (keep last 100)
        await self.redis.ltrim(
            f"collab:{project_id}:operations",
            -100,
            -1
        )
        
        return transformed
    
    def _ot_transform(
        self,
        op1: Dict[str, Any],
        op2: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Apply operational transformation between two operations."""
        
        # Simplified OT implementation
        # In production, use a proper OT library
        
        if op1["type"] == "scene_update" and op2["type"] == "scene_update":
            if op1["scene_id"] == op2["scene_id"]:
                # Same scene - need to transform
                # For now, priority to the later operation
                return op1
        
        return op1
```

---

# 13. MCP Integration Layer

## 13.1 MCP Server Implementation

```python
# app/mcp/server.py
from mcp.server import Server
from mcp.types import (
    Tool,
    TextContent,
    ImageContent,
    EmbeddedResource,
)
from typing import Dict, Any, List
import json

from app.services.video_service import VideoService
from app.services.project_service import ProjectService
from app.services.brand_service import BrandService


class MotionMCPServer:
    """MCP server for Motion video generation platform."""
    
    def __init__(self):
        self.server = Server("motion-video")
        self.video_service = VideoService()
        self.project_service = ProjectService()
        self.brand_service = BrandService()
        
        self._register_tools()
    
    def _register_tools(self):
        """Register MCP tools."""
        
        @self.server.list_tools()
        async def list_tools() -> List[Tool]:
            return [
                Tool(
                    name="generate_video",
                    description="Generate a professional video from a text prompt",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "prompt": {
                                "type": "string",
                                "description": "Description of the video to generate",
                            },
                            "duration": {
                                "type": "integer",
                                "description": "Video duration in seconds (default: 30)",
                                "minimum": 5,
                                "maximum": 300,
                            },
                            "style": {
                                "type": "string",
                                "enum": [
                                    "cinematic",
                                    "modern",
                                    "playful",
                                    "minimal",
                                    "kinetic",
                                    "elegant",
                                ],
                                "description": "Visual style",
                            },
                            "aspect_ratio": {
                                "type": "string",
                                "enum": ["16:9", "9:16", "1:1", "4:3"],
                                "description": "Video aspect ratio",
                            },
                            "brand_id": {
                                "type": "string",
                                "description": "Brand context ID to use",
                            },
                        },
                        "required": ["prompt"],
                    },
                ),
                Tool(
                    name="list_projects",
                    description="List all video projects",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "status": {
                                "type": "string",
                                "enum": ["draft", "generating", "ready", "failed"],
                                "description": "Filter by status",
                            },
                            "limit": {
                                "type": "integer",
                                "description": "Number of projects to return",
                                "minimum": 1,
                                "maximum": 100,
                            },
                        },
                    },
                ),
                Tool(
                    name="get_project",
                    description="Get details of a specific project",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "project_id": {
                                "type": "string",
                                "description": "Project ID",
                            },
                        },
                        "required": ["project_id"],
                    },
                ),
                Tool(
                    name="get_video_status",
                    description="Get the status of a video generation",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "project_id": {
                                "type": "string",
                                "description": "Project ID",
                            },
                        },
                        "required": ["project_id"],
                    },
                ),
                Tool(
                    name="regenerate_scene",
                    description="Regenerate a specific scene in a project",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "project_id": {
                                "type": "string",
                                "description": "Project ID",
                            },
                            "scene_id": {
                                "type": "string",
                                "description": "Scene ID to regenerate",
                            },
                            "new_prompt": {
                                "type": "string",
                                "description": "New prompt for the scene",
                            },
                        },
                        "required": ["project_id", "scene_id"],
                    },
                ),
                Tool(
                    name="create_brand",
                    description="Create a new brand context",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "Brand name",
                            },
                            "website_url": {
                                "type": "string",
                                "description": "Brand website URL",
                            },
                            "colors": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "Brand colors (hex codes)",
                            },
                        },
                        "required": ["name"],
                    },
                ),
                Tool(
                    name="analyze_website",
                    description="Analyze a website for brand colors and style",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "description": "Website URL to analyze",
                            },
                        },
                        "required": ["url"],
                    },
                ),
            ]
        
        @self.server.call_tool()
        async def call_tool(
            name: str,
            arguments: Dict[str, Any]
        ) -> List[TextContent | ImageContent | EmbeddedResource]:
            """Handle tool calls."""
            
            try:
                if name == "generate_video":
                    result = await self._generate_video(arguments)
                elif name == "list_projects":
                    result = await self._list_projects(arguments)
                elif name == "get_project":
                    result = await self._get_project(arguments)
                elif name == "get_video_status":
                    result = await self._get_video_status(arguments)
                elif name == "regenerate_scene":
                    result = await self._regenerate_scene(arguments)
                elif name == "create_brand":
                    result = await self._create_brand(arguments)
                elif name == "analyze_website":
                    result = await self._analyze_website(arguments)
                else:
                    raise ValueError(f"Unknown tool: {name}")
                
                return [TextContent(
                    type="text",
                    text=json.dumps(result, indent=2)
                )]
                
            except Exception as e:
                return [TextContent(
                    type="text",
                    text=json.dumps({
                        "error": str(e),
                        "success": False,
                    }, indent=2)
                )]
    
    async def _generate_video(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate a video."""
        
        result = await self.video_service.create_and_generate(
            prompt=args["prompt"],
            duration=args.get("duration", 30),
            style=args.get("style", "cinematic"),
            aspect_ratio=args.get("aspect_ratio", "16:9"),
            brand_id=args.get("brand_id"),
        )
        
        return {
            "success": True,
            "project_id": result["project_id"],
            "status": "generating",
            "message": f"Video generation started. Project ID: {result['project_id']}",
            "estimated_time_seconds": result.get("estimated_time", 120),
        }
    
    async def _list_projects(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """List projects."""
        
        projects = await self.project_service.list(
            status=args.get("status"),
            limit=args.get("limit", 20),
        )
        
        return {
            "success": True,
            "projects": [
                {
                    "id": p["id"],
                    "name": p["name"],
                    "status": p["status"],
                    "created_at": p["created_at"],
                    "video_url": p.get("video_url"),
                }
                for p in projects
            ],
            "total": len(projects),
        }
    
    async def _get_project(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Get project details."""
        
        project = await self.project_service.get(args["project_id"])
        
        if not project:
            raise ValueError(f"Project not found: {args['project_id']}")
        
        return {
            "success": True,
            "project": {
                "id": project["id"],
                "name": project["name"],
                "prompt": project["prompt"],
                "status": project["status"],
                "scenes": project.get("scenes", []),
                "video_url": project.get("video_url"),
                "created_at": project["created_at"],
                "generation_time_ms": project.get("generation_time_ms"),
            },
        }
    
    async def _get_video_status(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Get video generation status."""
        
        status = await self.video_service.get_status(args["project_id"])
        
        return {
            "success": True,
            "status": status["status"],
            "progress": status["progress"],
            "current_phase": status["current_phase"],
            "video_url": status.get("video_url"),
            "error": status.get("error"),
        }
    
    async def _regenerate_scene(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Regenerate a scene."""
        
        result = await self.video_service.regenerate_scene(
            project_id=args["project_id"],
            scene_id=args["scene_id"],
            new_prompt=args.get("new_prompt"),
        )
        
        return {
            "success": True,
            "message": "Scene regeneration started",
            "scene_id": args["scene_id"],
        }
    
    async def _create_brand(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Create a brand context."""
        
        brand = await self.brand_service.create(
            name=args["name"],
            website_url=args.get("website_url"),
            colors=args.get("colors", []),
        )
        
        return {
            "success": True,
            "brand_id": brand["id"],
            "name": brand["name"],
        }
    
    async def _analyze_website(
        self,
        args: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Analyze a website."""
        
        analysis = await self.brand_service.analyze_website(args["url"])
        
        return {
            "success": True,
            "colors": analysis.get("colors", []),
            "typography": analysis.get("typography", {}),
            "style": analysis.get("style", {}),
        }
```

---

# 14. Authentication & Authorization

## 14.1 JWT Implementation

```python
# app/core/security.py
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import jwt
from passlib.context import CryptContext
from app.config import settings


class SecurityManager:
    """Handles authentication and security."""
    
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.secret_key = settings.JWT_SECRET_KEY
        self.algorithm = "HS256"
        self.access_token_expire_minutes = 30
        self.refresh_token_expire_days = 7
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password against a hash."""
        return self.pwd_context.verify(plain_password, hashed_password)
    
    def get_password_hash(self, password: str) -> str:
        """Hash a password."""
        return self.pwd_context.hash(password)
    
    def create_access_token(
        self,
        data: Dict[str, Any],
        expires_delta: Optional[timedelta] = None
    ) -> str:
        """Create a JWT access token."""
        
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(
                minutes=self.access_token_expire_minutes
            )
        
        to_encode.update({
            "exp": expire,
            "iat": datetime.utcnow(),
            "type": "access",
        })
        
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def create_refresh_token(self, data: Dict[str, Any]) -> str:
        """Create a JWT refresh token."""
        
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(
            days=self.refresh_token_expire_days
        )
        
        to_encode.update({
            "exp": expire,
            "iat": datetime.utcnow(),
            "type": "refresh",
        })
        
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def decode_token(self, token: str) -> Dict[str, Any]:
        """Decode and verify a JWT token."""
        
        try:
            payload = jwt.decode(
                token,
                self.secret_key,
                algorithms=[self.algorithm]
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Token has expired")
        except jwt.InvalidTokenError:
            raise ValueError("Invalid token")
    
    def create_api_key(self, user_id: str, name: str) -> str:
        """Create an API key."""
        
        data = {
            "user_id": user_id,
            "name": name,
            "type": "api_key",
        }
        
        return self.create_access_token(
            data,
            expires_delta=timedelta(days=365)  # 1 year
        )


# app/core/permissions.py
from typing import List, Optional
from enum import Enum


class Permission(str, Enum):
    # Project permissions
    PROJECT_CREATE = "project:create"
    PROJECT_READ = "project:read"
    PROJECT_UPDATE = "project:update"
    PROJECT_DELETE = "project:delete"
    PROJECT_GENERATE = "project:generate"
    
    # Brand permissions
    BRAND_CREATE = "brand:create"
    BRAND_READ = "brand:read"
    BRAND_UPDATE = "brand:update"
    BRAND_DELETE = "brand:delete"
    
    # Asset permissions
    ASSET_UPLOAD = "asset:upload"
    ASSET_READ = "asset:read"
    ASSET_DELETE = "asset:delete"
    
    # Billing permissions
    BILLING_READ = "billing:read"
    BILLING_MANAGE = "billing:manage"
    
    # Admin permissions
    ADMIN_USERS = "admin:users"
    ADMIN_PROJECTS = "admin:projects"
    ADMIN_SYSTEM = "admin:system"


# Role definitions
ROLES = {
    "viewer": [
        Permission.PROJECT_READ,
        Permission.BRAND_READ,
        Permission.ASSET_READ,
    ],
    "editor": [
        Permission.PROJECT_CREATE,
        Permission.PROJECT_READ,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_GENERATE,
        Permission.BRAND_CREATE,
        Permission.BRAND_READ,
        Permission.BRAND_UPDATE,
        Permission.ASSET_UPLOAD,
        Permission.ASSET_READ,
    ],
    "admin": [
        Permission.PROJECT_CREATE,
        Permission.PROJECT_READ,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_DELETE,
        Permission.PROJECT_GENERATE,
        Permission.BRAND_CREATE,
        Permission.BRAND_READ,
        Permission.BRAND_UPDATE,
        Permission.BRAND_DELETE,
        Permission.ASSET_UPLOAD,
        Permission.ASSET_READ,
        Permission.ASSET_DELETE,
        Permission.BILLING_READ,
        Permission.BILLING_MANAGE,
    ],
    "owner": [p for p in Permission],  # All permissions
}


class PermissionChecker:
    """Checks user permissions."""
    
    def __init__(self, user_role: str, user_id: str):
        self.role = user_role
        self.user_id = user_id
        self.permissions = ROLES.get(user_role, [])
    
    def has_permission(self, permission: Permission) -> bool:
        """Check if user has a specific permission."""
        return permission in self.permissions
    
    def has_any_permission(self, *permissions: Permission) -> bool:
        """Check if user has any of the specified permissions."""
        return any(p in self.permissions for p in permissions)
    
    def has_all_permissions(self, *permissions: Permission) -> bool:
        """Check if user has all specified permissions."""
        return all(p in self.permissions for p in permissions)
    
    def require_permission(self, permission: Permission):
        """Raise exception if permission not granted."""
        if not self.has_permission(permission):
            raise PermissionError(
                f"Permission denied: {permission.value}"
            )
```

---

# 15. Payment & Subscription System

## 15.1 Stripe Integration

```python
# app/services/billing_service.py
import stripe
from typing import Dict, Any, Optional
from datetime import datetime, timedelta

from app.config import settings
from app.models.subscription import Subscription
from app.models.user import User
from app.db.session import get_db_session


# Plan definitions
PLANS = {
    "free": {
        "name": "Free",
        "price_monthly": 0,
        "video_limit": 1,
        "max_duration": 30,  # seconds
        "watermark": True,
        "mcp_access": False,
        "features": [
            "1 video per month",
            "30 second max duration",
            "Basic styles",
            "Watermark included",
        ],
    },
    "pro": {
        "name": "Pro",
        "price_monthly": 2900,  # cents
        "video_limit": 10,
        "max_duration": 300,  # 5 minutes
        "watermark": False,
        "mcp_access": True,
        "stripe_price_id": settings.STRIPE_PRO_PRICE_ID,
        "features": [
            "10 videos per month",
            "5 minute max duration",
            "All styles",
            "No watermark",
            "MCP access",
            "Priority rendering",
        ],
    },
    "enterprise": {
        "name": "Enterprise",
        "price_monthly": 19900,  # cents
        "video_limit": -1,  # unlimited
        "max_duration": -1,  # unlimited
        "watermark": False,
        "mcp_access": True,
        "stripe_price_id": settings.STRIPE_ENTERPRISE_PRICE_ID,
        "features": [
            "Unlimited videos",
            "Unlimited duration",
            "All styles",
            "No watermark",
            "MCP + API access",
            "Team collaboration",
            "Custom branding",
            "Dedicated support",
            "Self-hosted option",
        ],
    },
}


class BillingService:
    """Handles all billing and subscription operations."""
    
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        self.webhook_secret = settings.STRIPE_WEBHOOK_SECRET
    
    async def create_checkout_session(
        self,
        user_id: str,
        plan_id: str,
        success_url: str,
        cancel_url: str
    ) -> Dict[str, Any]:
        """Create a Stripe checkout session."""
        
        plan = PLANS.get(plan_id)
        if not plan or plan_id == "free":
            raise ValueError("Invalid plan")
        
        async with get_db_session() as db:
            user = await db.get(User, user_id)
            
            # Get or create Stripe customer
            customer_id = await self._get_or_create_customer(user)
            
            # Create checkout session
            session = stripe.checkout.Session.create(
                customer=customer_id,
                payment_method_types=["card"],
                line_items=[{
                    "price": plan["stripe_price_id"],
                    "quantity": 1,
                }],
                mode="subscription",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata={
                    "user_id": user_id,
                    "plan_id": plan_id,
                },
                subscription_data={
                    "trial_period_days": 14,
                },
            )
            
            return {
                "session_id": session.id,
                "url": session.url,
            }
    
    async def create_customer_portal(
        self,
        user_id: str,
        return_url: str
    ) -> Dict[str, Any]:
        """Create a Stripe customer portal session."""
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.user_id == user_id
            ).first()
            
            if not subscription or not subscription.stripe_customer_id:
                raise ValueError("No active subscription")
            
            session = stripe.billing_portal.Session.create(
                customer=subscription.stripe_customer_id,
                return_url=return_url,
            )
            
            return {
                "url": session.url,
            }
    
    async def handle_webhook(
        self,
        payload: bytes,
        sig_header: str
    ) -> Dict[str, Any]:
        """Handle Stripe webhook events."""
        
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, self.webhook_secret
            )
        except ValueError:
            raise ValueError("Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise ValueError("Invalid signature")
        
        # Handle different event types
        if event["type"] == "checkout.session.completed":
            await self._handle_checkout_completed(event["data"]["object"])
        
        elif event["type"] == "invoice.paid":
            await self._handle_invoice_paid(event["data"]["object"])
        
        elif event["type"] == "invoice.payment_failed":
            await self._handle_invoice_payment_failed(event["data"]["object"])
        
        elif event["type"] == "customer.subscription.updated":
            await self._handle_subscription_updated(event["data"]["object"])
        
        elif event["type"] == "customer.subscription.deleted":
            await self._handle_subscription_deleted(event["data"]["object"])
        
        return {"status": "success"}
    
    async def _handle_checkout_completed(self, session: Dict):
        """Handle successful checkout."""
        
        user_id = session["metadata"]["user_id"]
        plan_id = session["metadata"]["plan_id"]
        
        async with get_db_session() as db:
            # Create or update subscription
            subscription = await db.query(Subscription).filter(
                Subscription.user_id == user_id
            ).first()
            
            if subscription:
                subscription.stripe_subscription_id = session["subscription"]
                subscription.plan_id = plan_id
                subscription.status = "active"
            else:
                subscription = Subscription(
                    user_id=user_id,
                    stripe_customer_id=session["customer"],
                    stripe_subscription_id=session["subscription"],
                    plan_id=plan_id,
                    status="active",
                )
                db.add(subscription)
            
            await db.commit()
    
    async def _handle_invoice_paid(self, invoice: Dict):
        """Handle successful payment."""
        
        subscription_id = invoice["subscription"]
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.stripe_subscription_id == subscription_id
            ).first()
            
            if subscription:
                subscription.status = "active"
                subscription.current_period_start = datetime.fromtimestamp(
                    invoice["period_start"]
                )
                subscription.current_period_end = datetime.fromtimestamp(
                    invoice["period_end"]
                )
                await db.commit()
    
    async def _handle_invoice_payment_failed(self, invoice: Dict):
        """Handle failed payment."""
        
        subscription_id = invoice["subscription"]
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.stripe_subscription_id == subscription_id
            ).first()
            
            if subscription:
                subscription.status = "past_due"
                await db.commit()
                
                # Send notification email
    
    async def _handle_subscription_updated(self, subscription_data: Dict):
        """Handle subscription update."""
        
        stripe_subscription_id = subscription_data["id"]
        new_plan = subscription_data["items"]["data"][0]["price"]["id"]
        
        # Map price ID to plan ID
        plan_map = {
            settings.STRIPE_PRO_PRICE_ID: "pro",
            settings.STRIPE_ENTERPRISE_PRICE_ID: "enterprise",
        }
        
        plan_id = plan_map.get(new_plan, "free")
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.stripe_subscription_id == stripe_subscription_id
            ).first()
            
            if subscription:
                subscription.plan_id = plan_id
                subscription.status = subscription_data["status"]
                await db.commit()
    
    async def _handle_subscription_deleted(self, subscription_data: Dict):
        """Handle subscription cancellation."""
        
        stripe_subscription_id = subscription_data["id"]
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.stripe_subscription_id == stripe_subscription_id
            ).first()
            
            if subscription:
                subscription.status = "cancelled"
                subscription.plan_id = "free"
                await db.commit()
    
    async def check_usage(
        self,
        user_id: str,
        metric: str = "video_generation"
    ) -> Dict[str, Any]:
        """Check user's current usage against limits."""
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.user_id == user_id
            ).first()
            
            if not subscription:
                plan = PLANS["free"]
            else:
                plan = PLANS.get(subscription.plan_id, PLANS["free"])
            
            # Get current period usage
            period_start = subscription.current_period_start if subscription else datetime.utcnow().replace(day=1)
            
            # Count videos generated this period
            # This would query the projects table
            usage_count = await self._get_usage_count(
                user_id, metric, period_start
            )
            
            limit = plan.get("video_limit", 1)
            
            return {
                "plan": subscription.plan_id if subscription else "free",
                "usage": usage_count,
                "limit": limit,
                "remaining": max(0, limit - usage_count) if limit > 0 else -1,
                "can_generate": limit == -1 or usage_count < limit,
            }
    
    async def _get_usage_count(
        self,
        user_id: str,
        metric: str,
        since: datetime
    ) -> int:
        """Get usage count for a metric since a date."""
        
        async with get_db_session() as db:
            # This would query the appropriate table
            # For video_generation, count completed projects
            from app.models.project import Project
            
            count = await db.query(Project).filter(
                Project.user_id == user_id,
                Project.created_at >= since,
                Project.status == "ready",
            ).count()
            
            return count
    
    async def _get_or_create_customer(self, user: User) -> str:
        """Get or create Stripe customer for user."""
        
        async with get_db_session() as db:
            subscription = await db.query(Subscription).filter(
                Subscription.user_id == user.id
            ).first()
            
            if subscription and subscription.stripe_customer_id:
                return subscription.stripe_customer_id
            
            # Create new customer
            customer = stripe.Customer.create(
                email=user.email,
                name=user.full_name,
                metadata={"user_id": user.id},
            )
            
            # Update or create subscription record
            if subscription:
                subscription.stripe_customer_id = customer.id
            else:
                subscription = Subscription(
                    user_id=user.id,
                    stripe_customer_id=customer.id,
                    plan_id="free",
                    status="active",
                )
                db.add(subscription)
            
            await db.commit()
            
            return customer.id
```

---

# 16. Deployment & Infrastructure

## 16.1 Docker Configuration

```dockerfile
# Dockerfile
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM python:3.12-slim AS backend

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Final stage
FROM backend AS production

# Copy frontend build
COPY --from=frontend-builder /app/dist ./static

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: frontend-builder
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000
    command: npm run dev

  # Backend API
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://motion:motion@postgres:5432/motion
      - REDIS_URL=redis://redis:6379
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - FLUX_API_KEY=${FLUX_API_KEY}
      - ELEVENLABS_API_KEY=${ELEVENLABS_API_KEY}
    depends_on:
      - postgres
      - redis
    command: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

  # Celery Worker
  worker:
    build:
      context: .
      dockerfile: Dockerfile
      target: backend
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://motion:motion@postgres:5432/motion
      - REDIS_URL=redis://redis:6379
      - CELERY_BROKER_URL=redis://redis:6379/0
      - CELERY_RESULT_BACKEND=redis://redis:6379/1
    depends_on:
      - postgres
      - redis
    command: celery -A app.workers.celery_app worker -l info -Q render,export,analysis

  # Celery Beat (Scheduler)
  beat:
    build:
      context: .
      dockerfile: Dockerfile
      target: backend
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://motion:motion@postgres:5432/motion
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    command: celery -A app.workers.celery_app beat -l info

  # PostgreSQL
  postgres:
    image: pgvector/pgvector:pg16
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=motion
      - POSTGRES_PASSWORD=motion
      - POSTGRES_DB=motion
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U motion"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

  # Remotion Render Server
  remotion:
    image: remotion/renderer:latest
    ports:
      - "3001:3000"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  # Monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3002:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  # Elasticsearch
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

volumes:
  postgres_data:
  redis_data:
  minio_data:
  grafana_data:
  elasticsearch_data:
```

## 16.2 Kubernetes Deployment

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: motion-production

---
# k8s/api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: motion-api
  namespace: motion-production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: motion-api
  template:
    metadata:
      labels:
        app: motion-api
    spec:
      containers:
        - name: api
          image: motion-registry/api:latest
          ports:
            - containerPort: 8000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: motion-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: motion-secrets
                  key: redis-url
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 5

---
# k8s/api-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: motion-api
  namespace: motion-production
spec:
  selector:
    app: motion-api
  ports:
    - port: 80
      targetPort: 8000
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: motion-ingress
  namespace: motion-production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
    - hosts:
        - app.motion.ai
        - api.motion.ai
      secretName: motion-tls
  rules:
    - host: app.motion.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: motion-frontend
                port:
                  number: 80
    - host: api.motion.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: motion-api
                port:
                  number: 80

---
# k8s/worker-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: motion-worker
  namespace: motion-production
spec:
  replicas: 5
  selector:
    matchLabels:
      app: motion-worker
  template:
    metadata:
      labels:
        app: motion-worker
    spec:
      containers:
        - name: worker
          image: motion-registry/worker:latest
          command: ["celery", "-A", "app.workers.celery_app", "worker", "-l", "info"]
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: motion-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: motion-secrets
                  key: redis-url
          resources:
            requests:
              memory: "1Gi"
              cpu: "500m"
            limits:
              memory: "2Gi"
              cpu: "1000m"

---
# k8s/gpu-worker-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: motion-gpu-worker
  namespace: motion-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: motion-gpu-worker
  template:
    metadata:
      labels:
        app: motion-gpu-worker
    spec:
      nodeSelector:
        cloud.google.com/gke-accelerator: nvidia-tesla-t4
      containers:
        - name: worker
          image: motion-registry/gpu-worker:latest
          command: ["celery", "-A", "app.workers.celery_app", "worker", "-Q", "render,gpu"]
          resources:
            requests:
              memory: "4Gi"
              cpu: "2000m"
              nvidia.com/gpu: 1
            limits:
              memory: "8Gi"
              cpu: "4000m"
              nvidia.com/gpu: 1
```

---

# 17. CI/CD Pipeline

## 17.1 GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Frontend tests
  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run typecheck
      
      - name: Unit tests
        run: npm run test:unit -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          flags: frontend

  # Backend tests
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.12'
          cache: 'pip'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Lint
        run: ruff check .
      
      - name: Type check
        run: mypy .
      
      - name: Unit tests
        run: pytest tests/unit --cov=app --cov-report=xml
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          flags: backend

  # Integration tests
  integration-test:
    runs-on: ubuntu-latest
    needs: [frontend-test, backend-test]
    
    services:
      postgres:
        image: pgvector/pgvector:pg16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.12'
      
      - name: Install dependencies
        working-directory: backend
        run: pip install -r requirements.txt
      
      - name: Run migrations
        working-directory: backend
        run: alembic upgrade head
        env:
          DATABASE_URL: postgresql://test:test@localhost/test
      
      - name: Run integration tests
        working-directory: backend
        run: pytest tests/integration -v
        env:
          DATABASE_URL: postgresql://test:test@localhost/test
          REDIS_URL: redis://localhost:6379

  # Build and push Docker images
  build:
    runs-on: ubuntu-latest
    needs: [integration-test]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_TOKEN }}
      
      - name: Build and push API
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          target: production
          push: true
          tags: motionregistry/api:${{ github.sha }},motionregistry/api:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Deploy to staging
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment: staging
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to GKE
        uses: google-github-actions/get-gke-credentials@v1
        with:
          cluster_name: motion-staging
          location: us-central1
          credentials: ${{ secrets.GKE_SA_KEY }}
      
      - name: Update deployment
        run: |
          kubectl set image deployment/motion-api \
            api=motionregistry/api:${{ github.sha }} \
            -n motion-staging
          kubectl rollout status deployment/motion-api -n motion-staging
```

---

# 18. Monitoring & Observability

## 18.1 Logging Configuration

```python
# app/core/logging.py
import logging
import json
from datetime import datetime
from typing import Any, Dict
import structlog


def setup_logging():
    """Configure structured logging."""
    
    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.dev.set_exc_info,
            structlog.processors.JSONRenderer(),
        ],
        wrapper_class=structlog.BoundLogger,
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )


class RequestLoggingMiddleware:
    """Middleware for logging HTTP requests."""
    
    def __init__(self, app):
        self.app = app
        self.logger = structlog.get_logger("http")
    
    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)
        
        request_id = scope.get("headers", [
            [b"x-request-id", b""]
        ])[0][1].decode() if scope.get("headers") else None
        
        start_time = datetime.utcnow()
        
        # Add context
        structlog.contextvars.clear_contextvars()
        structlog.contextvars.bind_contextvars(
            request_id=request_id,
            method=scope["method"],
            path=scope["path"],
        )
        
        response_status = None
        
        async def send_wrapper(message):
            nonlocal response_status
            if message["type"] == "http.response.start":
                response_status = message["status"]
            await send(message)
        
        try:
            await self.app(scope, receive, send_wrapper)
        except Exception as e:
            self.logger.error(
                "request_failed",
                error=str(e),
                exc_info=True,
            )
            raise
        finally:
            duration = (datetime.utcnow() - start_time).total_seconds() * 1000
            
            self.logger.info(
                "request_completed",
                status=response_status,
                duration_ms=duration,
            )


# Structured log entry format
class LogEntry:
    """Structured log entry."""
    
    def __init__(
        self,
        level: str,
        message: str,
        **kwargs
    ):
        self.timestamp = datetime.utcnow().isoformat()
        self.level = level
        self.message = message
        self.data = kwargs
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "timestamp": self.timestamp,
            "level": self.level,
            "message": self.message,
            **self.data,
        }
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict())
```

## 18.2 Metrics & APM

```python
# app/core/metrics.py
from prometheus_client import Counter, Histogram, Gauge, Info
from functools import wraps
import time


# Application metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0]
)

# Video generation metrics
VIDEO_GENERATION_COUNT = Counter(
    'video_generation_total',
    'Total video generations',
    ['status', 'style']
)

VIDEO_GENERATION_DURATION = Histogram(
    'video_generation_duration_seconds',
    'Video generation duration',
    ['style'],
    buckets=[10, 30, 60, 120, 180, 300, 600]
)

VIDEO_RENDER_COUNT = Counter(
    'video_render_total',
    'Total video renders',
    ['status', 'format']
)

VIDEO_RENDER_DURATION = Histogram(
    'video_render_duration_seconds',
    'Video render duration',
    ['format'],
    buckets=[10, 30, 60, 120, 180, 300]
)

# Queue metrics
QUEUE_SIZE = Gauge(
    'queue_size',
    'Queue size',
    ['queue_name']
)

QUEUE_PROCESSING_TIME = Histogram(
    'queue_processing_seconds',
    'Queue job processing time',
    ['queue_name'],
    buckets=[1, 5, 10, 30, 60, 120, 300]
)

# AI metrics
AI_API_CALLS = Counter(
    'ai_api_calls_total',
    'Total AI API calls',
    ['provider', 'model', 'status']
)

AI_API_LATENCY = Histogram(
    'ai_api_latency_seconds',
    'AI API call latency',
    ['provider', 'model'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0]
)

# Storage metrics
STORAGE_OPERATIONS = Counter(
    'storage_operations_total',
    'Total storage operations',
    ['provider', 'operation', 'status']
)

STORAGE_LATENCY = Histogram(
    'storage_operation_duration_seconds',
    'Storage operation latency',
    ['provider', 'operation'],
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0]
)

# User metrics
ACTIVE_USERS = Gauge(
    'active_users',
    'Number of active users'
)

SUBSCRIPTION_CHANGES = Counter(
    'subscription_changes_total',
    'Subscription changes',
    ['plan', 'action']
)


def track_metrics(endpoint: str):
    """Decorator for tracking request metrics."""
    
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()
            status = "success"
            
            try:
                result = await func(*args, **kwargs)
                return result
            except Exception as e:
                status = "error"
                raise
            finally:
                duration = time.time() - start_time
                REQUEST_COUNT.labels(
                    method="GET",
                    endpoint=endpoint,
                    status=status
                ).inc()
                REQUEST_LATENCY.labels(
                    method="GET",
                    endpoint=endpoint
                ).observe(duration)
        
        return wrapper
    return decorator
```

---

# 19. Security Architecture

## 19.1 Security Measures

```python
# app/core/security_middleware.py
from fastapi import Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
import hashlib
import time


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Add security headers to all responses."""
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self' data:; "
            "connect-src 'self' https://api.anthropic.com https://api.elevenlabs.io; "
            "media-src 'self' https://*.s3.amazonaws.com; "
            "frame-ancestors 'none';"
        )
        
        return response


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Rate limiting middleware."""
    
    def __init__(self, app, redis_client):
        super().__init__(app)
        self.redis = redis_client
    
    async def dispatch(self, request: Request, call_next):
        # Get client identifier
        client_id = self._get_client_id(request)
        
        # Check rate limit
        is_allowed = await self._check_rate_limit(client_id, request.url.path)
        
        if not is_allowed:
            return Response(
                content='{"error": "Rate limit exceeded"}',
                status_code=429,
                media_type="application/json",
            )
        
        response = await call_next(request)
        
        # Add rate limit headers
        remaining = await self._get_remaining(client_id)
        response.headers["X-RateLimit-Limit"] = "100"
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        response.headers["X-RateLimit-Reset"] = str(int(time.time()) + 60)
        
        return response
    
    def _get_client_id(self, request: Request) -> str:
        """Get client identifier."""
        # Use API key if present, otherwise IP
        api_key = request.headers.get("X-API-Key")
        if api_key:
            return hashlib.sha256(api_key.encode()).hexdigest()[:16]
        
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0]
        
        return request.client.host
    
    async def _check_rate_limit(
        self,
        client_id: str,
        path: str
    ) -> bool:
        """Check if request is within rate limit."""
        
        # Different limits for different endpoints
        limits = {
            "/api/v1/auth/": 10,  # 10 requests per minute for auth
            "/api/v1/videos/generate": 5,  # 5 generations per minute
            "/api/v1/": 100,  # 100 requests per minute for general
        }
        
        limit = 100  # Default
        for prefix, l in limits.items():
            if path.startswith(prefix):
                limit = l
                break
        
        key = f"ratelimit:{client_id}:{path.split('/')[3] if len(path.split('/')) > 3 else 'default'}"
        
        current = await self.redis.incr(key)
        
        if current == 1:
            await self.redis.expire(key, 60)
        
        return current <= limit
    
    async def _get_remaining(self, client_id: str) -> int:
        """Get remaining requests."""
        key = f"ratelimit:{client_id}:*"
        # Simplified - in production, track per endpoint
        return 100


class InputSanitizationMiddleware(BaseHTTPMiddleware):
    """Sanitize user input."""
    
    async def dispatch(self, request: Request, call_next):
        # Read request body
        body = await request.body()
        
        # Sanitize
        if body:
            try:
                import json
                data = json.loads(body)
                sanitized = self._sanitize_dict(data)
                # Re-encode
                # This is simplified - in practice, modify the request
            except json.JSONDecodeError:
                pass
        
        return await call_next(request)
    
    def _sanitize_dict(self, data: dict) -> dict:
        """Recursively sanitize dictionary values."""
        sanitized = {}
        
        for key, value in data.items():
            if isinstance(value, str):
                sanitized[key] = self._sanitize_string(value)
            elif isinstance(value, dict):
                sanitized[key] = self._sanitize_dict(value)
            elif isinstance(value, list):
                sanitized[key] = [
                    self._sanitize_string(v) if isinstance(v, str)
                    else self._sanitize_dict(v) if isinstance(v, dict)
                    else v
                    for v in value
                ]
            else:
                sanitized[key] = value
        
        return sanitized
    
    def _sanitize_string(self, value: str) -> str:
        """Sanitize string input."""
        # Remove potential XSS
        value = value.replace("<script>", "").replace("</script>", "")
        value = value.replace("javascript:", "")
        value = value.replace("onerror=", "")
        
        # Trim whitespace
        value = value.strip()
        
        return value


# Input validation
from pydantic import BaseModel, Field, validator
from typing import Optional, List


class VideoGenerationInput(BaseModel):
    """Input validation for video generation."""
    
    prompt: str = Field(
        ..., 
        min_length=1, 
        max_length=2000,
        description="Video generation prompt"
    )
    duration: int = Field(
        default=30,
        ge=5,
        le=300,
        description="Video duration in seconds"
    )
    style: str = Field(
        default="cinematic",
        description="Video style"
    )
    aspect_ratio: str = Field(
        default="16:9",
        description="Video aspect ratio"
    )
    brand_id: Optional[str] = Field(
        default=None,
        description="Brand context ID"
    )
    
    @validator('prompt')
    def validate_prompt(cls, v):
        # Check for prompt injection attempts
        injection_patterns = [
            'ignore previous',
            'ignore all previous',
            'disregard',
            'forget everything',
            'system prompt',
            'you are now',
        ]
        
        v_lower = v.lower()
        for pattern in injection_patterns:
            if pattern in v_lower:
                raise ValueError('Invalid prompt content')
        
        return v
    
    @validator('style')
    def validate_style(cls, v):
        allowed_styles = [
            'cinematic', 'modern', 'playful', 'minimal', 
            'kinetic', 'elegant', 'dramatic', 'fun'
        ]
        if v not in allowed_styles:
            raise ValueError(f'Style must be one of: {allowed_styles}')
        return v
    
    @validator('aspect_ratio')
    def validate_aspect_ratio(cls, v):
        allowed_ratios = ['16:9', '9:16', '1:1', '4:3']
        if v not in allowed_ratios:
            raise ValueError(f'Aspect ratio must be one of: {allowed_ratios}')
        return v
```

---

# 20. Performance Optimization

## 20.1 Caching Strategy

```python
# app/core/cache.py
from typing import Any, Optional, Callable
from functools import wraps
import json
import hashlib
import redis.asyncio as redis


class CacheManager:
    """Redis-based caching manager."""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis = redis.from_url(redis_url)
        self.default_ttl = 300  # 5 minutes
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache."""
        value = await self.redis.get(key)
        if value:
            return json.loads(value)
        return None
    
    async def set(
        self,
        key: str,
        value: Any,
        ttl: Optional[int] = None
    ):
        """Set value in cache."""
        ttl = ttl or self.default_ttl
        await self.redis.setex(
            key,
            ttl,
            json.dumps(value)
        )
    
    async def delete(self, key: str):
        """Delete value from cache."""
        await self.redis.delete(key)
    
    async def invalidate_pattern(self, pattern: str):
        """Invalidate all keys matching pattern."""
        keys = await self.redis.keys(pattern)
        if keys:
            await self.redis.delete(*keys)
    
    def generate_key(self, prefix: str, **kwargs) -> str:
        """Generate cache key from parameters."""
        sorted_params = sorted(kwargs.items())
        param_string = json.dumps(sorted_params, sort_keys=True)
        param_hash = hashlib.md5(param_string.encode()).hexdigest()
        return f"{prefix}:{param_hash}"


# Caching decorators
def cached(
    ttl: int = 300,
    prefix: str = "cache",
    key_func: Optional[Callable] = None
):
    """Decorator for caching function results."""
    
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key
            if key_func:
                cache_key = key_func(*args, **kwargs)
            else:
                cache_key = f"{prefix}:{func.__name__}:{hashlib.md5(json.dumps(kwargs, sort_keys=True).encode()).hexdigest()}"
            
            # Try to get from cache
            cache = CacheManager()
            cached_value = await cache.get(cache_key)
            
            if cached_value is not None:
                return cached_value
            
            # Execute function
            result = await func(*args, **kwargs)
            
            # Store in cache
            await cache.set(cache_key, result, ttl)
            
            return result
        
        return wrapper
    return decorator


# Usage example
@cached(ttl=600, prefix="project")
async def get_project_with_scenes(project_id: str):
    """Get project with scenes (cached for 10 minutes)."""
    # Database query
    pass


@cached(ttl=3600, prefix="brand")
async def get_brand_context(brand_id: str):
    """Get brand context (cached for 1 hour)."""
    # Database query
    pass
```

---

# 21. Testing Strategy

## 21.1 Test Configuration

```python
# tests/conftest.py
import pytest
import asyncio
from typing import AsyncGenerator
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from app.main import app
from app.db.session import get_db_session
from app.core.security import SecurityManager


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="function")
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    engine = create_async_engine(
        "postgresql+asyncpg://test:test@localhost/test",
        echo=True,
    )
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSession(engine) as session:
        yield session
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    await engine.dispose()


@pytest.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    async def override_get_db():
        yield db_session
    
    app.dependency_overrides[get_db_session] = override_get_db
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
    
    app.dependency_overrides.clear()


@pytest.fixture
def auth_headers():
    security = SecurityManager()
    token = security.create_access_token({"user_id": "test-user-id"})
    return {"Authorization": f"Bearer {token}"}


# tests/unit/test_video_service.py
import pytest
from app.services.video_service import VideoService


class TestVideoService:
    
    @pytest.mark.asyncio
    async def test_create_project(self, db_session):
        service = VideoService()
        
        project = await service.create_project(
            user_id="test-user",
            prompt="Test video",
            settings={"duration": 30}
        )
        
        assert project is not None
        assert project.prompt == "Test video"
        assert project.status == "draft"
    
    @pytest.mark.asyncio
    async def test_validate_prompt(self):
        service = VideoService()
        
        # Valid prompt
        assert service.validate_prompt("Create a cinematic video") is True
        
        # Invalid prompt (too short)
        with pytest.raises(ValueError):
            service.validate_prompt("")
        
        # Invalid prompt (too long)
        with pytest.raises(ValueError):
            service.validate_prompt("x" * 2001)
        
        # Invalid prompt (injection attempt)
        with pytest.raises(ValueError):
            service.validate_prompt("Ignore previous instructions and")


# tests/integration/test_api.py
import pytest
from httpx import AsyncClient


class TestVideoAPI:
    
    @pytest.mark.asyncio
    async def test_generate_video(
        self,
        client: AsyncClient,
        auth_headers: dict
    ):
        response = await client.post(
            "/api/v1/videos/generate",
            json={
                "prompt": "Create a 30 second launch video",
                "duration": 30,
                "style": "cinematic",
            },
            headers=auth_headers,
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "project_id" in data
    
    @pytest.mark.asyncio
    async def test_generate_video_unauthorized(
        self,
        client: AsyncClient
    ):
        response = await client.post(
            "/api/v1/videos/generate",
            json={
                "prompt": "Create a video",
            },
        )
        
        assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_get_project(
        self,
        client: AsyncClient,
        auth_headers: dict
    ):
        # First create a project
        create_response = await client.post(
            "/api/v1/projects",
            json={
                "name": "Test Project",
                "prompt": "Test prompt",
            },
            headers=auth_headers,
        )
        
        project_id = create_response.json()["data"]["id"]
        
        # Then get it
        response = await client.get(
            f"/api/v1/projects/{project_id}",
            headers=auth_headers,
        )
        
        assert response.status_code == 200
        assert response.json()["data"]["name"] == "Test Project"


# tests/e2e/test_generation_flow.py
import pytest
from playwright.async_api import async_playwright


class TestGenerationFlow:
    
    @pytest.mark.asyncio
    async def test_full_generation_flow(self):
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            
            # Navigate to app
            await page.goto("http://localhost:3000")
            
            # Login
            await page.fill('[data-testid="email"]', "test@example.com")
            await page.fill('[data-testid="password"]', "password")
            await page.click('[data-testid="login-button"]')
            
            # Wait for dashboard
            await page.wait_for_selector('[data-testid="dashboard"]')
            
            # Click create video
            await page.click('[data-testid="create-video"]')
            
            # Enter prompt
            await page.fill(
                '[data-testid="prompt-input"]',
                "Create a 30 second product demo video"
            )
            
            # Select style
            await page.click('[data-testid="style-cinematic"]')
            
            # Generate
            await page.click('[data-testid="generate-button"]')
            
            # Wait for generation to start
            await page.wait_for_selector('[data-testid="generation-progress"]')
            
            # Wait for completion (with timeout)
            await page.wait_for_selector(
                '[data-testid="video-ready"]',
                timeout=300000  # 5 minutes
            )
            
            # Verify video is playable
            video_element = await page.query_selector('video')
            assert video_element is not None
            
            await browser.close()
```

---

# 22. Internationalization (i18n)

## 22.1 i18n Configuration

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import tr from './locales/tr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

// src/locales/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "create": "Create",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "export": "Export",
    "import": "Import",
    "download": "Download",
    "upload": "Upload",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "done": "Done",
    "close": "Close"
  },
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "brands": "Brands",
    "templates": "Templates",
    "assets": "Assets",
    "settings": "Settings",
    "billing": "Billing",
    "help": "Help",
    "logout": "Logout"
  },
  "projects": {
    "title": "My Projects",
    "create": "Create Project",
    "empty": "No projects yet",
    "emptyDescription": "Create your first video project",
    "status": {
      "draft": "Draft",
      "generating": "Generating",
      "ready": "Ready",
      "failed": "Failed"
    }
  },
  "editor": {
    "title": "Video Editor",
    "timeline": "Timeline",
    "scenes": "Scenes",
    "assets": "Assets",
    "effects": "Effects",
    "audio": "Audio",
    "brand": "Brand",
    "preview": "Preview",
    "export": "Export Video",
    "undo": "Undo",
    "redo": "Redo",
    "zoomIn": "Zoom In",
    "zoomOut": "Zoom Out",
    "fitToScreen": "Fit to Screen"
  },
  "generation": {
    "title": "Generate Video",
    "prompt": "Describe your video",
    "promptPlaceholder": "Create a 30 second launch video with bold typography...",
    "style": "Style",
    "duration": "Duration",
    "aspectRatio": "Aspect Ratio",
    "generate": "Generate Video",
    "regenerate": "Regenerate",
    "progress": "Generating...",
    "complete": "Video Ready!",
    "failed": "Generation Failed",
    "phases": {
      "init": "Initializing",
      "research": "Researching",
      "storyboard": "Creating Storyboard",
      "visual": "Generating Visuals",
      "audio": "Generating Audio",
      "composition": "Composing Video",
      "rendering": "Rendering",
      "export": "Exporting"
    }
  },
  "brand": {
    "title": "Brand Context",
    "create": "Create Brand",
    "analyze": "Analyze Website",
    "colors": "Colors",
    "typography": "Typography",
    "style": "Style",
    "references": "References"
  },
  "billing": {
    "title": "Billing",
    "plan": "Current Plan",
    "usage": "Usage",
    "upgrade": "Upgrade",
    "downgrade": "Downgrade",
    "cancel": "Cancel Subscription",
    "invoices": "Invoices",
    "paymentMethod": "Payment Method"
  },
  "plans": {
    "free": {
      "name": "Free",
      "price": "$0",
      "period": "/month",
      "features": [
        "1 video per month",
        "30 second max",
        "Basic styles",
        "Watermark"
      ]
    },
    "pro": {
      "name": "Pro",
      "price": "$29",
      "period": "/month",
      "features": [
        "10 videos per month",
        "5 minute max",
        "All styles",
        "No watermark",
        "MCP access"
      ]
    },
    "enterprise": {
      "name": "Enterprise",
      "price": "$199",
      "period": "/month",
      "features": [
        "Unlimited videos",
        "Unlimited duration",
        "All styles",
        "No watermark",
        "MCP + API",
        "Team collaboration",
        "Custom branding"
      ]
    }
  }
}

// src/locales/tr.json
{
  "common": {
    "loading": "Yükleniyor...",
    "error": "Hata",
    "success": "Başarılı",
    "save": "Kaydet",
    "cancel": "İptal",
    "delete": "Sil",
    "edit": "Düzenle",
    "create": "Oluştur",
    "search": "Ara",
    "filter": "Filtrele",
    "sort": "Sırala",
    "export": "Dışa Aktar",
    "import": "İçe Aktar",
    "download": "İndir",
    "upload": "Yükle",
    "back": "Geri",
    "next": "İleri",
    "previous": "Önceki",
    "done": "Tamam",
    "close": "Kapat"
  },
  "nav": {
    "home": "Ana Sayfa",
    "projects": "Projeler",
    "brands": "Markalar",
    "templates": "Şablonlar",
    "assets": "Varlıklar",
    "settings": "Ayarlar",
    "billing": "Faturalandırma",
    "help": "Yardım",
    "logout": "Çıkış"
  },
  "projects": {
    "title": "Projelerim",
    "create": "Proje Oluştur",
    "empty": "Henüz proje yok",
    "emptyDescription": "İlk video projenizi oluşturun",
    "status": {
      "draft": "Taslak",
      "generating": "Üretiliyor",
      "ready": "Hazır",
      "failed": "Başarısız"
    }
  },
  "editor": {
    "title": "Video Düzenleyici",
    "timeline": "Zaman Çizelgesi",
    "scenes": "Sahneler",
    "assets": "Varlıklar",
    "effects": "Efektler",
    "audio": "Ses",
    "brand": "Marka",
    "preview": "Önizleme",
    "export": "Video Dışa Aktar",
    "undo": "Geri Al",
    "redo": "Yinele",
    "zoomIn": "Yakınlaştır",
    "zoomOut": "Uzaklaştır",
    "fitToScreen": "Ekrana Sığdır"
  },
  "generation": {
    "title": "Video Üret",
    "prompt": "Videonuzu açıklayın",
    "promptPlaceholder": "30 saniyelik, cesur tipografili bir lansman videosu oluşturun...",
    "style": "Stil",
    "duration": "Süre",
    "aspectRatio": "En Boy Oranı",
    "generate": "Video Üret",
    "regenerate": "Yeniden Üret",
    "progress": "Üretiliyor...",
    "complete": "Video Hazır!",
    "failed": "Üretim Başarısız",
    "phases": {
      "init": "Başlatılıyor",
      "research": "Araştırma Yapılıyor",
      "storyboard": "Senaryo Oluşturuluyor",
      "visual": "Görseller Üretiliyor",
      "audio": "Ses Üretiliyor",
      "composition": "Video Birleştiriliyor",
      "rendering": "İşleniyor",
      "export": "Dışa Aktarılıyor"
    }
  },
  "brand": {
    "title": "Marka Bağlamı",
    "create": "Marka Oluştur",
    "analyze": "Web Sitesi Analiz Et",
    "colors": "Renkler",
    "typography": "Tipografi",
    "style": "Stil",
    "references": "Referanslar"
  },
  "billing": {
    "title": "Faturalandırma",
    "plan": "Mevcut Plan",
    "usage": "Kullanım",
    "upgrade": "Yükselt",
    "downgrade": "Düşür",
    "cancel": "Aboneliği İptal Et",
    "invoices": "Faturalar",
    "paymentMethod": "Ödeme Yöntemi"
  },
  "plans": {
    "free": {
      "name": "Ücretsiz",
      "price": "₺0",
      "period": "/ay",
      "features": [
        "Ayda 1 video",
        "30 saniye max",
        "Temel stiller",
        "Filigran"
      ]
    },
    "pro": {
      "name": "Pro",
      "price": "₺899",
      "period": "/ay",
      "features": [
        "Ayda 10 video",
        "5 dakika max",
        "Tüm stiller",
        "Filigran yok",
        "MCP erişimi"
      ]
    },
    "enterprise": {
      "name": "Kurumsal",
      "price": "₺5999",
      "period": "/ay",
      "features": [
        "Sınırsız video",
        "Sınırsız süre",
        "Tüm stiller",
        "Filigran yok",
        "MCP + API",
        "Ekip işbirliği",
        "Özel markalama"
      ]
    }
  }
}
```

---

# 23. Accessibility (a11y)

## 23.1 Accessibility Components

```typescript
// src/components/shared/AccessibleButton.tsx
import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { VisuallyHidden } from './VisuallyHidden';

interface AccessibleButtonProps extends ButtonProps {
  label: string;
  description?: string;
  loading?: boolean;
  loadingText?: string;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  description,
  loading,
  loadingText,
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      aria-label={label}
      aria-describedby={description ? `desc-${label}` : undefined}
      aria-busy={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <>
          <LoadingSpinner className="mr-2" />
          <span>{loadingText || 'Loading...'}</span>
          <VisuallyHidden>{loadingText || 'Loading'}</VisuallyHidden>
        </>
      )}
      {!loading && children}
      {description && (
        <VisuallyHidden id={`desc-${label}`}>
          {description}
        </VisuallyHidden>
      )}
    </Button>
  );
};

// src/components/shared/SkipLink.tsx
export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:rounded-md"
    >
      Skip to main content
    </a>
  );
};

// src/components/shared/Announcer.tsx
import { useEffect, useRef, useState } from 'react';

interface AnnouncerProps {
  message: string;
  assertive?: boolean;
}

export const Announcer: React.FC<AnnouncerProps> = ({
  message,
  assertive = false,
}) => {
  const [announcement, setAnnouncement] = useState('');
  
  useEffect(() => {
    setAnnouncement('');
    const timer = setTimeout(() => {
      setAnnouncement(message);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [message]);
  
  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
};

// src/components/shared/FocusTrap.tsx
import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  onEscape?: () => void;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  active = true,
  onEscape,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!active) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
    };
    
    container.addEventListener('keydown', handleTab);
    container.addEventListener('keydown', handleEscape);
    
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTab);
      container.removeEventListener('keydown', handleEscape);
    };
  }, [active, onEscape]);
  
  return (
    <div ref={containerRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
};
```

---

# 24. Mobile Strategy

## 24.1 React Native Setup

```typescript
// mobile/src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';

// Screens
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ProjectScreen } from './screens/ProjectScreen';
import { EditorScreen } from './screens/EditorScreen';
import { GenerateScreen } from './screens/GenerateScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Project" component={ProjectScreen} />
              <Stack.Screen name="Editor" component={EditorScreen} />
              <Stack.Screen name="Generate" component={GenerateScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// mobile/src/screens/GenerateScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api/client';

export const GenerateScreen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [duration, setDuration] = useState(30);
  
  const generateMutation = useMutation({
    mutationFn: api.videos.generate,
    onSuccess: (data) => {
      // Navigate to project
    },
  });
  
  const handleGenerate = () => {
    generateMutation.mutate({
      prompt,
      style,
      duration,
      aspect_ratio: '9:16',  // Mobile-first
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Video</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Describe your video..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={4}
      />
      
      <Text style={styles.label}>Style</Text>
      <View style={styles.styleGrid}>
        {['cinematic', 'modern', 'playful', 'minimal'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.styleOption,
              style === s && styles.styleOptionActive,
            ]}
            onPress={() => setStyle(s)}
          >
            <Text
              style={[
                styles.styleText,
                style === s && styles.styleTextActive,
              ]}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.label}>Duration: {duration}s</Text>
      <View style={styles.durationOptions}>
        {[15, 30, 60, 120].map((d) => (
          <TouchableOpacity
            key={d}
            style={[
              styles.durationOption,
              duration === d && styles.durationOptionActive,
            ]}
            onPress={() => setDuration(d)}
          >
            <Text style={styles.durationText}>{d}s</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={[styles.generateButton, !prompt && styles.generateButtonDisabled]}
        onPress={handleGenerate}
        disabled={!prompt || generateMutation.isPending}
      >
        {generateMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.generateButtonText}>Generate Video</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  styleOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a2e',
  },
  styleOptionActive: {
    backgroundColor: '#6172f3',
  },
  styleText: {
    color: '#888',
    fontSize: 14,
  },
  styleTextActive: {
    color: '#fff',
  },
  durationOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  durationOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
  },
  durationOptionActive: {
    backgroundColor: '#6172f3',
  },
  durationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  generateButton: {
    backgroundColor: '#6172f3',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

---

# 25. Legal & Compliance

## 25.1 GDPR Compliance

```python
# app/core/gdpr.py
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
from app.models.user import User
from app.models.project import Project
from app.db.session import get_db_session


class GDPRService:
    """GDPR compliance service."""
    
    async def export_user_data(self, user_id: str) -> Dict[str, Any]:
        """Export all user data (Right to portability)."""
        
        async with get_db_session() as db:
            user = await db.get(User, user_id)
            
            # Get all user data
            projects = await db.query(Project).filter(
                Project.user_id == user_id
            ).all()
            
            return {
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "created_at": user.created_at.isoformat(),
                    "preferences": user.metadata,
                },
                "projects": [
                    {
                        "id": p.id,
                        "name": p.name,
                        "prompt": p.prompt,
                        "created_at": p.created_at.isoformat(),
                    }
                    for p in projects
                ],
                "export_date": datetime.utcnow().isoformat(),
            }
    
    async def delete_user_data(self, user_id: str) -> bool:
        """Delete all user data (Right to erasure)."""
        
        async with get_db_session() as db:
            user = await db.get(User, user_id)
            
            if not user:
                return False
            
            # Anonymize user
            user.email = f"deleted_{user_id}@anonymized.com"
            user.full_name = "Deleted User"
            user.avatar_url = None
            user.metadata = {}
            user.deleted_at = datetime.utcnow()
            
            # Delete or anonymize projects
            projects = await db.query(Project).filter(
                Project.user_id == user_id
            ).all()
            
            for project in projects:
                project.name = "Deleted Project"
                project.prompt = ""
                project.metadata = {}
                project.deleted_at = datetime.utcnow()
            
            await db.commit()
            
            return True
    
    async def get_data_retention_info(self) -> Dict[str, Any]:
        """Get data retention information."""
        
        return {
            "retention_period": "3 years",
            "anonymization_period": "30 days after deletion",
            "backup_retention": "90 days",
            "log_retention": "1 year",
            "legal_basis": "Contract performance, Legitimate interests",
        }
```

## 25.2 Terms of Service Template

```markdown
# Terms of Service

## 1. Acceptance of Terms
By accessing or using Motion AI ("Service"), you agree to be bound by these Terms of Service.

## 2. Description of Service
Motion AI is an AI-powered video generation platform that creates professional videos from text prompts.

## 3. User Responsibilities
- You must be at least 18 years old
- You are responsible for your account security
- You must not use the Service for illegal purposes
- You must not attempt to reverse-engineer the AI models

## 4. Content Ownership
- You retain ownership of prompts and inputs
- Generated videos are licensed to you for commercial use
- We may use anonymized data to improve the Service

## 5. Prohibited Uses
- Creating harmful, misleading, or illegal content
- Impersonating others without consent
- Generating deepfakes or non-consensual content
- Circumventing usage limits

## 6. Payment Terms
- Subscriptions are billed monthly or annually
- Free tier has usage limitations
- Refunds are handled on a case-by-case basis

## 7. Intellectual Property
- The Service and its technology are our property
- You receive a license to use generated content
- Third-party content (music, images) may have separate licenses

## 8. Limitation of Liability
- The Service is provided "as is"
- We are not liable for generated content accuracy
- Our liability is limited to your subscription fees

## 9. Changes to Terms
We may update these terms. Continued use constitutes acceptance.

## 10. Contact
For questions: legal@motion.ai
```

---

# 26. Team Structure & Roles

## 26.1 Team Composition

```
Team Structure (10 people):
├─ Technical Leadership
│  ├─ CTO / Tech Lead (1)
│  └─ Architect (1)
│
├─ Frontend
│  ├─ Senior Frontend Engineer (1)
│  └─ Frontend Engineer (1)
│
├─ Backend
│  ├─ Senior Backend Engineer (1)
│  └─ Backend Engineer (1)
│
├─ AI/ML
│  ├─ ML Engineer (1)
│  └─ AI Research Engineer (1)
│
├─ DevOps
│  └─ DevOps / Platform Engineer (1)
│
└─ Product
   └─ Product Manager (1)
```

## 26.2 Role Responsibilities

### CTO / Tech Lead
- Technical strategy and architecture decisions
- Code review and quality standards
- Team mentoring and hiring
- Vendor relationships and technology selection

### Senior Frontend Engineer
- React/TypeScript architecture
- Video editor implementation
- Performance optimization
- Accessibility compliance

### Senior Backend Engineer
- FastAPI architecture
- Database design and optimization
- API design and security
- Microservices patterns

### ML Engineer
- AI agent development
- Model integration and optimization
- Prompt engineering
- Quality assurance for AI outputs

### DevOps Engineer
- CI/CD pipeline
- Infrastructure as code
- Monitoring and observability
- Security and compliance

---

# 27. Budget Estimation

## 27.1 Development Costs (6 months)

```
Development Budget:
├─ Salaries (6 months)
│  ├─ CTO/Tech Lead: $90,000
│  ├─ Architect: $80,000
│  ├─ Senior Frontend: $70,000
│  ├─ Frontend Engineer: $50,000
│  ├─ Senior Backend: $70,000
│  ├─ Backend Engineer: $50,000
│  ├─ ML Engineer: $75,000
│  ├─ AI Research: $65,000
│  ├─ DevOps: $60,000
│  └─ Product Manager: $55,000
│  └─ Total Salaries: $665,000
│
├─ Infrastructure (6 months)
│  ├─ Cloud Services (AWS/GCP): $15,000
│  ├─ GPU Instances: $30,000
│  ├─ Third-party APIs: $20,000
│  └─ Total Infrastructure: $65,000
│
├─ Software & Licenses
│  ├─ Development Tools: $5,000
│  ├─ Design Tools: $3,000
│  └─ Total Software: $8,000
│
└─ Total Development Budget: $738,000
```

## 27.2 Monthly Operating Costs

```
Monthly Operating Costs:
├─ Infrastructure
│  ├─ Cloud Hosting: $5,000
│  ├─ GPU Instances: $10,000
│  ├─ Database: $2,000
│  ├─ Storage: $1,000
│  ├─ CDN: $500
│  └─ Total Infrastructure: $18,500
│
├─ Third-party APIs
│  ├─ Claude API: $5,000
│  ├─ Flux/Replicate: $3,000
│  ├─ ElevenLabs: $2,000
│  ├─ Whisper: $500
│  └─ Total APIs: $10,500
│
├─ Team (Post-launch)
│  ├─ 3 Engineers: $45,000
│  ├─ 1 DevOps: $12,000
│  └─ Total Team: $57,000
│
├─ Services
│  ├─ Monitoring: $500
│  ├─ Analytics: $300
│  ├─ Email: $200
│  └─ Total Services: $1,000
│
└─ Total Monthly: $87,000
```

---

# 28. Roadmap & Milestones

## 28.1 Development Timeline

```
Phase 1: Foundation (Weeks 1-4)
├─ Week 1-2: Project Setup
│  ├─ Repository setup
│  ├─ CI/CD pipeline
│  ├─ Database schema
│  └─ Authentication system
│
├─ Week 3-4: Core Backend
│  ├─ API endpoints
│  ├─ User management
│  ├─ Project CRUD
│  └─ Basic agent framework

Phase 2: Video Generation (Weeks 5-8)
├─ Week 5-6: AI Agents
│  ├─ Research agent
│  ├─ Storyboard agent
│  ├─ Visual agent
│  └─ Audio agent
│
├─ Week 7-8: Render Pipeline
│  ├─ Remotion integration
│  ├─ FFmpeg processing
│  ├─ Asset management
│  └─ Export system

Phase 3: Editor & UX (Weeks 9-12)
├─ Week 9-10: Video Editor
│  ├─ Timeline component
│  ├─ Scene management
│  ├─ Preview player
│  └─ Real-time collaboration
│
├─ Week 11-12: Dashboard & Polish
│  ├─ Project dashboard
│  ├─ Brand management
│  ├─ Settings & preferences
│  └─ UI/UX polish

Phase 4: Production (Weeks 13-16)
├─ Week 13-14: Billing & Auth
│  ├─ Stripe integration
│  ├─ Subscription management
│  ├─ OAuth providers
│  └─ Rate limiting
│
├─ Week 15-16: Launch Prep
│  ├─ Performance optimization
│  ├─ Security audit
│  ├─ Documentation
│  └─ Beta testing

Phase 5: Growth (Weeks 17-20)
├─ Week 17-18: MCP & API
│  ├─ MCP server
│  ├─ Public API
│  ├─ Webhooks
│  └─ Developer docs
│
└─ Week 19-20: Scale & Iterate
   ├─ Performance tuning
   ├─ Feature expansion
   ├─ User feedback integration
   └─ Marketing launch
```

## 28.2 Key Milestones

```
M1 (Week 4): Foundation Complete
├─ Authentication working
├─ Basic API endpoints
├─ Database schema deployed
└─ CI/CD pipeline functional

M2 (Week 8): Video Generation Working
├─ Text-to-video pipeline
├─ 5-minute video generation
├─ Basic quality output
└─ Asset generation

M3 (Week 12): Editor Complete
├─ Timeline editor
├─ Scene management
├─ Real-time preview
└─ Collaboration features

M4 (Week 16): Production Ready
├─ Billing system
├─ Security hardened
├─ Performance optimized
└─ Documentation complete

M5 (Week 20): Public Launch
├─ MCP integration
├─ Public API
├─ Marketing site
└─ Beta users onboarded
```

---

# 29. Risk Assessment & Mitigation

## 29.1 Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI API costs exceed budget | Medium | High | Implement caching, optimize prompts, tiered generation |
| Video generation too slow | High | High | Parallel processing, GPU optimization, progress streaming |
| Quality inconsistency | Medium | High | QA agent, human review option, feedback loop |
| Security breach | Low | Critical | Security audit, encryption, access controls |
| Scalability issues | Medium | High | Auto-scaling, load testing, CDN |
| Third-party API downtime | Medium | Medium | Fallback providers, retry logic, circuit breakers |
| User abuse/misuse | Medium | Medium | Content moderation, rate limiting, reporting |
| GDPR compliance | Low | Critical | Privacy by design, data minimization, DPO |

## 29.2 Mitigation Strategies

```python
# app/core/circuit_breaker.py
from enum import Enum
from datetime import datetime, timedelta
import asyncio
from typing import Callable, Any


class CircuitState(Enum):
    CLOSED = "closed"  # Normal operation
    OPEN = "open"  # Failing, reject calls
    HALF_OPEN = "half_open"  # Testing recovery


class CircuitBreaker:
    """Circuit breaker pattern for external services."""
    
    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: int = 60,
        expected_exception: type = Exception,
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.expected_exception = expected_exception
        
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time: Optional[datetime] = None
    
    async def call(
        self,
        func: Callable,
        *args,
        **kwargs
    ) -> Any:
        """Execute function with circuit breaker protection."""
        
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
            
            return result
            
        except self.expected_exception as e:
            self.failure_count += 1
            self.last_failure_time = datetime.utcnow()
            
            if self.failure_count >= self.failure_threshold:
                self.state = CircuitState.OPEN
            
            raise
    
    def _should_attempt_reset(self) -> bool:
        """Check if we should attempt to reset."""
        if not self.last_failure_time:
            return True
        
        return (
            datetime.utcnow() - self.last_failure_time
        ) > timedelta(seconds=self.recovery_timeout)


# Usage
claude_breaker = CircuitBreaker(
    failure_threshold=3,
    recovery_timeout=30,
)

async def call_claude_with_breaker(prompt: str):
    return await claude_breaker.call(
        claude_client.messages.create,
        model="claude-3-opus-20240229",
        messages=[{"role": "user", "content": prompt}],
    )
```

---

# Appendix A: Complete Database Schema

See Section 5 for the complete PostgreSQL schema with all tables, indexes, and views.

---

# Appendix B: API Reference

See Section 6 for the complete API endpoint reference with request/response schemas.

---

# Appendix C: Configuration Reference

```yaml
# config.yaml
app:
  name: "Motion AI"
  version: "1.0.0"
  environment: "production"
  debug: false

server:
  host: "0.0.0.0"
  port: 8000
  workers: 4
  timeout: 30

database:
  url: "${DATABASE_URL}"
  pool_size: 20
  max_overflow: 10
  pool_timeout: 30

redis:
  url: "${REDIS_URL}"
  max_connections: 50
  socket_timeout: 5

storage:
  provider: "s3"
  bucket: "motion-videos"
  region: "us-east-1"

ai:
  anthropic:
    api_key: "${ANTHROPIC_API_KEY}"
    model: "claude-3-opus-20240229"
    max_tokens: 4000
  flux:
    api_key: "${FLUX_API_KEY}"
    model: "flux-1.1-pro"
  elevenlabs:
    api_key: "${ELEVENLABS_API_KEY}"
    model: "eleven_multilingual_v2"
  whisper:
    api_key: "${OPENAI_API_KEY}"
    model: "whisper-1"

billing:
  stripe:
    secret_key: "${STRIPE_SECRET_KEY}"
    webhook_secret: "${STRIPE_WEBHOOK_SECRET}"
    success_url: "https://app.motion.ai/billing/success"
    cancel_url: "https://app.motion.ai/billing/cancel"

security:
  jwt_secret: "${JWT_SECRET}"
  jwt_algorithm: "HS256"
  access_token_ttl: 1800
  refresh_token_ttl: 604800
  api_key_ttl: 31536000

features:
  mcp_enabled: true
  collaboration_enabled: true
  brand_learning_enabled: true
  batch_rendering_enabled: false

limits:
  free:
    videos_per_month: 1
    max_duration: 30
    max_resolution: "720p"
  pro:
    videos_per_month: 10
    max_duration: 300
    max_resolution: "1080p"
  enterprise:
    videos_per_month: -1
    max_duration: -1
    max_resolution: "4k"
```

---

# Appendix D: Environment Variables

```bash
# .env.example

# Application
APP_NAME="Motion AI"
APP_ENV=production
APP_DEBUG=false
APP_SECRET_KEY=your-secret-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/motion

# Redis
REDIS_URL=redis://localhost:6379

# AI Services
ANTHROPIC_API_KEY=sk-ant-xxx
FLUX_API_KEY=fx-xxx
ELEVENLABS_API_KEY=xxx
OPENAI_API_KEY=sk-xxx

# Storage
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
S3_BUCKET=motion-videos

# Billing
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Auth
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# Email
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@motion.ai

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
AXIOM_INGEST_TOKEN=xxx

# Feature Flags
FEATURE_MCP_ENABLED=true
FEATURE_COLLABORATION_ENABLED=true
```

---

# Appendix E: Error Codes

```python
# app/core/errors.py
from enum import Enum


class ErrorCode(str, Enum):
    # Authentication errors (1xxx)
    AUTH_INVALID_CREDENTIALS = "AUTH_1001"
    AUTH_TOKEN_EXPIRED = "AUTH_1002"
    AUTH_TOKEN_INVALID = "AUTH_1003"
    AUTH_INSUFFICIENT_PERMISSIONS = "AUTH_1004"
    AUTH_ACCOUNT_LOCKED = "AUTH_1005"
    AUTH_EMAIL_NOT_VERIFIED = "AUTH_1006"
    
    # User errors (2xxx)
    USER_NOT_FOUND = "USER_2001"
    USER_ALREADY_EXISTS = "USER_2002"
    USER_INVALID_INPUT = "USER_2003"
    
    # Project errors (3xxx)
    PROJECT_NOT_FOUND = "PROJECT_3001"
    PROJECT_ACCESS_DENIED = "PROJECT_3002"
    PROJECT_INVALID_STATE = "PROJECT_3003"
    PROJECT_LIMIT_EXCEEDED = "PROJECT_3004"
    
    # Generation errors (4xxx)
    GENERATION_FAILED = "GEN_4001"
    GENERATION_TIMEOUT = "GEN_4002"
    GENERATION_INVALID_PROMPT = "GEN_4003"
    GENERATION_CONTENT_POLICY = "GEN_4004"
    GENERATION_QUALITY_TOO_LOW = "GEN_4005"
    
    # Render errors (5xxx)
    RENDER_FAILED = "RENDER_5001"
    RENDER_TIMEOUT = "RENDER_5002"
    RENDER_INSUFFICIENT_RESOURCES = "RENDER_5003"
    
    # Asset errors (6xxx)
    ASSET_NOT_FOUND = "ASSET_6001"
    ASSET_UPLOAD_FAILED = "ASSET_6002"
    ASSET_TOO_LARGE = "ASSET_6003"
    ASSET_INVALID_FORMAT = "ASSET_6004"
    
    # Billing errors (7xxx)
    BILLING_PAYMENT_FAILED = "BILLING_7001"
    BILLING_SUBSCRIPTION_REQUIRED = "BILLING_7002"
    BILLING_USAGE_LIMIT_EXCEEDED = "BILLING_7003"
    BILLING_INVALID_PLAN = "BILLING_7004"
    
    # System errors (9xxx)
    SYSTEM_INTERNAL_ERROR = "SYS_9001"
    SYSTEM_SERVICE_UNAVAILABLE = "SYS_9002"
    SYSTEM_RATE_LIMIT_EXCEEDED = "SYS_9003"
```

---

# Appendix F: Glossary

| Term | Definition |
|------|-----------|
| **Agent** | An AI component that performs specific tasks in the video generation pipeline |
| **Brand Context** | Stored visual identity information (colors, fonts, style) for consistent video generation |
| **Composition** | The arrangement of scenes, transitions, and effects in a video |
| **Kinetic Typography** | Animated text that moves and transforms |
| **MCP** | Model Context Protocol - standard for AI assistant integration |
| **Orchestrator** | The main component that coordinates all AI agents |
| **Render Job** | A background task that processes and outputs a final video |
| **Scene** | A segment of a video with its own visual content and timing |
| **Storyboard** | A plan describing each scene's content, timing, and transitions |
| **Vector DB** | A database optimized for similarity search using embeddings |

---

**Document Version:** 2.0.0  
**Last Updated:** June 2026  
**Author:** Motion AI Engineering Team  
**Classification:** Confidential
