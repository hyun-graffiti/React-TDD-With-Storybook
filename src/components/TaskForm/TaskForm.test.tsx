import { render, fireEvent } from '@testing-library/react'
import TaskForm from '.'

describe('<TaskForm />', () => {
  const setupTest = () => {
    const onInsert = jest.fn()

    const { getByText, getByPlaceholderText, ...utils } = render(
      <TaskForm onInsert={onInsert} />,
    )

    const input = getByPlaceholderText(
      '할 일을 입력하세요.',
    ) as HTMLInputElement
    const button = getByText('등록')

    return { ...utils, input, button, onInsert }
  }

  it('has input and a button', () => {
    const { input, button } = setupTest()

    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it('changes input', () => {
    const { input } = setupTest()

    fireEvent.change(input, {
      target: { value: 'TDD 배우기' },
    })

    expect(input.value).toBe('TDD 배우기')
  })

  it('calls onInsert and clears input', () => {
    const { input, button, onInsert } = setupTest()

    fireEvent.change(input, {
      target: { value: 'TDD 배우기' },
    })
    fireEvent.click(button)

    expect(onInsert).toBeCalledWith('TDD 배우기')
    expect(input.value).toBe('')
  })
})
