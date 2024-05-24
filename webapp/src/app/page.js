'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import styles from "./page.module.css";

export default function Home() {

    const router = useRouter();
    const pathname = usePathname()

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

    // placeholder products
    const DEV_PRODUCTS = [...new Array(30)].map(() => {
        const snkrs = [
            { name: 'Nike Air Force 1', imgSrc: '/dev/sneaker.png', price: 200 },
            { name: 'Nike Court Legacy (Green)', imgSrc: '/dev/sneaker3.png', price: 200 },
            { name: 'Nike Dunk High', imgSrc: '/dev/sneaker4.png', price: 200 },
        ]
        return snkrs[Math.floor(Math.random() * snkrs.length)];
    });

    return (
        <>
            <div className={styles.title}>
                <span className={styles.bold}>SNEAK_R</span> 👟 SHOP
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

            <div className={styles.promotion}>
                <Image
                    src='/dev/promo2.png'
                    layout='fill'
                    objectFit='contain'
                    alt='Promotion' />
            </div>
            
            <div className={styles.products_title}>LATEST SNEAK👟RS</div>
            <div className={styles.products}>
                {
                    DEV_PRODUCTS.map((product, i) => {
                        const { name, imgSrc, price } = product;
                        return (
                            <div key={i.toString()} className={styles.product} onClick={() => {}}>
                                <div className={styles.img}>
                                    <Image 
                                        loading='lazy'
                                        src={imgSrc}
                                        layout='fill'
                                        objectFit='cover'
                                        alt={name}/>
                                </div>
                                <div className={styles.name}>{name}</div>
                                <div className={styles.price}>${price}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
