import Page from "@/app/dashboard/page"
import { ThemeProvider } from "@/components/theme-provider"
import { useWebSocket } from './hooks/use-socket.tsx'

export default function App() {
    const appState = useWebSocket()
    console.log(appState)

    return (
        <ThemeProvider>
            <Page />
        </ThemeProvider>
    )
}