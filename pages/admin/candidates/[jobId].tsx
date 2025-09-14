
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { isAdminEmail, adminHeaders } from '@/lib/auth'

export default function Candidates(){
  const router = useRouter()
  const { jobId } = router.query
  const [email, setEmail] = useState<string|null>(null)
  const [cands, setCands] = useState<any[]>([])
  const [job, setJob] = useState<any>(null)

  useEffect(()=>{ supabase.auth.getUser().then(({data})=> setEmail(data.user?.email ?? null)) },[])

  useEffect(()=>{
    if(!jobId) return
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/jobs/${jobId}`).then(r=>r.json()).then(setJob).catch(()=>{})
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/candidates?job_id=${jobId}`, { headers: adminHeaders() }).then(r=>r.json()).then(setCands).catch(()=>{})
  },[jobId])

  async function save(id:number, rating:number, notes:string){
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/candidates/${id}`, { method:'PUT', headers:{'Content-Type':'application/json', ...adminHeaders()}, body: JSON.stringify({ rating, notes }) })
    if(!r.ok) alert('Kunde inte spara')
  }

  if(!isAdminEmail(email)) return <Layout><div className="text-sm text-red-600">Endast admin.</div></Layout>
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-2">Kandidater</h1>
      {job && <div className="text-sm text-slate-600 mb-4">{job.title} • {job.client}</div>}
      <div className="grid gap-3">
        {cands.map((c:any)=>(<Row key={c.id} c={c} onSave={save}/>))}
      </div>
    </Layout>
  )
}
function Row({c,onSave}:{c:any,onSave:(id:number,r:number,n:string)=>void}){
  const [rating,setRating]=useState<number>(c.rating||0)
  const [notes,setNotes]=useState<string>(c.notes||'')
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 grid gap-2">
      <div className="font-semibold">{c.name} <span className="text-slate-500 text-xs">({c.email})</span></div>
      {c.cv_url && <a className="text-blue-700 underline text-sm w-fit" href={c.cv_url} target="_blank">Öppna CV</a>}
      <label className="text-sm"><div className="text-slate-600 mb-1">Betyg (1–5)</div><input type="number" min={1} max={5} value={rating} onChange={e=>setRating(Number(e.target.value))} className="border rounded-xl px-3 py-2 w-24"/></label>
      <label className="text-sm"><div className="text-slate-600 mb-1">Anteckningar</div><textarea value={notes} onChange={e=>setNotes(e.target.value)} className="w-full border rounded-xl px-3 py-2 h-24"/></label>
      <button onClick={()=>onSave(c.id, rating, notes)} className="px-3 py-2 rounded-xl bg-blue-600 text-white w-fit">Spara</button>
    </div>
  )
}
