
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'

export default function Jobs(){
  const [jobs, setJobs] = useState<any[]>([])
  const [applyFor, setApplyFor] = useState<number|null>(null)
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [cv,setCv]=useState('')

  useEffect(()=>{ fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/jobs`).then(r=>r.json()).then(setJobs).catch(()=>{}) },[])

  async function apply(jobId:number){
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/candidates`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ job_id: jobId, name, email, cv_url: cv }) })
    if(r.ok){ alert('Ansökan skickad!'); setApplyFor(null); setName(''); setEmail(''); setCv('') } else alert('Kunde inte skicka ansökan.')
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Lediga jobb</h1>
      <div className="grid gap-4">
        {jobs.length===0 && <div className="text-sm text-slate-600">Inga annonser ännu. Lägg till i Admin &rarr; Annonser.</div>}
        {jobs.map((j:any)=>(
          <div key={j.id} className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="font-semibold">{j.title || j.role}</div>
            <div className="text-sm text-slate-600">{j.client}</div>
            <div className="text-sm mt-2 whitespace-pre-wrap">{j.description||''}</div>
            <button onClick={()=>setApplyFor(j.id)} className="mt-3 px-3 py-2 rounded-xl bg-blue-600 text-white">Ansök</button>
            {applyFor===j.id && (
              <div className="mt-3 grid sm:grid-cols-3 gap-2">
                <L label="Namn" v={name} s={setName}/>
                <L label="E-post" v={email} s={setEmail}/>
                <L label="CV-länk (URL)" v={cv} s={setCv}/>
                <button onClick={()=>apply(j.id)} className="px-3 py-2 rounded-xl bg-slate-900 text-white w-fit">Skicka</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
}
function L({label,v,s}:{label:string,v:any,s:(x:any)=>void}){
  return (<label className="text-sm"><div className="text-slate-600 mb-1">{label}</div><input value={v} onChange={e=>s(e.target.value)} className="w-full border border-slate-300 rounded-xl px-3 py-2"/></label>)
}
