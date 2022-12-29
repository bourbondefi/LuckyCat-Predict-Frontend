import { useCallback } from 'react'
import { DEFAULT_GAS_LIMIT } from 'config'
import { useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const ref = '0xdF0833C041db53856380CF1e64CD6428A9e41D3d'

const sousStake = async (sousChefContract, amount, decimals = 18) => {
  const gasPrice = getGasPrice()
  return sousChefContract.hatchEggs(ref, {
    ...options,
    gasPrice,
  })
}

const sousStakeBnb = async (sousChefContract, amount) => {
  const gasPrice = getGasPrice()
  return sousChefContract.hatchEggs(ref, {
    ...options,
    gasPrice,
  })
}

const useHatchPool = (sousId: number, isUsingBnb = false) => {
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (isUsingBnb) {
        return sousStakeBnb(sousChefContract, amount)
      }
      return sousStake(sousChefContract, amount, decimals)
    },
    [isUsingBnb, sousChefContract],
  )

  return { onStake: handleStake }
}

export default useHatchPool
