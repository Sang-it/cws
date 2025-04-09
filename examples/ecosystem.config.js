module.exports = {
  apps: [
    {
      name: "test_one",
      script: "test",
      env: { PORT: 30055 },
      cwd: "project_one",
    },
    {
      name: "test_two",
      script: "test",
      env: { PORT: 3000 },
      cwd: "project_two",
    },
  ],
};
