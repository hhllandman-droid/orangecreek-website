import { Fragment } from 'react'

import type { NewsBlock } from '@/lib/news-articles'

/** Rendert genormaliseerde nieuwsblokken naar semantische HTML. */
export function ArticleBody({ body }: { body: NewsBlock[] }) {
  const elements: React.ReactNode[] = []
  let listItems: string[] = []

  const flushList = (key: string) => {
    if (listItems.length === 0) return
    elements.push(
      <ul key={key} className="news-article-list">
        {listItems.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>,
    )
    listItems = []
  }

  body.forEach((block, index) => {
    if (block.type === 'li') {
      listItems.push(block.text)
      return
    }
    flushList(`list-${index}`)
    if (block.type === 'h2') {
      elements.push(
        <h2 key={index} className="news-article-subhead">
          {block.text}
        </h2>,
      )
    } else {
      elements.push(
        <p key={index} className="news-article-paragraph">
          {block.text}
        </p>,
      )
    }
  })
  flushList('list-final')

  return <Fragment>{elements}</Fragment>
}
