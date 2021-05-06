let md5 = require('md5');
import { get } from 'lodash';

const publicKey = process.env.NEXT_PUBLIC_KEY_MARVEL;
const privateKey = process.env.MARVEL_PRIVATE_KEY_ENV_LOCAL_VARIABLE;

const charactersToLoad = 10;
const charactersPerRequest = charactersToLoad >= 100 ? 100 : charactersToLoad;


export async function getCharacterData(offset) {
  const startOfURL = `http://gateway.marvel.com/v1/public/characters?limit=${charactersPerRequest}&offset=${offset}`;
  const endOfURL = getEndOfURLForServerSideRequest();
  return await marvelAPIFetch(startOfURL, endOfURL);
}

export async function getCharacterDataByName(searchString) {
  const startOfURL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchString}`;
  const endOfURL = getEndOfURLForClientSideRequest();
  return await marvelAPIFetch(startOfURL, endOfURL);
}

export async function getCharacterPageData(name) {
  const startOfURL = `http://gateway.marvel.com/v1/public/characters?name=${name}`;
  const endOfURL = getEndOfURLForServerSideRequest();
  const response = await marvelAPIFetch(startOfURL, endOfURL);
  return { name, response };
}

export async function getAllCharacterData() {
  let allCharacterData = [];

  for (let i = 0; i < charactersToLoad; i += 100) {
    const newCharacterData = await getCharacterData(i);
    allCharacterData = allCharacterData.concat(await newCharacterData);
  }
  return allCharacterData;
}

export async function getAllCharacterNames() {
  let allNames = [];
  const allCharacterData = await getAllCharacterData();

  for (let i = 0; i < allCharacterData.length; i++) {
    allNames.push(allCharacterData[i].name);
  }

  return allNames.map(name => {
    return {
      params: {
        name: name,
      },
    };
  });
}

export async function marvelAPIFetch(startOfURL, endOfURL) {
  const fullURL = `${startOfURL}${endOfURL}`;
  let responseJSON;
  try {
    console.log(`fetching from: \n${fullURL}`);
    const response = await fetch(fullURL, { cache: 'force-cache' });
    responseJSON = await response.json();
  } catch (error) {
    console.log(error);
  }
  return get(responseJSON, 'data.results', []);
}

function getEndOfURLForServerSideRequest() {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey).toString();
  return `&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
}

function getEndOfURLForClientSideRequest() {
  return `&apikey=${publicKey}`;
}
