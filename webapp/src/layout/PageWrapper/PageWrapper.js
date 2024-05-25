'use client';
import { useReact, useEffect } from 'react';

import styles from './PageWrapper.module.css';

import Header from '@/components/Header/Header';

export default function PageWrapper({ children }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.center}>
                <Header />
                {children}
                <footer className={styles.footer}>SNEAK3R SHOP © {new Date().getFullYear()} | Ben Aw Yong</footer>
            </div>
        </div>
    )
}