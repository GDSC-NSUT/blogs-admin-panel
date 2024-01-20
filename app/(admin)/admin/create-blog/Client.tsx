"use client";

// import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "./QuillEditor";

import RightSidebar from "./RightSidebar";
// Dont remove
// @ts-ignore
// import * as commands from "@uiw/react-md-editor/commands";

export default function HomePage({ session }: { session: Session }) {
    const [value, setValue] = useState<string | undefined>(
        "Write something awesome..."
    );
    const [title, setTitle] = useState<string>("");

    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        content: "",
        tagsArr: [] as string[], // Initialize with an empty array
        coverImage: "",
        author: "",
    });

    useEffect(() => {
        if (value) {
            setBlogData({ ...blogData, content: value });
        }
    }, [value]);

    if (typeof window === "undefined") return null;

    return (
        <div className="w-full h-full   grid grid-cols-4 items-start justify-center ">
            <div className="col-span-3">
                <QuillEditor
                    session={session}
                    blogData={blogData}
                    setBlogData={setBlogData}
                    value={value}
                    setValue={setValue}
                />

                <div>
                    {value && (
                        <div className="border   min-h-screen border-red-500   w-full ql-snow">
                            <div
                                className="ql-editor bg-white text-gray-700"
                                dangerouslySetInnerHTML={{
                                    // __html: DOMPurify.sanitize(richHtml),
                                    __html: value,
                                }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-1">
                <RightSidebar blogData={blogData} setBlogData={setBlogData} />
            </div>
        </div>
    );
}
