// src/components/dark-mode-toggle.ts
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../components/icon";

@customElement("dark-mode-toggle")
export class DarkModeToggle extends LitElement {
  @state() private darkMode = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    .toggle {
      appearance: none;
      border: 1px solid rgba(0, 188, 212, 0.3);
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      min-width: 44px; /* Touch target */
      min-height: 44px;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    
    @media (max-width: 480px) {
      .toggle {
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        font-size: 1.1rem;
        padding: 0.4rem 0.6rem;
      }
    }

    .toggle:hover {
      background: rgba(0, 188, 212, 0.1);
      border-color: rgba(0, 188, 212, 0.5);
      transform: scale(1.05);
    }

    .toggle:active {
      transform: scale(0.95);
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.darkMode = localStorage.getItem("darkMode") === "true";
    this.applyTheme();
  }

  private toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem("darkMode", String(this.darkMode));
    this.applyTheme();
  }

  private applyTheme() {
    if (this.darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  render() {
    return html`
      <button class="toggle" @click=${this.toggleDarkMode} aria-label="Toggle dark mode">
        <app-icon name=${this.darkMode ? "sun" : "moon"} size="1.25rem"></app-icon>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dark-mode-toggle": DarkModeToggle;
  }
}

