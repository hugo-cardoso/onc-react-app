import { SegmentedControl, Box, TextInput, Spinner, Heading, IconButton, Button } from '@primer/react'
import { PageHeader } from '@primer/react/drafts'
import { StarIcon } from '@primer/octicons-react'
import { useParams } from 'react-router-dom'

import { AirportPageAsideCharts } from '../AirportPageAsideCharts'
import { AirportPageAsideInfo } from '../AirportPageAsideInfo'

import * as Styles from './styles'
import { Airport, AirportViewEnum } from '../../types'
import { useState } from 'react'

type AirportPageAsideProps = {
  isLoading: boolean;
  airport?: Airport;
}

export const AirportPageAside = (props: AirportPageAsideProps) => {
  const { icao, chartId } = useParams()
  const [view, setView] = useState(chartId ? AirportViewEnum.CHARTS : AirportViewEnum.INFO)

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
      overflowY: 'hidden'
    }}>
      {/* <Box marginBottom={3} display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h4" sx={{mb: 0}}>{icao?.toUpperCase()}</Heading>
        <IconButton aria-label="" icon={StarIcon} />
      </Box> */}
      <Styles.Header>
        <PageHeader>
          <PageHeader.TitleArea>
            <PageHeader.Title>{icao?.toUpperCase()}</PageHeader.Title>
            <PageHeader.Actions>
              <IconButton aria-label="Workflows" icon={StarIcon} />
            </PageHeader.Actions>
          </PageHeader.TitleArea>
        </PageHeader>
      </Styles.Header>
      <SegmentedControl fullWidth aria-label="File view" size="small">
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