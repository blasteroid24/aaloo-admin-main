import Layout from '@/components/Layout'
import { useEffect } from 'react'
import { AppState } from '@/redux/types'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Login from '@/components/signup-form/Login'

 
export default function Home() {
  const router = useRouter()
  const userProfile = useSelector((state: AppState) => state.userData.userProfile)
  
  
  useEffect(() => {
    if (userProfile.isAuth) {
      router.push('/survey-management')
    }
  }, [userProfile?.isAuth])



  return (
    <main
      className={`mx-auto min-h-screen`}
    >
      <Login />
    </main>
  )


}

