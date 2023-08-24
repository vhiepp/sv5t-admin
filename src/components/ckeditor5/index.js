import { CKEditor } from "@ckeditor/ckeditor5-react";
import EditorCustom from "ckeditor5-custom-build/build/ckeditor";

const editorConfig = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "link",
      "underline",
      "strikethrough",
      "|",
      "alignment",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
    ],
  },
  language: "vi",
  blockToolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "style",
    "|",
    "specialCharacters",
    "subscript",
    "superscript",
    "|",
    "blockQuote",
    "insertTable",
    "todoList",
    "|",
    "numberedList",
    "bulletedList",
    "indent",
    "outdent",
    "|",
    "imageUpload",
    "imageInsert",
    "mediaEmbed",
    "|",
    "horizontalLine",
    "findAndReplace",
    "sourceEditing",
    "removeFormat",
  ],
  image: {
    toolbar: [
      "imageTextAlternative",
      "toggleImageCaption",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"],
  },
};

export default function Editor({ onChange, value }) {
  return (
    <CKEditor
      editor={EditorCustom}
      data={value}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!");
      }}
      config={{
        placeholder: "Soạn nội dung...",
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: `${process.env.REACT_APP_SERVER_DOMAIN}/api/upload`,

          // Define the CKFinder configuration (if necessary).
          options: {
            resourceType: "Images",
          },
        },
        ...editorConfig,
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
