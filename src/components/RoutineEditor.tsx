import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export function RoutineEditor({ onStart }: { onStart: (text: string, beep: boolean) => void }) {
  const defaultText = `## Warm-Up
- Jumping Jacks: 15s
- High Knees: 15s
- Rest: 15s

## Main Set (Repeat 3x)
- Push-Ups: 10s
- Squats: 10s
- Lunges: 10s
- Rest: 15s

## Cool Down
- Stretch: 15s`

  const [text, setText] = useState<string>(defaultText)
  const [beep, setBeep] = useState<boolean>(true)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedText = localStorage.getItem('hiit.routineText')
      const savedBeep = localStorage.getItem('hiit.beepEnabled')
      if (savedText) setText(savedText)
      if (savedBeep != null) setBeep(savedBeep === 'true')
    } catch {}
  }, [])

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem('hiit.routineText', text)
    } catch {}
  }, [text])

  useEffect(() => {
    try {
      localStorage.setItem('hiit.beepEnabled', String(beep))
    } catch {}
  }, [beep])

  return (
    <div className="w-full max-w-2xl space-y-3 p-4">
      <h1 className="text-2xl font-semibold">HIIT Timer</h1>
      <label className="block text-sm font-medium">Routine</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        className="w-full rounded-md border border-gray-300 bg-background p-3 text-sm focus:outline-none"
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={beep} onChange={(e) => setBeep(e.target.checked)} />
          Beep last 3s
        </label>
        <Button onClick={() => onStart(text, beep)}>Start</Button>
      </div>
    </div>
  )
}
