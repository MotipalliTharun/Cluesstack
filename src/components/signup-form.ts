import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { authStore } from '../state/auth';

@customElement('signup-form')
export class SignupForm extends LitElement {
  static styles = css`
    :host { 
      display: block;
      width: 100%;
    }
    
    .form-container {
      max-width: 420px;
      margin: 0 auto;
      width: 100%;
    }
    
    @media (max-width: 480px) {
      .form-container {
        max-width: 100%;
      }
    }
    
    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .form-title {
      font-size: 1.75rem;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.02em;
    }
    
    .form-subtitle {
      color: #64748b;
      font-size: 0.95rem;
      margin: 0;
    }
    
    form { 
      display: grid;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    label { 
      font-weight: 700;
      font-size: 0.9rem;
      color: #0f172a;
      letter-spacing: 0.01em;
    }
    
    input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 1.5px solid rgba(0, 188, 212, 0.2);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      color: #0f172a;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      min-height: 48px; /* Touch target */
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    @media (max-width: 480px) {
      input {
        font-size: 16px; /* Prevents zoom on iOS */
        padding: 0.75rem 0.875rem;
        min-height: 44px;
      }
    }
    
    input::placeholder {
      color: #94a3b8;
    }
    
    input:focus { 
      outline: none;
      border-color: #00bcd4;
      box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
      background: #fff;
    }
    
    .row { 
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    
    .btn {
      flex: 1;
      min-width: 140px;
      border: 0;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      color: #fff;
      padding: 0.875rem 1.5rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 188, 212, 0.25);
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 188, 212, 0.35);
    }
    
    .btn:active:not(:disabled) {
      transform: translateY(0);
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .link { 
      background: none;
      border: 0;
      color: #00bcd4;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.5rem;
      transition: all 0.2s ease;
    }
    
    .link:hover {
      color: #00acc1;
      text-decoration: underline;
    }
    
    .msg { 
      padding: 0.875rem 1rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      line-height: 1.5;
    }
    
    .err { 
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border: 1.5px solid #fecaca;
      color: #991b1b;
    }
    
    .ok { 
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border: 1.5px solid #a7f3d0;
      color: #065f46;
    }
    
    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
      color: #94a3b8;
      font-size: 0.85rem;
    }
    
    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(0, 188, 212, 0.2);
    }
  `;

  @state() busy = false;
  @state() errorMsg = '';
  @state() okMsg = '';

  private async submit(e: Event) {
    e.preventDefault();
    this.errorMsg = ''; this.okMsg = '';
    const f = new FormData(e.target as HTMLFormElement);
    const email = String(f.get('email') || '').trim().toLowerCase();
    const password = String(f.get('password') || '');

    if (!email || !password) {
      this.errorMsg = 'Please enter email and password.';
      return;
    }

    this.busy = true;
    try {
      await authStore.signup(email, password);
      // If confirm-email is enabled, user must verify email:
      this.okMsg = 'Account created. Check your email to confirm, then sign in.';
      // Auto-swap to login so the user can sign in after confirming
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('goto-login', { bubbles: true, composed: true }));
      }, 800);
    } catch (err: any) {
      this.errorMsg = err?.message || 'Sign up failed.';
    } finally {
      this.busy = false;
    }
  }

  render() {
    return html`
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">Create account</h2>
          <p class="form-subtitle">Get started with your free account today</p>
        </div>
        
      ${this.errorMsg ? html`<div class="msg err">${this.errorMsg}</div>` : nothing}
      ${this.okMsg ? html`<div class="msg ok">${this.okMsg}</div>` : nothing}
      
      <form @submit=${(e:Event)=>this.submit(e)}>
        <div class="form-group">
          <label for="email">Email address</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            inputmode="email" 
            placeholder="you@domain.com"
            required
            autocomplete="email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Create a strong password"
            required
            autocomplete="new-password"
          />
        </div>
        
        <div class="row">
          <button class="btn" ?disabled=${this.busy} type="submit">
            ${this.busy ? 'Creating…' : 'Create account'}
          </button>
        </div>
        
        <div class="divider">or</div>
        
        <div style="text-align: center;">
          <button class="link" type="button" @click=${() => this.dispatchEvent(new CustomEvent('goto-login', {bubbles:true,composed:true}))}>
            Already have an account? <strong>Sign in</strong>
          </button>
        </div>
      </form>
      </div>
    `;
  }
}
declare global { interface HTMLElementTagNameMap { 'signup-form': SignupForm } }
