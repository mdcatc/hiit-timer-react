import { useCallback, useEffect, useRef, useState } from 'react'
import { parseMarkdownWorkout, type Phase } from '../lib/workout'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'complete'

export function useIntervalTimer() {
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [phases, setPhases] = useState<Phase[]>([])
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const intervalRef = useRef<number | null>(null)
  const beepRef = useRef<HTMLAudioElement | null>(null)
  const beepEnabledRef = useRef<boolean>(true)

  // Lazy create audio
  useEffect(() => {
    if (!beepRef.current) {
      const a = new Audio('/media/StartBeeps.wav')
      a.preload = 'auto'
      beepRef.current = a
    }
  }, [])

  const currentPhase = phases[index]
  const nextPhase = phases[index + 1]

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      const next = prev - 1
      if (next <= 0) {
        // advance phase
        window.clearInterval(intervalRef.current as number)
        intervalRef.current = null
        setIndex((i) => {
          const ni = i + 1
          if (ni >= phases.length) {
            setStatus('complete')
            return i // keep last index
          } else {
            // start next phase
            setTimeLeft(phases[ni].duration)
            startInterval()
            return ni
          }
        })
        return 0
      }

      // last 3 seconds beep
      if (next <= 3 && beepEnabledRef.current && beepRef.current) {
        try {
          // Only beep on boundary seconds (not every render)
          // Play if currently paused or ended
          beepRef.current.currentTime = 0
          void beepRef.current.play()
        } catch {}
      }

      return next
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phases])

  const startInterval = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = window.setInterval(tick, 1000)
  }, [tick])

  const clearIntervalSafe = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Controls
  const start = useCallback((routineText: string, beepEnabled = true) => {
    const parsed = parseMarkdownWorkout(routineText)
    setPhases(parsed)
    setIndex(0)
    setTimeLeft(parsed[0]?.duration ?? 0)
    beepEnabledRef.current = beepEnabled

    if (parsed.length > 0) {
      setStatus('running')
      clearIntervalSafe()
      startInterval()
    } else {
      setStatus('idle')
    }
  }, [clearIntervalSafe, startInterval])

  const pause = useCallback(() => {
    if (status !== 'running') return
    clearIntervalSafe()
    setStatus('paused')
  }, [status, clearIntervalSafe])

  const resume = useCallback(() => {
    if (status !== 'paused') return
    setStatus('running')
    startInterval()
  }, [status, startInterval])

  const skip = useCallback(() => {
    if (phases.length === 0) return
    clearIntervalSafe()
    setIndex((i) => {
      const ni = i + 1
      if (ni >= phases.length) {
        setStatus('complete')
        setTimeLeft(0)
        return i
      }
      setTimeLeft(phases[ni].duration)
      if (status === 'running') startInterval()
      return ni
    })
  }, [phases, status, clearIntervalSafe, startInterval])

  const reset = useCallback(() => {
    clearIntervalSafe()
    setStatus('idle')
    setPhases([])
    setIndex(0)
    setTimeLeft(0)
  }, [clearIntervalSafe])

  useEffect(() => () => clearIntervalSafe(), [clearIntervalSafe])

  return {
    // state
    status,
    phases,
    index,
    timeLeft,
    currentPhase,
    nextPhase,
    // controls
    start,
    pause,
    resume,
    skip,
    reset,
  }
}
