[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/tf5gBLEQ)

# Pizza Validator

## Usage as a Dependency

```typescript
import { validatePizza } from 'pizza-validator';

const result = validatePizza({
  size: 14,
  crust: 'stuffed',
  isDeepDish: true,
  toppings: ['pepperoni', 'mushrooms'],
});

if (result.isPizza) {
  console.log('Valid pizza:', result.pizza);
  console.log('Crust:', result.pizza.crust);
} else {
  console.log('Errors:', result.errors);
}
```

## CLI Usage

```bash
npm install --global .
pizza-validator path/to/pizza.json
```

---

# Homework 2: Project Scaffolding Reflection

## How many hours did you spend working on this homework?

6 hours

## What challenges/roadblocks did you face during this homework?

## Did you use AI/LLM tools for this assignment? If so, please provide a transcript or document your usage extensively below. If you did use AI, please explain why you decided to use AI for the task you used it for, what you learned from the AI responses, and explain any relevant unfamiliar terms and concepts that the AI responses generated.

Yes, I did. The following are the transcript:

---


Q: What's a discriminated union type and how can I define it for my validation result?

A: A discriminated union is a TypeScript pattern where multiple object types share a common property (the "discriminant") that TypeScript uses to narrow the type:

```typescript
type ValidationResult =
  | { isPizza: true; pizza: Pizza }
  | { isPizza: false; errors: string[] };
```

When you check `if (result.isPizza)`, TypeScript knows:
- In the `true` branch: `result.pizza` exists
- In the `false` branch: `result.errors` exists

Why I asked: I'd heard of union types but wasn't familiar with the "discriminated" part.

What I learned: The discriminant property (`isPizza`) acts like a tag that tells TypeScript which variant you're working with. This prevents accidentally accessing wrong properties.



Q: How do I use parseArgs from node:util to get a filename argument from command line?

A: Here's a basic setup:

```typescript
import { parseArgs } from 'node:util';

const { positionals } = parseArgs({
  allowPositionals: true,
});

const filename = positionals[0];
```

- `allowPositionals: true` accepts non-flag arguments
- `positionals` is an array of those arguments (your filename)

Why I asked: I tried using `process.argv` directly but it confused me because since it includes the node path and script path.

What I learned: `parseArgs` is built into Node.js and separates very cleanly the positional arguments from flags.

---

### Conversation 4: Jest with TypeScript

Q: Why do my Jest tests fail with syntax errors about import statements?

A: Jest doesn't understand TypeScript by default. Use `ts-jest`:

1. Install: `npm install --save-dev ts-jest @types/jest`

2. Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
};
```

The `preset: 'ts-jest'` tells Jest to transform `.ts` files before running them.

Why I asked: I kept getting "Cannot use import statement outside a module" errors.

What I learned: Jest needs a "transformer" to handle TypeScript.

---

### Conversation 5: Making CLI work as global command

Q: How do I make my package work as a command after `npm install --global .`?

A: Add a `bin` field to `package.json`:

```json
{
  "bin": {
    "pizza-validator": "./dist/cli.js"
  }
}
```

Also add a shebang at the top of your CLI script:

```typescript
#!/usr/bin/env node
```

This tells the system to run the file with Node.js.

Why I asked: My CLI worked with `npx ts-node src/cli.ts` but not as a standalone command.

What I learned: The `bin` field creates a symlink from command name to your script.
