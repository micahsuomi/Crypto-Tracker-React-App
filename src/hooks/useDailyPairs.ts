import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


import { AppState } from '../types'

export default function useDailyPairs() {
  const [data, setData] = useState(Array)
  const dailyPairs = useSelector((state: AppState) => state.cryptos.dailyPairs)

  const [err] = useState(null)

  useEffect(() => {
    setData(dailyPairs)
  }, [dailyPairs])

  return [err, data]
}