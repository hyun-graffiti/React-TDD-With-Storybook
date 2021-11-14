import Task, { TaskProps } from '.'
import { css } from '@emotion/react'
import { PartialStoryFn } from '@storybook/addons'

export default {
  component: Task,
  title: 'Task',
  decorators: [
    (story: PartialStoryFn<JSX.Element>) => (
      <div css={storyWrapper}>{story()}</div>
    ),
  ],
}

export function TaskFormStory() {
  const initialProps: TaskProps = {
    task: {
      id: 1,
      text: 'TDD 배우기',
      done: true,
      pinned: false,
    },
    onToggle(id: number) {
      console.log(id)
    },
    onPinned(id: number) {
      console.log(id)
    },
    onRemove(id: number) {
      console.log(id)
    },
  }

  return <Task {...initialProps} />
}

const storyWrapper = css`
  width: 400px;
`
