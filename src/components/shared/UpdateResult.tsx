import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useGetAllCourseResult,
  useGetAllCourses,
} from "@/react-query/result-course";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

export type CreatePostType = {
  idCourse: String;
  idCourseResult: String;
};

const formSchema = z.object({
  idCourse: z.string({
    required_error: "Chọn môn học",
  }),
  idCourseResult: z.string({
    required_error: "Chọn kết quả học tập",
  }),
});

type PostFormProps = {
  children: ReactNode;
};

const UpdateResult = ({ children }: PostFormProps) => {
  const { data: courses, isLoading: isGetCourseLoading } = useGetAllCourses();
  const { data: courseResults, isLoading: isGetCourseResultsLoading } =
    useGetAllCourseResult();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  if (courses === null) alert("co loi");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[50%] h-[40vh] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between "
          >
            <p className="text-body-medium mb-10">Chia sẻ kết quả học tập</p>
            <div className="flex justify-center gap-20">
              <FormField
                control={form.control}
                name="idCourse"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Môn học</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[300px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? courses?.find(
                                  (course) => course.id === field.value
                                )?.name
                              : "Lựa chọn môn học"}

                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="flex-start w-[300px] p-0 bg-white">
                        <Command>
                          <CommandInput
                            placeholder="Tìm môn học..."
                            className="h-9"
                          />
                          <CommandEmpty>Không có môn học nào.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {courses?.map((course) => (
                                <CommandItem
                                  value={course?.id}
                                  key={course?.id}
                                  onSelect={() => {
                                    form.setValue("idCourse", course?.id);
                                  }}
                                >
                                  {course.code} - {course?.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      course?.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idCourseResult"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Kết quả học tập</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[300px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? courseResults?.find(
                                  (courseResult) =>
                                    courseResult.id === field.value
                                )?.name
                              : "Lựa chọn môn học"}

                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="flex-start w-[300px] p-0 bg-white">
                        <Command>
                          <CommandInput
                            placeholder="Tìm môn học..."
                            className="h-9"
                          />
                          <CommandEmpty>Không có môn học nào.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {courseResults?.map((courseResult) => (
                                <CommandItem
                                  value={courseResult?.id}
                                  key={courseResult?.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "idCourseResult",
                                      courseResult?.id
                                    );
                                  }}
                                >
                                  {courseResult.code} - {courseResult?.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      courseResult?.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-96 self-center">Cập nhật</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateResult;
