// src/components/web3-wallet.ts
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { web3Store } from "../lib/web3Store";
import "../components/icon";

@customElement("web3-wallet")
export class Web3Wallet extends LitElement {
  @state() private connected = false;
  @state() private address: string | null = null;
  @state() private balance: string | null = null;
  @state() private connecting = false;
  @state() private error: string | null = null;

  private _offWeb3?: () => void;

  static styles = css`
    :host {
      display: block;
    }

    .wallet-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .connect-btn {
      appearance: none;
      border: 1px solid #00acc1;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      color: #fff;
      padding: 0.7rem 1.2rem;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 188, 212, 0.25);
      min-height: 44px; /* Touch target */
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    
    @media (max-width: 768px) {
      .connect-btn {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
        min-height: 44px;
      }
      
      .wallet-info {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
      }
      
      .address {
        font-size: 0.85rem;
      }
      
      .balance {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
      }
      
      .disconnect-btn {
        width: 100%;
        min-height: 44px;
      }
    }
    
    @media (max-width: 480px) {
      .connect-btn {
        padding: 0.55rem 0.875rem;
        font-size: 0.8rem;
      }
      
      .wallet-container {
        width: 100%;
      }
    }

    .connect-btn::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: left 0.5s;
    }

    .connect-btn:hover::before {
      left: 100%;
    }

    .connect-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
    }

    .connect-btn:active {
      transform: translateY(0);
    }

    .connect-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .wallet-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 188, 212, 0.2);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .address {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .address-prefix {
      color: #00bcd4;
    }

    .balance {
      padding: 0.3rem 0.6rem;
      background: linear-gradient(135deg, #e8fbff 0%, #d9f3f8 100%);
      border: 1px solid #cfeff5;
      border-radius: 8px;
      font-weight: 800;
      color: #026775;
      font-size: 0.85rem;
    }

    .disconnect-btn {
      appearance: none;
      border: 1px solid #e5e7eb;
      background: #fff;
      color: #64748b;
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;
    }

    .disconnect-btn:hover {
      background: #f8fafc;
      color: #0f172a;
      border-color: #cbd5e1;
    }

    .error {
      margin-top: 0.5rem;
      padding: 0.6rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #dc2626;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .wallet-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
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
    this.requestUpdate();
  }

  private async handleConnect() {
    this.connecting = true;
    this.error = null;
    try {
      await web3Store.connect();
    } catch (err: any) {
      this.error = err.message || "Failed to connect wallet";
      console.error("Connection error:", err);
    } finally {
      this.connecting = false;
    }
  }

  private async handleDisconnect() {
    await web3Store.disconnect();
  }

  private formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  render() {
    if (this.connected && this.address) {
      return html`
        <div class="wallet-info">
          <div class="address">
            <app-icon name="wallet" size="1rem" color="#00bcd4"></app-icon>
            ${this.formatAddress(this.address)}
          </div>
          ${this.balance
            ? html`<div class="balance">${parseFloat(this.balance).toFixed(4)} ETH</div>`
            : null}
          <button class="disconnect-btn" @click=${this.handleDisconnect}>
            Disconnect
          </button>
        </div>
        ${this.error ? html`<div class="error">${this.error}</div>` : null}
      `;
    }

    return html`
      <div class="wallet-container">
        <button
          class="connect-btn"
          @click=${this.handleConnect}
          ?disabled=${this.connecting}
        >
          ${this.connecting ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
      ${this.error ? html`<div class="error">${this.error}</div>` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "web3-wallet": Web3Wallet;
  }
}

