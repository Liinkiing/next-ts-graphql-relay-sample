import React, { FC } from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { StarWarsListItem_film$key } from '~/__generated__/StarWarsListItem_film.graphql'
import Heading, { HeadingSize } from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import FluentBox from '~/ui/FluentBox'
import styled from 'styled-components'
import AppLink from '~/ui/typography/AppLink'

const FRAGMENT = graphql`
  fragment StarWarsListItem_film on Film {
    id
    title
    director
  }
`

interface Props {
  film: StarWarsListItem_film$key
}

const StarWarsListItemInner = styled(FluentBox)`
  transition: transform 0.2s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`

export const StarWarsListItem: FC<Props> = ({ film: filmFragment }) => {
  const film = useFragment(FRAGMENT, filmFragment)

  return (
    <li>
      <AppLink href="/movies/[id]" as={`/movies/${film.id}`} key={film.id} color="inherit">
        <StarWarsListItemInner p={3} borderRadius={4} bg="gray.700">
          <Heading size={HeadingSize.Md}>{film.title}</Heading>
          <Text>{film.director}</Text>
        </StarWarsListItemInner>
      </AppLink>
    </li>
  )
}

export default StarWarsListItem
