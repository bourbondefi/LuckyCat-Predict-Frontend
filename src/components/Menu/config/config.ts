import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

const config: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (t, languageCode) => [
  {
    label: t('Home'),
    icon: EarnIcon,
    fillIcon: EarnFillIcon,
    href: 'https://luckycat.money/',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Main'),
        href: 'https://luckycat.money',
      },
      {
        label: t('BUSD'),
        href: 'https://busd.luckycat.money',
      },
      {
        label: t('BNB'),
        href: 'https://bnb.luckycat.money',
      },
      {
        label: t('CAKE'),
        href: 'https://cake.luckycat.money/',
      },
    ],
  },
]

export default config
