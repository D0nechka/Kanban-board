'use server'

import { sleep, generateId } from "@/utils/index"
import { revalidatePath } from "next/cache"

export type TaskStatus  = 'backlog'|'in-progress'|'on-review'|'done'

export interface Task {
    id: string,
    title: string,
    description: string,
    status: TaskStatus
}

let tasks: Task[] = [
    {
        id:generateId(),
        title: 'create pet project',
        description: 'pls faster!',
        status: 'backlog'
    },
    {
        id:generateId(),
        title: 'edit project',
        description: 'Asap',
        status: 'backlog'
    },
    {
        id:generateId(),
        title: 'buy new phone',
        description: 'later',
        status: 'backlog'
    },
    {
        id:generateId(),
        title: 'wash ma ass',
        description: 'faf',
        status: 'in-progress'
    },
]

export async function getTasks() {
    await sleep(1_000)
    return tasks
}

export async function createTasks(data: Pick<Task,'title'|'description'>) {
    const newTask: Task = {
        ...data,
        id:generateId(),
        status: 'backlog'
    }
    tasks.push(newTask)
    await sleep(1_000)

    revalidatePath('')

    return newTask
}
 let updateTask: Task

export async function updateTasks(id: string, updateData: Partial<Omit<Task, 'id'>>) {
    tasks = tasks.map((task) => {
        if(task.id !== id) {
            return task
        }
        updateTask = {
            ...task,
            ...updateData
        }

        return updateTask
    })
    return updateTask!
}

export async function deleteTasks(id: string) {
    tasks = tasks.filter((task) => task.id !== id)
    await sleep(1_00)
}



