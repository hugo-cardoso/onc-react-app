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
`

export const LayoutMain = styled.main`
  flex: 1;
  overflow: hidden;
  padding-left: 350px;
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
    }

    ${LayoutMain} {
      padding-left: 0;
    }
  `}
`