import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add body parsing middleware
  app.use(express.json());

  // Add basic CORS middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // MCP API Route
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Noise Traders Orchestrator",
      status: "active",
      description: "Active MCP server for Noise Traders Orchestrator Agent",
      network: "Base Mainnet (Denim Upgrade)",
      block_cadence: "200ms",
      chain_id: 8453,
      capabilities: [
        "noise-trading",
        "market-sentiment-analysis",
        "chaotic-market-automation",
        "multi-strategy-management",
        "high-frequency-operations",
        "mcp-command-execution"
      ],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const method = body.method;

      if (method === 'initialize') {
        res.json({
            jsonrpc: "2.0",
            id: body.id,
            result: {
                protocolVersion: "2024-11-05",
                capabilities: { tools: {}, resources: {}, prompts: {} },
                serverInfo: { name: "Noise Traders Orchestrator", version: "1.0.0" }
            }
        });
        return;
      }

      if (method === 'tools/list') {
        res.json({
            jsonrpc: "2.0",
            id: body.id,
            result: {
                tools: [
                    { name: 'get_race_status', description: '[PLACEHOLDER] Get current race status', inputSchema: { type: "object", properties: {} } },
                    { name: 'start_race', description: '[PLACEHOLDER] Start a new race', inputSchema: { type: "object", properties: {} } },
                    { name: 'get_leaderboard', description: '[PLACEHOLDER] Get current leaderboard', inputSchema: { type: "object", properties: {} } },
                    { name: 'optimize_speed', description: '[PLACEHOLDER] Optimize speed parameters', inputSchema: { type: "object", properties: {} } },
                    { name: 'get_track_info', description: '[PLACEHOLDER] Get track information', inputSchema: { type: "object", properties: {} } }
                ]
            }
        });
        return;
      }

      if (method === 'tools/call') {
        res.json({
            jsonrpc: "2.0",
            id: body.id,
            result: {
                content: [
                    { type: "text", text: `[PLACEHOLDER] Execution result for ${body.params?.name}` }
                ]
            }
        });
        return;
      }

      if (method === 'prompts/list') {
        res.json({ jsonrpc: "2.0", id: body.id, result: { prompts: [] } });
        return;
      }

      if (method === 'resources/list') {
        res.json({ jsonrpc: "2.0", id: body.id, result: { resources: [] } });
        return;
      }

      res.json({
        status: "success",
        message: "MCP command received",
        agent: "Noise Traders Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  // Agent API Route
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Noise Traders Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Noise Traders",
      network: "Base Mainnet (Denim Upgrade)",
      chain_id: 8453,
      block_cadence: "200ms",
      version: "1.0.0"
    });
  });

  app.post("/api/agent", (req, res) => {
    try {
      res.json({
        status: "success",
        message: "Agent contacted",
        receivedAt: new Date().toISOString(),
        payload: req.body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: this serves from the dist directory compiled by vite
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
