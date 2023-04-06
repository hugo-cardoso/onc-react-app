import styled from 'styled-components'
import { themeGet } from '@primer/react'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  width: 100%;
  padding: ${themeGet('space.3')};
  background-color: var(--color-canvas-default);
  border-bottom: 1px solid var(--color-border-muted);
`

export const ChartContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const Chart = styled.div<{
  vCenter?: boolean;
  hCenter?: boolean;
}>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: ${({ hCenter }) => hCenter ? 'center' : 'flex-start'};
  align-items: ${({ vCenter }) => vCenter ? 'center' : 'flex-start'};
  overflow: auto;

  & .react-pdf__Page__canvas {
    border-width: 1px;
    border-top-width: 0;
    border-style: solid;
    border-color: var(--color-border-muted);
  }

  /* &::-webkit-scrollbar {
    width: 0;
  } */
`