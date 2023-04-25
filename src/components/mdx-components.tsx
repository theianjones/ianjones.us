import SideNote from './side-note'
import Code from './code'
import {Tweet} from 'react-twitter-widgets'

export default {
  SideNote,
  wrapper: (props: any) => (
    <div className="markdown">
      <main {...props} className="article-width" />
    </div>
  ),
  code: Code,
  Tweet,
}
