export const generateOtp = (
  digits = 6,
): string => {
  const min = Math.pow(
    10,
    digits - 1,
  );

  const max =
    Math.pow(10, digits) - 1;

  return Math.floor(
    min + Math.random() * (max - min),
  ).toString();
};