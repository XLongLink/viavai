import * as React from "react"
import { Plus } from "lucide-react"
import {
    Sidebar as Side,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupAction,
} from "@/components/ui/sidebar"

// Define the structure of the menu configuration
interface MenuHeader {
    logo: React.ReactNode
    title: string
    subtitle: string
}

interface MenuItem {
    title: string
    icon?: React.ReactNode
    type?: "default" | "plus" | string
    // element can be used to render any additional UI like dropdowns or badges
    element?: React.ReactNode
}

interface MenuSection {
    title: string
    type?: "default" | "plus" | string
    items: MenuItem[]
}

interface MenuData {
    header: MenuHeader
    content: MenuSection[]
}

interface DynamicMenuProps {
    menuData: MenuData
}

export const Sidebar: React.FC<DynamicMenuProps> = ({ menuData }) => {
    return (
        <Side collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {menuData.header.logo}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {menuData.header.title}
                                </span>
                                <span className="truncate text-xs">
                                    {menuData.header.subtitle}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {menuData.content.map((section, sectionIdx) => (
                    <SidebarGroup key={sectionIdx}>
                        <SidebarGroupLabel className="flex items-center justify-between">
                            {section.title}
                            {section.type === "plus" && (
                                <SidebarGroupAction title="Add Project">
                                    <Plus /> <span className="sr-only">Add Project</span>
                                </SidebarGroupAction>
                            )}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {section.items.map((item, itemIdx) => (
                                <SidebarMenuItem key={itemIdx}>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    {item.element && (
                                        <div className="menu-element">
                                            {item.element}
                                        </div>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Side>
    )
}
