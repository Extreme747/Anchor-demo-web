import StatsBar from '../components/StatsBar'
import ProblemSection from '../components/ProblemSection'
import InboxPreview from '../components/InboxPreview'
import PhaseInbox from '../components/PhaseInbox'
import PhaseFollowUp from '../components/PhaseFollowUp'
import PhaseCommerce from '../components/PhaseCommerce'
import PhaseRevIntel from '../components/PhaseRevIntel'
import PhaseScale from '../components/PhaseScale'
import CompetitorTable from '../components/CompetitorTable'
import Pricing from '../components/Pricing'
import SecurityStrip from '../components/SecurityStrip'
import LeakageCalculator from '../components/LeakageCalculator'
import GTMStrip from '../components/GTMStrip'
import Testimonials from '../components/Testimonials'
import MilestoneTimeline from '../components/MilestoneTimeline'
import CTAStrip from '../components/CTAStrip'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProblemSection />
      <InboxPreview />
      <PhaseInbox />
      <PhaseFollowUp />
      <PhaseCommerce />
      <PhaseRevIntel />
      <PhaseScale />
      <CompetitorTable />
      <Pricing />
      <SecurityStrip />
      <LeakageCalculator />
      <GTMStrip />
      <Testimonials />
      <MilestoneTimeline />
      <CTAStrip />
    </>
  )
}
