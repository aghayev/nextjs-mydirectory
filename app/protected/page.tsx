'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './layout.module.css'

function ProtectedPage() {
  const [statusText, setStatusText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault() // Prevent default form submission

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (!response.ok) {
        setStatusText(response.statusText)
        setTimeout(() => {
          setStatusText('')
        },2000)
        throw new Error('Login failed')
      }

    router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.inputText} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputText} required />
        </label>
        <br />
        <button type="submit">Log In</button>
        <br />
        <span className={styles.errorMsg}>{statusText}</span>
      </form>
    </div>
  )
}

export default ProtectedPage