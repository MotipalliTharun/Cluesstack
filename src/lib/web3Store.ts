// src/lib/web3Store.ts
import { ethers } from "ethers";

export interface Web3State {
  connected: boolean;
  address: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  chainId: number | null;
  balance: string | null;
}

class Web3Store {
  private state: Web3State = {
    connected: false,
    address: null,
    provider: null,
    signer: null,
    chainId: null,
    balance: null,
  };

  private listeners: Set<() => void> = new Set();

  on(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  getState(): Web3State {
    return { ...this.state };
  }

  async connect(): Promise<void> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask or another Web3 wallet is required");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);

      this.state = {
        connected: true,
        address: accounts[0],
        provider,
        signer,
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
      };

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          this.state.address = accounts[0];
          this.updateBalance();
          this.notify();
        }
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      this.notify();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.state = {
      connected: false,
      address: null,
      provider: null,
      signer: null,
      chainId: null,
      balance: null,
    };
    this.notify();
  }

  async updateBalance(): Promise<void> {
    if (!this.state.provider || !this.state.address) return;

    try {
      const balance = await this.state.provider.getBalance(this.state.address);
      this.state.balance = ethers.formatEther(balance);
      this.notify();
    } catch (error) {
      console.error("Failed to update balance:", error);
    }
  }

  async switchChain(chainId: number): Promise<void> {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, try to add it
        throw new Error("Please add this network to your wallet");
      }
      throw error;
    }
  }
}

export const web3Store = new Web3Store();

