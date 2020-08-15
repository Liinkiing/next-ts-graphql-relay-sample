import React from 'react'
import AppBox from '~/ui/AppBox'
import { pxToRem } from '~/styles/modules/mixins'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import AppLink from '~/ui/typography/AppLink'

const NavItem = styled(AppBox).attrs({
  p: 2,
})``

const AppNav: React.FC = () => (
  <AppBox
    p={4}
    display="flex"
    flex={1}
    borderRight="1px solid"
    borderRightColor="gray.700"
    maxWidth={pxToRem(320)}
    flexDirection="column"
    color="text"
    css={css`
      ${({ theme }) => css`
        display: none;
        background: ${transparentize(0.5, theme.colors.gray['800'])};
        backdrop-filter: blur(10px);
        ${theme.mediaQueries.tablet} {
          display: block;
        }
      `}
    `}
  >
    <AppBox as="main" mb={4}>
      <AppBox as="ul" mt={2}>
        <li>
          <NavItem>
            <AppLink href="/" color="inherit">
              <Heading>Star Wars</Heading>
            </AppLink>
          </NavItem>
        </li>
        <li>
          <NavItem>
            <Text>Relay</Text>
          </NavItem>
        </li>
      </AppBox>
    </AppBox>
  </AppBox>
)

export default AppNav
