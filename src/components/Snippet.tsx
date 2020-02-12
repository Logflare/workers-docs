import { restApiTemplate, allRestApiTemplates } from "../types/restApiTemplates"
import React from 'react'
type snippetProps = Partial<restApiTemplate> & {
  page_url?: string
}
import { useRestApiTemplates } from '../hooks/useMarkdownRemark'
import { PREFIX } from "./utils"
export const Snippet: React.FC<snippetProps> = (props) => {
  const { allRestApiTemplates } = useRestApiTemplates()
  const getSnippet = (id: string) => {
    const snippet = allRestApiTemplates.edges.map(edge => edge.node).find(node => node.endpointId === id)
    if (!snippet) {
      throw "Snippet not found with id" + id
    }
    return snippet
  }

  let { endpointId, code, description, title, share_url, tags } = props.description ? props : getSnippet(props.endpointId || "")
  let { page_url } = props
  const template_page = PREFIX + "/templates/pages/" + endpointId
  page_url = share_url ? ("/" + share_url) : template_page // TODO may need to consider tutorial?
  page_url = page_url
  return (<figure className="template-card snippet" id={endpointId}>
    <div className="tag-group">
      {tags?.map(tag => (
        <button className={"tooltip " + tag}>
          {tag}
          <span className="tooltiptext"></span>
        </button>
      ))}
    </div>

    <a href={page_url}>
      <h2>
        {title}
      </h2>
      <img src={PREFIX + "/templates/media/right-arrow.svg"} />
    </a>
    {/* might neded to markdownify */}
    <p>{description}</p>
    <div className="copy-group">
      <div className="copy-step">
        <img src={PREFIX + "/templates/media/file.svg"} />
        {/* //  type="image/svg+xml" */}
        <span>Copy into a Worker script:</span>
      </div>
      <div className="copy">
        <code>{code}</code>
      </div>
    </div>
  </figure>)
}


