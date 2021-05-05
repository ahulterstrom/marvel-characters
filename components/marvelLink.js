import Link from 'next/link'
import utilStyles from '../styles/utils.module.scss'

export default function marvelLink({ urlData }) {
    let buttonText = urlData.type.slice();
    if(buttonText == "comiclink"){
        buttonText = "comics";
    }
    return (
        <div className={utilStyles.button}>
            <Link href={urlData.url}>
                <p>{buttonText.charAt(0).toUpperCase() + buttonText.slice(1)}</p>
            </Link>
        </div>
    )
}