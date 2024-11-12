import {useRouter} from 'next/router';
import {signIn, signOut, useSession} from 'next-auth/react';
import {updateUserRole} from '@/pages/api/user';

const SelectRolePage = () => {
    const {data: session} = useSession();
    const router = useRouter();
    if (session?.user.role) {
        router.replace('/');
    }
    const handleRoleSelection = async (role: 'teacher' | 'parent' | 'student') => {
        // It requires to re-login to update session with user role. For later, user will be signed out and will see the email verification sent page.
        try {
            console.log(session)
            if (session?.user?.email) await updateUserRole({token: session.accessToken, role});
            await signIn("google");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={() => signOut()}>Sign out</button>
            <h1>Welcome! Please select your role and re-signin please!</h1>
            <button onClick={() => handleRoleSelection('teacher')}>Teacher</button>
            <button onClick={() => handleRoleSelection('parent')}>Parent</button>
            <button onClick={() => handleRoleSelection('student')}>Student</button>
        </div>
    );
};

export default SelectRolePage;
