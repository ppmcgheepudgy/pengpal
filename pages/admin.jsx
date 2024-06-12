import Header from "@/components/Header"
import Tab from "@/components/Tab"
import LoginPage from "@/components/login"
import axios from "axios"
import { useLayoutEffect, useState } from "react"

export default function Admin(props) {
  const [auth, setAuth] = useState(null)

  useLayoutEffect(() => {
    setAuth(sessionStorage.getItem("auth") === "1")
  }, [])

  if (!auth) return <LoginPage onSuccess={setAuth} />
  return (
    <div className="">
      <Header />

      <Tab {...props} />
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const { data } = await axios("/api/posts")

  // Pass data to the page via props
  return { props: data }
}
