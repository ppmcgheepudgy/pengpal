import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Images({}) {
  const [images, setImages] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    axios.get("/api/images").then(({ data }) => {
      setImages(data.images)
    })
  }, [])
  // const refetch = () => {
  //   axios.get("/api/images").then(({ data }) => {
  //     setImages(data.images)
  //   })
  // }
  const items = Array(10000)
    .fill("")
    .map((_, i) => ({ id: i }))
  const itemsPerPage = 200
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentItems = items.slice(firstIndex, lastIndex)

  const handlePageChange = page => {
    setCurrentPage(page)
  }
  const renderPageNumbers = () => {
    const startPage = Math.max(1, currentPage - 3)
    const endPage = Math.min(totalPages, currentPage + 3)

    const pageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button className="bg-blue-700 p-2 m-2 text-white rounded disabled:bg-slate-400" key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}>
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  return (
    <>
      {/* <CreateImage onSubmit={refetch} /> */}

      {images
        ? currentItems.map(item => {
            const img = images.find(d => d.id === item.id)
            return <ImageComponent key={item.id + "image_item"} {...{ image: { id: item.id, ...img } }} />
          })
        : "Loading"}
      <div>
        <button className="bg-blue-700 disabled:bg-slate-400 p-2 m-2 text-white rounded" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {renderPageNumbers()}

        <button
          className="bg-blue-700 disabled:bg-slate-400 p-2 m-2 text-white rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </>
  )
}
function ImageComponent({ image, style }) {
  const [state, setState] = useState({ id: image.id, title: image.title || "", description: image.description || "", url: image.url || "" })

  const handleSave = async e => {
    e.preventDefault()
    try {
      if (!Number(state.id)) {
        if (state.id != "0") return toast.error("Image id not found")
      }
      const { data } = await axios.put(`/api/images`, state)

      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <form id="image-item" onSubmit={handleSave} style={style} className="flex items-center gap-2 flex-wrap md:flex-nowrap">
      <p className="text-lg">{image.id}</p>
      <Image src={`/images/items/${image.id}.webp`} unoptimized alt="" width={20} height={20} className="h-20 w-20" />
      <input
        onChange={handleChange}
        value={state.title}
        type="text"
        name="title"
        placeholder="Enter title"
        className="max-w-xl px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        onChange={handleChange}
        value={state.description}
        type="text"
        name="description"
        placeholder="Enter description"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        onChange={handleChange}
        value={state.url}
        type="text"
        name="url"
        placeholder="Enter url"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">
        Save
      </button>
    </form>
  )
}
