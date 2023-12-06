'use client'

import { cloneElement, useState } from "react"
import { Portal } from "../Portal/Portal"
import './AddTask.scss'
import { createTasks } from "@/server-actions/tasks"

interface AddTaskProps {
    children: React.ReactElement
}

export function AddTask({children}: AddTaskProps) {
   const [isOpened, setIsOpened] = useState(false)
    
   const handleClick = () => {
    setIsOpened(true)
   }

   const handleClose = () => {
    setIsOpened(false)
   }

   return <>
        {cloneElement(children,{onClick: handleClick })}
        {isOpened && <AddTaskModal onClose={handleClose}/>}
    </>
    
    function AddTaskModal({onClose}: {onClose: () => void}) {
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            createTasks({title, description})
            setTitle('')
            setDescription('')
            onClose()
        }

        return <Portal>
            <div className="modalWrapper">
                <div className="background" onClick={onClose}></div>
                <div className="modal">
                    <form onSubmit={handleSubmit} className="form">
                    <h3>Create Task</h3>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}/>
                    <button>Create</button>
                    </form>
                </div>
            </div>
        </Portal>
    }
}
