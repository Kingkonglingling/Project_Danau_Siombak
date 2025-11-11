import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // atau tetap pakai quill/dist/quill.snow.css, dua-duanya ok

const toolbar = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
];

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Tulis deskripsi di sini...",
    className = "",
}) {
    return (
        <div className={className}>
            <ReactQuill
                theme="snow"
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                modules={{ toolbar }}
            />
        </div>
    );
}
