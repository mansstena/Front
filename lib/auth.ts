
import { supabase } from './supabaseClient'
export async function getUser(){
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
export function isAdminEmail(email?: string|null){
  if(!email) return false
  const list = (process.env.NEXT_PUBLIC_ADMIN_EMAILS||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean)
  return list.includes(email.toLowerCase())
}
export function adminHeaders(){
  return { 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '' }
}
