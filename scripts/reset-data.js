import fs from "fs"
import faker from "faker"

const users = Array.from(Array(20)).map(() => ({
  id: faker.random.uuid(),
  name: `${faker.name.firstName} ${faker.name.lastName}`,
  email: faker.internet.email(),
}))

const statuses = [
  {
    id: faker.random.uuid(),
    title: "None",
  },
  {
    id: faker.random.uuid(),
    title: "In progress",
  },
  {
    id: faker.random.uuid(),
    title: "Review",
  },
  {
    id: faker.random.uuid(),
    title: "Done",
  },
]

const tasks = Array.from(Array(100)).map(() => ({
  id: faker.random.uuid(),
  title: faker.name.title(),
  description: faker.lorem.paragraphs(),
  status: statuses[Math.floor(Math.random() * statuses.length)].id,
}))

fs.promises
  .writeFile("./db.json", JSON.stringify({ users, tasks, statuses }))
  .then(() => console.log("SUCCESS"))
  .catch((e) => console.error("ERROR", e))
