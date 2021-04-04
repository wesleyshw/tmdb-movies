import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [movieList, setMovieList] = useState([]);

    const handleSearch = async () => {
        if(searchText !== '') {
            const result = await fetch(`/api/search?q=${searchText}`);
            const json = await result.json();
            
            setMovieList(json.list);
        }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>TMDB - Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Busca
        </h1>

        <input type="text" value={searchText} onChange={e=>setSearchText(e.target.value)}></input>
        <button onClick={handleSearch}>Buscar</button>

        <hr/>

        <ul>
            {movieList.map(item=>(
                <li>
                    <a href={`/movie/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width="150px"/><br/>
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>

      </main>
    </div>
  )
}