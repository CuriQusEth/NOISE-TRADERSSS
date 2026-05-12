# Noise Traders

**Noise Traders** is a chaotic, high-energy crypto trading battle game. You are a **Noise Trader** â€” a degenerate who thrives in market chaos. Trade volatile meme coins, ride massive pumps and dumps, dodge FUD, and outsmart other traders in the noisiest markets on Base.

## Overview

This is an interactive simulation game designed with a mobile-first philosophy, utilizing Next-Gen UI with React, Vite, Tailwind CSS, Canvas, and Framer Motion. The overall goal is to handle the chaotic volatility of crypto meme coins, survive massive price swings, and rack up the highest scores without getting "rekt".

### On-chain Capabilities
This game interfaces with Base Mainnet (Test Mode capabilities) and utilizes advanced Web3 integrations:
- **ERC-8021:** Asset Attribution Standard support for recording high scores and failures natively on-chain.
- **ERC-8004:** Trustless Agents Interface for incorporating autonomous agent logic.
- **SIWE (Sign-In with Ethereum):** Message signing verification to confirm authenticity before submitting transactions.
- **Hybrid Leaderboard System:** Track the top and lowest degenerates securely via blockchain transactions.

### Multi-Agent Integration
The platform has built-in integration support for the **Noise Traders Orchestrator Agent**. This Agent natively exposes specific MCP (Model Context Protocol) and Agent-to-Agent (A2A) APIs designed to simulate and manage trading logic.

- Agent Card Details (`/.well-known/agent-card.json`)
- Agent Connection Endpoint (`/api/agent`)
- Command Execution API (`/api/mcp`) 

## How To Play
- Ensure you have a Web3-compatible wallet active (e.g., MetaMask, Coinbase Wallet).
- Select **Connect** from the Title Screen.
- Hit **Enter Market** to start the chaotic trading session.
- **Ape In (Buy/Long)** when you feel lucky, or **Rekt It (Dump/Short)** to exit before the market collapses.
- Monitor your **Noise Level**; higher noise equals extreme volatility.

## Tech Stack
- Frontend: React 19, TypeScript, Vite, TailwindCSS, Framer Motion
- Blockchain: Wagmi, Viem (Base configuration)
- Server Backend: Node.js, Express (Handles MCP APIs)
- Deployment: Base Chain Ready

## Running Locally

Clone this project and run:

```bash
npm install
npm run dev
```

Your server will be up and running locally at `http://localhost:3000`.
