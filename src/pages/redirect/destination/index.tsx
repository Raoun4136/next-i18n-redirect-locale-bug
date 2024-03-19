import styles from '@/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function To() {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const { t } = useTranslation('common');
  return (
    <>
      <main className={`${styles.main}`}>
        <div className={styles.description}>
          <div>
            <p>**Router Info**</p>
            <p>locale: {locale}</p>
            <p>locales: {locales?.join(',')}</p>
            <p>defaultLocale: {defaultLocale}</p>
          </div>
          <div>
            <Link href="/redirect">Go to `Redirect`</Link>
            <Link href="/">{t('go-home')}</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'en', ['common'])),
    },
  };
};
