import { render, fireEvent } from '@testing-library/react'
import Task, { TaskProps } from '.'

describe('<Task />', () => {
  const sampleTask: TaskProps['task'] = {
    id: 1,
    text: 'TDD 배우기',
    done: false,
    pinned: false,
  }

  const setupTest = (task?: TaskProps['task']) => {
    const onToggle = jest.fn()
    const onPinned = jest.fn()
    const onRemove = jest.fn()

    const initialProps = {
      task: task || sampleTask,
      onToggle,
      onPinned,
      onRemove,
    }

    const { getByText, getByRole, ...utils } = render(
      <Task {...initialProps} />,
    )

    const text = getByText(initialProps.task.text)
    const pinButton = getByRole('pin')
    const removeButton = getByRole('remove')

    return {
      ...utils,
      getByRole,
      text,
      pinButton,
      removeButton,
      onToggle,
      onPinned,
      onRemove,
    }
  }

  it('has text and pin, remove button', () => {
    const { text, pinButton, removeButton } = setupTest(sampleTask)

    expect(text).toBeTruthy()
    expect(pinButton).toBeTruthy()
    expect(removeButton).toBeTruthy()
  })

  it('show line-through on text when done is true', () => {
    const { text } = setupTest({ ...sampleTask, done: true })
    expect(getComputedStyle(text).textDecoration).toBe('line-through')
  })

  it('does not show line-through on text when done is false', () => {
    const { text } = setupTest(sampleTask)
    expect(getComputedStyle(text).textDecoration).not.toBe('line-through')
  })

  it('show Filled Pin Button when pinned is true', () => {
    const { getByRole } = setupTest({ ...sampleTask, pinned: true })
    expect(getByRole('pinned')).toBeTruthy()
  })

  it('show Outlined Pin Button when pinned is false', () => {
    const { getByRole } = setupTest({ ...sampleTask })
    expect(getByRole('notPinned')).toBeTruthy()
  })

  it('calls onToggle', () => {
    const { text, onToggle } = setupTest(sampleTask)
    fireEvent.click(text)
    expect(onToggle).toBeCalledWith(sampleTask.id)
  })

  it('calls onPinned', () => {
    const { pinButton, onPinned } = setupTest(sampleTask)
    fireEvent.click(pinButton)
    expect(onPinned).toBeCalledWith(sampleTask.id)
  })

  it('calls onRemove', () => {
    const { removeButton, onRemove } = setupTest(sampleTask)
    fireEvent.click(removeButton)
    expect(onRemove).toBeCalledWith(sampleTask.id)
  })
})
