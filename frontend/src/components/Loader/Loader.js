import React, { useState, useEffect } from 'react'
import './Loader.scss'

export default function Loader({ delay = 1000 }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  return isLoading ? (
    <div className="loader">
      <span title="Loading" className="loader__circle" />
    </div>
  ) : null
}
