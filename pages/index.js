import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

const Home = ({ frontmatter, markdownBody }) => {
  if (!frontmatter) return <></>
  const {
    title,
    description
  } = JSON.parse(frontmatter)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content='' key='url' />
        <meta property="og:title" content={title} key='title' />
        <meta property="og:description" content={description} key='description' />
      </Head>
      <div className='container'>
        <h1>{title}</h1>
        <div className='markdown'>
          <ReactMarkdown source={markdownBody} />
        </div>
      </div>
    </>
  )
}
export default Home

export async function getStaticProps() {
  const content = await import(`../content/pages/home.md`)
  const data = matter(content.default)

  return {
    props: {
      frontmatter: JSON.stringify(data.data),
      markdownBody: data.content,
    }
  }
}
