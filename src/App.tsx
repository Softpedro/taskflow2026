
import { lazy, Profiler, Suspense, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { WorkspaceProvider } from './context/WorkspaceContext'
import { PatternsDemo } from './components/PatternsDemo/PatternsDemo'

const Stats = lazy(() => import('./components/Stats/Stats'))

function App() {
  const [showStats, setShowStats] = useState(false)
  const [showDemos, setShowDemos] = useState(false)

  return (
    <WorkspaceProvider>
      <div className='mx-auto max-w-md p-4'>
        <Header />

        <div className='mb-3 flex gap-2'>
          <button
            className='mb-3 rounded-md bg-gray-900 px-3 py-1 text-sm text-white'
            onClick={() => setShowStats(s => !s)}
          >
            {showStats ? 'Ocultar' : 'Ver'} estadisticas
          </button>
          <button
            className='mb-3 rounded-md bg-gray-900 px-3 py-1 text-sm text-white'
            onClick={() => setShowDemos(s => !s)}
          >
            {showDemos ? 'Ocultar' : ' Ver' } demos
          </button>
        </div>

        {
          showStats && (
            <Suspense fallback={<p>Cargando estadisticas</p>}>
              <Stats />
            </Suspense>
          )
        }

        {showDemos && <PatternsDemo />}

        <Profiler
          id='TaskList'
          onRender={(id, phase, actualDuration) => {
            console.log(`[Profiler] ${id} * ${phase} * ${actualDuration.toFixed(2)} ms`)
          }}
        >
          <TaskList />
        </Profiler>
      </div>
    </WorkspaceProvider>
  )
}

export default App
