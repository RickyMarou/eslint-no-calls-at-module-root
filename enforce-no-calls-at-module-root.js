
module.exports = {
  create(context) {
    return {
      Program(node) {
        node.body.forEach(statement => {
          if (statement.type === 'ExpressionStatement' && statement.
          expression.type === 'CallExpression') {
            if(statement?.expression?.callee?.object?.name === 'console') {
              return;
            }

            context.report({
              node: statement,
              message: 'Function calls are not allowed at the root level of a module',
            });
          }
        });
      },
    };
  },
};
