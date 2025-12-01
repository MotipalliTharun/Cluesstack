import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("about-page")
export class AboutPage extends LitElement {
  static styles = css`
    :host { 
      display: block;
    }
    
    .hero {
      background: #fff;
      padding: clamp(1.5rem, 4vw, 2.5rem);
      border: 1px solid rgba(0, 188, 212, 0.12);
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }
    
    .h1 { 
      margin: 0 0 0.75rem 0;
      font-family: "Poppins", sans-serif;
      font-weight: 800;
      letter-spacing: -0.02em;
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      color: #0f172a;
    }
    
    .sub { 
      color: #64748b;
      max-width: 68ch;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .grid { 
      display: grid;
      gap: 1.25rem;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      margin-top: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: clamp(1.25rem, 3vw, 2rem);
      }
      
      .h1 {
        font-size: clamp(1.5rem, 4vw, 2rem);
      }
      
      .sub {
        font-size: 0.95rem;
      }
      
      .grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .card {
        padding: 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .hero {
        padding: 1.25rem;
        border-radius: 16px;
      }
      
      .h1 {
        font-size: clamp(1.25rem, 5vw, 1.75rem);
        margin-bottom: 0.5rem;
      }
      
      .sub {
        font-size: 0.9rem;
        margin-bottom: 1.25rem;
      }
      
      .tag {
        font-size: 0.8rem;
        padding: 0.35rem 0.65rem;
        margin-bottom: 0.75rem;
      }
      
      .k {
        font-size: 1rem;
      }
      
      .v {
        font-size: 0.9rem;
      }
    }
    
    .about-header {
      margin-bottom: 2rem;
    }
    
    .about-hero-image {
      width: 100%;
      max-width: 900px;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }
    
    .about-header-text {
      text-align: center;
    }
    
    .card { 
      border: 1px solid rgba(0, 188, 212, 0.12);
      border-radius: 14px;
      padding: 0;
      background: #fff;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      will-change: transform;
      overflow: hidden;
    }
    
    .card-image {
      width: 100%;
      height: 200px;
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
    
    @media (max-width: 768px) {
      .about-hero-image {
        border-radius: 16px;
        margin-bottom: 1.25rem;
      }
      
      .card-image {
        height: 180px;
      }
      
      .card-content {
        padding: 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .card-image {
        height: 160px;
      }
      
      .card-content {
        padding: 0.875rem;
      }
    }
    
    .k { 
      font-family: "Poppins", sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    
    .v { 
      color: #64748b;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    
    .tag { 
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid rgba(0, 188, 212, 0.2);
      background: #e8fbff;
      padding: 0.4rem 0.75rem;
      border-radius: 999px;
      font-weight: 700;
      color: #00bcd4;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
  `;

  @property({type:String}) brand = "Inventory Blog";
  @property({type:String}) mission = "Help small businesses understand stock levels, publish helpful content, and make smarter inventory decisions with a friendly, fast experience.";

  render() {
    return html`
      <section class="hero">
        <div class="about-header">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=400&fit=crop&auto=format" alt="Team collaboration" class="about-hero-image" loading="lazy" />
          <div class="about-header-text">
            <span class="tag">About us</span>
            <h1 class="h1">${this.brand}</h1>
            <p class="sub">${this.mission}</p>
          </div>
        </div>

        <div class="grid">
          <div class="card">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop&auto=format" alt="Our story" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">Our story</div>
              <div class="v">We started as a tiny tool to track what's in stock and turned into a blog-first platform that teaches, inspires, and helps you act.</div>
            </div>
          </div>
          <div class="card">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&auto=format" alt="Principles" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">Principles</div>
              <div class="v">Clarity over clutter. Speed over complexity. Respect for users' time and privacy.</div>
            </div>
          </div>
          <div class="card">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format" alt="What's next" class="card-image" loading="lazy" />
            <div class="card-content">
              <div class="k">What's next</div>
              <div class="v">Role-based publishing, better product analytics, and AI assistance for creating and managing content.</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
declare global { interface HTMLElementTagNameMap { "about-page": AboutPage } }
