const { Sym, Quote } = require("./datatypes");

function tokenize(input) {
  const unqouteSplice = "~@";
  const specialChars = /[\[\]{}()'`~^@]/;
  const string = /"(?:\\.|[^\\"])*"?/;
  const comment = /;.*/;
  const chars = /[^\s\[\]{}('"`,;)]+/;
  const regexp = new RegExp(
    [
      unqouteSplice,
      "|",
      specialChars.source,
      "|",
      string.source,
      "|",
      comment.source,
      "|",
      chars.source,
    ].join(""),
    "g"
  );
  const matches = [];
  let match;
  while ((match = regexp.exec(input)) !== null) {
    matches.push(match[0]);
  }
  return matches;
}

function readForm(tokens) {
  const token = tokens.shift();
  if (token === "(") {
    return readList(tokens);
  } else if (token === "'") {
    return readQuote(tokens);
  } else if (token === ")") {
    throw SyntaxError("unbalanced parentheses");
  }
  return readAtom(token);
}

function readList(tokens) {
  const items = [];
  while (tokens.length) {
    if (tokens[0] === ")") {
      tokens.shift();
      return items;
    }
    items.push(readForm(tokens));
  }
  throw SyntaxError("unbalanced parentheses");
}

function readQuote(tokens) {
  return new Quote(readForm(tokens));
}

function readAtom(token) {
  if (token.match(/^[-+]?[0-9]+$/)) {
    return parseInt(token);
  } else if (token.match(/^[-+]?[0-9]+\.[0-9]*$/)) {
    return parseFloat(token);
  } else if (token === "nil") {
    return null;
  } else if (token === /true|false/) {
    return token === "true";
  } else if (token[0] === `"`) {
    return readStringLiteral(token);
  } else {
    return new Sym(token);
  }
}

function readStringLiteral(string) {
  if (!string.match(/"(?:\\.|[^\\"])*"/)) {
    throw SyntaxError("EOF while reading string literal");
  }
  return string
    .replace("\\n", "\n")
    .replace(`\\"`, `"`)
    .replace("\\\\", "\\")
    .slice(1, -1);
}

function readStr(str) {
  const tokens = tokenize(str);
  const forms = [];
  while (tokens.length) {
    forms.push(readForm(tokens));
  }
  return forms;
}

module.exports = { readStr, tokenize };
