import { url } from 'inspector'
import Image from 'next/image'
import React from 'react'

type Props = {}

const LoginBanner = (props: Props) => {
    return (
        <>
            <div className='relative h-screen object-cover'>
                <Image src={"/images/login_banner.jpg"} alt="login img" className="login_img " width={904} height={900} />
            </div>
        </>
    )
}

export default LoginBanner