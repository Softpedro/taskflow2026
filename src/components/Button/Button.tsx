import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';


type ButtonProps<C extends ElementType> = {
  as?: C
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children'>


export function Button<C extends ElementType = 'button'>({ as, children, ...props}: ButtonProps<C>) {
  
  const Component = (as || 'button')

  return (
    <Component
      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      {...props}
    >
      {children}
    </Component>
  )
}