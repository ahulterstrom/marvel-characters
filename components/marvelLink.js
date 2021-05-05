import Link from 'next/link'
import utilStyles from '../styles/utils.module.scss'

export default function marvelLink({ urlData }) {
    return (
        <div className="button">
            <Link href={urlData.url}>
                <a>{urlData.type}</a>
            </Link>
        </div>
    )
}