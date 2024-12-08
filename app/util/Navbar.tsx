import { useState } from 'react';
import { Link } from "@remix-run/react";
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold dark:text-white"><Link to="/">MyStore</Link></h1>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary">Home</Link>
            <Link to="/r" className="text-gray-700 dark:text-gray-300 hover:text-primary">Products</Link>
            <Link to="#" className="text-gray-700 dark:text-gray-300 hover:text-primary">Categories</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="pr-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <DropdownMenu>
            {/* Main Dropdown Menu */}
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
              
              {/* Submenu */}
              <DropdownMenuSub>
                {/* Submenu Trigger */}
                <DropdownMenuSubTrigger asChild>
                  <Button variant="ghost" size="icon">
                    Submenu
                  </Button>
                </DropdownMenuSubTrigger>
                {/* Submenu Content */}
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Submenu Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Submenu Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Submenu Item 3</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
           <Link to={"/cart"}> <ShoppingCart  className="h-5 w-5" /></Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </div>
      </div>
    </nav>
  );
};
