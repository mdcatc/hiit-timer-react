import { Button } from './ui/button'

function formatTime(sec: number) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${m}:${s}`
}

export function TimerDisplay({
  status,
  timeLeft,
  currentLabel,
  nextLabel,
  onPause,
  onResume,
  onSkip,
  onReset,
}: {
  status: 'idle' | 'running' | 'paused' | 'complete'
  timeLeft: number
  currentLabel?: string
  nextLabel?: string
  onPause: () => void
  onResume: () => void
  onSkip: () => void
  onReset: () => void
}) {
  const isRunning = status === 'running'
  const isPaused = status === 'paused'
  const showControls = isRunning || isPaused

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4 p-4 text-center">
      <div className="text-6xl font-bold tabular-nums">{formatTime(timeLeft)}</div>
      <div className="text-2xl font-semibold">{currentLabel ?? 'Idle'}</div>
      {timeLeft <= 3 && nextLabel && (
        <div className="text-xl opacity-80">Next: {nextLabel}</div>
      )}

      {showControls && (
        <div className="mt-4 flex gap-2">
          {isRunning ? (
            <Button variant="secondary" onClick={onPause}>
              Pause
            </Button>
          ) : isPaused ? (
            <Button onClick={onResume}>Resume</Button>
          ) : null}
          <Button variant="destructive" onClick={onSkip}>
            Skip
          </Button>
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}
