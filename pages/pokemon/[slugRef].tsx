import { useRouter } from 'next/router'

const pokemon = () => {
  const { query } = useRouter()
  const slug = query.slugRef

  return <h1>Hello world {slug}</h1>
}

export default pokemon
