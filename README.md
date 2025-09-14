
# Frontend (Netlify, Next.js 14 + TS)
- Alias `@/*` via jsconfig.json
- Supabase Auth-klient inkluderad
- Sidor: /, /jobs, /consultant, /about, /contact, /admin, /admin/jobs, /admin/candidates/[jobId]

## Deploy (Netlify)
- Import from Git (rekommenderas).
- Env: NEXT_PUBLIC_API_BASE, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_ADMIN_EMAILS, NEXT_PUBLIC_ADMIN_API_KEY
- Build: `npm run build`, Publish: `.next`
