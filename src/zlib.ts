import { resolve } from 'path'
import { createReadStream, createWriteStream } from 'node:fs'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'
import { pipeline } from 'node:stream/promises'

import type { Command } from './types.ts'

export const compress: Command = async (pwd, args) => {
  const inputPath = resolve(pwd, args[0])
  const outputPath = resolve(pwd, args[1])

  const readStream = createReadStream(inputPath)
  const writeStream = createWriteStream(outputPath)

  await pipeline(
    readStream,
    createBrotliCompress(),
    writeStream,
  )
};

export const decompress: Command = async (pwd, args) => {
  const inputPath = resolve(pwd, args[0])
  const outputPath = resolve(pwd, args[1])

  const readStream = createReadStream(inputPath)
  const writeStream = createWriteStream(outputPath)

  await pipeline(
    readStream,
    createBrotliDecompress(),
    writeStream,
  )
};
