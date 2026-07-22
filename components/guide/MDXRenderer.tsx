'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import StepCard from './StepCard'
import ImageCaption from './ImageCaption'
import TipBox from './TipBox'
import WarningBox from './WarningBox'
import SubSteps from './SubSteps'
import SectionHeading from './SectionHeading'

const components = { StepCard, ImageCaption, TipBox, WarningBox, SubSteps, SectionHeading }

export default function MDXRenderer({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={components} />
}
