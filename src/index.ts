import { pizzaSchema, type Pizza } from './schema';

export type { Pizza };

export type ValidationResult =
  | { isPizza: true; pizza: Pizza }
  | { isPizza: false; errors: string[] };

export function validatePizza(input: unknown): ValidationResult {
  const result = pizzaSchema.safeParse(input);

  if (result.success) {
    return {
      isPizza: true,
      pizza: result.data,
    };
  }

  const errors = result.error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
    return `${path}${issue.message}`;
  });

  return {
    isPizza: false,
    errors,
  };
}
