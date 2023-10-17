import { createReadStream } from "node:fs"
import { createHash } from "node:crypto"
import { resolve } from "node:path"
import { stdout } from "node:process"

export function hash(path) {
  return new Promise((resolve, reject) => {
    const input = createReadStream(path)
    const hash = createHash("sha256")

    input.on("readable", () => {
      const data = input.read()

      if (data) {
        hash.update(data)
      } else {
        console.log(hash.digest("hex"))
      }
    })

    input.on("end", resolve)
    input.on("error", reject)
  })
};
