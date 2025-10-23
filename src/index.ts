import { resolve } from 'node:path'
import { homedir } from 'node:os'

import { cd, up, ls } from './navigation.js'
import { cat, add, mkdir, rn, cp, rm, mv } from './fs.js'
import { os } from './os.js'
import { hash } from './crypto.js'
import { compress, decompress } from './zlib.js'
import { exit } from './process.js'

const COMMANDS = {
  cd,
  up,
  ls,
  cat,
  add,
  mkdir,
  cp,
  rn,
  rm,
  mv,
  os,
  hash,
  compress,
  decompress,
  ['.exit']: exit,
}

function parse(chunk: Buffer) {
  const [command, ...args] = chunk.toString().trim().split(' ')

  if (Object.keys(COMMANDS).includes(command)) {
    return {
      command: command as keyof typeof COMMANDS,
      args: args.filter(Boolean),
    }
  } else {
    return {}
  }
}

async function main() {
  const username = process.argv.find(arg => arg.startsWith('--username'))?.split('=')[1] || ''
  let pwd = resolve(homedir(), './Downloads/pure')

  console.log(`Welcome to the File Manager, ${username}!`)

  process.stdin.on('data', async (chunk) => {
    const { command, args } = parse(chunk)

    if (command) {
      try {
        const path = await COMMANDS[command](pwd, args, username)

        if (path) {
          pwd = path
        }
      } catch (err) {
        const error = err as Error

        console.error(error.message)
      }
    }

    console.log(`You are currently in ${pwd}`)
  })

  process.on('SIGINT', async () => {
    await exit('', [], username)
  })
}

main()
