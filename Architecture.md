
# NovaQR Studio - Architecture & Flow Documentation

## 1. Technology Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4
*   **Runtime/Package Manager**: Bun
*   **QR Generation**: `qr-code-styling` (Client-side library)
*   **Icons**: Heroicons
*   **UI Components**: Radix UI Primitives (Switch, Slider, Accordion, Label)

## 2. Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── actions.ts          # Server Actions (e.g., Proxy for fetching images)
│   ├── layout.tsx          # Root layout (Fonts, Metadata)
│   ├── page.tsx            # Landing Page (Home)
│   └── create/             # Creation Flow
│       ├── layout.tsx      # Layout for creation steps (Sticky Preview + Nav)
│       ├── content/        # Step 1: URL Input
│       ├── branding/       # Step 2: Logo Upload
│       └── design/         # Step 3: Customization
├── components/
│   ├── steps/              # Logic & UI for specific steps
│   │   ├── StepContent.tsx
│   │   ├── StepBranding.tsx
│   │   └── StepDesign.tsx
│   ├── ui/                 # Reusable UI components (ColorPicker, Switch, etc.)
│   ├── LandingPage.tsx     # Landing page UI
│   └── PreviewCard.tsx     # The actual QR code renderer
├── hooks/
│   └── useQRSettings.ts    # Core State Management Hook
├── lib/
│   └── defaults.ts         # Default QR configuration
├── types.ts                # TypeScript interfaces for QR Settings
└── config.ts               # Feature Flags
```

## 3. Core Data Flow & State Management

The application uses **URL-based State Management** instead of global state stores (like Redux or Context). This ensures that the configuration is always shareable and persistent across reloads.

### The `useQRSettings` Hook
Located in `hooks/useQRSettings.ts`.

1.  **Read State**: It reads the `config` query parameter from the URL.
    *   The `config` param is a Base64 encoded JSON string of the `QRSettings` object.
    *   If no config is present, it falls back to `DEFAULT_SETTINGS`.
2.  **Write State**: When `updateSettings` is called:
    *   It merges the new updates with the current settings.
    *   It serializes the new object to JSON -> Base64.
    *   It updates the URL using `router.replace` (without reloading the page).

### Flow Lifecycle

1.  **Landing Page (`/`)**:
    *   User clicks "Create Now".
    *   Navigates to `/create/content`.

2.  **Creation Layout (`/create/layout.tsx`)**:
    *   Wraps all sub-pages (`content`, `branding`, `design`).
    *   **Left Side**: Renders the current page (`{children}`).
    *   **Right Side**: Renders `<PreviewCard />`.
    *   **Top**: Progress bar and Navigation Header.
    *   **Bottom**: Navigation buttons (Back/Continue).
    *   It reads the current URL path to determine the active step index for the progress bar.

3.  **Step 1: Content (`/create/content`)**:
    *   Renders `StepContent`.
    *   User types URL.
    *   `updateSettings({ url: ... })` is called.
    *   URL updates -> `PreviewCard` re-renders immediately with the new data.

4.  **Step 2: Branding (`/create/branding`)**:
    *   Renders `StepBranding`.
    *   **Manual Upload**: Reads file as Data URL -> updates `logoUrl` setting.
    *   **Smart Fetch**:
        *   User clicks "Smart Fetch".
        *   Calls `fetchBrandLogo`.
        *   Invokes Server Action `fetchLogo` (in `app/actions.ts`) to fetch the image server-side (bypassing CORS).
        *   Converts image to Base64 Data URL.
        *   Updates `logoUrl` setting.

5.  **Step 3: Design (`/create/design`)**:
    *   Renders `StepDesign`.
    *   User adjusts colors, shapes, frames.
    *   All changes update the URL params instantly.

6.  **Preview & Export**:
    *   `PreviewCard.tsx` listens to `settings` changes.
    *   It uses `useEffect` to initialize or update the `QRCodeStyling` instance.
    *   The QR code is rendered into a `div`.
    *   **Download**: When on the final step, the download buttons appear. They trigger the `download()` method of the `qr-code-styling` library.

## 4. Key Technical Decisions

*   **Server Actions for CORS**: Browsers block fetching images from different domains (CORS) when trying to draw them on a canvas (tainted canvas). We use a Next.js Server Action (`fetchLogo`) to act as a proxy, fetching the image on the server and returning a base64 string to the client.
*   **URL State**: Eliminates the need for complex state management libraries and enables "Copy URL to Share" functionality out of the box.
*   **Component Composition**: The `ControlPanel` was decomposed into smaller `Step*` components to improve maintainability and separation of concerns.
*   **Tailwind v4**: Uses the latest CSS-in-JS approach for performant styling.

## 5. Directory Breakdown

*   **`app/create/layout.tsx`**: The "Brain" of the creation flow. It handles the layout, the sticky preview, and the navigation logic (Next/Prev buttons).
*   **`components/PreviewCard.tsx`**: The "View". It is a pure component that takes `settings` as a prop and renders the QR code. It handles the complexity of the `qr-code-styling` library.
*   **`services/geminiService.ts`**: (Experimental) Setup for using Google Gemini AI to suggest branding colors based on the URL.

## 6. Future Improvements

*   **AI Integration**: Fully connect the `geminiService` to the Branding step to auto-suggest colors.
*   **User Accounts**: Save configurations to a database instead of just the URL.
*   **Analytics**: Track scan rates for generated QR codes.
