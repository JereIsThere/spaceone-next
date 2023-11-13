import Image from 'next/image'
import bannerSmall from '../img/spaceone_logo_small.png'
import Layout from '../components/layout'
import LinkButton from '@/components/LinkButton'

export default function Home() {
  return (
    <>
      {/* <img src="/spaceone_logo_small.png" /> */}
      <Layout>
        <h1>halo</h1>

        {/* <div className="horizontalList"> */}
        <div className="flex-row justify-center w-full">
          <LinkButton link="/db" text="DB" />
          <LinkButton link="/shop" text="Webshop" />
          <LinkButton link="/events" text="Events" />
          <LinkButton link="/ftp" text="FTP" />
          <LinkButton link="/mail" text="Mail" />
        </div>

      </Layout>
    </>
  )
}
