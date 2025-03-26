import type { TypeMain, TypeComponent } from "@/types"
import { ThemeProvider } from "@/components/theme-provider"
import { useWebSocket } from './hooks/use-socket.tsx'
import { Sidebar } from "@/components/sidebar"
import { Breadcrumb } from "@/components/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Dev } from "./dev.tsx"
import { Button, TypeButton } from "@/components/ui/button"

// const MemoButton = React.memo<{ text: string }>(({ text }) => {
//     return (
//         <Button >
//             {text}
//         </Button>
//     );
// });

const UIRenderer = ({ main }: { main: TypeMain }) => {
    const RenderComponent = (children: TypeComponent | string, index: number) => {
        if (typeof children === 'string') {
            return <> {children} </>
        }

        if (children.type === 'button') {
            const button = children as TypeButton;
            return (
                <Button
                    key={index}
                    {...button.props}
                >
                    {button.children}
                </Button>
            );
        }

        return null;
    };

    return <div>{main.children.map(RenderComponent)}</div>;
};


export default function App() {
    const { page, nav, main } = useWebSocket()

    // Todo if the page content is not loaded, then place a skeleton
    if (!page || !main) return <></>

    return (
        <>
            <title>{page.title}</title>
            <link rel="icon" href={page.logo} type="image/x-icon" />

            <ThemeProvider>
                <SidebarProvider>
                    <Sidebar nav={nav} />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb breadcrumb={page.breadcrumb} />
                            </div>
                            <div className="ml-auto mr-4">
                                <ModeToggle />
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            <UIRenderer main={main} />
                            <Dev />
                            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                <div className="aspect-video rounded-xl bg-muted/50" />
                                <div className="aspect-video rounded-xl bg-muted/50" />
                                <div className="aspect-video rounded-xl bg-muted/50" />
                            </div>
                            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </ThemeProvider>
        </>
    )
}

// {main.components.map((component, index) => (
//     <div key={index} className="rounded-xl bg-muted/50 p-4">
//         {component}
//     </div>
// ))}