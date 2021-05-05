import Link from 'next/link'
// import Image from 'next/image'
import utilStyles from '../styles/utils.module.scss'

export default function characterSearchItem({ characterData }) {
    return (
        <div className={utilStyles.clickableBox}>
            <Link href={`/characters/${encodeURIComponent(characterData.name)}`} >
                <div className={utilStyles.listItem}>
                    {/* <Image
                        src={characterData.thumbnail.path + "." + characterData.thumbnail.extension}
                        className={utilStyles.borderCircle}
                        height={50}
                        width={50}
                        alt={characterData.name + " image"} /> */}
                        <img
                        src={characterData.thumbnail.path + "." + characterData.thumbnail.extension}
                        className={utilStyles.borderCircle}
                        height={50}
                        width={50}
                        />
                    <p className={utilStyles.text}>{characterData.name}</p>
                </div>
            </Link>
        </div>
    )
}