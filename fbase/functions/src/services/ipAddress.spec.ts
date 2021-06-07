import ipAddress from './ipAddress';

// assertions: https://www.chaijs.com/

describe('ipAddress', () => {
  it('should return x-forwarded-for if found', () => {
    const result = ipAddress({
      headers: {
        'x-forwarded-for': 'forwarded-123',
      },
      ip: 'remote-123',
    } as any);
    expect(result).toEqual('forwarded-123');
  });

  it('should return remoteAddress if x-forwarded-for not found', () => {
    const result = ipAddress({
      headers: {},
      ip: 'remote-123',
    } as any);
    expect(result).toEqual('remote-123');
  });

  it('should return first x-forwarded-for when there are multiple', () => {
    const result = ipAddress({
      headers: {
        'x-forwarded-for': 'forwarded-1, forwarded-2',
      },
      ip: 'remote-123',
    } as any);
    expect(result).toEqual('forwarded-1');
  });

  it('should return first remoteAddress when there are multiple', () => {
    const result = ipAddress({
      headers: {},
      ip: 'remote-1, remote-2',
    } as any);
    expect(result).toEqual('remote-1');
  });

  it('should return empty if there are none', () => {
    const result = ipAddress({
      headers: {},
    } as any);
    expect(result).toEqual('');
  });
});
