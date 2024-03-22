import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const today = new Date();

inquirer
  .prompt(
    {
      name: 'url',
      message: 'What is the url identity of your new post?',
    },
    {
      name: 'title',
      message: 'What is the title of your new post?',
    },
    {
      name: 'description',
      message: 'What is the description of your new post?',
    },
    {
      name: 'category',
      message: 'What is the category of your new post?',
      type: 'list',
      choices: [
        'technology',
        'programming',
        'productivity',
        'lifestyle',
        'gadgets',
        'other',
      ],
    }
  )
  .then((answers) => {
    const urlIdentity = answers.url;
    const title = answers.title;
    const description = answers.description;
    const category = answers.category;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const postContent = `---
title: ${title}
publishedDate: ${today.getFullYear()}-${month}-${date}
lastUpdatedDate:
description: ${description}
category: ${category}
isPublished: false
---

## Write your post content here
`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const postPath = path.join(
      __dirname,
      '..',
      'content',
      'posts',
      `${urlIdentity}.mdx`
    );

    fs.writeFile(postPath, postContent, (err) => {
      if (err) {
        console.error('Error creating post:', err);
      } else {
        console.log('Post created successfully!');
      }
    });
  });
