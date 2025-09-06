// 文件树管理类
class FileTree {
    constructor() {
        this.files = new Map(); // 存储文件内容
        this.structure = {}; // 文件树结构
        this.currentRepo = null;
        this.expandedFolders = new Set(); // 展开的文件夹
    }

    // 初始化文件树
    initialize(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`File tree container ${containerId} not found`);
            return;
        }
        
        // 加载模拟数据
        this.loadMockData();
        this.render();
    }

    // 加载模拟数据
    loadMockData() {
        this.structure = {
            'src': {
                type: 'folder',
                children: {
                    'components': {
                        type: 'folder',
                        children: {
                            'Login.jsx': {
                                type: 'file',
                                language: 'javascript',
                                lastModified: '2小时前',
                                author: '张三'
                            },
                            'Header.jsx': {
                                type: 'file',
                                language: 'javascript',
                                lastModified: '1天前',
                                author: '李四'
                            },
                            'Footer.jsx': {
                                type: 'file',
                                language: 'javascript',
                                lastModified: '3天前',
                                author: '王五'
                            }
                        }
                    },
                    'styles': {
                        type: 'folder',
                        children: {
                            'login.css': {
                                type: 'file',
                                language: 'css',
                                lastModified: '2小时前',
                                author: '张三'
                            },
                            'global.css': {
                                type: 'file',
                                language: 'css',
                                lastModified: '1周前',
                                author: '李四'
                            }
                        }
                    },
                    'utils': {
                        type: 'folder',
                        children: {
                            'api.js': {
                                type: 'file',
                                language: 'javascript',
                                lastModified: '5天前',
                                author: '王五'
                            },
                            'helpers.js': {
                                type: 'file',
                                language: 'javascript',
                                lastModified: '1周前',
                                author: '赵六'
                            }
                        }
                    }
                }
            },
            'public': {
                type: 'folder',
                children: {
                    'index.html': {
                        type: 'file',
                        language: 'html',
                        lastModified: '1周前',
                        author: '李四'
                    },
                    'favicon.ico': {
                        type: 'file',
                        language: 'text',
                        lastModified: '2周前',
                        author: '张三'
                    }
                }
            },
            'package.json': {
                type: 'file',
                language: 'json',
                lastModified: '3天前',
                author: '王五'
            },
            'README.md': {
                type: 'file',
                language: 'markdown',
                lastModified: '5天前',
                author: '张三'
            }
        };

        // 加载文件内容
        this.loadFileContents();
    }

    // 加载文件内容
    loadFileContents() {
        // 模拟文件内容
        this.files.set('src/components/Login.jsx', `import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 登录逻辑
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>用户登录</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;`);

        this.files.set('src/styles/login.css', `.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #5a6fd8;
}`);

        this.files.set('package.json', `{
  "name": "ecommerce-frontend",
  "version": "1.0.0",
  "description": "电商平台前端应用",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`);

        this.files.set('README.md', `# 电商平台前端

这是一个基于React构建的现代化电商平台前端应用。

## 功能特性

- 🎨 现代化UI设计
- 📱 响应式布局
- ⚡ 快速加载
- 🔒 安全认证

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite

## 快速开始

\`\`\`bash
npm install
npm run dev
\`\`\`

## 项目结构

\`\`\`
src/
├── components/     # 组件
├── pages/         # 页面
├── hooks/         # 自定义钩子
└── utils/         # 工具函数
\`\`\``);
    }

    // 渲染文件树
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="file-tree">
                <div class="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h5 class="text-xs font-medium text-gray-900">文件浏览器</h5>
                    <div class="flex space-x-1">
                        <button onclick="fileTree.createFile()" class="text-xs text-gray-600 hover:text-gray-900" title="新建文件">📄</button>
                        <button onclick="fileTree.createFolder()" class="text-xs text-gray-600 hover:text-gray-900" title="新建文件夹">📁</button>
                        <button onclick="fileTree.refresh()" class="text-xs text-gray-600 hover:text-gray-900" title="刷新">🔄</button>
                    </div>
                </div>
                <div class="file-tree-content p-2 text-xs overflow-auto" style="max-height: 350px;">
                    ${this.renderNode(this.structure, '')}
                </div>
            </div>
        `;
    }

    // 渲染节点
    renderNode(node, path, level = 0) {
        let html = '';
        const indent = '  '.repeat(level);

        for (const [name, item] of Object.entries(node)) {
            const fullPath = path ? `${path}/${name}` : name;
            const isExpanded = this.expandedFolders.has(fullPath);

            if (item.type === 'folder') {
                html += `
                    <div class="folder-item">
                        <div class="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded" 
                             onclick="fileTree.toggleFolder('${fullPath}')" style="padding-left: ${level * 12}px;">
                            <span class="folder-icon">${isExpanded ? '📂' : '📁'}</span>
                            <span class="folder-name">${name}</span>
                        </div>
                        ${isExpanded ? this.renderNode(item.children, fullPath, level + 1) : ''}
                    </div>
                `;
            } else {
                const icon = this.getFileIcon(item.language);
                html += `
                    <div class="file-item">
                        <div class="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded" 
                             onclick="fileTree.openFile('${fullPath}')" style="padding-left: ${level * 12}px;">
                            <span class="file-icon">${icon}</span>
                            <span class="file-name">${name}</span>
                        </div>
                    </div>
                `;
            }
        }

        return html;
    }

    // 获取文件图标
    getFileIcon(language) {
        const icons = {
            'javascript': '📜',
            'css': '🎨',
            'html': '🌐',
            'json': '📋',
            'markdown': '📝',
            'text': '📄'
        };
        return icons[language] || '📄';
    }

    // 切换文件夹展开状态
    toggleFolder(path) {
        if (this.expandedFolders.has(path)) {
            this.expandedFolders.delete(path);
        } else {
            this.expandedFolders.add(path);
        }
        this.render();
    }

    // 打开文件
    openFile(path) {
        const content = this.files.get(path) || `// 文件内容: ${path}\n// 这是一个示例文件`;
        const language = this.getLanguageFromPath(path);
        
        // 通知代码编辑器加载文件
        if (window.codeEditor && window.codeEditor.editor) {
            window.codeEditor.loadFile(path, content, language);
        }

        // 更新当前选中的文件
        this.highlightSelectedFile(path);
    }

    // 高亮选中的文件
    highlightSelectedFile(path) {
        // 移除之前的高亮
        const prevSelected = this.container.querySelector('.file-selected');
        if (prevSelected) {
            prevSelected.classList.remove('file-selected', 'bg-blue-100');
        }

        // 添加新的高亮
        const fileItems = this.container.querySelectorAll('.file-item div');
        fileItems.forEach(item => {
            if (item.onclick && item.onclick.toString().includes(path)) {
                item.classList.add('file-selected', 'bg-blue-100');
            }
        });
    }

    // 根据文件路径获取语言
    getLanguageFromPath(path) {
        const ext = path.split('.').pop().toLowerCase();
        const languageMap = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'css': 'css',
            'scss': 'scss',
            'html': 'html',
            'json': 'json',
            'md': 'markdown',
            'py': 'python',
            'java': 'java',
            'go': 'go',
            'php': 'php',
            'rb': 'ruby',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml'
        };
        return languageMap[ext] || 'text';
    }

    // 创建新文件
    createFile() {
        const fileName = prompt('请输入文件名:');
        if (fileName && fileName.trim()) {
            const content = `// 新文件: ${fileName}\n`;
            this.files.set(fileName, content);
            // 这里应该更新文件树结构，简化处理
            alert(`文件 ${fileName} 创建成功`);
        }
    }

    // 创建新文件夹
    createFolder() {
        const folderName = prompt('请输入文件夹名:');
        if (folderName && folderName.trim()) {
            // 这里应该更新文件树结构，简化处理
            alert(`文件夹 ${folderName} 创建成功`);
        }
    }

    // 刷新文件树
    refresh() {
        this.render();
    }
}

// 全局文件树实例
window.fileTree = new FileTree();
