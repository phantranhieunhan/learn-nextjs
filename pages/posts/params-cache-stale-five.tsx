import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export interface ParamsPageProps {
    query: any
    post: any
}


export default function ParamsPage({query, post}: ParamsPageProps){
    const router = useRouter()
    const [second, setSeconds] = useState(0)
    
    useEffect(() => {
        const intervalID = setInterval(()=>{
            setSeconds((x) => {
                if (x > 60) clearInterval(intervalID)
                return x + 1
            })
        }, 1000)
        return () => clearInterval(intervalID)
    }, [])
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    context.res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5')
    await new Promise((res) => setTimeout(res, 3000))

    const postId = context.query.postId
    if (!postId) return {
        props: {query: context.query}
    }

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
    const data = await response.json()
    return {
        props: {
            query: context.query,
            post: data,
        }
    }
}
