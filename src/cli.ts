#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { validatePizza } from './index';

function main(): void {
  const { positionals } = parseArgs({
    allowPositionals: true,
    strict: true,
  });

  if (positionals.length === 0) {
    console.error('Usage: pizza-validator <path-to-json-file>');
    console.error('Example: pizza-validator test-pizza.json');
    process.exit(1);
  }

  const filePath = positionals[0];

  let fileContent: string;
  try {
    fileContent = readFileSync(filePath, 'utf-8');
  } catch {
    console.error(`Error: Could not read file "${filePath}".`);
    console.error('Please make sure the file exists and is readable.');
    process.exit(1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(fileContent);
  } catch {
    console.error(`Error: File "${filePath}" does not contain valid JSON.`);
    process.exit(1);
  }

  const result = validatePizza(parsed);

  if (result.isPizza) {
    console.log('Valid pizza!');
    console.log(JSON.stringify(result.pizza, null, 2));
  } else {
    console.log('Invalid pizza. Errors:');
    result.errors.forEach((error) => {
      console.log(`  - ${error}`);
    });
    process.exit(1);
  }
}

main();
