import styles from '@/styles/Home.module.css';
import { GetServerSideProps } from 'next';

export default function WithLocale() {
  return (
    <>
      <main className={`${styles.main}`}></main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const locale = ctx.locale === ctx.defaultLocale ? '' : `${ctx.locale}/`;
  return {
    redirect: {
      destination: `${locale}/redirect/destination`,
      permanent: false,
    },
  };
};
