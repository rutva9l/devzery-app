import Main from "@/components/main";
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-12">
      <div className="grid grid-cols-9 gap-4 mb-8">
        <div className="col-span-8"><Input type="issue" placeholder="Search issue..." /></div>
        <div className="col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'}>Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Filter 1</DropdownMenuItem>
              <DropdownMenuItem>Filter 2</DropdownMenuItem>
              <DropdownMenuItem>Filter 3</DropdownMenuItem>
              <DropdownMenuItem>Filter 4</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Main />
    </main>
  );
}
