module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['**/server.test.js'],
      collectCoverageFrom: ['server.js']
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['**/script.test.js', '**/tests/**/*.spec.js'],
      collectCoverageFrom: ['script.js']
    }
  ]
};
