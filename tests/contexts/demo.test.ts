import { describe, expect , it} from "vitest";

describe('demo test', () => {
  describe('#demoMethod', () => {
    it('1 + 1 should return two', () => {
      expect(1+1).toBe(2)
    })
  })
})