import { themeGet } from '@primer/react'
import styled from 'styled-components'

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const Header = styled.div`
  width: 100%;
  padding-bottom: ${themeGet('space.3')};
  margin-bottom: ${themeGet('space.3')};
  border-bottom: 1px solid var(--color-border-muted);
`