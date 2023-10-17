import { createReadStream } from "node:fs"
import { open, rm as rmFs } from "node:fs/promises"
import { appendFile, rename } from "node:fs/promises"
import { stdout } from "node:process"
import { dirname, join } from "node:path"
import { pipeline } from "node:stream/promises"

export function cat(path) {
  return new Promise((resolve, reject) => {
    const reader = createReadStream(path)

    reader.pipe(stdout)
    reader.on("end", resolve)
    reader.on("error", reject)
  })
}

export async function add(path) {
  await appendFile(path, "", { flag: "ax" })
}

export async function rn(path, newName) {
  const newFilePath = join(dirname(path), newName)

  await rename(path, newFilePath)
}

export async function cp(path, newFile) {
  const newFilePath = join(dirname(path), newFile)

  const sourceFile = await open(path)
  const destFile = await open(newFilePath, "wx")

  await pipeline(
    sourceFile.createReadStream(),
    destFile.createWriteStream(),
  )
}

export async function rm(path) {
  await rmFs(path)
}

export async function mv(path, newFile) {
  await cp(path, newFile)
  await rm(path)
}
