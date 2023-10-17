import { EOL, cpus, homedir, userInfo, arch } from "node:os"

class Os {
  EOL() {
    return EOL
  }

  cpus() {
    return cpus()
  }

  homedir() {
    return homedir()
  }

  username() {
    return userInfo().username
  }

  arch() {
    return arch()
  }
}

export const os = new Os()
