import { GetStaticProps, NextPage } from 'next'
import AppHead from '~/components/AppHead'
import AppBox from '~/ui/AppBox'
import Text from '~/ui/typography/Text'
import Heading from '~/ui/typography/Heading'
import { fetchQuery, graphql, useLazyLoadQuery, useRelayEnvironment } from 'react-relay/hooks'
import { pages_indexQuery } from '~/__generated__/pages_indexQuery.graphql'
import { initEnvironment } from '~/relay'
import { QueryRenderer } from 'react-relay'
import { WithRelayRecords } from '~/@types'
import StarWarsList from '~/components/app/StarWarsList'
import Page from '~/ui/layout/Page'
import AppContainer from '~/ui/layout/AppContainer'

const QUERY = graphql`
  query pages_indexQuery {
    allFilms {
      ...StarWarsList_films
    }
  }
`

const Index: NextPage = () => {
  const environment = useRelayEnvironment()
  return (
    <Page>
      <AppHead title="Homepage" />
      <AppContainer full>
        <Heading as="h1">Movies</Heading>
        <QueryRenderer<pages_indexQuery>
          variables={{}}
          fetchPolicy="store-and-network"
          environment={environment}
          query={QUERY}
          render={({ error, props }) => {
            if (error) return <Text>{error.message}</Text>
            else if (props && props.allFilms) return <StarWarsList films={props.allFilms} />
            return <Text>Loading...</Text>
          }}
        />
      </AppContainer>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<WithRelayRecords> = async () => {
  const { environment } = initEnvironment()

  await fetchQuery(environment, QUERY, {}).toPromise()

  const relayRecords = environment.getStore().getSource().toJSON()

  return {
    props: {
      relayRecords,
    },
  }
}

export default Index
