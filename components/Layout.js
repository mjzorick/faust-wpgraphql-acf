import Head from "next/head";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>The Pixies!</title>
            </Head>
            <main>{children}</main>
        </>
    );
}