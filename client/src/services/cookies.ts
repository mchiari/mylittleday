import { cookies } from "next/headers"

export const getCookie = async (cookie: string) => {
    const data = await cookies().get(cookie)
    return data
}