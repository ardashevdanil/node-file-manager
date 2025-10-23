import type { Command } from './types.ts'

export const exit: Command = async (_pwd, _args, username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)

  process.exit()
}
