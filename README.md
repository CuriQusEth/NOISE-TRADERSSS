# Noise Traders

**Noise Traders** is a chaotic, high-energy crypto trading battle game. You are a **Noise Trader** — a degenerate who thrives in market chaos. Trade volatile meme coins, ride massive pumps and dumps, dodge FUD, and outsmart other traders in the noisiest markets.

## Overview

This is an interactive simulation game designed with a mobile-first philosophy, utilizing Next-Gen UI with React, Tailwind CSS, Canvas, and Framer Motion. The overall goal is to handle the chaotic volatility of crypto meme coins, survive massive price swings, and rack up the highest scores without getting "rekt".

## Tech Stack
- Frontend: React 19, TypeScript, TailwindCSS, Framer Motion
- Blockchain Integration: Wagmi, Viem (Base configuration)
- Agent API Structure: Next.js App Router Support
- Deployment: Web3 / Base Chain Ready

## MCP Connection Guide
The project exposes an active MCP (Model Context Protocol) endpoint.
- **Endpoint URL:** `https://noise-tradersss.vercel.app/api/mcp` (or your active deployment base URL)
- **Features:** Supports `tools/list`, `tools/call`, `prompts/list`, and `resources/list` methods (implementations contain placeholder logic ready for extension).
- **Headers Required:** `Content-Type: application/json`

## Agent Registration Info
The **Noise Traders Orchestrator Agent** acts as an intelligent layer overseeing trading operations:
- **Capabilities:** `noise-trading`, `market-sentiment-analysis`, `chaotic-market-automation`, `multi-strategy-management`, `high-frequency-operations`, `mcp-command-execution`
- **Agent Card Details:** Hosted dynamically at `/.well-known/agent-card.json`
- **Main Agent API:** Exposed at `/api/agent`

## How To Run Locally

Clone this project and install dependencies:

```bash
npm install
npm run dev
```

Your environment will start locally at `http://localhost:3000`.
