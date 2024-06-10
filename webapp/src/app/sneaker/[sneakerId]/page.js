'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

import styles from './page.module.css';

import Product from '@/components/Product/Product';

export default function SneakerIdPage({ params }) {

    const { sneakerId } = params;

    return (
        <>
            <br />
            <br />
            <Product productId={sneakerId}/>
        </>
    )
}