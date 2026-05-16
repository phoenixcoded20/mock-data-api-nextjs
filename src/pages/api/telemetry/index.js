import cors from 'utils/cors';
import { supabase } from 'utils/supabase';

// ==============================|| TELEMETRY - INSTALL STATS & DETAILS ||============================== //

export default async function handler(req, res) {
  await cors(req, res);

  // Fetch all records from Supabase
  const { data: records, error } = await supabase.from('apm_telemetry').select('*').order('timestamp', { ascending: true });

  if (error) {
    console.error('Supabase Fetch Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch telemetry' });
  }

  // Map snake_case from DB to camelCase for the API response
  const telemetryRecords = records.map((r) => ({
    id: r.id,
    ip: r.ip,
    package: r.package,
    version: r.version,
    source: r.source,
    os: r.os,
    nodeVersion: r.node_version,
    userAgent: r.user_agent,
    timestamp: r.timestamp
  }));

  // Unique IPs
  const uniqueIPs = [...new Set(telemetryRecords.map((r) => r.ip))];

  const totalInstalls = uniqueIPs.length;

  // Installs grouped by package name
  const byPackage = telemetryRecords.reduce((acc, r) => {
    const key = r.package;
    if (!acc[key]) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {});

  // Installs grouped by package version
  const byVersion = telemetryRecords.reduce((acc, r) => {
    const key = `${r.package}@${r.version}`;
    if (!acc[key]) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {});

  // Installs grouped by OS
  const byOS = telemetryRecords.reduce((acc, r) => {
    const key = r.os;
    if (!acc[key]) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {});

  // Installs grouped by source
  const bySource = telemetryRecords.reduce((acc, r) => {
    const key = r.source;
    if (!acc[key]) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {});

  // Recent installs (last 10)
  const recentInstalls = [...telemetryRecords].slice(-10).reverse();

  return res.status(200).json({
    totalInstalls,
    uniqueIPs,
    byPackage,
    byVersion,
    byOS,
    bySource,
    recentInstalls,
    installs: telemetryRecords
  });
}
