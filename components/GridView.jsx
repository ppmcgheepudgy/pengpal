import axios from "axios"
import { usePathname } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import M from "../public/masonry.pkgd.min"

export default function GridView({ categories, refetch }) {
  useLayoutEffect(() => {
    new M(".grid-container", {
      itemSelector: ".item",
      columnWidth: ".grid-sizer",
    })
  }, [categories])

  return (
    <div className="overflow-hidden">
      <div className="grid-container">
        <div className="grid-sizer" />
        {categories.map(category => (
          <Category key={category.id + "category"} {...{ category, refetch }} />
        ))}
      </div>
      <Tooltip
        id="my-tooltip"
        // clickable
        wrapper="div"></Tooltip>
    </div>
  )
}

function Category({ category, refetch }) {
  const [state, setState] = useState({ images: "" })
  const pathname = usePathname()
  const isAdmin = pathname === "/admin"

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleCatSubmit = async e => {
    try {
      e.preventDefault()
      const { data } = await axios.put("/api/posts", { cat_id: category.id, ...state })
      toast.success(data.message)
      setState({ images: "" })
      refetch?.()
    } catch (error) {}
  }
  const handleDelete = (ci_id, id) => () => {
    if (!confirm("Sure, you want to delete #" + id)) return
    axios
      .delete("/api/images", { data: { ci_id } })
      .then(({ data }) => {
        toast.success(data.message)
        refetch?.()
      })
      .catch(r => {
        console.log(r)
      })
    console.log(ci_id)
  }
  const handleCatDelete = () => {
    if (!confirm("Sure, you want to delete this category " + category.title)) return
    axios
      .delete("/api/posts", { data: { id: category.id } })
      .then(({ data }) => {
        toast.success(data.message)
        refetch?.()
      })
      .catch(r => {
        console.log(r)
      })
  }
  const RenderImage = ({ image }) => {
    if (isAdmin)
      return (
        <div className="relative mb-1 group">
          <div className="inset-0 absolute group-hover:flex hidden rounded bg-black/20 z-10 items-center justify-center">
            <button className="bg-red-500 text-white rounded-full p-1" onClick={handleDelete(image.ci_id, image.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm break-all text-[#26468d] font-bold">
            {isAdmin && `#${image.id} `}
            {image.title} &nbsp;
          </p>
          <img src={`/images/items/${image.id}.webp`} className="w-16 h-16 image-item relative" />
        </div>
      )

    return (
      <a href={image.url || "#"} target="__blank" className="relative mb-1">
        <p className="text-sm break-all text-[#26468d] font-bold">{image.title} &nbsp;</p>
        <img
          data-tooltip-id="my-tooltip"
          data-tooltip-place="top"
          data-tooltip-html={`<div id="tooltip" class="align-center min-w-56 text-left overflow-hidden sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                      <div class="bg-white pt-5 pb-4 sm:pb-4">
                        <label class="font-medium text-gray-800">Title</label>
                        <p class="w-full text-black rounded bg-gray-100 p-2 mt-2 mb-3">${image.title || "N/A"}</p>
                        <label class="font-medium text-gray-800">Description</label>
                        <p class="w-full text-black rounded bg-gray-100 p-2 mt-2 mb-3">${image.description || "N/A"}</p>
                      </div>
                    </div>`}
          data-tooltip-offset={1}
          src={`/images/items/${image.id}.webp`}
          className="w-16 h-16 cursor-pointer image-item relative"
        />
      </a>
    )
  }

  return (
    <div className={`bg-[#268fbe] item`}>
      <div className="bg-[#5f679d] text-center p-2 w-full">
        <p className="font-bold text-white text-xl pb-2 -pt-1 relative">
          {category.title}
          <button className="bg-red-500 text-white rounded-full p-1 absolute top-0 right-0" onClick={handleCatDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </p>

        {isAdmin && (
          <form onSubmit={handleCatSubmit} className="flex items-center gap-1 text-black">
            <div className="mb-4 flex-1">
              <input
                required
                onChange={handleChange}
                value={state.images}
                pattern={`^[0-9]+(,[0-9]+)*$`}
                type="text"
                name="images"
                placeholder="Enter image id ex. 1,102,9"
                className="w-full text-base px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-base hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">
              Add
            </button>
          </form>
        )}

        <div className="flex justify-around flex-wrap bg-white p-1">
          {category.images.length ? (
            category.images.map((image, i) => <RenderImage key={image.id + "image" + category.id + "category" + i} {...{ image }} />)
          ) : (
            <p className="text-black text-sm">No image linked to this category</p>
          )}
        </div>
      </div>
    </div>
  )
}
