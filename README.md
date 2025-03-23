/*
 * File: \\README.md
 * Project: spa-template
 * Created: Sun Mar 23 2025
 * Author: Admin
 * -----
 * Last Modified: Sunday, 23rd March 2025 11:23:48 pm
 * Modified By: Admin
 */

# SPA Template

一个现代化的React单页应用(SPA)模板，集成了常用工具和最佳实践。

## 特点

- **React 18** - 使用最新的React版本和相关工具
- **TypeScript** - 类型安全的JavaScript开发体验
- **现代化状态管理** - 使用Jotai和jotai-immer
- **路由** - 预配置的React Router 6
- **UI组件** - 集成Material UI组件库
- **样式解决方案** - 支持Tailwind CSS
- **测试框架**
  - Jest用于单元测试
  - Cypress用于端到端测试
  - BackstopJS用于UI差异测试
- **代码质量工具** - ESLint、Prettier和TypeScript
- **构建优化** - 使用Webpack 5和SWC进行快速构建

## 开始使用

### 前提条件

- Node.js (推荐使用v16+)
- pnpm

### 安装

```bash
# 克隆仓库
git clone [your-repo-url]
cd spa-template

# 安装依赖
pnpm install
```

## 可用的脚本

```bash
# 开发模式下编译
pnpm run clent:dev

# 启动开发服务器
pnpm run clent:server

# 生产模式编译
pnpm run clent:prod

# 运行单元测试
pnpm run test

# 运行端到端测试
pnpm run test:e2e

# 运行UI差异测试
pnpm run test:uidiff

# 代码格式化和Lint修复
pnpm run lint:fix
```

## 项目结构

```
├── src/                  # 源代码
│   ├── components/       # 可复用组件
│   ├── pages/            # 页面组件
│   ├── routes/           # 路由配置
│   ├── states/           # 状态管理
│   ├── hooks/            # 自定义React Hooks
│   ├── utils/            # 工具函数
│   ├── layouts/          # 布局组件
│   ├── abi/              # (可能用于Web3项目的ABI文件)
│   ├── connections/      # API连接和服务
│   └── index.tsx         # 应用入口
├── public/               # 静态资源
├── config/               # 配置文件
├── tests/                # 测试文件
└── cypress/              # Cypress测试
```

## 构建与部署

本模板使用Webpack进行构建。使用以下命令进行生产构建：

```bash
pnpm run clent:prod
```

构建后的文件将输出到`dist`目录，可以部署到任何静态文件服务器上。

## 自定义

- 修改`src/index.tsx`来更改应用入口
- 调整`webpack.config.js`以自定义构建过程
- 更新`tailwind.config.js`定制样式主题
- 修改`.eslintrc`和`prettier.config.js`自定义代码风格

## 许可证

本项目使用 [MIT 许可证](LICENSE)。 