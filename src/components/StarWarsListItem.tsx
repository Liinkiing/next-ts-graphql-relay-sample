import React, { FC } from 'react'
import AppBox from '~/ui/AppBox'
import { graphql, useFragment } from 'react-relay/hooks'
import { StarWarsListItem_film$key } from '~/__generated__/StarWarsListItem_film.graphql'
import Heading, { HeadingSize } from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'

const FRAGMENT = graphql`
  fragment StarWarsListItem_film on Film {
    title
    created
    director
  }
`

interface Props {
  film: StarWarsListItem_film$key
}

export const StarWarsListItem: FC<Props> = ({ film: filmFragment }) => {
  const film = useFragment(FRAGMENT, filmFragment)

  return (
    <AppBox
      as="li"
      p={3}
      bg="gray.200"
      boxShadow="inset 12px 14px 20px 0px rgba(0,0,0,0.03)"
      borderRadius={4}
      css={({ theme }) => ({
        transition: 'all 0.2s',
        cursor: 'pointer',
        '&:hover': {
          background: theme.colors.gray['300'],
          boxShadow: 'inset 12px 14px 20px 0px rgba(0,0,0,0.02), 0 5px 20px rgba(0,0,0,0.04)',
        },
      })}
    >
      <Heading size={HeadingSize.Md}>{film.title}</Heading>
      <Text color="gray.700">{film.director}</Text>
    </AppBox>
  )
}

export default StarWarsListItem
