import debounce from 'lodash/debounce'
import { TextInput, ActionList, Text } from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Modal, SearchInputWrapper, ListDivider, EmptyResult } from './styles'
import { useAirportSearchStore } from '../../stores/airportSearchStore'
import { useNavigate } from 'react-router-dom';
import useOnclickOutside from "react-cool-onclickoutside";
import { BaseModal } from "../BaseModal";
import { useModal, ModalTypeEnum } from "../../hooks/useModal";

export function SearchModal() {

  const navigate = useNavigate();
  const modal = useModal();
  const airportSearchStore = useAirportSearchStore();
  const {
    icaos,
    isLoadingICAOS,
    topSearchs,
    isLoadingTopSearchs,
    isOpen
  } = airportSearchStore;

  const inputQueryRef = useRef<HTMLInputElement>(null);
  const modalRef = useOnclickOutside(() => {
    if (isOpen) modal.close();
  });

  const [query, setQuery] = useState<string>('');

  const searchResult = icaos.filter((icao) => query && query.length >= 3 ? icao.startsWith(query.toUpperCase()) : false);

  const changeQuery = useCallback(debounce((value: string) => setQuery(value),  500), []);

  function handleClickResult(airport: string) {
    modal.close();
    navigate(`/app/airport/${airport.toLowerCase()}`);
  }

  function handleQueryInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    changeQuery(value);
  }

  useEffect(() => {
    const getTopSearchs = async () => {
      await airportSearchStore.fetchTopSearchs();
    };

    const getIcaos = async () => {
      await airportSearchStore.fetchICAOS();
    };

    if (!airportSearchStore.topSearchs.length) {
      getTopSearchs();
    }

    if (!airportSearchStore.icaos.length) {
      getIcaos();
    }

    return () => {};
  }, []);

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

  useEffect(() => {
    if (isOpen) {
      inputQueryRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onEscape={() => modal.close()}
      >
        <Modal ref={modalRef}>
          <SearchInputWrapper>
            <TextInput
              ref={inputQueryRef}
              size='large'
              sx={{
                width: '100%',
              }}
              placeholder='Search by ICAO'
              trailingAction={
                query.length ? (
                  <TextInput.Action
                    onClick={() => {
                      setQuery('');
                      inputQueryRef.current!.value = '';
                    }}
                    icon={XIcon}
                    aria-label="Clear input"
                    sx={{color: 'fg.subtle'}}
                  />
                ) : undefined
              }
              onChange={handleQueryInputChange}
              loading={isLoadingICAOS || isLoadingTopSearchs}
              disabled={isLoadingICAOS || isLoadingTopSearchs}
              contrast
            />
          </SearchInputWrapper>
          {
            searchResult.length > 0 && (
              <>
                <ListDivider />
                <ActionList>
                  <ActionList.Group title="Results">
                    {
                      [...searchResult].slice(0, 8).map((airport) => (
                        <ActionList.Item
                          key={airport}
                          onClick={() => handleClickResult(airport)}
                        >
                          { airport }
                        </ActionList.Item>
                      ))
                    }
                  </ActionList.Group>
                </ActionList>
              </>
            )
          }
          {
            !searchResult.length && query.length >= 3 && (
              <>
                <ListDivider />
                <EmptyResult>
                  <Text>No results found</Text>
                </EmptyResult>
              </>
            )
          }
          {
            topSearchs.length > 0 && (
              <>
                <ListDivider />
                <ActionList>
                  <ActionList.Group title="Top Searched">
                    {
                      topSearchs.map((airport) => (
                        <ActionList.Item
                          key={airport}
                          onClick={() => handleClickResult(airport)}
                        >
                          { airport }
                        </ActionList.Item>
                      ))
                    }
                  </ActionList.Group>
                </ActionList>
              </>
            )
          }
        </Modal>
      </BaseModal>
    </>
  );
}