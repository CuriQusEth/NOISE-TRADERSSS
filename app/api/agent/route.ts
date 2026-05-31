import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getCorsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
    };
}

export async function GET() {
    return NextResponse.json({
        name: "Noise Traders Orchestrator",
        status: "active",
        wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
        platform: "Noise Traders",
        version: "1.0.0"
    }, {
        headers: getCorsHeaders()
    });
}

export async function POST(req: Request) {
    try {
        let body = {};
        try {
            const text = await req.text();
            body = text ? JSON.parse(text) : {};
        } catch {
            // body is empty object
        }

        return NextResponse.json({
            status: "success",
            message: "Agent contacted",
            receivedAt: new Date().toISOString(),
            payload: body
        }, {
            headers: getCorsHeaders()
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: getCorsHeaders() });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        status: 200,
        headers: getCorsHeaders()
    });
}
