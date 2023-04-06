import styled from 'styled-components'
import { themeGet } from '@primer/react'

export const Container = styled.div`
  width: 100%;
  padding: ${themeGet('space.3')};
  background-color: ${themeGet('colors.canvas.inset')};
  min-height: calc(100dvh - 64px);
`

export const Hero = styled.div`
  width: 100%;
  height: 300px;
  padding: ${themeGet('space.3')};
  margin-bottom: ${themeGet('space.3')};
  border: 1px solid ${themeGet('colors.border.muted')};
  border-radius: ${themeGet('radii.2')};
  background-color: ${themeGet('colors.canvas.default')};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SupportContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${themeGet('space.3')};
  text-align: center;
`;

export const SupportCards = styled.div`
  width: 650px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  gap: ${themeGet('space.3')};

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SupportCard = styled.a`
  width: 100%;
  border: 1px solid ${themeGet('colors.border.muted')};
  border-radius: ${themeGet('radii.2')};
  background-color: ${themeGet('colors.canvas.default')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themeGet('colors.fg.default')};

  &:hover {
    border-color: ${themeGet('colors.border.default')};
    text-decoration: none;
    cursor: pointer;
  }
`;