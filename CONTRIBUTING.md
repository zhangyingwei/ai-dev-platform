# 贡献指南

感谢您对AI开发平台项目的关注！我们欢迎所有形式的贡献，包括但不限于代码、文档、设计、测试和反馈。

## 🤝 如何贡献

### 报告问题

如果您发现了bug或有功能建议，请：

1. 检查 [Issues](https://github.com/your-org/ai-dev-platform/issues) 确认问题未被报告
2. 创建新的Issue，使用合适的模板
3. 提供详细的描述和重现步骤
4. 如果可能，提供截图或错误日志

### 提交代码

1. **Fork项目**
   ```bash
   # 点击GitHub页面右上角的Fork按钮
   # 克隆您的Fork到本地
   git clone https://github.com/your-username/ai-dev-platform.git
   cd ai-dev-platform
   ```

2. **创建分支**
   ```bash
   # 从main分支创建新的功能分支
   git checkout -b feature/your-feature-name
   
   # 或者修复分支
   git checkout -b fix/issue-number
   ```

3. **开发和测试**
   ```bash
   # 进行您的更改
   # 确保代码符合项目规范
   # 运行测试确保没有破坏现有功能
   ```

4. **提交更改**
   ```bash
   # 添加更改的文件
   git add .
   
   # 提交更改，使用清晰的提交信息
   git commit -m "feat: 添加新功能描述"
   ```

5. **推送和创建PR**
   ```bash
   # 推送到您的Fork
   git push origin feature/your-feature-name
   
   # 在GitHub上创建Pull Request
   ```

## 📝 开发规范

### 代码风格

#### JavaScript
- 使用ES6+语法
- 使用2个空格缩进
- 使用分号结尾
- 使用驼峰命名法
- 添加适当的注释

```javascript
// ✅ 好的示例
const userName = 'admin';
const userService = {
  /**
   * 获取用户信息
   * @param {string} userId - 用户ID
   * @returns {Object} 用户对象
   */
  getUserInfo(userId) {
    return database.findUser(userId);
  }
};

// ❌ 避免的写法
var user_name = 'admin'
const userservice = {
  getuserinfo: function(userid) {
    return database.findUser(userid)
  }
}
```

#### HTML
- 使用语义化标签
- 保持适当的缩进
- 添加必要的属性

```html
<!-- ✅ 好的示例 -->
<section class="user-profile">
  <h2 class="profile-title">用户信息</h2>
  <form class="profile-form" role="form">
    <label for="username">用户名</label>
    <input type="text" id="username" name="username" required>
  </form>
</section>
```

#### CSS (TailwindCSS)
- 优先使用TailwindCSS类名
- 按功能分组类名
- 使用响应式设计

```html
<!-- ✅ 好的示例 -->
<div class="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
  <div class="flex-1 text-gray-800">
    <h3 class="text-lg font-semibold mb-2">标题</h3>
    <p class="text-sm text-gray-600">描述内容</p>
  </div>
</div>
```

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 类型说明
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### 示例
```bash
feat(auth): 添加用户登录功能

- 实现用户名密码登录
- 添加记住登录状态功能
- 集成JWT token验证

Closes #123
```

### 分支命名规范

- `feature/功能名称` - 新功能开发
- `fix/问题描述` - bug修复
- `docs/文档更新` - 文档相关
- `refactor/重构描述` - 代码重构

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- --grep "用户管理"

# 生成测试覆盖率报告
npm run test:coverage
```

### 编写测试
- 为新功能编写单元测试
- 确保测试覆盖率不低于80%
- 使用描述性的测试名称

```javascript
describe('用户服务', () => {
  describe('getUserInfo', () => {
    it('应该返回有效用户的信息', async () => {
      const userId = 'user123';
      const result = await userService.getUserInfo(userId);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
    });
    
    it('应该在用户不存在时抛出错误', async () => {
      const invalidUserId = 'invalid';
      
      await expect(userService.getUserInfo(invalidUserId))
        .rejects.toThrow('用户不存在');
    });
  });
});
```

## 📚 文档贡献

### 文档类型
- **README.md** - 项目概述和快速开始
- **docs/** - 详细的技术文档
- **代码注释** - 函数和类的说明
- **API文档** - 接口说明

### 文档规范
- 使用Markdown格式
- 保持结构清晰
- 添加适当的示例
- 定期更新过时内容

## 🎨 设计贡献

### UI/UX设计
- 遵循现有的设计系统
- 保持界面一致性
- 考虑可访问性
- 提供设计稿和说明

### 图标和图片
- 使用SVG格式的图标
- 优化图片大小
- 提供不同分辨率版本
- 确保版权清晰

## 🔍 代码审查

### 审查清单
- [ ] 代码符合项目规范
- [ ] 功能正常工作
- [ ] 测试覆盖充分
- [ ] 文档更新完整
- [ ] 性能影响可接受
- [ ] 安全性考虑充分

### 审查流程
1. 自动化检查通过
2. 至少一名维护者审查
3. 解决所有审查意见
4. 合并到主分支

## 📞 获取帮助

如果您在贡献过程中遇到问题：

1. 查看 [FAQ](docs/FAQ.md)
2. 搜索现有的 [Issues](https://github.com/your-org/ai-dev-platform/issues)
3. 在 [Discussions](https://github.com/your-org/ai-dev-platform/discussions) 中提问
4. 联系维护者团队

## 🏆 贡献者

感谢所有为项目做出贡献的开发者！

<!-- 这里会自动生成贡献者列表 -->

## 📄 许可证

通过贡献代码，您同意您的贡献将在与项目相同的 [MIT许可证](LICENSE) 下发布。

---

再次感谢您的贡献！每一个贡献都让这个项目变得更好。
