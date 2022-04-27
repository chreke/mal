const readline = require("readline");
const { stdin, stdout } = require("process")
const rl = readline.createInterface({input: stdin, output: stdout});

const read = (x) => x;

const eval = (x) => x;

const print = (x) => x;

const rep = (input) => {
  console.log(print(eval(read(input))));
}

rl.setPrompt("user> ");
rl.prompt();
rl.on("line", (line) => {
  rep(line);
  rl.prompt();
});
rl.on("close", () => {
  process.exit(0);
});

module.exports = { read, eval, print, rep };
