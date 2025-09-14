
import { useMemo, useState } from 'react'

export default function PriceCalculator(){
  const [orderType, setOrderType] = useState<'bemanning'|'rekrytering'>('bemanning')
  const [hours, setHours] = useState(40)
  const [hourlyWage, setHourlyWage] = useState(200)
  const [monthlySalary, setMonthlySalary] = useState(35000)
  const [role, setRole] = useState('')
  const [client, setClient] = useState('')
  const [startDate, setStartDate] = useState('')
  const [place, setPlace] = useState('')
  const [schedule, setSchedule] = useState('Dagtid')

  const base = useMemo(()=> orderType==='bemanning' ? 2 * hourlyWage * Math.max(0,hours) : 3 * monthlySalary, [orderType, hours, hourlyWage, monthlySalary])
  const moms = Math.round(base * 0.25)
  const total = base + moms

  async function submitOrder(){
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/orders`, {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({orderType, hours, hourlyWage, monthlySalary, role, client, startDate, place, schedule, price_excl_vat: base, vat: moms, price_incl_vat: total})
    })
    alert(resp.ok ? 'Beställning skickad!' : 'Kunde inte skicka beställningen.')
  }

  return (
    <section className="bg-white rounded-3xl p-6 shadow">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-3 w-full">
          <div className="flex gap-2">
            <button onClick={()=>setOrderType('bemanning')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${orderType==='bemanning'?'bg-blue-600 text-white':'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Bemanning</button>
            <button onClick={()=>setOrderType('rekrytering')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${orderType==='rekrytering'?'bg-blue-600 text-white':'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>Rekrytering</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <L label="Kund" v={client} s={setClient} placeholder="Företagsnamn" />
            <L label="Roll" v={role} s={setRole} placeholder="Ex. Lagerarbetare" />
            <L label="Startdatum" v={startDate} s={setStartDate} type="date" />
            <L label="Plats" v={place} s={setPlace} placeholder="Adress/Ort" />
            <L label="Schema" v={schedule} s={setSchedule} placeholder="Dagtid/Skift" />
            {orderType==='bemanning' && <N label="Timlön (SEK)" v={hourlyWage} s={setHourlyWage} />}
            {orderType==='bemanning' && <N label="Antal timmar" v={hours} s={setHours} />}
            {orderType==='rekrytering' && <N label="Månadslön (SEK)" v={monthlySalary} s={setMonthlySalary} />}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-w-[280px]">
          <div className="text-sm text-slate-600">Beräknat pris</div>
          <div className="text-xl">Exkl. moms: <b>{base.toLocaleString('sv-SE')} kr</b></div>
          <div className="text-xl">Moms (25%): <b>{moms.toLocaleString('sv-SE')} kr</b></div>
          <div className="text-3xl font-bold mt-1">Totalt: {total.toLocaleString('sv-SE')} kr</div>
          <button onClick={submitOrder} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 font-medium shadow">Skicka beställning</button>
        </div>
      </div>
    </section>
  )
}
function L({label,v,s,type='text',placeholder=''}:{label:string,v:any,s:(x:any)=>void,type?:string,placeholder?:string}){
  return (<label className="text-sm"><div className="text-slate-600 mb-1">{label}</div><input value={v} onChange={e=>s(e.target.value)} type={type} placeholder={placeholder} className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/></label>)
}
function N({label,v,s}:{label:string,v:number,s:(x:number)=>void}){
  return (<label className="text-sm"><div className="text-slate-600 mb-1">{label}</div><input value={v} onChange={e=>setTimeout(()=>s(Number(e.target.value)),0)} type="number" className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/></label>)
}
