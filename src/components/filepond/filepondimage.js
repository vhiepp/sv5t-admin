import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
)

export default function FilePondImage({ onChange, fileUrl }) {
    const [files, setFiles] = useState([]);
    return (
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={0}
            allowFileTypeValidation={1}
            acceptedFileTypes={['image/*']}
            server={{
                url: process.env.REACT_APP_SERVER_DOMAIN,
                timeout: 7000,
                process: {
                    url: '/api/upload?res_filename=true',
                    method: 'POST',
                    withCredentials: false,
                    onload: (response) => {
                        onChange(JSON.parse(response).fileUrl);
                    },
                    onerror: (response) => response.data,
                },
                revert: {
                    url: `/api/upload?fileUrl=${fileUrl}`,
                    method: 'DELETE',
                    withCredentials: false,
                    onload: (response) => {
                        onChange('');
                        setFiles(null);
                    },
                    onerror: (response) => response.data,
                },
            }}
            name="upload"
            labelIdle='Kéo thả hoặc Bấm vào để chọn ảnh nền cho bài viết!'
        />
    )
}