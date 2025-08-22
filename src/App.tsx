import './App.css'
import { useIntervalTimer } from './hooks/useIntervalTimer'
import { RoutineEditor } from './components/RoutineEditor'
import { TimerDisplay } from './components/TimerDisplay'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
  const {
    status,
    timeLeft,
    currentPhase,
    nextPhase,
    start,
    pause,
    resume,
    skip,
    reset,
  } = useIntervalTimer()

  return (
    <>
      <div className="min-h-svh w-full">
        {(status === 'running' || status === 'paused') ? (
          <div className="flex min-h-svh flex-col items-center justify-center">
            <TimerDisplay
              status={status}
              timeLeft={timeLeft}
              currentLabel={currentPhase?.label}
              nextLabel={nextPhase?.label}
              onPause={pause}
              onResume={resume}
              onSkip={skip}
              onReset={reset}
            />
          </div>
        ) : (
          <>
            {/* Mobile: Tabs */}
            <div className="block p-4 md:hidden">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="timer">Timer</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <RoutineEditor onStart={(text, beep) => start(text, beep)} />
                </TabsContent>
                <TabsContent value="timer">
                  <div className="flex items-center justify-center">
                    <TimerDisplay
                      status={status}
                      timeLeft={timeLeft}
                      currentLabel={currentPhase?.label}
                      nextLabel={nextPhase?.label}
                      onPause={pause}
                      onResume={resume}
                      onSkip={skip}
                      onReset={reset}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop: 2-col grid */}
            <div className="mx-auto hidden max-w-6xl gap-6 p-4 md:grid md:grid-cols-2">
              <div>
                <RoutineEditor onStart={(text, beep) => start(text, beep)} />
              </div>
              <div className="flex items-center justify-center">
                <TimerDisplay
                  status={status}
                  timeLeft={timeLeft}
                  currentLabel={currentPhase?.label}
                  nextLabel={nextPhase?.label}
                  onPause={pause}
                  onResume={resume}
                  onSkip={skip}
                  onReset={reset}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App

