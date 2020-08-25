import React, { FC, useEffect, useRef } from 'react'
import styled, { ThemeProvider, css } from 'styled-components'

import { useTheme } from '../../hooks/useTheme'
import { ResetButton } from './ResetButton'

type Props = {
  selectedYear?: number
  fromYear: number
  toYear: number
  onSelectYear: (year: number) => void
}

export const YearPicker: FC<Props> = ({ selectedYear, fromYear, toYear, onSelectYear }) => {
  const theme = useTheme()
  const focusingRef = useRef<HTMLButtonElement>(null)

  const thisYear = new Date().getFullYear()
  const numOfYear = Math.max(Math.min(toYear, 9999) - fromYear + 1, 0)
  const yearArray = Array(numOfYear)
    .fill(null)
    .map((_, i) => fromYear + i)

  useEffect(() => {
    if (focusingRef.current) {
      focusingRef.current.focus()
      focusingRef.current.blur()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {yearArray.map((year) => {
          const isThisYear = thisYear === year
          const isSelectedYear = selectedYear === year
          return (
            <YearButton
              key={year}
              onClick={() => onSelectYear(year)}
              aria-pressed={isSelectedYear}
              ref={isThisYear ? focusingRef : null}
            >
              <YearWrapper isThisYear={isThisYear} isSelected={isSelectedYear}>
                {year}
              </YearWrapper>
            </YearButton>
          )
        })}
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 8px 3px;
  box-sizing: border-box;
  overflow-y: scroll;
`
const YearWrapper = styled.div<{ isThisYear?: boolean; isSelected?: boolean }>(
  ({ theme, isThisYear, isSelected }) => {
    const { palette, size } = theme
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 51px;
      height: 27px;
      border-radius: 14px;
      font-size: ${size.pxToRem(size.font.TALL)};
      box-sizing: border-box;
      line-height: 0;
      ${isThisYear &&
      css`
        border: solid 1px ${palette.BORDER};
      `};
      ${isSelected &&
      css`
        color: #fff !important;
        background-color: ${palette.MAIN} !important;
      `}
    `
  },
)
const YearButton = styled(ResetButton)`
  width: 25%;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    ${YearWrapper} {
      color: ${(props) => props.theme.palette.TEXT_BLACK};
      background-color: #f5f5f5;
    }
  }
`
