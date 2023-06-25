import styled from "styled-components";
import { themeGet } from "@primer/react";

export const Modal = styled.div`
  width: 100%;
  border: 1px solid ${themeGet('colors.border.muted')};
  border-radius: ${themeGet('radii.2')};
  background-color: ${themeGet('colors.canvas.default')};
  display: flex;
  color: ${themeGet('colors.fg.default')};
  flex-direction: column;
  z-index: 1001;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${themeGet('space.3')};
`;

export const ListDivider = styled.div`
  display: block;
  border-bottom: 1px solid ${themeGet('colors.border.muted')};
`;

export const EmptyResult = styled.div`
  width: 100%;
  padding: ${themeGet('space.3')};
  display: flex;
`;