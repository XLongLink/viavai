import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { IconName } from "lucide-react/dynamic";

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

import type { Section } from "@/types"

export interface SidebarProps {
    logo: string;
    title: string;
    subtitle: string;
    sections: Section[]
};

export const Sidebar: React.FC<SidebarProps> = ({ logo, title, subtitle, sections }) => {
    return (
        <Side collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="pointer-events-none">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground mr-2">
                                <Avatar>
                                    <AvatarImage src={logo} />
                                    <AvatarFallback>VV</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {title}
                                </span>
                                <span className="truncate text-xs">
                                    {subtitle}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {sections.map((section, sectionIdx) => (
                    <SidebarGroup key={sectionIdx}>
                        <SidebarGroupLabel className="flex items-center justify-between">
                            {section.name}
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
                                            <DynamicIcon name={item.icon as IconName} size={48} />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
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