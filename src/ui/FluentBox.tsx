import React, { FC, useRef } from 'react'
import AppBox, { AppBoxProps } from '~/ui/AppBox'
import { darken, transparentize } from 'polished'
import { useDomEvent } from 'framer-motion'
import styled, { css, DefaultTheme } from 'styled-components'
import { ResponsiveValue } from 'styled-system'

const pathValue = (o, p) => p?.split('.').reduce((a, v) => a[v], o)

const parseColor = (theme: DefaultTheme, color?: string | ResponsiveValue<string | number | symbol>): string | null => {
  if (typeof color === 'string') {
    return pathValue(theme.colors, color) ?? null
  }
  return null
}

const FluentBoxInner = styled(AppBox)<AppBoxProps>`
  ${props => {
    let color = parseColor(props.theme, props.bg)
    if (!color) color = parseColor(props.theme, props.backgroundColor)
    if (!color) color = props.theme.colors.gray['800']
    return css`
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: opacity 0.1s linear;
      }

      &:before {
        width: 160px;
        height: 120px;
        background: radial-gradient(circle at center, #fff 0%, transparent 60%);
        opacity: 0;
        mix-blend-mode: screen;
        transform: translate(calc(var(--px) * 1px), calc(var(--py) * 1px)) translate(-50%, -50%);
      }

      &:after {
        background: inherit;
        margin: 2px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0;
        transition-delay: 0.05s;
      }

      &:hover {
        background-color: ${transparentize(0.4, color)};
      }

      &:hover:before {
        opacity: 0.6;
      }
      &:hover:after {
        opacity: 0.85;
        transition-delay: 0s;
      }

      overflow: hidden;
      border-bottom: solid 1px ${darken(0.1, color)};
      z-index: 2;
      transition: background-color;
      background: ${transparentize(0.4, color)};
      backdrop-filter: blur(7px);
      &:hover {
        cursor: pointer;
      }
    `
  }}
`

const FluentBox: FC<AppBoxProps> = ({ ...props }) => {
  const $container = useRef<HTMLElement>()
  useDomEvent($container, 'mousemove', (e: MouseEvent) => {
    if ($container.current) {
      $container.current.style.setProperty('--py', String(e.clientY - $container.current.offsetTop))
      $container.current.style.setProperty('--px', String(e.clientX - $container.current.offsetLeft))
    }
  })
  return <FluentBoxInner ref={$container} {...props} />
}

export default FluentBox
