
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { isAdminEmail } from '@/lib/auth'

export default function Admin(){
  const [email, setEmail] = useState<string|null>(null)
  useEffect(()=>{ supabase.auth.getUser().then(({data})=> setEmail(data.user?.email ?? null)) },[])
  if(!isAdminEmail(email)) return <Layout><div className="text-sm text-red-600">Endast admin.</div></Layout>
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <ul className="list-disc ml-6 text-blue-700">
        <li><Link href="/admin/jobs">Hantera annonser</Link></li>
      </ul>
    </Layout>
  )
}
