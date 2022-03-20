import type { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
  FiSearch,
  FiPlay,
  FiGlobe,
  FiInstagram,
  FiGithub,
  FiLinkedin
} from 'react-icons/fi'
import Link from 'next/link'

type homeProps = {
  pokemons: Pokemon[]
}

type Pokemon = {
  name: string
  slugRef: string
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
          <nav className={styles.navbar}>
            <input
              tabIndex={1}
              aria-describedby="Input to type the name of the pokemon you want to search"
              type="text"
              maxLength={40}
              className={styles.input_search}
              name="name"
              placeholder="Explore o mundo dos pokemons..."
            />
            <button
              className={styles.button_search}
              tabIndex={2}
              aria-label="Search"
              aria-describedby="Click this button to search for the typed pokemon"
            >
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
          <button
            tabIndex={3}
            aria-label="Start"
            aria-describedby="Click this button to explore the amazing world of pokemons on this site"
          >
            <FiPlay />
            Start
          </button>
        </article>
      </section>
      <main className={styles.content_card_pokemons}>
        {pokemons &&
          pokemons.map((pokemon: Pokemon, index: number) => {
            return (
              <Link href={`/pokemon/${pokemon.slugRef}`} key={index.toString()}>
                <a tabIndex={3 + index} data-message="">
                  <p>{pokemon.name}</p>
                  <img src={pokemon.image} />
                </a>
              </Link>
            )
          })}
      </main>
      <footer>
        <a href="" aria->
          <FiGlobe />
        </a>
        <a href="">
          <FiInstagram />
        </a>
        <a href="">
          <FiGithub />
        </a>
        <a href="">
          <FiLinkedin />
        </a>
        <p>Copyright &copy; | Desenvolvido por Fabiano Pereira</p>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
  const { results } = await response.json()

  const handleReturnIndexAndUrlToImage = (name: string, index: number) => {
    const slug = index.toString().padStart(3, '0')
    return {
      name,
      image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${slug}.png`,
      slugRef: index
    }
  }

  const pokemons: Pokemon[] = results.map((pokemon: Pokemon, index: number) =>
    handleReturnIndexAndUrlToImage(pokemon.name, index + 1)
  )

  return {
    props: {
      pokemons
    }
  }
}
