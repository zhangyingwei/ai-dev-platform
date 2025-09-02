---
type: "agent_requested"
description: "项目特定规则模板：定义项目基本信息、代码规范、开发流程、分支管理、测试要求、部署规范、文档标准等项目级约束，需根据具体项目情况自定义填写，为团队协作提供统一标准。"
---

# 项目特定规则

## 项目信息
- **项目名称**: [请填写项目名称]
- **技术栈**: [请填写主要技术栈]
- **开发团队**: [请填写团队信息]
- **规则版本**: v1.0

## 代码规范

### 文件命名规范
```bash
# 根据项目类型调整以下规范

# JavaScript/TypeScript 项目
文件名: kebab-case (如: user-service.js, data-utils.ts)
组件名: PascalCase (如: UserProfile.vue, DataTable.jsx)

# Python 项目  
文件名: snake_case (如: user_service.py, data_utils.py)
类名: PascalCase (如: UserService, DataProcessor)

# Java 项目
文件名: PascalCase (如: UserService.java, DataProcessor.java)
包名: lowercase (如: com.company.module)

# Go 项目
文件名: snake_case (如: user_service.go, data_utils.go)
包名: lowercase (如: userservice, datautils)
```

### 目录结构规范
```
# 请根据项目实际情况调整目录结构
src/
├── components/     # 组件目录
├── services/       # 服务层
├── utils/          # 工具函数
├── types/          # 类型定义
├── constants/      # 常量定义
└── tests/          # 测试文件
```

## 开发流程

### 分支管理
- **主分支**: `main` - 生产环境代码
- **开发分支**: `develop` - 开发环境代码
- **功能分支**: `feature/功能名称` - 新功能开发
- **修复分支**: `hotfix/问题描述` - 紧急修复

### 代码审查要求
1. 所有代码必须经过 Code Review
2. 至少需要一名团队成员审查通过
3. 必须通过所有自动化测试
4. 符合项目编码规范

## 部署规范

### 环境配置
- **开发环境**: development
- **测试环境**: testing  
- **预生产环境**: staging
- **生产环境**: production

### 部署流程
1. 代码合并到对应分支
2. 自动化构建和测试
3. 部署到目标环境
4. 验证部署结果
5. 记录部署日志

## 文档要求

### 必需文档
- [ ] README.md - 项目说明
- [ ] CHANGELOG.md - 变更日志
- [ ] API.md - 接口文档（如适用）
- [ ] DEPLOYMENT.md - 部署指南

### 代码注释规范
```javascript
/**
 * 函数功能描述
 * @param {string} param1 - 参数1描述
 * @param {number} param2 - 参数2描述
 * @returns {boolean} 返回值描述
 * @example
 * // 使用示例
 * const result = functionName('test', 123);
 */
function functionName(param1, param2) {
    // 实现逻辑
}
```

## 安全要求

### 数据安全
- 敏感数据必须加密存储
- API 接口必须有身份验证
- 输入数据必须进行验证和清理

### 代码安全
- 不允许硬编码密码或密钥
- 使用环境变量管理配置
- 定期更新依赖包版本

## 性能要求

### 响应时间
- API 响应时间 < 500ms
- 页面加载时间 < 3s
- 数据库查询时间 < 100ms

### 资源使用
- 内存使用率 < 80%
- CPU 使用率 < 70%
- 磁盘使用率 < 85%

## 其他要求
确保代码遵循华博云开发注意事项

---

*项目规则版本: v1.0*  
*最后更新: 2025-01-15*  
*请根据项目实际情况调整以上规范*
