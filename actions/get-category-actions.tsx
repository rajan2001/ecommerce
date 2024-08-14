"use server"
import axios from "axios"

export const getCatergory = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        return response.data.data

    } catch (error) {
        console.log(error)
        return { error: "featching category" }
    }
}