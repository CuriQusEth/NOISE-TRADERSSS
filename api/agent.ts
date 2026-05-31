export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      name: "Noise Traders Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Noise Traders",
      version: "1.0.0"
    });
    return;
  }

  if (req.method === 'POST') {
    res.status(200).json({
      status: "success",
      message: "Agent contacted",
      receivedAt: new Date().toISOString(),
      payload: req.body
    });
    return;
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
