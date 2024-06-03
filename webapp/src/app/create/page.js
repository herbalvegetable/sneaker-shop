'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';

import Product from '@/components/Product/Product';

export default function CreatePage(props) {

    const router = useRouter();

    const [listingData, setListingData] = useState({});
    const handleEdit = data => {
        console.log(data);
        setListingData(data);
    }
    const handlePublish = e => {
        e.preventDefault();

        let formData = new FormData();
        for (let [key, value] of Object.entries(listingData)) {
            // console.log(key, value);
            if (key === 'images') {
                for (let fileData of value) {
                    // console.log('filedata', fileData);
                    formData.append('images[]', fileData);
                }
                continue;
            }
            formData.append(key, value);
        }
        for (var pair of formData) {
            console.log(pair);
        }

        fetch('http://localhost:5000/sneaker', {
            method: 'post',
            body: formData,
        })
            .then(res => {
                console.log(res);
                router.push('/'); // temp: redirect to homepage once successfully published
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>PRODUCT LISTING CREATION</div>
                <button className={styles.publish} onClick={handlePublish}>PUBLISH</button>
            </div>
            <Product isEdit onChange={handleEdit} />
        </>
    )
}