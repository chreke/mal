const { Quote } = require("./datatypes");

function printStr(form) {
  if (form instanceof Quote) {
    return "'" + printStr(form.form);
  }
  if (form instanceof Array) {
    return "(" + form.map(printStr).join(" ") + ")";
  }
  if (form === null) {
    return "nil";
  }
  return form.toString();
}

module.exports = { printStr };
