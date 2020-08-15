import React, { FC } from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { StarWarsList_films$key } from '~/__generated__/StarWarsList_films.graphql'
import { StarWarsListItem } from '~/components/app/StarWarsListItem'
import AppBox from '~/ui/AppBox'

const FRAGMENT = graphql`
  fragment StarWarsList_films on FilmsConnection {
    edges {
      node {
        id
        ...StarWarsListItem_film
      }
    }
  }
`

interface Props {
  films: StarWarsList_films$key
}

export const StarWarsList: FC<Props> = ({ films: filmsFragment }) => {
  const films = useFragment(FRAGMENT, filmsFragment)

  return (
    <AppBox as="ul" display="grid" mt={3} gridGap={3} gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))">
      {films.edges
        .map(edge => edge.node)
        .map(film => (
          <StarWarsListItem key={film.id} film={film} />
        ))}
    </AppBox>
  )
}

export default StarWarsList
