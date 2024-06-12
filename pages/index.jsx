import Header from "@/components/Header"
import axios from "axios"
import dynamic from "next/dynamic"
const GridView = dynamic(() => import("@/components/GridView"), { ssr: false })

export default function Home({ categories }) {
  return (
    <div>
      <Header />

      <GridView {...{ categories }} />
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await axios("/api/posts")

  // Pass data to the page via props
  return { props: data }
}
