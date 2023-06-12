import { useNavigate } from 'react-router-dom'
import { Header, Autocomplete, IconButton } from '@primer/react'
import { SearchIcon, SunIcon, MoonIcon } from '@primer/octicons-react';
import { useThemeStore } from '../../stores/themeStore';
import { Theme } from '../../types';
import { useAirportSearchStore } from '../../stores/airportSearchStore';
import { useIsMobile } from '../../hooks/isMobile'

import packageJson from "../../../package.json";

export function HeaderGlobal() {
  const navigate = useNavigate();
  const airportSearchStore = useAirportSearchStore();
  const themeStore = useThemeStore();
  const { isMobile } = useIsMobile();

  const appVersion = packageJson.version;

  const handleClickThemeButton = () => {
    themeStore.toggle();
  }

  return (
    <Header>
      <Header.Item>
        <Header.Link sx={{fontSize: 3}} onClick={() => navigate("/")}>
          <span>{ isMobile ? 'ONC' : 'Open Nav Charts' }</span>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <Autocomplete>
          <Autocomplete.Input
            trailingVisual={SearchIcon}
            placeholder="Search ICAO"
            onClick={() => airportSearchStore.setIsOpen(true)}
            readOnly
          />
        </Autocomplete>
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