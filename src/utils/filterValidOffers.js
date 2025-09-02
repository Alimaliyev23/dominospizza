const excludedImages = [
  "https://dominosaz.s3.eu-central-1.amazonaws.com/480x615.png",
  "https://dominosaz.s3.eu-central-1.amazonaws.com/1800-600x600-az.png",
  "https://dominosaz.s3.eu-central-1.amazonaws.com/500-600x600-az.png",
  "https://dominosaz.s3.eu-central-1.amazonaws.com/1200-600x600-az.png",
];

export const filterValidOffers = (offers) => {
  return offers.filter(
    (item) => !excludedImages.includes(item.mediaDetail?.az) 
  );
  
};

