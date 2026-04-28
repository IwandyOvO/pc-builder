import React, { useMemo, useState } from "react";
import {
  Cpu,
  Monitor,
  Zap,
  HardDrive,
  Fan,
  Box,
  Sparkles,
  Keyboard,
  Mouse,
  Headphones,
} from "lucide-react";

// Replace this with your real Amazon Associates tracking ID later.
// Example: const AFFILIATE_TAG = "yourtag-20";
const AFFILIATE_TAG = "YOUR-AMAZON-TAG-20";

function amazonSearchLink(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_TAG}`;
}

function openAmazonSearch(query) {
  window.open(amazonSearchLink(query), "_blank", "noopener,noreferrer");
}

function cleanPartQuery(part, title = "") {
  if (!part?.name) return "";
  const base = part.name
    .replace("Workstation Set", "")
    .replace("AI Workstation Set", "")
    .replace("Storage Pack", "")
    .trim();
  if (title === "Power Supply") return base.replace("Power Supply", "PSU");
  return base;
}

const parts = {
  cpu: [
    // Budget / home office
    { name: "AMD Ryzen 5 5600G", brand: "AMD", socket: "AM4", price: 120, gaming: 52, creator: 50, ai: 30, cores: 6, power: 65, tier: "budget" },
    { name: "AMD Ryzen 5 5600", brand: "AMD", socket: "AM4", price: 125, gaming: 70, creator: 55, ai: 40, cores: 6, power: 65, tier: "budget" },
    { name: "AMD Ryzen 5 7500F", brand: "AMD", socket: "AM5", price: 160, gaming: 78, creator: 65, ai: 52, cores: 6, power: 65, tier: "budget" },
    { name: "AMD Ryzen 5 7600", brand: "AMD", socket: "AM5", price: 190, gaming: 82, creator: 70, ai: 58, cores: 6, power: 65, tier: "mainstream" },
    { name: "AMD Ryzen 5 7600X", brand: "AMD", socket: "AM5", price: 215, gaming: 84, creator: 72, ai: 60, cores: 6, power: 105, tier: "mainstream" },

    // AMD Ryzen 7
    { name: "AMD Ryzen 7 7700", brand: "AMD", socket: "AM5", price: 260, gaming: 86, creator: 82, ai: 68, cores: 8, power: 65, tier: "mainstream" },
    { name: "AMD Ryzen 7 7700X", brand: "AMD", socket: "AM5", price: 290, gaming: 88, creator: 88, ai: 70, cores: 8, power: 105, tier: "mainstream" },
    { name: "AMD Ryzen 7 7800X3D", brand: "AMD", socket: "AM5", price: 375, gaming: 100, creator: 78, ai: 66, cores: 8, power: 120, tier: "gaming" },
    { name: "AMD Ryzen 7 9700X", brand: "AMD", socket: "AM5", price: 330, gaming: 91, creator: 94, ai: 76, cores: 8, power: 65, tier: "mainstream" },
    { name: "AMD Ryzen 7 9800X3D", brand: "AMD", socket: "AM5", price: 480, gaming: 108, creator: 86, ai: 72, cores: 8, power: 120, tier: "gaming" },

    // AMD Ryzen 9
    { name: "AMD Ryzen 9 7900", brand: "AMD", socket: "AM5", price: 360, gaming: 88, creator: 98, ai: 82, cores: 12, power: 65, tier: "creator" },
    { name: "AMD Ryzen 9 7900X", brand: "AMD", socket: "AM5", price: 390, gaming: 90, creator: 105, ai: 85, cores: 12, power: 170, tier: "creator" },
    { name: "AMD Ryzen 9 7900X3D", brand: "AMD", socket: "AM5", price: 430, gaming: 98, creator: 102, ai: 84, cores: 12, power: 120, tier: "enthusiast" },
    { name: "AMD Ryzen 9 7950X", brand: "AMD", socket: "AM5", price: 540, gaming: 94, creator: 115, ai: 92, cores: 16, power: 170, tier: "creator" },
    { name: "AMD Ryzen 9 7950X3D", brand: "AMD", socket: "AM5", price: 600, gaming: 103, creator: 112, ai: 92, cores: 16, power: 120, tier: "enthusiast" },
    { name: "AMD Ryzen 9 9900X", brand: "AMD", socket: "AM5", price: 450, gaming: 95, creator: 112, ai: 90, cores: 12, power: 120, tier: "creator" },
    { name: "AMD Ryzen 9 9950X", brand: "AMD", socket: "AM5", price: 650, gaming: 99, creator: 128, ai: 102, cores: 16, power: 170, tier: "enthusiast" },
    { name: "AMD Ryzen 9 9950X3D", brand: "AMD", socket: "AM5", price: 750, gaming: 110, creator: 126, ai: 104, cores: 16, power: 170, tier: "enthusiast" },

    // Intel Core / Core Ultra
    { name: "Intel Core i3-13100", brand: "Intel", socket: "LGA1700", price: 115, gaming: 58, creator: 45, ai: 35, cores: 4, power: 60, tier: "budget" },
    { name: "Intel Core i5-13400", brand: "Intel", socket: "LGA1700", price: 185, gaming: 74, creator: 68, ai: 50, cores: 10, power: 65, tier: "budget" },
    { name: "Intel Core i5-14400F", brand: "Intel", socket: "LGA1700", price: 170, gaming: 72, creator: 62, ai: 48, cores: 10, power: 65, tier: "budget" },
    { name: "Intel Core i5-14600KF", brand: "Intel", socket: "LGA1700", price: 285, gaming: 88, creator: 86, ai: 68, cores: 14, power: 125, tier: "mainstream" },
    { name: "Intel Core i7-14700K", brand: "Intel", socket: "LGA1700", price: 410, gaming: 94, creator: 105, ai: 85, cores: 20, power: 125, tier: "creator" },
    { name: "Intel Core i7-14700KF", brand: "Intel", socket: "LGA1700", price: 390, gaming: 93, creator: 102, ai: 82, cores: 20, power: 125, tier: "creator" },
    { name: "Intel Core i9-14900K", brand: "Intel", socket: "LGA1700", price: 520, gaming: 96, creator: 112, ai: 88, cores: 24, power: 125, tier: "creator" },
    { name: "Intel Core i9-14900KF", brand: "Intel", socket: "LGA1700", price: 500, gaming: 97, creator: 114, ai: 88, cores: 24, power: 125, tier: "creator" },
    { name: "Intel Core Ultra 7 265K", brand: "Intel", socket: "LGA1851", price: 400, gaming: 92, creator: 108, ai: 92, cores: 20, power: 125, tier: "creator" },
    { name: "Intel Core Ultra 9 285K", brand: "Intel", socket: "LGA1851", price: 590, gaming: 96, creator: 122, ai: 106, cores: 24, power: 125, tier: "enthusiast" },

    // Workstation
    { name: "AMD Threadripper 7970X", brand: "AMD", socket: "sTR5", price: 2500, gaming: 88, creator: 155, ai: 145, cores: 32, power: 350, tier: "workstation" },
    { name: "AMD Threadripper 7980X", brand: "AMD", socket: "sTR5", price: 5000, gaming: 90, creator: 185, ai: 172, cores: 64, power: 350, tier: "workstation" },
    { name: "AMD Threadripper PRO 7995WX", brand: "AMD", socket: "sTR5", price: 10000, gaming: 92, creator: 220, ai: 210, cores: 96, power: 400, tier: "workstation" },
  ],
  gpu: [
    { name: "Integrated Graphics", brand: "Integrated", price: 0, gaming: 25, creator: 25, ai: 10, vram: 0, power: 0, length: 0, tier: "basic" },
    { name: "AMD RX 6600", brand: "AMD", price: 200, gaming: 58, creator: 42, ai: 30, vram: 8, power: 132, length: 240, tier: "budget" },
    { name: "NVIDIA RTX 3050", brand: "NVIDIA", price: 220, gaming: 55, creator: 48, ai: 42, vram: 8, power: 130, length: 240, tier: "budget" },
    { name: "Intel Arc A580", brand: "Intel", price: 180, gaming: 52, creator: 46, ai: 35, vram: 8, power: 175, length: 250, tier: "budget" },
    { name: "NVIDIA RTX 4060", brand: "NVIDIA", price: 300, gaming: 65, creator: 58, ai: 55, vram: 8, power: 115, length: 240, tier: "mainstream" },
    { name: "NVIDIA RTX 4070 Super", brand: "NVIDIA", price: 610, gaming: 94, creator: 86, ai: 88, vram: 12, power: 220, length: 300, tier: "gaming" },
    { name: "NVIDIA RTX 4070 Ti Super", brand: "NVIDIA", price: 800, gaming: 105, creator: 96, ai: 108, vram: 16, power: 285, length: 310, tier: "gaming" },
    { name: "NVIDIA RTX 4080 Super", brand: "NVIDIA", price: 1050, gaming: 120, creator: 110, ai: 126, vram: 16, power: 320, length: 330, tier: "gaming" },
    { name: "NVIDIA RTX 4090", brand: "NVIDIA", price: 1850, gaming: 140, creator: 135, ai: 170, vram: 24, power: 450, length: 340, tier: "enthusiast" },
    { name: "Dual NVIDIA RTX 4090 Workstation Set", brand: "NVIDIA", price: 4500, gaming: 120, creator: 220, ai: 310, vram: 48, power: 900, length: 340, tier: "workstation" },
    { name: "NVIDIA RTX 6000 Ada 48GB", brand: "NVIDIA", price: 6800, gaming: 105, creator: 245, ai: 350, vram: 48, power: 300, length: 300, tier: "workstation" },
    { name: "Dual RTX 6000 Ada 96GB Workstation Set", brand: "NVIDIA", price: 13600, gaming: 110, creator: 360, ai: 620, vram: 96, power: 600, length: 320, tier: "workstation" },
    { name: "Quad RTX 6000 Ada 192GB AI Workstation Set", brand: "NVIDIA", price: 27200, gaming: 112, creator: 520, ai: 1100, vram: 192, power: 1200, length: 320, tier: "workstation" },
    { name: "AMD RX 7700 XT", brand: "AMD", price: 430, gaming: 82, creator: 62, ai: 48, vram: 12, power: 245, length: 280, tier: "gaming" },
    { name: "AMD RX 7800 XT", brand: "AMD", price: 500, gaming: 92, creator: 70, ai: 55, vram: 16, power: 263, length: 300, tier: "gaming" },
    { name: "AMD RX 7900 GRE", brand: "AMD", price: 560, gaming: 98, creator: 75, ai: 58, vram: 16, power: 260, length: 305, tier: "gaming" },
    { name: "AMD RX 7900 XTX", brand: "AMD", price: 930, gaming: 116, creator: 88, ai: 64, vram: 24, power: 355, length: 340, tier: "gaming" },
  ],
  motherboard: [
    { name: "B550M Motherboard", socket: "AM4", size: "mATX", wifi: false, price: 85 },
    { name: "B550 WiFi Motherboard", socket: "AM4", size: "ATX", wifi: true, price: 125 },
    { name: "B650 WiFi ATX Motherboard", socket: "AM5", size: "ATX", wifi: true, price: 190 },
    { name: "B650M WiFi Motherboard", socket: "AM5", size: "mATX", wifi: true, price: 165 },
    { name: "X670E Premium WiFi Motherboard", socket: "AM5", size: "ATX", wifi: true, price: 390 },
    { name: "X870 WiFi Motherboard", socket: "AM5", size: "ATX", wifi: true, price: 310 },
    { name: "X870E Premium WiFi Motherboard", socket: "AM5", size: "ATX", wifi: true, price: 480 },
    { name: "B760M WiFi Motherboard", socket: "LGA1700", size: "mATX", wifi: true, price: 150 },
    { name: "Z790 WiFi Motherboard", socket: "LGA1700", size: "ATX", wifi: true, price: 260 },
    { name: "Z790 Premium Creator Motherboard", socket: "LGA1700", size: "ATX", wifi: true, price: 440 },
    { name: "Z890 WiFi Motherboard", socket: "LGA1851", size: "ATX", wifi: true, price: 300 },
    { name: "Z890 Premium Creator Motherboard", socket: "LGA1851", size: "ATX", wifi: true, price: 520 },
    { name: "TRX50 Creator WiFi Workstation Motherboard", socket: "sTR5", size: "ATX", wifi: true, price: 750 },
    { name: "WRX90 Professional Workstation Motherboard", socket: "sTR5", size: "ATX", wifi: true, price: 1300 },
  ],
  ram: [
    { name: "16GB DDR4 3200MHz", platform: "AM4", sizeGB: 16, price: 40, score: 45 },
    { name: "32GB DDR4 3600MHz", platform: "AM4", sizeGB: 32, price: 70, score: 65 },
    { name: "16GB DDR5 5600MHz", platform: "AM5/LGA1700", sizeGB: 16, price: 55, score: 55 },
    { name: "32GB DDR5 6000MHz", platform: "AM5/LGA1700", sizeGB: 32, price: 95, score: 78 },
    { name: "64GB DDR5 6000MHz", platform: "AM5/LGA1700", sizeGB: 64, price: 180, score: 95 },
    { name: "128GB DDR5 6000MHz", platform: "AM5/LGA1700", sizeGB: 128, price: 380, score: 120 },
    { name: "256GB DDR5 Workstation ECC", platform: "sTR5", sizeGB: 256, price: 1200, score: 180 },
    { name: "512GB DDR5 Workstation ECC", platform: "sTR5", sizeGB: 512, price: 2800, score: 260 },
    { name: "1TB DDR5 Workstation ECC", platform: "sTR5", sizeGB: 1024, price: 7000, score: 380 },
  ],
  storage: [
    { name: "500GB NVMe SSD", sizeTB: 0.5, price: 40, score: 50 },
    { name: "1TB NVMe Gen4 SSD", sizeTB: 1, price: 70, score: 70 },
    { name: "2TB NVMe Gen4 SSD", sizeTB: 2, price: 125, score: 90 },
    { name: "4TB NVMe Gen4 SSD", sizeTB: 4, price: 260, score: 100 },
    { name: "8TB NVMe Gen4 SSD", sizeTB: 8, price: 650, score: 125 },
    { name: "16TB NVMe RAID Storage Pack", sizeTB: 16, price: 1400, score: 165 },
    { name: "32TB NVMe Workstation Storage Pack", sizeTB: 32, price: 3000, score: 220 },
    { name: "64TB NVMe Enterprise Storage Pack", sizeTB: 64, price: 9000, score: 360 },
  ],
  case: [
    { name: "Budget Black mATX Case", color: "Black", size: "mATX", maxGpu: 300, price: 50 },
    { name: "Black Airflow ATX Case", color: "Black", size: "ATX", maxGpu: 360, price: 85 },
    { name: "White Airflow ATX Case", color: "White", size: "ATX", maxGpu: 360, price: 110 },
    { name: "RGB Showcase ATX Case", color: "RGB", size: "ATX", maxGpu: 370, price: 130 },
    { name: "Minimal Black mATX Case", color: "Black", size: "mATX", maxGpu: 330, price: 80 },
    { name: "White mATX Glass Case", color: "White", size: "mATX", maxGpu: 330, price: 105 },
    { name: "Premium Glass Showcase ATX Case", color: "RGB", size: "ATX", maxGpu: 420, price: 320 },
    { name: "Full Tower Workstation Case", color: "Black", size: "ATX", maxGpu: 450, price: 450 },
    { name: "White Full Tower Showcase Case", color: "White", size: "ATX", maxGpu: 430, price: 520 },
    { name: "Enterprise AI Workstation Chassis", color: "Black", size: "ATX", maxGpu: 500, price: 1800 },
  ],
  cooler: [
    { name: "Stock / Budget Air Cooler", price: 25, capacity: 90 },
    { name: "Premium Air Cooler", price: 70, capacity: 180 },
    { name: "240mm AIO Liquid Cooler", price: 105, capacity: 220 },
    { name: "360mm AIO Liquid Cooler", price: 155, capacity: 300 },
    { name: "420mm AIO Liquid Cooler", price: 230, capacity: 420 },
    { name: "Custom Liquid Cooling Loop", price: 1200, capacity: 700 },
  ],
  psu: [
    { name: "500W 80+ Bronze PSU", watts: 500, price: 55 },
    { name: "650W 80+ Gold PSU", watts: 650, price: 85 },
    { name: "750W 80+ Gold PSU", watts: 750, price: 105 },
    { name: "850W 80+ Gold PSU", watts: 850, price: 130 },
    { name: "1000W 80+ Gold PSU", watts: 1000, price: 180 },
    { name: "1200W Platinum PSU", watts: 1200, price: 260 },
    { name: "1600W Titanium PSU", watts: 1600, price: 520 },
    { name: "2000W Workstation Power Supply", watts: 2000, price: 850 },
    { name: "3000W Enterprise AI Power Supply", watts: 3000, price: 1800 },
  ],
  monitor: [
    { name: "22\" 1080p Office Monitor", price: 90, resolution: "1080p", refreshRate: 75, size: 22, type: "LED", score: 45 },
    { name: "24\" 1080p 144Hz Gaming Monitor", price: 160, resolution: "1080p", refreshRate: 144, size: 24, type: "IPS", score: 65 },
    { name: "27\" 1440p 165Hz Gaming Monitor", price: 300, resolution: "1440p", refreshRate: 165, size: 27, type: "IPS", score: 88 },
    { name: "32\" 4K 144Hz Gaming Monitor", price: 750, resolution: "4K", refreshRate: 144, size: 32, type: "IPS", score: 110 },
    { name: "34\" Ultrawide OLED Gaming Monitor", price: 1000, resolution: "Ultrawide", refreshRate: 175, size: 34, type: "OLED", score: 125 },
    { name: "49\" Super Ultrawide OLED Monitor", price: 1500, resolution: "Super Ultrawide", refreshRate: 240, size: 49, type: "OLED", score: 145 },
  ],
  keyboard: [
    { name: "Basic Office Keyboard", price: 20, style: "Black", score: 40 },
    { name: "Budget Mechanical Keyboard", price: 45, style: "Black", score: 60 },
    { name: "White RGB Mechanical Keyboard", price: 85, style: "White", score: 80 },
    { name: "Premium Wireless Mechanical Keyboard", price: 180, style: "Premium", score: 100 },
  ],
  mouse: [
    { name: "Basic Wireless Mouse", price: 15, style: "Black", score: 38 },
    { name: "Budget Gaming Mouse", price: 30, style: "Black", score: 60 },
    { name: "Lightweight Wireless Gaming Mouse", price: 100, style: "Premium", score: 95 },
    { name: "White Wireless Gaming Mouse", price: 120, style: "White", score: 90 },
  ],
  headset: [
    { name: "Basic Office Speakers", price: 30, style: "Black", score: 45 },
    { name: "Basic Gaming Headset", price: 50, style: "Black", score: 60 },
    { name: "Wireless Gaming Headset", price: 140, style: "Premium", score: 90 },
    { name: "Studio Headphones + Mic Combo", price: 300, style: "Creator", score: 110 },
  ],
  prebuilt: [
    { name: "Basic Home Office Desktop", brand: "HP", price: 550, cpuTier: 45, gpuTier: 20, ramGB: 16, storageTB: 0.5, use: "Home / Office", quality: 68 },
    { name: "Budget Family Desktop PC", brand: "Dell", price: 700, cpuTier: 55, gpuTier: 25, ramGB: 16, storageTB: 1, use: "Family Use", quality: 72 },
    { name: "Entry Gaming Prebuilt PC", brand: "CyberPowerPC", price: 900, cpuTier: 65, gpuTier: 65, ramGB: 16, storageTB: 1, use: "Gaming", quality: 72 },
    { name: "1440p Gaming Prebuilt PC", brand: "iBUYPOWER", price: 1500, cpuTier: 82, gpuTier: 90, ramGB: 32, storageTB: 2, use: "Gaming", quality: 76 },
    { name: "Premium Gaming Prebuilt PC", brand: "Alienware", price: 2500, cpuTier: 92, gpuTier: 110, ramGB: 32, storageTB: 2, use: "Gaming", quality: 82 },
    { name: "Creator Desktop Workstation", brand: "Lenovo", price: 3200, cpuTier: 105, gpuTier: 95, ramGB: 64, storageTB: 4, use: "Video Editing", quality: 88 },
    { name: "Professional Workstation Tower", brand: "Dell Precision", price: 6000, cpuTier: 135, gpuTier: 135, ramGB: 128, storageTB: 8, use: "Workstation", quality: 92 },
    { name: "AI Workstation Desktop", brand: "Puget Systems", price: 12000, cpuTier: 170, gpuTier: 250, ramGB: 256, storageTB: 16, use: "AI / ML", quality: 96 },
    { name: "Ultra High-End AI Workstation", brand: "Amazon", price: 65200, cpuTier: 220, gpuTier: 1100, ramGB: 1024, storageTB: 64, use: "AI / ML", quality: 98 },
  ],
};

const BASIC_PURPOSES = ["Home / Office", "Student", "Family Use"];
const WORKSTATION_PURPOSES = ["AI / ML", "Workstation", "Video Editing"];

function getMetric(purpose) {
  if (purpose === "AI / ML") return "ai";
  if (WORKSTATION_PURPOSES.includes(purpose) || BASIC_PURPOSES.includes(purpose)) return "creator";
  return "gaming";
}

function pickBest(list, scoreFn) {
  return [...list].sort((a, b) => scoreFn(b) - scoreFn(a))[0] || null;
}

function recommendBrands(build, purpose) {
  if (!build) return [];
  const brands = [];

  if (build.gpu.brand === "NVIDIA") brands.push({ category: "GPU", brands: "ASUS / MSI / Gigabyte / PNY", note: "NVIDIA cards are usually stronger for AI, CUDA, streaming, and creator workloads." });
  if (build.gpu.brand === "AMD") brands.push({ category: "GPU", brands: "Sapphire / PowerColor / XFX", note: "AMD cards often provide stronger gaming value per dollar." });
  if (build.gpu.brand === "Integrated") brands.push({ category: "Graphics", brands: "Integrated graphics", note: "Enough for office, school, web browsing, and media use. Not recommended for serious gaming." });

  if (build.cpu.brand === "AMD") brands.push({ category: "CPU", brands: "AMD Ryzen / Threadripper", note: "Strong gaming efficiency and workstation scalability." });
  if (build.cpu.brand === "Intel") brands.push({ category: "CPU", brands: "Intel Core", note: "Strong all-around performance and broad motherboard support." });

  brands.push({ category: "Motherboard", brands: "ASUS / MSI / Gigabyte / ASRock", note: "Choose based on socket, VRM quality, WiFi, and expansion slots." });
  brands.push({ category: "Power Supply", brands: "Corsair / Seasonic / EVGA / be quiet!", note: "Do not cheap out on PSU. Prefer Bronze/Gold or better from known brands." });
  brands.push({ category: "Case", brands: "Lian Li / Fractal / NZXT / Corsair", note: "Prioritize airflow, GPU clearance, and build style." });

  if (purpose === "AI / ML" || purpose === "Workstation") {
    brands.push({ category: "Prebuilt Workstation", brands: "Puget Systems / Dell Precision / Lenovo ThinkStation / Amazon", note: "Better warranty and support for expensive workstation builds." });
  } else if (BASIC_PURPOSES.includes(purpose)) {
    brands.push({ category: "Prebuilt Home PC", brands: "HP / Dell / Lenovo", note: "Good option for family, school, and office use when dedicated GPU is unnecessary." });
  } else {
    brands.push({ category: "Prebuilt Gaming PC", brands: "CyberPowerPC / iBUYPOWER / Alienware / Skytech", note: "Good option if the user wants plug-and-play instead of building." });
  }

  return brands;
}

function recommendPrebuilt(settings, build) {
  if (!build) return null;
  const metric = getMetric(settings.purpose);
  const candidates = parts.prebuilt.filter((p) => {
    const budgetOk = p.price <= settings.budget || (settings.purpose === "AI / ML" && settings.budget >= 50000 && p.price <= settings.budget * 1.35);
    const useOk = p.use === settings.purpose || (BASIC_PURPOSES.includes(settings.purpose) && BASIC_PURPOSES.includes(p.use));
    return budgetOk && (useOk || settings.budget >= p.price * 1.25);
  });
  if (!candidates.length) return null;

  return [...candidates].sort((a, b) => {
    const scoreA = (settings.purpose === a.use ? 60 : 0) + a.quality + a.cpuTier * 0.45 + a.gpuTier * (metric === "gaming" ? 0.75 : 0.55) + a.ramGB * (metric === "gaming" ? 0.1 : 0.25) + a.storageTB * 0.8 - Math.max(0, a.price - settings.budget) / 100;
    const scoreB = (settings.purpose === b.use ? 60 : 0) + b.quality + b.cpuTier * 0.45 + b.gpuTier * (metric === "gaming" ? 0.75 : 0.55) + b.ramGB * (metric === "gaming" ? 0.1 : 0.25) + b.storageTB * 0.8 - Math.max(0, b.price - settings.budget) / 100;
    return scoreB - scoreA;
  })[0];
}

function recommendMonitor(gpu, purpose, includeMonitor) {
  if (!includeMonitor) return null;
  if (BASIC_PURPOSES.includes(purpose)) return parts.monitor.find((m) => m.name.includes("Office")) || parts.monitor[0];
  if (purpose === "AI / ML" || purpose === "Workstation") return parts.monitor.find((m) => m.resolution === "4K") || parts.monitor[0];
  if (gpu.gaming >= 125) return parts.monitor.find((m) => m.type === "OLED") || parts.monitor[3];
  if (gpu.gaming >= 105) return parts.monitor.find((m) => m.resolution === "4K") || parts.monitor[2];
  if (gpu.gaming >= 85) return parts.monitor.find((m) => m.resolution === "1440p") || parts.monitor[1];
  return parts.monitor.find((m) => m.resolution === "1080p") || parts.monitor[0];
}

function scoreBuild(build, purpose, budget) {
  const metric = getMetric(purpose);
  const isBasicUse = BASIC_PURPOSES.includes(purpose);
  const gpuWeight = isBasicUse ? 0.2 : purpose === "Gaming" ? (budget >= 5000 ? 1.25 : 1.55) : purpose === "AI / ML" ? 1.7 : 1.15;
  const cpuWeight = isBasicUse ? 1.05 : purpose === "Gaming" ? (budget >= 5000 ? 1.35 : 0.9) : purpose === "AI / ML" ? 1.1 : 1.35;
  const ramWeight = isBasicUse ? 0.3 : purpose === "Gaming" ? 0.18 : purpose === "AI / ML" ? 0.6 : 0.45;
  const storageWeight = isBasicUse ? 0.35 : purpose === "Gaming" ? 0.12 : 0.25;
  const valuePenalty = build.total / Math.max(budget, 1) * (isBasicUse ? 18 : 8);
  const highBudgetCpuBoost =
    budget >= 5000 && purpose === "Gaming" && build.cpu.name.includes("Ryzen 9")
      ? 38
      : budget >= 5000 && purpose === "Gaming" && build.cpu.name.includes("Core i9")
      ? 34
      : budget >= 5000 && purpose === "Gaming" && build.cpu.name.includes("Core Ultra 9")
      ? 34
      : 0;

  return build.gpu[metric] * gpuWeight + build.cpu[metric] * cpuWeight + build.ram.score * ramWeight + build.storage.score * storageWeight + (build.monitor?.score || 0) * 0.08 - valuePenalty + highBudgetCpuBoost;
}

function generateBuild(settings) {
  const { budget, purpose, cpuPref, gpuPref, color, size, needWifi, upgrade, includeMonitor, includeKeyboard, includeMouse, includeHeadset, minRam, minStorage } = settings;
  const candidates = [];
  const isBasicUse = BASIC_PURPOSES.includes(purpose);
  const workstationMode = purpose === "AI / ML" || purpose === "Workstation" || purpose === "Video Editing";

  const cpuPool = parts.cpu.filter((p) => {
    const brandOk = cpuPref === "No Preference" || p.brand === cpuPref;
    const tierOk = workstationMode || p.tier !== "workstation";
    return brandOk && tierOk;
  });

  const gpuPool = parts.gpu.filter((p) => {
    const brandOk = gpuPref === "No Preference" || p.brand === gpuPref;
    const tierOk = workstationMode || p.tier !== "workstation";
    const basicOk = !isBasicUse || p.brand === "Integrated" || p.price <= 300;
    return brandOk && tierOk && basicOk;
  });

  for (const cpu of cpuPool) {
    for (const gpu of gpuPool) {
      const motherboards = parts.motherboard.filter((m) => {
        const socketOk = m.socket === cpu.socket;
        const wifiOk = !needWifi || m.wifi;
        const sizeOk = size === "No Preference" || m.size === size || size === "ATX";
        return socketOk && wifiOk && sizeOk;
      });

      for (const motherboard of motherboards) {
        const rams = parts.ram.filter((r) => {
          const platformOk = cpu.socket === "AM4" ? r.platform === "AM4" : cpu.socket === "sTR5" ? r.platform === "sTR5" : r.platform === "AM5/LGA1700";
          return platformOk && r.sizeGB >= minRam;
        });

        for (const ram of rams) {
          const storages = parts.storage.filter((s) => s.sizeTB >= minStorage);
          for (const storage of storages) {
            const cases = parts.case.filter((c) => {
              const colorOk = color === "No Preference" || c.color === color || (color === "Minimal" && c.color === "Black");
              const sizeOk = size === "No Preference" || c.size === size;
              const gpuOk = c.maxGpu >= gpu.length;
              const boardOk = c.size === motherboard.size || c.size === "ATX";
              return colorOk && sizeOk && gpuOk && boardOk;
            });

            for (const pcCase of cases) {
              const cooler = parts.cooler.find((c) => c.capacity >= cpu.power) || parts.cooler.at(-1);
              const estimatedWatts = cpu.power + gpu.power + 120 + (upgrade ? 80 : 40);
              const psu = parts.psu.find((p) => p.watts >= estimatedWatts);
              if (!psu) continue;

              const monitor = recommendMonitor(gpu, purpose, includeMonitor);
              const keyboard = includeKeyboard ? pickBest(parts.keyboard, (k) => k.score - Math.abs(k.price - budget * 0.02)) : null;
              const mouse = includeMouse ? pickBest(parts.mouse, (m) => m.score - Math.abs(m.price - budget * 0.015)) : null;
              const headset = includeHeadset ? pickBest(parts.headset, (h) => h.score - Math.abs(h.price - budget * 0.02)) : null;

              const total = cpu.price + gpu.price + motherboard.price + ram.price + storage.price + pcCase.price + cooler.price + psu.price + (monitor?.price || 0) + (keyboard?.price || 0) + (mouse?.price || 0) + (headset?.price || 0);
              if (total > budget) continue;
              if (budget <= 1000 && total < budget * 0.5) continue;
              if (budget > 1000 && budget <= 6000 && total < budget * 0.3) continue;

              const build = { cpu, gpu, motherboard, ram, storage, case: pcCase, cooler, psu, monitor, keyboard, mouse, headset, total };
              candidates.push({ ...build, score: scoreBuild(build, purpose, budget), metric: getMetric(purpose) });
            }
          }
        }
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0] || null;
}

function PartCard({ icon, title, part }) {
  if (!part) return null;
  return (
    <div style={styles.partCard}>
      <div style={styles.icon}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={styles.label}>{title}</div>
        <div style={styles.value}>{part.name}</div>
        <div style={styles.price}>Estimated: ${part.price}</div>
        <button style={styles.smallBuyButton} onClick={() => openAmazonSearch(cleanPartQuery(part, title))}>Buy on Amazon</button>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label style={{ display: "block" }}>
      <span style={styles.labelText}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={styles.input}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={styles.checkRow}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} /> {label}
    </label>
  );
}

export default function App() {
  const [budget, setBudget] = useState(3000);
  const [budgetInput, setBudgetInput] = useState("3000");
  const [purpose, setPurpose] = useState("Gaming");
  const [cpuPref, setCpuPref] = useState("No Preference");
  const [gpuPref, setGpuPref] = useState("No Preference");
  const [color, setColor] = useState("No Preference");
  const [size, setSize] = useState("ATX");
  const [needWifi, setNeedWifi] = useState(true);
  const [upgrade, setUpgrade] = useState(true);
  const [includeMonitor, setIncludeMonitor] = useState(true);
  const [includeKeyboard, setIncludeKeyboard] = useState(false);
  const [includeMouse, setIncludeMouse] = useState(false);
  const [includeHeadset, setIncludeHeadset] = useState(false);
  const [minRam, setMinRam] = useState(16);
  const [minStorage, setMinStorage] = useState(0.5);
  const [submittedSettings, setSubmittedSettings] = useState({ budget: 3000, purpose: "Gaming", cpuPref: "No Preference", gpuPref: "No Preference", color: "No Preference", size: "ATX", needWifi: true, upgrade: true, includeMonitor: true, includeKeyboard: false, includeMouse: false, includeHeadset: false, minRam: 16, minStorage: 0.5 });

  const handleSearch = () => {
    let value = Number(budgetInput);
    if (Number.isNaN(value) || budgetInput.trim() === "") value = 700;
    value = Math.min(70000, Math.max(500, value));
    setBudget(value);
    setBudgetInput(String(value));
    setSubmittedSettings({ budget: value, purpose, cpuPref, gpuPref, color, size, needWifi, upgrade, includeMonitor, includeKeyboard, includeMouse, includeHeadset, minRam, minStorage });
  };

  const build = useMemo(() => generateBuild(submittedSettings), [submittedSettings]);
  const savings = build ? submittedSettings.budget - build.total : 0;
  const brandRecommendations = useMemo(() => recommendBrands(build, submittedSettings.purpose), [build, submittedSettings.purpose]);
  const prebuiltRecommendation = useMemo(() => recommendPrebuilt(submittedSettings, build), [submittedSettings, build]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}><Sparkles size={16} /> PC Builder + Deals + Brand Guide</div>
          <h1 style={styles.title}>Build the best PC setup for your budget.</h1>
          <p style={styles.subtitle}>Dynamic part matching, compatibility checks, clean purchase links, brand recommendations, and prebuilt alternatives.</p>
          <p style={styles.affiliateNotice}>Disclosure: purchase buttons may use affiliate links. Estimated prices are for planning only and should be verified before checkout.</p>
        </div>

        <div style={styles.layout}>
          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>Build Requirements</h2>

            <label style={styles.labelText}>Budget</label>
            <div style={styles.budgetRow}>
              <span style={styles.dollarSign}>$</span>
              <input type="number" min="500" max="70000" step="100" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} onBlur={() => { let value = Number(budgetInput); if (Number.isNaN(value) || budgetInput.trim() === "") value = 500; value = Math.min(70000, Math.max(500, value)); setBudget(value); setBudgetInput(String(value)); }} onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }} style={styles.budgetInput} />
            </div>
            <input type="range" min="500" max="70000" step="100" value={budget} onChange={(e) => { const value = Number(e.target.value); setBudget(value); setBudgetInput(String(value)); }} style={{ width: "100%" }} />

            <Select label="Main Purpose" value={purpose} onChange={setPurpose} options={["Gaming", "Streaming", "Video Editing", "AI / ML", "Workstation", "Mixed Use", "Home / Office", "Student", "Family Use"]} />
            <Select label="CPU Manufacturer" value={cpuPref} onChange={setCpuPref} options={["No Preference", "AMD", "Intel"]} />
            <Select label="GPU Manufacturer" value={gpuPref} onChange={setGpuPref} options={["No Preference", "NVIDIA", "AMD", "Intel", "Integrated"]} />
            <Select label="Color Theme" value={color} onChange={setColor} options={["No Preference", "Black", "White", "RGB", "Minimal"]} />
            <Select label="Case Size" value={size} onChange={setSize} options={["No Preference", "ATX", "mATX"]} />
            <Select label="Minimum RAM" value={String(minRam)} onChange={(v) => setMinRam(Number(v))} options={["16", "32", "64", "128", "256", "512", "1024"]} />
            <Select label="Minimum Storage" value={String(minStorage)} onChange={(v) => setMinStorage(Number(v))} options={["0.5", "1", "2", "4", "8", "16", "32", "64"]} />

            <div style={styles.filterGroup}>
              <div style={styles.groupTitle}>Connectivity</div>
              <Checkbox checked={needWifi} onChange={setNeedWifi} label="WiFi / Bluetooth" />
              <Checkbox checked={upgrade} onChange={setUpgrade} label="Future upgrade room" />
            </div>

            <div style={styles.filterGroup}>
              <div style={styles.groupTitle}>Included Components</div>
              <Checkbox checked={includeMonitor} onChange={setIncludeMonitor} label="Monitor" />
              <Checkbox checked={includeKeyboard} onChange={setIncludeKeyboard} label="Keyboard" />
              <Checkbox checked={includeMouse} onChange={setIncludeMouse} label="Mouse" />
              <Checkbox checked={includeHeadset} onChange={setIncludeHeadset} label="Headset / Audio" />
            </div>

            <button style={styles.searchButton} onClick={handleSearch}>Search Recommended Setup</button>
          </div>

          <div style={styles.panel}>
            <div style={styles.resultHeader}>
              <div>
                <h2 style={styles.panelTitle}>Recommended Setup</h2>
                <p style={styles.smallText}>Generated from your budget, selected requirements, and compatibility rules.</p>
              </div>
              <div style={styles.totalBox}>
                <div style={styles.label}>Estimated Total</div>
                <div style={styles.total}>{build ? `$${build.total.toLocaleString()}` : "$N/A"}</div>
              </div>
            </div>

            <div style={styles.requirementsBox}>
              <h3 style={styles.requirementsTitle}>Selected Requirements</h3>
              <div style={styles.requirementsGrid}>
                <span><strong>Budget:</strong> ${submittedSettings.budget.toLocaleString()}</span>
                <span><strong>Purpose:</strong> {submittedSettings.purpose}</span>
                <span><strong>CPU:</strong> {submittedSettings.cpuPref}</span>
                <span><strong>GPU:</strong> {submittedSettings.gpuPref}</span>
                <span><strong>Theme:</strong> {submittedSettings.color}</span>
                <span><strong>Case:</strong> {submittedSettings.size}</span>
                <span><strong>RAM:</strong> {submittedSettings.minRam}GB+</span>
                <span><strong>Storage:</strong> {submittedSettings.minStorage}TB+</span>
                <span><strong>WiFi:</strong> {submittedSettings.needWifi ? "Yes" : "No"}</span>
                <span><strong>Upgrade room:</strong> {submittedSettings.upgrade ? "Yes" : "No"}</span>
                <span><strong>Monitor:</strong> {submittedSettings.includeMonitor ? "Included" : "Not included"}</span>
                <span><strong>Accessories:</strong> {[submittedSettings.includeKeyboard && "Keyboard", submittedSettings.includeMouse && "Mouse", submittedSettings.includeHeadset && "Audio"].filter(Boolean).join(", ") || "None"}</span>
              </div>
              <p style={styles.requirementsNote}>Any field left as <strong>No Preference</strong> means the system will choose the best-value compatible option automatically.</p>
            </div>

            {!build ? (
              <div style={styles.empty}>No compatible build found. Increase budget or loosen brand/color/RAM/storage constraints.</div>
            ) : (
              <>
                <div style={styles.partsGrid}>
                  <PartCard icon={<Cpu size={22} />} title="CPU" part={build.cpu} />
                  <PartCard icon={<Monitor size={22} />} title="GPU" part={build.gpu} />
                  <PartCard icon={<Box size={22} />} title="Motherboard" part={build.motherboard} />
                  <PartCard icon={<Zap size={22} />} title="RAM" part={build.ram} />
                  <PartCard icon={<HardDrive size={22} />} title="Storage" part={build.storage} />
                  <PartCard icon={<Fan size={22} />} title="Cooler" part={build.cooler} />
                  <PartCard icon={<Box size={22} />} title="Case" part={build.case} />
                  <PartCard icon={<Zap size={22} />} title="Power Supply" part={build.psu} />
                  <PartCard icon={<Monitor size={22} />} title="Monitor" part={build.monitor} />
                  <PartCard icon={<Keyboard size={22} />} title="Keyboard" part={build.keyboard} />
                  <PartCard icon={<Mouse size={22} />} title="Mouse" part={build.mouse} />
                  <PartCard icon={<Headphones size={22} />} title="Audio" part={build.headset} />
                </div>

                <div style={styles.summary}>
                  <h3>Why this setup?</h3>
                  <p>This setup prioritizes <strong>{build.metric}</strong> performance based on the requirements shown above, then checks socket, RAM platform, GPU clearance, PSU headroom, case size, and WiFi requirements.</p>
                  <p><strong>Budget used:</strong> ${build.total.toLocaleString()} / ${submittedSettings.budget.toLocaleString()} · <strong>Remaining:</strong> ${savings.toLocaleString()}</p>
                </div>

                <div style={styles.buyPanel}>
                  <h3 style={styles.buyPanelTitle}>Purchase List</h3>
                  <p style={styles.smallText}>Buy parts individually for cleaner results. This avoids messy full-build searches and helps users compare current prices.</p>
                  <div style={styles.buyGrid}>
                    {[["CPU", build.cpu], ["GPU", build.gpu], ["Motherboard", build.motherboard], ["RAM", build.ram], ["Storage", build.storage], ["Cooler", build.cooler], ["Case", build.case], ["Power Supply", build.psu], ["Monitor", build.monitor], ["Keyboard", build.keyboard], ["Mouse", build.mouse], ["Audio", build.headset]].filter(([, part]) => part).map(([title, part]) => (
                      <button key={title} style={styles.partBuyButton} onClick={() => openAmazonSearch(cleanPartQuery(part, title))}>Buy {title}</button>
                    ))}
                  </div>
                </div>

                <div style={styles.recommendationPanel}>
                  <h3 style={styles.buyPanelTitle}>Recommended Brands</h3>
                  <div style={styles.brandGrid}>
                    {brandRecommendations.map((item) => (
                      <div key={item.category} style={styles.brandCard}>
                        <div style={styles.label}>{item.category}</div>
                        <div style={styles.value}>{item.brands}</div>
                        <p style={styles.brandNote}>{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {prebuiltRecommendation && (
                  <div style={styles.recommendationPanel}>
                    <h3 style={styles.buyPanelTitle}>Don’t want to build? Buy Prebuilt Instead</h3>
                    <div style={styles.prebuiltCard}>
                      <div>
                        <div style={styles.label}>{prebuiltRecommendation.brand}</div>
                        <div style={styles.value}>{prebuiltRecommendation.name}</div>
                        <p style={styles.brandNote}>Estimated ${prebuiltRecommendation.price.toLocaleString()} · {prebuiltRecommendation.ramGB}GB RAM · {prebuiltRecommendation.storageTB}TB storage</p>
                        {prebuiltRecommendation.price > submittedSettings.budget && <p style={styles.overBudgetNote}>This option is above your selected budget but included as a high-end market reference.</p>}
                      </div>
                      <button style={styles.prebuiltButton} onClick={() => openAmazonSearch(`${prebuiltRecommendation.brand} ${prebuiltRecommendation.name}`)}>Buy on Amazon</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", width: "100vw", background: "#f6f8fb", color: "#0f172a", fontFamily: "Arial, sans-serif", padding: "32px 48px", boxSizing: "border-box" },
  container: { width: "100%", maxWidth: "none", margin: "0" },
  hero: { textAlign: "center", marginBottom: "28px" },
  badge: { display: "inline-flex", gap: "8px", alignItems: "center", padding: "8px 14px", borderRadius: "999px", background: "white", boxShadow: "0 8px 25px rgba(15,23,42,0.08)", fontWeight: 700, fontSize: "14px" },
  title: { fontSize: "46px", margin: "18px 0 8px", letterSpacing: "-1px" },
  subtitle: { color: "#64748b", fontSize: "18px", maxWidth: "820px", margin: "0 auto" },
  affiliateNotice: { color: "#64748b", fontSize: "13px", maxWidth: "760px", margin: "10px auto 0", lineHeight: 1.45 },
  layout: { display: "grid", gridTemplateColumns: "420px minmax(0, 1fr)", gap: "32px", alignItems: "start", width: "100%" },
  panel: { background: "white", borderRadius: "24px", padding: "30px", boxShadow: "0 14px 40px rgba(15,23,42,0.08)" },
  panelTitle: { margin: "0 0 12px", fontSize: "24px" },
  labelText: { display: "block", marginTop: "14px", marginBottom: "8px", fontWeight: 700 },
  input: { width: "100%", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "12px", background: "white", fontSize: "14px" },
  checkRow: { display: "flex", gap: "10px", alignItems: "center", marginTop: "10px", fontWeight: 600 },
  filterGroup: { marginTop: "18px", paddingTop: "14px", borderTop: "1px solid #e2e8f0" },
  groupTitle: { fontWeight: 800, marginBottom: "6px" },
  searchButton: { marginTop: "20px", width: "100%", padding: "15px", borderRadius: "16px", border: "none", background: "#2563eb", color: "white", fontSize: "16px", fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 22px rgba(37,99,235,0.22)" },
  resultHeader: { display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", marginBottom: "18px" },
  smallText: { margin: 0, color: "#64748b" },
  totalBox: { background: "#0f172a", color: "white", borderRadius: "18px", padding: "14px 18px", minWidth: "170px", textAlign: "center" },
  total: { fontSize: "25px", fontWeight: 800 },
  label: { fontSize: "12px", textTransform: "uppercase", color: "#64748b", fontWeight: 700, letterSpacing: "0.5px" },
  requirementsBox: { marginBottom: "18px", padding: "16px", borderRadius: "18px", background: "#f8fafc", border: "1px solid #e2e8f0" },
  requirementsTitle: { margin: "0 0 12px", fontSize: "18px" },
  requirementsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 14px", fontSize: "14px", color: "#334155" },
  requirementsNote: { margin: "12px 0 0", color: "#64748b", fontSize: "13px", lineHeight: 1.45 },
  partsGrid: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" },
  partCard: { display: "flex", gap: "12px", alignItems: "center", padding: "14px", borderRadius: "18px", border: "1px solid #e2e8f0", background: "#f8fafc" },
  icon: { background: "#e2e8f0", padding: "10px", borderRadius: "14px", display: "flex" },
  value: { fontWeight: 800, marginTop: "4px" },
  price: { fontSize: "13px", color: "#64748b", marginTop: "4px" },
  smallBuyButton: { marginTop: "10px", padding: "8px 10px", borderRadius: "10px", border: "1px solid #2563eb", background: "#eff6ff", color: "#1d4ed8", fontSize: "12px", fontWeight: 800, cursor: "pointer" },
  summary: { marginTop: "20px", padding: "18px", background: "#eef2f7", borderRadius: "18px", lineHeight: 1.55 },
  buyPanel: { marginTop: "20px", padding: "18px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px" },
  buyPanelTitle: { margin: "0 0 8px", fontSize: "20px" },
  buyGrid: { display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: "10px", marginTop: "14px" },
  partBuyButton: { padding: "11px 10px", borderRadius: "12px", border: "1px solid #2563eb", background: "#eff6ff", color: "#1d4ed8", fontWeight: 800, cursor: "pointer" },
  recommendationPanel: { marginTop: "20px", padding: "18px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "18px" },
  brandGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px", marginTop: "12px" },
  brandCard: { background: "#f8fafc", borderRadius: "16px", padding: "14px", border: "1px solid #e2e8f0" },
  brandNote: { color: "#64748b", fontSize: "13px", lineHeight: 1.45, margin: "8px 0 0" },
  overBudgetNote: { color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "8px", fontSize: "13px", marginTop: "8px" },
  prebuiltCard: { display: "flex", justifyContent: "space-between", gap: "18px", alignItems: "center", background: "#f8fafc", borderRadius: "16px", padding: "14px", border: "1px solid #e2e8f0", marginTop: "12px" },
  prebuiltButton: { padding: "12px 14px", borderRadius: "12px", border: "none", background: "#2563eb", color: "white", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" },
  button: { marginTop: "18px", width: "100%", padding: "15px", borderRadius: "16px", border: "none", background: "#0f172a", color: "white", fontSize: "16px", fontWeight: 800, cursor: "pointer" },
  budgetRow: { display: "flex", alignItems: "center", gap: "8px", border: "1px solid #cbd5e1", borderRadius: "12px", padding: "0 12px", background: "white", marginBottom: "10px" },
  dollarSign: { fontWeight: 800, color: "#64748b" },
  budgetInput: { width: "100%", padding: "12px 4px", border: "none", outline: "none", fontSize: "16px", fontWeight: 800, background: "transparent" },
  empty: { padding: "28px", borderRadius: "18px", background: "#fff7ed", color: "#9a3412", fontWeight: 700 },
};
