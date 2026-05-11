import fs from 'fs';
import path from 'path';
import cors from 'utils/cors';
import telemetryRecords from 'data/telemetry.json';

// ==============================|| TELEMETRY - INSTALL TRACKING ||============================== //

const TELEMETRY_FILE = path.join(process.cwd(), 'src/data/telemetry.json');

export default async function handler(req, res) {
  await cors(req, res, false);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { package: packageName, version, source, os, nodeVersion, timestamp } = req.body || {};

  // Extract IP address from request headers
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown';

  // If IP is loopback (localhost), fetch real public IP
  if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip || ip;
    } catch {
      // keep the loopback IP if the lookup fails
    }
  }

  // Check if this IP has already been recorded for the same package
  const alreadyExists = telemetryRecords.some((r) => r.ip === ip && r.package === (packageName || 'unknown'));
  if (alreadyExists) {
    return res.status(200).json({ success: false, message: 'Install already tracked for this IP' });
  }

  const record = {
    id: telemetryRecords.length + 1,
    ip,
    package: packageName || 'unknown',
    version: version || 'unknown',
    source: source || 'unknown',
    os: os || 'unknown',
    nodeVersion: nodeVersion || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
    timestamp: timestamp || new Date().toISOString()
  };

  // Push to in-memory array
  telemetryRecords.push(record);

  // Sync in-memory data to telemetry.json
  fs.writeFileSync(TELEMETRY_FILE, JSON.stringify(telemetryRecords, null, 2), 'utf-8');

  return res.status(200).json({ success: true, message: 'Install tracked successfully', record });
}
