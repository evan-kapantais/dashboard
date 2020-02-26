import React from 'react'
import styled from 'styled-components'

import Weather from './weather'

const SFooter = styled.footer `
`

const Footer = () => {
  return (
    <SFooter>
      <Weather />
    </SFooter>
  )
}

export default Footer;