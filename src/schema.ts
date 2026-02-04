import { z } from 'zod';

const BANNED_TOPPINGS = ['anchovies', 'pineapple', 'sardines', 'durian'] as const;

const toppingSchema = z.string().refine(
  (topping) => !BANNED_TOPPINGS.includes(topping.toLowerCase() as (typeof BANNED_TOPPINGS)[number]),
  (topping) => ({
    message: `"${topping}" is a banned topping. Banned toppings: ${BANNED_TOPPINGS.join(', ')}`,
  }),
);

export const pizzaSchema = z.object({
  size: z.number({
    required_error: 'size is required',
    invalid_type_error: 'size must be a number',
  }),
  crust: z.enum(['stuffed', 'normal'], {
    errorMap: () => ({ message: 'crust must be either "stuffed" or "normal"' }),
  }),
  isDeepDish: z.boolean().default(false),
  toppings: z.array(toppingSchema).optional(),
});

export type Pizza = z.infer<typeof pizzaSchema>;
