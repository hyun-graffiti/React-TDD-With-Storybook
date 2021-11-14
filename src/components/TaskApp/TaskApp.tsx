import { useCallback, useState, useRef } from 'react'
import { css } from '@emotion/react'
import TaskForm from '../TaskForm'
import TaskList from '../TaskList'
import { TaskType } from '../Task'
import produce from 'immer'

export default function TaskApp() {
  const [taskList, setTaskList] = useState<TaskType[]>([
    {
      id: 1,
      text: 'TDD 배우기',
      pinned: false,
      done: false,
    },
    {
      id: 2,
      text: 'Testing Library 사용하기',
      pinned: false,
      done: false,
    },
  ])
  const nextId = useRef<number>(3)

  const onInsert = useCallback(
    (text: string) => {
      setTaskList(prev => [
        ...prev,
        {
          id: nextId.current,
          text,
          pinned: false,
          done: false,
        },
      ])
      nextId.current++
    },
    [taskList],
  )

  const onToggle = useCallback(
    (id: number) =>
      setTaskList(prev =>
        produce(prev, draft => {
          const task = draft.find(task => task.id === id)
          if (task !== undefined) task.done = !task.done
          return draft
        }),
      ),
    [],
  )

  const onPinned = useCallback(
    (id: number) =>
      setTaskList(prev =>
        produce(prev, draft => {
          const task = draft.find(task => task.id === id)
          if (task !== undefined) task.pinned = !task.pinned
          return draft
        }),
      ),
    [],
  )

  const onRemove = useCallback(
    (id: number) => setTaskList(prev => prev.filter(task => task.id !== id)),
    [],
  )

  return (
    <div css={wrapper}>
      <TaskForm onInsert={onInsert} />
      <TaskList
        taskList={taskList}
        onToggle={onToggle}
        onPinned={onPinned}
        onRemove={onRemove}
      />
    </div>
  )
}

const wrapper = css`
  width: 400px;
`
