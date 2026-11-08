/**
 * Solar techno-commercial calculation utilities for JAYARAMS SOLAR SOLUTIONS
 * Conforms to MNRE, PM Surya Ghar DBT guidelines, and IS 875 structural standards.
 */

export const calculateSolarMetrics = (capacityKw, tariffPerUnit = 8.5, panelWattage = 550) => {
  const targetKw = parseFloat(capacityKw) || 0;
  const tariff = parseFloat(tariffPerUnit) || 8.5;
  const wattage = parseFloat(panelWattage) || 550;

  // Number of modules needed (rounded to whole number of standard modules)
  const totalWattsNeeded = targetKw * 1000;
  const panelCount = wattage > 0 ? Math.ceil(totalWattsNeeded / wattage) : 0;
  
  // Exact DC Nameplate Capacity
  const actualDcCapacityKw = wattage > 0 
    ? Number(((panelCount * wattage) / 1000).toFixed(2))
    : targetKw;

  // AC Inverter Sizing (Standard 1.0x to 1.15x DC:AC ratio)
  const acInverterCapacityKw = targetKw;

  // Specific Yield for South India (Telangana / Andhra Pradesh / Karnataka):
  // Average 4.25 to 4.30 kWh per kWp DC per day (accounting for standard PR of 78-80%)
  // Daily generation = DC capacity * 4.25 kWh/kWp/day
  const dailyUnitsExact = actualDcCapacityKw * 4.25;
  const dailyUnits = Number(dailyUnitsExact.toFixed(1)); // e.g. 21.5 or 23.4 kWh/day
  
  // Annual generation = dailyUnits * 365 days (perfectly harmonized)
  const annualUnits = Math.round(dailyUnits * 365);
  const monthlyUnits = Math.round(annualUnits / 12);

  // Bill Savings (exact arithmetic: annualUnits * tariffPerUnit)
  const annualSavings = Math.round(annualUnits * tariff);
  const monthlySavings = Math.round(annualSavings / 12);

  // Usable Rooftop shadow-free area required:
  // Modern 550Wp modules require approx. 70 to 80 sq.ft per kWp DC + walkway space (~90 sq.ft/kWp total)
  const roofAreaSqFt = Math.round(actualDcCapacityKw * 90);
  const roofAreaSqMtr = Number((roofAreaSqFt * 0.092903).toFixed(1));

  // Carbon Offsets:
  // CEA (Central Electricity Authority) CO2 baseline: ~0.82 kg CO2 per kWh of grid electricity
  const annualCo2SavedTonnes = Number(((annualUnits * 0.82) / 1000).toFixed(1));
  const lifetime25YrCo2Tonnes = Number((annualCo2SavedTonnes * 25).toFixed(1));
  const equivalentTreesPlanted = Math.round(annualCo2SavedTonnes * 45);

  return {
    kw: actualDcCapacityKw, // Primary DC capacity
    targetKw,
    actualDcCapacityKw,
    acInverterCapacityKw,
    panelCount,
    panelWattage: wattage,
    dailyUnits,          // Exact e.g. 21.5 kWh/day
    monthlyUnits,        // Exact e.g. 654 kWh/month
    annualUnits,         // Exact e.g. 7,848 kWh/year
    tariff,
    monthlySavings,      // Exact annualSavings / 12
    annualSavings,       // Exact annualUnits * tariff
    roofAreaSqFt,
    roofAreaSqMtr,
    annualCo2SavedTonnes,
    lifetime25YrCo2Tonnes,
    equivalentTreesPlanted
  };
};

export const calculateSubsidy = (capacityKw, scheme = 'pm-surya-ghar') => {
  const kw = parseFloat(capacityKw) || 0;
  if (scheme === 'none' || kw <= 0) return 0;
  
  // Official PM Surya Ghar: Muft Bijli Yojana Central Financial Assistance (CFA):
  // 1 kWp: ₹30,000
  // 2 kWp: ₹60,000
  // 3 kWp and above: ₹78,000 (Maximum capped central subsidy for individual residential rooftop)
  if (kw < 1.5) {
    return 30000;
  } else if (kw < 2.5) {
    return 60000;
  } else {
    return 78000;
  }
};

export const calculateFinancials = ({
  capacityKw,
  pricePerKw,
  customBasePrice = null,
  gstRate = 13.8, // Blended GST rate for solar EPC (composite 70% goods @ 12% + 30% services @ 18% = 13.8%)
  subsidyAmount = 0,
  annualSavings = 0,
  discountAmount = 0
}) => {
  const kw = parseFloat(capacityKw) || 0;
  const rate = parseFloat(pricePerKw) || 52000;
  
  const basePrice = customBasePrice !== null && !isNaN(customBasePrice) && customBasePrice > 0 
    ? parseFloat(customBasePrice) 
    : Math.round(kw * rate);
    
  const discount = Math.round(parseFloat(discountAmount) || 0);
  const priceAfterDiscount = Math.max(0, basePrice - discount);

  const gst = Math.round((priceAfterDiscount * (parseFloat(gstRate) || 0)) / 100);
  const totalGrossCost = priceAfterDiscount + gst;

  const subsidy = Math.round(parseFloat(subsidyAmount) || 0);
  const netPayable = Math.max(0, totalGrossCost - subsidy);

  const annualSav = Math.round(parseFloat(annualSavings) || 0);

  // Capital Payback Period (Net Out-of-Pocket Cost / Year 1 Bill Savings)
  const paybackYears = annualSav > 0 ? (netPayable / annualSav).toFixed(1) : '0.0';

  // 25-Year Undiscounted Gross Electricity Generated Value
  const gross25YrSavings = annualSav * 25;

  // 25-Year Net Financial Gain (Gross Electricity Value minus Net Capital Investment)
  const net25YrProfit = Math.max(0, gross25YrSavings - netPayable);

  // Sensitivity Analysis factoring 0.55%/yr linear panel degradation & 3% annual grid tariff escalation
  let escalatedNetProfit = -netPayable;
  let cumulativeEscalatedGross = 0;
  for (let yr = 1; yr <= 25; yr++) {
    const degradationFactor = yr === 1 ? 0.99 : (0.99 - (yr - 1) * 0.0055);
    const tariffEscalationFactor = Math.pow(1.03, yr - 1);
    const yrSavings = annualSav * degradationFactor * tariffEscalationFactor;
    cumulativeEscalatedGross += yrSavings;
    escalatedNetProfit += yrSavings;
  }

  // Generate standardized 6-point progression data for charts
  const pbYearFloat = parseFloat(paybackYears);
  const progressionMilestones = [
    { 
      year: 'Yr 1', 
      gross: annualSav, 
      net: annualSav - netPayable,
      label: 'First Year Yield'
    },
    { 
      year: `Yr ${paybackYears}`, 
      gross: Math.round(annualSav * pbYearFloat), 
      net: 0,
      isPayback: true,
      label: '★ Capital Recovered'
    },
    { 
      year: 'Yr 5', 
      gross: annualSav * 5, 
      net: (annualSav * 5) - netPayable,
      label: 'Post Payback'
    },
    { 
      year: 'Yr 10', 
      gross: annualSav * 10, 
      net: (annualSav * 10) - netPayable,
      label: '10-Yr Cumulative'
    },
    { 
      year: 'Yr 15', 
      gross: annualSav * 15, 
      net: (annualSav * 15) - netPayable,
      label: '15-Yr Cumulative'
    },
    { 
      year: 'Yr 25', 
      gross: gross25YrSavings, 
      net: net25YrProfit,
      isMax: true,
      label: '25-Yr Net Profit'
    }
  ];

  return {
    basePrice,
    discount,
    priceAfterDiscount,
    gst,
    totalGrossCost,
    subsidy,
    netPayable,
    annualSavings: annualSav,
    paybackYears,
    gross25YrSavings,       // Gross avoided utility electricity expense
    net25YrProfit,          // Net financial return after net capital recovery
    lifetimeSavings25Years: net25YrProfit, // For backward compatibility
    escalatedNetProfit: Math.round(escalatedNetProfit),
    progressionMilestones
  };
};
