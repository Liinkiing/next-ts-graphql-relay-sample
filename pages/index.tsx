import { GetStaticProps, NextPage } from 'next'
import AppHead from '~/components/AppHead'
import Heading from '~/ui/typography/Heading'
import { fetchQuery, graphql } from 'react-relay/hooks'
import { pages_indexQuery, pages_indexQueryResponse } from '~/__generated__/pages_indexQuery.graphql'
import { initEnvironment } from '~/relay'
import StarWarsList from '~/components/app/StarWarsList'
import Page from '~/ui/layout/Page'
import AppContainer from '~/ui/layout/AppContainer'
import { RelayProps } from '~/@types'

const QUERY = graphql`
  query pages_indexQuery {
    allFilms {
      ...StarWarsList_films
    }
  }
`

type Props = RelayProps<pages_indexQueryResponse>

const Index: NextPage<Props> = ({ allFilms }) => {
  return (
    <Page>
      <AppHead title="Homepage" />
      <AppContainer full>
        <Heading as="h1">Movies</Heading>
        <StarWarsList films={allFilms} />
      </AppContainer>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { environment } = initEnvironment()

  const relayProps = await fetchQuery<pages_indexQuery>(environment, QUERY, {}).toPromise()

  const relayRecords = environment.getStore().getSource().toJSON()

  return {
    revalidate: 1,
    props: {
      relayRecords,
      ...relayProps,
    },
  }
}

export default Index
