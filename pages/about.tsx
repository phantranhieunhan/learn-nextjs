// import dynamic from "next/dynamic";
// import Header from "@/components/common/header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// case want to render on client side <only></only>
const Header = dynamic(() => import('@/components/common/header'), {
    ssr: false
})

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();

  console.log('About query: ', router.query)
  const page = router.query?.page

  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [page]); // when page var change, so call useEffect again

  function handleNextClick(){
    router.push({
      pathname: '/about',
      query: {
        page: Number(page) || 1 + 1
      },
    },
    undefined,
    { shallow: true }
    )
  }
  return (
    <div>
      <h1>About Page</h1>
      <Header />

      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next page</button>
    </div>
  );
}

export async function getStaticProps(){
  console.log('get static props')
  return {
    props: {}
  }
}