// src/components/icon.ts - Lightweight responsive icon component
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type IconName = 
  | "menu" | "close" | "sun" | "moon" | "wallet" | "nft" | "blockchain" | "storage"
  | "smart-contract" | "payment" | "email" | "chart" | "clock" | "rocket" | "link"
  | "paint" | "lock" | "card" | "diamond" | "sparkle" | "upload" | "check" | "arrow-right";

@customElement("app-icon")
export class AppIcon extends LitElement {
  @property({ type: String }) name: IconName = "check";
  @property({ type: String }) size: string = "1em";
  @property({ type: String }) color: string = "currentColor";

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
      color: var(--icon-color, currentColor);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
      stroke: currentColor;
      display: block;
    }
  `;

  private getIconPath(name: IconName): { path: string; fill?: boolean } {
    const icons: Record<IconName, { path: string; fill?: boolean }> = {
      menu: { path: "M3 12h18M3 6h18M3 18h18" },
      close: { path: "M6 6l12 12M18 6L6 18" },
      sun: { path: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8z" },
      moon: { path: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", fill: true },
      wallet: { path: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
      nft: { path: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", fill: true },
      blockchain: { path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
      storage: { path: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
      "smart-contract": { path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
      payment: { path: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
      email: { path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
      chart: { path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
      clock: { path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      rocket: { path: "M13 10V3L4 14h7v7l9-11h-7z" },
      link: { path: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
      paint: { path: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
      lock: { path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
      card: { path: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
      diamond: { path: "M6 2L3 6l9 12 9-12-3-4M6 2h12M6 2l3 4m9-4l-3 4m-6 0l3 4m0 0l3-4", fill: true },
      sparkle: { path: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
      upload: { path: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" },
      check: { path: "M5 13l4 4L19 7" },
      "arrow-right": { path: "M14 5l7 7m0 0l-7 7m7-7H3" }
    };
    return icons[name] || icons.check;
  }

  render() {
    const icon = this.getIconPath(this.name);
    
    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="width: ${this.size}; height: ${this.size}; color: ${this.color};"
      >
        ${icon.fill 
          ? html`<path fill="currentColor" d="${icon.path}" />`
          : html`<path stroke="currentColor" d="${icon.path}" />`}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-icon": AppIcon;
  }
}

