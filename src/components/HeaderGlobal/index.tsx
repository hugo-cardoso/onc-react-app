import { useNavigate, useParams } from 'react-router-dom'
import { Header, Autocomplete, IconButton } from '@primer/react'
import { SearchIcon, SunIcon, MoonIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'react';
import { useThemeStore } from '../../stores/themeStore';
import { Theme } from '../../types';
import { useAirportStore } from '../../stores/airportStore';

import packageJson from "../../../package.json";

export function HeaderGlobal() {
  const { icao } = useParams()
  const [query, setQuery] = useState<string>(icao?.toLocaleUpperCase() || "");
  const navigate = useNavigate();
  const airportStore = useAirportStore();
  const themeStore = useThemeStore();

  const appVersion = packageJson.version;

  const handleKeyDownSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !query.trim().length) return

    if (airportStore.icaos.find(icao => icao.toLowerCase() === query.toLowerCase()) === undefined) return

    navigate(`/app/airport/${query.toLowerCase()}`)
  }

  const handleClickThemeButton = () => {
    themeStore.toggle();
  }

  useEffect(() => {
    const fetchAirportsICAO = async () => {
      airportStore.fetchAirportICAOS();
    };

    if (!airportStore.icaos.length) {
      fetchAirportsICAO();
    }

    return () => {}
  }, []);

  return (
    <Header>
      <Header.Item>
        <Header.Link sx={{fontSize: 3}} onClick={() => navigate("/")}>
          <span>Open Nav Charts</span>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <Autocomplete>
          <Autocomplete.Input
            trailingVisual={SearchIcon}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDownSearchInput}
            value={query}
            placeholder="Search ICAO"
            disabled={airportStore.isLoadingICAOS}
          />
          {
            query.trim().length >= 3 && (
              <Autocomplete.Overlay>
                <Autocomplete.Menu
                  loading={airportStore.isLoadingICAOS}
                  items={airportStore.icaos.map(icao => ({text: icao, id: icao}))}
                  selectionVariant="single"
                  onSelectedChange={(v: any) => {
                    setQuery(v.at(0).id);
                    navigate(`/app/airport/${v.at(0).id.toLowerCase()}`)
                  }}
                  selectedItemIds={[]}
                  aria-labelledby="autocompleteLabel-basic"
                />
              </Autocomplete.Overlay>
            )
          }
        </Autocomplete>
      </Header.Item>
      <Header.Item>
        <Header.Link onClick={() => navigate("/updates")}>Updates</Header.Link>
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