import Head from 'next/head';
import { useCallback, useState } from 'react';
import Character from '../components/characterSearchItem';
import Layout, { siteTitle } from '../components/marvelLayout';
import utilStyles from '../styles/utils.module.scss';
import { getCharacterData, getCharacterDataByName } from '../lib/characters';
import { debounce } from 'lodash'

export async function getStaticProps() {
  const offset = 0;
  let characterData = [];
  characterData = await getCharacterData(offset);

  return {
    props: {
      characterData,
    },
  };
}

function Search(props) {
  const [characterList, updateCharacters] = useState([]);

  const inputUpdate = useCallback((event) => {
    getCharacterDataByName(event.target.value).then(res => {
      updateCharacters(res)
    })
  }, []);

  return (
    <section>
      <div className={utilStyles.searchbar}>
        <input type='text' placeholder='Search...' onChange={debounce(inputUpdate, 800)} />
        <div className={utilStyles.search}></div>
      </div>
      <section>
        <ul className={utilStyles.list}>
          {characterList.map( item => (
            <li className={utilStyles.listItem} key={item.name}>
              <Character characterData={item} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default function Home({ characterData }) {
  let includedCharacters = JSON.parse(JSON.stringify(characterData));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Search data={includedCharacters} />
      </section>
    </Layout>
  );
}
