import {KanbanBoard} from '@/components/KanbanBoard/KanbanBoard'
import { AddTask } from '@/components/AddTask/AddTask'
import { getTasks } from '@/server-actions/tasks'
import '@/styles/globals.scss'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className='pageWrapper'>
      <header className='headerWrapper'>
        <div>Kanban Board</div>
        <AddTask>
          <button>add task</button>
        </AddTask>
      </header>

      <main className='mainWrapper'>
        <Suspense fallback={<div>Loading...</div>}>
        <KanbanBoard/>
        </Suspense>
      </main>
    </div>
  )
}
