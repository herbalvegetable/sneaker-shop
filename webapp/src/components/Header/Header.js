import {useState, useEffect} from 'react';
import { useRouter, usePathname } from 'next/navigation';

import styles from './Header.module.css';

const CATEGORIES = [
    { title: 'All', href: '/' },
    { title: 'Nike', href: '/nike' },
    { title: 'Adidas', href: '/adidas' },
    { title: 'New Balance', href: '/new-balance' },
    { title: 'Puma', href: '/puma' },
    { title: 'Asics', href: '/asics' },
    { title: 'Converse', href: '/converse' },
    { title: 'Under Armour', href: '/under-armour' },
    { title: 'Vans', href: '/vans' },
]

export default function Header(props){

    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <span className={styles.bold}>SNEAK3R</span> 👟 SHOP
            </div>
            <div className={styles.categories}>
                {
                    CATEGORIES.map((ctg, i) => {
                        const { title, href } = ctg;
                        const isActive = pathname === href;
                        return (
                            <div key={i.toString()} className={`${styles.category} ${isActive ? styles.active : ''}`} onClick={() => router.push(href)}>
                                {title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}