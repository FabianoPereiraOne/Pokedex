import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        <html lang="pt-BR" />
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
              placeholder="Explore o incrivel mundo dos pokemons..."
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
            A Origem do Universo Pokémon. No início do universo existiu um ovo,
            e deste ovo nasceu Arceus, o Pokémon Alpha. Por viver em solidão,
            ele decidiu criar mais 3 pokémon: Dialga, para controlar o tempo,
            Palkia para controlar o espaço e Giratina para levar a alma dos
            Pokémon mortos para o Mundo Inferior, ou a antimatéria. Após a
            criação do universo, Arceus criou mais três pokémons para a criação
            do ser humano: Azelf, Uxie e Mesprit, todos criados do mesmo ovo.
            Azelf deu a eles a força, Uxie deu a sabedoria, e Mesprit deu os
            sentimentos.
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
              <Link href="/#/" key={index.toString()}>
                <a
                  tabIndex={3 + index}
                  aria-label={`Click this link to access more pokemon information ${pokemon.name}.`}
                >
                  <p>{pokemon.name}</p>
                  <Image
                    src={pokemon.image}
                    blurDataURL={pokemon.image}
                    alt={`Imagem do pokemon ${pokemon.name}`}
                    width={200}
                    height={200}
                    placeholder="blur"
                  />
                </a>
              </Link>
            )
          })}
      </main>
      <footer className={styles.footer}>
        <div className={styles.group_social_media}>
          <a
            href="https://portifolio-fabianopereiraone.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <FiGlobe />
          </a>
          <a
            href="https://www.instagram.com/fabiano_pereira.s/"
            target="_blank"
            rel="noreferrer"
          >
            <FiInstagram />
          </a>
          <a
            href="https://github.com/FabianoPereiraOne"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/fabiano-pereireira-one/"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin />
          </a>
        </div>
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
    },
    revalidate: 60 * 60 * 5
  }
}
