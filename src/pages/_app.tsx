import { useEffect, useState } from "react";
import Head from "next/head";
import { LayoutGroup } from "framer-motion"
import AOS from "aos";
import Loader from "../components/Loader";
import Cursor from "../components/Cursor";
import "../../styles/index.scss";

const MyApp = ({ Component, pageProps } : any) => {
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setLoading(false);
    (document.getElementById("__next") as HTMLInputElement).classList.add("fade-in");
    AOS.init();

    let DocumentNameChange = () => {
      let PageName = document.title;
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
         document.title = PageName;
        } else {
         document.title = "Come back 😥";
       }
      });
    }

    let currentUrl = location.href;
    setInterval(() => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        DocumentNameChange();
      }
    }, 250);


  }, []);
  
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="theme-color" content="#181920" />
        <link rel="manifest" href="/manifest.json" />
        <meta name='application-name' content='Florian - PWA' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel='mask-icon' href='/maskable_icon.png' color='#ff5d38' />
        <link
          rel="alternate"
          type="text/html"
          hrefLang="fr"
          href="https://florianhoudu.fr/"
          title="Français"
        />
        <link
          rel="alternate"
          type="text/html"
          hrefLang="en"
          href="https://florianhoudu.fr/en"
          title="English"
        />
      </Head>
      {!loading ? (
        <LayoutGroup>
          <Component {...pageProps} />
          <Cursor />
        </LayoutGroup>
      ) : (
        <>
          <Loader />
          <Component {...pageProps} />
          <Head>
            <link rel="icon" href="/sablier.png" />
            <title>Loading... ⌛</title>
          </Head>
        </>
      )}
    </>
  );
}

export default MyApp;
