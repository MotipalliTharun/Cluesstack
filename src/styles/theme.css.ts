import { css } from "lit";

export const theme = css`
  :host,
  :root {
    /* 🌈 Brand Palette */
    --bg: #fafbfd;               /* overall background */
    --panel: #ffffff;            /* main panel background */
    --panel-2: #f8fafc;          /* secondary card tone */
    --text: #1e293b;             /* primary text */
    --muted: #6b7280;            /* secondary text */
    --primary: #00bcd4;          /* aqua accent */
    --accent: #00acc1;           /* slightly darker accent */
    --danger: #ef4444;           /* bright red for alerts */

    /* 🧩 Layout & Depth */
    --radius: 16px;
    --shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.1);
    --shadow-glow: 0 0 30px rgba(0, 188, 212, 0.3);
    --border: 1px solid #e5e7eb;
    --border-glow: 1px solid rgba(0, 188, 212, 0.3);

    /* ✨ Glassmorphism */
    --glass-bg: rgba(255, 255, 255, 0.8);
    --glass-border: rgba(255, 255, 255, 0.2);
    --backdrop-blur: blur(20px);

    /* 🎨 Gradients */
    --gradient-primary: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
    --gradient-glass: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    --gradient-bg: linear-gradient(180deg, #f3faff 0%, #ffffff 100%);

    /* ⚡ Transitions */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    background: linear-gradient(180deg, #f3faff 0%, #ffffff 100%);
    color: var(--text);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    letter-spacing: -0.01em;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: "Poppins", "Inter", sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .card {
    background: var(--glass-bg);
    backdrop-filter: var(--backdrop-blur);
    -webkit-backdrop-filter: var(--backdrop-blur);
    border: var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    transition: all var(--transition-base);
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(0, 188, 212, 0.3);
  }

  .glow {
    box-shadow: var(--shadow-glow),
                inset 0 0 0 1px rgba(0, 188, 212, 0.15);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(0, 188, 212, 0.3),
                  inset 0 0 0 1px rgba(0, 188, 212, 0.15);
    }
    50% {
      box-shadow: 0 0 30px rgba(0, 188, 212, 0.5),
                  inset 0 0 0 1px rgba(0, 188, 212, 0.25);
    }
  }

  .row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Buttons, links, etc. */
  a,
  button {
    color: var(--primary);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  a:hover,
  button:hover {
    color: var(--accent);
  }

  /* Dark Mode Support */
  [data-theme="dark"] {
    --bg: #0f172a;
    --panel: #1e293b;
    --panel-2: #334155;
    --text: #f1f5f9;
    --muted: #94a3b8;
    --primary: #00bcd4;
    --accent: #00acc1;
    --danger: #ef4444;
    --border: 1px solid rgba(255, 255, 255, 0.1);
    --glass-bg: rgba(30, 41, 59, 0.8);
    --glass-border: rgba(255, 255, 255, 0.1);
    --gradient-bg: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  }

  [data-theme="dark"] html,
  [data-theme="dark"] body {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    color: var(--text);
  }

  [data-theme="dark"] .card {
    background: var(--glass-bg);
    border-color: rgba(0, 188, 212, 0.2);
  }

  [data-theme="dark"] .card:hover {
    border-color: rgba(0, 188, 212, 0.4);
  }
`;
