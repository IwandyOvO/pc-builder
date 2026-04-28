import React, { useMemo, useState } from "react";

const usageOptions = [
  {
    id: "basic",
    title: "Everyday Home Use",
    desc: "Web browsing, office work, online classes, video streaming"
  },
  {
    id: "gaming",
    title: "Gaming",
    desc: "Esports, FPS games, AAA games, high refresh rate gaming"
  },
  {
    id: "creator",
    title: "Content Creation",
    desc: "Video editing, design, streaming, 3D work, Adobe apps"
  },
  {
    id: "heavy",
    title: "Heavy Workstation",
    desc: "AI workloads, rendering, local models, professional multitasking"
  }
];

function pick(options) {
  return options[Math.floor(Math.random() * options.length)];
}

function chooseCPU(usage, budget) {
  if (usage === "basic") {
    if (budget < 700) return "Intel Core i3-13100";
    if (budget < 1000) return pick(["Intel Core i5-13400", "AMD Ryzen 5 5600"]);
    return pick(["Intel Core i5-14400", "AMD Ryzen 5 7600"]);
  }

  if (usage === "gaming") {
    if (budget < 900) return pick(["AMD Ryzen 5 5600", "Intel Core i5-12400F"]);
    if (budget < 1300) return pick(["AMD Ryzen 5 7600", "Intel Core i5-13400F"]);
    if (budget < 1800) return pick(["AMD Ryzen 7 5800X3D", "Intel Core i5-13600KF"]);
    if (budget < 2600) return pick(["AMD Ryzen 7 7800X3D", "Intel Core i7-14700KF"]);
    return pick(["AMD Ryzen 9 7900X", "AMD Ryzen 7 7800X3D", "Intel Core i9-14900K"]);
  }

  if (usage === "creator") {
    if (budget < 1200) return pick(["Intel Core i5-13600KF", "AMD Ryzen 7 5700X"]);
    if (budget < 1800) return pick(["Intel Core i7-13700KF", "AMD Ryzen 7 7700X"]);
    if (budget < 2600) return pick(["Intel Core i7-14700KF", "AMD Ryzen 9 7900X"]);
    return pick(["Intel Core i9-14900K", "AMD Ryzen 9 7950X"]);
  }

  if (usage === "heavy") {
    if (budget < 1800) return pick(["Intel Core i7-14700KF", "AMD Ryzen 9 7900X"]);
    if (budget < 3000) return pick(["Intel Core i9-14900K", "AMD Ryzen 9 7950X"]);
    return pick(["AMD Ryzen 9 9950X", "Intel Core i9-14900K"]);
  }

  return "Intel Core i5-13400";
}

function chooseGPU(usage, budget) {
  if (usage === "basic") {
    if (budget < 900) return "Integrated Graphics";
    return pick(["NVIDIA RTX 3050", "AMD Radeon RX 6600"]);
  }

  if (usage === "gaming") {
    if (budget < 900) return pick(["NVIDIA RTX 4060", "AMD Radeon RX 7600"]);
    if (budget < 1400) return pick(["NVIDIA RTX 4060 Ti", "AMD Radeon RX 7700 XT"]);
    if (budget < 1900) return pick(["NVIDIA RTX 4070 Super", "AMD Radeon RX 7800 XT"]);
    if (budget < 2800) return pick(["NVIDIA RTX 4070 Ti Super", "AMD Radeon RX 7900 XT"]);
    return pick(["NVIDIA RTX 4080 Super", "AMD Radeon RX 7900 XTX"]);
  }

  if (usage === "creator") {
    if (budget < 1200) return "NVIDIA RTX 4060";
    if (budget < 1800) return "NVIDIA RTX 4060 Ti 16GB";
    if (budget < 2600) return "NVIDIA RTX 4070 Ti Super";
    return "NVIDIA RTX 4080 Super";
  }

  if (usage === "heavy") {
    if (budget < 2500) return "NVIDIA RTX 4070 Ti Super";
    if (budget < 4000) return "NVIDIA RTX 4080 Super";
    return "NVIDIA RTX 4090";
  }

  return "NVIDIA RTX 4060";
}

function chooseRAM(usage, budget) {
  if (usage === "basic") return budget < 900 ? "16GB DDR4" : "16GB DDR5";
  if (usage === "gaming") return budget < 1600 ? "32GB DDR4 or DDR5" : "32GB DDR5";
  if (usage === "creator") return budget < 2200 ? "32GB DDR5" : "64GB DDR5";
  if (usage === "heavy") return budget < 3000 ? "64GB DDR5" : "128GB DDR5";
  return "32GB DDR5";
}

function chooseStorage(usage, budget) {
  if (usage === "basic") return budget < 800 ? "500GB NVMe SSD" : "1TB NVMe SSD";
  if (usage === "gaming") return budget < 1600 ? "1TB NVMe SSD" : "2TB NVMe SSD";
  if (usage === "creator") return budget < 2200 ? "2TB NVMe SSD" : "2TB NVMe SSD + 4TB Storage";
  if (usage === "heavy") return "2TB Gen4 NVMe SSD + Extra Storage";
  return "1TB NVMe SSD";
}

function chooseMotherboard(cpu, budget) {
  if (cpu.includes("5600") || cpu.includes("5700") || cpu.includes("5800")) return "B550 Motherboard";
  if (
    cpu.includes("7600") ||
    cpu.includes("7700") ||
    cpu.includes("7800") ||
    cpu.includes("7900") ||
    cpu.includes("7950") ||
    cpu.includes("9950")
  ) {
    return budget > 2500 ? "X670 Motherboard" : "B650 Motherboard";
  }
  if (cpu.includes("i3") || cpu.includes("i5")) return "B760 Motherboard";
  if (cpu.includes("i7") || cpu.includes("i9")) return budget > 2500 ? "Z790 Motherboard" : "B760 or Z790 Motherboard";
  return "Compatible Motherboard";
}

function choosePSU(gpu) {
  if (gpu.includes("Integrated")) return "500W 80+ Bronze";
  if (gpu.includes("3050") || gpu.includes("4060") || gpu.includes("6600") || gpu.includes("7600")) return "650W 80+ Bronze or Gold";
  if (gpu.includes("4070") || gpu.includes("7700") || gpu.includes("7800")) return "750W 80+ Gold";
  if (gpu.includes("4080") || gpu.includes("7900")) return "850W 80+ Gold";
  if (gpu.includes("4090")) return "1000W 80+ Gold";
  return "750W 80+ Gold";
}

function chooseCooler(cpu, usage) {
  if (usage === "basic") return "Stock Cooler or Air Cooler";
  if (cpu.includes("i9") || cpu.includes("7950") || cpu.includes("9950")) return "360mm Liquid Cooler";
  if (cpu.includes("i7") || cpu.includes("7900") || cpu.includes("7800")) return "240mm Liquid Cooler or Premium Air Cooler";
  return "Tower Air Cooler";
}

function chooseCase(budget) {
  if (budget < 900) return "Compact Airflow Case";
  if (budget < 1800) return "Mid Tower Airflow Case";
  if (budget < 3000) return "Premium Glass Airflow Case";
  return "High-End Showcase Case";
}

function getRecommendationNote(usage) {
  if (usage === "basic") {
    return "For everyday home use, the system prioritizes reliability, SSD speed, and value instead of unnecessary graphics power.";
  }

  if (usage === "gaming") {
    return "For gaming, the system prioritizes GPU performance first, then CPU performance for better frame rates.";
  }

  if (usage === "creator") {
    return "For content creation, NVIDIA GPUs are prioritized because of better compatibility with many editing and rendering applications.";
  }

  if (usage === "heavy") {
    return "For workstation use, the system prioritizes CPU cores, GPU power, memory capacity, and power stability.";
  }

  return "This configuration is balanced for general use.";
}

function buildPC(usage, budget) {
  const cpu = chooseCPU(usage, budget);
  const gpu = chooseGPU(usage, budget);

  return {
    cpu,
    gpu,
    ram: chooseRAM(usage, budget),
    storage: chooseStorage(usage, budget),
    motherboard: chooseMotherboard(cpu, budget),
    psu: choosePSU(gpu),
    cooler: chooseCooler(cpu, usage),
    case: chooseCase(budget),
    note: getRecommendationNote(usage)
  };
}

export default function App() {
  const [usage, setUsage] = useState("gaming");
  const [budget, setBudget] = useState(1500);
  const [result, setResult] = useState(null);

  const selectedUsage = useMemo(() => {
    return usageOptions.find((item) => item.id === usage);
  }, [usage]);

  function handleGenerate() {
    setResult(buildPC(usage, Number(budget)));
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.badge}>Custom PC Builder</div>
          <h1 style={styles.title}>Find the right PC configuration</h1>
          <p style={styles.subtitle}>
            Choose your usage and budget. The recommendation logic will match the CPU, GPU, memory,
            storage, motherboard, power supply, cooling, and case.
          </p>
        </div>

        <div style={styles.layout}>
          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>1. Select usage</h2>

            <div style={styles.optionsGrid}>
              {usageOptions.map((item) => {
                const active = usage === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUsage(item.id)}
                    style={{
                      ...styles.optionCard,
                      ...(active ? styles.optionCardActive : {})
                    }}
                  >
                    <div style={styles.optionTitle}>{item.title}</div>
                    <div style={styles.optionDesc}>{item.desc}</div>
                  </button>
                );
              })}
            </div>

            <div style={styles.budgetSection}>
              <h2 style={styles.panelTitle}>2. Select budget</h2>

              <div style={styles.budgetRow}>
                <span style={styles.smallText}>Budget</span>
                <span style={styles.budgetValue}>${budget}</span>
              </div>

              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                style={styles.range}
              />

              <div style={styles.rangeLabels}>
                <span>$500</span>
                <span>$5000</span>
              </div>
            </div>

            <button type="button" onClick={handleGenerate} style={styles.generateButton}>
              Generate Recommendation
            </button>
          </div>

          <div style={styles.panel}>
            <div style={styles.resultHeader}>
              <div>
                <h2 style={styles.panelTitle}>Recommended Build</h2>
                <p style={styles.smallText}>
                  Current profile: {selectedUsage?.title} / ${budget}
                </p>
              </div>

              {result && (
                <div style={styles.totalBox}>
                  <div style={styles.label}>Budget</div>
                  <div style={styles.total}>${budget}</div>
                </div>
              )}
            </div>

            {!result && (
              <div style={styles.empty}>
                Select a usage profile and budget, then generate your recommendation.
              </div>
            )}

            {result && (
              <>
                <div style={styles.partsGrid}>
                  <Part label="CPU" value={result.cpu} />
                  <Part label="GPU" value={result.gpu} />
                  <Part label="Memory" value={result.ram} />
                  <Part label="Storage" value={result.storage} />
                  <Part label="Motherboard" value={result.motherboard} />
                  <Part label="Power Supply" value={result.psu} />
                  <Part label="Cooling" value={result.cooler} />
                  <Part label="Case" value={result.case} />
                </div>

                <div style={styles.noteBox}>
                  <strong>Recommendation Note:</strong> {result.note}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Part({ label, value }) {
  return (
    <div style={styles.partCard}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    padding: "40px 20px"
  },
  container: {
    width: "100%",
    maxWidth: "1180px",
    margin: "0 auto"
  },
  hero: {
    textAlign: "center",
    marginBottom: "32px"
  },
  badge: {
    display: "inline-flex",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#ffffff",
    boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
    fontWeight: 800,
    fontSize: "14px",
    marginBottom: "18px"
  },
  title: {
    fontSize: "46px",
    margin: "0 0 8px",
    letterSpacing: "-1px"
  },
  subtitle: {
    color: "#64748b",
    fontSize: "18px",
    maxWidth: "820px",
    margin: "0 auto",
    lineHeight: 1.45
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "420px minmax(0, 1fr)",
    gap: "32px",
    alignItems: "start"
  },
  panel: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 14px 40px rgba(15,23,42,0.08)"
  },
  panelTitle: {
    margin: "0 0 14px",
    fontSize: "24px"
  },
  optionsGrid: {
    display: "grid",
    gap: "12px"
  },
  optionCard: {
    textAlign: "left",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    cursor: "pointer"
  },
  optionCardActive: {
    border: "2px solid #2563eb",
    background: "#eff6ff"
  },
  optionTitle: {
    fontSize: "16px",
    fontWeight: 800,
    marginBottom: "6px"
  },
  optionDesc: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.45
  },
  budgetSection: {
    marginTop: "26px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0"
  },
  budgetRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  budgetValue: {
    fontSize: "28px",
    fontWeight: 900,
    color: "#2563eb"
  },
  range: {
    width: "100%"
  },
  rangeLabels: {
    display: "flex",
    justifyContent: "space-between",
    color: "#64748b",
    fontSize: "13px"
  },
  generateButton: {
    marginTop: "24px",
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 900,
    cursor: "pointer"
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    marginBottom: "18px"
  },
  smallText: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px"
  },
  totalBox: {
    background: "#0f172a",
    color: "#ffffff",
    borderRadius: "18px",
    padding: "14px 18px",
    minWidth: "150px",
    textAlign: "center"
  },
  total: {
    fontSize: "25px",
    fontWeight: 900
  },
  label: {
    fontSize: "12px",
    textTransform: "uppercase",
    color: "#64748b",
    fontWeight: 800,
    letterSpacing: "0.5px"
  },
  partsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px"
  },
  partCard: {
    padding: "16px",
    borderRadius: "18px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0"
  },
  value: {
    fontWeight: 900,
    marginTop: "6px",
    fontSize: "16px",
    lineHeight: 1.35
  },
  noteBox: {
    marginTop: "20px",
    padding: "16px",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: "16px",
    color: "#92400e",
    fontSize: "14px",
    lineHeight: 1.5
  },
  empty: {
    padding: "28px",
    borderRadius: "18px",
    background: "#fff7ed",
    color: "#9a3412",
    fontWeight: 800
  }
};