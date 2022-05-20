class Quote {
  constructor(form) {
    this.form = form;
  }

  toString() {
    return `Quote(${this.form.toString()})`;
  }
}

class Sym {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

module.exports = { Sym, Quote };
