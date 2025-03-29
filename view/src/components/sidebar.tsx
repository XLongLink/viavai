import type { TypeSidebar, TypeSection, TypeItem } from "@/types"
import type { IconName } from "lucide-react/dynamic";
import { Link } from "@/components/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, ChevronDown } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuAction
} from "@/components/ui/sidebar"


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

function NavItem({ item }: { item: TypeItem }) {
    if (item.items && item.items.length > 0) {
        return (
            <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={item.href}>
                            <DynamicIcon name={item.icon as IconName} size={48} />
                            <span>{item.name}</span>
                        </Link>
                    </SidebarMenuButton>
                    <SidebarMenuAction>
                        <CollapsibleTrigger asChild>
                            <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                    </SidebarMenuAction>
                    <CollapsibleContent>
                        {item.items && item.items.length > 0 && (
                            <SidebarMenuSub>
                                {item.items.map((subItem, subItemIdx) => (
                                    <SidebarMenuSubItem key={subItemIdx}>
                                        <SidebarMenuSubButton className="cursor-pointer" asChild>
                                            <Link href={subItem.href ?? ""}>
                                                {subItem.name}
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        )}
                    </CollapsibleContent>
                </SidebarMenuItem >
            </Collapsible>
        )
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href={item.href}>
                    <DynamicIcon name={item.icon as IconName} size={48} />
                    <span>{item.name}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem >
    )
}


function Items({ items }: { items: TypeItem[] }) {
    if (!items) return

    return (
        <SidebarMenu>
            {items.map((item, itemIdx) => (
                <NavItem key={itemIdx} item={item} />
            ))}
        </SidebarMenu >
    )
}


function SidebarCollapse({ section }: { section: TypeSection }) {
    if (!section.items) return

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


export function Sidebar({ nav }: { nav?: TypeSidebar }) {
    if (!nav) {
        return (
            <Side collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-12 w-16 rounded-full" />
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-full " />
                            </div>
                        </div>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <Skeleton className="h-4 w-[100px]" />
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton>
                                        <Skeleton className="h-4 w-[150px]" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Side>
        )
    };


    return (
        <Side collapsible="icon">
            <Header logo={nav.logo} title={nav.title} subtitle={nav.subtitle} />
            <SidebarContent>
                {nav.sections.map((section, sectionIdx) => (
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
                            {section.items && section.items.length > 0 && (
                                <SidebarMenu>
                                    <Items items={section.items} />
                                </SidebarMenu>
                            )}
                        </SidebarGroup>
                    )
                ))}
            </SidebarContent>
            <SidebarRail />
        </Side>
    )
}