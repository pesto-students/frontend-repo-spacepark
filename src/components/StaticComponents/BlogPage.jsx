// BlogPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

const BlogCard = ({ title, date, excerpt, link }) => {
  return (
    <div className="blog-card">
      <h3>{title}</h3>
      <p className="blog-meta">Posted on {date}</p>
      <p>{excerpt}</p>
      <Link to={link} className="read-more-link">Read More</Link>
    </div>
  );
};

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'Title of Blog Post 1',
      date: 'June 20, 2024',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit, est nec ullamcorper posuere, nisi odio elementum justo, ac faucibus felis lorem eu nunc.',
      link: '/blog/post1'
    },
    {
      title: 'Title of Blog Post 2',
      date: 'June 22, 2024',
      excerpt: 'Fusce nec ex nec sapien vestibulum tincidunt id non felis. Sed consectetur risus id elit euismod tristique.',
      link: '/blog/post2'
    },
    {
      title: 'Title of Blog Post 3',
      date: 'June 25, 2024',
      excerpt: 'Phasellus malesuada leo nec ipsum vestibulum, sed auctor velit convallis. Proin convallis erat ac mauris finibus, quis rhoncus dolor bibendum.',
      link: '/blog/post3'
    },
    // Add more blog posts here
    {
      title: 'Title of Blog Post 4',
      date: 'June 28, 2024',
      excerpt: 'Aliquam vel tortor ut mauris finibus consequat. Sed quis enim vel metus ultrices sollicitudin nec nec ex.',
      link: '/blog/post4'
    },
    {
        title: 'Title of Blog Post 5',
        date: 'July 1, 2024',
        excerpt: 'Vivamus sed urna id lectus ultricies ultrices. Morbi sit amet magna quis velit tempus ultricies ac a elit.',
        link: '/blog/post5'
      }, {
        title: 'Title of Blog Post 5',
        date: 'July 1, 2024',
        excerpt: 'Vivamus sed urna id lectus ultricies ultrices. Morbi sit amet magna quis velit tempus ultricies ac a elit.',
        link: '/blog/post5'
      }
    // Add more blog posts as needed
  ];

  return (
    <div className="blog-page-container">
      <div className="blog-container">
        <h1 className='text-color my-3 pb-3 f-35'>Welcome to spacepark blogs page !</h1>
        <div className="blog-content">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              link={post.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
