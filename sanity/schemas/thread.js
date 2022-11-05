export default {
  name: 'thread',
  title: 'Thread',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in Thread',
      type: 'string',
    },
    {
      name: 'blockThread',
      title: 'Block Thread',
      description: 'ADMIN Controls: Toggle if Thread is deemed inappropriate',
      type: 'boolean'
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string'
    }
  ]
};
