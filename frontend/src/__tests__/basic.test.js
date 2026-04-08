describe('Basic Tests', () => {
  describe('Hello World', () => {
    test('should return "Hello World"', () => {
      const helloWorld = () => 'Hello World';
      expect(helloWorld()).toBe('Hello World');
    });

    test('should contain "Hello"', () => {
      const greeting = 'Hello World';
      expect(greeting).toMatch(/Hello/);
    });
  });

  describe('Basic Math Operations', () => {
    test('should add two numbers correctly', () => {
      expect(2 + 3).toBe(5);
      expect(10 + 5).toBe(15);
      expect(-1 + 1).toBe(0);
    });

    test('should subtract two numbers correctly', () => {
      expect(5 - 3).toBe(2);
      expect(10 - 5).toBe(5);
      expect(0 - 1).toBe(-1);
    });

    test('should multiply two numbers correctly', () => {
      expect(2 * 3).toBe(6);
      expect(5 * 0).toBe(0);
      expect(-2 * 3).toBe(-6);
    });

    test('should divide two numbers correctly', () => {
      expect(6 / 2).toBe(3);
      expect(10 / 5).toBe(2);
      expect(7 / 2).toBe(3.5);
    });

    test('should handle modulo operation', () => {
      expect(7 % 3).toBe(1);
      expect(10 % 5).toBe(0);
      expect(8 % 3).toBe(2);
    });
  });

  describe('Array Operations', () => {
    test('should work with arrays', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(numbers.length).toBe(5);
      expect(numbers[0]).toBe(1);
      expect(numbers.includes(3)).toBe(true);
      expect(numbers.includes(6)).toBe(false);
    });

    test('should handle array methods', () => {
      const numbers = [1, 2, 3];
      expect(numbers.map(n => n * 2)).toEqual([2, 4, 6]);
      expect(numbers.filter(n => n > 2)).toEqual([3]);
      expect(numbers.reduce((sum, n) => sum + n, 0)).toBe(6);
    });
  });
});
