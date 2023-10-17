import { readdir } from "node:fs/promises"

export async function ls(path) {
  const dir = await readdir(path, { withFileTypes: true })

  console.table(
    dir
      .map(file => ({
        Name: file.name,
        Type: file.isDirectory() ? "directory" : "file",
      }))
      .sort((a, b) => a.Name.localeCompare(b.Name))
      // "directory" is larger than "file"
      .sort((a, b) => a.Type.localeCompare(b.Type))
  )
}
