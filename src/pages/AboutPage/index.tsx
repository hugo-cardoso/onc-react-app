import { PageLayout, Text } from '@primer/react'
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
        <Text as="p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium tenetur, maxime ipsum ratione dignissimos quisquam, rem veritatis eos beatae repellat saepe accusamus eius obcaecati sapiente, iure itaque voluptas ipsam necessitatibus!</Text>
        <Text as="p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium tenetur, maxime ipsum ratione dignissimos quisquam, rem veritatis eos beatae repellat saepe accusamus eius obcaecati sapiente, iure itaque voluptas ipsam necessitatibus!</Text>
        <Text as="p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium tenetur, maxime ipsum ratione dignissimos quisquam, rem veritatis eos beatae repellat saepe accusamus eius obcaecati sapiente, iure itaque voluptas ipsam necessitatibus!</Text>
      </PageLayout.Content>
    </PageLayout>
  </>
)