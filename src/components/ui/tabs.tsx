import React, { createContext, useContext, useMemo, useState } from 'react'
import { cn } from '../../lib/utils'

type TabsContextType = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: {
  defaultValue: string
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children: React.ReactNode
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolled

  const setValue = (v: string) => {
    if (!isControlled) setUncontrolled(v)
    onValueChange?.(v)
  }

  const ctx = useMemo(() => ({ value, setValue }), [value])

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('inline-flex rounded-md bg-muted p-1', className)}>{children}</div>
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs')
  const active = ctx.value === value
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        'px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground',
        'rounded-sm',
        className,
      )}
      aria-selected={active}
      role="tab"
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent must be used within Tabs')
  const active = ctx.value === value
  if (!active) return null
  return (
    <div role="tabpanel" className={cn('mt-3', className)}>
      {children}
    </div>
  )
}
