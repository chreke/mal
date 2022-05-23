const { tokenize, readStr } = require("./reader");
const { Sym, Quote } = require("./datatypes");

describe("tokenize", () => {
  test.each([
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
  ])("should tokenize %s", (string, tokens) => {
    expect(tokenize(string)).toEqual(tokens);
  });
});

describe("readStr", () => {
  test.each([
    ["3", 3],
    ["nil", null],
    ["(+ 5 6 7)", [new Sym("+"), 5, 6, 7]],
    ["(/ (+ 5 -4) 6)", [new Sym("/"), [new Sym("+"), 5, -4], 6]],
    ["'1", new Quote(1)],
    ["'foo", new Quote(new Sym("foo"))],
    ["'(+ 1 2)", new Quote([new Sym("+"), 1, 2])],
    ["'(1 2 3)", new Quote([1, 2, 3])],
    [`"foo bar"`, "foo bar"],
    [`"foo \\\\bar"`, "foo \\bar"],
    [`"foo bar\\\\"`, `foo bar\\`],
    [`"foo \\nbar"`, "foo \nbar"],
    [`"foo \\"bar"`, `foo "bar`],
  ])("should read %s", (program, forms) => {
    expect(readStr(program)[0]).toEqual(forms);
  });

  test.each([
    ["1 2 3", [1, 2, 3]],
    [
      "(+ 1 2)\n(+ 3 4)",
      [
        [new Sym("+"), 1, 2],
        [new Sym("+"), 3, 4],
      ],
    ],
  ])("should support multiple top-level forms", (program, forms) => {
    expect(readStr(program)).toEqual(forms);
  });

  test.each([
    "(1 2 3",
    "(1 (2 3",
    "(1 (2 3)",
    ")",
    "1 2 3)",
    "(1 2 3))",
    `"foo`,
    `foo"`,
    `"\\"`,
    `"\\\\\\"`,
    `"foo\\"`,
    `\\"foo`,
    "'(1 2 3",
  ])("should raise SyntaxError for %s", (program) => {
    expect(() => readStr(program)).toThrow(SyntaxError);
  });
});
