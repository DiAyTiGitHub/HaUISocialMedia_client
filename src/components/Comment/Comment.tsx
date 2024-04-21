import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useCreateComment } from "@/react-query/comment";
import { useStore } from "@/stores";
import { useState } from "react";
import { toast } from "react-toastify";

export type CreateCommentType = {
  content: string;
  post: {
    id: string;
  };
  repliedComment?: {
    id: string;
  };
};

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Bình luận không được để trống.",
  }),
});
type CommentProps = {
  postId: string;
  repliCommentId?: string;
};
const Comment = ({ postId, repliCommentId }: CommentProps) => {
  const { commentStore } = useStore();
  const { createComment } = commentStore;
  const [isCreateComment, setIsCreateConmment] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let newComment: CreateCommentType;
    if (repliCommentId) {
      newComment = {
        content: values.comment,
        post: {
          id: postId,
        },
        repliedComment: {
          id: repliCommentId,
        },
      };
    } else {
      newComment = {
        content: values.comment,
        post: {
          id: postId,
        },
      };
    }

    try {
      setIsCreateConmment(true);
      await createComment(newComment);
      toast.success("Đã bình luận");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreateConmment(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 flex-1 p-2 space-y-0">
              <Link to="/profile/1" className="profile-photo">
                <img
                  src="/person.jpg"
                  alt="profile-photo"
                  className="rounded-full"
                />
              </Link>
              <FormControl>
                <Input
                  placeholder="Bình luận bài viết..."
                  {...field}
                  className="px-4 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreateComment}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
