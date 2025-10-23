export type Command = (pwd: string, args: string[], username: string) => Promise<string | void>
