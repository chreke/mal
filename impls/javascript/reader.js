const tokenize = (input) => {
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
};

module.exports = { tokenize };
