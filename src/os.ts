import { EOL, cpus, homedir, userInfo, arch } from 'os'
import type { Command } from './types.ts'

export const os: Command = async (pwd, args) => {
  const method = args[0]

  if (method === '--EOL') {
    return console.log(EOL)
  }

  if (method === '--cpus') {
    return console.log(cpus())
  }

  if (method === '--homedir') {
    return console.log(homedir())
  }

  if (method === '--username') {
    return console.log(userInfo().username)
  }

  if (method === '--architecture') {
    return console.log(arch())
  }

  throw new Error('Unknown method')
}
