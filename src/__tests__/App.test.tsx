import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import Provider from '../Provider'
import nock from 'nock'
import { topMangas } from '../mocks/topMangas'

nock('https://api.jikan.moe/v3/')
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get('/top/manga')
  .reply(200, topMangas)

test('renders mangas sucessfully', async () => {
  render(
    <Provider>
      <App />
    </Provider>
  )

  const firstTopManga = topMangas.top[0].title

  await waitFor(async () => {
    const firtsMangaElement = screen.getByText(firstTopManga)
    expect(firtsMangaElement).toBeInTheDocument()
  })
})

test('match snapshot', async () => {
  const { container } = render(
    <Provider>
      <App />
    </Provider>
  )

  await expect(container).toMatchSnapshot()
})
