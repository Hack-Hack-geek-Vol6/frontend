import api from '@/api/$api'
import { Db_TechTags } from '@/api/@types'
import axios from 'axios'
import { useState } from 'react'
import aspida from '@aspida/axios'

export const useTechTags = () => {
  const [techTags, setTechTags] = useState<Db_TechTags[]>([])
  const handleFetchTechTags = async () => {
    const client = api(
      aspida(axios, { baseURL: process.env.NEXT_PUBLIC_API_URL }),
    )
    const response = await client.tech_tags
      .get()
      .then((response) => console.log(response))
    const data = await response
    return data
  }
  return { techTags, handleFetchTechTags }
}
