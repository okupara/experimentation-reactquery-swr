const fs = require("fs")
const faker = require("faker")

const users = Array.from(Array(20)).map(() => ({
  id: faker.random.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
}))

const statuses = [
  {
    id: faker.random.uuid(),
    title: "None",
    color: "red",
  },
  {
    id: faker.random.uuid(),
    title: "In progress",
    color: "orange",
  },
  {
    id: faker.random.uuid(),
    title: "Review",
    color: "green",
  },
  {
    id: faker.random.uuid(),
    title: "Done",
    color: "gray",
  },
]

const tasks = Array.from(Array(100)).map(() => ({
  id: faker.random.uuid(),
  title: faker.hacker.phrase(),
  description: faker.lorem.paragraphs(),
  status: statuses[Math.floor(Math.random() * statuses.length)].id,
  assignees:
    Math.random() > 0.6 ? [users[Math.floor(Math.random() * users.length)].id] : [],
}))

fs.promises
  .writeFile("./db.json", JSON.stringify({ users, tasks, statuses }))
  .then(() => console.log("SUCCESS"))
  .catch((e) => console.error("ERROR", e))
