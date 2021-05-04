import Layout from '../../components/mlayout'
import Image from 'next/image'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.scss'
import { getAllCharacterNames, getCharacterPageData } from '../../lib/characters'
import MarvelLink from '../../components/marvelLink'

export async function getStaticProps({ params }) {
  const characterData = await getCharacterPageData(params.name)
  return {
    props: {
      characterData
    }
  }
}

export async function getStaticPaths() {
  const paths = await getAllCharacterNames()
  return {
    paths,
    fallback: false
  }
}

export default function Character({ characterData }) {
  let urlArray = characterData.pageData[0].urls;
  return (<Layout>
    <Head>
      <title>{characterData.pageData[0].name}</title>
    </Head>
    <div className={utilStyles.content}>
      <h1>
        {characterData.pageData[0].name}
      </h1>
      <Image
        priority
        src={characterData.pageData[0].thumbnail.path + "." + characterData.pageData[0].thumbnail.extension}
        className={utilStyles.borderCircle}
        height={200}
        width={200}
        alt={characterData.pageData[0].name} />
        <div>
          <p>{characterData.pageData[0].description}</p>
        </div>
        <div>
          {urlArray.map( item => (
            <MarvelLink urlData={item}/>
          ))}
        </div>
    </div>

  </Layout>)
}
