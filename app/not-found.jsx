import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFounnd() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] pa-4 text-center">
            <h1 className="text-6xl font-bold gradient-title mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page NOt Found</h2>
            <p className="text-grey-600 mb-5">
                Oops! The page You&apos;re looking for does&apos;t exist or has been moved .
            </p>
            <Link href="/">
                <Button>
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}