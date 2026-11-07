export const getPanelLogo = (brandName) => {
  if (!brandName) return '/assets/brands/waaree.png';
  const name = brandName.toLowerCase();
  if (name.includes('waaree')) return '/assets/brands/waaree.png';
  if (name.includes('adani')) return '/assets/brands/adani.png';
  if (name.includes('tata')) return '/assets/brands/tata-solar.png';
  return '/assets/brands/waaree.png';
};

export const getInverterLogo = (brandName) => {
  if (!brandName) return '/assets/brands/sungrow.png';
  const name = brandName.toLowerCase();
  if (name.includes('sungrow')) return '/assets/brands/sungrow.png';
  if (name.includes('growatt')) return '/assets/brands/growatt.png';
  if (name.includes('solis')) return '/assets/brands/solis.png';
  return '/assets/brands/sungrow.png';
};

export const getCableLogo = (brandName) => {
  return '/assets/brands/polycab.png';
};

export const EMBLEMS = {
  mnre: '/assets/emblems/mnre-logo.svg',
  pmSuryaGhar: '/assets/emblems/pm-surya-ghar.png',
  makeInIndia: '/assets/emblems/make-in-india.png',
  bis: '/assets/emblems/bis-certified.png',
  iso: '/assets/emblems/iso-certified.png'
};

