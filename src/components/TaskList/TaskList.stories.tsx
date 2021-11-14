import TaskList, { TaskListProps } from '.'
import { css } from '@emotion/react'
import { PartialStoryFn } from '@storybook/addons'

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [
    (story: PartialStoryFn<JSX.Element>) => (
      <div css={storyWrapper}>{story()}</div>
    ),
  ],
}

export function TaskFormStory() {
  const initialProps: TaskListProps = {
    taskList: [
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
    ],
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

  return <TaskList {...initialProps} />
}

const storyWrapper = css`
  width: 400px;
`
