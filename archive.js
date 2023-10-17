import { open } from "node:fs/promises"
import { createBrotliCompress, createBrotliDecompress } from "node:zlib"
import { dirname, join } from "node:path"
import { pipeline } from "node:stream/promises"

export async function compress(path, destPath) {
  const resolvedDestPath = join(dirname(path), destPath)

  const sourceFile = await open(path)
  const destFile = await open(resolvedDestPath, "wx")
  const brotliCompress = createBrotliCompress()

  await pipeline(
    sourceFile.createReadStream(),
    brotliCompress,
    destFile.createWriteStream(),
  )
}

export async function decompress(path, destPath) {
  const resolvedDestPath = join(dirname(path), destPath)

  const sourceFile = await open(path)
  const destFile = await open(resolvedDestPath, "wx")
  const brotliDecompress = createBrotliDecompress()

  await pipeline(
    sourceFile.createReadStream(),
    brotliDecompress,
    destFile.createWriteStream(),
  )
}
