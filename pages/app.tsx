import React from 'react';
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Lottie } from '@crello/react-lottie';
import loadingAnimation from '../src/animations/loading.json'

const IndexPage: NextPage = () => {
    const [session, loading] = useSession()

    return (
        <>
            { loading && (
                <div>
                    <Lottie
                        width="200px"
                        height="200px"
                        className="lottie-container basic"
                        config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
                    />
                    <h1>LOADING</h1>
                </div>
            )}
            <h1>Pagina HOme app</h1>
            {!session && (
                <div className="text-3xl">
                    Not signed in <br />
                    <button onClick={() => signIn("auth0")}>Sign in</button>
                </div>
            )}
            {session && (
                <div className="text-3xl">
                    <div className="text-4xl">
                        Signed in as {session.user.email}
                    </div>
                    <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            )}
        </>
    );

}

export default IndexPage;

