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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Checkbox } from '@/components/ui/checkbox';

type CountryType = {
  name: {
    common: string;
  };
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  language: z.string().min(2, {
    message: 'Please enter language',
  }),
  price: z.string().min(1, {
    message: 'Please enter a price',
  }),
  about: z.string().min(2, {
    message: 'Please enter info about yourself',
  }),
  photo: z
    .instanceof(File, { message: 'Must upload an image file' })
    .nullable(),
  social: z.string().min(2, {
    message: 'Please enter a social link',
  }),
  gender: z.string({
    message: 'Select gender to continue',
  }),
  country: z.string({
    message: 'Select country to continue',
  }),
  activities: z.string().optional(),
  car: z.boolean().default(false),
});

export function Profile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      about: '',
      social: '',
      language: '',
      price: '',
      gender: '',
      country: '',
      activities: '',
      car: false,
      photo: null,
    },
  });

  const [data, setData] = useState<CountryType[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({});

  const fetchData = async () => {
    const res = await axios.get(
      `https://restcountries.com/v3.1/all?fields=name`
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createGuideProfile(values);
  }
  const createGuideProfile = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/GuideProfile`,
        {
          socialAddress: values.social,
          profile: 'GProfile',
          name: values.username,
          gender: values.gender,
          country: values.country,
          language: values.language,
          about: values.about,
          activities: values.activities,
          photoUrl: 'url',
          price: values.price,
          car: values.car,
        }
      );

      console.log('Success', res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('Form Errors:', form.formState.errors);

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
                    className="size-[160px] rounded-full absolute opacity-0 z-1"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        handlePreview(event);
                      }
                    }}
                  />
                  {url && (
                    <img
                      className="size-[160px] rounded-full absolute object-cover"
                      src={url}
                      alt="Preview"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="absolute top-47" />
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
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute top-17" />
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        {data.map((val, i) => (
                          <SelectItem key={i} value={val.name.common}>
                            {val.name.common}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input
                  className="w-full h-[40px]"
                  placeholder="Language knowledge"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 w-full items-center">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[40px]"
                    placeholder="Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="car"
            render={({ field }) => (
              <FormItem className="flex items-center w-full h-[40px] rounded-md border p-4 relative">
                <FormLabel className="mr-2">Car</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="absolute top-17" />
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
                  placeholder="Write about yourself here"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activities"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Activities</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Activities"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
}
