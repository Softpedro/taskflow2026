import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Notification } from "@/components/Notification/Notification"
// import { Disclosure } from "@/components/Disclosure/Disclosure"
import { TaskModal } from "@/components/TaskModal/TaskModal"

// Zona de demos para la Sesión 5: monta en pantalla los patrones que no
// estaban visibles, para poder tocarlos en vivo. Es solo para clase.
export function PatternsDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg border border-dashed border-gray-300 p-4">
      <p className="text-xs font-semibold uppercase text-gray-400">Demos de patrones</p>

      {/* POLYMORPHIC (Slide 9): mismo diseño, distinta etiqueta.
          El primero es <button>, el segundo es un <a> real (abrilo con click del medio). */}
      <div className="flex gap-2">
        <Button onClick={() => alert('Soy un <button>')}>Nueva tarea</Button>
        <Button as="a" href="https://react.dev" target="_blank" rel="noreferrer">
          Ver docs (soy un &lt;a&gt;)
        </Button>
      </div>

      {/* DISCRIMINATED UNIONS (Slide 10): los dos tipos válidos de notificación. */}
      <Notification type="success" message="Tarea guardada" />
      <Notification type="error" message="Falló la conexión" errorCode={500} />

      {/* <Notification type="success" message="Falló la conexión" errorCode={500} /> */}

      {/* HEADLESS (Slide 6): el Disclosure no trae UI; TODA la apariencia la ponemos acá. */}
      {/* <Disclosure>
        {({ isOpen, toggle }) => (
          <div>
            <button onClick={toggle} className="text-sm text-blue-600">
              {isOpen ? '▼ Ocultar' : '▶ Ver'} detalles
            </button>
            {isOpen && (
              <p className="mt-1 text-sm text-gray-600">
                Este contenido lo controla el consumidor, no el componente.
              </p>
            )}
          </div>
        )}
      </Disclosure> */}

      {/* SLOT PATTERN (Slide 7): abre un modal con 3 zonas con nombre. */}
      <div>
        <button onClick={() => setOpen(true)} className="rounded-md bg-gray-900 px-3 py-1 text-sm text-white">
          Abrir modal
        </button>
      </div>

      {open && (
        <TaskModal
          header={<h2>Nueva tarea</h2>}
          footer={
            <>
              <button onClick={() => setOpen(false)} className="rounded-md bg-gray-100 px-3 py-1 text-sm">
                Cancelar
              </button>
              <button onClick={() => setOpen(false)} className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">
                Guardar
              </button>
            </>
          }
          onClose={() => setOpen(false)}
        >
          <input className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Título de la tarea..." />
        </TaskModal>
      )}
    </div>
  )
}
