import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        protocol: "MCP",
        version: "1.0.0",
        name: "Noise Traders Orchestrator",
        status: "active",
        description: "Active MCP server for Noise Traders Orchestrator Agent",
        capabilities: [
            "noise-trading",
            "market-sentiment-analysis",
            "chaotic-market-automation",
            "multi-strategy-management",
            "high-frequency-operations",
            "mcp-command-execution"
        ],
        timestamp: new Date().toISOString()
    }, { headers: getCorsHeaders() });
}

export async function POST(req: Request) {
    try {
        let body;
        try {
            const text = await req.text();
            body = text ? JSON.parse(text) : {};
        } catch {
            body = {};
        }

        const method = body.method;

        // MCP standard logic & tools listed as requested
        if (method === 'tools/list') {
            return NextResponse.json({
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
            }, { headers: getCorsHeaders() });
        }

        if (method === 'tools/call') {
            return NextResponse.json({
                jsonrpc: "2.0",
                id: body.id,
                result: {
                    content: [
                        { type: "text", text: `[PLACEHOLDER] Execution result for ${body.params?.name}` }
                    ]
                }
            }, { headers: getCorsHeaders() });
        }

        if (method === 'prompts/list') {
            return NextResponse.json({ jsonrpc: "2.0", id: body.id, result: { prompts: [] } }, { headers: getCorsHeaders() });
        }

        if (method === 'resources/list') {
            return NextResponse.json({ jsonrpc: "2.0", id: body.id, result: { resources: [] } }, { headers: getCorsHeaders() });
        }

        // Generic fallback for initialization
        if (method === 'initialize') {
            return NextResponse.json({
                jsonrpc: "2.0",
                id: body.id,
                result: {
                    protocolVersion: "2024-11-05",
                    capabilities: { tools: {}, resources: {}, prompts: {} },
                    serverInfo: { name: "Noise Traders Orchestrator", version: "1.0.0" }
                }
            }, { headers: getCorsHeaders() });
        }

        return NextResponse.json({
            status: "success",
            message: "MCP command received",
            agent: "Noise Traders Orchestrator",
            receivedAt: new Date().toISOString(),
            payload: body
        }, { headers: getCorsHeaders() });

    } catch (error) {
        return NextResponse.json({ error: "Invalid MCP request" }, { status: 400, headers: getCorsHeaders() });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: getCorsHeaders() });
}

function getCorsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
    };
}
