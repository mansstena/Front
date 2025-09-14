
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
export default function Consultant(){
  const [payrolls, setPayrolls] = useState<any[]>([])
  const [shifts, setShifts] = useState<any[]>([])
  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/consultant/payrolls?consultant_id=C-001`).then(r=>r.json()).then(setPayrolls).catch(()=>{})
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/consultant/shifts?consultant_id=C-001`).then(r=>r.json()).then(setShifts).catch(()=>{})
  },[])
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Mina uppgifter</h1>
      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200">
          <div className="font-semibold mb-2">Lönespecifikationer</div>
          <ul className="text-sm space-y-2">
            {payrolls.map((p:any)=>(<li key={p.id} className="flex items-center justify-between"><span>{p.month}</span><a className="text-blue-600 underline" href={`${process.env.NEXT_PUBLIC_API_BASE}/api/payrolls/${p.id}/pdf`} target="_blank">Öppna PDF</a></li>))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-200">
          <div className="font-semibold mb-2">Mina pass</div>
          <ul className="text-sm space-y-2">
            {shifts.map((s:any)=>(<li key={s.id}>{s.start}–{s.end} • {s.client} • {s.place}</li>))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
