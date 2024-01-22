"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Table = ({ blogs }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedBlogs, setSelectedBlogs] = useState([]);

    console.log("blogs", blogs);

    const handleEditBlog = (id) => {
        window.location.href = `/admin/edit-blog/?id=${id}`;
    };

    const handleVerifyBlog = (selectedBlogs) => {
        console.log("following blogs will be verified", selectedBlogs);
    };
    const handleDeleteBlog = (selectedBlogs) => {
        console.log("following blogs will be deleted", selectedBlogs);
    };
    return (
        <div
            className="relative p-2 overflow-x-auto shadow-md sm:rounded-lg"
            style={{
                background: "#111827",
                minHeight: "calc(100vh - 4rem)",
            }}
        >
            <div className="m-1 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4    bg-gray-900">
                <div
                    className=" "
                    onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                    }}
                >
                    <button
                        data-dropdown-toggle="dropdownAction"
                        className="py-2 inline-flex items-center     border   focus:outline-none  focus:ring-4  font-medium rounded-lg text-sm px-3  bg-gray-800  text-gray-400  border-gray-600  hover:bg-gray-700  hover:border-gray-600  focus:ring-gray-700"
                        type="button"
                    >
                        Action
                        <ChevronDown />
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div
                            id="dropdownAction"
                            className=" absolute z-10    divide-y   rounded-lg shadow w-44   border border-white  divide-gray-600"
                            style={{
                                background: "#1F2937",
                            }}
                        >
                            <ul
                                className="py-1 text-sm    text-gray-200"
                                aria-labelledby="dropdownActionButton"
                            >
                                <li>
                                    <button
                                        className="block px-4 py-2   hover:bg-gray-600 w-full text-left hover:text-white"
                                        onClick={() => {
                                            handleVerifyBlog(selectedBlogs);
                                        }}
                                    >
                                        Verify Blog
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-2 w-full text-left  hover:bg-gray-600  hover:text-white"
                                        onClick={() => {
                                            handleDeleteBlog(selectedBlogs);
                                        }}
                                    >
                                        Delete Post
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right   text-gray-400">
                <thead
                    className="text-xs text-white uppercase"
                    style={{ background: "#374151" }}
                >
                    <tr className="text-white">
                        <th
                            scope="col"
                            className="p-4 "
                            style={{ textAlign: "left" }}
                        >
                            actions
                        </th>
                        <th
                            scope="col"
                            className=" py-3 max-w-[250px]   text-left    "
                            // style={{ textAlign: "left" }}
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className=" px-6  py-3 text-left"
                            style={{ textAlign: "left" }}
                        >
                            author
                        </th>
                        <th
                            scope="col"
                            className="   px-6 py-3 text-left"
                            style={{ textAlign: "left" }}
                        >
                            tags
                        </th>
                        <th
                            scope="col"
                            className="  pl-6 py-3 text-left max-w-[100px]  "
                            style={{ textAlign: "left" }}
                        >
                            created at
                        </th>
                        <th
                            scope="col"
                            className=" px-6 py-3 text-left"
                            style={{ textAlign: "left" }}
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className=" px-6 py-3 text-left"
                            style={{ textAlign: "left" }}
                        >
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => (
                        <tr
                            className="hover:bg-gray-50 "
                            style={{
                                textAlign: "left",
                                background: "#1F2937",
                                borderBottom: "1px solid #374151",
                            }}
                            key={blog?.id}
                        >
                            <td className="w-4 p-4 flex text-left tjustify-start gap-2 ">
                                <span>{index + 1}.</span>
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100   rounded focus:ring-blue-500 focus:ring-2"
                                        onChange={() => {
                                            setSelectedBlogs([
                                                ...selectedBlogs,
                                                blog?.id,
                                            ]);
                                        }}
                                    />
                                </div>
                            </td>
                            <th
                                scope="row"
                                className=" py-4 font-medium text-gray-200 text-wrap    text-left    max-w-[250px] text-ellipsis"
                            >
                                {blog?.title}
                            </th>
                            <td className="px-6 py-4 text-left">
                                {blog?.author}
                            </td>
                            <td
                                className="px-6 py-4 text-left     overflow-hidden "
                                style={{
                                    padding: "0rem",
                                    maxWidth: "120px",
                                }}
                            >
                                {blog?.tagsArr
                                    ?.slice(0, 2)
                                    .map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block  text-blue-500 border  border-blue-600 px-2 py-1 mr-2 mb-2 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}

                                {blog?.tagsArr?.length > 2 && (
                                    <span className="inline-block bg-blue-300 text-blue-800 px-2 py-1 ml-2 mb-2 rounded">
                                        ( +{blog.tagsArr.length - 2} more)
                                    </span>
                                )}
                            </td>

                            <td className="pl-6 py-4 text-left    max-w-[100px] ">
                                {
                                    new Date(blog?.created_at.split("T")[0])
                                        .toISOString()
                                        .split("T")[0]
                                }
                            </td>
                            <td className="px-6 py-4 text-left ">
                                <p className="font-medium text-green-500 hover:underline">
                                    Verified
                                </p>
                            </td>
                            <td className="px-6 py-4 text-left">
                                <button
                                    className="font-medium text-blue-500 hover:underline"
                                    onClick={() => {
                                        handleEditBlog(blog?.id);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
