import React, { useRef, useState } from "react"
import { PrioritySelect } from "../PrioritySelect/PrioritySelect"

interface TaskFromProps {
  onAdd: (title: string) => void
  isSubmitting: boolean
}

export function TaskForm({ onAdd, isSubmitting }: TaskFromProps) {

  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const clean = title.trim()
    if (!clean) return
    onAdd(clean)
    setTitle('')

    inputRef.current?.focus()
  }

  // console.log('init taskForm')
  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input
        ref={inputRef}
        className="flex-1 rounded-md border border-gray-300 px-3 py-2"
        placeholder="Nueva tarea"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white" disabled={isSubmitting}>Agregar</button>

      <PrioritySelect>
        <PrioritySelect.Option value="low">Baja</PrioritySelect.Option>
        <PrioritySelect.Option value="medium">Media</PrioritySelect.Option>
        <PrioritySelect.Option value="high">Alta</PrioritySelect.Option>
        <PrioritySelect.Option value="urgent">Urgente</PrioritySelect.Option>
      </PrioritySelect>

    </form>
  )
}