import Link from 'next/link'
import utilStyles from '../styles/utils.module.scss'

export default function marvelLink({ urlData }) {
    return (

        <Link href={urlData.url}>
            <a>{urlData.type}</a>
        </Link>
    )
}