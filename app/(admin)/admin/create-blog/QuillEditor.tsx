"use client";

import { useState, useEffect } from "react";
import createBlog from "@/app/_actions/createBlog";
import dynamic from "next/dynamic";
// import { Session } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretUp,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
    // session: Session;
    blogData: {
        title: string;
        description: string;
        content: string;
        tagsArr: string[];
        coverImage: string;
        author: string;
    };
    setBlogData: any;
    value: any;
    setValue: any;
}

const QuillEditor = ({
    blogData,
    setBlogData,
    value,
    setValue,
}: QuillEditorProps) => {
    if (typeof window === "undefined") return null;

    // const [title, setTitle] = useState<string>("");
    const [toggleHeader, setToggleHeader] = useState<boolean>(true);

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],

        ["clean"],
    ];

    const handleToggleHeader = () => {
        console.log("toggle header", !toggleHeader);
        setToggleHeader(!toggleHeader);
    };
    useEffect(() => {
        if (value) {
            console.log("value is ", value);
            setBlogData({ ...blogData, content: value });
        }
    }, [value]);

    return (
        <div className="w-full p-2 text-gray-700">
            <div className="border p-1 mb-2">
                <div className="flex justify-between items-center">
                    {!toggleHeader ? (
                        <p>Show Title and Description</p>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                    <button
                        className="  text-white"
                        onClick={handleToggleHeader}
                    >
                        {/* toggle */}
                        <FontAwesomeIcon
                            icon={toggleHeader ? faCaretUp : faCaretDown}
                            className="text-3xl mr-5"
                        />
                    </button>
                </div>
                <div
                    className={`toggle-section overflow-hidden content transition-opacity${
                        toggleHeader
                            ? "block"
                            : "max-h-0 transition-max-height ease-in opacity-0 hidden"
                    }`}
                >
                    <div>
                        <label
                            htmlFor="title"
                            className="min-w-[100px] text-gray-300"
                        >
                            Blog Title
                        </label>
                        <input
                            type="text"
                            value={blogData?.title}
                            onChange={(e) => {
                                setBlogData({
                                    ...blogData,
                                    title: e.target.value,
                                });
                            }}
                            className="border-[1px] border-gray-500 w-full p-2 mb-4 font-bold text-xl"
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="text-gray-300">
                            Excerpt/ description
                        </label>
                        <textarea
                            value={blogData?.description}
                            onChange={(e) => {
                                setBlogData({
                                    ...blogData,
                                    description: e.target.value,
                                });
                            }}
                            className="border-[1px] border-gray-500 w-full p-2 mb-5 text-md  "
                        />
                    </div>
                </div>
            </div>
            <ReactQuill
                theme="snow"
                modules={{
                    toolbar: toolbarOptions,
                }}
                value={value}
                onChange={setValue}
                className=" w-full h-[500px] bg-white text-black   overflow-scroll"
            />
        </div>
    );
};

export default QuillEditor;
