import { resolve } from 'path'
import { createReadStream, createWriteStream } from 'node:fs'

import type { Command } from './types.ts'

const { createHash } = await import('node:crypto')

export const hash: Command = async (pwd, args) => {
  const hash = createHash('sha256')
  const resolvedPath = resolve(pwd, args[0])
  const readStream = createReadStream(resolvedPath)

  readStream.on('readable', () => {
    const data = readStream.read()

    if (data) {
      hash.update(data)
    } else {
      console.log(hash.digest('hex'))
    }
  });
};
