import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Header, TextInput, IconButton } from '@primer/react'
import { SearchIcon, SunIcon, MoonIcon } from '@primer/octicons-react';
import { useThemeStore } from '../../stores/themeStore';
import { Theme } from '../../types';
import { useIsMobile } from '../../hooks/isMobile'
import { useModal, ModalTypeEnum } from '../../hooks/useModal'

import packageJson from "../../../package.json";

export function HeaderGlobal() {
  const navigate = useNavigate();
  const modal = useModal();
  const themeStore = useThemeStore();
  const { isMobile } = useIsMobile();

  const appVersion = packageJson.version;

  const handleClickThemeButton = () => {
    themeStore.toggle();
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        modal.open(ModalTypeEnum.AIRPORT_SEARCH);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Header>
      <Header.Item>
        <Header.Link sx={{fontSize: 3}} onClick={() => navigate("/")}>
          <span>{ isMobile ? 'ONC' : 'Open Nav Charts' }</span>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <TextInput
          trailingVisual={SearchIcon}
          placeholder="Type / to search"
          onClick={() => modal.open(ModalTypeEnum.AIRPORT_SEARCH)}
          readOnly
        />
      </Header.Item>
      <Header.Item>
        <Header.Link onClick={() => modal.open(ModalTypeEnum.AIRPORT_FAVORITES)}>Favorites</Header.Link>
      </Header.Item>
      <Header.Item full>
        <Header.Link onClick={() => navigate("/about")}>About</Header.Link>
      </Header.Item>
      <Header.Item>
        v{appVersion}
      </Header.Item>
      <Header.Item sx={{marginRight: 0}}>
        <IconButton
          variant="invisible"
          aria-label="Theme"
          icon={themeStore.theme === Theme.DARK ? SunIcon : MoonIcon}
          onClick={() => handleClickThemeButton()}
        />
      </Header.Item>
    </Header>
  );
};