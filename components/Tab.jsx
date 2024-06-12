import axios from "axios"
import dynamic from "next/dynamic"
import { useState } from "react"
import CreateCategory from "./CreateCategory"
import Images from "./Images"
const GridView = dynamic(() => import("@/components/GridView"), { ssr: false })

function Tabs({ categories }) {
  const [activeTab, setActiveTab] = useState(1)
  const [cat, setCat] = useState(categories)

  const handleTabClick = tabIndex => {
    setActiveTab(tabIndex)
  }
  const saveData = _cat => {
    axios.get("/api/posts").then(({ data }) => {
      setCat(data.categories)
    })
  }

  return (
    <div className="p-2">
      <div className="w-full bg-white mx-auto rounded-lg shadow-md">
        <div className="flex border-b border-gray-200">
          <button className={`py-2 px-4 hover:bg-gray-100 focus:outline-none ${activeTab === 1 ? "bg-gray-100" : ""}`} onClick={() => handleTabClick(1)}>
            Category
          </button>
          <button className={`py-2 px-4 hover:bg-gray-100 focus:outline-none ${activeTab === 2 ? "bg-gray-100" : ""}`} onClick={() => handleTabClick(2)}>
            Images
          </button>
        </div>
        <div className="p-4">
          {activeTab === 1 && (
            <>
              <CreateCategory onSubmit={saveData} />
              <GridView {...{ categories: cat, refetch: saveData }} />
            </>
          )}
          {activeTab === 2 && <Images />}
        </div>
      </div>
    </div>
  )
}

export default Tabs
