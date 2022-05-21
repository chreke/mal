const { Quote } = require("./datatypes");

function printStr(form) {
  if (form instanceof Quote) {
    return "'" + printStr(form.form);
  }
  if (form instanceof Array) {
    return "(" + form.map(printStr).join(" ") + ")";
  }
  // NB: JavaScript string literals are not Strings, and the typeof a String
  // is 'object'
  if (typeof form === "string" || form instanceof String) {
    return (
      '"' +
      form.replace("\\", "\\\\").replace("\n", "\\n").replace(`"`, `\\"`) +
      '"'
    );
  }
  if (form === null) {
    return "nil";
  }
  return form.toString();
}

module.exports = { printStr };
