import { resolve } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import type { Command } from './types.ts'

export const cd: Command = async (pwd, [path]) => {
  const resolvedPath = resolve(pwd, path)
  const stats = await stat(resolvedPath)

  if (stats.isDirectory()) {
    return resolvedPath
  } else {
    throw new Error('Not a directory')
  }
}

export const up: Command = (pwd) => {
  return cd(pwd, ['..'])
}

export const ls: Command = async (pwd) => {
  const files = await readdir(pwd, { withFileTypes: true })
  const data = files
    .sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA > nameB) {
        return 1
      } else if (nameA < nameB) {
        return -1
      } else {
        return 0
      }
    })
    .sort((a, b) => -(Number(a.isDirectory()) - Number(b.isDirectory())))
    .map(dirent => (
      { name: dirent.name, type: dirent.isDirectory() ? 'directory' : 'file' }
    ))

  console.table(data)
}
