import { css, Global } from '@emotion/react'
import TaskForm from './components/TaskForm'

export default function App() {
  const onInsert = (value: string) => console.log(value)

  return (
    <div css={wrapper}>
      <Global styles={GlobalStyle} />
      <TaskForm onInsert={onInsert} />
    </div>
  )
}

export const GlobalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  html,
  body,
  #root {
    height: 100%;
    background: #26c6da;
  }
`

const wrapper = css``
