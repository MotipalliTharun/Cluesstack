// src/components/web3-dashboard.ts
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { web3Store } from "../lib/web3Store";
import "../components/ipfs-upload";

@customElement("web3-dashboard")
export class Web3Dashboard extends LitElement {
  @state() private connected = false;
  @state() private address: string | null = null;
  @state() private balance: string | null = null;
  @state() private chainId: number | null = null;

  private _offWeb3?: () => void;

  static styles = css`
    :host {
      display: block;
    }

    .dashboard {
      display: grid;
      gap: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 188, 212, 0.2);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 188, 212, 0.2);
      border-color: rgba(0, 188, 212, 0.4);
    }

    .stat-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.02em;
    }

    .stat-value-small {
      font-size: 1.2rem;
    }

    .section {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 188, 212, 0.2);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .section-title {
      font-size: 1.3rem;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 1rem 0;
      letter-spacing: -0.02em;
    }

    .feature-list {
      display: grid;
      gap: 0.75rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: linear-gradient(135deg, #f7fdff 0%, #e8fbff 100%);
      border: 1px solid #d9f3f8;
      border-radius: 12px;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);
    }

    .feature-content {
      flex: 1;
    }

    .feature-title {
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.25rem 0;
    }

    .feature-desc {
      font-size: 0.9rem;
      color: #64748b;
      margin: 0;
    }

    .not-connected {
      text-align: center;
      padding: 3rem;
      color: #64748b;
    }

    .not-connected-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 0.875rem;
      }
      
      .stat-card {
        padding: 1.25rem;
        border-radius: 14px;
      }
      
      .stat-value {
        font-size: 1.75rem;
      }
      
      .stat-value-small {
        font-size: 1rem;
      }
      
      .section {
        padding: 1.25rem;
        border-radius: 14px;
      }
      
      .section-title {
        font-size: 1.1rem;
      }
      
      .feature-item {
        padding: 0.625rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .feature-icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }
      
      .feature-title {
        font-size: 0.95rem;
      }
      
      .feature-desc {
        font-size: 0.85rem;
      }
      
      .not-connected {
        padding: 2rem 1rem;
      }
      
      .not-connected-icon {
        font-size: 3rem;
      }
    }
    
    @media (max-width: 480px) {
      .stat-card {
        padding: 1rem;
      }
      
      .stat-value {
        font-size: 1.5rem;
      }
      
      .section {
        padding: 1rem;
      }
      
      .section-title {
        font-size: 1rem;
      }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.syncWeb3();
    this._offWeb3 = web3Store.on(() => this.syncWeb3());
  }

  disconnectedCallback(): void {
    this._offWeb3?.();
    super.disconnectedCallback();
  }

  private syncWeb3() {
    const state = web3Store.getState();
    this.connected = state.connected;
    this.address = state.address;
    this.balance = state.balance;
    this.chainId = state.chainId;
    this.requestUpdate();
  }

  render() {
    if (!this.connected) {
      return html`
        <div class="not-connected">
          <div class="not-connected-icon">🔗</div>
          <h2 style="margin: 0 0 0.5rem 0; color: #0f172a">Connect Your Wallet</h2>
          <p>Connect your Web3 wallet to view your blockchain dashboard and manage your inventory tokens.</p>
        </div>
      `;
    }

    return html`
      <div class="dashboard">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Wallet Balance</div>
            <div class="stat-value">
              ${this.balance ? parseFloat(this.balance).toFixed(4) : "0.0000"} ETH
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Network</div>
            <div class="stat-value stat-value-small">
              ${this.chainId === 1 ? "Ethereum" : this.chainId === 5 ? "Goerli" : this.chainId === 11155111 ? "Sepolia" : `Chain ${this.chainId}`}
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Connected Address</div>
            <div class="stat-value stat-value-small" style="font-family: 'Courier New', monospace; font-size: 0.9rem; word-break: break-all;">
              ${this.address}
            </div>
          </div>
        </div>

        <div class="section">
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=300&fit=crop&auto=format" 
              alt="Web3 blockchain technology"
              style="width: 100%; max-width: 700px; height: auto; border-radius: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); margin: 0 auto; display: block;"
              loading="lazy"
            />
          </div>
          <h2 class="section-title">Web3 Features</h2>
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">
                <img 
                  src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=200&h=200&fit=crop&auto=format" 
                  alt="NFT"
                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                  loading="lazy"
                />
              </div>
              <div class="feature-content">
                <div class="feature-title">NFT Inventory Tokens</div>
                <div class="feature-desc">Your inventory items are represented as NFTs on the blockchain, ensuring authenticity and ownership.</div>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <img 
                  src="https://images.unsplash.com/photo-1639322537504-64d0a3e70491?w=200&h=200&fit=crop&auto=format" 
                  alt="Decentralized storage"
                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                  loading="lazy"
                />
              </div>
              <div class="feature-content">
                <div class="feature-title">Decentralized Storage</div>
                <div class="feature-desc">Inventory data is stored on IPFS for permanent, decentralized access.</div>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <img 
                  src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=200&fit=crop&auto=format" 
                  alt="Smart contracts"
                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                  loading="lazy"
                />
              </div>
              <div class="feature-content">
                <div class="feature-title">Smart Contract Integration</div>
                <div class="feature-desc">Interact with smart contracts for automated inventory management and transactions.</div>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <img 
                  src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=200&fit=crop&auto=format" 
                  alt="Token payments"
                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                  loading="lazy"
                />
              </div>
              <div class="feature-content">
                <div class="feature-title">Token Payments</div>
                <div class="feature-desc">Accept and process payments using cryptocurrency tokens.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section" style="margin-top: 1.5rem;">
          <h2 class="section-title">Decentralized Storage</h2>
          <ipfs-upload></ipfs-upload>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "web3-dashboard": Web3Dashboard;
  }
}

