import "../styles/global.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"
          rel="stylesheet"
        />
        <title>JavaScript to Ruby Comiler</title>

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jamiehalvorson" />
        <meta name="twitter:title" content="JavaScript to Ruby Compiler" />
        <meta
          name="twitter:description"
          content="A simplistic and naive comiler that takes in JavaScript and attempts to churn out Ruby"
        />
        <meta name="twitter:creator" content="@jamiehalvorson" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_URL}/social.jpg`}
        />

        {/* OG */}
        <meta property="og:title" content="JavaScript to Ruby Compiler" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="${process.env.NEXT_PUBLIC_URL}/" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/social.jpg`}
        />
        <meta
          property="og:description"
          content="A simplistic and naive comiler that takes in JavaScript and attempts to churn out Ruby"
        />
        <meta property="og:site_name" content="Jamie Halvorson" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
