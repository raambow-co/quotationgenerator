export const defaultSettings = {
  company: {
    name: "JAYARAMS SOLAR SOLUTIONS",
    shortName: "JAYARAMS",
    tagline: "Built on Trust. Driven by Excellence.",
    subheading: "MNRE Registered & Approved Solar EPC System Integrator",
    address: "Jayarams Energy Tower, Plot #48, Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033",
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
      { id: 'waaree', name: 'Waaree Solar', model: '550Wp Bi-facial Dual Glass TopCon', wattage: 550, cellType: 'N-Type TOPCon 16BB' },
      { id: 'adani', name: 'Adani Solar', model: '545Wp Mono PERC Half-Cut Module', wattage: 545, cellType: 'Mono PERC 10BB' },
      { id: 'vikram', name: 'Vikram Solar', model: '550Wp Hypersol Ultra-Efficient Series', wattage: 550, cellType: 'Mono PERC Multi-Busbar' },
      { id: 'tata', name: 'Tata Power Solar', model: '540Wp High Performance Tier-1', wattage: 540, cellType: 'Mono PERC Half-Cut' },
      { id: 'canadian', name: 'Canadian Solar', model: '550Wp HiKu7 Super High Power', wattage: 550, cellType: 'Dual Cell Mono PERC' }
    ],
    inverterBrands: [
      { id: 'sungrow', name: 'Sungrow Power', model: 'SG Series Multi-MPPT On-Grid Inverter with Wi-Fi & App', efficiency: '98.6%' },
      { id: 'growatt', name: 'Growatt New Energy', model: 'MIN / MID Series Dual MPPT Smart Inverter', efficiency: '98.4%' },
      { id: 'solis', name: 'Solis Ginlong', model: 'S6 Pro Series Solar Grid-Tied Inverter', efficiency: '98.5%' },
      { id: 'polycab', name: 'Polycab Solar', model: 'Optimus Series Smart Grid Inverter', efficiency: '98.2%' },
      { id: 'enphase', name: 'Enphase Energy', model: 'IQ8 Microinverter Modular System (Decentralized)', efficiency: '97.5%' },
      { id: 'deye', name: 'Deye Energy', model: 'Hybrid Inverter with Smart Energy Management & Battery Sync', efficiency: '97.6%' }
    ],
    structureTypes: [
      { id: 'gi-elevated', name: 'Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance' },
      { id: 'alum-flush', name: 'Anodized High-Strength Aluminum — Non-Elevated Flush Mount' },
      { id: 'tin-shed', name: 'Industrial Metal Sheet / Klip-Lok Bracket System' },
      { id: 'custom-gazebo', name: 'Architectural Solar Gazebo / Pergola Premium Elevated Structure' }
    ],
    cableBrands: "Polycab / Siechem 4 sq.mm / 6 sq.mm TUV Certified Solar DC Cable & Finolex AC Cable",
    protectionSuite: "Dual SPD (Type II DC & AC Surge Protectors), Schneider / L&T MCBs, Copper Bonded Chemical Earthing (3 Pits), Class A Lightning Arrester"
  },
  defaultWarranties: {
    panelPerformance: "25 Years Linear Power Output Warranty (Min 90% at 10 yrs, 84.8% at 25 yrs)",
    panelProduct: "12 Years Comprehensive Manufacturer Product Defect Warranty",
    inverterWarranty: "10 Years Standard Manufacturer Replacement / Repair Warranty",
    workmanshipAmc: "5 Years Comprehensive Free AMC, Preventive Maintenance & Health Checks by Jayarams"
  },
  defaultPaymentTerms: [
    { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance of quotation & structural CAD layout design approval" },
    { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon delivery of Solar PV Modules, Inverter & Mounting Structures at site" },
    { milestone: "Commissioning & Net Metering", percentage: 10, description: "Upon successful testing, synchronization & submission for Discom net-metering" }
  ],
  portfolioWorks: [
    {
      id: 'proj-1',
      title: "10 kW Luxury Villa Rooftop",
      category: "Residential",
      client: "Dr. K. S. Rao, Jubilee Hills",
      city: "Hyderabad, Telangana",
      capacity: "10.0 kWp",
      panels: "Waaree 550Wp Bi-facial TOPCon (18 Nos)",
      inverter: "Sungrow 10kW Smart Wi-Fi Inverter",
      annualGeneration: "15,800 Units / year",
      annualSavings: "₹ 1,34,300 / year",
      co2Saved: "13 Tonnes/yr",
      structure: "Elevated GI Structure (8 ft clearance)",
      imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=700&q=80",
      description: "Complete rooftop utilization allowing usable terrace leisure space below elevated structures."
    },
    {
      id: 'proj-2',
      title: "25 kW Multi-Speciality Clinic & Hospital",
      category: "Commercial",
      client: "Arogya Healthcare Diagnostics",
      city: "Visakhapatnam, Andhra Pradesh",
      capacity: "25.0 kWp",
      panels: "Tata Power Solar 540Wp Mono PERC (46 Nos)",
      inverter: "Growatt 25kW Multi-MPPT Inverter",
      annualGeneration: "39,500 Units / year",
      annualSavings: "₹ 3,55,500 / year",
      co2Saved: "32 Tonnes/yr",
      structure: "Super-Structure with Wind Speed Rating 160 kmph",
      imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=700&q=80",
      description: "Powers daytime diagnostic equipment, surgical suites, and central HVAC cooling units."
    },
    {
      id: 'proj-3',
      title: "50 kW Educational Institution Campus",
      category: "Institutional",
      client: "St. Xavier Engineering Campus",
      city: "Vijayawada, Andhra Pradesh",
      capacity: "50.0 kWp",
      panels: "Adani Solar 545Wp Bifacial (92 Nos)",
      inverter: "Solis 50kW Dual Inverters",
      annualGeneration: "78,800 Units / year",
      annualSavings: "₹ 7,10,000 / year",
      co2Saved: "64 Tonnes/yr",
      structure: "Concrete Flat Roof Ballasted & Anchor Bolt Mounting",
      imageUrl: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=700&q=80",
      description: "Net-zero green campus initiative reducing operational institutional overheads by 65%."
    },
    {
      id: 'proj-4',
      title: "100 kW Precision Engineering Facility",
      category: "Industrial",
      client: "Apex Precision Tools & Auto-Components",
      city: "Sri City SEZ, Andhra Pradesh",
      capacity: "100.0 kWp",
      panels: "Waaree 550Wp High-Power Modules (182 Nos)",
      inverter: "Sungrow 110kW Commercial String Inverter",
      annualGeneration: "1,58,000 Units / year",
      annualSavings: "₹ 14,22,000 / year",
      co2Saved: "129 Tonnes/yr",
      structure: "Trapezoidal Metal Sheet Klip-Lok Racking",
      imageUrl: "https://images.unsplash.com/photo-1548611716-ad957e80a066?auto=format&fit=crop&w=700&q=80",
      description: "Rapid 3.1-year capital payback with accelerated depreciation and uninterrupted industrial operation."
    }
  ]
};

