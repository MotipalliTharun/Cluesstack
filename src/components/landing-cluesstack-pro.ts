import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/icon";

@customElement("landing-cluesstack-pro")
export class LandingCluesstackPro extends LitElement {
  static styles = css`
    :host { 
      display: block;
      color: #0f172a;
    }
    
    .hero {
      background: linear-gradient(135deg, #f3faff 0%, #ffffff 100%);
      border: 1px solid rgba(0, 188, 212, 0.15);
      border-radius: 24px;
      padding: clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      margin-bottom: 3rem;
      will-change: transform;
    }
    
    .hero-content {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }
    
    .hero-image-container {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
      align-self: start;
      margin-top: 0;
    }
    
    .hero-image {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      border-radius: 20px;
      vertical-align: top;
    }
    
    .hero-text {
      display: flex;
      flex-direction: column;
      align-self: start;
    }
    
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: start;
      }
      
      .hero-image-container {
        order: -1;
        max-width: 100%;
        margin: 0 auto;
        width: 100%;
      }
      
      .hero-text {
        align-self: start;
      }
    }
    
    @media (max-width: 768px) {
      .hero-content {
        gap: 1.5rem;
        align-items: start;
      }
      
      .hero-image-container {
        max-width: 100%;
        border-radius: 16px;
        margin: 0;
      }
      
      .hero-image {
        border-radius: 16px;
      }
      
      .hero-text {
        align-self: start;
      }
    }
    
    .brand { 
      font-family: "Poppins", "Inter", sans-serif;
      font-weight: 900;
      letter-spacing: -0.04em;
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin: 0;
      line-height: 1.1;
      color: #0f172a;
    }
    
    .sub { 
      color: #64748b;
      max-width: 72ch;
      margin: 1.25rem 0 0 0;
      font-size: clamp(1rem, 1.5vw, 1.2rem);
      line-height: 1.6;
      font-weight: 400;
    }
    
    .row { 
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
    
    .btn {
      appearance: none;
      border: 0;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 14px;
      font-weight: 700;
      font-size: 1rem;
      font-family: "Inter", sans-serif;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      will-change: transform;
    }
    
    .btn:hover { 
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 188, 212, 0.4);
    }
    
    .btn:active { 
      transform: translateY(0);
    }
    
    .btn.secondary { 
      background: #fff;
      color: #00bcd4;
      border: 1.5px solid rgba(0, 188, 212, 0.3);
      box-shadow: 0 2px 8px rgba(0, 188, 212, 0.15);
    }
    
    .btn.secondary:hover {
      background: rgba(0, 188, 212, 0.08);
      border-color: rgba(0, 188, 212, 0.4);
      transform: translateY(-1px);
    }

    .section { 
      margin-top: 2.5rem; 
      padding: clamp(1.5rem, 4vw, 2.5rem); 
      border: 1px solid rgba(0, 188, 212, 0.12); 
      border-radius: 20px; 
      background: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }
    
    .h2 { 
      margin: 0 0 1.25rem 0;
      font-family: "Poppins", "Inter", sans-serif;
      font-weight: 800;
      letter-spacing: -0.03em;
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      color: #0f172a;
      line-height: 1.2;
    }
    
    .muted { 
      color: #64748b;
      font-size: 1.1rem;
      line-height: 1.7;
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    
    .grid { 
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      margin-top: 1.5rem;
    }
    
    .card { 
      border: 1px solid rgba(0, 188, 212, 0.12); 
      border-radius: 14px; 
      background: #fff;
      padding: 0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      will-change: transform;
      overflow: hidden;
    }
    
    .card-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }
    
    .card-content {
      padding: 1.25rem;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 188, 212, 0.15);
      border-color: rgba(0, 188, 212, 0.25);
    }
    
    .feature-image-container {
      margin-bottom: 1.5rem;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
    
    .feature-image {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
    
    .section-hero-image {
      width: 100%;
      max-width: 800px;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .card-image {
        height: 160px;
      }
      
      .card-content {
        padding: 1rem;
      }
      
      .section-hero-image {
        border-radius: 16px;
      }
      
      .feature-image-container {
        margin-bottom: 1rem;
        border-radius: 14px;
      }
    }
    
    @media (max-width: 480px) {
      .card-image {
        height: 140px;
      }
      
      .card-content {
        padding: 0.875rem;
      }
    }
    
    .k { 
      font-family: "Poppins", "Inter", sans-serif;
      font-weight: 700;
      font-size: 1.2rem;
      color: #0f172a;
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
    }
    
    .v { 
      color: #64748b;
      font-size: 1rem;
      line-height: 1.7;
      font-weight: 400;
    }

    .list { display:grid; gap:.5rem }
    .item { display:flex; gap:.6rem; align-items:flex-start }
    .dot { width:10px; height:10px; border-radius:999px; background:#00bcd4; margin-top:.5rem }

    .pill { 
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid rgba(0, 188, 212, 0.2);
      background: #e8fbff;
      color: #00bcd4;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .cta-bar {
      margin-top: 2rem;
      border: 1px dashed rgba(0, 188, 212, 0.25);
      background: #f7fdff;
      border-radius: 16px;
      padding: 1.25rem 1.5rem;
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .chip {
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 188, 212, 0.2);
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #00bcd4;
      transition: all 0.2s ease;
    }
    
    .chip:hover {
      background: rgba(0, 188, 212, 0.1);
      border-color: rgba(0, 188, 212, 0.3);
      transform: translateY(-1px);
    }

    .section-split { 
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1.2fr .8fr;
    }
    
    @media (max-width: 1024px) { 
      .section-split { 
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem);
        margin-bottom: 2rem;
      }
      
      .brand {
        font-size: clamp(1.75rem, 5vw, 2.5rem);
      }
      
      .sub {
        font-size: clamp(0.95rem, 1.5vw, 1.1rem);
        margin-top: 1rem;
      }
      
      .row {
        margin-top: 1.5rem;
        gap: 0.75rem;
      }
      
      .btn {
        padding: 0.875rem 1.5rem;
        font-size: 0.95rem;
        min-height: 48px; /* Touch target */
        width: 100%;
        max-width: 100%;
      }
      
      .btn.secondary {
        width: 100%;
        max-width: 100%;
      }
      
      .section {
        padding: clamp(1.5rem, 4vw, 2rem);
        margin-top: 2rem;
      }
      
      .h2 {
        font-size: clamp(1.5rem, 4vw, 2rem);
        margin-bottom: 1rem;
      }
      
      .grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .card {
        padding: 1rem;
      }
      
      .cta-bar {
        padding: 1rem 1.25rem;
        gap: 0.5rem;
        flex-direction: column;
        align-items: stretch;
      }
      
      .chip {
        padding: 0.5rem 0.875rem;
        font-size: 0.8rem;
        text-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    @media (max-width: 480px) {
      .hero {
        padding: 1.5rem 1.25rem;
        border-radius: 16px;
      }
      
      .brand {
        font-size: clamp(1.5rem, 6vw, 2rem);
      }
      
      .sub {
        font-size: 0.95rem;
        line-height: 1.5;
      }
      
      .btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
        min-height: 44px;
      }
      
      .section {
        padding: 1.25rem;
        border-radius: 16px;
      }
      
      .h2 {
        font-size: clamp(1.25rem, 5vw, 1.75rem);
      }
      
      .k {
        font-size: 1rem;
      }
      
      .v {
        font-size: 0.9rem;
      }
      
      .pill {
        padding: 0.4rem 0.875rem;
        font-size: 0.8rem;
        margin-bottom: 1rem;
      }
    }

    .chip { border:1px solid #e5e7eb; border-radius:999px; padding:.35rem .6rem; background:#fff }
    .tag { display:inline-flex; align-items:center; gap:.4rem; border:1px solid #d9f3f8; background:#e8fbff; padding:.25rem .55rem; border-radius:999px; font-weight:800; color:#026775; font-size:.8rem }

    .tiles { display:grid; grid-template-columns: repeat(12, 1fr); gap: 8px }
    .tile {
      border:1px solid #e5f6fa; background:#f7fdff; border-radius:10px; padding:.6rem;
      font-weight:800; color:#026775; text-align:center;
    }
    .tiles .tile:nth-child(1){ grid-column: span 5; }
    .tiles .tile:nth-child(2){ grid-column: span 7; }
    .tiles .tile:nth-child(3){ grid-column: span 4; }
    .tiles .tile:nth-child(4){ grid-column: span 8; }
  `;

  @property({type:Boolean}) authed = false;

  private go(view: string) {
    this.dispatchEvent(new CustomEvent("go", { detail:{ view }, bubbles:true, composed:true }));
  }

  render() {
    return html`
      <!-- HERO -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format" 
              alt="Modern workspace"
              class="hero-image"
              loading="lazy"
            />
          </div>
          <div class="hero-text">
            <span class="pill">
              <app-icon name="sparkle" size="0.875rem" style="display: inline-block; margin-right: 0.25rem;"></app-icon>
              Enterprise-ready • Simple by design
            </span>
            <h1 class="brand">Cluesstack — The Future of Automation Workflows</h1>
            <p class="sub">Join thousands of developers and teams building, sharing, and running powerful automations. Create workflows with AI-powered guidance, explore community templates, and leverage Web3 technology for decentralized inventory management.</p>
            <div class="row">
              <button class="btn" @click=${() => this.go(this.authed ? "workflows" : "account")}>${this.authed ? "Go to Dashboard" : "Get Started Free"}</button>
              <button class="btn secondary" @click=${() => this.go("community")}>Explore Community</button>
              <button class="btn secondary" @click=${() => this.go("templates")}>View Templates</button>
            </div>
            <div class="cta-bar">
            <span class="chip">
              <app-icon name="rocket" size="0.875rem" style="display: inline-block; margin-right: 0.25rem;"></app-icon>
              No Code Required
            </span>
            <span class="chip">
              <app-icon name="link" size="0.875rem" style="display: inline-block; margin-right: 0.25rem;"></app-icon>
              Web3 Enabled
            </span>
            <span class="chip">
              <app-icon name="nft" size="0.875rem" style="display: inline-block; margin-right: 0.25rem;"></app-icon>
              NFT Inventory
            </span>
            <span class="chip">
              <app-icon name="blockchain" size="0.875rem" style="display: inline-block; margin-right: 0.25rem;"></app-icon>
              Blockchain Verified
            </span>
            <span class="chip">
              <app-icon name="diamond" size="0.875rem" style="display: inline-block; margin-right: 0.25rem;"></app-icon>
              Free Forever
            </span>
          </div>
          </div>
        </div>
      </section>

      <!-- COMMUNITY -->
      <section class="section">
        <div class="section-split">
          <div>
            <h2 class="h2">Community for Developers</h2>
            <p class="muted">Share your workflows, fork others, and vote on the best "signature moves" for Clues & Stack. Learn from real use cases, not theory.</p>
            <div class="grid" style="margin-top:.6rem">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&auto=format" alt="Showcase" class="card-image" loading="lazy" />
                <div class="card-content">
                  <div class="k">Showcase</div>
                  <div class="v">Publish your workflow with docs, inputs, and run examples.</div>
                </div>
              </div>
              <div class="card">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format" alt="Fork & remix" class="card-image" loading="lazy" />
                <div class="card-content">
                  <div class="k">Fork & remix</div>
                  <div class="v">Clone a community flow, change steps, and re-share.</div>
                </div>
              </div>
              <div class="card">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop&auto=format" alt="Reputation" class="card-image" loading="lazy" />
                <div class="card-content">
                  <div class="k">Reputation</div>
                  <div class="v">Earn kudos for helpful templates and clean docs.</div>
                </div>
              </div>
              <div class="card">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&auto=format" alt="Discussions" class="card-image" loading="lazy" />
                <div class="card-content">
                  <div class="k">Discussions</div>
                  <div class="v">Threaded help, change logs, and version tags.</div>
                </div>
              </div>
            </div>
            <div class="row" style="margin-top:.8rem">
              <button class="btn" @click=${() => this.go("community")}>Join the community</button>
              <button class="btn secondary" @click=${() => this.go("signup")}>Create account</button>
            </div>
          </div>
          <div>
            <div class="feature-image-container">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format" alt="Workflow automation" class="feature-image" loading="lazy" />
            </div>
            <span class="tag">Signature Moves</span>
            <h3 class="h2" style="margin-top:.4rem">Chat Signature Moves: <em>Clues</em> & <em>Stack</em></h3>
            <div class="list">
              <div class="item"><div class="dot"></div><div><strong>Clues</strong> — guided hints in chat that reveal the best next step for a workflow (ex: "Looks like you want a daily digest").</div></div>
              <div class="item"><div class="dot"></div><div><strong>Stack</strong> — quick-add actions you can stack inline (ex: "+Post to Slack", "+Append to Sheet").</div></div>
              <div class="item"><div class="dot"></div><div><strong>Playbooks</strong> — save your Clues+Stack sequence as a reusable pattern for your team.</div></div>
            </div>
            <div class="tiles" style="margin-top:.8rem">
              <div class="tile">+ Clue: summarize</div>
              <div class="tile">+ Stack: Email digest</div>
              <div class="tile">+ Stack: Slack post</div>
              <div class="tile">+ Stack: Sheets append</div>
            </div>
          </div>
        </div>
      </section>

      <!-- WORKFLOWS -->
      <section class="section">
        <div style="text-align: center; margin-bottom: 2rem;">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=400&fit=crop&auto=format" alt="Workflow automation" class="section-hero-image" loading="lazy" />
        </div>
        <h2 class="h2">Workflows</h2>
        <p class="muted">Trigger → steps → test → enable. Use Clues & Stack to compose powerful flows, then share them with the community.</p>
        <div class="grid" style="margin-top:.6rem">
          <div class="card">
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&auto=format" alt="Triggers" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">Triggers</div>
              <div class="v">Schedule, webhook, or app event (Gmail, Slack, Sheets, Notion).</div>
            </div>
          </div>
          <div class="card">
            <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&auto=format" alt="Steps" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">Steps</div>
              <div class="v">Email, Slack post, HTTP request, Sheets append, and more.</div>
            </div>
          </div>
          <div class="card">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format" alt="Runs" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">Runs</div>
              <div class="v">View logs, inputs/outputs, and re-run failures.</div>
            </div>
          </div>
          <div class="card">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&auto=format" alt="Roles" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">Roles</div>
              <div class="v">Viewer, Author, Admin — control who can run or edit.</div>
            </div>
          </div>
        </div>
        <div class="row" style="margin-top:.8rem">
          <button class="btn" @click=${() => this.go(this.authed ? "workflows" : "account")}>${this.authed ? "Open my workflows" : "Sign in to build"}</button>
          <button class="btn secondary" @click=${() => this.go("templates")}>Explore templates</button>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="section">
        <h2 class="h2">About Cluesstack</h2>
        <p class="muted">We believe powerful automation should be accessible and legible. Clues (guided hints) and Stack (stackable actions) make building reliable workflows feel obvious, not intimidating.</p>
        <div class="grid" style="margin-top:.6rem">
          <div class="card"><div class="k">Principles</div><div class="v">Clarity over clutter. Defaults over decisions. Respect time & privacy.</div></div>
          <div class="card"><div class="k">Security</div><div class="v">SSO, OAuth, encrypted tokens, and least-privilege policies.</div></div>
          <div class="card"><div class="k">Roadmap</div><div class="v">Versioned templates, org workspaces, usage analytics.</div></div>
        </div>
      </section>

      <!-- WEB3 FEATURES -->
      <section class="section" style="background: linear-gradient(135deg, rgba(0,188,212,0.05) 0%, rgba(0,172,193,0.05) 100%); border-color: rgba(0,188,212,0.2);">
        <div style="display:flex; align-items:center; gap:.6rem; margin-bottom:.6rem">
          <app-icon name="link" size="1.5rem" color="#00bcd4"></app-icon>
          <h2 class="h2" style="margin:0">Web3 Integration</h2>
        </div>
        <p class="muted">Experience the future of inventory management with blockchain technology, NFTs, and decentralized storage.</p>
        <div class="grid" style="margin-top:.6rem">
          <div class="card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);">
            <div class="k" style="display:flex; align-items:center; gap:.5rem">
              <app-icon name="nft" size="1.25rem" color="#00bcd4"></app-icon>
              NFT Inventory Tokens
            </div>
            <div class="v">Your inventory items are represented as NFTs on the blockchain, ensuring authenticity and ownership verification.</div>
          </div>
          <div class="card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);">
            <div class="k" style="display:flex; align-items:center; gap:.5rem">
              <app-icon name="storage" size="1.25rem" color="#00bcd4"></app-icon>
              Decentralized Storage
            </div>
            <div class="v">Inventory data stored on IPFS for permanent, decentralized access that can't be censored or lost.</div>
          </div>
          <div class="card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);">
            <div class="k" style="display:flex; align-items:center; gap:.5rem">
              <app-icon name="smart-contract" size="1.25rem" color="#00bcd4"></app-icon>
              Smart Contracts
            </div>
            <div class="v">Automated inventory management through smart contracts for transparent and trustless operations.</div>
          </div>
          <div class="card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);">
            <div class="k" style="display:flex; align-items:center; gap:.5rem">
              <app-icon name="payment" size="1.25rem" color="#00bcd4"></app-icon>
              Crypto Payments
            </div>
            <div class="v">Accept and process payments using cryptocurrency tokens with instant settlement.</div>
          </div>
        </div>
        <div class="row" style="margin-top:.8rem">
          <button class="btn" @click=${() => this.go("web3")}>Explore Web3 Dashboard</button>
          <button class="btn secondary" @click=${() => this.go("nfts")}>View NFT Gallery</button>
        </div>
      </section>

      <!-- SERVICES -->
      <section class="section">
        <h2 class="h2">Services</h2>
        <div class="grid" style="margin-top:.6rem">
          <div class="card">
            <div class="k">Starter</div>
            <div class="v">Perfect for individuals. 2 active workflows, 100 runs/mo.</div>
          </div>
          <div class="card">
            <div class="k">Team</div>
            <div class="v">Small teams & side projects. 10 workflows, role-based access.</div>
          </div>
          <div class="card">
            <div class="k">Enterprise</div>
            <div class="v">SSO/SAML, SCIM, audit logs, custom limits, priority support.</div>
          </div>
        </div>
        <div class="row" style="margin-top:.8rem">
          <button class="btn" @click=${() => this.go("pricing")}>See pricing</button>
          <button class="btn secondary" @click=${() => this.go("contact")}>Contact sales</button>
        </div>
      </section>
    `;
  }
}
declare global { interface HTMLElementTagNameMap { "landing-cluesstack-pro": LandingCluesstackPro } }
