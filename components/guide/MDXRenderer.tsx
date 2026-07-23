'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import StepCard from './StepCard'
import ImageCaption from './ImageCaption'
import TipBox from './TipBox'
import WarningBox from './WarningBox'
import SubSteps from './SubSteps'
import SectionHeading from './SectionHeading'
import AffiliateRequirements from './AffiliateRequirements'
import BitrateTable from './BitrateTable'
import References from './References'
import FaqItem from './FaqItem'
import BotComparisonTable from './BotComparisonTable'

const components = { StepCard, ImageCaption, TipBox, WarningBox, SubSteps, SectionHeading, AffiliateRequirements, BitrateTable, References, FaqItem, BotComparisonTable }

export default function MDXRenderer({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={components} />
}
