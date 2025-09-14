
import Layout from '@/components/Layout'
import { useState } from 'react'
export default function Contact(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [msg,setMsg]=useState('')
  async function send(){ await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,msg})}); alert('Tack! Vi återkommer.'); setName(''); setEmail(''); setMsg('') }
  return (
    <Layout>
      <div className="bg-white rounded-3xl p-6 shadow max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Kontakt</h1>
        <div className="grid gap-3">
          <L label="Namn" v={name} s={setName}/>
          <L label="E-post" v={email} s={setEmail}/>
          <label className="text-sm"><div className="text-slate-600 mb-1">Meddelande</div><textarea value={msg} onChange={e=>setMsg(e.target.value)} className="w-full border border-slate-300 rounded-xl px-3 py-2 h-32"/></label>
          <button onClick={send} className="px-4 py-2 rounded-xl bg-blue-600 text-white w-fit">Skicka</button>
        </div>
      </div>
    </Layout>
  )
}
function L({label,v,s}:{label:string,v:any,s:(x:any)=>void}){ return (<label className="text-sm"><div className="text-slate-600 mb-1">{label}</div><input value={v} onChange={e=>s(e.target.value)} className="w-full border border-slate-300 rounded-xl px-3 py-2"/></label>) }
