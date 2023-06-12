import debounce from 'lodash/debounce'
import { TextInput, ActionList, Text } from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Wrapper, Container, Modal, SearchInputWrapper, ListDivider, EmptyResult } from './styles'
import { useAirportSearchStore } from '../../stores/airportSearchStore'
import { useNavigate } from 'react-router-dom';
import useOnclickOutside from "react-cool-onclickoutside";

export function SearchModal() {

  const navigate = useNavigate();
  const airportSearchStore = useAirportSearchStore();
  const {
    icaos,
    isLoadingICAOS,
    topSearchs,
    isLoadingTopSearchs,
    isOpen
  } = airportSearchStore;

  const inputQueryRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useOnclickOutside(() => {
    if (isOpen) {
      airportSearchStore.setIsOpen(false);
    }
  });

  const [query, setQuery] = useState<string>('');

  const searchResult = icaos.filter((icao) => query && query.length >= 3 ? icao.startsWith(query.toUpperCase()) : false);

  const changeQuery = useCallback(debounce((value: string) => setQuery(value),  500), []);

  function handleClickResult(airport: string) {
    navigate(`/app/airport/${airport.toLowerCase()}`);
    airportSearchStore.setIsOpen(false);
  }

  function handleQueryInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    changeQuery(value);
  }

  function handleClickWrapper(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (wrapperRef.current?.contains(event.currentTarget as Node)) {
      console.log("inner")

      return;
    }

    console.log("out")

    airportSearchStore.setIsOpen(false);
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
    if (isOpen) {
      inputQueryRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <Wrapper
        isOpen={isOpen}
      >
        <Container>
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
        </Container>
      </Wrapper>
    </>
  );
}