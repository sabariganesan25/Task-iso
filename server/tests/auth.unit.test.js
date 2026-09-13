import bcrypt from 'bcrypt';
import { registerSchema } from '../src/validators/index.js';

describe('authentication primitives', () => {
  test('a registration payload is valid and its password can be securely hashed', async () => {
    const parsed = registerSchema.parse({ fullName: 'Ada Lovelace', email: 'ada@example.test', password: 'correct-horse-battery-staple' });
    const hash = await bcrypt.hash(parsed.password, 12);
    expect(hash).not.toContain(parsed.password);
    await expect(bcrypt.compare(parsed.password, hash)).resolves.toBe(true);
  });
});
