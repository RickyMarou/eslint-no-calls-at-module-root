const rule = require("./enforce-no-calls-at-module-root");
const plugin = { rules: { "enforce-no-calls-at-module-root": rule } };

module.exports = plugin;
