import { useState } from "react"
import { toast } from "react-toastify"

function LoginPage({ onSuccess }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    const isUser = username === process.env.NEXT_PUBLIC_USER_NAME && password === process.env.NEXT_PUBLIC_PASSWORD

    if (!isUser) toast.error("Invalid user")

    onSuccess(isUser)
    sessionStorage.setItem("auth", +isUser)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white md:bg-gray-100">
      <div className="bg-white p-8 rounded-lg md:shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
