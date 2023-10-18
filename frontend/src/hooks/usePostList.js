import { useEffect, useState } from "react";
import { fetchPostList } from "../util/fetchPostList";

function usePostList(filters) {
  const [PostList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostList(filters);
        setPostList(data);
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { PostList, isLoading };
}

export { usePostList };
