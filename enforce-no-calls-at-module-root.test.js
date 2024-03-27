const { RuleTester } = require('eslint');

const rule = require('./enforce-no-calls-at-module-root');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run('no-function-call-at-root', rule, {
  valid: [
    {
      code: `
        const bar = "baz";
        function foo() {}
        function start() {
          foo();
        }
      `,
    },
    {
      code: `
        console.log('This should not be called at the root level');
      `,
      errors: [{ message: 'Function calls are not allowed at the root level of a module' }],
    },
  ],
  invalid: [
    {
      code: `
        myFunction();
        function myFunction() {
          // This function is called at the root level
        }
      `,
      errors: [{ message: 'Function calls are not allowed at the root level of a module' }],
    },
    {
      code: `
        function myFunction() {
          // This function is called at the root level
        }
        myFunction();
      `,
      errors: [{ message: 'Function calls are not allowed at the root level of a module' }],
    },
    // {
    //   code: `
    //     import { myFunction } from './myFunction';
    //     myFunction();
    //   `,
    //   errors: [{ message: 'Function calls are not allowed at the root level of a module' }],
    // },
  ],
});
