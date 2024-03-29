import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { CHAIN_ID } from './networks'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto CAKE</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake CAKE</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: <Trans>Stake CAKE to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

const pools: SerializedPoolConfig[] = [
  {
    title: 'Lucky Cat V2 300% ROI Miner',
    sousId: 7,
    stakingToken: serializedTokens.lbnb,
    earningToken: serializedTokens.lbnb,
    contractAddress: {
      97: '',
      56: '0x6D4b0802Ba05A03f7f23944b60c2bb99453b080E',
    },
    poolCategory: PoolCategory.BINANCE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '3%',
  },
  {
    title: 'Lucky Cat',
    sousId: 1,
    stakingToken: serializedTokens.bnb,
    earningToken: serializedTokens.bnb,
    contractAddress: {
      97: '',
      56: '0xb50e74A6b82F59c4058b5D798E3D9C9D9B8c6e16',
    },
    poolCategory: PoolCategory.BINANCE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    isFinished: true,
    rate: '8%',
  },
  {
    title: 'Lucky Cat',
    sousId: 2,
    stakingToken: serializedTokens.busd,
    earningToken: serializedTokens.busd,
    contractAddress: {
      97: '',
      56: '0xc970E1258E896a38cc9d2E9e3104C0D34C7892d2',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '8%',
  },
  {
    title: 'Lucky Cat',
    sousId: 4,
    stakingToken: serializedTokens.dai,
    earningToken: serializedTokens.dai,
    contractAddress: {
      97: '',
      56: '0xd6fBAa7b33Ab8BE4edC14D72d76bc93cD42220b5',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '8%',
  },
  {
    title: 'Trust Miner',
    sousId: 6,
    stakingToken: serializedTokens.usdt,
    earningToken: serializedTokens.usdt,
    contractAddress: {
      97: '',
      56: '0x27D25D982bd3eD23ade952cE1b9AF9dcb6147171',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000003',
    version: 4,
    isStarted: true,
    isFinished: true,
    rate: '3%',
  },
  {
    title: 'Lucky Cat Shib',
    sousId: 9,
    stakingToken: serializedTokens.shib,
    earningToken: serializedTokens.shib,
    contractAddress: {
      97: '',
      56: '0x6C83AF6DFFAB3204C485334E4b904679c87D5e84',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '8%',
  },
  {
    title: 'Lucky Cat ETH',
    sousId: 10,
    stakingToken: serializedTokens.eth,
    earningToken: serializedTokens.eth,
    contractAddress: {
      97: '',
      56: '0xb3a6a7faBE117b83eEeF74110719be09949bBC78',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '8%',
  },
].filter((p) => !!p.contractAddress[CHAIN_ID])

// known finished pools
const finishedPools = [
  {
    title: 'Platinum BNB',
    isFinished: true,
    sousId: 3,
    stakingToken: serializedTokens.bnb,
    earningToken: serializedTokens.bnb,
    contractAddress: {
      97: '',
      56: '0xf74ebD248C34255a40A58E8cE993FB4d138BB6B1',
    },
    poolCategory: PoolCategory.BINANCE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '8%',
  },
  {
    title: 'Platinum BUSD',
    isFinished: true,
    sousId: 8,
    stakingToken: serializedTokens.busd,
    earningToken: serializedTokens.busd,
    contractAddress: {
      97: '',
      56: '0x707F5aeefCf380F682F3B88c7dA245073e76E14E',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000008',
    version: 4,
    isStarted: true,
    rate: '8%',
  },
]
  .filter((p) => !!p.contractAddress[CHAIN_ID])
  .map((p) => ({ ...p, isFinished: true }))

export default [...pools, ...finishedPools]
