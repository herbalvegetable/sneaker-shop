'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

import styles from './page.module.css';

import Product from '@/components/Product/Product';

export default function CreatePage(props) {

    const handleEdit = sneakerData => {
        console.log(sneakerData);
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>PRODUCT LISTING CREATION</div>
                <button className={styles.publish}>PUBLISH</button>
            </div>
            <Product isEdit onChange={handleEdit}/>
        </>
    )
}