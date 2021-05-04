var md5 = require('md5');

const publicKey = "07770fff8f6fbd7dc8cf22497bede7be";
const privateKey = process.env.MARVEL_PRIVATE_KEY_ENV_LOCAL_VARIABLE;

export async function getCharacterData(i) {
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey).toString();
    const fullurl = "http://gateway.marvel.com/v1/public/characters?limit=100&offset=" + i + "&ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
    console.log(fullurl);
    const res = await fetch(fullurl, {cache: "force-cache"})
    var resJSON = await res.json();
    return await resJSON.data.results;
}

export async function getCharacterPageData(name) {
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey).toString();
    const fullurl = "http://gateway.marvel.com/v1/public/characters?name=" + name + "&ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
    console.log(fullurl);
    const res = await fetch(fullurl, {cache: "force-cache"})
    var resJSON = await res.json();
    const pageData = await resJSON.data.results
    return {name, pageData}
}

export async function getAllCharacterData() {

    let allCharacterData = [];

    for (var i = 0; i < 50; i += 100) {
        const newCharacterData = await getCharacterData(i);
        allCharacterData = allCharacterData.concat(await newCharacterData);
    }
    return allCharacterData;
}



export async function getAllCharacterNames() {

    let allNames = []
    const allCharacterData = await getAllCharacterData();

    for (let i = 0; i < allCharacterData.length; i++) {
        allNames.push(allCharacterData[i].name)
    }
    return allNames.map(name => {
        return {
            params: {
                name: name
            }
        }
    })
}



