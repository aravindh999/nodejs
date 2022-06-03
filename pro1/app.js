//Events
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("eve", (n1, n2) => {
    console.log(n1 + n2);
});

eventEmitter.emit("eve", 1, 2);

class MyClass extends EventEmitter {
    constructor(name) {
        super();
        this._name = name;
    }
    get name() {
        return this._name;
    }
}
let p1 = new MyClass("Hi");
let p2 = new MyClass("Bye");
p1.on("evt", () => {
    console.log(p1.name);
});
p2.on("evt", () => {
    console.log(p2.name);
});
p1.emit("evt");
p2.emit("evt");

//Readline
const readline = require("readline");
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n1 = Math.floor(Math.random() * 10 + 1);
let n2 = Math.floor(Math.random() * 10 + 1);
let an = n1 + n2;

r1.question(`What is ${n1} + ${n2}? `, (userInput) => {
    if (userInput.trim() == an) r1.close();
    else {
        r1.setPrompt("Incorrect response try again!");
        r1.prompt();
        r1.on("line", (userInput) => {
            if (userInput.trim() == an) {
                r1.close();
            } else {
                r1.setPrompt("Your answer is incorrect!!");
                r1.prompt();
            }
        });
    }
});
r1.on("close", () => {
    console.log("Correct!!");
});

//FileSystem
const fs = require("fs");
fs.writeFile(
    "file.txt",
    "Something !susad diasfoadsh idsfhioasf daosihfasohf",
    (err) => {
        console.log(err ? err : "File created!!");
        if (!err) {
            fs.readFile("file.txt", "utf8", (err, file) => {
                console.log(err ? err : file);
            });
        }
    }
);

fs.mkdir("fol", (err) => {
    if (!err) {
        fs.writeFile("./fol/file1.txt", "SomeThing", (err) => {
            console.log(err ? err : "File created!!");
        });
    }
});

fs.readdir("fol", (err, files) => {
    if (err) console.log(err);
    else {
        for (let f of files) {
            fs.unlink("./fol/" + f, (err) =>
                console.log(err ? err : "Deleted!!")
            );
        }
    }
});

//Streams
const readStream = fs.createReadStream("file.txt");
readStream.on("data", (chunk) => {
    console.log(chunk);
});
const writeStream = fs.createWriteStream("file2.txt");
readStream.pipe(writeStream);
