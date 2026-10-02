import { useTheme, type Theme } from "@/hooks/useTheme";


const options: { value: Theme, label: string }[] = [
  {
    value: 'light', label: '☀️'
  },
  {
    value: 'dark', label: '🌙'
  },
  {
    value: 'system', label: '💻'
  }
]


export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      {
        options.map((o) => (
          <button
            key={o.value}
            onClick={() => {
              console.log(o.value, 'change theeme')
              setTheme(o.value)
            }}
            className={theme === o.value
              ? 'rounded bg-primary px-2 py-1 text-primary-foreground'
              : 'rounded px-2 py-1 text-text'
            }
          >
            {o.label}
          </button>
        ))
      }
    </div>
  )
}



