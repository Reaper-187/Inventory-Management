import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, List } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  {
    title: "Categories",
    url: "/categories",
    icon: List,
  },
  {
    title: "Suppliers",
    url: "/supplires",
    icon: List,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      {/* <Separator /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <NavLink
                      to={item.url}
                      className="flex items-center justify-between w-full"
                    >
                      <span>{item.title}</span>
                      <item.icon />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}

              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<SidebarMenuButton />}>
                    Select Workspace
                    <ChevronDown className="ml-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {items.map((item) => (
                      <DropdownMenuItem key={item.title}>
                        <NavLink
                          to={item.url}
                          className="flex items-center justify-between w-full"
                        >
                          <span>{item.title}</span>
                          <item.icon />
                        </NavLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive">Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
