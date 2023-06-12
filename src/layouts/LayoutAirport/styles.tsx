import styled, { css } from 'styled-components'

type LayoutProps = {
  isOpenSidebar: boolean;
}

export const LayoutAside = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  width: 350px;
  min-width: 350px;
  min-height: 100%;
  max-height: 100%;
  background-color: var(--color-canvas-default);
  border-right: 1px solid var(--color-border-muted);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100vw;
    min-width: 100vw;
    z-index: 1;
  }
`

export const LayoutMain = styled.main`
  flex: 1;
  overflow: hidden;
  padding-left: 350px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`

export const Layout = styled.div<LayoutProps>`
  width: 100%;
  display: flex;
  background-color: var(--color-canvas-inset);
  min-height: calc(100dvh - 64px);
  max-height: calc(100dvh - 64px);
  position: relative;

  ${props => !props.isOpenSidebar && css`
    ${LayoutAside} {
      left: -350px;

      @media (max-width: 768px) {
        left: -100vw;
      }
    }

    ${LayoutMain} {
      padding-left: 0;
    }
  `}
`