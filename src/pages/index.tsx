import styles from '@/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import LanguageDetector from 'i18next-browser-languagedetector';

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
              <button
                onClick={() => {
                  document.cookie = `NEXT_LOCALE=en;path=/`;
                  window.location.reload();
                }}
              >
                Cookie Change 'en'
              </button>
              <button
                onClick={() => {
                  document.cookie = `NEXT_LOCALE=ko;path=/`;
                  window.location.reload();
                }}
              >
                Cookie Change 'ko'
              </button>
              <Link href="/" locale={false}>
                'false'
              </Link>
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
  const getCookie = () => {
    const cookies = ctx.req.headers.cookie;
    if (cookies) {
      const cookie = cookies
        .split(';')
        .find((cookie) => cookie.trim().startsWith('NEXT_LOCALE='));
      if (cookie) {
        return cookie.split('=')[1];
      }
    }
  };
  const getLocale = () => {
    const locale = ctx.req.headers['accept-language']?.split(',')?.[0];
    if (locale === '*') return;
    else return locale;
  };

  const locale = getCookie() || getLocale() || ctx.locale || 'ko';

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
