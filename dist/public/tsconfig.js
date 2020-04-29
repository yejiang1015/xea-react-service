"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    compileOnSave: true,
    compilerOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: "esnext",
        target: "es5",
        lib: ["es6", "dom"],
        sourceMap: true,
        allowJs: false,
        jsx: "react",
        rootDir: ".",
        baseUrl: ".",
        moduleResolution: "node",
        traceResolution: true,
        forceConsistentCasingInFileNames: true,
        noImplicitReturns: true,
        noImplicitThis: true,
        noImplicitAny: false,
        strictNullChecks: true,
        suppressImplicitAnyIndexErrors: true,
        noUnusedLocals: true,
        allowSyntheticDefaultImports: true,
        paths: {
            "~/*": ["./*"],
        },
    },
    awesomeTypescriptLoaderOptions: {
        forkChecker: true,
        useWebpackText: true,
    },
    include: ["src"],
    exclude: ["node_modules", "dist"],
};