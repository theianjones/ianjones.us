import SideNote from './side-note'

export default {
  SideNote,
  wrapper: (props: any) => (
    <div className="markdown">
      <main {...props} className="article-width" />
    </div>
  ),
}
