
import Link from 'next/link'
import React from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { isAdminEmail } from '@/lib/auth'

export default function Layout({children}:{children: React.ReactNode}){
  const [email, setEmail] = useState<string|null>(null)
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=> setEmail(data.user?.email ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s)=> setEmail(s?.user?.email ?? null))
    return () => subscription.unsubscribe()
  },[])

  async function signIn(){
    const e = prompt('Ange e-post för inloggning (magisk länk)')
    if(!e) return
    const { error } = await supabase.auth.signInWithOtp({ email: e })
    if(error) alert(error.message)
    else alert('Kolla din e-post för inloggningslänk.')
  }
  async function signOut(){ await supabase.auth.signOut() }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 grid place-items-center text-white font-bold">BR</div>
            <div>
              <div className="font-semibold text-lg">Bemanning & Rekrytering</div>
              <div className="text-xs text-slate-500 -mt-0.5">Snabbt. Transparent. Skalbart.</div>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link className="hover:underline" href="/">Kund</Link>
            <Link className="hover:underline" href="/jobs">Lediga jobb</Link>
            <Link className="hover:underline" href="/consultant">Konsult</Link>
            <Link className="hover:underline" href="/about">Om oss</Link>
            <Link className="hover:underline" href="/contact">Kontakt</Link>
            {isAdminEmail(email) && <Link className="hover:underline font-semibold" href="/admin">Admin</Link>}
          </nav>
          <div className="text-xs flex items-center gap-2">
            {email ? (<><span>{email}</span><button onClick={signOut} className="px-2 py-1 rounded bg-slate-900 text-white">Logga ut</button></>) : (<button onClick={signIn} className="px-2 py-1 rounded bg-blue-600 text-white">Logga in</button>)}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="mt-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} BR – Bemanning & Rekrytering</div>
          <div className="flex gap-4">
            <a className="hover:underline" href="#">GDPR & Dataskydd</a>
            <a className="hover:underline" href="#">Allmänna villkor</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
