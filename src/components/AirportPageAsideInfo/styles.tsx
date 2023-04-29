import styled from 'styled-components'
import { themeGet } from '@primer/react'

export const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeGet('space.3')};
`

export const InfoBoxActionContent= styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${themeGet('space.2')};
`