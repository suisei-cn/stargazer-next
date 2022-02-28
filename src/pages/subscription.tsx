import type { NextPage } from 'next'

import { Container } from '@mantine/core'

import SubscribeSearchBar from '@comps/subscribe/searchBar'
import SubscribeTable from '@comps/subscribe/table'
import SubscribeBanner from '@comps/subscribe/banner'

const SubscriptionPage: NextPage = () => (
  <>
    <SubscribeBanner />
    <Container size="lg" sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
      <SubscribeSearchBar />
      <SubscribeTable />
    </Container>
  </>
)

export default SubscriptionPage
