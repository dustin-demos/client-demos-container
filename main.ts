import { serveDir } from '@std/http/file-server'

const PORT = parseInt(Deno.env.get('PORT') ?? '8080', 10)
const HOSTNAME = Deno.env.get('HOSTNAME') ?? '::'

Deno.serve({ port: PORT, hostname: HOSTNAME }, (req) => {
  return serveDir(req, { fsRoot: 'public', quiet: true })
})
