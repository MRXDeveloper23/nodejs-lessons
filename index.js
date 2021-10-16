const fs = require("fs").promises;
const path = require("path");

async function readFile(path) {
  let data = await fs.readFile(path, "utf-8", (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  return JSON.parse(data);
}

async function writeFile(path, data) {
  await fs.writeFile(path, data, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
}
const displayUsers = () => {
  readFile(path.join(__dirname, "./data.json"))
    .then((data) =>
      data.forEach((user) => {
        console.log(user);
      })
    )
    .catch((err) => {
      console.log(err);
    });
};
if (process.argv[process.argv.length - 1] === "users") {
  displayUsers();
}
if (process.argv[2] && process.argv[3]) {
  const name = process.argv[2].split("=");
  const age = process.argv[3].split("=");
  const user = {
    name: name[1],
    age: Number(age[1]),
  };
  readFile(path.join(__dirname, "./data.json"))
    .then((data) => {
      data.forEach((elem) => {
        if (elem.name == user.name && elem.age == user.age) {
          throw new Error("This user already exists");
        }
      });
      data.push(user);
      writeFile(path.join(__dirname, "./data.json"), JSON.stringify(data))
        .then(() => console.log("User created"))
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => displayUsers())
    .catch((err) => {
      console.log(err);
    });
}
