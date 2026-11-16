import Icon from './Icon'
import { profile } from '../data/profile'
import { scrollToTarget } from '../lib/motion'

export default function Footer() {
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="foot-loc"><Icon name="pin" />Based in the Philippines</span>
      <button className="to-top" type="button" onClick={() => scrollToTarget(0)}><Icon name="arrowUp" />Back to top</button>
    </footer>
  )
}
