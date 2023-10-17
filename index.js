import { stdin, argv } from "node:process"

import { Commands } from "./commands.js"

async function main() {
  const userName = argv
    .find(arg => arg.startsWith("--username="))
    .split("=")
    .slice(-1)
  const commands = new Commands()

  console.log(`Welcome to File Manager, ${userName}`)
  console.log(`You are currently in ${commands.workingDirectory}\n`)

  stdin.on("data", async (chunk) => {
    const [commandName, ...args] = String(chunk).trim().split(" ")
    const command = commands[commandName]
    let output = ""

    if (command && typeof command === "function") {
      try {
        await command.apply(commands, args)
      } catch (err) {
        console.log("Operation failed: ", err.message)
      }
    } else {
      console.log("Invalid input")
    }

    console.log(`You are currently in ${commands.workingDirectory}\n`)
  })

  process.on("SIGINT", () => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`)
    process.exit()
  })
}

main()
