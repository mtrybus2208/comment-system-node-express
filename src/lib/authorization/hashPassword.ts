import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 10);
