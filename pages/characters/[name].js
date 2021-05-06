import Layout from '../../components/mlayout';
// import Image from 'next/image'
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.scss';
import { getAllCharacterNames, getCharacterPageData } from '../../lib/characters';
import MarvelLink from '../../components/marvelLink';

export async function getStaticProps({ params }) {
  let currentName = params.name;

  if (currentName === 'Araña') {
    currentName = 'Arana';
  } else if (currentName === 'Edward "Ted" Forrester') {
    currentName = 'Edward%20%22Ted%22%20Forrester';
  } else if (currentName === 'Dog Brother #1') {
    currentName = 'Dog%20Brother%20%231';
  }

  const characterData = await getCharacterPageData(currentName);
  return {
    props: {
      characterData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllCharacterNames();
  return {
    paths,
    fallback: true,
  };
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
      {/* <Image
        priority
        src={characterData.pageData[0].thumbnail.path + "." + characterData.pageData[0].thumbnail.extension}
        className={utilStyles.borderCircle}
        height={200}
        width={200}
        alt={characterData.pageData[0].name} /> */}
      <img src={characterData.pageData[0].thumbnail.path + '.' + characterData.pageData[0].thumbnail.extension}
           className={`${utilStyles.borderCircle} ${utilStyles.characterImage}`}
           height={200}
           width={200} />
      <div>
        <p>{characterData.pageData[0].description}</p>
      </div>
      <div>
        {urlArray.map(item => (
          <MarvelLink urlData={item} key={item.type} />
        ))}
      </div>
    </div>

  </Layout>);
}
