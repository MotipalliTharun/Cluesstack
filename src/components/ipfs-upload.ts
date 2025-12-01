// src/components/ipfs-upload.ts
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ipfsService } from "../lib/ipfs";

@customElement("ipfs-upload")
export class IPFSUpload extends LitElement {
  @state() private uploading = false;
  @state() private hash: string | null = null;
  @state() private url: string | null = null;
  @state() private error: string | null = null;

  static styles = css`
    :host {
      display: block;
    }

    .upload-container {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 188, 212, 0.2);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .title {
      font-size: 1.2rem;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .upload-area {
      border: 2px dashed rgba(0, 188, 212, 0.3);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      background: linear-gradient(135deg, #f7fdff 0%, #e8fbff 100%);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .upload-area:hover {
      border-color: rgba(0, 188, 212, 0.5);
      background: linear-gradient(135deg, #e8fbff 0%, #d9f3f8 100%);
    }

    .upload-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .upload-text {
      color: #64748b;
      font-weight: 600;
      margin: 0.5rem 0;
    }

    input[type="file"] {
      display: none;
    }

    .btn {
      appearance: none;
      border: 1px solid #00acc1;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      color: #fff;
      padding: 0.7rem 1.2rem;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 1rem;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .result {
      margin-top: 1rem;
      padding: 1rem;
      background: linear-gradient(135deg, #e8fbff 0%, #d9f3f8 100%);
      border: 1px solid #cfeff5;
      border-radius: 12px;
    }

    .result-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 0.5rem;
    }

    .result-value {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      color: #0f172a;
      word-break: break-all;
    }

    .result-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #00bcd4;
      text-decoration: none;
      font-weight: 700;
    }

    .result-link:hover {
      text-decoration: underline;
    }

    .error {
      margin-top: 1rem;
      padding: 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      color: #dc2626;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .upload-container {
        padding: 1.25rem;
        border-radius: 14px;
      }
      
      .title {
        font-size: 1.1rem;
      }
      
      .upload-area {
        padding: 1.5rem;
      }
      
      .upload-icon {
        font-size: 2.5rem;
      }
      
      .btn {
        width: 100%;
        min-height: 48px;
      }
    }
    
    @media (max-width: 480px) {
      .upload-container {
        padding: 1rem;
      }
      
      .upload-area {
        padding: 1.25rem;
      }
      
      .upload-icon {
        font-size: 2rem;
      }
      
      .result-value {
        font-size: 0.8rem;
      }
    }
  `;

  private async handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.uploading = true;
    this.error = null;
    this.hash = null;
    this.url = null;

    try {
      const result = await ipfsService.upload(file);
      this.hash = result.hash;
      this.url = result.url;
    } catch (err: any) {
      this.error = err.message || "Upload failed";
    } finally {
      this.uploading = false;
    }
  }

  private triggerFileInput() {
    const input = this.renderRoot.querySelector('input[type="file"]') as HTMLInputElement;
    input?.click();
  }

  render() {
    return html`
      <div class="upload-container">
        <h3 class="title">
          <span>💎</span>
          IPFS Decentralized Storage
        </h3>
        <div class="upload-area" @click=${this.triggerFileInput}>
          <div class="upload-icon">📤</div>
          <div class="upload-text">Click to upload or drag and drop</div>
          <div class="upload-text" style="font-size: 0.85rem; margin-top: 0.25rem;">
            Store your inventory data on IPFS for permanent, decentralized access
          </div>
        </div>
        <input
          type="file"
          @change=${this.handleFileSelect}
          ?disabled=${this.uploading}
        />
        ${this.uploading
          ? html`<div style="text-align: center; margin-top: 1rem; color: #64748b; font-weight: 600;">
              Uploading to IPFS...
            </div>`
          : null}
        ${this.hash && this.url
          ? html`
              <div class="result">
                <div class="result-label">IPFS Hash (CID):</div>
                <div class="result-value">${this.hash}</div>
                <a href="${this.url}" target="_blank" rel="noopener noreferrer" class="result-link">
                  View on IPFS →
                </a>
              </div>
            `
          : null}
        ${this.error ? html`<div class="error">${this.error}</div>` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ipfs-upload": IPFSUpload;
  }
}

