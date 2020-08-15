import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import AppHead from '~/components/AppHead'
import Page from '~/ui/layout/Page'
import AppContainer from '~/ui/layout/AppContainer'
import { fetchQuery, graphql, useRelayEnvironment } from 'react-relay/hooks'
import { QueryRenderer } from 'react-relay'
import { useRouter } from 'next/router'
import { IdQuery } from '~/__generated__/IdQuery.graphql'
import { WithRelayRecords } from '~/@types'
import { initEnvironment } from '~/relay'
import Text from '~/ui/typography/Text'
import MovieDetail from '~/components/app/movie/MovieDetail'

const QUERY = graphql`
  query IdQuery($id: ID!) {
    film(id: $id) {
      title
      ...MovieDetail_film
    }
  }
`

const MovieDetailPage: NextPage = () => {
  const environment = useRelayEnvironment()
  const {
    isFallback,
    query: { id },
  } = useRouter()

  return (
    <Page>
      <AppHead title="Film" />
      <AppContainer full>
        {isFallback && <Text>Loading...</Text>}
        {!isFallback && (
          <QueryRenderer<IdQuery>
            variables={{
              id: id as string,
            }}
            fetchPolicy="store-and-network"
            environment={environment}
            query={QUERY}
            render={({ error, props }) => {
              if (error) return <Text>{error.message}</Text>
              else if (props && props.film)
                return (
                  <>
                    <AppHead title={props.film.title} />
                    <MovieDetail movie={props.film} />
                  </>
                )
              return <Text>Loading...</Text>
            }}
          />
        )}
      </AppContainer>
    </Page>
  )
}

type RouteParams = { id: string }

export const getStaticPaths: GetStaticPaths<RouteParams> = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<WithRelayRecords, RouteParams> = async ctx => {
  const { environment } = initEnvironment()

  await fetchQuery<IdQuery>(environment, QUERY, {
    id: ctx.params.id,
  }).toPromise()

  const relayRecords = environment.getStore().getSource().toJSON()

  return {
    revalidate: 1,
    props: {
      relayRecords,
    },
  }
}

export default MovieDetailPage
