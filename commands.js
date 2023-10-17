import { readdir } from "node:fs/promises"
import { resolve, join } from "node:path"

import { ls } from "./navigation.js"
import { cat, add, rn, cp, rm, mv } from "./files.js"
import { os } from "./os.js"
import { hash } from "./crypto.js"
import { compress, decompress } from "./archive.js"

export class Commands {
  constructor() {
    this.workingDirectory = resolve("./")
  }

  _resolvePath(path) {
    return join(this.workingDirectory, path)
  }
  
  async cd(path) {
    const resolvedPath = this._resolvePath(path)
    const dir = await readdir(resolvedPath)

    if (dir) {
      this.workingDirectory = resolvedPath
    }
  }

  async up() {
    await this.cd("..")
  }

  async ls() {
    await ls(this.workingDirectory)
  }

  async cat(path) {
    await cat(this._resolvePath(path))
  }

  async add(path) {
    await add(this._resolvePath(path))
  }

  async rn(path, newName) {
    await rn(this._resolvePath(path), newName)
  }

  async cp(path, newFile) {
    await cp(this._resolvePath(path), newFile)
  }

  async rm(path) {
    await rm(this._resolvePath(path))
  }

  async mv(path, newFile) {
    await mv(this._resolvePath(path), newFile)
  }

  os(command) {
    const parsedCommand = command.slice(2)

    if (os[parsedCommand] && command.startsWith("--")) {
      console.log(os[parsedCommand]())
    } else {
      console.log("Invalid input")
    }
  }

  async hash(path) {
    await hash(this._resolvePath(path))
  }

  async compress(path, destPath) {
    await compress(this._resolvePath(path), destPath)
  }

  async decompress(path, destPath) {
    await decompress(this._resolvePath(path), destPath)
  }
}

