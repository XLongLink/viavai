import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import type { IconName } from "lucide-react/dynamic";
import { ChevronDown } from "lucide-react"

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

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import type { Section } from "@/types"

export interface SidebarProps {
    logo: string;
    title: string;
    subtitle: string;
    sections: Section[]
};


function Header({ logo, title, subtitle }: { logo: string, title: string, subtitle: string }) {
    return (
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
    )
}


function Items({ items }: { items: Section["items"] }) {
    if (!items) return

    return (
        <SidebarMenu>
            {items.map((item, itemIdx) => (
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
    )
}


function SidebarCollapse({ section }: { section: Section }) {
    return (
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        {section.name}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <Items items={section.items} />
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}


export const Sidebar: React.FC<SidebarProps> = ({ logo, title, subtitle, sections }) => {
    return (
        <Side collapsible="icon">
            <Header logo={logo} title={title} subtitle={subtitle} />
            <SidebarContent>
                {sections.map((section, sectionIdx) => (
                    section.variant === "collapse" ? (
                        <SidebarCollapse key={sectionIdx} section={section} />
                    ) : (
                        <SidebarGroup key={sectionIdx}>
                            <SidebarGroupLabel className="flex items-center justify-between">
                                {section.name}
                                {section.variant === "plus" && (
                                    <SidebarGroupAction title="Add Project">
                                        <Plus /> <span className="sr-only">Add Project</span>
                                    </SidebarGroupAction>
                                )}
                            </SidebarGroupLabel>
                            <SidebarMenu>
                                <Items items={section.items} />
                            </SidebarMenu>
                        </SidebarGroup>
                    )
                ))}
            </SidebarContent>
            <SidebarRail />
        </Side>
    )
}