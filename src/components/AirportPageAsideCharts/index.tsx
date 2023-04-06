import { SearchIcon } from '@primer/octicons-react'
import { SegmentedControl, Box, TextInput, Text, FilteredSearch, ActionMenu, ActionList } from '@primer/react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Airport, ChartTypeEnum } from '../../types'

import { AirportPageAsideChartsItem } from '../AirportPageAsideChartsItem'

import * as Styles from './styles'

type AirportPageAsideChartsProps = {
  airport: Airport;
}

const tabItems: ChartTypeEnum[] = [
  ChartTypeEnum.STAR,
  ChartTypeEnum.IAC,
  ChartTypeEnum.TAXI,
  ChartTypeEnum.SID,
];

export function AirportPageAsideCharts(props: AirportPageAsideChartsProps) {
  const { chartId } = useParams()
  const chart = props.airport.charts.find(chart => chart.id === chartId);
  const [tab, setTab] = useState(chart ? chart.type : ChartTypeEnum.STAR);
  const [query, setQuery] = useState<string>('');
  const [rwy, setRwy] = useState<string>('ALL');
  const [isOpenRwyFilter, setIsOpenRwyFilter] = useState<boolean>(false);

  const charts = props.airport.charts.filter(chart => {
    if (chart.type !== tab) return false;

    return chart.name.toLowerCase().includes(query.trim().toLowerCase()) && (rwy === 'ALL' || chart.name.includes(rwy));
  });

  useEffect(() => {
    setQuery("");
    setRwy("ALL");

    return () => {}
  }, [tab]);

  useEffect(() => {
    setIsOpenRwyFilter(false)
  }, [rwy]);

  useEffect(() => {
    if (chart) setTab(chart.type);

    return () => {}
  }, []);

  return (
    <Styles.Wrapper>
      <Styles.Header>
        <SegmentedControl fullWidth aria-label="File view" size="small">
          {
            tabItems.map(item => (
              <SegmentedControl.Button
                defaultSelected={tab === item}
                onClick={() => setTab(item)}
                key={item}
              >{item}</SegmentedControl.Button>
            ))
          }
        </SegmentedControl>
        <Box marginTop={3}>
          <FilteredSearch>
            <ActionMenu open={isOpenRwyFilter} onOpenChange={status => setIsOpenRwyFilter(status)}>
              <ActionMenu.Button as="summary">{ rwy === 'ALL' ? 'RWY' : rwy }</ActionMenu.Button>
              <ActionMenu.Overlay>
                <ActionList selectionVariant="single">
                  <ActionList.Item
                    selected={rwy === 'ALL'}
                    onClick={() => setRwy('ALL')}
                  >ALL</ActionList.Item>
                  {
                    props.airport.runways.map((runway) => runway.headboards).flat(1).map((runway) => (
                      <ActionList.Item
                        key={runway}
                        selected={rwy === runway}
                        onClick={() => setRwy(runway)}
                      >{runway}</ActionList.Item>
                    ))
                  }
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
            <TextInput
              placeholder="Filter"
              onChange={e => setQuery(e.target.value)}
              trailingVisual={SearchIcon}
              contrast
              block
            />
          </FilteredSearch>
        </Box>
      </Styles.Header>
      <Styles.Content>
        <>
          {
            charts.length ? (
              charts.map((chart) => <AirportPageAsideChartsItem key={chart.id} chart={chart}/>)
            ) : (
              <Styles.ContentEmpty>
                <Text>No charts found</Text>
              </Styles.ContentEmpty>
            )
          }
        </>
      </Styles.Content>
    </Styles.Wrapper>
  )
}