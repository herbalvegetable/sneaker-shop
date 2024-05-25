'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

import styles from './page.module.css';

export default function SneakerIdPage({ params }) {

    const { sneakerId } = params;

    return (
        <div>Sneaker ID: {sneakerId}</div>
    )
}