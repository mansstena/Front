
import Layout from '@/components/Layout'
import PriceCalculator from '@/components/PriceCalculator'
export default function Home(){
  return (
    <Layout>
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-8 shadow">
        <h1 className="text-3xl md:text-4xl font-bold">Beställ personal på 2 minuter</h1>
        <p className="mt-2 text-blue-100">Tydlig prissättning: Bemanning = 2× timlön, Rekrytering = 3× månadslön (visas inkl. moms).</p>
      </section>
      <div className="mt-6"><PriceCalculator/></div>
    </Layout>
  )
}
