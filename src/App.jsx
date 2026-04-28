import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const AFFILIATE_TAG = "pcbuilderguid-20";

const DIRECT_PRODUCT_LINKS = {
  // Add your real Amazon ASIN links here.
  // Format:
  // "Product Name": "ASIN",
  // Example:
  // "AMD Ryzen 9 7900X": "B0BBJ59WJ4",
  // "AMD Ryzen 7 7800X3D": "B0BTZB7F88",
};

const PURPOSES = {
  home: "Home / Office / School",
  esports: "Esports Gaming",
  gaming1080p: "1080p Gaming",
  gaming1440p: "1440p Gaming",
  gaming4k: "4K Gaming",
  streaming: "Gaming + Streaming",
  creator: "Creator / Editing",
  ai: "AI / CUDA / ML",
};

const STYLES = {
  balanced: "Balanced",
  performance: "Best Performance",
  value: "Best Value",
  flagship: "High-End / Flagship",
  amd: "AMD Build",
  intel: "Intel CPU Build",
  nvidia: "NVIDIA GPU Build",
  noPreference: "No Brand Preference",
};

const cpus = [
  { name: "Intel Core i3-14100F", brand: "Intel", price: 115, gaming: 58, productivity: 50, ai: 35, socket: "LGA1700", value: 91 },
  { name: "AMD Ryzen 5 5600", brand: "AMD", price: 125, gaming: 62, productivity: 55, ai: 38, socket: "AM4", value: 95 },
  { name: "Intel Core i5-12400F", brand: "Intel", price: 140, gaming: 66, productivity: 58, ai: 40, socket: "LGA1700", value: 94 },
  { name: "AMD Ryzen 5 7600", brand: "AMD", price: 195, gaming: 78, productivity: 68, ai: 48, socket: "AM5", value: 91 },
  { name: "Intel Core i5-13600K", brand: "Intel", price: 265, gaming: 84, productivity: 82, ai: 55, socket: "LGA1700", value: 85 },
  { name: "Intel Core i7-14700K", brand: "Intel", price: 390, gaming: 90, productivity: 94, ai: 66, socket: "LGA1700", value: 78 },
  { name: "AMD Ryzen 7 7800X3D", brand: "AMD", price: 370, gaming: 100, productivity: 78, ai: 58, socket: "AM5", value: 88 },
  { name: "AMD Ryzen 9 7900X", brand: "AMD", price: 390, gaming: 88, productivity: 96, ai: 65, socket: "AM5", value: 81 },
  { name: "Intel Core i9-14900K", brand: "Intel", price: 530, gaming: 94, productivity: 100, ai: 72, socket: "LGA1700", value: 70 },
  { name: "AMD Ryzen 9 7950X3D", brand: "AMD", price: 590, gaming: 98, productivity: 98, ai: 70, socket: "AM5", value: 72 },
];

const gpus = [
  { name: "Intel Arc B580 12GB", brand: "Intel", price: 260, esports: 82, gaming1080p: 78, gaming1440p: 68, gaming4k: 42, creator: 55, ai: 35, value: 96, vram: 12 },
  { name: "AMD Radeon RX 7600 XT 16GB", brand: "AMD", price: 320, esports: 84, gaming1080p: 78, gaming1440p: 65, gaming4k: 43, creator: 55, ai: 32, value: 89, vram: 16 },
  { name: "NVIDIA GeForce RTX 4060 Ti 16GB", brand: "NVIDIA", price: 430, esports: 86, gaming1080p: 80, gaming1440p: 68, gaming4k: 45, creator: 70, ai: 70, value: 76, vram: 16 },
  { name: "AMD Radeon RX 7700 XT 12GB", brand: "AMD", price: 410, esports: 89, gaming1080p: 86, gaming1440p: 78, gaming4k: 55, creator: 62, ai: 38, value: 91, vram: 12 },
  { name: "AMD Radeon RX 7800 XT 16GB", brand: "AMD", price: 500, esports: 92, gaming1080p: 90, gaming1440p: 86, gaming4k: 66, creator: 68, ai: 42, value: 94, vram: 16 },
  { name: "NVIDIA GeForce RTX 4070 Super 12GB", brand: "NVIDIA", price: 600, esports: 94, gaming1080p: 92, gaming1440p: 88, gaming4k: 70, creator: 84, ai: 86, value: 86, vram: 12 },
  { name: "AMD Radeon RX 7900 GRE 16GB", brand: "AMD", price: 570, esports: 95, gaming1080p: 93, gaming1440p: 90, gaming4k: 73, creator: 72, ai: 45, value: 93, vram: 16 },
  { name: "AMD Radeon RX 9070 XT 16GB", brand: "AMD", price: 650, esports: 96, gaming1080p: 95, gaming1440p: 93, gaming4k: 80, creator: 76, ai: 50, value: 90, vram: 16 },
  { name: "AMD Radeon RX 7900 XT 20GB", brand: "AMD", price: 700, esports: 97, gaming1080p: 96, gaming1440p: 94, gaming4k: 83, creator: 78, ai: 48, value: 88, vram: 20 },
  { name: "NVIDIA GeForce RTX 4070 Ti Super 16GB", brand: "NVIDIA", price: 800, esports: 97, gaming1080p: 97, gaming1440p: 95, gaming4k: 84, creator: 90, ai: 92, value: 82, vram: 16 },
  { name: "AMD Radeon RX 7900 XTX 24GB", brand: "AMD", price: 900, esports: 98, gaming1080p: 98, gaming1440p: 97, gaming4k: 91, creator: 82, ai: 52, value: 84, vram: 24 },
  { name: "NVIDIA GeForce RTX 4080 Super 16GB", brand: "NVIDIA", price: 1000, esports: 99, gaming1080p: 99, gaming1440p: 98, gaming4k: 94, creator: 96, ai: 98, value: 80, vram: 16 },
  { name: "NVIDIA GeForce RTX 4090 24GB", brand: "NVIDIA", price: 1800, esports: 100, gaming1080p: 100, gaming1440p: 100, gaming4k: 100, creator: 100, ai: 100, value: 60, vram: 24 },
];

const motherboards = [
  { name: "Budget B550 Motherboard", platform: "AM4", price: 95 },
  { name: "B650 WiFi Motherboard", platform: "AM5", price: 170 },
  { name: "Budget B760 Motherboard", platform: "LGA1700", price: 145 },
  { name: "Z790 WiFi Motherboard", platform: "LGA1700", price: 220 },
];

const ramOptions = [
  { name: "16GB DDR4", price: 45 },
  { name: "32GB DDR4", price: 75 },
  { name: "32GB DDR5", price: 105 },
  { name: "64GB DDR5", price: 195 },
];

const storageOptions = [
  { name: "1TB NVMe SSD", price: 65 },
  { name: "2TB NVMe SSD", price: 120 },
  { name: "4TB NVMe SSD", price: 250 },
];

const psuOptions = [
  { name: "650W 80+ Gold PSU", price: 80, wattage: 650 },
  { name: "750W 80+ Gold PSU", price: 105, wattage: 750 },
  { name: "850W 80+ Gold PSU", price: 130, wattage: 850 },
  { name: "1000W 80+ Gold PSU", price: 180, wattage: 1000 },
];

const caseOptions = [
  { name: "Budget Airflow Case", price: 70 },
  { name: "Mid Tower Airflow Case", price: 105 },
  { name: "Premium Tempered Glass Case", price: 160 },
];

const coolerOptions = [
  { name: "Basic Air Cooler", price: 35 },
  { name: "Tower Air Cooler", price: 60 },
  { name: "240mm AIO Liquid Cooler", price: 110 },
  { name: "360mm AIO Liquid Cooler", price: 160 },
];

function getProfile(purpose) {
  if (purpose === "home") return { cpuWeight: 0.45, gpuWeight: 0.15, valueWeight: 0.4, metric: "gaming1080p" };
  if (purpose === "esports") return { cpuWeight: 0.38, gpuWeight: 0.47, valueWeight: 0.15, metric: "esports" };
  if (purpose === "gaming1080p") return { cpuWeight: 0.35, gpuWeight: 0.5, valueWeight: 0.15, metric: "gaming1080p" };
  if (purpose === "gaming1440p") return { cpuWeight: 0.3, gpuWeight: 0.58, valueWeight: 0.12, metric: "gaming1440p" };
  if (purpose === "gaming4k") return { cpuWeight: 0.22, gpuWeight: 0.68, valueWeight: 0.1, metric: "gaming4k" };
  if (purpose === "streaming") return { cpuWeight: 0.42, gpuWeight: 0.45, valueWeight: 0.13, metric: "gaming1440p" };
  if (purpose === "creator") return { cpuWeight: 0.44, gpuWeight: 0.38, valueWeight: 0.18, metric: "creator" };
  if (purpose === "ai") return { cpuWeight: 0.22, gpuWeight: 0.65, valueWeight: 0.13, metric: "ai" };
  return { cpuWeight: 0.35, gpuWeight: 0.5, valueWeight: 0.15, metric: "gaming1440p" };
}

function chooseMotherboard(cpu) {
  if (cpu.socket === "AM4") return motherboards.find((x) => x.platform === "AM4");
  if (cpu.socket === "AM5") return motherboards.find((x) => x.platform === "AM5");
  if (cpu.price < 300) return motherboards.find((x) => x.name.includes("B760"));
  return motherboards.find((x) => x.name.includes("Z790"));
}

function chooseRam(cpu, purpose, budget) {
  if (purpose === "home" && budget < 900) return ramOptions.find((x) => x.name === "16GB DDR4");
  if (purpose === "creator" || purpose === "ai" || budget >= 2600) return ramOptions.find((x) => x.name === "64GB DDR5");
  if (cpu.socket === "AM4") return ramOptions.find((x) => x.name === "32GB DDR4");
  return ramOptions.find((x) => x.name === "32GB DDR5");
}

function chooseStorage(purpose, budget) {
  if (budget >= 2800 || purpose === "creator" || purpose === "ai") return storageOptions.find((x) => x.name === "2TB NVMe SSD");
  return storageOptions.find((x) => x.name === "1TB NVMe SSD");
}

function choosePSU(gpu) {
  if (gpu.price >= 1000) return psuOptions.find((x) => x.wattage === 1000);
  if (gpu.price >= 700) return psuOptions.find((x) => x.wattage === 850);
  if (gpu.price >= 450) return psuOptions.find((x) => x.wattage === 750);
  return psuOptions.find((x) => x.wattage === 650);
}

function chooseCase(budget) {
  if (budget >= 2600) return caseOptions.find((x) => x.name.includes("Premium"));
  if (budget >= 1100) return caseOptions.find((x) => x.name.includes("Mid"));
  return caseOptions.find((x) => x.name.includes("Budget"));
}

function chooseCooler(cpu, budget) {
  if (cpu.name.includes("i9") || cpu.name.includes("7950")) return coolerOptions.find((x) => x.name.includes("360mm"));
  if (cpu.name.includes("i7") || cpu.name.includes("7900") || budget >= 1800) return coolerOptions.find((x) => x.name.includes("240mm"));
  if (cpu.price >= 190) return coolerOptions.find((x) => x.name.includes("Tower"));
  return coolerOptions.find((x) => x.name.includes("Basic"));
}

function isAllowedByStyle(cpu, gpu, style) {
  if (style === "amd") return cpu.brand === "AMD" && gpu.brand === "AMD";
  if (style === "intel") return cpu.brand === "Intel";
  if (style === "nvidia") return gpu.brand === "NVIDIA";
  return true;
}

function getCpuUpgradePriority(cpu, purpose) {
  if (purpose === "gaming1440p" || purpose === "gaming4k") {
    if (cpu.name.includes("Ryzen 9 7950X3D")) return 100;
    if (cpu.name.includes("Core i9")) return 96;
    if (cpu.name.includes("Ryzen 9 7900X")) return 92;
    if (cpu.name.includes("Ryzen 7 7800X3D")) return 88;
  }

  if (purpose === "creator" || purpose === "ai" || purpose === "streaming") {
    if (cpu.name.includes("Core i9")) return 100;
    if (cpu.name.includes("Ryzen 9 7950X3D")) return 98;
    if (cpu.name.includes("Ryzen 9 7900X")) return 95;
    if (cpu.name.includes("Core i7")) return 88;
  }

  return cpu.gaming + cpu.productivity * 0.25;
}

function upgradeBuildCpu(build, budget, purpose, style) {
  const remainingBudget = budget - build.total;
  const gpuIsStrongEnough = build.gpu.price >= 570 || build.gpu.gaming1440p >= 88 || build.gpu.gaming4k >= 73;
  const shouldUpgradeCpu = budget >= 2200 && remainingBudget >= 120 && gpuIsStrongEnough;

  if (!shouldUpgradeCpu) return build;
  if (style === "value") return build;

  const currentMotherboard = build.motherboard;
  const currentRam = build.ram;
  const currentCooler = build.cooler;

  const upgradeOptions = cpus
    .filter((cpu) => {
      if (style === "amd" && cpu.brand !== "AMD") return false;
      if (style === "intel" && cpu.brand !== "Intel") return false;
      if (style === "flagship" && !isFlagshipCpu(cpu)) return false;
      return isFlagshipCpu(cpu) || cpu.name.includes("Core i7") || cpu.name.includes("Ryzen 7");
    })
    .map((cpu) => {
      const motherboard = chooseMotherboard(cpu);
      const ram = chooseRam(cpu, purpose, budget);
      const cooler = chooseCooler(cpu, budget);
      const newTotal = build.total - build.cpu.price - currentMotherboard.price - currentRam.price - currentCooler.price + cpu.price + motherboard.price + ram.price + cooler.price;
      return { cpu, motherboard, ram, cooler, total: newTotal };
    })
    .filter((option) => option.total <= budget)
    .sort((a, b) => getCpuUpgradePriority(b.cpu, purpose) - getCpuUpgradePriority(a.cpu, purpose));

  const bestUpgrade = upgradeOptions[0];
  if (!bestUpgrade) return build;

  const currentPriority = getCpuUpgradePriority(build.cpu, purpose);
  const upgradePriority = getCpuUpgradePriority(bestUpgrade.cpu, purpose);

  if (upgradePriority <= currentPriority) return build;

  return {
    ...build,
    cpu: bestUpgrade.cpu,
    motherboard: bestUpgrade.motherboard,
    ram: bestUpgrade.ram,
    cooler: bestUpgrade.cooler,
    total: bestUpgrade.total,
  };
}

function generateCandidates(budget, purpose, style) {
  const candidates = [];

  for (const cpu of cpus) {
    for (const gpu of gpus) {
      if (!isAllowedByStyle(cpu, gpu, style)) continue;
      if (purpose === "home" && gpu.price > 430) continue;
      if (purpose === "ai" && gpu.brand !== "NVIDIA" && style !== "amd") continue;

      const motherboard = chooseMotherboard(cpu);
      const ram = chooseRam(cpu, purpose, budget);
      const storage = chooseStorage(purpose, budget);
      const psu = choosePSU(gpu);
      const pcCase = chooseCase(budget);
      const cooler = chooseCooler(cpu, budget);

      const total = cpu.price + gpu.price + motherboard.price + ram.price + storage.price + psu.price + pcCase.price + cooler.price;

      if (total > budget) continue;
      if (budget > 1200 && total < budget * 0.58) continue;

      const baseBuild = { cpu, gpu, motherboard, ram, storage, psu, case: pcCase, cooler, total };
      const upgradedBuild = upgradeBuildCpu(baseBuild, budget, purpose, style);

      candidates.push(upgradedBuild);
    }
  }

  const unique = [];
  const seen = new Set();

  for (const build of candidates) {
    const key = `${build.cpu.name}-${build.gpu.name}-${build.total}`;
    if (!seen.has(key)) {
      unique.push(build);
      seen.add(key);
    }
  }

  return unique;
}

function isFlagshipCpu(cpu) {
  return cpu.name.includes("Ryzen 9") || cpu.name.includes("i9");
}

function scoreBuild(build, purpose, budget, style, target) {
  const profile = getProfile(purpose);
  const gpuPerf = build.gpu[profile.metric];
  const cpuPerf = purpose === "creator" ? build.cpu.productivity : purpose === "ai" ? build.cpu.ai : build.cpu.gaming;

  const performanceScore = gpuPerf * profile.gpuWeight + cpuPerf * profile.cpuWeight;
  const valueScore = ((performanceScore / build.total) * 1000 + build.gpu.value + build.cpu.value) / 3;
  const budgetUseScore = Math.max(0, 100 - (Math.abs(budget - build.total) / budget) * 100);

  let brandScore = 0;
  if (style === "amd") brandScore += (build.cpu.brand === "AMD" ? 12 : 0) + (build.gpu.brand === "AMD" ? 12 : 0);
  if (style === "intel") brandScore += build.cpu.brand === "Intel" ? 18 : 0;
  if (style === "nvidia") brandScore += build.gpu.brand === "NVIDIA" ? 18 : 0;

  if (purpose === "ai" && build.gpu.brand === "NVIDIA") brandScore += 20;
  if (["esports", "gaming1080p", "gaming1440p"].includes(purpose) && build.gpu.brand === "AMD") brandScore += 6;
  if (purpose === "home" && build.total < 1000) brandScore += 8;

  let cpuTierScore = 0;
  const flagshipCpu = isFlagshipCpu(build.cpu);

  if (flagshipCpu && budget >= 2200) cpuTierScore += 10;
  if (flagshipCpu && budget >= 3000) cpuTierScore += 16;
  if (flagshipCpu && ["gaming4k", "gaming1440p", "streaming", "creator", "ai"].includes(purpose)) cpuTierScore += 14;
  if (flagshipCpu && style === "flagship") cpuTierScore += 30;

  if (!flagshipCpu && style === "flagship") cpuTierScore -= 18;
  if (build.cpu.name.includes("Ryzen 7 7800X3D") && ["creator", "ai", "streaming"].includes(purpose)) cpuTierScore -= 8;

  let targetBonus = 0;
  if (target === "performance") targetBonus = performanceScore * 0.32 + cpuTierScore;
  if (target === "value") targetBonus = valueScore * 0.52;
  if (target === "alternative") {
    if (build.cpu.brand === "Intel") targetBonus += 10;
    if (build.gpu.brand === "AMD" || build.gpu.brand === "Intel") targetBonus += 14;
    if (build.gpu.brand !== "NVIDIA") targetBonus += 7;
    if (flagshipCpu && budget >= 2200) targetBonus += 10;
  }

  return performanceScore * 0.58 + valueScore * profile.valueWeight + budgetUseScore * 0.16 + brandScore + cpuTierScore + targetBonus;
}

function selectBuilds(candidates, purpose, budget, style) {
  if (!candidates.length) return [];

  const performancePool = style === "flagship" || (budget >= 2600 && ["gaming4k", "gaming1440p", "streaming", "creator", "ai"].includes(purpose))
    ? candidates.filter((x) => isFlagshipCpu(x.cpu))
    : candidates;

  const byPerformance = [...(performancePool.length ? performancePool : candidates)].sort((a, b) => scoreBuild(b, purpose, budget, style, "performance") - scoreBuild(a, purpose, budget, style, "performance"))[0];

  const byValue = [...candidates]
    .filter((x) => x.cpu.name !== byPerformance.cpu.name || x.gpu.name !== byPerformance.gpu.name)
    .sort((a, b) => scoreBuild(b, purpose, budget, style, "value") - scoreBuild(a, purpose, budget, style, "value"))[0];

  const alternativePool = [...candidates].filter((x) => x.cpu.brand !== byPerformance.cpu.brand || x.gpu.brand !== byPerformance.gpu.brand);
  const byAlternative = alternativePool.sort((a, b) => scoreBuild(b, purpose, budget, style, "alternative") - scoreBuild(a, purpose, budget, style, "alternative"))[0];

  const output = [
    byPerformance && { tag: "Best Performance", build: byPerformance },
    byValue && { tag: "Best Value", build: byValue },
    byAlternative && { tag: "Alternative Pick", build: byAlternative },
  ].filter(Boolean);

  const unique = [];
  const seen = new Set();

  for (const item of output) {
    const key = `${item.build.cpu.name}-${item.build.gpu.name}`;
    if (!seen.has(key)) {
      unique.push(item);
      seen.add(key);
    }
  }

  return unique.slice(0, 3);
}

function getSearchAffiliateUrl(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&linkCode=ll2&tag=${encodeURIComponent(AFFILIATE_TAG)}&ref_=as_li_ss_tl`;
}

function getDirectProductUrl(productName) {
  const asin = DIRECT_PRODUCT_LINKS[productName];

  if (!asin) {
    return getSearchAffiliateUrl(productName);
  }

  return `https://www.amazon.com/dp/${asin}?tag=${encodeURIComponent(AFFILIATE_TAG)}&linkCode=ll1&ref_=as_li_ss_tl`;
}

function getBuildShoppingUrl(build) {
  const query = `${build.cpu.name} ${build.gpu.name} PC parts`;
  return getSearchAffiliateUrl(query);
}

function getReason(tag, build, purpose) {
  if (tag === "Best Performance") return `This option uses more of the budget for raw performance, centered around the ${build.gpu.name} and ${build.cpu.name}.`;
  if (tag === "Best Value") return `This option focuses on price-to-performance, avoiding unnecessary overspending while still matching the selected use case.`;
  if (purpose === "ai") return `This is the closest alternative path while still keeping AI and workstation needs in mind.`;
  return `This gives users a real second path instead of always showing the same CPU or GPU brand.`;
}

const SEO_ARTICLES = [
  {
    slug: "best-pc-build-under-800",
    title: "Best PC Build Under $800 (2026 Guide)",
    description: "A budget-friendly PC build for everyday use, esports, school, and light gaming without overspending.",
    budget: "$800",
    useCase: "Budget Gaming / Home Use",
    cpu: "Intel Core i3-14100F or Ryzen 5 5600",
    gpu: "Intel Arc B580 or RX 7600 XT",
    ram: "16GB DDR4",
    storage: "1TB NVMe SSD",
    fps: ["1080p Esports: 120+ FPS", "1080p High Settings: 60–90 FPS"],
    amazonQuery: "budget gaming pc parts under 800",
  },
  {
    slug: "best-pc-build-under-1000",
    title: "Best PC Build Under $1000 (2026 Guide)",
    description: "A strong value PC build for 1080p gaming, school, home office, and entry-level content creation.",
    budget: "$1000",
    useCase: "1080p Gaming / Value PC",
    cpu: "AMD Ryzen 5 7600 or Intel Core i5-12400F",
    gpu: "RX 7700 XT or RTX 4060 Ti",
    ram: "32GB DDR5",
    storage: "1TB NVMe SSD",
    fps: ["1080p Ultra: 100–160 FPS", "1440p Medium/High: 70–100 FPS"],
    amazonQuery: "best gaming pc build under 1000",
  },
  {
    slug: "best-pc-build-under-1200",
    title: "Best PC Build Under $1200 (2026 Guide)",
    description: "A balanced gaming PC build for high-refresh 1080p and entry-level 1440p gaming.",
    budget: "$1200",
    useCase: "1080p / 1440p Gaming",
    cpu: "AMD Ryzen 5 7600",
    gpu: "RX 7800 XT or RTX 4070 Super",
    ram: "32GB DDR5",
    storage: "1TB NVMe SSD",
    fps: ["1080p Ultra: 160+ FPS", "1440p Ultra: 90–130 FPS"],
    amazonQuery: "best gaming pc build under 1200",
  },
  {
    slug: "best-pc-build-under-1500",
    title: "Best PC Build Under $1500 (2026 Guide)",
    description: "A powerful mid-range PC build for 1440p gaming, streaming, and future upgrades.",
    budget: "$1500",
    useCase: "1440p Gaming",
    cpu: "AMD Ryzen 5 7600 or Ryzen 7 7800X3D",
    gpu: "RTX 4070 Super or RX 7800 XT",
    ram: "32GB DDR5",
    storage: "1TB NVMe SSD",
    fps: ["1440p Ultra: 100–140 FPS", "1080p Competitive: 200+ FPS"],
    amazonQuery: "best pc build under 1500 RTX 4070 Super",
  },
  {
    slug: "best-pc-build-under-2000",
    title: "Best PC Build Under $2000 (2026 Guide)",
    description: "A high-performance gaming PC build for 1440p ultra settings, streaming, and light creator workloads.",
    budget: "$2000",
    useCase: "High-End 1440p Gaming",
    cpu: "Ryzen 7 7800X3D or Intel Core i7-14700K",
    gpu: "RTX 4070 Ti Super or RX 7900 XT",
    ram: "32GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["1440p Ultra: 140+ FPS", "4K High: 70–100 FPS"],
    amazonQuery: "best gaming pc build under 2000",
  },
  {
    slug: "best-pc-build-under-2500",
    title: "Best PC Build Under $2500 (2026 Guide)",
    description: "A premium PC build for serious 1440p gaming, 4K gaming, streaming, and creator performance.",
    budget: "$2500",
    useCase: "Premium Gaming / Streaming",
    cpu: "Ryzen 9 7900X or Intel Core i9-14900K",
    gpu: "RTX 4080 Super or RX 7900 XTX",
    ram: "64GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["1440p Ultra: 160+ FPS", "4K Ultra: 90–120 FPS"],
    amazonQuery: "best pc build under 2500 RTX 4080 Super",
  },
  {
    slug: "best-pc-build-for-1440p-gaming",
    title: "Best PC Build for 1440p Gaming (2026)",
    description: "The best balanced PC build for smooth 1440p gaming with strong FPS and good upgrade potential.",
    budget: "$1500–$2000",
    useCase: "1440p Gaming",
    cpu: "Ryzen 7 7800X3D",
    gpu: "RTX 4070 Super or RX 7800 XT",
    ram: "32GB DDR5",
    storage: "1TB or 2TB NVMe SSD",
    fps: ["Warzone 1440p: 120–160 FPS", "Fortnite 1440p: 180+ FPS", "Cyberpunk 1440p High: 80–110 FPS"],
    amazonQuery: "best 1440p gaming pc parts",
  },
  {
    slug: "best-pc-build-for-4k-gaming",
    title: "Best PC Build for 4K Gaming (2026)",
    description: "A high-end PC build for 4K gaming with strong GPU performance and future-proof components.",
    budget: "$2500+",
    useCase: "4K Gaming",
    cpu: "Ryzen 9 7900X or Intel Core i9-14900K",
    gpu: "RTX 4080 Super or RX 7900 XTX",
    ram: "64GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["4K High: 90–120 FPS", "4K Ultra: 70–100 FPS"],
    amazonQuery: "best 4k gaming pc build RTX 4080 Super",
  },
  {
    slug: "best-pc-build-for-streaming",
    title: "Best PC Build for Streaming and Gaming (2026)",
    description: "A PC build optimized for gaming and streaming at the same time with strong CPU and GPU balance.",
    budget: "$1800–$2500",
    useCase: "Gaming + Streaming",
    cpu: "Intel Core i7-14700K or Ryzen 9 7900X",
    gpu: "RTX 4070 Ti Super or RTX 4080 Super",
    ram: "32GB or 64GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["1440p Gaming: 120+ FPS", "Streaming: Smooth 1080p60"],
    amazonQuery: "best streaming gaming pc build",
  },
  {
    slug: "best-pc-build-for-video-editing",
    title: "Best PC Build for Video Editing (2026)",
    description: "A creator-focused PC build for editing, rendering, multitasking, and content production.",
    budget: "$2000+",
    useCase: "Video Editing / Creator Work",
    cpu: "Intel Core i9-14900K or Ryzen 9 7950X3D",
    gpu: "RTX 4070 Ti Super or RTX 4080 Super",
    ram: "64GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["4K Editing: Smooth timeline performance", "Rendering: Strong multi-core performance"],
    amazonQuery: "best video editing pc build parts",
  },
  {
    slug: "best-pc-build-for-ai-machine-learning",
    title: "Best PC Build for AI and Machine Learning (2026)",
    description: "A workstation-style PC build for AI experiments, CUDA workloads, local models, and machine learning projects.",
    budget: "$2500+",
    useCase: "AI / CUDA / Machine Learning",
    cpu: "Intel Core i9-14900K or Ryzen 9 7950X3D",
    gpu: "RTX 4080 Super or RTX 4090",
    ram: "64GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["AI workloads: GPU-focused", "Local models: More VRAM recommended"],
    amazonQuery: "best AI machine learning pc build RTX 4090",
  },
  {
    slug: "best-amd-gaming-pc-build",
    title: "Best AMD Gaming PC Build (2026)",
    description: "An all-AMD gaming PC build focused on strong raster performance, value, and high VRAM.",
    budget: "$1500–$2500",
    useCase: "AMD Gaming Build",
    cpu: "Ryzen 7 7800X3D or Ryzen 9 7900X",
    gpu: "RX 7800 XT, RX 7900 XT, or RX 7900 XTX",
    ram: "32GB or 64GB DDR5",
    storage: "1TB or 2TB NVMe SSD",
    fps: ["1440p Ultra: 120+ FPS", "4K High: 70–110 FPS"],
    amazonQuery: "best AMD gaming pc build RX 7900 XTX",
  },
  {
    slug: "best-intel-gaming-pc-build",
    title: "Best Intel Gaming PC Build (2026)",
    description: "An Intel-based PC build for gaming, streaming, productivity, and users who prefer Intel CPUs.",
    budget: "$1500–$2500",
    useCase: "Intel Gaming Build",
    cpu: "Intel Core i7-14700K or Intel Core i9-14900K",
    gpu: "RTX 4070 Super, RTX 4070 Ti Super, or RTX 4080 Super",
    ram: "32GB or 64GB DDR5",
    storage: "2TB NVMe SSD",
    fps: ["1440p Ultra: 120+ FPS", "Streaming: Strong CPU headroom"],
    amazonQuery: "best Intel gaming pc build i7 14700K",
  },
];

function getArticleBySlug(slug) {
  return SEO_ARTICLES.find((article) => article.slug === slug);
}

function BlogIndex() {
  return (
    <div style={styles.blogPage}>
      <h1 style={styles.blogTitle}>PC Build Guides</h1>
      <p style={styles.blogLead}>Browse our latest PC build guides by budget, use case, and hardware preference.</p>
      <div style={styles.blogGrid}>
        {SEO_ARTICLES.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`} style={styles.blogCard}>
            <h2 style={styles.blogCardTitle}>{article.title}</h2>
            <p style={styles.blogCardText}>{article.description}</p>
            <span style={styles.blogCardMeta}>{article.budget} · {article.useCase}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SeoArticle({ article }) {
  if (!article) {
    return (
      <div style={styles.blogPage}>
        <h1 style={styles.blogTitle}>Guide Not Found</h1>
        <Link to="/blog" style={styles.blogButton}>Back to PC Build Guides</Link>
      </div>
    );
  }

  return (
    <article style={styles.blogPage}>
      <Link to="/blog" style={styles.blogBack}>← All PC Build Guides</Link>
      <h1 style={styles.blogTitle}>{article.title}</h1>
      <p style={styles.blogLead}>{article.description}</p>

      <div style={styles.blogHeroBox}>
        <div>
          <div style={styles.blogLabel}>Recommended Budget</div>
          <strong>{article.budget}</strong>
        </div>
        <div>
          <div style={styles.blogLabel}>Best For</div>
          <strong>{article.useCase}</strong>
        </div>
      </div>

      <h2 style={styles.blogSectionTitle}>Recommended Build</h2>
      <div style={styles.blogPartsGrid}>
        <PartLine label="CPU" value={article.cpu} />
        <PartLine label="GPU" value={article.gpu} />
        <PartLine label="Memory" value={article.ram} />
        <PartLine label="Storage" value={article.storage} />
      </div>

      <h2 style={styles.blogSectionTitle}>Expected Performance</h2>
      <ul style={styles.blogList}>
        {article.fps.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <h2 style={styles.blogSectionTitle}>Why This Build Makes Sense</h2>
      <p style={styles.blogParagraph}>
        This build is designed to balance performance, price, and upgrade potential. Instead of blindly choosing the most expensive parts, it focuses on the components that matter most for {article.useCase.toLowerCase()}.
      </p>

      <div style={styles.blogCtaBox}>
        <h2 style={styles.blogCtaTitle}>Want a custom version?</h2>
        <p style={styles.blogParagraph}>Use our PC Builder to generate a full parts list based on your exact budget and preferred style.</p>
        <div style={styles.blogActions}>
          <Link to="/" style={styles.blogButton}>Use PC Builder</Link>
          <a href={getSearchAffiliateUrl(article.amazonQuery)} target="_blank" rel="noreferrer nofollow sponsored" style={styles.blogAmazonButton}>Check Prices on Amazon</a>
        </div>
      </div>
    </article>
  );
}

function PartLine({ label, value }) {
  return (
    <div style={styles.blogPartCard}>
      <div style={styles.blogLabel}>{label}</div>
      <strong>{value}</strong>
    </div>
  );
}

function Home() {
  const [budget, setBudget] = useState(1500);
  const [purpose, setPurpose] = useState("gaming1440p");
  const [style, setStyle] = useState("balanced");

  const builds = useMemo(() => {
    let candidates = generateCandidates(budget, purpose, style);
    if (!candidates.length && style !== "balanced") candidates = generateCandidates(budget, purpose, "balanced");
    return selectBuilds(candidates, purpose, budget, style);
  }, [budget, purpose, style]);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.kicker}>AI PC Builder</div>
        <h1 style={styles.title}>Find the right PC build for your budget.</h1>
        <p style={styles.subtitle}>Get three smart build options: performance, value, and an alternative brand path.</p>
      </section>

      <main style={styles.layout}>
        <aside style={styles.panel}>
          <h2 style={styles.panelTitle}>Build Settings</h2>

          <div style={styles.field}>
            <label style={styles.label}>Budget</label>
            <div style={styles.budgetRow}>
              <input style={styles.range} type="range" min="600" max="5000" step="100" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
              <div style={styles.budgetBox}>${budget}</div>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Main Use</label>
            <select style={styles.select} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              {Object.entries(PURPOSES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Preferred Style</label>
            <select style={styles.select} value={style} onChange={(e) => setStyle(e.target.value)}>
              {Object.entries(STYLES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>

          <button style={styles.generateButton}>Recommendations update automatically</button>

          <div style={styles.tip}>For high budgets, choose High-End / Flagship to force Ryzen 9 or Core i9 level recommendations.</div>
        </aside>

        <section style={styles.results}>
          <div style={styles.summaryGrid}>
            <Summary label="Budget" value={`$${budget}`} />
            <Summary label="Use Case" value={PURPOSES[purpose]} />
            <Summary label="Mode" value={STYLES[style]} />
          </div>

          {builds.length === 0 ? (
            <div style={styles.empty}>No valid build found. Try increasing the budget or switching to Balanced mode.</div>
          ) : (
            builds.map((item, index) => <BuildCard key={`${item.tag}-${item.build.cpu.name}-${item.build.gpu.name}`} item={item} index={index} purpose={purpose} />)
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        {SEO_ARTICLES.map((article) => (
          <Route key={article.slug} path={`/blog/${article.slug}`} element={<SeoArticle article={article} />} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Summary({ label, value }) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryLabel}>{label}</div>
      <div style={styles.summaryValue}>{value}</div>
    </div>
  );
}

function BuildCard({ item, index, purpose }) {
  const { tag, build } = item;

  const list = [
    ["CPU", build.cpu.name, build.cpu.brand, build.cpu.price],
    ["GPU", build.gpu.name, `${build.gpu.brand} · ${build.gpu.vram}GB VRAM`, build.gpu.price],
    ["Motherboard", build.motherboard.name, build.cpu.socket, build.motherboard.price],
    ["Memory", build.ram.name, "RAM", build.ram.price],
    ["Storage", build.storage.name, "SSD", build.storage.price],
    ["Power Supply", build.psu.name, `${build.psu.wattage}W`, build.psu.price],
    ["Case", build.case.name, "Airflow", build.case.price],
    ["Cooler", build.cooler.name, "Cooling", build.cooler.price],
  ];


  return (
    <article style={styles.buildCard}>
      <div style={styles.resultHeader}>
        <div>
          <div style={styles.badge}>{index + 1}. {tag}</div>
          <h2 style={styles.buildTitle}>{build.cpu.brand} CPU + {build.gpu.brand} GPU Build</h2>
          <p style={styles.smallText}>{build.cpu.name} / {build.gpu.name}</p>
        </div>
        <div style={styles.totalBox}>
          <div style={styles.label}>Estimated Total</div>
          <div style={styles.total}>${Math.round(build.total)}</div>
        </div>
      </div>

      <div style={styles.reason}>{getReason(tag, build, purpose)}</div>

      <div style={styles.actionsTop}>
        <a style={styles.primaryLink} href={getBuildShoppingUrl(build)} target="_blank" rel="noreferrer nofollow sponsored">Shop Full Build</a>
        <a style={styles.secondaryLink} href={getDirectProductUrl(build.gpu.name)} target="_blank" rel="noreferrer nofollow sponsored">Best GPU Deal</a>
      </div>

      <div style={styles.partsGrid}>
        {list.map(([type, name, meta, price]) => (
          <div key={`${type}-${name}`} style={styles.partCard}>
            <div>
              <div style={styles.partType}>{type}</div>
              <div style={styles.partName}>{name}</div>
              <div style={styles.partMeta}>{meta} · ${price}</div>
            </div>
            <a style={styles.partLink} href={getDirectProductUrl(name)} target="_blank" rel="noreferrer nofollow sponsored">Shop</a>
          </div>
        ))}
      </div>
    </article>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0f172a", color: "#e5e7eb", fontFamily: "Inter, Arial, sans-serif", padding: "32px 20px 60px" },
  hero: { maxWidth: "980px", margin: "0 auto 28px", textAlign: "center" },
  kicker: { display: "inline-block", padding: "7px 12px", borderRadius: "999px", background: "rgba(37, 99, 235, 0.16)", color: "#93c5fd", fontSize: "13px", fontWeight: 900, marginBottom: "12px" },
  title: { margin: 0, color: "#ffffff", fontSize: "48px", lineHeight: 1.05, letterSpacing: "-1.5px" },
  subtitle: { maxWidth: "760px", margin: "14px auto 0", color: "#cbd5e1", fontSize: "18px" },
  layout: { maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "start" },
  panel: { background: "#111827", border: "1px solid #243041", borderRadius: "20px", padding: "22px", position: "sticky", top: "20px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" },
  panelTitle: { margin: "0 0 18px", color: "#ffffff", fontSize: "22px" },
  field: { marginBottom: "18px" },
  label: { display: "block", color: "#94a3b8", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" },
  budgetRow: { display: "grid", gridTemplateColumns: "1fr 90px", gap: "10px", alignItems: "center" },
  budgetBox: { background: "#020617", border: "1px solid #334155", color: "#93c5fd", borderRadius: "12px", padding: "10px", textAlign: "center", fontWeight: 900 },
  range: { width: "100%" },
  select: { width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #334155", background: "#020617", color: "#ffffff", fontSize: "15px", outline: "none" },
  generateButton: { marginTop: "4px", width: "100%", padding: "14px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#ffffff", fontSize: "15px", fontWeight: 900 },
  tip: { marginTop: "14px", background: "rgba(56, 189, 248, 0.09)", border: "1px solid rgba(56, 189, 248, 0.25)", color: "#cbd5e1", borderRadius: "14px", padding: "14px", fontSize: "13px" },
  results: { display: "grid", gap: "20px" },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" },
  summaryCard: { background: "#111827", border: "1px solid #243041", borderRadius: "18px", padding: "16px" },
  summaryLabel: { color: "#94a3b8", fontSize: "13px", marginBottom: "4px" },
  summaryValue: { color: "#ffffff", fontSize: "18px", fontWeight: 900 },
  buildCard: { background: "#111827", border: "1px solid #243041", borderRadius: "20px", padding: "22px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" },
  resultHeader: { display: "flex", justifyContent: "space-between", gap: "18px", alignItems: "flex-start", marginBottom: "16px" },
  badge: { display: "inline-flex", padding: "6px 10px", borderRadius: "999px", background: "rgba(56, 189, 248, 0.12)", color: "#7dd3fc", border: "1px solid rgba(56, 189, 248, 0.35)", fontSize: "12px", fontWeight: 900, marginBottom: "8px" },
  buildTitle: { margin: 0, color: "#ffffff", fontSize: "24px" },
  smallText: { margin: "5px 0 0", color: "#94a3b8", fontSize: "14px" },
  totalBox: { background: "#020617", border: "1px solid #334155", borderRadius: "16px", padding: "14px 18px", textAlign: "center", minWidth: "150px" },
  total: { color: "#86efac", fontSize: "25px", fontWeight: 900 },
  reason: { background: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99, 102, 241, 0.3)", color: "#cbd5e1", borderRadius: "14px", padding: "14px", marginBottom: "16px" },
  actionsTop: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" },
  primaryLink: { display: "inline-flex", justifyContent: "center", alignItems: "center", textDecoration: "none", padding: "13px 14px", borderRadius: "12px", background: "#f97316", color: "#ffffff", fontWeight: 900 },
  secondaryLink: { display: "inline-flex", justifyContent: "center", alignItems: "center", textDecoration: "none", padding: "13px 14px", borderRadius: "12px", background: "#020617", border: "1px solid #334155", color: "#cbd5e1", fontWeight: 900 },
  partsGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px" },
  partCard: { background: "#020617", border: "1px solid #243041", borderRadius: "16px", padding: "16px", display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" },
  partType: { color: "#94a3b8", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" },
  partName: { color: "#ffffff", fontWeight: 900, marginBottom: "5px" },
  partMeta: { color: "#94a3b8", fontSize: "13px" },
  partLink: { textDecoration: "none", padding: "8px 10px", borderRadius: "10px", background: "rgba(249, 115, 22, 0.14)", color: "#fdba74", border: "1px solid rgba(249, 115, 22, 0.35)", fontSize: "13px", fontWeight: 900, whiteSpace: "nowrap" },
  empty: { background: "#111827", border: "1px solid #243041", borderRadius: "20px", padding: "22px", color: "#cbd5e1" },
  blogPage: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "Inter, Arial, sans-serif", maxWidth: "980px", margin: "0 auto", padding: "48px 22px 80px" },
  blogTitle: { fontSize: "42px", lineHeight: 1.1, letterSpacing: "-1px", margin: "10px 0 14px", color: "#0f172a" },
  blogLead: { fontSize: "18px", lineHeight: 1.7, color: "#475569", margin: "0 0 26px" },
  blogBack: { display: "inline-block", color: "#2563eb", textDecoration: "none", fontWeight: 800, marginBottom: "12px" },
  blogHeroBox: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "18px", margin: "24px 0" },
  blogLabel: { color: "#64748b", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" },
  blogSectionTitle: { fontSize: "26px", margin: "30px 0 14px", color: "#0f172a" },
  blogPartsGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px" },
  blogPartCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "16px" },
  blogList: { fontSize: "17px", lineHeight: 1.8, color: "#334155" },
  blogParagraph: { fontSize: "17px", lineHeight: 1.8, color: "#334155" },
  blogCtaBox: { background: "#0f172a", color: "#e5e7eb", borderRadius: "22px", padding: "24px", marginTop: "34px" },
  blogCtaTitle: { color: "#ffffff", margin: "0 0 8px", fontSize: "26px" },
  blogActions: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "18px" },
  blogButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#2563eb", color: "#ffffff", textDecoration: "none", padding: "13px 16px", borderRadius: "12px", fontWeight: 900 },
  blogAmazonButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#f97316", color: "#ffffff", textDecoration: "none", padding: "13px 16px", borderRadius: "12px", fontWeight: 900 },
  blogGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px", marginTop: "24px" },
  blogCard: { display: "block", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "18px", textDecoration: "none", color: "#0f172a" },
  blogCardTitle: { fontSize: "20px", margin: "0 0 8px", color: "#0f172a" },
  blogCardText: { color: "#475569", lineHeight: 1.6, margin: "0 0 12px" },
  blogCardMeta: { color: "#2563eb", fontWeight: 900, fontSize: "13px" },
};
