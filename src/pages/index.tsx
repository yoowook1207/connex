import {signOut, useSession} from 'next-auth/react';
import {useRouter} from "next/router";
import Image from 'next/image';
import {LoginPage} from "~/components/LoginComponent";

export default function Home() {
    const {data: session} = useSession();
    const router = useRouter();

    if (!session) {
        return <LoginPage/>;
    }
    console.log(session.user)
    if (!session.user.role) {
        router.replace('/select-role');
        return;
    }
    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">ConnX</h1>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="What do you want to learn?"*/}
                {/*    className="border rounded px-4 py-2"*/}
                {/*/>*/}
                <div className="relative ml-4 group">
                    <div className="flex items-center cursor-pointer">
                        <Image
                            src={`${session.user.image}`} // Your profile image path
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </div>
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                            <li onClick={() => signOut()} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log Out</li>
                        </ul>
                    </div>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Weekly Time Schedule</h2>
                <div className="grid grid-cols-3 gap-4">
                    {['Google UX Design', 'AngularJS', 'Python for Data Science'].map((title, index) => (
                        <div key={index} className="border rounded p-4 shadow-sm">
                            <Image
                                src="/images/SungWookYoo-min.png" // Example image path
                                alt={title}
                                width={150}
                                height={100}
                                className="mb-2"
                            />
                            <h3 className="text-lg font-medium">{title}</h3>
                            <p className="text-sm text-gray-500">Course by Google</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Most Popular Certificates</h2>
                <div className="grid grid-cols-4 gap-4">
                    {['IBM Data Science', 'IBM Data Analyst', 'Data Science with Python'].map((title, index) => (
                        <div key={index} className="border rounded p-4 shadow-sm">
                            <Image
                                src="/assets/images/SungWookYoo-min.png"
                                alt={title}
                                width={150}
                                height={100}
                                className="mb-2"
                            />
                            <h3 className="text-lg font-medium">{title}</h3>
                            <p className="text-sm text-gray-500">Professional Certificate</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Personalized Specializations for You</h2>
                <div className="grid grid-cols-4 gap-4">
                    {['AI Skills', 'Machine Learning', 'Data Analysis'].map((title, index) => (
                        <div key={index} className="border rounded p-4 shadow-sm">
                            <Image
                                src="/assets/images/SungWookYoo-min.png"
                                alt={title}
                                width={150}
                                height={100}
                                className="mb-2"
                            />
                            <h3 className="text-lg font-medium">{title}</h3>
                            <p className="text-sm text-gray-500">Specialization</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
