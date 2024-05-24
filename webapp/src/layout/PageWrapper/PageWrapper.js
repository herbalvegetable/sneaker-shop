'use client';
import { useReact, useEffect } from 'react';

import styles from './PageWrapper.module.css';

export default function PageWrapper({ children }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.center}>
                {children}
                <footer className={styles.footer}>Sneaker Shop © 2024 | Ben Aw Yong</footer>
            </div>
        </div>
    )
}