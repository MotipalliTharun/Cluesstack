// src/components/nft-gallery.ts
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { web3Store } from "../lib/web3Store";

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  tokenId: string;
  contractAddress: string;
}

@customElement("nft-gallery")
export class NFTGallery extends LitElement {
  @state() private nfts: NFT[] = [];
  @state() private loading = false;
  @state() private error: string | null = null;

  static styles = css`
    :host {
      display: block;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .nft-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 188, 212, 0.2);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      cursor: pointer;
    }

    .nft-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 188, 212, 0.25);
      border-color: rgba(0, 188, 212, 0.4);
    }

    .nft-image {
      width: 100%;
      height: 280px;
      object-fit: cover;
      background: linear-gradient(135deg, #e8fbff 0%, #d9f3f8 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }

    .nft-content {
      padding: 1rem;
    }

    .nft-name {
      font-weight: 900;
      font-size: 1.1rem;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.02em;
    }

    .nft-description {
      color: #64748b;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0 0 0.75rem 0;
    }

    .nft-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px solid #eef2f6;
      font-size: 0.8rem;
      color: #64748b;
    }

    .token-id {
      font-family: "Courier New", monospace;
      font-weight: 700;
      color: #00bcd4;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: #64748b;
      font-weight: 600;
    }

    .error {
      padding: 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      color: #dc2626;
      text-align: center;
      font-weight: 600;
    }

    .empty {
      text-align: center;
      padding: 3rem;
      color: #64748b;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    @media (max-width: 768px) {
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.25rem;
      }
      
      .nft-card {
        border-radius: 14px;
      }
      
      .nft-image {
        height: 240px;
      }
      
      .nft-content {
        padding: 0.875rem;
      }
      
      .nft-name {
        font-size: 1rem;
      }
      
      .nft-description {
        font-size: 0.85rem;
      }
    }
    
    @media (max-width: 640px) {
      .gallery {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .nft-image {
        height: 280px;
      }
      
      .loading, .empty {
        padding: 2rem 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .nft-card {
        border-radius: 12px;
      }
      
      .nft-image {
        height: 240px;
      }
      
      .nft-content {
        padding: 0.75rem;
      }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadNFTs();
  }

  private async loadNFTs() {
    const state = web3Store.getState();
    if (!state.connected || !state.address) {
      this.nfts = [];
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      // Mock NFT data - in production, you'd fetch from a contract or API
      // This is a placeholder that demonstrates the UI
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.nfts = [
        {
          id: "1",
          name: "Inventory Item #001",
          description: "Premium inventory token representing a high-value item in your warehouse.",
          image: "https://via.placeholder.com/400x400/00bcd4/ffffff?text=Item+001",
          tokenId: "1",
          contractAddress: "0x1234...5678",
        },
        {
          id: "2",
          name: "Inventory Item #002",
          description: "Standard inventory token with verified authenticity on-chain.",
          image: "https://via.placeholder.com/400x400/00acc1/ffffff?text=Item+002",
          tokenId: "2",
          contractAddress: "0x1234...5678",
        },
        {
          id: "3",
          name: "Inventory Item #003",
          description: "Limited edition inventory token with special metadata.",
          image: "https://via.placeholder.com/400x400/026775/ffffff?text=Item+003",
          tokenId: "3",
          contractAddress: "0x1234...5678",
        },
      ];
    } catch (err: any) {
      this.error = err.message || "Failed to load NFTs";
      console.error("NFT loading error:", err);
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading NFTs...</div>`;
    }

    if (this.error) {
      return html`<div class="error">${this.error}</div>`;
    }

    if (this.nfts.length === 0) {
      return html`
        <div class="empty">
          <div class="empty-icon">🎨</div>
          <p>No NFTs found. Connect your wallet to view your inventory tokens.</p>
        </div>
      `;
    }

    return html`
      <div class="gallery">
        ${this.nfts.map(
          (nft) => html`
            <div class="nft-card">
              <div class="nft-image">${nft.image ? html`<img src="${nft.image}" alt="${nft.name}" />` : "🎨"}</div>
              <div class="nft-content">
                <h3 class="nft-name">${nft.name}</h3>
                <p class="nft-description">${nft.description}</p>
                <div class="nft-meta">
                  <span class="token-id">Token #${nft.tokenId}</span>
                  <span>On-chain</span>
                </div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nft-gallery": NFTGallery;
  }
}

