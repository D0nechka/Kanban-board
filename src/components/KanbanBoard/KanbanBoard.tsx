import { Task, TaskStatus, getTasks } from '@/server-actions/tasks'
import './kanbanBoard.scss'

const columns: {title: string, status:TaskStatus}[] = [
    {
        title:'Backlog',
        status: 'backlog'
    },
    {
        title:'In-progress',
        status: 'in-progress'
    },{
        title:'On-review',
        status: 'on-review'
    },
    {
        title:'Done',
        status: 'done'
    },
]

export async function KanbanBoard() {
const tasks = await getTasks()

const statusToTasksMap = tasks.reduce((acc: Record<string, Task[]>, task) => {
    const tasks = acc[task.status] ?? []
    tasks.push(task)
    acc[task.status] = tasks
    return acc
},{})

 return (
     <div className='kanbanWrapper'>
    {columns.map(column =>{
        const tasksForColumn = statusToTasksMap[column.status]
        return(
            <div key={column.status} className='taskblockWrapper'>
                <h3>{column.title}</h3>
                <div className='taskblock'>
                    {tasksForColumn?.map((task) => (
                        <div className='card' key={task.id}>{task.title}</div>
                    ))}
                </div>
          </div> 
        )
        })}
 </div>
 )
}