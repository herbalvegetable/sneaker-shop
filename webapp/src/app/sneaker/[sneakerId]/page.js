'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

import styles from './page.module.css';

export default function SneakerIdPage({ params }) {

    const { sneakerId } = params;

    return (
        <div className={styles.wrapper}>

            <div className={styles.slideshow}>
                <div className={styles.slides}>

                </div>
                <div className={styles.current_slide}>

                </div>
            </div>

            <div className={styles.specifics}>
                <div className={styles.name}></div>
                <div className={styles.price}></div>
                <div className={styles.sizes}>
                    <div className={styles.title}>Sizes</div>
                    <div className={styles.options}>

                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.addToCart}>ADD TO CART</button>
                </div>
                <div className={styles.description}></div>
                <div className={styles.details}></div>
            </div>
        </div>
    )
}