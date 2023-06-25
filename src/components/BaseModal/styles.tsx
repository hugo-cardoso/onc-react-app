import styled, { css } from "styled-components";
import { themeGet } from "@primer/react";

export const Wrapper = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;

  ${({ isOpen }) => !isOpen && css`
    display: none;
  `}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 768px;
  padding: ${themeGet('space.3')};
  box-sizing: border-box;
`;