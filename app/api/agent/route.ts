import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        name: "Noise Traders Orchestrator",
        status: "active",
        wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
        platform: "Noise Traders",
        version: "1.0.0"
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        return NextResponse.json({
            status: "success",
            message: "Agent contacted",
            receivedAt: new Date().toISOString(),
            payload: body
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}
