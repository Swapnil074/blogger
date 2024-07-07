import { useEffect, useState } from "react"
import axios from "axios";
import { DATABASE_URL } from "../config.ts";


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const token='Bearer '+localStorage.getItem("token")
    console.log(token)
    useEffect(() => {
        axios.get(`${DATABASE_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log(response)
                setBlog(response.data);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const token='Bearer '+localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${DATABASE_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log(response)
                setBlogs(response.data);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}