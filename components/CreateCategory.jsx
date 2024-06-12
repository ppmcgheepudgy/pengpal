import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

export default function CreateCategory({ onSubmit }) {
  const [state, setState] = useState({ title: "", images: "" })

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleCatSubmit = async e => {
    try {
      e.preventDefault()
      const { data } = await axios.post("/api/posts", state)
      toast.success(data.message)
      onSubmit?.(data.categories)
    } catch (error) {}
  }
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-4">Create new category</h1>
      <form onSubmit={handleCatSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            required
            onChange={handleChange}
            value={state.title}
            type="text"
            name="title"
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Select Image:
          </label>
          <input
            required
            onChange={handleChange}
            value={state.images}
            pattern={`^[0-9]+(,[0-9]+)*$`}
            type="text"
            name="images"
            placeholder="Enter image id ex. 1,102,9"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div> */}
        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
