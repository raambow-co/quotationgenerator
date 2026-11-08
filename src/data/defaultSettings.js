export const defaultSettings = {
  company: {
    name: "JAYARAMS SOLAR SOLUTIONS",
    legalName: "Jayarams Solar Solutions Pvt. Ltd.",
    shortName: "JAYARAMS",
    tagline: "Built on Trust. Driven by Excellence.",
    subheading: "State DISCOM Empanelled Solar EPC Vendor • Registered PM Surya Ghar Channel Partner",
    address: "Jayarams Tower, Plot #48, Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033",
    branches: "Hyderabad | Visakhapatnam | Bangalore | Vijayawada",
    phone: "+91 98480 12345 / +91 89127 65432",
    email: "solar@jayaramsenergy.com",
    website: "www.jayaramsenergy.com",
    gstin: "36AABCJ9821K1ZX",
    pan: "AABCJ9821K",
    bankDetails: {
      accountName: "Jayarams Solar Solutions Pvt. Ltd.",
      bankName: "HDFC Bank Ltd.",
      accountNumber: "50200084729103",
      ifscCode: "HDFC0001628",
      branch: "Jubilee Hills Main Branch, Hyderabad",
      accountType: "Current Account"
    }
  },
  pricing: {
    defaultRatePerKw: 52000,
    commercialRatePerKw: 45000,
    defaultGstRate: 13.8, // standard composite solar EPC rate (70% goods @ 12%, 30% services @ 18% -> 13.8%)
    defaultTariffPerUnit: 8.5,
    defaultSubsidyScheme: 'pm-surya-ghar'
  },
  equipmentCatalog: {
    panelBrands: [
      { id: 'waaree', name: 'Waaree Solar', model: 'Arka Series 550Wp Bi-facial Dual Glass TOPCon (WXS-550-BIF)', wattage: 550, cellType: 'N-Type TOPCon 16BB' },
      { id: 'adani', name: 'Adani Solar', model: 'Shine Series 545Wp Mono PERC Half-Cut Module', wattage: 545, cellType: 'Mono PERC 10BB' },
      { id: 'tata', name: 'Tata Power Solar', model: 'TP550 High-Efficiency Tier-1 Mono Module', wattage: 550, cellType: 'Mono PERC Half-Cut' }
    ],
    inverterBrands: [
      { id: 'sungrow', name: 'Sungrow Power', model: 'SG5.0RS Multi-MPPT On-Grid Smart Inverter with Wi-Fi IoT', efficiency: '98.4%' },
      { id: 'growatt', name: 'Growatt New Energy', model: 'MIN / MID Series Dual MPPT Smart Inverter with ShineWiFi', efficiency: '98.4%' },
      { id: 'solis', name: 'Solis Ginlong', model: 'S6 Pro Series Solar Grid-Tied Inverter with Remote Telemetry', efficiency: '98.5%' }
    ],
    structureTypes: [
      { id: 'gi-elevated', name: 'Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance (IS 875 Compliant)' },
      { id: 'alum-flush', name: 'Anodized High-Strength Aluminum — Non-Elevated Flush Mount' },
      { id: 'tin-shed', name: 'Industrial Metal Sheet / Klip-Lok Bracket System' }
    ],
    cableBrands: "Polycab / Siechem 4 sq.mm / 6 sq.mm TUV Certified Solar DC Cable (EN 50618) & Finolex AC Cable",
    protectionSuite: "Dual SPD (Type II DC & AC Surge Protectors), Schneider / L&T MCBs, Copper Bonded Chemical Earthing (3 Pits, IS 3043:2018), Class A Lightning Arrester"
  },
  defaultWarranties: {
    panelPerformance: "25-Year Linear Performance Warranty (Min 98% in Yr 1, ≤0.55%/yr linear degradation, ≥84.8% at Yr 25)",
    panelProduct: "12-Year Comprehensive Manufacturer Product Workmanship Defect Warranty",
    inverterWarranty: "10-Year Standard Manufacturer Repair / Replacement Warranty",
    workmanshipAmc: "5-Year Comprehensive Free AMC & Preventive Maintenance by Jayarams Solar Solutions Pvt. Ltd."
  },
  defaultPaymentTerms: [
    { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance of quotation & structural CAD layout design sign-off" },
    { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon physical delivery of Solar PV Modules, Inverter & Mounting Structures at site" },
    { milestone: "Commissioning & Net Metering", percentage: 10, description: "Upon successful plant testing, synchronization & submission for Discom net-metering" }
  ],
  portfolioWorks: [
    {
      id: 'proj-1',
      title: "Luxury Villa Rooftop Array",
      category: "Residential",
      client: "Residential Villa Solar Rooftop",
      city: "Mangalampeta, Andhra Pradesh",
      capacity: "10.0 kWp",
      panels: "Waaree 550Wp Bi-facial TOPCon (18 Nos)",
      inverter: "Sungrow 10kW Smart Wi-Fi Inverter",
      annualGeneration: "15,800 kWh / year",
      annualSavings: "₹ 1,34,300 / year",
      co2Saved: "13 Tonnes/yr",
      structure: "Elevated GI Structure (8 ft clearance)",
      imageUrl: "/assets/portfolio/project-1.jpg",
      description: "High-efficiency elevated pergola rooftop with zero roof puncture, allowing full terrace recreational use."
    },
    {
      id: 'proj-2',
      title: "Arogya Multi-Speciality Centre",
      category: "Commercial",
      client: "Arogya Healthcare Diagnostics",
      city: "Polavaram, Andhra Pradesh",
      capacity: "25.0 kWp",
      panels: "Tata Power Solar 540Wp Mono PERC (46 Nos)",
      inverter: "Growatt 25kW Multi-MPPT Inverter",
      annualGeneration: "39,500 kWh / year",
      annualSavings: "₹ 3,55,500 / year",
      co2Saved: "32 Tonnes/yr",
      structure: "Super-Structure engineered as per IS 875 wind norms",
      imageUrl: "/assets/portfolio/project-2.jpg",
      description: "Powers daytime intensive diagnostic suites, laboratory equipment, and central HVAC cooling units."
    },
    {
      id: 'proj-3',
      title: "St. Xavier Engineering Plant",
      category: "Institutional",
      client: "St. Xavier Engineering Campus",
      city: "Mogarala, Andhra Pradesh",
      capacity: "50.0 kWp",
      panels: "Adani Solar 545Wp Bifacial (92 Nos)",
      inverter: "Solis 50kW Dual Inverters",
      annualGeneration: "78,800 kWh / year",
      annualSavings: "₹ 7,10,000 / year",
      co2Saved: "64 Tonnes/yr",
      structure: "Concrete Flat Roof Ballasted & Anchor Bolt Mounting",
      imageUrl: "/assets/portfolio/project-3.jpg",
      description: "Heavy-duty anchor-ballasted mounting with multi-inverter synchronization, lowering campus operating expenses."
    },
    {
      id: 'proj-4',
      title: "Apex Precision Tooling & Parts",
      category: "Industrial",
      client: "Apex Precision Tools & Auto-Components",
      city: "Thenepalle, Andhra Pradesh",
      capacity: "100.0 kWp",
      panels: "Waaree 550Wp High-Power Modules (182 Nos)",
      inverter: "Sungrow 110kW Commercial String Inverter",
      annualGeneration: "1,58,000 kWh / year",
      annualSavings: "₹ 14,22,000 / year",
      co2Saved: "129 Tonnes/yr",
      structure: "Trapezoidal Metal Sheet Klip-Lok Racking",
      imageUrl: "/assets/portfolio/project-4.jpg",
      description: "Rapid 3.1-year capital payback with 40% accelerated depreciation tax benefits and uninterrupted manufacturing operations."
    }
  ]
};
