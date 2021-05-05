import Head from 'next/head'
import { useState } from 'react'
import Character from '../components/characterSearchItem'
import Layout, { siteTitle } from '../components/mlayout'
import utilStyles from '../styles/utils.module.scss'
import Fuse from 'fuse.js'
import { getCharacterData } from '../lib/characters'

export async function getStaticProps() {
    let allCharacterData = [];

    for (var i = 0; i < 1; i += 100) {
        const newCharacterData = await getCharacterData(i);
        allCharacterData = allCharacterData.concat(await newCharacterData);
    }
    return {
        props: {
            allCharacterData
        }
    }
}

function Search(props) {
    const allCharacters = props.data;
    const [filteredCharacters, updateFilteredCharacters] = useState([])

    const inputUpdate = event => {
        const options = {
            keys: ['name'],
            includeScore: true,
        }
        const fuse = new Fuse(allCharacters, options);

        updateFilteredCharacters((fuse.search(event.target.value).filter(item => { if (item.score < 0.1) { return item } })))
    }

    return (
        <section>
            <div className={utilStyles.searchbar}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={inputUpdate}

                />
                <div className={utilStyles.search}></div>
            </div>
            <section>
                <ul className={utilStyles.list}>
                    {filteredCharacters.map(({ item }) => (
                        <li className={utilStyles.listItem} key={item.name}>
                            <Character characterData={item}/>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    )
}

export default function Home({ allCharacterData }) {
    let includedCharacters = JSON.parse(JSON.stringify(allCharacterData));

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <Search data={includedCharacters} />
            </section>

        </Layout>
    )
}