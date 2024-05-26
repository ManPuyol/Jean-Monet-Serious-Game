import * as React from 'react';
import { CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ModeToggle';
import StudyLink from '@/components/StudyLink';
import { LogOutLink } from '@/components/LogOutLink';
import { getUser } from '@/lib/utils';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getProfileInfo } from '@/controllers/profiles';

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nameInitials } = await getProfileInfo();


  const user = await getUser();
  return (
    <div className="max-h-screen h-full overflow-clip w-full">
      <div className="flex flex-col h-full">
        <header className="flex end justify-between h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <StudyLink />
          <div id="logo" className="items-center">
            Jean Monnet
          </div>
          <div className="flex gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback>{nameInitials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={'/profile'}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>

                {user?.user_metadata.role == 'teacher' && (
                  <>
                    <Link href={'/teach'}>
                      <DropdownMenuItem>Teach</DropdownMenuItem>
                    </Link>
                    <Link href={'/study'}>
                      <DropdownMenuItem>Study</DropdownMenuItem>
                    </Link>
                  </>
                )}
                <DropdownMenuSeparator />
                <LogOutLink />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
