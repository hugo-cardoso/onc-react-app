import { SegmentedControl, Box, TextInput, Spinner, Heading, IconButton, Button } from '@primer/react'
import { PageHeader } from '@primer/react/drafts'
import { SidebarExpandIcon, StarIcon } from '@primer/octicons-react'
import { useParams } from 'react-router-dom'

import { AirportPageAsideCharts } from '../AirportPageAsideCharts'
import { AirportPageAsideInfo } from '../AirportPageAsideInfo'

import * as Styles from './styles'
import { Airport, AirportViewEnum } from '../../types'
import { useState } from 'react'
import { useAirportLayoutStore } from '../../stores/airportLayoutStore'

type AirportPageAsideProps = {
  isLoading: boolean;
  airport?: Airport;
}

export const AirportPageAside = (props: AirportPageAsideProps) => {
  const { icao, chartId } = useParams()
  const [view, setView] = useState(chartId ? AirportViewEnum.CHARTS : AirportViewEnum.INFO)

  const airportLayoutStore = useAirportLayoutStore()

  if (props.isLoading) return (
    <Styles.LoadingContainer>
      <Spinner />
    </Styles.LoadingContainer>
  )

  return (
    <Box padding={3} sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'hidden',
      flex: 1
    }}>
      <Styles.Header>
        <PageHeader>
          <PageHeader.TitleArea>
            {
              chartId && (
                <PageHeader.LeadingAction>
                  <IconButton
                    aria-label="Expand"
                    icon={SidebarExpandIcon}
                    variant="invisible"
                    onClick={() => airportLayoutStore.changeSidebar(false)}
                  />
                </PageHeader.LeadingAction>
              )
            }
            <PageHeader.Title>{icao?.toUpperCase()}</PageHeader.Title>
            <PageHeader.Actions>
              <IconButton aria-label="Workflows" icon={StarIcon}/>
            </PageHeader.Actions>
          </PageHeader.TitleArea>
        </PageHeader>
      </Styles.Header>
      <SegmentedControl
        fullWidth
        size="small"
        sx={{
          minHeight: '28px'
        }}
        aria-label='view control'
      >
        {
          Object.values(AirportViewEnum).map(item => (
            <SegmentedControl.Button
              onClick={() => setView(item)}
              defaultSelected={view === item}
              key={item}
            >{item}</SegmentedControl.Button>
          ))
        }
      </SegmentedControl>
      <hr />
      {
        view === AirportViewEnum.INFO && <AirportPageAsideInfo />
      }
      {
        view === AirportViewEnum.CHARTS && <AirportPageAsideCharts airport={props.airport!}/>
      }
    </Box>
  )
}