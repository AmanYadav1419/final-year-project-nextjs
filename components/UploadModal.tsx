"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

const UploadModal = () => {
  // useUploadModal hook
  const uploadModal = useUploadModal();

  // import user info
  const { user } = useUser();

  // to use supbaseclient
  const supabaseClient = useSupabaseClient();
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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Upload to supabase
    // try catch block for safer exection of function
    try {
      setIsLoading(true);

      // extract image files
      // why [0] because it should take the first file
      const imageFile = values.image?.[0];
      // extract song files
      // why [0] because it should take the first file
      const songFile = values.song?.[0];

      // if we doesn't have any of these return error
      if (!imageFile || !songFile || !user) {
        toast.error("Missing Feilds");
        // and last return entire thing so this don't go any further
        return;
      }

      // define unique id to safely store/upload the song and use in supabase bucket
      const uniqueID = uniqid();

      // uplaod songs
      const {
        // we have to remap data and error to understand better
        data: songData,
        error: songError,
      } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

        // if any error occured while uploading song
        if(songError){
          // make loading stop to break the function
          setIsLoading(false);
          toast.error("Failed Song Upload");
        }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
