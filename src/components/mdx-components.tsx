import SideNote from './side-note'
import Code from './code'
export default {
  SideNote,
  wrapper: (props: any) => (
    <div className="markdown">
      <main {...props} className="article-width" />
    </div>
  ),
  code: Code,
}
