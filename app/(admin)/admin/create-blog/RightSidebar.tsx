import { useState, useEffect } from "react";
import Image from "next/image";

interface QuillEditorProps {
    blogData: {
        title: string;
        description: string;
        content: string;
        tagsArr: string[];
        coverImage: string;
        author: string;
    };
    setBlogData: any;
}
const RightSidebar = ({ blogData, setBlogData }: QuillEditorProps) => {
    const [coverImage, setCoverImage] = useState<string>("");
    const [tag, setTag] = useState("");
    const handleAddTag = (tag: string) => {
        setBlogData({ ...blogData, tagsArr: [...blogData.tagsArr, tag] });
        setTag("");
    };

    const handleRemoveTag = (tag: string) => {
        setBlogData({
            ...blogData,
            tagsArr: blogData.tagsArr.filter((t) => t !== tag),
        });
    };

    const handleSubmit = async () => {
        // console.log("value is ", value);
        // const { error } = await createBlog(title, value!, session.user.id);
        // if (error) alert(error);
        // else router.push("/blogs");
    };

    useEffect(() => {
        setBlogData({
            ...blogData,
            coverImage: coverImage,
        });
    }, [coverImage]);
    return (
        <div className="   h-full border-[1px] border-gray-600 shadow-md p-2 bg-gray-900 items-start  justify-start w-full">
            <div>
                <h1 className="font-bold text-gray-300  py-2 text-xl">
                    Blog Information
                </h1>
                icon
            </div>
            <hr />
            <div>
                <div>
                    <label
                        className="block mt-5 mb-1  font-medium text-gray-300  "
                        htmlFor="file_input"
                    >
                        Cover Image
                    </label>
                    {coverImage && (
                        <Image
                            loader={() => coverImage}
                            src={coverImage}
                            // src={"/img.png"}
                            width={300}
                            height={200}
                            alt="cover image"
                        ></Image>
                    )}

                    <input
                        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 "
                        id="file_input"
                        type="file"
                        accept="image/*"
                        value={coverImage}
                        onChange={(e) => {
                            setCoverImage(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label
                        className="block mt-5 mb-1  font-medium text-gray-300  "
                        htmlFor="file_input"
                    >
                        Author
                    </label>

                    <input
                        type="text"
                        value={blogData?.author}
                        className="w-full rounded-sm border-gray-300 shadow-md   p-1 font-semibold"
                        onChange={(e) => {
                            setBlogData({
                                ...blogData,
                                author: e.target.value,
                            });
                        }}
                    />
                </div>
                <div>
                    <label
                        className="block mt-5 mb-1  font-medium text-gray-300  "
                        htmlFor="file_input"
                    >
                        Tags
                    </label>

                    <div className="grid grid-cols-6 gap-1">
                        <input
                            type="text"
                            value={tag}
                            className=" rounded-sm border-gray-300 shadow-md   p-1 font-semibold col-span-4"
                            onChange={(e) => {
                                setTag(e.target.value);
                            }}
                            placeholder="add tag..."
                        />
                        <button
                            className="col-span-2 rounded-md hover:bg-green-700 bg-green-500"
                            onClick={() => {
                                handleAddTag(tag);
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="p-1 text-gray-300 rounded-sm my-1">
                        {blogData?.tagsArr.map((tag, index) => (
                            <span
                                key={index}
                                className="border-[1px] px-2 mx-1 p-[2px] rounded-md border-indigo-400 text-blue-500"
                                onClick={() => {
                                    handleRemoveTag(tag);
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="  ml-3 mt-10 hover:bg-green-700 bg-green-500 px-3 py-1 rounded-sm"
                onClick={() => {
                    console.log("blogData is: ", blogData);
                    handleSubmit();
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default RightSidebar;
