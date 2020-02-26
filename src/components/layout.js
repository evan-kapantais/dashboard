import React from 'react'
import styled from 'styled-components'

import Header from './header'
import Footer from './footer'

const SLayout = styled.div `
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  main {
    display: flex;
    justify-content: space-evenly;
  }
`

const Layout = ({children}) => (
  <SLayout>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </SLayout>
)

export default Layout;