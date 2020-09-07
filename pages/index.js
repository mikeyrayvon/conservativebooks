import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

const Home = ({ siteTitle, siteDescription, frontmatter, markdownBody }) => {
  if (!frontmatter) return <></>
  const {
    title
  } = JSON.parse(frontmatter)
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:url" content='' key='url' />
        <meta property="og:title" content={siteTitle} key='title' />
        <meta property="og:description" content={siteDescription} key='description' />
      </Head>
      <div className='container'>
        <h1>{title}</h1>
        <ReactMarkdown source={markdownBody} />
      </div>
    </>
  )
}
export default Home

export async function getStaticProps() {
  const content = await import(`../content/pages/home.md`)
  const config = await import(`../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      siteDescription: config.description,
      frontmatter: JSON.stringify(data.data),
      markdownBody: data.content,
    }
  }
}
