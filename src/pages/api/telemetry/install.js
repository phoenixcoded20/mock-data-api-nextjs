import fs from 'fs';
import path from 'path';
import cors from 'utils/cors';
import { supabase } from 'utils/supabase';
import telemetryRecords from 'data/telemetry.json';

// ==============================|| TELEMETRY - INSTALL TRACKING ||============================== //

const TELEMETRY_FILE = path.join(process.cwd(), 'src/data/telemetry.json');

export default async function handler(req, res) {
  await cors(req, res, false);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { package: packageName, version, source, os, nodeVersion, timestamp, ip } = req.body || {};

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

  try {
    // 1. Insert into Supabase
    const { error: supabaseError } = await supabase.from('apm_telemetry').insert([
      {
        ip: record.ip,
        package: record.package,
        version: record.version,
        source: record.source,
        os: record.os,
        node_version: record.nodeVersion,
        user_agent: record.userAgent,
        timestamp: record.timestamp
      }
    ]);

    if (supabaseError) {
      console.error('Supabase Insertion Error:', supabaseError);
      return res.status(500).json({ success: false, message: 'Supabase Error', error: supabaseError });
    }

    // 2. Sync to local JSON (Backup/Legacy)
    telemetryRecords.push(record);
    fs.writeFileSync(TELEMETRY_FILE, JSON.stringify(telemetryRecords, null, 2), 'utf-8');

    return res.status(200).json({ success: true, message: 'Install tracked successfully', record });
  } catch (error) {
    console.error('Telemetry Processing Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
