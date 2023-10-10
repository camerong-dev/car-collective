import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  return (
    <Pagination>
      {Array(pageCount)
        .fill()
        .map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={idx + 1 === currentPage}
            onClick={() => paginate(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
    </Pagination>
  );
}

export default PaginationComponent;
