import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("site-footer")
export class SiteFooter extends LitElement {
  static styles = css`
    :host { 
      display: block;
      margin-top: 4rem;
    }
    
    footer {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid rgba(0, 188, 212, 0.1);
      padding: 3rem 0 2rem;
    }
    
    .bar {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
      color: #64748b;
    }
    
    .brand-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .brand-name {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 900;
      font-size: 1.1rem;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
    
    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      box-shadow: 0 0 12px rgba(0, 188, 212, 0.4);
    }
    
    .brand-desc {
      font-size: 0.9rem;
      line-height: 1.6;
      color: #64748b;
      max-width: 280px;
    }
    
    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-title {
      font-weight: 800;
      font-size: 0.95rem;
      color: #0f172a;
      margin: 0;
    }
    
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    a { 
      color: #64748b;
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    
    a:hover { 
      color: #00bcd4;
      transform: translateX(2px);
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    
    .social-link {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(0, 188, 212, 0.1);
      border: 1px solid rgba(0, 188, 212, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00bcd4;
      transition: all 0.2s ease;
    }
    
    .social-link:hover {
      background: rgba(0, 188, 212, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 188, 212, 0.2);
    }
    
    .copyright {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(0, 188, 212, 0.1);
      text-align: center;
      font-size: 0.85rem;
      color: #94a3b8;
    }
    
    @media (max-width: 1024px) {
      .bar {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
    }
    
    @media (max-width: 768px) {
      .bar {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 0 1.5rem;
      }
      
      footer {
        padding: 2.5rem 0 1.5rem;
      }
      
      .brand-section {
        order: -1;
        text-align: center;
        align-items: center;
      }
      
      .brand-desc {
        text-align: center;
        max-width: 100%;
      }
      
      .social-links {
        gap: 1rem;
        justify-content: center;
      }
      
      .social-link {
        width: 44px;
        height: 44px;
        min-width: 44px;
        min-height: 44px;
      }
      
      .footer-section {
        text-align: center;
      }
      
      .footer-links {
        align-items: center;
      }
    }
    
    @media (max-width: 640px) {
      .bar {
        gap: 2rem;
        padding: 0 1.25rem;
      }
      
      footer {
        padding: 2rem 0 1.25rem;
      }
      
      .brand-desc {
        font-size: 0.9rem;
        line-height: 1.7;
      }
      
      .footer-title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      
      a {
        font-size: 0.9rem;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 8px;
        transition: background 0.2s ease;
      }
      
      a:hover {
        background: rgba(0, 188, 212, 0.08);
        transform: none;
      }
      
      .footer-links {
        gap: 0.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .bar {
        padding: 0 1rem;
        gap: 1.75rem;
      }
      
      footer {
        padding: 1.75rem 0 1.25rem;
      }
      
      .brand-name {
        font-size: 1rem;
      }
      
      .brand-desc {
        font-size: 0.85rem;
      }
      
      .footer-title {
        font-size: 0.95rem;
      }
      
      a {
        font-size: 0.85rem;
        min-height: 44px;
      }
      
      .social-link {
        width: 42px;
        height: 42px;
      }
      
      .copyright {
        font-size: 0.8rem;
        padding-top: 1.5rem;
        margin-top: 1.5rem;
        line-height: 1.6;
      }
    }
  `;
  render() {
    return html`
      <footer>
        <div class="bar">
          <div class="brand-section">
            <div class="brand-name">
              <span class="brand-dot"></span>
              <span>Cluesstack</span>
            </div>
            <p class="brand-desc">
              Modern inventory management with Web3 integration. 
              Built for the future of decentralized business.
            </p>
            <div class="social-links">
              <a href="https://x.com/yourhandle" target="_blank" rel="noopener" class="social-link" aria-label="Twitter">
                <span>𝕏</span>
              </a>
              <a href="https://www.linkedin.com/company/yourbrand" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
                <span>in</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
                <span>⚡</span>
              </a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Product</h3>
            <div class="footer-links">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#integrations">Integrations</a>
              <a href="#web3">Web3</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Company</h3>
            <div class="footer-links">
              <a href="#about">About</a>
              <a href="#blog">Blog</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Legal</h3>
            <div class="footer-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/security">Security</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          © ${new Date().getFullYear()} Cluesstack. All rights reserved.
        </div>
      </footer>
    `;
  }
}
declare global { interface HTMLElementTagNameMap { "site-footer": SiteFooter } }
