import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin" />
        </div>
    )
}
