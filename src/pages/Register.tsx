import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as apiClient from "@/react-query/query-api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Tên đăng nhập là bắt buộc",
  }),
  password: z.string().min(1, {
    message: "Mật khẩu là bắt buộc",
  }),
  firstName: z.string().min(1, { message: "Họ không được trống" }),
  lastName: z.string().min(1, { message: "Tên không được trống" }),
  birthDate: z.string(),
  confirmPassword: z.string().min(1, {
    message: "Nhập lại mật khẩu",
  }),
  phoneNumber: z.string().min(1, { message: "Số điện thoại không được trống" }),
  gender: z.string(),
});
const Register = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "false",
      birthDate: "",
    },
  });
  const { mutate: register, isLoading } = useMutation(apiClient.register, {
    onSuccess: async (data: any) => {
      console.log(data);
      toast.success("Đăng ký thành công");
      navigate("/login");
    },
    onError: () => {
      toast.error("Đăng ký thất bại");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    register(values);
  };

  return (
    <div className="bg-bgHaui h-screen  bg-no-repeat ">
      <div className="bg-green-500 max-w-[1200px] mx-auto bg-transparent h-full flex items-center">
        <div className="flex flex-col items-center gap-2 bg-white px-10 py-4 shadow-md rounded-lg">
          <img
            src={`https://cdn-001.haui.edu.vn//img/logo-haui-size.png`}
            alt="logo"
            className="w-16 h-16 object-cover"
          />

          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold mb-3">
              Đại Học Công Nghiệp Hà Nội
            </h1>
            <p>HAUI Social</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 w-full"
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
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Họ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-[1fr_1fr] gap-5">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Sinh nhật" {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex px-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex  gap-10"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel>Nam</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
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
              <Button type="submit" className="w-full">
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
