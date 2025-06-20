const phoneNumberLengthByCountry: { [key: string]: number } = {
  JP: 10,
  VN: 10,
  US: 10,
  DE: 11,
  FR: 9,
  KR: 11,
};

export type TCountryCode = keyof typeof phoneNumberLengthByCountry;

export const handlePhoneNumberValidation = (
  value: string,
  country: TCountryCode
): string => {
  const maxLength: number = phoneNumberLengthByCountry[country] || 10;

  const cleanedValue = value.replace(/[^0-9]/g, "");

  return cleanedValue.length > maxLength
    ? cleanedValue.slice(0, maxLength)
    : cleanedValue;
};

export const urlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
