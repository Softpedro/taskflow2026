import { createContext, useContext, useState, type ReactNode } from "react"
import type { Priority } from "@/types"

// ─────────────────────────────────────────────────────────────
// COMPOUND COMPONENT (Slides 3 y 4)
// El Context es INTERNO y PRIVADO: se crea a nivel de módulo pero NO se exporta.
// El mundo exterior no sabe que existe -> la coordinación queda encapsulada.
// ─────────────────────────────────────────────────────────────
interface PrioritySelectContextValue {
  value: Priority
  onChange: (value: Priority) => void
}

const PrioritySelectContext = createContext<PrioritySelectContextValue | null>(null)

// Hook interno: si alguien usa <PrioritySelect.Option> FUERA del padre,
// el contexto es null y lanzamos un error CLARO (mejor que fallar en silencio).
function usePrioritySelectContext() {
  const ctx = useContext(PrioritySelectContext)
  if (!ctx) throw new Error('PrioritySelect.Option debe usarse dentro de <PrioritySelect>')
  return ctx
}

interface PrioritySelectProps {
  children: ReactNode
  value?: Priority          // si el consumidor lo pasa -> modo CONTROLLED
  defaultValue?: Priority   // si no pasa value -> modo UNCONTROLLED (usa este)
  onChange?: (value: Priority) => void
}

// EL PADRE COORDINA (Pieza 1): dueño del estado, crea el Provider.
function PrioritySelect({ children, value, defaultValue = 'medium', onChange }: PrioritySelectProps) {
  // Estado interno: solo se usa en modo uncontrolled
  const [internal, setInternal] = useState<Priority>(defaultValue)

  // CONTROLLED vs UNCONTROLLED (Slide 8): la línea de decisión.
  // ¿Me pasaron value? -> obedezco ese. ¿No? -> uso el mío.
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  function handleChange(next: Priority) {
    if (!isControlled) setInternal(next) // uncontrolled: actualizo mi estado
    onChange?.(next)                      // siempre aviso por si escuchan
  }

  return (
    <PrioritySelectContext.Provider value={{ value: current, onChange: handleChange }}>
      <div className="flex flex-wrap gap-2">{children}</div>
    </PrioritySelectContext.Provider>
  )
}

// LOS HIJOS CONSUMEN (Pieza 2): leen del contexto SIN recibir props de coordinación.
function Option({ value, children }: { value: Priority; children: ReactNode }) {
  const { value: selected, onChange } = usePrioritySelectContext()
  const isSelected = selected === value // "¿soy yo el elegido?"

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={
        isSelected
          ? 'rounded-md bg-gray-900 px-3 py-1 text-sm text-white'
          : 'rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700'
      }
    >
      {children}
    </button>
  )
}

// NOTACIÓN DE PUNTO (Pieza 3): NO es sintaxis mágica. Las funciones son objetos,
// y le colgamos Option como propiedad. Importás UNO y tenés todo el kit.
PrioritySelect.Option = Option

export { PrioritySelect }
