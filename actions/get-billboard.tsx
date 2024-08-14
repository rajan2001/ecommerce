"use server"
import axios from "axios"

export const getbillBoard = async (id: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/billboards/${id}`)
        return response.data.data

    } catch (error) {
        console.log(error)
        return { error: "featching category" }
    }
}