const missingEnvCache = new Set<string>()

export function getServerEnv(name: string) {
  return process.env[name]?.trim()
}

export function getMissingServerEnv(names: readonly string[]) {
  return names.filter((name) => !getServerEnv(name))
}

export function requireServerEnv(name: string) {
  const value = getServerEnv(name)
  if (value) return value

  const message = `Missing required server environment variable: ${name}`
  if (!missingEnvCache.has(message)) {
    missingEnvCache.add(message)
    console.error(message)
  }
  throw new Error(message)
}
