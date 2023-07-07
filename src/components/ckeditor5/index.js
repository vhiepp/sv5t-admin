import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default function Editor({ onChange, value }) {

    return (
        <CKEditor
            editor={BalloonEditor}
            data={value}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!');
            }}

            config={{
                placeholder: "Soạn nội dung...",
                ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl: `${process.env.REACT_APP_SERVER_DOMAIN}/api/upload`,
                    // Define the CKFinder configuration (if necessary).
                    options: {
                        resourceType: 'Images'
                    }
                },
                toolbar: {
                    items: [
                        'bold',
                        'italic',
                        'link'
                    ]
                },
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange({ data }.data);
            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}
        />
    );

}