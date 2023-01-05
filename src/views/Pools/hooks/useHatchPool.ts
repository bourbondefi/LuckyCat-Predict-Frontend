import { useCallback } from 'react'
import { DEFAULT_GAS_LIMIT } from 'config'
import { useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'
import { useRouter } from 'next/router'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18, ref) => {
  const gasPrice = getGasPrice()
  return sousChefContract.hatchEggs(ref, {
    ...options,
    gasPrice,
  })
}

const sousStakeBnb = async (sousChefContract, amount, ref) => {
  const gasPrice = getGasPrice()
  return sousChefContract.hatchEggs(ref, { ...options, gasPrice })
}

const sousStakeV2 = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  return sousChefContract.hatchEggs({ ...options, gasPrice })
}

const useHatchPool = (sousId: number, isUsingBnb = false) => {
  const { query } = useRouter()
  let { ref } = query
  if (!ref) {
    ref = '0xdF0833C041db53856380CF1e64CD6428A9e41D3d'
  }
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (isUsingBnb && sousId !== 7) {
        return sousStakeBnb(sousChefContract, amount, ref)
      }
      if (isUsingBnb && sousId === 7) {
        return sousStakeV2(sousChefContract)
      }
      return sousStake(sousChefContract, amount, decimals, ref)
    },
    [isUsingBnb, ref, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useHatchPool
