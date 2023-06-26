import { BaseModal } from "../BaseModal";
import { useAirportFavoritesStore } from "../../stores/airportFavoritesModal";
import { Modal, ModalHeader, ModalContainer, ModalTabs, AirportList, ListItem } from "./styles";
import { Heading, IconButton, SegmentedControl } from "@primer/react";
import { XIcon } from "@primer/octicons-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

enum tabViewEnum {
  AIRPORTS = 'AIRPORTS',
  CHARTS = 'CHARTS',
};

const tabs: {
  title: string;
  view: tabViewEnum;
  disabled?: boolean;
}[] = [
  {
    title: 'Airports',
    view: tabViewEnum.AIRPORTS,
  },
  {
    title: 'Charts',
    view: tabViewEnum.CHARTS,
    disabled: true,
  }
]

export const FavoritesModal = React.forwardRef<HTMLDivElement>((props, modalRef) => {
  const navigate = useNavigate();
  const modal = useModal();
  const airportFavoritesStore = useAirportFavoritesStore();
  const [activeIndexTab, setActiveIndexTab] = useState<number>(0);

  const handleClickAirport = (airport: string) => {
    modal.close();
    navigate(`/app/airport/${airport.toLowerCase()}`);
  };

  useEffect(() => {
    airportFavoritesStore.fetchAirports();
  }, []);

  return (
    <BaseModal
      isOpen={airportFavoritesStore.isOpen}
      onEscape={() => modal.close()}
      onClose={() => modal.close()}
    >
      <Modal ref={modalRef}>
        <ModalHeader>
          <Heading sx={{fontSize: 4}}>Favorites</Heading>
          <IconButton
            aria-label="Search"
            icon={XIcon}
            variant="invisible"
            onClick={() => modal.close()}
          />
        </ModalHeader>
        <ModalContainer>
          <ModalTabs>
            <SegmentedControl aria-labelledby="view-selector">
              {
                tabs.map((tab, index) => (
                  <SegmentedControl.Button
                    key={tab.title}
                    selected={activeIndexTab === index}
                    onClick={() => setActiveIndexTab(index)}
                    disabled={tab.disabled}
                  >{ tab.title }</SegmentedControl.Button>
                ))
              }
            </SegmentedControl>

            {
              tabs[activeIndexTab].view === tabViewEnum.AIRPORTS && (
                <AirportList>
                  {
                    !airportFavoritesStore.airports.length && (
                      <div className="blankslate">
                        <h3 className="blankslate-heading">No favorite airport</h3>
                      </div>
                    )
                  }
                  {
                    airportFavoritesStore.airports.map((airport) => (
                      <ListItem
                        key={airport}
                        href={`/app/airport/${airport.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClickAirport(airport);
                        }}
                      >
                        <span style={{
                          flex: 1,
                        }}>{airport.toUpperCase()}</span>
                      </ListItem>
                    ))
                  }
                </AirportList>
              )
            }
          </ModalTabs>
        </ModalContainer>
      </Modal>
    </BaseModal>
  );
});