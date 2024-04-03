import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { Pencil } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthProvider";

const formSchema = z.object({
  firstname: z.string().min(1, { message: "Họ không được trống" }),
  lastname: z.string().min(1, { message: "Tên không được trống" }),
  birthDate: z.string(),
  address: z.string().min(1, { message: "Địa chỉ không được trống" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phoneNumber: z.string().min(1, { message: "Số điện thoại không được trống" }),
  avatar: z.custom<File[]>(),
  gender: z.string(),
});

export type UpdateUserForm = z.infer<typeof formSchema>;

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: [],
      phoneNumber: currentUser?.phoneNumber || "",
      firstname: currentUser?.firstName || "",
      lastname: currentUser?.lastName || "",
      birthDate: currentUser?.birthDate || "",
      address: currentUser?.address || "",
      gender: currentUser?.gender || "",
      email: currentUser?.email || "",
    },
  });

  // Handler
  const handleUpdate = async (value: z.infer<typeof formSchema>) => {
    console.log(value);

    // return navigate(`/profile/${currentUser?.id}`);
  };

  return (
    <div className="flex w-full bg-white p-10 ">
      <div className="mx-auto">
        <div className="flex-start gap-3 justify-start w-full ">
          <Pencil />
          <h2 className="text-xl md:h3-bold text-left w-full">
            Chỉnh sửa thông tin cá nhân
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 "
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser?.avatar || "/person.jpg"}
                    />
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="firstname"
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
                name="lastname"
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Địa chỉ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <Button type="button" className="bg-red-500 hover:bg-rose-600">
                Huỷ
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                Cập nhật
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
