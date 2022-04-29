const { tokenize } = require("./reader");

const tokenizeTestCases = [
  [`10`, [`10`]],
  [`-10`, [`-10`]],
  [`foo`, [`foo`]],
  [`:foo`, [`:foo`]],
  [`"foo \\"bar"`, [`"foo \\"bar"`]],
  [`"foo \\nbar"`, [`"foo \\nbar"`]],
  [`"foo bar"`, ['"foo bar"']],
  ["(+ 4 10)", ["(", "+", "4", "10", ")"]],
  ["'(4 10)", ["'", "(", "4", "10", ")"]],
  [" ( 4, 10 5 ) ", ["(", "4", "10", "5", ")"]],
];

test.each(tokenizeTestCases)("should tokenize %s", (string, tokens) => {
  expect(tokenize(string)).toEqual(tokens);
});
