import { useEffect, useState } from "react";
import { AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      const valA = a[sortBy].toLowerCase();
      const valB = b[sortBy].toLowerCase();
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    setFilteredUsers(filtered);
  }, [search, sortBy, sortOrder, users]);


  // Loading 
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="text-blue-500 text-lg font-semibold">Loading Users...</div>
    </div>
  );
  // Error Handling 
  if (error) return (
    <div className="h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="text-blue-500 text-lg font-semibold">{error}</div>
    </div>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        {/* Search */}
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-3 py-2 rounded bg-white text-black border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Sort by */}
        <div className="flex-1 w-full">
          <div className="flex items-center w-full border px-3 py-2 rounded bg-white border-gray-300 focus-within:ring-2 focus-within:ring-blue-100">
            <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-400 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-transparent text-gray-500 outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>
        </div>

        {/* Order by */}
        <div className="flex-1 w-full">
          <div className="flex items-center w-full border px-3 py-2 rounded bg-white border-gray-300 focus-within:ring-2 focus-within:ring-blue-100">
            <FunnelIcon className="w-4 h-4 text-gray-400 mr-2" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-transparent text-gray-500 outline-none"
            >
              <option value="asc">Order by Ascending</option>
              <option value="desc">Order by Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <h2 className="font-semibold text-lg text-blue-700 hover:underline">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
