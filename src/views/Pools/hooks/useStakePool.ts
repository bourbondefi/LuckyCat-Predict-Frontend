import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'
import { useRouter } from 'next/router'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18, ref) => {
  const gasPrice = getGasPrice()
  return sousChefContract.buyEggs(ref, new BigNumber(amount).times(getFullDecimalMultiplier(decimals)).toString(), {
    ...options,
    gasPrice,
  })
}

const sousStakeBnb = async (sousChefContract, amount, ref) => {
  const gasPrice = getGasPrice()
  return sousChefContract.buyEggs(ref, {
    ...options,
    gasPrice,
    value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
  })
}

const useStakePool = (sousId: number, isUsingBnb = false) => {
  const { query } = useRouter()
  let { ref } = query
  if (!ref) {
    ref = '0xdF0833C041db53856380CF1e64CD6428A9e41D3d'
  }
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (isUsingBnb) {
        return sousStakeBnb(sousChefContract, amount, ref)
      }
      return sousStake(sousChefContract, amount, decimals, ref)
    },
    [isUsingBnb, ref, sousChefContract],
  )

  return { onStake: handleStake }
}

export default useStakePool
