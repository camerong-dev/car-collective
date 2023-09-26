import React, { useState } from 'react';

async function usePostList() {
    const [PostList, setPostList] = useState();

    const response = await fetch('https://8000-camerong-dev-car-collect-yhax1lcp0i.us2.codeanyapp.com/api/', { mode: 'cors', method: "GET" });
    const data = await response.json();
    console.log({ data });
    setPostList(data);

    return { PostList };
}

export default { usePostList };