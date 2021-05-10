import Head from "next/head";
// import Image from 'next/image'
import styles from "./mlayout.module.css";
import Link from "next/link";

const name = "Marvel";
export const siteTitle = "Marvel Characters";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Marvel with Next.js" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            {/* <Image
                            priority
                            src="/images/Marvel_Logo.svg"
                            className={styles.logo}
                            height={201}
                            width={500}
                            alt={name}
                            quality={100}
                        /> */}
            <img
              src="/images/Marvel_Logo.svg"
              className={styles.logo}
              height={201}
              width={500}
            />
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                {/* <Image
                                    priority
                                    src="/images/Marvel_Logo.svg"
                                    className={styles.logo}
                                    height={100}
                                    width={250}
                                    alt={name}
                                    quality={100}
                                /> */}
                <img
                  src="/images/Marvel_Logo.svg"
                  className={styles.logo}
                  height={100}
                  width={250}
                />
              </a>
            </Link>
          </>
        )}
      </header>
      <div className={styles.content}>
        <main>{children}</main>
      </div>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <div className={styles.footer}>
        <p>Data provided by Marvel. © 2014 Marvel</p>
      </div>
    </div>
  );
}
