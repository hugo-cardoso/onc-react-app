import styled, { css } from 'styled-components'
import { themeGet } from '@primer/react'

export const Modal = styled.div`
  width: 100%;
  border: 1px solid ${themeGet('colors.border.muted')};
  border-radius: ${themeGet('radii.2')};
  background-color: ${themeGet('colors.canvas.default')};
  display: flex;
  color: ${themeGet('colors.fg.default')};
  flex-direction: column;
  z-index: 1002;
`;

export const ModalHeader = styled.div`
  width: 100%;
  padding: ${themeGet('space.3')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${themeGet('colors.border.muted')};
`;

export const ModalContainer = styled.div`
  width: 100%;
  padding: ${themeGet('space.3')};
  display: flex;
  flex-direction: column;
`;

export const ModalTabs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${themeGet('space.3')};
`;

export const AirportList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${themeGet('space.1')};
`;

export const ListItem = styled.a<{
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

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > svg {
    fill: ${({ active }) => active ? themeGet('colors.border.accent') : themeGet('colors.fg.muted')};
  }
`