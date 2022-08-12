import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src="/logo.svg" height={50} width={150}/>
            </div>
            <div className={styles.menu}>
                <Link href="/">
                    <a className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}>Home</a>
                </Link>
                <Link href="/women">
                    <a className={`${styles.link} ${router.pathname === "/women" ? styles.active : ""}`}>Women</a>
                </Link>
                <Link href="/men">
                    <a className={`${styles.link} ${router.pathname === "/men" ? styles.active : ""}`}>Men</a>
                </Link>
            </div>
        </header>
    )
}
