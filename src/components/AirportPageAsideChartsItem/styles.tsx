import styled, { css } from 'styled-components'
import { themeGet } from '@primer/react'

export const ChartItem = styled.a<{
  active?: boolean;
}>`
  width: 100%;
  padding: ${themeGet('space.3')};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ active }) => active ? themeGet('colors.border.accent') : themeGet('colors.border.muted')};
  margin-top: ${themeGet('space.2')};
  border-radius: ${themeGet('radii.2')};
  font-size: ${themeGet('fontSizes.0')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${themeGet('colors.fg.default')};

  &:first-child {
    margin-top: ${themeGet('space.3')};
  }

  &:hover {
    border: 1px solid ${themeGet('colors.border.accent')};
    text-decoration: none;
  }

  & > svg {
    fill: ${({ active }) => active ? themeGet('colors.border.accent') : themeGet('colors.fg.muted')};
  }
`