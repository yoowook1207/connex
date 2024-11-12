import {signIn} from "next-auth/react";

export const LoginPage = () => {
    return (
        <div className="max-w-screen mx-0 my-0 flex h-screen items-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto my-16 max-w-xl">
                <div className="border-2 border-sky-200 bg-gray-100 ">
                    <div className="flex flex-col items-center px-4 py-5 text-center sm:p-6">
                        <h3 className="text-base font-semibold leading-6 tracking-widest text-gray-900">
                            Welcome to Connx
                        </h3>
                        <div className="mt-2">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={() => signIn('google')}
                            >
                                Please Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
