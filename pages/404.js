import Image from "next/image";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './../styles/404.module.css';

const Err = () => {

    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }, [])

    return (
        <div className={styles.container}>
            <Image
                src='/404.png'
                alt="error"
                width={600}
                height={300} 
                
                />

            <p className="blue-text">Перехожу на <Link href='/'>главную страницу</Link>через 3 секунды</p>
        </div>
    );
}

export default Err; 