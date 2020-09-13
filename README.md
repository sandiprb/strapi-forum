# Strapi application

## API Features
1. Forum questions
    - Strapi User model as author
    - Users can like questions
    - Increase view count on questions

2. Forum Answers
    - Strapi User model as author
    - Users can like/dislike questions
    - Each answer is associated with a Forum Question - ForeignKey

3. Forum Comments
    - Strapi User model as author
    - Users can like/dislike questions
    - Each answer is associated with a Forum Answer - ForeignKey

## Build Setup

```bash
# install dependencies
$ yarn

# serve admin localhost:1337/admin
$ yarn develop

# build for production and launch server
$ yarn build
$ yarn start

```