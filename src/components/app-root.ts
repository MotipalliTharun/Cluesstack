// src/components/app-root.ts
import { LitElement, css, html } from "lit";
import { theme } from "../styles/theme.css";
import { authStore } from "../lib/authStore";
import type { Role } from "../lib/authStore";

/* Nav + layout */
import "../components/top-nav";
import "../components/toast-center";
import "../components/site-footer";

/* Landing & pages */
import "../components/landing-cluesstack-pro";
import "../components/about-page";
import "../components/contact-form";

/* Community */
import "../components/community-hub";

/* Web3 */
import "../components/web3-wallet";
import "../components/nft-gallery";
import "../components/web3-dashboard";
import "../components/icon";

/* Auth */
import "../components/login-form";
import "../components/signup-form";
import "../components/logout-button";

type View =
  | "home"
  | "community"
  | "templates"
  | "about"
  | "services"
  | "contact"
  | "account"
  | "workflows"
  | "workflow-new"
  | "workflow-edit"
  | "profile"
  | "assistant"
  | "web3"
  | "nfts";

type AccountView = "login" | "signup";

export class AppRoot extends LitElement {
  static properties = {
    view: { state: true },
    authed: { state: true },
    ready: { state: true },
    role: { state: true },
    email: { state: true },
    accountView: { state: true },
    editingWorkflowId: { state: true },
  } as const;

  // Routing / state
  view: View = (localStorage.getItem("view") as View) || "home";
  authed = false;
  ready = false;
  role: Role | null = null;
  email: string | null = null;

  accountView: AccountView = "login";
  editingWorkflowId: string | null = null;

  private _offAuth?: () => void;

  static styles = [
    theme,
    css`
      :host {
        display: block;
        min-height: 100vh;
        color: #0f172a;
        background: linear-gradient(180deg, #f0f9ff 0%, #f8fafc 50%, #ffffff 100%);
        font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial,
          "Apple Color Emoji", "Segoe UI Emoji";
        position: relative;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      @media (max-width: 768px) {
        :host {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }
      }
      
      .shell {
        position: relative;
        padding: 2rem 1.5rem;
        max-width: 1280px;
        margin: 0 auto;
        min-height: calc(100vh - 200px);
      }
      
      @media (max-width: 768px) {
        .shell {
          padding: 1.5rem 1.25rem;
        }
      }
      
      @media (max-width: 640px) {
        .shell {
          padding: 1.25rem 1rem;
          min-height: calc(100vh - 160px);
        }
      }
      
      @media (max-width: 480px) {
        .shell {
          padding: 1rem 0.875rem;
        }
      }
      
      .panel {
        overflow: auto;
        padding: 2rem;
        border-radius: 20px;
        background: #fff;
        border: 1px solid rgba(0, 188, 212, 0.12);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        will-change: transform;
        -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
      }
      
      @media (max-width: 768px) {
        .panel {
          padding: 1.5rem;
          border-radius: 16px;
        }
      }
      
      @media (max-width: 640px) {
        .panel {
          padding: 1.25rem;
          border-radius: 14px;
        }
      }
      
      @media (max-width: 480px) {
        .panel {
          padding: 1rem;
          border-radius: 12px;
        }
      }
      
      .grid {
        display: grid;
        gap: 1.5rem;
      }
      
      .account-grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      }
      
      @media (max-width: 768px) {
        .account-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
      }
      
      @media (max-width: 480px) {
        .account-grid {
          gap: 1.25rem;
        }
      }
      
      .card {
        padding: 1.25rem;
        border: 1px solid rgba(0, 188, 212, 0.12);
        border-radius: 14px;
        background: #fff;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        will-change: transform;
      }
      
      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 188, 212, 0.15);
        border-color: rgba(0, 188, 212, 0.25);
      }
      
      .card img {
        transition: transform 0.3s ease;
      }
      
      .card:hover img {
        transform: scale(1.05);
      }
      
      @media (max-width: 768px) {
        .card img {
          height: 160px;
        }
      }
      
      @media (max-width: 480px) {
        .card img {
          height: 140px;
        }
      }
      
      .muted {
        color: #64748b;
        font-size: 0.95rem;
      }
      
      .btn {
        appearance: none;
        border: 0;
        background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
        color: #fff;
        padding: 0.875rem 1.5rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 2px 8px rgba(0, 188, 212, 0.25);
        min-height: 44px;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      
      .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.35);
      }
      
      .btn:active {
        transform: translateY(0);
      }
      
      @media (max-width: 768px) {
        .btn {
          padding: 0.75rem 1.25rem;
          font-size: 0.9rem;
          min-height: 48px;
          width: 100%;
        }
      }
      
      @media (max-width: 480px) {
        .btn {
          padding: 0.7rem 1rem;
          font-size: 0.85rem;
          min-height: 44px;
        }
      }
      
      h3 {
        font-size: 1.5rem;
        font-weight: 900;
        color: #0f172a;
        margin: 0 0 1.5rem 0;
        letter-spacing: -0.02em;
      }
      
      @media (max-width: 768px) {
        h3 {
          font-size: 1.25rem;
          margin-bottom: 1.25rem;
        }
      }
      
      @media (max-width: 480px) {
        h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.syncAuth();
    // subscribe; keep an unsubscribe to avoid leaks on HMR / disconnect
    this._offAuth = authStore.on(() => this.syncAuth());
  }

  disconnectedCallback(): void {
    this._offAuth?.();
    super.disconnectedCallback();
  }

  private syncAuth() {
    this.ready = (authStore as any).ready ?? true;
    const u = (authStore as any).user ?? null;

    this.authed = !!u;
    this.role = (u?.role as Role) ?? "pending";
    this.email = u?.email ?? null;

    // Gate private routes
    if (
      !this.authed &&
      ["workflows", "workflow-new", "workflow-edit", "profile"].includes(
        this.view
      )
    ) {
      this.setView("account");
      this.accountView = "login";
    }
    this.requestUpdate();
  }

  private setView(v: View) {
    if (this.view !== v) {
      this.view = v;
      localStorage.setItem("view", v);
      this.requestUpdate();
    }
  }

  /* ---------- Views ---------- */

  private renderHome() {
    return html`
      <div class="panel">
        <landing-cluesstack-pro
          .authed=${this.authed}
          @go=${(e: CustomEvent) => this.setView(e.detail.view as View)}
        ></landing-cluesstack-pro>
    </div>`;
  }

  private renderCommunity() {
    return html`
      <div class="panel">
        <community-hub .user=${(authStore as any).user}></community-hub>
      </div>
    `;
  }

  private renderTemplates() {
    return html`
      <div class="panel">
        <div style="text-align: center; margin-bottom: 2rem;">
          <img 
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=300&fit=crop&auto=format" 
            alt="Workflow templates"
            style="width: 100%; max-width: 700px; height: auto; border-radius: 20px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); margin: 0 auto; display: block;"
            loading="lazy"
          />
        </div>
        <h3>Templates</h3>
        <p class="muted" style="margin-bottom: 2rem; text-align: center;">Browse and use pre-built workflow templates</p>
        <div class="grid">
          <div class="card" style="overflow: hidden; padding: 0;">
            <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&auto=format" 
              alt="Gmail to Slack"
              style="width: 100%; height: 160px; object-fit: cover; display: block;"
              loading="lazy"
            />
            <div style="padding: 1.25rem;">
              <div style="display: flex; align-items: start; gap: 1rem;">
                <app-icon name="email" size="2rem" color="#00bcd4"></app-icon>
                <div>
                  <strong style="display: block; margin-bottom: 0.5rem; color: #0f172a;">Gmail → Slack Alert</strong>
                  <span class="muted">Automatically send Slack notifications for important Gmail messages</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card" style="overflow: hidden; padding: 0;">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format" 
              alt="Typeform to Sheets"
              style="width: 100%; height: 160px; object-fit: cover; display: block;"
              loading="lazy"
            />
            <div style="padding: 1.25rem;">
              <div style="display: flex; align-items: start; gap: 1rem;">
                <app-icon name="chart" size="2rem" color="#00bcd4"></app-icon>
                <div>
                  <strong style="display: block; margin-bottom: 0.5rem; color: #0f172a;">Typeform → Sheets</strong>
                  <span class="muted">Append form submissions directly to Google Sheets</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card" style="overflow: hidden; padding: 0;">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format" 
              alt="Email digest"
              style="width: 100%; height: 160px; object-fit: cover; display: block;"
              loading="lazy"
            />
            <div style="padding: 1.25rem;">
              <div style="display: flex; align-items: start; gap: 1rem;">
                <app-icon name="clock" size="2rem" color="#00bcd4"></app-icon>
                <div>
                  <strong style="display: block; margin-bottom: 0.5rem; color: #0f172a;">CRON → Email Digest</strong>
                  <span class="muted">Send weekly email summaries on a schedule</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 2rem; text-align: center;">
          <button
            class="btn"
            @click=${() => this.setView(this.authed ? "workflow-new" : "account")}
          >
            Browse all templates
          </button>
        </div>
      </div>
    `;
  }

  private renderAbout() {
    return html`
      <div class="panel">
        <about-page
          brand="Cluesstack"
          mission="Make automation accessible and legible with Clues & Stack — guided hints and stackable actions that help teams get repeatable results fast."
        ></about-page>
      </div>
    `;
  }

  private renderServices() {
    return html`
      <div class="panel">
        <div style="text-align: center; margin-bottom: 2rem;">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=400&fit=crop&auto=format" 
            alt="Services and pricing"
            style="width: 100%; max-width: 800px; height: auto; border-radius: 20px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); margin: 0 auto; display: block;"
            loading="lazy"
          />
        </div>
        <h3>Pricing & Services</h3>
        <p class="muted" style="margin-bottom: 2rem; text-align: center;">Choose the plan that fits your needs</p>
        <div class="grid">
          <div class="card" style="overflow: hidden; padding: 0;">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop&auto=format" 
              alt="Starter plan"
              style="width: 100%; height: 180px; object-fit: cover; display: block;"
              loading="lazy"
            />
            <div style="padding: 1.5rem;">
              <div style="margin-bottom: 1rem;">
                <app-icon name="rocket" size="2rem" color="#00bcd4" style="display: block; margin-bottom: 0.5rem;"></app-icon>
                <strong style="display: block; font-size: 1.3rem; margin-bottom: 0.5rem; color: #0f172a;">Starter</strong>
                <div class="muted">Perfect for individuals and small projects</div>
              </div>
              <ul style="list-style: none; padding: 0; margin: 1rem 0; display: grid; gap: 0.5rem;">
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">2 active workflows</span>
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">100 runs per month</span>
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">Community support</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card" style="overflow: hidden; padding: 0; border: 2px solid rgba(0, 188, 212, 0.3);">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop&auto=format" 
              alt="Team plan"
              style="width: 100%; height: 180px; object-fit: cover; display: block;"
              loading="lazy"
            />
            <div style="padding: 1.5rem;">
              <div style="margin-bottom: 1rem;">
                <app-icon name="link" size="2rem" color="#00bcd4" style="display: block; margin-bottom: 0.5rem;"></app-icon>
                <strong style="display: block; font-size: 1.3rem; margin-bottom: 0.5rem; color: #0f172a;">Team</strong>
                <div class="muted">For small teams and growing businesses</div>
              </div>
              <ul style="list-style: none; padding: 0; margin: 1rem 0; display: grid; gap: 0.5rem;">
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">10 active workflows</span>
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">Role-based access</span>
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">Priority support</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card" style="overflow: hidden; padding: 0;">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format" 
              alt="Enterprise plan"
              style="width: 100%; height: 180px; object-fit: cover; display: block;"
              loading="lazy"
            />
            <div style="padding: 1.5rem;">
              <div style="margin-bottom: 1rem;">
                <app-icon name="smart-contract" size="2rem" color="#00bcd4" style="display: block; margin-bottom: 0.5rem;"></app-icon>
                <strong style="display: block; font-size: 1.3rem; margin-bottom: 0.5rem; color: #0f172a;">Enterprise</strong>
                <div class="muted">For large organizations</div>
              </div>
              <ul style="list-style: none; padding: 0; margin: 1rem 0; display: grid; gap: 0.5rem;">
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">Unlimited workflows</span>
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">SSO/SAML, SCIM</span>
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem;">
                  <app-icon name="check" size="1rem" color="#00bcd4"></app-icon>
                  <span class="muted">Audit logs & priority SLA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style="margin-top: 2rem; text-align: center;">
          <button class="btn" @click=${() => this.setView("contact")}>
            Contact sales
          </button>
        </div>
      </div>
    `;
  }

  private renderContact() {
    return html`
      <div class="panel">
        <h3>Get in Touch</h3>
        <p class="muted" style="margin-bottom: 2rem;">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        <contact-form email="hello@cluesstack.com"></contact-form>
      </div>
    `;
  }

  private renderAccount() {
    return html`
      <div class="panel account-grid">
        ${this.accountView === "login"
          ? html`
              <div class="card">
                <login-form
                  @logged-in=${() => this.setView("workflows")}
                  @goto-signup=${() => {
                    this.accountView = "signup";
                    this.requestUpdate();
                  }}
                ></login-form>
              </div>
            `
          : html`
              <div class="card">
                <signup-form
                  @goto-login=${() => {
                    this.accountView = "login";
                    this.requestUpdate();
                  }}
                ></signup-form>
              </div>
            `}
        <div class="card">
          <h3 style="margin:0 0 1rem 0; font-size: 1.3rem;">Why create an account?</h3>
          <div style="display: grid; gap: 1rem;">
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <app-icon name="sparkle" size="1.2rem" color="#00bcd4"></app-icon>
              <div>
                <strong style="color: #0f172a; display: block; margin-bottom: 0.25rem;">Build workflows</strong>
                <span class="muted">Create and automate your business processes</span>
              </div>
            </div>
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <app-icon name="nft" size="1.2rem" color="#00bcd4"></app-icon>
              <div>
                <strong style="color: #0f172a; display: block; margin-bottom: 0.25rem;">Share templates</strong>
                <span class="muted">Fork and publish workflow templates</span>
              </div>
            </div>
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <app-icon name="link" size="1.2rem" color="#00bcd4"></app-icon>
              <div>
                <strong style="color: #0f172a; display: block; margin-bottom: 0.25rem;">Join community</strong>
                <span class="muted">Vote, discuss, and collaborate</span>
              </div>
            </div>
            <div style="display: flex; align-items: start; gap: 0.75rem;">
              <app-icon name="link" size="1.2rem" color="#00bcd4"></app-icon>
              <div>
                <strong style="color: #0f172a; display: block; margin-bottom: 0.25rem;">Web3 features</strong>
                <span class="muted">Access NFT inventory and blockchain tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderWorkflows() {
    return html`
      <div class="panel grid">
        <h3 style="margin:0">My Workflows</h3>
        <workflow-list
          @go=${(e: CustomEvent) => this.setView(e.detail.view as View)}
          @open-workflow=${(e: CustomEvent) => {
            this.editingWorkflowId = e.detail.id;
            this.setView("workflow-edit");
          }}
        ></workflow-list>
        <button class="btn" @click=${() => this.setView("workflow-new")}>
          New workflow
        </button>
      </div>
    `;
  }

  private renderWorkflowNew() {
    return html`
      <div class="panel grid">
        <h3 style="margin:0">Create a Workflow</h3>
        <workflow-builder
          @saved=${() =>
            (this as any).renderRoot
              ?.querySelector("toast-center")
              ?.show?.("Saved", "ok")}
        ></workflow-builder>
      </div>
    `;
  }

  private renderWorkflowEdit() {
    return html`
      <div class="panel grid">
        <h3 style="margin:0">Edit Workflow</h3>
        <workflow-builder
          .workflowId=${this.editingWorkflowId}
          @saved=${() =>
            (this as any).renderRoot
              ?.querySelector("toast-center")
              ?.show?.("Saved", "ok")}
        ></workflow-builder>
      </div>
    `;
  }

  private renderProfile() {
    return html`
      <div class="panel">
        <h3>Profile Settings</h3>
        <p class="muted" style="margin-bottom: 2rem;">Manage your account information and preferences</p>
        <div class="grid">
          <div class="card">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="width: 56px; height: 56px; border-radius: 999px; background: linear-gradient(135deg, #e8fbff 0%, #d9f3f8 100%); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: #00bcd4;">
                ${(this.email?.[0] ?? "U").toUpperCase()}
              </div>
              <div>
                <strong style="display: block; color: #0f172a; margin-bottom: 0.25rem;">Account</strong>
                <span class="muted">${this.email ?? "Not set"}</span>
              </div>
            </div>
          </div>
          <div class="card">
            <strong style="display: block; color: #0f172a; margin-bottom: 0.5rem;">Email Address</strong>
            <span class="muted">${this.email ?? "—"}</span>
          </div>
          <div class="card">
            <strong style="display: block; color: #0f172a; margin-bottom: 0.5rem;">Role</strong>
            <span class="muted">${this.role ?? "—"}</span>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <logout-button
            @logged-out=${() => this.setView("home")}
          ></logout-button>
        </div>
      </div>
    `;
  }

  private renderWeb3() {
    return html`
      <div class="panel">
        <web3-dashboard></web3-dashboard>
      </div>
    `;
  }

  private renderNFTs() {
    return html`
      <div class="panel">
        <h3 style="margin:0 0 1rem 0">NFT Inventory Gallery</h3>
        <nft-gallery></nft-gallery>
      </div>
    `;
  }

  render() {
    return html`
      <top-nav
        .authed=${this.authed}
        .role=${this.role}
        .email=${this.email}
        .view=${this.view}
        @navigate=${(e: CustomEvent) => this.setView(e.detail.view as View)}
        @signout=${() => this.setView("home")}
      ></top-nav>

      <div
        class="shell"
        @go=${(e: CustomEvent) => this.setView(e.detail.view as View)}
      >
        ${this.view === "home"
          ? this.renderHome()
          : this.view === "community"
          ? this.renderCommunity()
          : this.view === "templates"
          ? this.renderTemplates()
          : this.view === "about"
          ? this.renderAbout()
          : this.view === "services"
          ? this.renderServices()
          : this.view === "contact"
          ? this.renderContact()
          : this.view === "account"
          ? this.renderAccount()
          : this.view === "workflows"
          ? this.authed
            ? this.renderWorkflows()
            : this.renderAccount()
          : this.view === "workflow-new"
          ? this.authed
            ? this.renderWorkflowNew()
            : this.renderAccount()
          : this.view === "workflow-edit"
          ? this.authed
            ? this.renderWorkflowEdit()
            : this.renderAccount()
          : this.view === "profile"
          ? this.authed
            ? this.renderProfile()
            : this.renderAccount()
          : this.view === "web3"
          ? this.renderWeb3()
          : this.view === "nfts"
          ? this.renderNFTs()
          : this.renderHome()}
      </div>

      <toast-center></toast-center>
      <site-footer></site-footer>
    `;
  }
}

customElements.define("app-root", AppRoot);
