import React from 'react'
import theme from 'prism-react-renderer/themes/nightOwl'
import Highlight, {defaultProps} from 'prism-react-renderer'

const Code = ({children, className = 'language-js'}: any) => {
  const language = className.replace(/language-/, '')
  if (!children) {
    return null
  }
  return (
    <div className="lg:-mx-5">
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={theme}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: '20px',
              fontSize: '85%',
              borderRadius: 5,
              marginBottom: '1.25rem',
              overflowX: 'auto',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Code
