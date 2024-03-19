import styles from '@/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';

export default function Redirect() {
  const router = useRouter();
  return (
    <>
      <main className={`${styles.main}`}></main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: '/redirect/destination',
      permanent: false,
    },
  };
};
