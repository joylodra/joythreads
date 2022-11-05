export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'thread',
      title: 'Thread',
      description: 'Reference the Thread the comment is associated to:',
      type: 'reference',
      to: {
        type: 'thread'
      },
    },
  ],
};
