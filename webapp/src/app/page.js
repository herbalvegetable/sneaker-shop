'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import styles from "./page.module.css";

export default function Home() {

    const router = useRouter();

    const CATEGORIES = [
        { title: 'All', href: '/all' },
        { title: 'Men', href: '/men' },
        { title: 'Women', href: '/women' },
        { title: 'Kids', href: '/kids' },
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
    const DEV_PRODUCTS = [...new Array(19)].map(() => {
        return { name: 'Nike Court Legacy (Green)', imgSrc: '/dev/sneaker3.png' };
    });

    return (
        <>
            <div className={styles.title}>
                <span className={styles.bold}>SNEAKER</span> SHOP
            </div>
            <div className={styles.categories}>
                {
                    CATEGORIES.map((ctg, i) => {
                        const { title, href } = ctg;
                        return (
                            <div key={i.toString()} className={styles.category} onClick={() => router.push(href)}>
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
            
            <div className={styles.products_title}>NEW ARRIVALS</div>
            <div className={styles.products}>
                {
                    DEV_PRODUCTS.map((product, i) => {
                        const { name, imgSrc } = product;
                        return (
                            <div key={i.toString()} className={styles.product} onClick={() => {}}>
                                <div className={styles.img}>
                                    <Image 
                                        src={imgSrc}
                                        layout='fill'
                                        objectFit='cover'
                                        alt={name}/>
                                </div>
                                <div className={styles.name}>{name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
