import styled from 'styled-components'
import { themeGet } from '@primer/react'

export const Wrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${themeGet('space.3')};
  border-bottom: 1px solid var(--color-border-muted);
`

export const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`

export const ContentEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`