'use client';

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ClientContext } from '@/context/clients';
import { useContext } from 'react';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

const UserCard = ({
  name,
  position,
  avatar,
  id,
}: {
  name: string;
  position: string;
  avatar: string;
  id: string;
}) => {
  const { clients, setClients } = useContext(ClientContext);
  const { toast } = useToast();

  const fallback =
    name.split(' ').length > 1
      ? name?.charAt(0) + name?.split(' ')[1].charAt(0)
      : name?.charAt(0);

  const deleteClient = () => {
    const idTimeout = setTimeout(() => {
      const updatedClients = clients.filter((client) => client.id !== id);
      fetch(`/api/client/${id}`, {
        method: 'DELETE',
      });
      setClients(updatedClients);
    }, 3000);
    toast({
      variant: 'delete',
      title: 'Deletion successful',
      description: 'Client has been deleted successfully',
      duration: 3000,
      action: (
        <ToastAction altText="Undo" onClick={() => clearInterval(idTimeout)}>
          Undo
        </ToastAction>
      ),
    });
  };

  return (
    <Card className="hover:translate-y-[-2px] cursor-pointer max-h-[98px]">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center gap-5">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage src={avatar} alt="user avatar" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <CardTitle className="max-h-[18px] overflow-hidden text-ellipsis">
              {name}
            </CardTitle>
            <CardDescription>{position}</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="px-[0.1rem] py-[0.1rem] h-[auto]">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 relative left-[-15px]">
            <DropdownMenuRadioGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => deleteClient()}>
                <Trash className="mr-2 h-4 w-4" />
                <span>delete</span>
              </DropdownMenuItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
