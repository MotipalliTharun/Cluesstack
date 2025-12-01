// src/components/top-nav.ts
import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { authStore } from "../lib/authStore";
import "../components/web3-wallet";
import "../components/dark-mode-toggle";
import "../components/icon";
import "../components/logo";

/** Allow programmatic routes we navigate to */
type Route = "home" | "about" | "services" | "community" | "account" | "profile" | "web3" | "nfts";

@customElement("top-nav")
export class TopNav extends LitElement {
  /** Current route (provided by parent) */
  @property({ type: String }) view: Route = "home";

  /** Auth state (provided by parent) */
  @property({ type: Boolean }) authed = false;
  @property({ type: String }) email: string | null = null;

  /** Mobile drawer */
  @state() private open = false;

  static styles = css`
    :host { display:block; }
    
    header { 
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 188, 212, 0.1);
      position: sticky;
      top: 0;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    
    .bar { 
      max-width: 1280px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 2rem;
      align-items: center;
    }
    
    .brand { 
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: opacity 0.2s ease;
      min-width: fit-content;
    }
    
    .brand:hover {
      opacity: 0.85;
    }
    
    @media (max-width: 640px) {
      .brand {
        min-width: auto;
      }
    }

    nav[role="tablist"] { 
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
    }
    
    .link { 
      appearance: none;
      border: 0;
      background: transparent;
      cursor: pointer;
      padding: 0.65rem 1.2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      color: #64748b;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .link:hover { 
      background: rgba(0, 188, 212, 0.08);
      color: #0f172a;
    }
    
    .link[aria-selected="true"] { 
      background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 172, 193, 0.1) 100%);
      color: #00bcd4;
      font-weight: 700;
    }
    
    .link[aria-selected="true"]::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      border-radius: 999px;
    }

    .right { 
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    
    .btn { 
      appearance: none;
      border: 0;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      color: #fff;
      padding: 0.65rem 1.4rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 188, 212, 0.25);
    }
    
    .btn:hover { 
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 188, 212, 0.35);
    }
    
    .btn:active { 
      transform: translateY(0);
    }
    
    .ghost { 
      appearance: none;
      border: 1px solid rgba(0, 188, 212, 0.2);
      background: rgba(255, 255, 255, 0.8);
      color: #00bcd4;
      padding: 0.65rem 1.2rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .ghost:hover {
      background: rgba(0, 188, 212, 0.1);
      border-color: rgba(0, 188, 212, 0.3);
    }

    .avatar { 
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: linear-gradient(135deg, #e8fbff 0%, #d9f3f8 100%);
      border: 2px solid rgba(0, 188, 212, 0.2);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #00bcd4;
      font-size: 0.9rem;
      font-weight: 900;
    }

    .hamb { 
      display: none;
      appearance: none;
      border: 1px solid rgba(0, 188, 212, 0.2);
      background: rgba(255, 255, 255, 0.9);
      color: #0f172a;
      border-radius: 12px;
      padding: 0.6rem 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .hamb:hover { 
      background: rgba(0, 188, 212, 0.1);
      border-color: rgba(0, 188, 212, 0.3);
    }

    .sheet { 
      display: none;
    }
    
    .sheet.open { 
      display: block;
    }
    
    .sheet-bg { 
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9998;
      animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .sheet-panel { 
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(85vw, 400px);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border-left: 1px solid rgba(0, 188, 212, 0.15);
      box-shadow: -4px 0 32px rgba(0, 0, 0, 0.15);
      padding: 2rem;
      display: grid;
      align-content: start;
      gap: 1.5rem;
      z-index: 9999;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from { 
        transform: translateX(100%);
        opacity: 0;
      }
      to { 
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .sheet-nav { 
      display: grid;
      gap: 0.5rem;
    }
    
    .sheet-link { 
      appearance: none;
      border: 0;
      text-align: left;
      background: transparent;
      cursor: pointer;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      color: #64748b;
      transition: all 0.2s ease;
      min-height: 48px;
      display: flex;
      align-items: center;
      width: 100%;
      -webkit-tap-highlight-color: transparent;
    }
    
    .sheet-link:hover { 
      background: rgba(0, 188, 212, 0.08);
      color: #0f172a;
    }
    
    .sheet-link[aria-selected="true"] { 
      background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 172, 193, 0.1) 100%);
      color: #00bcd4;
      font-weight: 700;
    }

    @media (max-width: 1024px) { 
      .bar {
        padding: 1rem 1.5rem;
        gap: 1.5rem;
      }
      
      nav[role="tablist"] { 
        display: none;
      }
      
      .hamb { 
        display: inline-flex;
      }
    }
    
    @media (max-width: 768px) {
      .bar {
        padding: 0.875rem 1.25rem;
        gap: 1rem;
      }
      
      .right {
        gap: 0.5rem;
      }
      
      .btn, .ghost {
        padding: 0.6rem 1rem;
        font-size: 0.875rem;
        min-height: 44px; /* Touch target */
      }
      
      .avatar {
        width: 28px;
        height: 28px;
        font-size: 0.8rem;
      }
    }
    
    @media (max-width: 640px) {
      .bar {
        padding: 0.75rem 1rem;
        gap: 0.75rem;
      }
      
      .right {
        gap: 0.4rem;
      }
      
      .btn, .ghost {
        padding: 0.55rem 0.875rem;
        font-size: 0.8rem;
        min-height: 44px;
      }
      
      .hamb {
        padding: 0.5rem 0.7rem;
        min-width: 44px;
        min-height: 44px;
      }
      
      .sheet-panel {
        width: 85vw;
        padding: 1.5rem;
      }
      
      .sheet-link {
        padding: 0.9rem 1rem;
        font-size: 0.95rem;
      }
    }
    
    @media (max-width: 480px) {
      .bar {
        padding: 0.625rem 0.875rem;
      }
      
      .btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
      }
      
      .ghost {
        display: none; /* Hide ghost buttons on very small screens */
      }
      
      .sheet-panel {
        width: 90vw;
        padding: 1.25rem;
        gap: 1.25rem;
      }
      
      .sheet-link {
        padding: 0.875rem 1rem;
        font-size: 0.9rem;
        min-height: 44px;
      }
      
      .hamb {
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `;

  private go(view: Route, sub?: "login" | "signup") {
    this.open = false;
    this.dispatchEvent(new CustomEvent("navigate", {
      detail: { view, sub },
      bubbles: true,
      composed: true
    }));
  }

  private async signout() {
    // Optimistic UI
    this.authed = false;
    this.email = null;
    this.requestUpdate();

    // Notify parent immediately + route home
    this.dispatchEvent(new CustomEvent("signed-out", { bubbles: true, composed: true }));
    this.go("home");

    try { await authStore.logout(); } catch (e) { console.error("Logout failed:", e); }
  }

  private login()  { this.go("account", "login"); }
  private signup() { this.go("account", "signup"); }

  private onKeyNav(e: KeyboardEvent) {
    const order: Route[] = ["home", "about", "services", "community"];
    const idx = order.indexOf(this.view);
    if (idx === -1) return;
    if (e.key === "ArrowRight") {
      const to = order[(idx + 1) % order.length];
      this.go(to);
      (this.renderRoot.querySelector(`[data-k="${to}"]`) as HTMLElement)?.focus();
    } else if (e.key === "ArrowLeft") {
      const to = order[(idx - 1 + order.length) % order.length];
      this.go(to);
      (this.renderRoot.querySelector(`[data-k="${to}"]`) as HTMLElement)?.focus();
    }
  }

  render() {
    const initials = (this.email?.[0] ?? "U").toUpperCase();

    return html`
      <header>
        <div class="bar">
          <div class="brand" @click=${() => this.go("home")} aria-label="Cluesstack">
            <app-logo></app-logo>
          </div>

          <nav role="tablist" aria-label="Primary">
            ${(["home","about","services","community","web3"] as Route[]).map(v => html`
              <button
                class="link"
                role="tab"
                data-k=${v}
                aria-selected=${this.view === v}
                @click=${() => this.go(v)}
                @keydown=${(e:KeyboardEvent) => this.onKeyNav(e)}
              >${v[0].toUpperCase() + v.slice(1)}</button>
            `)}
          </nav>

          <div class="right">
            <dark-mode-toggle></dark-mode-toggle>
            <web3-wallet></web3-wallet>
            ${this.authed ? html`
              <button class="ghost" title="Profile" @click=${() => this.go("profile")}>
                <span class="avatar" style="margin-right:.4rem">${initials}</span> Profile
              </button>
              <button class="btn" @click=${() => this.signout()}>Logout</button>
            ` : html`
              <button class="ghost" @click=${() => this.signup()}>Sign up</button>
              <button class="btn"   @click=${() => this.login()}>Login</button>
            `}
            <button class="hamb" aria-label="Menu" @click=${() => (this.open = true)}>
              <app-icon name="menu" size="1.25rem"></app-icon>
            </button>
          </div>
        </div>

        <div class="sheet ${this.open ? "open" : ""}" @click=${(e:MouseEvent) => {
          if ((e.target as HTMLElement).classList.contains("sheet-bg")) this.open = false;
        }}>
          ${this.open ? html`
            <div class="sheet-bg"></div>
            <div class="sheet-panel" role="dialog" aria-label="Navigation menu">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <app-logo></app-logo>
                <button class="hamb" aria-label="Close menu" @click=${() => (this.open = false)}>
                  <app-icon name="close" size="1.25rem"></app-icon>
                </button>
              </div>

              <div class="sheet-nav" role="tablist" aria-label="Primary (mobile)">
                ${(["home","about","services","community","web3"] as Route[]).map(v => html`
                  <button class="sheet-link"
                          role="tab"
                          aria-selected=${this.view === v}
                          @click=${() => this.go(v)}>${v[0].toUpperCase()+v.slice(1)}</button>
                `)}
              </div>

              <div style="border-top:1px solid #eef2f6; margin:.4rem 0; padding-top:.6rem"></div>

              ${this.authed ? html`
                <div style="display:flex; align-items:center; gap:.6rem">
                  <span class="avatar">${initials}</span>
                  <span style="font-weight:700; color:#0f172a">${this.email ?? "User"}</span>
                </div>
                <button class="btn" style="margin-top:.6rem; width:100%" @click=${() => this.signout()}>Logout</button>
              ` : html`
                <div style="display:grid; gap:.4rem">
                  <button class="btn"   @click=${() => this.login()}>Login</button>
                  <button class="ghost" @click=${() => this.signup()}>Sign up</button>
                </div>
              `}
            </div>
          ` : null}
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "top-nav": TopNav }
}
