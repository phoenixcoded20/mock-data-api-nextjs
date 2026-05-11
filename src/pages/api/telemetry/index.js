import cors from 'utils/cors';
import telemetryRecords from 'data/telemetry.json';

// ==============================|| TELEMETRY - INSTALL STATS & DETAILS ||============================== //

export default async function handler(req, res) {
  await cors(req, res);

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
  const recentInstalls = telemetryRecords.slice(-10).reverse();

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
