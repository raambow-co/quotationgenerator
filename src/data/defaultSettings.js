export const defaultSettings = {
  company: {
    name: "JAYARAMS SOLAR SOLUTIONS",
    legalName: "Jayarams Solar Solutions Pvt. Ltd.",
    shortName: "JAYARAMS",
    tagline: "Built on Trust. Driven by Excellence.",
    subheading: "State DISCOM Empanelled Solar EPC Vendor • Registered PM Surya Ghar Channel Partner",
    about: "JAYARAMS SOLAR SOLUTIONS PVT. LTD. is a premier clean energy EPC company specializing in high-performance rooftop solar installations across residential, commercial, institutional, and industrial facilities. Backed by certified civil and electrical engineers, we combine Tier-1 BloombergNEF hardware with precision structural design, seamless DISCOM net-metering facilitation, and lifetime IoT monitoring.",
    address: "Plot #48, Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033",
    branches: "Hyderabad | Visakhapatnam | Bangalore | Vijayawada",
    phone: "+91 98480 12345 / +91 89127 65432",
    email: "solar@jayaramsenergy.com",
    website: "www.jayaramsenergy.com",
    gstin: "36AABCJ9821K1ZX",
    cin: "U40106TG2020PTC144589",
    pan: "AABCJ9821K",
    mnreEmpanelment: "TS-DISCOM-8492",
    msme: "UDYAM-TS-02-0048192"
  },
  
  qrPortals: {
    facebook: {
      title: "Facebook",
      handle: "@jayaramssolar",
      badge: "Social",
      actionText: "Scan to Follow",
      url: "https://facebook.com/jayaramssolar",
      image: "/assets/qr/fb-qr.jpeg"
    },
    instagram: {
      title: "Instagram",
      handle: "@jayaramssolar",
      badge: "Reels",
      actionText: "Scan to View",
      url: "https://instagram.com/jayaramssolar",
      image: "/assets/qr/insta-qr.jpeg"
    },
    website: {
      title: "Official Website",
      handle: "jayaramsenergy.com",
      badge: "Portal",
      actionText: "Scan to Visit",
      url: "https://www.jayaramsenergy.com",
      image: "/assets/qr/web-qr.jpeg"
    },
    googleMaps: {
      title: "Google Maps",
      handle: "Jubilee Hills HQ",
      badge: "Location",
      actionText: "Scan for Route",
      url: "https://maps.google.com/?q=Jayarams+Solar+Hyderabad",
      image: "/assets/qr/loc-qr.jpeg"
    }
  },

  coverPage: {
    heroTitle: "Techno-Commercial Solar Proposal",
    heroSubtitle: "Tailored high-efficiency solar photovoltaic power generation system engineered for maximum energy yield, structural durability, and substantial utility bill savings.",
    badge1: "Grid-Interactive Solar PV System",
    badge2: "DISCOM Empanelled EPC",
    features: [
      "Tier-1 BloombergNEF Rated High-Efficiency PV Modules",
      "Smart Grid-Tie Inverter with Real-Time Wi-Fi IoT Cloud Telemetry",
      "Hot-Dip Galvanized Structure (Wind Resistance up to 150 km/h)",
      "Turnkey DISCOM Net-Metering Documentation & Portal Liaison",
      "5-Year Comprehensive Workmanship & Generation SLA Support",
      "Zero Roof Puncture Ballasted / Anti-Leak Fastening Engineering"
    ]
  },

  pricing: {
    defaultRatePerKw: 52000,
    commercialRatePerKw: 45000,
    defaultGstRate: 13.8, // standard composite solar EPC rate (70% goods @ 12%, 30% services @ 18% -> 13.8%)
    defaultTariffPerUnit: 8.5,
    tariffEscalationRate: 3.5, // % per annum
    panelDegradationRate: 0.55, // % per annum linear
    defaultSubsidyScheme: 'PM Surya Ghar: Muft Bijli Yojana',
    defaultSubsidyAmount: 78000,
    co2FactorPerKwh: 0.82, // kg CO2 per kWh grid baseline
    treeFactorPerTonne: 16.5 // trees per tonne of CO2
  },

  equipmentCatalog: {
    panelBrands: [
      { id: 'waaree', name: 'Waaree Solar', model: 'Arka Series 550Wp Bi-facial Dual Glass TOPCon (WXS-550-BIF)', wattage: 550, cellType: 'N-Type TOPCon 16BB', efficiency: '22.3%', dimensions: '2278 × 1134 × 30 mm', weight: '31.5 kg' },
      { id: 'adani', name: 'Adani Solar', model: 'Shine Series 545Wp Mono PERC Half-Cut Module', wattage: 545, cellType: 'Mono PERC 10BB', efficiency: '21.5%', dimensions: '2274 × 1134 × 35 mm', weight: '28.5 kg' },
      { id: 'tata', name: 'Tata Power Solar', model: 'TP550 High-Efficiency Tier-1 Mono Module', wattage: 550, cellType: 'Mono PERC Half-Cut', efficiency: '21.4%', dimensions: '2279 × 1134 × 35 mm', weight: '28.6 kg' }
    ],
    inverterBrands: [
      { id: 'sungrow', name: 'Sungrow Power', model: 'SG5.0RS Multi-MPPT On-Grid Smart Inverter with Wi-Fi IoT', efficiency: '98.4%', maxDcInput: '7500 W', mpptChannels: '2 MPPTs', warranty: '10 Years' },
      { id: 'growatt', name: 'Growatt New Energy', model: 'MIN / MID Series Dual MPPT Smart Inverter with ShineWiFi', efficiency: '98.4%', maxDcInput: '7500 W', mpptChannels: '2 MPPTs', warranty: '10 Years' },
      { id: 'solis', name: 'Solis Ginlong', model: 'S6 Pro Series Solar Grid-Tied Inverter with Remote Telemetry', efficiency: '98.5%', maxDcInput: '7500 W', mpptChannels: '2 MPPTs', warranty: '10 Years' }
    ],
    structureSpecs: {
      type: "Hot-Dip Galvanized Iron (GI)",
      coating: "80 Microns Zinc Coating (IS 4759)",
      windRating: "Up to 150 km/h (IS 875 Part 3)",
      tiltAngle: "12° - 15° True South Orientation",
      hardware: "SS-304 Grade Fasteners & Anti-Theft Clamps",
      pedestal: "M20 Grade RCC Footing with Anchor Bolts / Ballasted"
    },
    electricalSpecs: {
      dcCable: "Polycab / Siechem 4 / 6 sq.mm TUV Certified Solar DC Cable (EN 50618)",
      acCable: "Finolex / Havells 4-Core Copper / Aluminum Armoured Cable",
      distributionBoxes: "IP65 Polycarbonate Enclosures with Type II Surge Protection Devices (SPD)",
      earthing: "3-Pit Chemical Earthing (Inverter, Structure, Lightning) as per IS 3043:2018",
      lightningArrester: "Class-A Early Streamer Emission (ESE) / Copper Spike Arrester"
    },
    standards: [
      "IS / IEC 61215: PV Module Design Qualification & Type Approval",
      "IS / IEC 61730: PV Module Safety Qualification (Class II)",
      "IEC 62109-1/2: Safety of Power Converters in PV Systems",
      "IS 875 (Part 3): Code of Practice for Structural Wind Loads",
      "IS 3043:2018: Code of Practice for Electrical Earthing"
    ]
  },

  warranties: {
    panelPerformance: "25-Year Linear Performance Warranty (≥98% Year 1, ≤0.55%/yr linear degradation, ≥84.8% at Year 25)",
    panelProduct: "12-Year Comprehensive Manufacturer Product Workmanship Defect Warranty",
    inverterWarranty: "10-Year Standard Manufacturer Repair / Replacement Warranty",
    structureWarranty: "10-Year Structural Integrity & Corrosion Warranty (80µm Hot-Dip Galvanized Iron)",
    workmanshipAmc: "5-Year Comprehensive Free AMC & Preventive Maintenance by Jayarams Solar Solutions Pvt. Ltd."
  },

  paymentMilestones: [
    { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance of quotation & structural CAD layout design sign-off" },
    { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon physical delivery of Solar PV Modules, Inverter & Mounting Structures at site" },
    { milestone: "Commissioning & Net Metering", percentage: 10, description: "Upon successful plant testing, synchronization & submission for Discom net-metering" }
  ],

  authorization: {
    signatoryName: "Er. R. Jayaram Reddy",
    signatoryTitle: "Technical Director & Head of EPC",
    division: "Technical EPC Engineering & Commercial Sales Division",
    approvedBadge: "Approved & Signed",
    stampTop: "★ JAYARAMS SOLAR SOLUTIONS ★",
    stampCenter: "AUTHORIZED",
    stampBottom: "TECHNICAL EPC DIVISION"
  },

  executionRoadmap: [
    { step: 1, title: "3D CAD Survey", description: "Shadow trajectory & roof load analysis." },
    { step: 2, title: "Engineering", description: "SLD design & structural calculations." },
    { step: 3, title: "DISCOM Approvals", description: "Net-metering feasibility liaison." },
    { step: 4, title: "Installation", description: "Elevated GI MMS & TOPCon rigging." },
    { step: 5, title: "Commissioning", description: "3-pit earthing test & grid sync." },
    { step: 6, title: "Telemetry & AMC", description: "24/7 Cloud app monitoring." }
  ],

  scopeOfWorkMatrix: [
    { item: "Supply of Tier-1 Bifacial Solar PV Modules & Smart Grid Inverter", epc: true, client: false },
    { item: "Custom Hot-Dip GI Structure (80µ Zinc), Civil Pedestals & Rigging", epc: true, client: false },
    { item: "ACDB, DCDB, 3 Chemical Earthing Pits (IS 3043) & Lightning Arrester", epc: true, client: false },
    { item: "State DISCOM Bi-Directional Net-Metering Documentation & Approvals", epc: true, client: false },
    { item: "5-Year Comprehensive Workmanship, Structural & Yield AMC Guarantee", epc: true, client: false },
    { item: "Shadow-Free Terrace Space & Water Point with Hose for Panel Cleaning", epc: false, client: true }
  ],

  omAssurance: {
    tagline: "Pan-South India Service Network",
    features: [
      { title: "Biannual Health Check", description: "I-V curve tracer tests & thermography" },
      { title: "24/7 Telemetry Desk", description: "Automated inverter fault alert system" },
      { title: "Torque Audit", description: "Annual SS-304 fastener torque checks" },
      { title: "Regional Hubs", description: "Hyd • Vzg • Vja • Blr • Chn" }
    ]
  },

  portfolioWorks: {
    metrics: {
      plantsCount: "850+",
      plantsLabel: "Rooftop Plants",
      plantsSubtitle: "Across South India",
      capacity: "12.8+ MW",
      capacityLabel: "Total Capacity",
      capacitySubtitle: "Grid Synchronized",
      savings: "₹4.8+ Cr",
      savingsLabel: "Annual Savings",
      savingsSubtitle: "For Esteemed Clients",
      netMetering: "100%",
      netMeteringLabel: "Net-Metering",
      netMeteringSubtitle: "Zero Statutory Delays"
    },
    projects: [
      {
        id: 'proj-1',
        title: "Luxury Villa Rooftop — Mangalampeta",
        category: "Residential • 10.0 kWp",
        iconType: "home",
        brand1: "/assets/brands/waaree.png",
        brand1Name: "Waaree",
        brand2: "/assets/brands/sungrow.png",
        brand2Name: "Sungrow",
        verifiedBadge: "GPS Geotagged",
        description: "Elevated GI pergola structure with 8.5-ft terrace clearance and zero roof puncture.",
        annualGeneration: "15,800 kWh / yr",
        annualSavings: "₹ 1,34,300 / yr",
        imageUrl: "/assets/portfolio/project-1.jpg"
      },
      {
        id: 'proj-2',
        title: "Arogya Multi-Speciality — Polavaram",
        category: "Commercial • 25.0 kWp",
        iconType: "building",
        brand1: "/assets/brands/tata-solar.png",
        brand1Name: "Tata Solar",
        brand2: "/assets/brands/growatt.png",
        brand2Name: "Growatt",
        verifiedBadge: "GPS Geotagged",
        description: "Powers intensive healthcare diagnostics, OT facilities, and central HVAC cooling.",
        annualGeneration: "39,500 kWh / yr",
        annualSavings: "₹ 3,55,500 / yr",
        imageUrl: "/assets/portfolio/project-2.jpg"
      },
      {
        id: 'proj-3',
        title: "St. Xavier Engineering — Mogarala",
        category: "Institutional • 50.0 kWp",
        iconType: "graduation",
        brand1: "/assets/brands/adani.png",
        brand1Name: "Adani",
        brand2: "/assets/brands/solis.png",
        brand2Name: "Solis",
        verifiedBadge: "GPS Geotagged",
        description: "Heavy-duty elevated anchor-ballasted mounting with multi-inverter sync.",
        annualGeneration: "78,800 kWh / yr",
        annualSavings: "₹ 7,10,000 / yr",
        imageUrl: "/assets/portfolio/project-3.jpg"
      },
      {
        id: 'proj-4',
        title: "Apex Precision Tooling — Thenepalle",
        category: "Industrial • 100.0 kWp",
        iconType: "factory",
        brand1: "/assets/brands/waaree.png",
        brand1Name: "Waaree",
        brand2: "/assets/brands/sungrow.png",
        brand2Name: "Sungrow",
        verifiedBadge: "GPS Geotagged",
        description: "Rapid 3.1-yr payback with accelerated depreciation 40% tax benefits.",
        annualGeneration: "1,58,000 kWh / yr",
        annualSavings: "₹ 14,22,000 / yr",
        imageUrl: "/assets/portfolio/project-4.jpg"
      }
    ],
    extraShowcase: [
      {
        id: 'extra-1',
        title: "Multi-String Elevated Rooftop Array",
        description: "Dual-row elevated GI structure with integrated lightning protection & conduit routing",
        locationPill: "Chittoor, AP",
        categoryPill: "Elevated Rooftop Array • Heavy-Duty GI MMS",
        badgeText: "150 km/h Wind Rated",
        imageUrl: "/assets/showcase/project-extra-1.jpeg"
      },
      {
        id: 'extra-2',
        title: "GPS Field-Verified Turnkey Installation",
        description: "Thenepalle, Andhra Pradesh • Net-meter synchronized with copper chemical earthing",
        locationPill: "Thenepalle, AP",
        categoryPill: "GPS Geotagged Rooftop Plant",
        badgeText: "Field Verified",
        imageUrl: "/assets/showcase/project-extra-2.jpeg"
      }
    ]
  }
};
