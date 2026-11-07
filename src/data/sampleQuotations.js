export const sampleQuotations = [
  {
    id: "quote-1",
    quotationNumber: "JAY-SOL-2026-1048",
    date: "2026-11-05",
    validityDays: 30,
    status: "Approved",
    customer: {
      name: "Srikanth Reddy",
      companyName: "Reddy Residencies",
      phone: "+91 98492 48102",
      email: "srikanth.reddy@outlook.com",
      location: "Plot 112, Gachibowli Hills, Hyderabad, Telangana",
      consumerNumber: "TSSPDCL-04829104",
      sanctionedLoad: "10 kW",
      gridPhase: "3-Phase",
      roofType: "RCC Flat Concrete Terrace"
    },
    technical: {
      systemCapacityKw: 5.5,
      panelBrand: "Waaree Solar",
      panelModel: "550Wp Bi-facial Dual Glass TopCon",
      panelWattage: 550,
      panelCount: 10,
      inverterBrand: "Sungrow Power",
      inverterModel: "SG5.0RS On-Grid Multi-MPPT Smart Inverter with Wi-Fi",
      structureType: "Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance",
      cablesAndBOS: "Polycab 4 sq.mm TUV DC Cables, Type II DC/AC SPD, 3 Copper Chemical Earthing Pits, Class A Lightning Arrester",
      monitoring: "Smart Wi-Fi Cloud Real-time Mobile Application",
      estimatedDailyUnits: 24,
      estimatedAnnualUnits: 8600,
      estimatedMonthlySavings: 6120,
      estimatedAnnualSavings: 73100,
      roofAreaSqFt: 520,
      co2SavedTonnes: 7.1
    },
    commercials: {
      ratePerKw: 52000,
      baseCost: 286000,
      discount: 6000,
      priceAfterDiscount: 280000,
      gstRate: 13.8,
      gstAmount: 38640,
      totalGrossCost: 318640,
      subsidyScheme: "PM Surya Ghar: Muft Bijli Yojana",
      subsidyAmount: 78000,
      netPayable: 240640,
      paybackYears: "3.3",
      cumulativeSavings25Years: 1586860
    },
    warranties: {
      panelPerformance: "25 Years Linear Performance Warranty (Min 84.8% at year 25)",
      panelProduct: "12 Years Comprehensive Manufacturer Defect Warranty",
      inverterWarranty: "10 Years Replacement / Repair Manufacturer Warranty",
      workmanshipAmc: "5 Years Free Comprehensive Maintenance & Quarterly Inspections"
    },
    paymentMilestones: [
      { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance & structural CAD design sign-off" },
      { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon delivery of panels, inverter & structures at site" },
      { milestone: "Testing & Net Metering", percentage: 10, description: "Upon physical completion & submission to TSSPDCL" }
    ],
    notes: "Proposal includes complete turnkey Discom net-metering liaison, RCC foundation column pedestals, and one complimentary high-pressure solar panel cleaning kit.",
    preparedBy: "Jayarams Solar Engineering & Sales Team"
  },
  {
    id: "quote-2",
    quotationNumber: "JAY-SOL-2026-1052",
    date: "2026-11-06",
    validityDays: 21,
    status: "Sent",
    customer: {
      name: "Dr. Ananya Rao",
      companyName: "Rao Orthopedic Centre",
      phone: "+91 89125 78432",
      email: "dr.ananya@raohealth.in",
      location: "MVP Colony Sector 4, Visakhapatnam, Andhra Pradesh",
      consumerNumber: "APEPDCL-91823901",
      sanctionedLoad: "15 kW",
      gridPhase: "3-Phase",
      roofType: "RCC Flat Commercial Rooftop"
    },
    technical: {
      systemCapacityKw: 10.0,
      panelBrand: "Tata Power Solar",
      panelModel: "545Wp Mono PERC Half-Cut Module",
      panelWattage: 545,
      panelCount: 19,
      inverterBrand: "Growatt New Energy",
      inverterModel: "MID 10KTL3-X Dual MPPT Commercial Grid Inverter",
      structureType: "Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance",
      cablesAndBOS: "Siechem 4 sq.mm Solar Cables, Dual Surge Protection Devices, Erico Copper Earthing Pits, Solid Copper Spike Arrester",
      monitoring: "Growatt ShineWiFi Cloud Monitoring with 24/7 Generation Alerts",
      estimatedDailyUnits: 43,
      estimatedAnnualUnits: 15700,
      estimatedMonthlySavings: 11100,
      estimatedAnnualSavings: 133450,
      roofAreaSqFt: 950,
      co2SavedTonnes: 12.9
    },
    commercials: {
      ratePerKw: 49000,
      baseCost: 490000,
      discount: 10000,
      priceAfterDiscount: 480000,
      gstRate: 13.8,
      gstAmount: 66240,
      totalGrossCost: 546240,
      subsidyScheme: "PM Surya Ghar: Muft Bijli Yojana (Capped at 3kW)",
      subsidyAmount: 78000,
      netPayable: 468240,
      paybackYears: "3.5",
      cumulativeSavings25Years: 2868010
    },
    warranties: {
      panelPerformance: "25 Years Linear Performance Warranty (Min 84.8% at year 25)",
      panelProduct: "12 Years Comprehensive Manufacturer Defect Warranty",
      inverterWarranty: "10 Years Replacement / Repair Manufacturer Warranty",
      workmanshipAmc: "5 Years Free Comprehensive Maintenance & Quarterly Inspections"
    },
    paymentMilestones: [
      { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance & structural CAD design sign-off" },
      { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon delivery of panels, inverter & structures at site" },
      { milestone: "Testing & Net Metering", percentage: 10, description: "Upon physical completion & submission to APEPDCL" }
    ],
    notes: "Special commercial rooftop bracket fixtures installed to withstand coastal wind gusts up to 160 km/h.",
    preparedBy: "Jayarams Solar Engineering & Sales Team"
  },
  {
    id: "quote-3",
    quotationNumber: "JAY-SOL-2026-1035",
    date: "2026-11-03",
    validityDays: 15,
    status: "Draft",
    customer: {
      name: "B. Venkatesh",
      companyName: "Venkatesh Textiles",
      phone: "+91 97011 88412",
      email: "venkatesh.tex@gmail.com",
      location: "MG Road, Auto Nagar Industrial Estate, Vijayawada, AP",
      consumerNumber: "APCPDCL-77382103",
      sanctionedLoad: "35 kW",
      gridPhase: "3-Phase LT",
      roofType: "Industrial Trapezoidal Metal Sheet"
    },
    technical: {
      systemCapacityKw: 25.0,
      panelBrand: "Waaree Solar",
      panelModel: "550Wp Bi-facial Dual Glass TopCon",
      panelWattage: 550,
      panelCount: 46,
      inverterBrand: "Sungrow Power",
      inverterModel: "SG25CX Multi-MPPT Industrial Solar Inverter",
      structureType: "Industrial Metal Sheet / Klip-Lok Bracket System",
      cablesAndBOS: "Polycab 6 sq.mm TUV Solar DC Cables, Industrial ACDB/DCDB, 4 Chemical Earthing Pits, Advanced ESE Lightning Protection",
      monitoring: "iSolarCloud Industrial Web Portal & Smart Energy Dashboard",
      estimatedDailyUnits: 108,
      estimatedAnnualUnits: 39400,
      estimatedMonthlySavings: 28200,
      estimatedAnnualSavings: 334900,
      roofAreaSqFt: 2350,
      co2SavedTonnes: 32.3
    },
    commercials: {
      ratePerKw: 44000,
      baseCost: 1100000,
      discount: 25000,
      priceAfterDiscount: 1075000,
      gstRate: 13.8,
      gstAmount: 148350,
      totalGrossCost: 1223350,
      subsidyScheme: "Commercial - Accelerated Depreciation (Tax Benefit 40%)",
      subsidyAmount: 0,
      netPayable: 1223350,
      paybackYears: "3.6",
      cumulativeSavings25Years: 7149150
    },
    warranties: {
      panelPerformance: "25 Years Linear Performance Warranty (Min 84.8% at year 25)",
      panelProduct: "12 Years Comprehensive Manufacturer Defect Warranty",
      inverterWarranty: "10 Years Replacement / Repair Manufacturer Warranty",
      workmanshipAmc: "5 Years Free Comprehensive Maintenance & Quarterly Inspections"
    },
    paymentMilestones: [
      { milestone: "Booking & Engineering Advance", percentage: 20, description: "Upon acceptance & structural CAD design sign-off" },
      { milestone: "Material Dispatch & Delivery", percentage: 70, description: "Upon delivery of panels, inverter & structures at site" },
      { milestone: "Testing & Net Metering", percentage: 10, description: "Upon physical completion & submission to Discom" }
    ],
    notes: "Includes industrial grade zero-export relay device option, APCPDCL statutory liaison, and complete factory electrical audit.",
    preparedBy: "Jayarams Solar Engineering & Sales Team"
  }
];

