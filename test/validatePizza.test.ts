import { validatePizza } from '../src/index';

describe('validatePizza', () => {
  it('should validate a correct pizza with all fields', () => {
    const input = {
      size: 14,
      crust: 'stuffed',
      isDeepDish: true,
      toppings: ['pepperoni', 'mushrooms', 'onions'],
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.size).toBe(14);
      expect(result.pizza.crust).toBe('stuffed');
      expect(result.pizza.isDeepDish).toBe(true);
      expect(result.pizza.toppings).toEqual(['pepperoni', 'mushrooms', 'onions']);
    }
  });

  it('should apply default values for optional fields', () => {
    const input = {
      size: 12,
      crust: 'normal',
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.isDeepDish).toBe(false);
      expect(result.pizza.toppings).toBeUndefined();
    }
  });

  it('should reject a pizza with an invalid crust type', () => {
    const input = {
      size: 10,
      crust: 'thin',
      isDeepDish: false,
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes('crust'))).toBe(true);
    }
  });

  it('should reject a pizza with a banned topping', () => {
    const input = {
      size: 16,
      crust: 'normal',
      toppings: ['cheese', 'pineapple'],
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.toLowerCase().includes('pineapple'))).toBe(true);
    }
  });

  it('should reject non-object input', () => {
    const result = validatePizza('not a pizza');

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it('should reject a pizza missing required fields', () => {
    const input = {
      toppings: ['cheese'],
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    }
  });
});
