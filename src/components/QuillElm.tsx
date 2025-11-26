import { theme } from "antd";
import { ComponentProps } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
    },
};

const formats = [
    'background', 'bold', 'color', 'font', 'code', 'italic', 'link', 'size', 'strike', 'script', 'underline',
    'blockquote', 'header', 'indent', 'list', 'align', 'direction', 'code-block',
    'image', 'video'
];

type QuillProps = ComponentProps<typeof ReactQuill>;

const QuillElm: React.FC<QuillProps> = ({ placeholder, className, ...rest }) => {

    const {
        token: { colorBorder, colorText, colorBgContainer, borderRadius }
    } = theme.useToken();

    return (
        <>
            <ReactQuill
                theme="snow"
                style={{ borderColor: colorBorder, color: colorText, backgroundColor: colorBgContainer, borderRadius }}
                className={className}
                placeholder={placeholder}
                modules={modules}
                formats={formats}
                {...rest}
            />
        </>
    );
};

export default QuillElm;