import {AppType} from 'next/app';
import {SessionProvider, useSession} from 'next-auth/react';
import {Session} from "next-auth";
import {ReactNode} from "react";
import {LoginPage} from "~/components/LoginComponent";
import '../styles/globals.css';

function AuthWrapper({children}: { children: ReactNode }) {
    const {status} = useSession();

    if (status === "loading") {
        return null;
    }

    if (status !== "authenticated") {
        return <LoginPage/>;
    }
    return children;
}


export type AppProps = {
    session: Session | null;
};

const App: AppType<AppProps> = ({Component, pageProps}) => {
    return (
        <SessionProvider session={pageProps.session}>
            <AuthWrapper>
                <Component {...pageProps} />
            </AuthWrapper>
        </SessionProvider>
    );
}

export default App;