const { tokenize, readForm, Sym, Quote } = require("./reader");

describe("tokenize", () => {
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
});

describe("readForm", () => {
  const readerTestCases = [
    ["3", 3],
    ["nil", null],
    ["(+ 5 6 7)", [new Sym("+"), 5, 6, 7]],
    ["(/ (+ 5 -4) 6)", [new Sym("/"), [new Sym("+"), 5, -4], 6]],
    ["'foo", new Quote(new Sym("foo"))],
    ["'(+ 1 2)", new Quote([new Sym("+"), 1, 2])],
    ["'(1 2 3)", new Quote([1, 2, 3])],
  ];
  test.each(readerTestCases)("should read %s", (program, forms) => {
    expect(readForm(tokenize(program))).toEqual(forms);
  });
});
