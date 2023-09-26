import React, { useEffect, useState } from "react";
import { fetchPostList } from "../util/fetchPostList";

function usePostList() {
  const [PostList, setPostList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostList();
        setPostList(data);
      } catch (error) {
        console.error("it's fucked mate", error);
      }
    };

    fetchData();
  }, []);

  return { PostList };
}

export { usePostList };
