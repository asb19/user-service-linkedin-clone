import { genSalt, hash } from 'bcrypt';

export const generateHash = async (password: string) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};
