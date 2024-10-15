module.exports = {
    apps: [
        {
            name: "FRIENDS-RESULT",
            script: "dist/app.js",
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production",
            }
        }
    ]
}