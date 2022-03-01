import PageBanner from '@comps/PageBanner'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <PageBanner title="Home" description={`Hi, <USER_NAME>!`} />
}

export default Home
