
import React from 'react'
import Head from 'next/head'

const CommonHead = (props) => {
    return (
        <Head>
            <title>TienGH - Business Fullstack Counselors</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <meta name="description" content="TienGH have been working in this field for over 6 years and am ready to assist in navigating your business in the right direction." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default CommonHead;
