import { GetStaticProps, NextPage } from 'next'
import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Text from '~/ui/typography/Text'
import Heading from '~/ui/typography/Heading'
import { fetchQuery, graphql, useRelayEnvironment } from 'react-relay/hooks'
import { pages_indexQuery } from '~/__generated__/pages_indexQuery.graphql'
import { initEnvironment } from '~/relay'
import { QueryRenderer } from 'react-relay'
import { WithRelayRecords } from '~/@types'
import StarWarsList from '~/components/StarWarsList'

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
      <Heading as="h1">Index Page</Heading>
      <AppBox mt={2}>
        <Text>Hello from index page</Text>
        <QueryRenderer<pages_indexQuery>
          variables={{}}
          fetchPolicy="store-and-network"
          environment={environment}
          query={QUERY}
          render={({ error, props }) => {
            if (error) return <div>{error.message}</div>
            else if (props && props.allFilms) return <StarWarsList films={props.allFilms} />
            return <div>Loading...</div>
          }}
        />
      </AppBox>
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
