import {GitHubLogoIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <div className="flex flex-col">
                    <p>Hello, greetings from your future collaborator.</p>
                    <p>Welcome to the main page of test system, you will see
                        below.</p>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/Oyahiro"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubLogoIcon className="h-5 w-5"/>
                    Code
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.linkedin.com/in/chrischunga/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInLogoIcon className="h-5 w-5"/>
                    Curriculum
                </a>
            </footer>
        </div>
    );
}
