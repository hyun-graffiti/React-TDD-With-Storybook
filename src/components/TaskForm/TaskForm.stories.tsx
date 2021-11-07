import TaskForm from '.'
import { css } from '@emotion/react'
import { PartialStoryFn } from '@storybook/addons'

export default {
  component: TaskForm,
  title: 'TaskForm',
  decorators: [
    (story: PartialStoryFn<JSX.Element>) => (
      <div css={storyWrapper}>{story()}</div>
    ),
  ],
}

export function TaskFormStory() {
  const onInsert = (value: string) => console.log(value)

  return <TaskForm onInsert={onInsert} />
}

const storyWrapper = css`
  width: 400px;
`
