import styles from '@/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function Home() {
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
            <div>
              <Link href="/redirect">
                <span>Redirect</span> Without Locale
              </Link>
              <Link href="/redirect/locale">
                <span>Redirect</span> With Locale
              </Link>
              <Link href="/redirect/destination">Link to `Redirect Destination`</Link>
            </div>
            <div>
              <Link href={'/'} locale="en">
                'en' {t('switch')}
              </Link>
              <Link href={'/'} locale="ko">
                'ko' {t('switch')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'default', ['common'])),
    },
  };
};
