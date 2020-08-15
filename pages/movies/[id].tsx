import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import AppHead from '~/components/AppHead'
import Page from '~/ui/layout/Page'
import AppContainer from '~/ui/layout/AppContainer'
import { fetchQuery, graphql } from 'react-relay/hooks'
import { useRouter } from 'next/router'
import { IdQuery, IdQueryResponse } from '~/__generated__/IdQuery.graphql'
import { initEnvironment } from '~/relay'
import Text from '~/ui/typography/Text'
import MovieDetail from '~/components/app/movie/MovieDetail'
import { RelayProps } from '~/@types'

const QUERY = graphql`
  query IdQuery($id: ID!) {
    film(id: $id) {
      title
      ...MovieDetail_film
    }
  }
`

type Props = RelayProps<IdQueryResponse>

const MovieDetailPage: NextPage<Props> = ({ film }) => {
  const { isFallback } = useRouter()

  return (
    <Page>
      <AppHead title="Film" />
      <AppContainer full>
        {isFallback && <Text>Loading...</Text>}
        {!isFallback && (
          <>
            <AppHead title={film.title} />
            <MovieDetail movie={film} />
          </>
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

export const getStaticProps: GetStaticProps<Props, RouteParams> = async ctx => {
  const { environment } = initEnvironment()

  const relayProps = await fetchQuery<IdQuery>(environment, QUERY, {
    id: ctx.params.id,
  }).toPromise()

  const relayRecords = environment.getStore().getSource().toJSON()

  return {
    revalidate: 1,
    props: {
      relayRecords,
      ...relayProps,
    },
  }
}

export default MovieDetailPage
