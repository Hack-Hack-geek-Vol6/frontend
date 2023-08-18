import { auth } from '@/lib/firebase/client'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { CreateUser } from '../services/createUser'
import { EmailSignUpFormData, SignUpFormData } from '../types/formData'
import { useCustomRouter } from '@/components/layouts/hooks/CustomRouter'

export const useSignUp = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<User>()
  const [error, setError] = useState<string>()
  const User = new CreateUser()
  const { handlePushRouter } = useCustomRouter()

  const handleEmailLogin = async (formData: EmailSignUpFormData) => {
    const user = await User.authEmail(formData, () => {
      setIsLogin(true)
    })
    if (typeof user == 'string') {
      console.log(user)

      switch (user) {
        case 'auth/email-already-in-use':
          setError('このメールアドレスは既に使用されています')
          break
        case 'auth/invalid-email':
          setError('メールアドレスの形式が無効です')
          break
        case 'auth/operation-not-allowed':
          setError('メールアドレスとパスワードによる認証が無効です')
          break
        case 'auth/weak-password':
          setError('パスワードが弱すぎます')
          break
        default:
          setError('予期せぬエラーが発生しました')
      }
    } else {
      setUser(user)
    }
  }

  const handleGoogleLogin = async () => {
    const user = await User.authGoogle(() => {
      setIsLogin(true)
    })
    if (user) {
      setUser(user)
    }
    return user
  }

  const createUser = async (formData: SignUpFormData) => {
    console.log(formData)
    const user = await User.create(formData)
    if (user) {
      handlePushRouter('/signin')
    }
  }
  return {
    isLogin,
    user,
    error,
    handleEmailLogin,
    handleGoogleLogin,
    createUser,
  }
}
