import "@/styles/globals.css"
import { sever_url } from "@/utils/constatnts"
import axios from "axios"
import { useLayoutEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

axios.defaults.baseURL = sever_url

export default function App({ Component, pageProps }) {
  useLayoutEffect(() => {
    window.oncontextmenu = function (event) {
      event.preventDefault()
      event.stopPropagation()
      return false
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}
