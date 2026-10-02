

type NotificationProps = 
  | { type: 'success';  message: string }
  | { type: 'error'; message: string; errorCode: number }
  
// type NotificationProps = {
//   type: 'success' | 'error'
//   message: string
//   errorCode?: number
// }


export function Notification(props: NotificationProps) {
  // NARROWING automático: dentro de este if, TypeScript SABE que props es
  // la forma 'error' -> props.errorCode existe y es number (sin casts).
  if (props.type === 'error') {
    return (
      <div className="rounded-md bg-rose-100 p-3 text-sm text-rose-800">
        {props.message} <span className="opacity-60">(código {props.errorCode})</span>
      </div>
    )
  }

  // Acá TypeScript sabe que es 'success' -> acceder a props.errorCode NO compilaría.
  return (
    <div className="rounded-md bg-emerald-100 p-3 text-sm text-emerald-800">
      {props.message}
    </div>
  )
}

