import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "@/react-query/query-api";
import { useMutation } from "react-query";
import { checkJWt } from "@/lib/utils";
import { memo } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Tên đăng nhập là bắt buộc",
  }),
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc",
  }),
});
export type LoginForm = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //old login logic written by Thanh Thuan
  // const mutation = useMutation(apiClient.signIn, {
  //   onSuccess: async (data: any) => {
  //     const claim = checkJWt(data?.accessToken);
  //     //console.log(claim);
  //     if (claim.scope === "USER") {
  //       localStorage.setItem("token", data.accessToken);
  //       localStorage.setItem("user", JSON.stringify(data.loggedInUser));

  //       toast.success("Đăng nhập thành công");
  //       window.location.href = "/";
  //       navigate("/");
  //     } else {
  //       toast.error("Không có quyền truy cập");
  //     }
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //     toast.error("Đăng nhập thất bại");
  //   },
  // });
  // const onSubmit = (values: LoginForm) => {
  //   mutation.mutate(values);
  // };


  const { authStore } = useStore();
  const { authenticateUser } = authStore;
  //login V2 written by diayti
  async function handleLoginV2(values: LoginForm) {
    try {
      await authenticateUser(values);
      navigate("/");
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-bgHaui h-screen ">
      <div className="bg-green-500 max-w-[1200px] mx-auto bg-transparent h-full flex items-center">
        <div className="flex flex-col items-center gap-5 bg-white p-16 shadow-md rounded-lg">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="w-24 h-24 object-cover"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-5 ">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p>HAUI Social</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginV2)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Tên đăng nhập" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-end mr-5">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-blue-600">
                  Đăng ký
                </Link>
              </p>
              <Button type="submit" className="w-full">
                Đăng Nhập
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default memo(observer(Login));
