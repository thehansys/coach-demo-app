import '../styles/globals.css'
import { Fragment } from 'react'
import Head from "next/head";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
      <Fragment>
        <Head>
          <title>Coach demo app</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <Component {...pageProps} />
      </Fragment>
  )
}

export default MyApp