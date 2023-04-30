import { PageLayout, Text, Heading } from '@primer/react'
import {MarkdownViewer} from '@primer/react/drafts'
import { HeaderGlobal } from '../../components/HeaderGlobal'

import { PageHeader } from '@primer/react/drafts'

export const AboutPage = () => (
  <>
    <HeaderGlobal />
    <PageLayout>
      <PageLayout.Header>
        <PageHeader>
          <PageHeader.TitleArea variant="large">
            <PageHeader.Title>About</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
      </PageLayout.Header>
      <PageLayout.Content>
        <Text as="p">Open Nav Charts began development in early 2021 after noticing that searching and viewing procedures on official websites is lousy and the applications that solve this problem today are relatively expensive.</Text>
        <Heading as="h4" sx={{
          fontWeight: 'normal',
          fontSize: 4,
          marginBottom: 2,
        }}>Technologies</Heading>
        <Text as="p">
          - Vite <br/>
          - React <br/>
          - Typescript <br/>
          - Styled Components <br/>
          - Github Primer <br/>
          - Nodejs <br/>
          - MongoDB <br/>
          - Vercel
        </Text>
        <Heading as="h4" sx={{
          fontWeight: 'normal',
          fontSize: 4,
          marginBottom: 2,
        }}>Developers</Heading>
        <Text as="p">
          - <a href="https://github.com/hugo-cardoso" target="_blank" rel="noopener">Hugo Cardoso</a>
        </Text>
      </PageLayout.Content>
    </PageLayout>
  </>
)