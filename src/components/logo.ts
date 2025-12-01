// src/components/logo.ts - Creative animated Cluesstack icon
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-logo")
export class AppLogo extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-container {
      position: relative;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .icon-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Stacked layers representing "stack" */
    .stack-container {
      position: relative;
      width: 32px;
      height: 32px;
    }

    .layer {
      position: absolute;
      background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);
      transition: all 0.3s ease;
    }

    .layer-1 {
      width: 28px;
      height: 4px;
      bottom: 0;
      left: 2px;
      opacity: 0.6;
      animation: stackPulse 2s ease-in-out infinite;
      animation-delay: 0s;
    }

    .layer-2 {
      width: 30px;
      height: 4px;
      bottom: 6px;
      left: 1px;
      opacity: 0.75;
      animation: stackPulse 2s ease-in-out infinite;
      animation-delay: 0.2s;
    }

    .layer-3 {
      width: 32px;
      height: 5px;
      bottom: 12px;
      left: 0;
      opacity: 0.9;
      animation: stackPulse 2s ease-in-out infinite;
      animation-delay: 0.4s;
    }

    /* Search/Clue magnifying glass */
    .magnifier {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 18px;
      height: 18px;
      animation: searchRotate 3s ease-in-out infinite;
      transform-origin: center;
    }

    .magnifier-circle {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2.5px solid rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      top: 0;
      left: 0;
      box-shadow: 0 0 8px rgba(0, 188, 212, 0.6);
    }

    .magnifier-handle {
      position: absolute;
      width: 6px;
      height: 2.5px;
      background: rgba(255, 255, 255, 0.95);
      bottom: -2px;
      right: -2px;
      transform: rotate(45deg);
      border-radius: 2px;
      box-shadow: 0 0 6px rgba(0, 188, 212, 0.6);
    }

    /* Spotlight beam effect */
    .spotlight {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 4px;
      right: 4px;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.3) 0%,
        transparent 70%
      );
      border-radius: 50%;
      animation: spotlightPulse 2s ease-in-out infinite;
      pointer-events: none;
    }

    /* Hover effects */
    .logo-container:hover .layer {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);
    }

    .logo-container:hover .magnifier {
      animation: searchRotate 1.5s ease-in-out infinite;
    }

    .logo-container:hover .spotlight {
      animation: spotlightPulse 1s ease-in-out infinite;
    }

    /* Animations */
    @keyframes stackPulse {
      0%, 100% {
        transform: translateY(0) scaleY(1);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-1px) scaleY(1.05);
        opacity: 0.8;
      }
    }

    @keyframes searchRotate {
      0%, 100% {
        transform: rotate(0deg) scale(1);
      }
      25% {
        transform: rotate(-8deg) scale(1.05);
      }
      75% {
        transform: rotate(8deg) scale(1.05);
      }
    }

    @keyframes spotlightPulse {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.2);
      }
    }

    .brand-text {
      font-family: "Poppins", sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      color: #0f172a;
      letter-spacing: -0.02em;
      transition: color 0.2s ease;
    }

    :host(:hover) .brand-text {
      color: #00bcd4;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .logo-container {
        width: 38px;
        height: 38px;
      }

      .stack-container {
        width: 28px;
        height: 28px;
      }

      .layer-1 {
        width: 24px;
        height: 3.5px;
        left: 2px;
      }

      .layer-2 {
        width: 26px;
        height: 3.5px;
        bottom: 5px;
        left: 1px;
      }

      .layer-3 {
        width: 28px;
        height: 4px;
        bottom: 10px;
      }

      .magnifier {
        width: 16px;
        height: 16px;
        top: 1px;
        right: 1px;
      }

      .magnifier-circle {
        width: 10px;
        height: 10px;
        border-width: 2px;
      }

      .magnifier-handle {
        width: 5px;
        height: 2px;
      }

      .spotlight {
        width: 18px;
        height: 18px;
        top: 3px;
        right: 3px;
      }

      .brand-text {
        font-size: 1rem;
      }
    }
    
    @media (max-width: 640px) {
      .logo-container {
        width: 36px;
        height: 36px;
      }

      .stack-container {
        width: 26px;
        height: 26px;
      }

      .layer-1 {
        width: 22px;
        height: 3px;
      }

      .layer-2 {
        width: 24px;
        height: 3px;
        bottom: 4px;
      }

      .layer-3 {
        width: 26px;
        height: 3.5px;
        bottom: 9px;
      }

      .magnifier {
        width: 14px;
        height: 14px;
      }

      .magnifier-circle {
        width: 9px;
        height: 9px;
        border-width: 2px;
      }

      .magnifier-handle {
        width: 4px;
        height: 1.5px;
      }

      .spotlight {
        width: 16px;
        height: 16px;
      }

      .brand-text {
        font-size: 0.95rem;
      }
    }
    
    @media (max-width: 480px) {
      .logo-container {
        width: 32px;
        height: 32px;
      }

      .stack-container {
        width: 24px;
        height: 24px;
      }

      .layer-1 {
        width: 20px;
        height: 2.5px;
        left: 2px;
      }

      .layer-2 {
        width: 22px;
        height: 2.5px;
        bottom: 3px;
        left: 1px;
      }

      .layer-3 {
        width: 24px;
        height: 3px;
        bottom: 7px;
      }

      .magnifier {
        width: 12px;
        height: 12px;
        top: 0;
        right: 0;
      }

      .magnifier-circle {
        width: 8px;
        height: 8px;
        border-width: 1.5px;
      }

      .magnifier-handle {
        width: 3.5px;
        height: 1.5px;
        bottom: -1px;
        right: -1px;
      }

      .spotlight {
        width: 14px;
        height: 14px;
        top: 2px;
        right: 2px;
      }

      .brand-text {
        font-size: 0.9rem;
      }
      
      :host {
        gap: 0.4rem;
      }
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      .layer,
      .magnifier,
      .spotlight {
        animation: none;
      }
      
      .layer {
        transform: translateY(0);
      }
    }
  `;

  render() {
    return html`
      <div class="logo-container">
        <div class="icon-wrapper">
          <div class="stack-container">
            <div class="layer layer-1"></div>
            <div class="layer layer-2"></div>
            <div class="layer layer-3"></div>
            <div class="spotlight"></div>
            <div class="magnifier">
              <div class="magnifier-circle"></div>
              <div class="magnifier-handle"></div>
            </div>
          </div>
        </div>
      </div>
      <span class="brand-text">Cluesstack</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-logo": AppLogo;
  }
}

