import { themeGet } from "@primer/react";
import styled from "styled-components";

export const DonationCards = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  gap: ${themeGet('space.3')};

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const DonationCard = styled.a`
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