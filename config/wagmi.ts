// config/wagmi.ts

import { cookieStorage, createStorage } from "@wagmi/core"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { arbitrum, base, polygon } from "@reown/appkit/networks"

// Project ID из .env (обязательно NEXT_PUBLIC_)
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""

if (!projectId) {
  console.warn("Reown / WalletConnect Project ID не найден! Deeplinks могут не работать.")
}

// Только нужные сети
export const networks = [polygon, base, arbitrum] as const

// Настраиваем адаптер без Coinbase / Base Smart Wallet
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  // Самое важное: отключаем Coinbase Wallet и всё, что тянет Solana
  excludeWalletIds: [
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase Wallet
    // Если знаешь другие ID Base Smart Wallet — добавь сюда
  ],
  // Опционально: можно перечислить только нужные коннекторы вручную
  // connectors: [
  //   walletConnect({ projectId }),
  //   injected(), // MetaMask, Rabby и т.д.
  //   // другие, если нужно
  // ],
})

export const config = wagmiAdapter.wagmiConfig
