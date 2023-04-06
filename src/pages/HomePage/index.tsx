import { Box, Heading, Text } from '@primer/react'

import { HeaderGlobal } from '../../components/HeaderGlobal'

import * as Styles from './styles'

type PixItem = {
  link: string;
  value: number;
}

export const HomePage = () => {
  const pixItems: PixItem[] = [
    {
      link: "https://mpago.la/2RJgas1",
      value: 5,
    },
    {
      link: "https://mpago.la/2Q4V9EW",
      value: 15,
    },
    {
      link: "https://mpago.la/2oQGU5p",
      value: 10,
    }
  ];

  return (
    <>
      <HeaderGlobal />
      <Styles.Container>
        <Styles.Hero>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Heading sx={{fontSize: 5}}>Open Nav Charts</Heading>
            <Text sx={{fontSize: 2, mt: 2}}>A <strong>free</strong> online aviation chart viewer for use in flight simulation.</Text>
          </Box>
        </Styles.Hero>
        <Styles.SupportContainer>
          <Heading sx={{fontSize: 3}}>Enjoying? Make a donation to the project 💵</Heading>
          <Styles.SupportCards>
            {
              pixItems.map((item) => (
                <Styles.SupportCard href={item.link} target="_blank" key={item.value}>
                  <Text sx={{fontSize: 4}}>R$ { item.value.toFixed(2) }</Text>
                </Styles.SupportCard>
              ))
            }
          </Styles.SupportCards>
        </Styles.SupportContainer>
      </Styles.Container>
    </>
  )
}