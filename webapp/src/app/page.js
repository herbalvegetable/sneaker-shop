'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import styles from "./page.module.css";

// placeholder products
const DEV_PRODUCTS = [...new Array(9)].map(() => {
    const snkrs = [
        { 
            name: 'Nike Air Force 1', 
            id: 'nike-air-force-1',
            imgSrc: '/dev/sneaker.png', 
            price: 200,
            sizes: '5/5.5/6/6.5/7/7.5/8/8.5/9/9.5/10/10.5/11',
            desc: 'Each Craft released puts a handmade feel on the AJ1 and these low-cut sneakers are no exception. Sandy neutrals come together in kicks that beg to be a part of every outfit. Premium suede adds texture while a lightly speckled outsole grounds your look with subtle detail.',
            details: 'Nubuck Upper\nRubber Outsole\nColour: Blue',
        },
        { 
            name: 'Nike Court Legacy Green',
            id: 'nike-court-legacy-green',
            imgSrc: '/dev/sneaker3.png', 
            price: 200,
            sizes: '5/5.5/6/6.5/7/7.5/8/8.5/9/9.5/10/10.5/11',
            desc: 'Each Craft released puts a handmade feel on the AJ1 and these low-cut sneakers are no exception. Sandy neutrals come together in kicks that beg to be a part of every outfit. Premium suede adds texture while a lightly speckled outsole grounds your look with subtle detail.',
            details: 'Nubuck Upper\nRubber Outsole\nColour: Blue',
        },
        { 
            name: 'Nike Dunk High', 
            id: 'nike-dunk-high',
            imgSrc: '/dev/sneaker4.png', 
            price: 200,
            sizes: '5/5.5/6/6.5/7/7.5/8/8.5/9/9.5/10/10.5/11',
            desc: 'Each Craft released puts a handmade feel on the AJ1 and these low-cut sneakers are no exception. Sandy neutrals come together in kicks that beg to be a part of every outfit. Premium suede adds texture while a lightly speckled outsole grounds your look with subtle detail.',
            details: 'Nubuck Upper\nRubber Outsole\nColour: Blue',
        },
    ]
    return snkrs[Math.floor(Math.random() * snkrs.length)];
});
export default function Home() {

    const router = useRouter();
    const pathname = usePathname()


    return (
        <>
            <div className={styles.promotion}>
                <Image
                    src='/dev/promo2.png'
                    layout='fill'
                    className={styles.img}
                    alt='Promotion' />
            </div>
            
            <div className={styles.products_title}>LATEST 👟s</div>
            <div className={styles.products}>
                {
                    DEV_PRODUCTS.map((product, i) => {
                        const { name, id, imgSrc, price } = product;
                        return (
                            <div key={i.toString()} className={styles.product} onClick={() => router.push(`/sneaker/${id}`)}>
                                <div className={styles.img_wrapper}>
                                    <Image 
                                        loading='lazy'
                                        src={imgSrc}
                                        layout='fill'
                                        className={styles.img}
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
