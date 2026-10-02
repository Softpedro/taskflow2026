import { useState } from "react"

const ITEMS = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Tarea ${i + 1}` }))
// Tarea 1, Tarea 2 ...

const DemoCard = function DemoCard({ item, onComplete }: { item: { id: number; title: string }; onComplete: (id: number) => void }) {
  console.log('render:', item.id)
  return (
    <button onClick={() => onComplete(item.id)}
      className="rounded-md border border-border bg-surface-raised px-3 py-2 text-left text-text">
      {item.title}
    </button>
  )
}

export function PerfDemo() {
  const [search, setSearch] = useState('')
  const onComplete = (id: number) => console.log('completar', id)

  return (
    <div className="space-y-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Escribí acá y mirá la consola..."
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-text"
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ITEMS.map((item) => (
          <DemoCard key={item.id} item={item} onComplete={onComplete} />
        ))}
      </div>
    </div>
  )
}