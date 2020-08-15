import React, { FC } from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { MovieDetail_film$key } from '~/__generated__/MovieDetail_film.graphql'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import styled from 'styled-components'

const FRAGMENT = graphql`
  fragment MovieDetail_film on Film {
    title
    openingCrawl
    posterUrl @__clientField(handle: "posterUrl")
  }
`

interface Props {
  movie: MovieDetail_film$key
}

const Poster = styled.img`
  max-width: 280px;
  object-fit: contain;
  border-radius: 10px;
`

export const MovieDetail: FC<Props> = ({ movie: movieFragment }) => {
  const movie = useFragment(FRAGMENT, movieFragment)

  return (
    <AppBox display="flex">
      <Poster src={movie.posterUrl} alt="" />
      <AppBox ml={4} display="flex" flexDirection="column">
        <Heading>{movie.title}</Heading>
        <Text mt={2}>{movie.openingCrawl}</Text>
      </AppBox>
    </AppBox>
  )
}

export default MovieDetail
