// import dynamic from "next/dynamic";
import Header from "@/components/common/header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// case want to render on client side only
// const Header = dynamic(() => import('@/components/common/header'), {
//     ssr: false
// })

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();

  console.log("About query: ", router.query);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://js-post-api.herokuapp.com/api/posts?_page=1"
      );
      const data = await response.json();
      setPostList(data.data);
    })();
  }, []);
  return (
    <div>
      <h1>About Page</h1>
      <Header />

      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
