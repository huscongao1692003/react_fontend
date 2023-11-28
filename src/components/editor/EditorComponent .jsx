import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const Quill = dynamic(() => import("react-quill"), {
    ssr: false,
});

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ video: true }],
        ["clean"],
        //[{ script: 'sub' }, { script: 'super' }],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "blockquote",
];

const TextEditor = ({ courseData, setCourseData, setTags, images, setImages }) => {
    const [editorContent, setEditorContent] = useState("");
    const [image, setImage] = useState({
        id: 0,
        file: null,
    })

    function addEventToInputFile() {
        const inputFile = document.querySelector('input[type="file"].ql-image');
        if (inputFile !== null) {
            let id = new Date().getTime();
            setImages([...images, {...image, id: id, file: inputFile.files[0]}]);
            return id;
        }

        return null;
    }

    const handleEditorChange = (content) => {
        setEditorContent(content);
        
        let id = addEventToInputFile();
        if(id !== null) {
            //edit elements
            let element = document.querySelector(".ql-editor");
            let listImg = element.getElementsByTagName("img");
            for(const element of listImg) {
                if(element.id === "") {
                    element.id = id;
                    break;
                }
            }
        }
        //save element to list with purpose is checking
        collectTags();
        //get element after editing
        setCourseData({ ...courseData, body: collectContent() });
    };

    function collectTags() {
        let element = document.querySelector(".ql-editor");
        let listImg = element.getElementsByTagName("img");
        let list = [];
        for(const element of listImg) {
            list.push(parseInt(element.id));
        }
        setTags(list);
    }

    function collectContent() {
        let element = document.querySelector(".ql-editor");
        return element.innerHTML;
    }

    return (
        <Quill
            value={editorContent}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            className="blockquote"
            placeholder="Enter your description here..."
        />
    );
};

export default TextEditor;
