'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { signOut, signIn, useSession } from 'next-auth/react';
import { Loader2, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';
import { useTheme } from 'next-themes';

const NavBar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const { data, status } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <div className="border-b justify-center">
      <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => router.push('/')}>
            📝
            <h1 className="text-[1.50rem]">&nbsp;noti</h1>
          </div>
          <nav
            className={cn(
              'hidden items-center space-x-4 lg:space-x-6 md:flex',
              className
            )}
            {...props}>
            {status === 'authenticated' && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                dashboard
              </Link>
            )}
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              contact
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-9 px-0"
            onClick={() => toggleTheme()}>
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {status === 'loading' ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading
            </Button>
          ) : status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={data?.user?.image!} alt="user avatar" />
                  <AvatarFallback>{data?.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{data?.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn('google')}>sign in</Button>
          )}
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="w-9 px-0"
            onClick={() => toggleTheme()}>
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent position="right" size="full">
              <div className="grid gap-4 py-4 mt-2">
                {status === 'authenticated' && (
                  <SheetClose
                    asChild
                    className="grid grid-cols-4 items-center gap-4">
                    <Link href="/dashboard">dashboard</Link>
                  </SheetClose>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <SheetClose
                    asChild
                    className="grid grid-cols-4 items-center gap-4">
                    <Link href="#">contact</Link>
                  </SheetClose>
                </div>
                {status === 'authenticated' ? (
                  <>
                    <div className="flex flex-row items-center justify-between">
                      <span className="font-medium">{data?.user?.email}</span>
                      <Avatar>
                        <AvatarImage
                          src={data?.user?.image!}
                          alt="user avatar"
                        />
                        <AvatarFallback>
                          {data?.user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>log out</span>
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => signIn('google')}>sign in</Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
