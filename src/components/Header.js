import React from 'react';
import { FaGithub } from 'react-icons/fa';

import { useSiteMetadata } from 'hooks';
import Container from 'components/Container';

const Header = () => {
  const { title, githubUrl } = useSiteMetadata();
  return (
    <header>
      <Container type="content">
        <h1>
          { title }
        </h1>
        <p className="header-subtitle">
          <a href={githubUrl}>
            <FaGithub />
            View on Github
          </a>
        </p>
      </Container>
    </header>
  );
};

export default Header;
