import type { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { FiAlignJustify, FiSearch, FiPlay } from 'react-icons/fi'

type homeProps = {
  pokemons: Pokemon[]
}

type Pokemon = {
  name: string
  url: string
  image: string
}

const Home = ({ pokemons }: homeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta
          name="description"
          content="Blibioteca de informações sobre os pokemons"
        />
        <link rel="icon" href="/assets/pikachu.svg" />
      </Head>
      <section className={styles.container_primary}>
        <header className={styles.header}>
          <button className={styles.button_bar}>
            <FiAlignJustify />
          </button>
          <nav className={styles.navbar}>
            <input
              type="text"
              maxLength={40}
              className={styles.input_search}
              placeholder="Explore o mundo dos pokemons..."
            />
            <button className={styles.button_search}>
              <FiSearch />
            </button>
          </nav>
        </header>
        <article className={styles.group_title}>
          <h1>Pokédex</h1>
          <p>
            lorem ipsum dolor silorem ipsum dolor sitlorem ipsum dolor sitlorem
            ipsum dolord sitlorem ipsum dolor sitlorem ipsum dolor sitlorem
            ipsum dolor sitlorem ipsum dolor sitlorem ipsum dolor sitlorem ipsum
            dolor sitlorem ipsum dolor silorem ipsum dolor sitlorem ipsum dolor
            sitlorem ipsum dolor sitlorem ipsum dolor sitlorem ipsum dolor
            sitlorem ipsum dolor sitlorem ipsum dolor sitlorem ipsum dolor
            sitlorem ipsum dolor sitlorem ipsum dolor sittt
          </p>
          <button>
            <FiPlay />
            Start
          </button>
        </article>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
  const { results } = await response.json()

  const handleReturnIndexToImage = (index: number) => {
    const slug = index.toString().padStart(3, '0')
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${slug}.png`
  }

  const pokemons: Pokemon[] = results.map((pokemon: Pokemon, index: number) => {
    return {
      name: pokemon.name,
      url: pokemon.url,
      image: handleReturnIndexToImage(index + 1)
    }
  })

  return {
    props: {
      pokemons
    }
  }
}
