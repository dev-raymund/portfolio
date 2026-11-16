import Icon from './Icon'
import { SplitChars } from './Split'

export default function SectionHead({ icon, label, title, as: Heading = 'h2', id }) {
  return (
    <div className="sec-head">
      <span className="sec-label"><Icon name={icon} />{label}</span>
      <Heading className="sec-title" id={id} data-scrub-chars>
        <SplitChars text={title} mask={false} />
      </Heading>
    </div>
  )
}
