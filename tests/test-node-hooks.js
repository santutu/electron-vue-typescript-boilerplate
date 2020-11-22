require("ts-node").register({
    transpileOnly: true,
    compilerOptions: {

        esModuleInterop: true,
        noImplicitReturns: false,
        module: "commonjs",
        "types": [
            "reflect-metadata", "@types/chai", "node"
        ]
    },
});