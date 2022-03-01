import type { NextPage } from 'next'

import { Container } from '@mantine/core'

import SubscribeSearchBar from '@comps/subscribe/searchBar'
import SubscribeTable from '@comps/subscribe/SubscribeTable'
import SubscribeBanner from '@comps/subscribe/SubscribeBanner'
import ScrollToTop from '@comps/ScrollToTop'

const SubscriptionPage: NextPage = () => {
  return (
    <>
      <ScrollToTop />
      <SubscribeBanner />
      <Container
        size="lg"
        sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
      >
        <SubscribeSearchBar />
        <SubscribeTable />
      </Container>
    </>
  )
}

export default SubscriptionPage
