import PageBanner from '@comps/PageBanner'
import type { NextPage } from 'next'
import { useTranslation } from 'react-i18next'

const Home: NextPage = () => {
  const { t } = useTranslation()
  return (
    <PageBanner
      title={t('general.home')}
      description={t('home.banner.description', { user: 'test' })}
    />
  )
}

export default Home
