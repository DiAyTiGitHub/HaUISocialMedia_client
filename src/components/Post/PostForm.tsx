import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { IPost } from "@/types";
import { useStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { handleUploadImage } from "@/lib/utils";

export type CreatePostType = {
  content: string;
  images: any[];
};

const formSchema = z.object({
  content: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
});

type PostFormProps = {
  children: ReactNode;
  post?: IPost;
};

const PostForm = ({ children, post }: PostFormProps) => {
  const images = post && post?.images.map((i) => i.image);
  //console.log(images);
  const { postStore } = useStore();
  const { createPost, updatePost } = postStore;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post?.content || "",
      file: [],
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      let images = [];
      let imgItem = {
        image: "",
        description: "",
      };

      let url;

      console.log(values.file.length);
      if (post) {
        if (images.length + values.file.length > 6) {
          toast.warning("Bạn đã đăng quá số ảnh cho phép");
          return;
        }
      } else if (values.file.length > 6) {
        toast.warning("Bạn đã đăng quá số ảnh cho phép");
        return;
      }
      for (let i = 0; i < values.file.length; i++) {
        if (values.file[i]) {
          url = await handleUploadImage(values.file[i]);
          imgItem = { ...imgItem, image: url as string };
          images.push(imgItem);
        }
      }
      //console.log(images);
      if (post && values.file.length > 0) images = [...post.images, images];

      const newPost: CreatePostType = {
        content: values.content,
        images: images,
      };

      if (post) {
        await updatePost({
          ...post,
          content: values.content,
          images: images,
        });
        toast.success("Đã cập nhật bài viết");
        setTimeout(() => {
          navigate(0);
        }, 500);
      } else {
        await createPost(newPost);
        setTimeout(() => {
          toast.success("Đã tạo bài viết");
        }, 500);
        navigate(0);
      }
    } catch (error) {
      console.log("[Create_Post]", error);
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mt-10 min-w-[1024px] overflow-y-auto ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-9 w-full"
          >
            <DialogHeader>
              <DialogTitle>Tạo bài viết</DialogTitle>
              <DialogDescription>
                Hãy chia sẽ suy nghĩ,tâm trạng của bạn hôm nay đến với mọi người
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-8">
              <div className="flex flex-1 flex-col gap-5">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thêm ảnh</FormLabel>
                      <FormControl>
                        <FileUploader
                          fieldChange={field.onChange}
                          mediaUrl={images || []}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Đang tạo..." : "Tạo bài viết "}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;