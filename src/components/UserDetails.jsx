import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => setUser(res.data))
            .catch((err) => {
                console.error(err);
                setError("ERROR: User not found");
            });
    }, [id]);

    if (error) return (
        <div className="h-screen flex items-center justify-center bg-gray-20 p-4">
            <div className="text-blue-500 text-lg font-semibold">
                {error}
            </div>
        </div>
    );
    if (!user) return (<div className="h-screen flex flex-col items-center justify-center bg-gray-20">
        <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin" />
        <div className="mt-2 text-sm text-gray-500">Loading user...</div>
    </div>);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-20 text-gray-600 p-4">

            <div className=" bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                <div className="flex items-start justify-center flex-col">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                    <p><strong>Company:</strong> {user.company.name}</p>
                </div>
                <button
                    className="mt-4 bg-blue-400 text-white px-4 py-2 rounded"
                    onClick={() => navigate(-1)}
                >
                    ← Return
                </button>
            </div>
        </div>
    );
}

export default UserDetails;
