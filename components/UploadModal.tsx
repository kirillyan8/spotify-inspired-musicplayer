import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import uniqid from "uniqid";

import useUploadModal from "@/hooks/modals/useUploadModal";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";

const UploadModal = () => {
  const { isOpen, onClose: closeUploadModal } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = () => {
    reset();
    closeUploadModal();
  };

  // Demo submit
  const onDemoSubmit: SubmitHandler<FieldValues> = (values) => {
    setIsLoading(true);

    const songFile = values?.song[0];
    const imageFile = values?.image[0];
    if (!songFile || !imageFile || !user) {
      return toast.error("No song or image provided");
    }
    setTimeout(() => {
      toast.success("🎉 Song should be created!");
      setIsLoading(true);
      reset();
      closeUploadModal();
    }, 2500);
  };

  // FIXME: Real submit
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values?.song[0];
      const imageFile = values?.image[0];
      const uniqueID = uniqid();

      if (!songFile || !imageFile || !user) {
        return toast.error("No song or image provided");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image");
      }

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }

      const { error } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      toast.success("🎉 Song created!");
      router.refresh();
      reset();
      closeUploadModal();
    } catch (e) {
      toast.error(`Something went wrong.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onDemoSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          error={formState.errors.title?.message as string}
          {...register("title", {
            required: "This field is required",
          })}
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Song creator"
          error={formState.errors.author?.message as string}
          {...register("author", {
            required: "This field is required",
          })}
        />
        <div>
          <label htmlFor="song" className="ml-1">
            Select a song file
          </label>
          <Input
            id="song"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            error={formState.errors.song?.message as string}
            {...register("song", {
              required: "This field is required",
            })}
          />
        </div>
        <div>
          <label htmlFor="image" className="ml-1">
            Select an image file
          </label>
          <Input
            id="image"
            disabled={isLoading}
            type="file"
            accept="image/*"
            error={formState.errors.image?.message as string}
            {...register("image", {
              required: "This field is required",
            })}
          />
        </div>
        <Button
          className="w-full disabled:bg-neutral-500"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Submit a song"}
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
