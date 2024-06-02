'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

import styles from './PageWrapper.module.css';

import Header from '@/components/Header/Header';

export default function PageWrapper({ children }) {

    const backRef = useRef(null);
    const wrapperRef = useRef(null);

    const [backHeight, setBackHeight] = useState(null);
    useEffect(() => {
        setBackHeight(wrapperRef.current.clientHeight);
        console.log('set Wrapper height: ', wrapperRef.current.clientHeight);
        return ()=>{
            console.log('PageWrapper unmount');
        }
    }, []);

    return (
        <div className={styles.parallax}>
            {/* <div className={`${styles.back} ${styles.parallax_layer}`} style={backHeight ? {height: `${backHeight}px`} : {}}></div> */}
            <div className={`${styles.wrapper} ${styles.parallax_layer}`} ref={wrapperRef}>
                <div className={styles.center}>
                    <Header />
                    {children}
                    <footer className={styles.footer}>SN3AKS © {new Date().getFullYear()} | Ben Aw Yong</footer>
                </div>
            </div>
        </div>
    )
}