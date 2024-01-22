"use client";

import {
    useEffect,
    type Dispatch,
    type SetStateAction,
    ChangeEventHandler,
    useState,
    useRef,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { BlogContentType } from "./Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./Quill.css";
import { Button } from "@/components/ui/button";
import slugify from "react-slugify";
import createBlog from "@/app/_actions/createBlog";
import { PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type QuillEditorProps = {
    blogData: BlogContentType;
    setBlogData: Dispatch<SetStateAction<BlogContentType>>;
    value: string | undefined;
    setValue: Dispatch<SetStateAction<string | undefined>>;
};

const QuillEditor = ({
    blogData,
    setBlogData,
    value,
    setValue,
}: QuillEditorProps) => {
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
        // [{ color: [] }, { background: [] }],
        // [{ font: [] }],
        [{ align: [] }],
        ["clean"],
    ];
    const tagInput = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tag, setTag] = useState("");
    const handleAddTag = (tag: string) => {
        setBlogData({ ...blogData, tagsArr: [...blogData.tagsArr, tag] });
        setTag("");
        tagInput.current?.focus();
    };

    const handleRemoveTag = (tag: string) => {
        setBlogData({
            ...blogData,
            tagsArr: blogData.tagsArr.filter((t) => t !== tag),
        });
        tagInput.current?.focus();
    };

    useEffect(() => {
        if (value) {
            // console.log("value is ", value);
            setBlogData({ ...blogData, content: value });
        }
    }, [value]);

    const handleSlug = () => {
        setBlogData({
            ...blogData,
            slug: slugify(blogData.title),
        });
    };

    const formAction = createBlog.bind(null, blogData);

    const handleChange: ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        try {
            setLoading(true);
            const files = event.target.files;
            if (files == null) return;
            const filepath = await toBase64(files[0]);
            setBlogData({
                ...blogData,
                cover_image: filepath,
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     console.log("blogData is ", blogData);
    // }, [blogData]);
    return (
        <form
            action={formAction}
            className="w-full p-2 flex flex-col space-y-3"
        >
            <div className="flex flex-col space-y-3 p-2">
                <Label
                    htmlFor="title"
                    className="min-w-[100px] text-gray-300 text-2xl font-bold"
                >
                    Blog Title
                </Label>
                <Input
                    type="text"
                    name="title"
                    value={blogData?.title}
                    onChange={(e) => {
                        setBlogData({
                            ...blogData,
                            title: e.target.value,
                        });
                    }}
                />
            </div>

            <div className="flex flex-col space-y-2 p-2">
                <Label
                    htmlFor="slug"
                    className="min-w-[100px] text-gray-300 text-xl font-bold"
                >
                    Slug
                </Label>
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        name="slug"
                        value={blogData?.slug}
                        onChange={(e) => {
                            setBlogData({
                                ...blogData,
                                slug: e.target.value,
                            });
                        }}
                    />
                    <Button
                        variant="outline"
                        onClick={handleSlug}
                        type="button"
                        disabled={blogData.title == ""}
                    >
                        Generate Slug
                    </Button>
                </div>
            </div>

            <div className="flex flex-col space-y-2 p-2">
                <Label
                    htmlFor="tags"
                    className="min-w-[100px] text-gray-300 text-xl font-bold"
                >
                    Tags
                </Label>
                <div className="flex flex-col space-y-3">
                    <div className="flex space-x-3">
                        <Input
                            type="text"
                            name="tags"
                            value={tag}
                            ref={tagInput}
                            onChange={(e) => {
                                setTag(e.target.value);
                            }}
                            placeholder="Add tag..."
                            className="w-full"
                        />
                        <Button
                            type="button"
                            onClick={() => {
                                handleAddTag(tag);
                            }}
                            variant="outline"
                        >
                            Add
                        </Button>
                    </div>
                    <div className="p-1 flex flex-wrap">
                        {blogData?.tagsArr?.map((tag, index) => (
                            <Button
                                key={index}
                                type="button"
                                // className='border-[1px] px-2 mx-1 p-[2px] rounded-md border-indigo-400 text-blue-500'
                                variant="secondary"
                                onClick={() => {
                                    handleRemoveTag(tag);
                                }}
                                className="m-1"
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-2">
                <ReactQuill
                    theme="snow"
                    modules={{ toolbar: toolbarOptions }}
                    value={value}
                    onChange={setValue}
                    className="border "
                />
            </div>

            <div className="flex flex-col space-y-2 p-2">
                <Label className="text-lg font-bold">Blog Cover Image :</Label>
                <div className="w-fit relative flex flex-col space-y-2">
                    <Input
                        className="opacity-0 absolute top-0 peer right-0 z-20 w-full h-full  cursor-pointer"
                        accept="image/*"
                        onChange={handleChange}
                        type="file"
                    />
                    {blogData.cover_image == "" ? (
                        <button className="aspect-video w-[400px] border flex items-center justify-center bg-secondary/20 peer-hover:bg-secondary/50 peer-hover:cursor-pointer transition">
                            <PlusIcon />
                        </button>
                    ) : (
                        <>
                            <Image
                                width={400}
                                height={400}
                                src={blogData.cover_image}
                                className="border-2"
                                alt="Cover Image"
                            />
                            <button className="absolute top-2 right-2 z-10 p-2 transition rounded-full bg-white/5 hover:bg-white/25 peer-hover:bg-white/25">
                                <X />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col p-2">
                <SubmitButton loading={loading} />
            </div>
        </form>
    );
};

function SubmitButton({ loading }: { loading: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant="default"
            className="p-10 w-full font-bold text-2xl "
            disabled={pending || loading}
        >
            Update Blog
        </Button>
    );
}

const toBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || "");
        reader.onerror = (error) => reject(error);
    });
};

export default QuillEditor;
