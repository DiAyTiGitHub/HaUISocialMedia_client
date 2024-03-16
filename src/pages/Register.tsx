import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Tên đăng nhập là bắt buộc",
  }),
  phone: z.string().min(1, {
    message: "Số điện thoại là bắt buộc",
  }),
  class: z.string().min(1, {
    message: "Lớp là bắt buộc",
  }),
  gender: z.enum(["nam", "nữ"], {
    required_error: "Vui lòng chọn giới tính",
  }),
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc",
  }),
  confirmPassword: z.string().min(1, {
    message: "Mật khẩu là bắt buộc",
  }),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "nam",
      class: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-bgHaui h-screen  bg-no-repeat ">
      <div className="bg-green-500 max-padd-container bg-transparent h-full flex items-center">
        <div className="flex flex-col items-center gap-2 bg-white px-10 py-8 shadow-md rounded-lg">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="w-24 h-24 object-cover"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold mb-3">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p>HAUI Social</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Lớp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex  gap-3 border px-3 py-2 rounded-lg flex-1">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center gap-10"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="nam" />
                            </FormControl>
                            <FormLabel>Nam</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="nữ" />
                            </FormControl>
                            <FormLabel>Nữ</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-end mr-5">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-blue-600">
                  Đăng nhập
                </Link>
              </p>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500"
              >
                Đăng Ký
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
