'use client';

import { Loader2, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader } from './ui/card';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import React, { useContext } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientContext } from '@/context/clients';
import Client from '@/types/client';

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: 'The name must be at least 2 characters long',
    })
    .max(50, {
      message: 'The name must be at most 50 characters long',
    }),
  position: z.string().min(2, {
    message: 'The position must be at least 2 characters long',
  }),
  avatar: z.custom<File>(),
});

const AddClient = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { clients, setClients } = useContext(ClientContext);
  const [avatarImg, setAvatarImg] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      position: '',
      avatar: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { fullName, position } = values;
    const formData = new FormData();
    formData.append('file', avatarImg!);
    formData.append('upload_preset', 'fn1pbozo');
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const imageData = await res.json();
    const data = {
      name: fullName,
      position: position,
      avatar: imageData.url,
    };

    const response = await fetch('/api/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const newClient: Client = await response.json();
    setClients([...clients, newClient]);
    closeDialog();
    setLoading(false);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    form.reset({});
    setAvatarImg(null);
  };

  return (
    <>
      <Card
        className="hover:translate-y-[-2px] cursor-pointer min-h-[98px]"
        onClick={() => setOpenDialog(true)}>
        <CardHeader className="flex flex-col gap-5 h-full items-center justify-center p-4">
          <Plus />
        </CardHeader>
      </Card>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new client</DialogTitle>
            <DialogDescription>
              Introduce the client details. Click create when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 pb-4">
                <div className="flex justify-center">
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <Avatar
                          className="w-[72px] h-[72px] cursor-pointer"
                          onClick={() =>
                            inputRef.current && inputRef.current.click()
                          }>
                          <AvatarImage
                            src={
                              avatarImg
                                ? URL.createObjectURL(avatarImg)
                                : '/userImages/userDefault.png'
                            }
                            alt="user avatar"
                          />
                        </Avatar>
                        <FormControl>
                          <Input
                            {...field}
                            //@ts-ignore
                            value={field?.value?.fileName}
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={inputRef}
                            onChange={(e) => {
                              const file = e.currentTarget.files![0];
                              setAvatarImg(file);
                              field.onChange(file);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="fullName"
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="position"
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    'Create'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => closeDialog()}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddClient;
