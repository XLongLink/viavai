import React from 'react';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="A Python UI library"
        >
            <div className={styles.centerContainer}>
                <header className='hero hero--primary text-center'>
                    <div className='container'>
                        <h1 className="hero__title">ViaVai</h1>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CodeBlock language="bash" className="w-80">pip install viavai</CodeBlock>
                        </div>
                    </div>
                </header>
            </div>
        </Layout>
    );
}
