import React from "react";
import { profile } from "../../../../../assets/images";
import { Button, Text } from "../../../../global";
import "./styles.css";

interface ImageUploaderProps {
  setUserImage: (input: string) => void;
  close: () => void;
}
export const ImageUploader = ({ setUserImage, close }: ImageUploaderProps) => {
  const [image, setImage] = React.useState<string>("nolink");
  const [error, setError] = React.useState<string>("");
  const imageRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const maxFileSize = 5242880; //means 5MB

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("dragenter", (e) => {
        e.preventDefault();
        containerRef.current?.classList.add("drag-enter");
      });
      containerRef.current.addEventListener("dragleave", (e) => {
        e.preventDefault();
        containerRef.current?.classList.remove("drag-enter");
      });
      containerRef.current.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      containerRef.current.addEventListener("drop", (e) => {
        e.preventDefault();
        containerRef.current?.classList.remove("drag-enter");
        const file = e.dataTransfer?.files[0];
        if (file?.size && file?.size > maxFileSize) {
          // filesize <= 5Mb
          setError("File size too big");
          return;
        } else if (file?.type?.split("/")[0] !== "image") {
          setError("Please select an image file");
          return;
        } else {
          setError("");
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("loadend", () => {
          setImage(String(reader.result));
        });
      });
    }
  }, []);

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleConfirm = (e: any) => {
    e.stopPropagation();
    setUserImage(image);
    close();
  };

  const handleFileSelect = async (e: any) => {
    e.preventDefault();

    const imageFile = e.target.files[0];
    if (imageFile?.size > maxFileSize) {
      setError("File size too big");
      return;
    } else if (imageFile?.type?.split("/")[0] !== "image") {
      setError("Please select an image file");
      return;
    } else {
      setError("");
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("loadend", () => {
      setImage(String(reader.result));
    });
  };

  const windowWidth = window.innerWidth;

  return (
    <div
      className="image-uploader-main"
      ref={containerRef}
      onClick={handleClick}
    >
      <img
        src={image}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = String(profile);
        }}
      />
      <Text varient="header3">Select Image</Text>
      <Text faded>
        {windowWidth > 600
          ? "Drag-and-drop or click to upload an image"
          : "Tap to select an image from your device"}
      </Text>
      {error ? <Text className="error">{error}</Text> : null}
      {image !== "nolink" ? (
        <Button
          color="accent2"
          style={{ pointerEvents: "all" }}
          onClick={(e) => handleConfirm(e)}
        >
          Done
        </Button>
      ) : null}
      <input
        style={{ display: "none" }}
        ref={imageRef}
        onChange={handleFileSelect}
        type="file"
        accept="image/*"
      />
    </div>
  );
};
