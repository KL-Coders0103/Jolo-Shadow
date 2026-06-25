import bcrypt from "bcrypt";

export const hashValue = async (
  value: string,
) => {
  return bcrypt.hash(
    value,
    Number(
      process.env.BCRYPT_SALT_ROUNDS,
    ) || 12,
  );
};

export const compareHash = async (
  plainValue: string,
  hashedValue: string,
) => {
  return bcrypt.compare(
    plainValue,
    hashedValue,
  );
};