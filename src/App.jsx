import React, { useMemo, useState } from "react";

const AFFILIATE_TAG = "yourtag-20";

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

      candidates.push({ cpu, gpu, motherboard, ram, storage, psu, case: pcCase, cooler, total });
    }
  }

  return candidates;
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

  let targetBonus = 0;
  if (target === "performance") targetBonus = performanceScore * 0.32;
  if (target === "value") targetBonus = valueScore * 0.52;
  if (target === "alternative") {
    if (build.cpu.brand === "Intel") targetBonus += 10;
    if (build.gpu.brand === "AMD" || build.gpu.brand === "Intel") targetBonus += 14;
    if (build.gpu.brand !== "NVIDIA") targetBonus += 7;
  }

  return performanceScore * 0.58 + valueScore * profile.valueWeight + budgetUseScore * 0.16 + brandScore + targetBonus;
}

function selectBuilds(candidates, purpose, budget, style) {
  if (!candidates.length) return [];

  const byPerformance = [...candidates].sort((a, b) => scoreBuild(b, purpose, budget, style, "performance") - scoreBuild(a, purpose, budget, style, "performance"))[0];

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

function getAffiliateUrl(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${encodeURIComponent(AFFILIATE_TAG)}`;
}

function getReason(tag, build, purpose) {
  if (tag === "Best Performance") return `This option uses more of the budget for raw performance, centered around the ${build.gpu.name} and ${build.cpu.name}.`;
  if (tag === "Best Value") return `This option focuses on price-to-performance, avoiding unnecessary overspending while still matching the selected use case.`;
  if (purpose === "ai") return `This is the closest alternative path while still keeping AI and workstation needs in mind.`;
  return `This gives users a real second path instead of always showing the same CPU or GPU brand.`;
}

export default function App() {
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

          <div style={styles.tip}>Affiliate links are built into each shopping button. Users only see clean product recommendations.</div>
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

  const shopQuery = `${build.cpu.name} ${build.gpu.name} PC build`;

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
        <a style={styles.primaryLink} href={getAffiliateUrl(shopQuery)} target="_blank" rel="noreferrer nofollow sponsored">Shop Full Build</a>
        <a style={styles.secondaryLink} href={getAffiliateUrl(`${build.gpu.name}`)} target="_blank" rel="noreferrer nofollow sponsored">Best GPU Deal</a>
      </div>

      <div style={styles.partsGrid}>
        {list.map(([type, name, meta, price]) => (
          <div key={`${type}-${name}`} style={styles.partCard}>
            <div>
              <div style={styles.partType}>{type}</div>
              <div style={styles.partName}>{name}</div>
              <div style={styles.partMeta}>{meta} · ${price}</div>
            </div>
            <a style={styles.partLink} href={getAffiliateUrl(name)} target="_blank" rel="noreferrer nofollow sponsored">Shop</a>
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
};
