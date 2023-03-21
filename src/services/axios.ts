import axios from "axios"
import { destroyCookie, parseCookies } from "nookies"

const { "user_token": token } = parseCookies()

export const api = axios.create({
    baseURL: "https://hub-backend-eight.vercel.app"
})

if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`
}

api.interceptors.response.use((response) => {
    if (response.data.message === "Invalid Token => jwt expired") {
        destroyCookie(undefined, "user_token")
        window.location.href = "/"
    }

    return response
})