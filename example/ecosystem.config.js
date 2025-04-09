module.exports = {
    apps: [
        { cwd: "test1", name: "test_one", script: "test", env: { PORT: 30055 } },
        { cwd: "test2", name: "test_two", script: "test", env: { PORT: 3000 } },
    ],
};
