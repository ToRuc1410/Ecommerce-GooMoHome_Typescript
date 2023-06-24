import { createContext, useState } from 'react'
import { checkedPurchases, extendedPurchases } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileUserFromLS } from 'src/utils/auth'

interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: extendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<extendedPurchases[]>>
  reset: () => void
  dataPurchase: checkedPurchases[]
  setDataPurchase: React.Dispatch<React.SetStateAction<checkedPurchases[]>>
}
//=======================Context là nơi truyền props xuống những components con cháu cho nó bọc component<App>================
// init giá tri mặc định
const initialAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileUserFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
  dataPurchase: [],
  setDataPurchase: () => null
}

//Nếu sử dụng hàm thì nó sẽ có giá tri mặc định ở trên
export const AppContext = createContext<AppContextType>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<extendedPurchases[]>(initialAppContext.extendedPurchases)
  const [dataPurchase, setDataPurchase] = useState<checkedPurchases[]>(initialAppContext.dataPurchase)

  const reset = () => {
    setIsAuthenticated(false), setProfile(null), setExtendedPurchases([]), setDataPurchase([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        dataPurchase,
        setDataPurchase,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
