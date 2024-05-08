import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { CircleMinus, UploadCloud } from "lucide-react";
import ScrollReveal from "scrollreveal";
import { slideUp } from "../utils/animations";

import TitleImage from "../assets/images/meme-title.png";
import { upload } from "../api/api";
import AlertModal from "./AlertModal";

// MB / KB / BYTES
const getMaxSize = (n: number) => n * 1024 * 1024;
const convertBytesToMB = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2) + " MB";
};

const MemeUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<File>>(new Set());

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onOpenChange: onOpenChangeError,
  } = useDisclosure();

  const handleOnInput = async () => {
    if (selectedFiles.size === 0) {
      inputRef.current?.click();
      return;
    }

    const data = new FormData();
    selectedFiles.forEach((file) => data.append("images", file, file.name));

    // Upload
    try {
      setIsLoading(true);
      await upload(data);
      onOpen();

      setSelectedFiles(new Set());
    } catch (error) {
      console.error(error);
      onOpenError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;

    setSelectedFiles(
      (prev) =>
        new Set([
          ...prev,
          ...Array.from(files).filter((file) => file.size <= getMaxSize(4)),
        ])
    );
  };

  const handleRemoveFile = (file: File) => {
    setSelectedFiles((prev) => {
      prev.delete(file);
      return new Set(prev);
    });
  };

  useEffect(() => {
    if (cardRef.current) {
      ScrollReveal().reveal(cardRef.current, slideUp);
    }
  }, []);

  return (
    <section id="meme-upload">
      <AlertModal
        type="success"
        title="File uploaded!"
        description="You will see your meme at the party 🎉"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <AlertModal
        type="error"
        description="There was an error during the upload. Please retry again"
        isOpen={isOpenError}
        onOpenChange={onOpenChangeError}
      />

      <div className="bg-[url('../assets/images/hero-background.png')] bg-no-repeat bg-cover">
        <div className="pt-48 lg:pt-60 pb-36 px-5 max-content-wrapper">
          <Card className="pt-5 pb-7 px-4 transparent-bg" ref={cardRef}>
            <CardHeader className="flex flex-col items-center justify-center text-center p-0">
              <Image src={TitleImage} className="h-[80px]" />
              <h3 className="text-md text-center max-w-[280px]">
                Help us transform the event by sharing your most creative memes!
                <br />
                Be playful!
              </h3>
            </CardHeader>
            <CardBody>
              <input
                ref={inputRef}
                id="upload"
                type="file"
                className="hidden"
                aria-hidden="true"
                accept="image/png, image/jpeg, image/webp, image/gif"
                onChange={handleOnChange}
              />

              {selectedFiles && (
                <ul className="mb-4 flex flex-col gap-2">
                  {Array.from(selectedFiles).map((file) => (
                    <li key={file.name}>
                      <div className="relative">
                        <Input
                          size="sm"
                          type="text"
                          placeholder={file.name}
                          isDisabled
                          description={convertBytesToMB(file.size)}
                          multiple
                        />
                        <div className="absolute right-1 top-1">
                          <button onClick={() => handleRemoveFile(file)}>
                            <CircleMinus className="w-4 hover:text-red-500 transition-all" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <Button
                onPress={handleOnInput}
                color="primary"
                className="max-w-[188px] self-center bg-black rounded-3xl border-1 border-[#FF1BF4] hover:bg-[#FF1BF4] active:bg-[#FF1BF4] shadow-[0_0_15px_3px_rgba(140,17,140,0.6)]"
                isDisabled={isLoading}
              >
                <UploadCloud className="w-4 h-4" />
                <span>
                  {selectedFiles.size > 0 ? "Upload images" : "Select images"}
                </span>
              </Button>
              <p className="text-xs text-center mt-2 text-gray-500">
                Maximum file size: 5MB - JPG / PNG / GIF
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MemeUpload;
