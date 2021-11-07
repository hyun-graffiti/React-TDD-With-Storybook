import { css } from '@emotion/react'

type TaskProps = {
  title: string
}

export default function Task({ title }: TaskProps) {
  return <div css={wrapperStyle}>{title}</div>
}

const wrapperStyle = css`
  font-size: 30px;
`
