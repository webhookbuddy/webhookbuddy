import * as dayjs from 'dayjs';
import { sign, verify } from './signature';
import { testables } from './signature';

jest.mock('../config', () => ({
  default: { signatureKey: 'secret-key' },
}));

describe('signature.verify()', () => {
  it("Returns true if hash hasn't expired", () => {
    const message = 'foo-bar';
    const expiresAt = dayjs().add(1, 'day').toDate();
    const hash = sign(message, expiresAt);

    const result = verify(message, hash);

    expect(result).toBe(true);
  });

  it("Returns false if message doesn't match", () => {
    const message = 'foo-bar';
    const expiresAt = dayjs().add(1, 'day').toDate();
    const hash = sign(message, expiresAt);

    const result = verify('something else', hash);

    expect(result).toBe(false);
  });

  it('Returns false if hash expired', () => {
    const message = 'foo-bar 123 #$%&*(';
    const expiresAt = dayjs().subtract(1, 'day').toDate();
    const hash = sign(message, expiresAt);

    const result = verify(message, hash);

    expect(result).toBe(false);
  });

  it('Returns false if hash byte length differs', () => {
    const message = 'hello';
    const expiresAt = dayjs().add(1, 'day').toDate();
    const hash = sign(message, expiresAt);

    const result = verify(message, `${hash}foo`);

    expect(result).toBe(false);
  });
});

describe('signature.swap()', () => {
  it('Returns swapped string', () => {
    const str = 'foo-bar+=/';

    const result = testables.swap(str, '+=/', '-_,');

    expect(result).toBe('foo-bar-_,');
  });
});
