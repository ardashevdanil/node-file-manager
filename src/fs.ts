import { resolve } from 'path'
import { createReadStream, createWriteStream } from 'node:fs'
import { readFile, writeFile, mkdir as nodeMkdir, rename, rm as nodeRm } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'

import type { Command } from './types.ts'

export const cat: Command = async (pwd, args) => {
  const resolvedPath = resolve(pwd, args[0])

  const file = await readFile(resolvedPath, { encoding: 'utf8' })

  console.log(file)
};

export const add: Command = async (pwd, args) => {
  const resolvedPath = resolve(pwd, args[0])

  await writeFile(resolvedPath, '')
};

export const mkdir: Command = async (pwd, args) => {
  const resolvedPath = resolve(pwd, args[0])

  await nodeMkdir(resolvedPath)
};

export const rn: Command = async (pwd, args) => {
  const inputPath = resolve(pwd, args[0])
  const outputPath = resolve(pwd, args[1])

  await rename(inputPath, outputPath)
};

export const cp: Command = async (pwd, args) => {
  const inputPath = resolve(pwd, args[0])
  const outputPath = resolve(pwd, args[1])

  const readStream = createReadStream(inputPath)
  const writeStream = createWriteStream(outputPath)

  await pipeline(
    readStream,
    writeStream,
  )
};

export const rm: Command = async (pwd, args) => {
  const resolvedPath = resolve(pwd, args[0])

  await nodeRm(resolvedPath)
};

export const mv: Command = async (pwd, args) => {
  await cp(pwd, args)
  await rm(pwd, args)
};
