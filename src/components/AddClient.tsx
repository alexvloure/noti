'use client';

import { Plus, X } from 'lucide-react';
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
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import React, { useContext } from 'react';
import clientsArr from '../data/clients.json';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
  avatar: z.string(),
});

const AddClient = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { clients, setClients } = useContext(ClientContext);
  const [avatarImg, setAvatarImg] = React.useState<string>(
    '/userImages/userDefault.png'
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      position: '',
      avatar: '',
    },
  });

  const handleImage = (image: File | null) => {
    if (image) {
      const base64Image = URL.createObjectURL(image);
      setAvatarImg(base64Image);
      return base64Image;
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { fullName, position, avatar } = values;
    const highestId = clientsArr
      .map((client) => client.id)
      .reduce((prev, curr) => {
        return prev > curr ? prev : curr;
      });

    const newClient: Client = {
      id: highestId + 1,
      name: fullName,
      desc: position,
      avatar: avatar,
    };

    setClients([...clients, newClient]);
    closeDialog();
  };

  const closeDialog = () => {
    setOpenDialog(false);
    form.reset({});
    setAvatarImg('/userImages/userDefault.png');
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
                      <FormItem>
                        <Avatar
                          className="w-[72px] h-[72px] cursor-pointer"
                          onClick={() =>
                            inputRef.current && inputRef.current.click()
                          }>
                          <AvatarImage src={avatarImg} alt="user avatar" />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        <FormControl>
                          <Input
                            {...field}
                            //@ts-ignore
                            value={field.value.fileName}
                            id="avatar"
                            type="file"
                            className="hidden"
                            ref={inputRef}
                            onChange={(e) => {
                              const base64img = handleImage(
                                e.currentTarget.files &&
                                  e.currentTarget.files[0]
                              );
                              field.onChange(base64img);
                            }}
                          />
                        </FormControl>
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
                <Button type="submit">Create</Button>
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
