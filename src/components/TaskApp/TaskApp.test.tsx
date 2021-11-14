import { render, fireEvent } from '@testing-library/react'
import TaskApp from '.'

describe('<TaskApp />', () => {
  it('renders TaskForm and TaskList', () => {
    const { getByText, getByTestId } = render(<TaskApp />)

    expect(getByText('등록')).toBeTruthy()
    expect(getByTestId('task-list')).toBeTruthy()
  })

  it('renders two defaults tasks', () => {
    const { getByText } = render(<TaskApp />)

    expect(getByText('TDD 배우기')).toBeTruthy()
    expect(getByText('Testing Library 사용하기')).toBeTruthy()
  })

  it('creates new task', () => {
    const { getByPlaceholderText, getByText } = render(<TaskApp />)
    const NEW_TASK_TEXT = '새 항목 입력'

    fireEvent.change(getByPlaceholderText('할 일을 입력하세요.'), {
      target: {
        value: NEW_TASK_TEXT,
      },
    })
    fireEvent.click(getByText('등록'))

    expect(getByText(NEW_TASK_TEXT)).toBeTruthy()
  })

  it('toggles task', () => {
    const { getByText } = render(<TaskApp />)
    const TOGGLE_TEXT_ELEMENT = getByText('TDD 배우기')

    expect(getComputedStyle(TOGGLE_TEXT_ELEMENT).textDecoration).not.toBe(
      'line-through',
    )
    fireEvent.click(TOGGLE_TEXT_ELEMENT)
    expect(getComputedStyle(TOGGLE_TEXT_ELEMENT).textDecoration).toBe(
      'line-through',
    )
    fireEvent.click(TOGGLE_TEXT_ELEMENT)
    expect(getComputedStyle(TOGGLE_TEXT_ELEMENT).textDecoration).not.toBe(
      'line-through',
    )
  })

  it('pins task', () => {
    const { getAllByRole } = render(<TaskApp />)
    const PIN_ELEMENT = getAllByRole('pin')[0]

    expect(PIN_ELEMENT.querySelector('[role="notPinned"]')).toBeTruthy()
    fireEvent.click(PIN_ELEMENT)
    expect(PIN_ELEMENT.querySelector('[role="pinned"]')).toBeTruthy()
    fireEvent.click(PIN_ELEMENT)
    expect(PIN_ELEMENT.querySelector('[role="notPinned"]')).toBeTruthy()
  })

  it('removes task', () => {
    const { getByText } = render(<TaskApp />)
    const TASK_TEXT_ELEMENT = getByText('TDD 배우기')
    const removeButton =
      TASK_TEXT_ELEMENT.nextElementSibling?.querySelector('[role="remove"]')

    if (!removeButton) {
      expect(false).toBe('Remove Button is Undefined')
      return
    }

    fireEvent.click(removeButton)
    expect(TASK_TEXT_ELEMENT).not.toBeInTheDocument()
  })
})
