import { render, fireEvent } from '@testing-library/react'
import TaskList from '.'
import { TaskType } from '../Task'

describe('<TaskList />', () => {
  const sampleTaskList: TaskType[] = [
    {
      id: 1,
      text: 'TDD 배우기',
      done: true,
      pinned: false,
    },
    {
      id: 2,
      text: 'Testing-Library 사용하기',
      done: false,
      pinned: true,
    },
  ]

  const setupTest = (taskList?: TaskType[]) => {
    const onToggle = jest.fn()
    const onPinned = jest.fn()
    const onRemove = jest.fn()

    const initialProps = {
      taskList: taskList || sampleTaskList,
      onToggle,
      onPinned,
      onRemove,
    }

    const utils = render(<TaskList {...initialProps} />)

    return { ...utils, onToggle, onPinned, onRemove }
  }

  it('renders tasks properly', () => {
    const { getByText } = setupTest(sampleTaskList)

    expect(getByText(sampleTaskList[0].text)).toBeTruthy()
    expect(getByText(sampleTaskList[1].text)).toBeTruthy()
  })

  it('calls onToggle, onPinned and onRemove', () => {
    const { getByText, getAllByRole, onToggle, onPinned, onRemove } =
      setupTest(sampleTaskList)

    fireEvent.click(getByText(sampleTaskList[0].text))
    expect(onToggle).toBeCalledWith(sampleTaskList[0].id)

    fireEvent.click(getAllByRole('pin')[0])
    expect(onPinned).toBeCalledWith(sampleTaskList[0].id)

    fireEvent.click(getAllByRole('remove')[0])
    expect(onRemove).toBeCalledWith(sampleTaskList[0].id)
  })
})
