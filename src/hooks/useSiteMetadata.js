import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteMetadata () {
  const query = graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          githubUrl
        }
      }
    }
  `;
  const { site = {} } = useStaticQuery(query);
  return site.siteMetadata || {};
}
