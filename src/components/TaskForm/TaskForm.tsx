import { ChangeEvent, useState, useCallback } from 'react'
import { css } from '@emotion/react'

type TaskFormProps = {
  onInsert: (value: string) => void
}

export default function TaskForm({ onInsert }: TaskFormProps) {
  const [value, setValue] = useState<string>('')

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [],
  )

  const onSubmit = useCallback(() => {
    onInsert(value)
    setValue('')
  }, [onInsert, value])

  return (
    <div css={wrapper}>
      <input
        css={taskInput}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="할 일을 입력하세요."
      />
      <button css={submitButton} onClick={onSubmit}>
        등록
      </button>
    </div>
  )
}

const wrapper = css`
  display: flex;
  align-items: stretch;
  padding: 20px;
  background: #ffffff;
`

const taskInput = css`
  flex: 1;
  padding: 0 10px;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  outline: none;
  transition: 0.3s border-color;

  &:focus {
    border-color: rgba(0, 0, 0, 0.7);
  }
`

const submitButton = css`
  margin-left: 10px;
  padding: 5px 10px;
  border: 0;
  border-radius: 5px;
  background: #3ac6d2;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s background;

  &:hover {
    background: #36b3bc;
  }

  &:active {
    background: #2fa2aa;
  }
`
