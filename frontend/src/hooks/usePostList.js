import { useEffect, useState } from "react";
import { fetchPostList } from "../util/fetchPostList";

function usePostList() {
  const [PostList, setPostList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostList();
        setPostList(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []);

  return { PostList };
}

export { usePostList };
