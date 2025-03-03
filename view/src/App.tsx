import Page from "@/app/dashboard/page"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {

    return (
        <ThemeProvider>
            <Page />
        </ThemeProvider>
    )
}