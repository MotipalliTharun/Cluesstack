# MiniInvo - Modern Web3 Inventory Management Platform

A cutting-edge inventory management platform with Web3 integration, featuring blockchain technology, NFTs, decentralized storage, and a beautiful modern UI.

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects with backdrop blur
- **Smooth Animations**: Fluid transitions and hover effects throughout
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on all devices
- **Modern Gradients**: Eye-catching color schemes and visual effects

### 🔗 Web3 Integration
- **Wallet Connection**: Connect MetaMask and other Web3 wallets
- **NFT Inventory Tokens**: Represent inventory items as NFTs on the blockchain
- **Smart Contract Integration**: Interact with blockchain smart contracts
- **Decentralized Storage**: IPFS integration for permanent, censorship-resistant storage
- **Crypto Payments**: Accept and process cryptocurrency transactions
- **Web3 Dashboard**: View blockchain stats, wallet balance, and network information

### 📦 Core Features
- Inventory management with AI-powered insights
- Community hub for sharing workflows
- Template marketplace
- User authentication (traditional + Web3)
- Real-time updates and notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Web3 wallet (MetaMask recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MiniInvo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **Framework**: Lit (Web Components)
- **Build Tool**: Vite
- **Web3**: Ethers.js
- **Backend**: Supabase
- **Styling**: CSS with CSS Variables
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── components/          # Lit web components
│   ├── web3-wallet.ts   # Wallet connection component
│   ├── nft-gallery.ts   # NFT display component
│   ├── web3-dashboard.ts # Web3 stats dashboard
│   ├── ipfs-upload.ts   # IPFS upload component
│   └── ...
├── lib/                 # Core libraries
│   ├── web3Store.ts     # Web3 state management
│   ├── ipfs.ts          # IPFS service
│   └── ...
├── styles/              # Global styles and themes
└── types/               # TypeScript type definitions
```

## 🔐 Web3 Features

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the navigation
2. Select your wallet provider (MetaMask, etc.)
3. Approve the connection request
4. Your wallet address and balance will be displayed

### NFT Inventory

- View your inventory items as NFTs
- Each item is represented as a unique token on the blockchain
- Verify authenticity and ownership on-chain

### IPFS Storage

- Upload inventory data to IPFS for decentralized storage
- Data is permanently stored and accessible via IPFS hash
- Censorship-resistant and distributed

## 🎨 UI Components

### Modern Design Elements
- Glassmorphism cards with backdrop blur
- Smooth hover animations
- Gradient backgrounds
- Modern button styles with glow effects
- Responsive grid layouts

### Dark Mode
- Toggle dark mode using the moon/sun icon in the navigation
- Preference is saved in localStorage
- Smooth theme transitions

## 📝 Development

### Adding New Components

1. Create a new `.ts` file in `src/components/`
2. Use the Lit component pattern:
```typescript
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  static styles = css`...`;
  render() { return html`...`; }
}
```

3. Import and use in your views

### Web3 Integration

The Web3 store (`web3Store`) manages wallet connections and blockchain interactions:

```typescript
import { web3Store } from "../lib/web3Store";

// Connect wallet
await web3Store.connect();

// Get current state
const state = web3Store.getState();

// Listen for changes
web3Store.on(() => {
  // Update UI
});
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires Web3 wallet extension for full functionality



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

motipallitharun@gmail.com

---

Built with ❤️ using modern web technologies and Web3
