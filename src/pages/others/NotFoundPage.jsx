import { useLocation } from "react-router";
import { supportsDynamicViewport } from "../../utils/pageUtil";

export default function NotFoundPage() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className={`flex flex-col items-center justify-center ${supportsDynamicViewport() ? 'h-[100dvh]' : 'h-screen '} `}>
            <div className="absolute top-[30%] max-w-lg text-center px-4">
                <h1 className="text-4xl font-semibold mb-4">
                    Page Not Found
                </h1>
                <p className="">
                    The requested URL <strong className="break-all">{pathname}</strong> was not found on this server.
                </p>
                <p className="">Please check the URL or go back to the <a href="/" className="text-blue-600 hover:underline">homepage</a>.</p>
            </div>
        </div>
    );
};