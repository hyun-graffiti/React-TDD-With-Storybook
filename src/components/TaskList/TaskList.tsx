import Task, { TaskType } from '../Task'

export type TaskListProps = {
  taskList: TaskType[]
  onToggle: (id: number) => void
  onPinned: (id: number) => void
  onRemove: (id: number) => void
}

export default function TaskList({
  taskList,
  onToggle,
  onPinned,
  onRemove,
}: TaskListProps) {
  return (
    <div>
      {taskList.map((task: TaskType) => (
        <Task
          task={task}
          onToggle={onToggle}
          onPinned={onPinned}
          onRemove={onRemove}
          key={task.id}
        />
      ))}
    </div>
  )
}
