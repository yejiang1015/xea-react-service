> 运行于 ts-node 环境，ts 配置文件，基于 webpack-chain，自定义再配置 webpack 的 React 快速开发项目脚手架

## `package.json`

```json
{
  "scripts": {
    "serve": "xea-react-service serve",
    "build": "xea-react-service build"
  }
}
```

## `xea.config.ts`

```js
import { Options } from '@xea/react-service/types'

const config: Options = {
  entryPath?: string;
  outputDir?: string;
  publicPath?: string;
  assetsDir?: string;
  includeDir?: RegExp[],
  excludeDir?: RegExp[],
  chainWebpack?: (config: Config, env:NODE_ENV_TYPE) => Config;
  devServer?: DevServer;
  htmlTitle?: string;
  /** 是否显示每个模块构建时间 */
  smp?: boolean;
}

export default config;

```

## Installation

```bash
npm install --save-dev @xea/react-service
```

## Links

- Demo [xea-react-service-pro](https://github.com/yejiang1015/xea-react-service-pro)

## Features

- xea.config.ts
- webpack-chain
- postcss

## License

[MIT](https://github.com/yejiang1015/xea-react-service/blob/master/LICENSE)
