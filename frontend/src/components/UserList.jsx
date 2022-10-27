import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  const getUserAPI = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:5000/api/users?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    const data = response.data;
    setUsers(data.result);
    setPage(data.page);
    setLimit(data.limit);
    setPages(data.totalPage);
    setRows(data.totalRows);
  }, [keyword, limit, page]);

  useEffect(() => {
    getUserAPI();
  }, [getUserAPI]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(query);
    getUserAPI();
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  placeholder="find something here.."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <table className="table is-striped is-bordered is-fullwidth mt-2 ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {users.length === 0 ? <p>Data tidak ditemukan</p> : ""}
          <p>
            Total rows: {rows} Page: {rows ? page + 1 : 0} of {pages}{" "}
          </p>
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
            key={rows}
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
