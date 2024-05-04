import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

import { z } from "zod";

import { useStore } from "@/stores";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";

import { handleUploadImage } from "@/lib/utils";

import BackGroupUpload from "./BackGroupUpload";

const formSchema = z.object({
  backGroundImage: z.custom<File[]>(),
});

type Props = {
  backgroundImg?: any;
};

const UpdateBackgroundImgForm = ({ backgroundImg }: Props) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const { postStore } = useStore();
  const { updateBackgroundUser } = postStore;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      backGroundImage: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsUpdating(true);

      const url = await handleUploadImage(values.backGroundImage[0]);
      console.log(url);

      const data = await updateBackgroundUser(url as string);
      toast.success("Đã cập nhật");
      navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="backGroundImage"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <BackGroupUpload
                  fieldChange={field.onChange}
                  mediaUrl={backgroundImg || "/bg-haui.jpg"}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? <Loader /> : "Cập nhật ảnh bìa"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateBackgroundImgForm;
