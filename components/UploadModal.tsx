"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  // useUploadModal hook
  const uploadModal = useUploadModal();

  // state for loading
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      // reason to put null because these are files not strings
      song: null,
      image: null,
    },
  });

  // create custom on change
  const onChange = (open: boolean) => {
    if (!open) {
      // Reset the form
      // every time we close the modal form is safely get reset
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (vaules) => {
    // Upload to supabase
  };

  return (
    // we have to make this dynamic , don't try to hard code it
    <Modal
      title="Upload a Song"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      OnChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        {/* input for title */}
        {/* always make sure that id and register should be same */}
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />

        {/* input for author */}
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />

        <div>
          <div className="pb-1">Select a song file</div>
          {/* input for song */}
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            // only accept mp3 files
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pb-1">Select an image</div>
          {/* input for image */}
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            // only accept image files
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;

// video start from 2:43:50
