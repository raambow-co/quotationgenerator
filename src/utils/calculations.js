export const calculateSolarMetrics = (capacityKw, tariffPerUnit = 8.5, panelWattage = 550) => {
  const kw = parseFloat(capacityKw) || 0;
  const tariff = parseFloat(tariffPerUnit) || 8.5;
  const wattage = parseFloat(panelWattage) || 550;

  // Average 4.3 peak sun hours in India (units per kW per day)
  const dailyUnits = kw * 4.3;
  const monthlyUnits = dailyUnits * 30;
  const annualUnits = dailyUnits * 365;

  // Monthly and Annual Bill Savings
  const monthlySavings = monthlyUnits * tariff;
  const annualSavings = annualUnits * tariff;

  // Number of modules needed
  const totalWattsNeeded = kw * 1000;
  const panelCount = wattage > 0 ? Math.ceil(totalWattsNeeded / wattage) : 0;
  const actualSystemCapacityWp = panelCount * wattage;
  const actualSystemCapacityKw = (actualSystemCapacityWp / 1000).toFixed(2);

  // Rooftop shadow-free area needed (~90 to 100 sq ft per kW)
  const roofAreaSqFt = Math.round(kw * 95);
  const roofAreaSqMtr = (roofAreaSqFt * 0.092903).toFixed(1);

  // Carbon and Environmental impact
  // 1 unit (kWh) solar power offsets ~0.82 kg CO2
  const annualCo2SavedTonnes = ((annualUnits * 0.82) / 1000).toFixed(1);
  const lifetime25YrCo2Tonnes = (annualCo2SavedTonnes * 25).toFixed(1);
  const equivalentTreesPlanted = Math.round(annualCo2SavedTonnes * 45);

  return {
    kw,
    dailyUnits: Math.round(dailyUnits),
    monthlyUnits: Math.round(monthlyUnits),
    annualUnits: Math.round(annualUnits),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    panelCount,
    actualSystemCapacityKw,
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
  
  // Standard PM Surya Ghar: Muft Bijli Yojana Central Govt Subsidy:
  // 1 kW = ₹30,000
  // 2 kW = ₹60,000
  // 3 kW and above = ₹78,000 (capped at 3 kW for standard residential)
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
  gstRate = 13.8, // standard blended GST for solar EPC (composite 70:30 goods & services)
  subsidyAmount = 0,
  annualSavings = 0,
  discountAmount = 0
}) => {
  const kw = parseFloat(capacityKw) || 0;
  const rate = parseFloat(pricePerKw) || 52000;
  
  const basePrice = customBasePrice !== null && !isNaN(customBasePrice) && customBasePrice > 0 
    ? parseFloat(customBasePrice) 
    : kw * rate;
    
  const discount = parseFloat(discountAmount) || 0;
  const priceAfterDiscount = Math.max(0, basePrice - discount);

  const gst = (priceAfterDiscount * (parseFloat(gstRate) || 0)) / 100;
  const totalGrossCost = priceAfterDiscount + gst;

  const subsidy = parseFloat(subsidyAmount) || 0;
  const netPayable = Math.max(0, totalGrossCost - subsidy);

  // Payback period
  const paybackYears = annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : 0;
  const lifetimeSavings25Years = Math.max(0, (annualSavings * 25) - netPayable);

  return {
    basePrice: Math.round(basePrice),
    discount: Math.round(discount),
    priceAfterDiscount: Math.round(priceAfterDiscount),
    gst: Math.round(gst),
    totalGrossCost: Math.round(totalGrossCost),
    subsidy: Math.round(subsidy),
    netPayable: Math.round(netPayable),
    paybackYears: paybackYears > 0 ? paybackYears : '3.5',
    lifetimeSavings25Years: Math.round(lifetimeSavings25Years)
  };
};

