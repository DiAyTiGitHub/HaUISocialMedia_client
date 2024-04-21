import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import fileUpload from "@/assets/file-upload.svg";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string[];
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrls((prev) => [...prev, convertFileToUrl(acceptedFiles[0])]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col  rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrls ? (
        <>
          <div className="flex flex-1 ">
            {fileUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="image"
                className="w-12 h-12 object-cover"
              />
            ))}
          </div>
          <p className="file_uploader-label">Kéo thả vào đây</p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <img src={fileUpload} alt="file upload" />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Kéo thả ảnh ở đây
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Lựa chọn ảnh có sẵn
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
