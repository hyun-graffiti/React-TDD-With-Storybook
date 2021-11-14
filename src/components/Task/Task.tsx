import { useCallback } from 'react'
import { css } from '@emotion/react'
import { AiFillStar, AiOutlineStar, AiOutlineCloseCircle } from 'react-icons/ai'

export type TaskType = {
  id: number
  text: string
  done: boolean
  pinned: boolean
}

export type TaskProps = {
  task: TaskType
  onToggle: (id: number) => void
  onPinned: (id: number) => void
  onRemove: (id: number) => void
}

export default function Task({
  task: { id, text, done, pinned },
  onToggle,
  onPinned,
  onRemove,
}: TaskProps) {
  const handleToggle = useCallback(() => onToggle(id), [])
  const handlePinned = useCallback(() => onPinned(id), [])
  const handleRemove = useCallback(() => onRemove(id), [])

  return (
    <div css={taskWrapper}>
      <div onClick={handleToggle} css={taskText(done)}>
        {text}
      </div>
      <div css={taskFuncWrapper}>
        <div onClick={handlePinned} css={taskFuncIcon} role="pin">
          {pinned ? <AiFillStar /> : <AiOutlineStar />}
        </div>
        <div onClick={handleRemove} css={taskFuncIcon} role="remove">
          <AiOutlineCloseCircle />
        </div>
      </div>
    </div>
  )
}

const taskWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #ffffff;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`

const taskText = (done: boolean) => css`
  text-decoration: ${done ? 'line-through' : 'none'};
  cursor: pointer;
`

const taskFuncWrapper = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

const taskFuncIcon = css`
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 1.2rem;
`
