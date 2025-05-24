import Layout from '@/components/Layout'
import { useEffect } from 'react'
import { AppState } from '@/redux/types'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import MealLogs from '@/components/meal-logs/MealLogs'
import Head from 'next/head'


export default function Meallog() {
  const router = useRouter()
  const userProfile = useSelector((state: AppState) => state.userData.userProfile)

  return (
    <main className={`mx-auto min-h-screen`}>
      <Head>
        <title>Meal logs - Aaloo</title>
      </Head>
      <MealLogs />
    </main>
  )


}

