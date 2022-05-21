const { Sym, Quote } = require("./datatypes");
const { printStr } = require("./printer");

describe("printStr", () => {
  const testCases = [
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
    [`"foo \\nbar"`, "foo \nbar"],
    [`"foo \\"bar"`, `foo "bar`],
  ];
  test.each(testCases)("should print %s for %s", (program, forms) => {
    expect(printStr(forms)).toEqual(program);
  });
});
