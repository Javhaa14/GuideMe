'use client';
import { Camera } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
type CountryType = {
  name: {
    common: string;
  };
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters. Please enter name',
  }),
  language: z.string().min(2, {
    message: 'language',
  }),
  price: z.string().min(2, {
    message: 'price',
  }),
  about: z.string().min(2, {
    message: 'Please enter info about yourself',
  }),
  photo: z.string({ required_error: 'Must upload image' }),
  social: z.string().min(2, {
    message: 'Please enter a social link',
  }),
  gender: z.string({
    message: 'Select gender to continue',
  }),
  country: z.string({
    message: 'Select country to continue',
  }),
});

export const TouristProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      about: '',
      social: '',
    },
  });
  const [data, setData] = useState<CountryType[]>([]);

  const fetchData = async () => {
    const res = await axios.get(
      `https://restcountries.com/v3.1/all?fields=name`
    );
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [url, setUrl] = useState<string | null>(null);

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(url, 'this');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className="text-[24px] font-bold">Complete your profile page</p>
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Add photo</FormLabel>
              <FormControl>
                <div className="size-[160px] border-[1px] border-dashed rounded-full flex justify-center items-center relative">
                  <Camera />
                  <Input
                    className="size-[160px] rounded-full flex justify-center items-center opacity-0 absolute z-1"
                    type="file"
                    accept="image/*"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      handlePreview(event);
                    }}
                  />
                  {url && (
                    <img
                      className="size-[160px] rounded-full absolute"
                      src={url}
                      alt="Preview"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className=" absolute top-47" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Enter your name here"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" absolute top-17" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem {...field} className="w-full relative">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value || ''}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value={'male'}>male</SelectItem>
                        <SelectItem value={'female'}>female</SelectItem>
                        <SelectItem value={'other'}>other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className=" absolute top-17" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value || ''}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        {data?.map((val, index: number) => {
                          return (
                            <SelectItem key={index} value={val.name.common}>
                              {val.name.common}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className=" absolute top-17" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[40px]"
                    placeholder="language knowledge"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" absolute top-17" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="social"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Social media URL</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Write about yourself here"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" absolute top-17" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>About</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="https://"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" absolute top-17" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
};
