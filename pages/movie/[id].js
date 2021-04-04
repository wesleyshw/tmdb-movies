import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function MovieItem({info}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>TMDB - Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {info.title}
        </h1>
        <p>Nota: {info.vote_average}</p>
        <p>Orçamento: ${(info.budget).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
        <p>Receita: ${(info.revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
        <p>{info.overview}</p>
        <img src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} width="400px"/><br/>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {

    const res = await fetch(`https://tmdb-shw.vercel.app/api/movie/${context.params.id}`);
    const json = await res.json();

    return {
      props: {
        info: json.info
      }
    }
}