
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { isAdminEmail, adminHeaders } from '@/lib/auth'
import Link from 'next/link'

export default function AdminJobs(){
  const [email, setEmail] = useState<string|null>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [title,setTitle]=useState(''); const [client,setClient]=useState(''); const [description,setDescription]=useState('')
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=> setEmail(data.user?.email ?? null))
    load()
  },[])
  async function load(){ const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/jobs`); setJobs(await r.json()) }
  async function createJob(){
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/jobs`, { method:'POST', headers:{'Content-Type':'application/json', ...adminHeaders()}, body: JSON.stringify({ title, client, description }) })
    if(r.ok){ setTitle(''); setClient(''); setDescription(''); load() } else alert('Behörighet eller fel.')
  }
  async function remove(id:number){ if(!confirm('Ta bort annons?')) return; const r=await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/jobs/${id}`,{method:'DELETE', headers: adminHeaders()}); if(r.ok) load(); else alert('Fel') }
  if(!isAdminEmail(email)) return <Layout><div className="text-sm text-red-600">Endast admin.</div></Layout>
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Annonser</h1>
      <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-4 grid gap-2">
        <L l="Titel" v={title} s={setTitle}/>
        <L l="Kund" v={client} s={setClient}/>
        <label className="text-sm"><div className="text-slate-600 mb-1">Beskrivning</div><textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border border-slate-300 rounded-xl px-3 py-2 h-28"/></label>
        <button onClick={createJob} className="px-3 py-2 rounded-xl bg-blue-600 text-white w-fit">Publicera annons</button>
      </div>
      <div className="grid gap-3">
        {jobs.map((j:any)=>(
          <div key={j.id} className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="font-semibold">{j.title}</div>
            <div className="text-sm text-slate-600">{j.client}</div>
            <div className="text-sm mt-2">{j.description}</div>
            <div className="flex gap-3 mt-3">
              <Link className="text-blue-700 underline" href={`/admin/candidates/${j.id}`}>Kandidater</Link>
              <button onClick={()=>remove(j.id)} className="text-red-700 underline">Ta bort</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
function L({l,v,s}:{l:string,v:any,s:(x:any)=>void}){ return (<label className="text-sm"><div className="text-slate-600 mb-1">{l}</div><input value={v} onChange={e=>s(e.target.value)} className="w-full border border-slate-300 rounded-xl px-3 py-2"/></label>) }
