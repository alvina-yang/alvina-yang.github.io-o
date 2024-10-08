/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig, github } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading, Dot } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  margin-bottom: 15%;
  ${media.tablet`display: block;`};
`;
const StyledContent = styled.div`
  width: 60%;
  height: 100%
  align-items: flex
  max-width: 480px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  margin-bottom: 10px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled(Img)`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1); // Start in grayscale
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition}; // Ensure transitions are set to animate changes
`;

const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.lightestSlate};
  margin-left: -20px;
  &:hover ${StyledAvatar}, &:focus ${StyledAvatar} {
    filter: none; // Remove filter on hover/focus, showing the image in full color
  }
`;

const TechnologyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const TechnologyItem = styled.div`
  flex: 1;
  min-width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;

  h4 {
    color: ${colors.green};
  }

  ul {
    display: grid; // Using grid layout
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); // Create columns that fit content
    gap: 5%; // Space between items
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }

  div {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
  }

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.green};
    &:before {
      content: '▹';
      color: ${colors.green};
      margin-right: 10px;
    }
  }
`;

const About = ({ data, technologiesData }) => {
  const { frontmatter, html } = data[0].node;
  const { title, avatar } = frontmatter;
  const revealContainer = useRef(null);

  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading>
        <Dot>.</Dot>
        {title}
      </Heading>
      <StyledFlexContainer>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href={github}>
            <StyledAvatar fluid={frontmatter.avatar.childImageSharp.fluid} alt="Avatar" />
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>
      <Heading>Here's my tech stack!</Heading>
      <TechnologyContainer>
        {technologiesData.map(({ node }, i) => (
          <TechnologyItem key={i}>
            <h4>{node.frontmatter.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
            <ul>
              {node.frontmatter.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </TechnologyItem>
        ))}
      </TechnologyContainer>
    </StyledContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired,
  technologiesData: PropTypes.array.isRequired,
};

export default About;
