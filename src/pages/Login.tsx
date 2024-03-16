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

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Tên đăng nhập là bắt buộc",
  }),
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate("/");
    window.location.href = "/";
  }

  return (
    <div className="bg-bgHaui h-screen ">
      <div className="bg-green-500 max-padd-container bg-transparent h-full flex items-center">
        <div className="flex flex-col items-center gap-5 bg-white p-16 shadow-md rounded-lg">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="w-24 h-24 object-cover"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-5">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p>HAUI Social</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                Đăng Nhập
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
