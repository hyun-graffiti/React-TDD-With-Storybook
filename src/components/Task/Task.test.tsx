import { render, fireEvent } from '@testing-library/react'
import Task, { TaskProps } from './Task'

describe('<Task />', () => {
  const sampleTodo: TaskProps['todo'] = {
    id: 1,
    text: 'TDD 배우기',
    done: false,
    pinned: false,
  }

  const setupTest = (todo?: TaskProps['todo']) => {
    const onToggle = jest.fn()
    const onPinned = jest.fn()
    const onRemove = jest.fn()

    const initialProps = {
      todo: todo || sampleTodo,
      onToggle,
      onPinned,
      onRemove,
    }

    const { getByText, getByRole, ...utils } = render(
      <Task {...initialProps} />,
    )

    const text = getByText(initialProps.todo.text)
    const pinButton = getByRole('pin')
    const removeButton = getByRole('remove')

    return {
      ...utils,
      text,
      pinButton,
      removeButton,
      onToggle,
      onPinned,
      onRemove,
    }
  }

  it('has text and pin, remove button', () => {
    const { text, pinButton, removeButton } = setupTest(sampleTodo)

    expect(text).toBeTruthy()
    expect(pinButton).toBeTruthy()
    expect(removeButton).toBeTruthy()
  })

  it('show line-through on text when done is true', () => {
    const { text } = setupTest({ ...sampleTodo, done: true })
    expect(getComputedStyle(text).textDecoration).toBe('line-through')
  })

  it('does not show line-through on text when done is false', () => {
    const { text } = setupTest(sampleTodo)
    expect(getComputedStyle(text).textDecoration).not.toBe('line-through')
  })

  it('calls onToggle', () => {
    const { text, onToggle } = setupTest(sampleTodo)
    fireEvent.click(text)
    expect(onToggle).toBeCalledWith(sampleTodo.id)
  })

  it('calls onFinned', () => {
    const { pinButton, onPinned } = setupTest(sampleTodo)
    fireEvent.click(pinButton)
    expect(onPinned).toBeCalledWith(sampleTodo.id)
  })

  it('calls onRemove', () => {
    const { removeButton, onRemove } = setupTest(sampleTodo)
    fireEvent.click(removeButton)
    expect(onRemove).toBeCalledWith(sampleTodo.id)
  })
})
