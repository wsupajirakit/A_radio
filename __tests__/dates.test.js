import { toIsoDate } from '../src/utils/dates';

describe('toIsoDate', () => {
  it('converts DD/MM/YYYY keys', () => {
    expect(toIsoDate('20/10/2026')).toBe('2026-10-20');
  });

  it('passes ISO dates through', () => {
    expect(toIsoDate('2026-10-20')).toBe('2026-10-20');
  });
});
