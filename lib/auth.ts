export function isAdminEmail(email: string): boolean {
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
  return admins.includes(email.toLowerCase())
}
