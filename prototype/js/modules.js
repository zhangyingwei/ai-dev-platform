// AI开发平台原型系统 - 模块内容定义

// 需求管理模块内容
function getRequirementManagementContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">需求管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium" data-action="new-requirement">
                        新建需求
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium" data-action="requirement-templates">
                        需求模板
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium" data-action="batch-operations">
                        批量操作
                    </button>
                </div>
            </div>

            <!-- 标签页 -->
            <div class="border-b border-border">
                <nav class="flex space-x-6">
                    <button class="py-1.5 px-1 border-b-2 border-primary text-primary text-sm font-medium" data-tab="requirement-input">需求录入</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm" data-tab="requirement-approval">需求审批</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm" data-tab="ai-breakdown">AI拆解</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm" data-tab="requirement-tracking">需求跟踪</button>
                </nav>
            </div>

            <!-- 需求录入界面 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" data-tab-content="requirement-input">
                <!-- 需求录入表单 -->
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">需求录入</h2>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-xs font-medium mb-1">客户信息</label>
                            <select class="w-full px-2 py-1.5 border border-border rounded text-xs">
                                <option>ABC公司 - 企业管理系统项目</option>
                                <option>XYZ集团 - 电商平台项目</option>
                                <option>DEF科技 - 移动应用项目</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-medium mb-1">需求标题</label>
                            <input type="text" class="w-full px-2 py-1.5 border border-border rounded text-xs" placeholder="请输入需求标题">
                        </div>
                        <div>
                            <label class="block text-xs font-medium mb-1">需求描述</label>
                            <textarea class="w-full h-20 px-2 py-1.5 border border-border rounded text-xs resize-none" placeholder="详细描述需求内容，支持语音输入..."></textarea>
                            <div class="flex items-center justify-between mt-1">
                                <div class="flex space-x-1">
                                    <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-action="voice-input">🎤 语音输入</button>
                                    <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-action="use-template">📋 使用模板</button>
                                </div>
                                <span class="text-xs text-muted-foreground">0/500</span>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-medium mb-1">需求分类</label>
                            <div class="flex space-x-1">
                                <button class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded" data-category="functional">功能需求</button>
                                <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-category="performance">性能需求</button>
                                <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-category="ui">界面需求</button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-medium mb-1">优先级</label>
                            <div class="flex space-x-1">
                                <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-priority="high">🔴 高</button>
                                <button class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded" data-priority="medium">🟡 中</button>
                                <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-priority="low">🟢 低</button>
                            </div>
                        </div>
                        <div class="flex space-x-2 pt-2">
                            <button class="flex-1 px-3 py-1.5 border border-border rounded text-xs hover:bg-accent" data-action="save-draft">保存草稿</button>
                            <button class="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs hover:bg-gray-800" data-action="submit-approval">提交审批</button>
                        </div>
                    </div>
                </div>

                <!-- 最近需求列表 -->
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">最近需求</h2>
                    <div class="space-y-2">
                        <div class="p-2 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-requirement-id="req-001">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <p class="text-sm font-medium">用户登录优化需求</p>
                                    <p class="text-xs text-muted-foreground">ABC公司 | 张销售 | 2小时前</p>
                                </div>
                                <span class="px-1.5 py-0.5 bg-warning text-warning-foreground text-xs rounded">待审批</span>
                            </div>
                        </div>
                        <div class="p-2 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-requirement-id="req-002">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <p class="text-sm font-medium">支付功能增强</p>
                                    <p class="text-xs text-muted-foreground">XYZ集团 | 李售前 | 1天前</p>
                                </div>
                                <span class="px-1.5 py-0.5 bg-success text-success-foreground text-xs rounded">已通过</span>
                            </div>
                        </div>
                        <div class="p-2 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-requirement-id="req-003">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <p class="text-sm font-medium">数据报表功能</p>
                                    <p class="text-xs text-muted-foreground">DEF科技 | 王经理 | 3天前</p>
                                </div>
                                <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">AI拆解中</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 需求统计 -->
            <div class="bg-card border border-border rounded-lg p-4">
                <h2 class="text-base font-semibold mb-3">需求统计</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="text-xl font-bold text-primary">23</div>
                        <div class="text-xs text-muted-foreground">本月录入</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xl font-bold text-success">18</div>
                        <div class="text-xs text-muted-foreground">已审批</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xl font-bold text-warning">5</div>
                        <div class="text-xs text-muted-foreground">待审批</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xl font-bold text-muted-foreground">12</div>
                        <div class="text-xs text-muted-foreground">开发中</div>
                    </div>
                </div>
            </div>

            <!-- 需求审批界面 -->
            <div class="hidden" data-tab-content="requirement-approval">
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">待审批需求</h2>
                    <div class="space-y-3">
                        <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-requirement-id="req-001">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h3 class="font-medium text-sm">用户登录优化需求</h3>
                                    <p class="text-xs text-muted-foreground mt-1">提交人: 张销售 | 客户: ABC公司 | 提交时间: 2小时前</p>
                                    <p class="text-sm mt-2">用户希望能够通过手机号快速登录系统，提升登录体验和安全性。包括手机号验证、短信验证码、登录状态管理等功能。</p>
                                    <div class="flex items-center space-x-2 mt-2">
                                        <span class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">功能需求</span>
                                        <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">🟡 中优先级</span>
                                    </div>
                                </div>
                                <div class="flex flex-col space-y-2 ml-4">
                                    <button class="px-3 py-1 bg-success text-success-foreground text-xs rounded hover:bg-green-600" data-action="approve-requirement" data-requirement-id="req-001">✅ 通过</button>
                                    <button class="px-3 py-1 bg-destructive text-destructive-foreground text-xs rounded hover:bg-red-600" data-action="reject-requirement" data-requirement-id="req-001">❌ 拒绝</button>
                                    <button class="px-3 py-1 border border-border text-xs rounded hover:bg-accent" data-action="edit-requirement" data-requirement-id="req-001">📝 编辑</button>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-requirement-id="req-004">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h3 class="font-medium text-sm">数据导出功能</h3>
                                    <p class="text-xs text-muted-foreground mt-1">提交人: 李售前 | 客户: XYZ集团 | 提交时间: 1天前</p>
                                    <p class="text-sm mt-2">需要支持用户数据的Excel导出功能，包括筛选条件、分页导出、导出进度显示等。</p>
                                    <div class="flex items-center space-x-2 mt-2">
                                        <span class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">功能需求</span>
                                        <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">🟢 低优先级</span>
                                    </div>
                                </div>
                                <div class="flex flex-col space-y-2 ml-4">
                                    <button class="px-3 py-1 bg-success text-success-foreground text-xs rounded hover:bg-green-600" data-action="approve-requirement" data-requirement-id="req-004">✅ 通过</button>
                                    <button class="px-3 py-1 bg-destructive text-destructive-foreground text-xs rounded hover:bg-red-600" data-action="reject-requirement" data-requirement-id="req-004">❌ 拒绝</button>
                                    <button class="px-3 py-1 border border-border text-xs rounded hover:bg-accent" data-action="edit-requirement" data-requirement-id="req-004">📝 编辑</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-4 pt-4 border-t">
                        <div class="text-sm text-muted-foreground">共 2 个待审批需求</div>
                        <div class="flex space-x-2">
                            <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="batch-approve">批量通过</button>
                            <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="batch-reject">批量拒绝</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI拆解界面 -->
            <div class="hidden" data-tab-content="ai-breakdown">
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">AI需求拆解</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h3 class="font-medium text-sm mb-2">原始需求</h3>
                            <div class="p-3 border border-border rounded bg-muted">
                                <h4 class="font-medium text-sm">用户登录优化需求</h4>
                                <p class="text-sm mt-1">用户希望能够通过手机号快速登录系统，提升登录体验和安全性。</p>
                            </div>
                            <button class="w-full mt-3 px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-gray-800" data-action="start-ai-breakdown">🤖 开始AI拆解</button>
                        </div>
                        <div>
                            <h3 class="font-medium text-sm mb-2">拆解结果</h3>
                            <div class="space-y-2">
                                <div class="p-3 border border-border rounded">
                                    <div class="flex items-center justify-between">
                                        <h4 class="font-medium text-sm">手机号验证功能</h4>
                                        <span class="text-xs text-muted-foreground">预估: 2天</span>
                                    </div>
                                    <p class="text-xs text-muted-foreground mt-1">实现手机号格式验证、重复性检查</p>
                                </div>
                                <div class="p-3 border border-border rounded">
                                    <div class="flex items-center justify-between">
                                        <h4 class="font-medium text-sm">短信验证码功能</h4>
                                        <span class="text-xs text-muted-foreground">预估: 3天</span>
                                    </div>
                                    <p class="text-xs text-muted-foreground mt-1">集成短信服务、验证码生成和校验</p>
                                </div>
                                <div class="p-3 border border-border rounded">
                                    <div class="flex items-center justify-between">
                                        <h4 class="font-medium text-sm">登录状态管理</h4>
                                        <span class="text-xs text-muted-foreground">预估: 1天</span>
                                    </div>
                                    <p class="text-xs text-muted-foreground mt-1">JWT token管理、会话保持</p>
                                </div>
                            </div>
                            <div class="flex space-x-2 mt-3">
                                <button class="flex-1 px-3 py-1.5 bg-success text-success-foreground rounded text-sm" data-action="confirm-breakdown">确认拆解</button>
                                <button class="flex-1 px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="edit-breakdown">编辑拆解</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 需求跟踪界面 -->
            <div class="hidden" data-tab-content="requirement-tracking">
                <div class="space-y-4">
                    <div class="bg-card border border-border rounded-lg p-4">
                        <h2 class="text-base font-semibold mb-3">需求状态统计</h2>
                        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-500">23</div>
                                <div class="text-xs text-muted-foreground">总需求数</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-warning">5</div>
                                <div class="text-xs text-muted-foreground">待审批</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-primary">8</div>
                                <div class="text-xs text-muted-foreground">开发中</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-success">7</div>
                                <div class="text-xs text-muted-foreground">已完成</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-destructive">3</div>
                                <div class="text-xs text-muted-foreground">已拒绝</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-card border border-border rounded-lg p-4">
                        <h2 class="text-base font-semibold mb-3">需求进度跟踪</h2>
                        <div class="space-y-3">
                            <div class="p-3 border border-border rounded">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-medium text-sm">用户登录优化需求</h3>
                                    <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">开发中</span>
                                </div>
                                <div class="w-full bg-muted rounded-full h-2 mb-2">
                                    <div class="bg-primary h-2 rounded-full progress-bar" style="width: 60%"></div>
                                </div>
                                <div class="flex justify-between text-xs text-muted-foreground">
                                    <span>进度: 60%</span>
                                    <span>预计完成: 3天后</span>
                                </div>
                            </div>
                            <div class="p-3 border border-border rounded">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-medium text-sm">支付功能增强</h3>
                                    <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded">已完成</span>
                                </div>
                                <div class="w-full bg-muted rounded-full h-2 mb-2">
                                    <div class="bg-success h-2 rounded-full progress-bar" style="width: 100%"></div>
                                </div>
                                <div class="flex justify-between text-xs text-muted-foreground">
                                    <span>进度: 100%</span>
                                    <span>完成时间: 2天前</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// AI Agent数据结构和示例
const aiAgents = [
    {
        id: 'gemini-cli',
        name: 'Gemini CLI',
        description: 'Google Gemini命令行工具，支持代码生成和智能分析，擅长处理复杂的编程任务和自然语言理解',
        icon: '🤖',
        status: 'active',
        version: '1.2.0',
        capabilities: ['代码生成', '智能分析', '自然语言处理', '多模态理解'],
        config: {
            enabled: true,
            apiKey: 'demo-gemini-key-***',
            model: 'gemini-pro',
            maxTokens: 4096
        },
        examples: {
            useCase: '智能代码生成和分析',
            samplePrompt: '请帮我生成一个用户注册的API接口，包含邮箱验证和密码加密',
            sampleResponse: '已生成包含输入验证、密码哈希和错误处理的完整API代码',
            performance: {
                responseTime: '1.2s',
                accuracy: '94%',
                dailyUsage: 156
            }
        }
    },
    {
        id: 'claude-code',
        name: 'Claude Code',
        description: 'Anthropic Claude代码助手，专注于代码质量和安全性，提供深度的代码审查和优化建议',
        icon: '🧠',
        status: 'active',
        version: '2.1.0',
        capabilities: ['代码生成', '代码审查', '安全分析', '重构建议'],
        config: {
            enabled: true,
            apiKey: 'demo-claude-key-***',
            model: 'claude-3-sonnet',
            temperature: 0.1
        },
        examples: {
            useCase: '代码质量审查和安全分析',
            samplePrompt: '请审查这段代码的安全性和性能问题',
            sampleResponse: '发现3个潜在安全漏洞和2个性能优化点，已提供修复建议',
            performance: {
                responseTime: '0.8s',
                accuracy: '97%',
                dailyUsage: 203
            }
        }
    },
    {
        id: 'augment-code',
        name: 'Augment Code',
        description: '全栈开发助手，提供上下文感知的代码生成，深度理解项目结构和代码关系',
        icon: '⚡',
        status: 'active',
        version: '2.3.0',
        capabilities: ['全栈开发', '上下文感知', '代码重构', '架构设计'],
        config: {
            enabled: true,
            apiKey: 'demo-augment-key-***',
            contextWindow: 'large',
            autoRefactor: true
        },
        examples: {
            useCase: '全栈应用开发和架构设计',
            samplePrompt: '基于现有数据库模型生成完整的CRUD API',
            sampleResponse: '已生成前后端完整代码，包含数据验证、错误处理和测试用例',
            performance: {
                responseTime: '1.5s',
                accuracy: '92%',
                dailyUsage: 89
            }
        }
    },
    {
        id: 'codex',
        name: 'Codex',
        description: 'OpenAI Codex代码生成模型，支持多种编程语言，擅长代码补全和函数生成',
        icon: '🔮',
        status: 'inactive',
        version: '1.0.0',
        capabilities: ['代码生成', '代码补全', '多语言支持', '函数生成'],
        config: {
            enabled: false,
            apiKey: '',
            model: 'code-davinci-002',
            maxTokens: 2048
        },
        examples: {
            useCase: '快速代码补全和函数生成',
            samplePrompt: '// 创建一个计算斐波那契数列的函数',
            sampleResponse: '已生成优化的递归和迭代两种实现方式',
            performance: {
                responseTime: '0.6s',
                accuracy: '89%',
                dailyUsage: 0
            }
        }
    },
    {
        id: 'cursor',
        name: 'Cursor',
        description: 'AI驱动的代码编辑器，提供智能代码补全和重构，支持实时协作开发',
        icon: '📝',
        status: 'error',
        version: '3.0.1',
        capabilities: ['智能补全', '代码重构', '实时协作', '代码预测'],
        config: {
            enabled: false,
            apiKey: '',
            endpoint: 'https://api.cursor.sh',
            features: ['autocomplete', 'refactor']
        },
        examples: {
            useCase: '实时代码编辑和智能补全',
            samplePrompt: '在编辑器中输入函数名，自动补全函数体',
            sampleResponse: '连接错误：无法访问Cursor API服务',
            performance: {
                responseTime: 'N/A',
                accuracy: 'N/A',
                dailyUsage: 0
            }
        }
    }
];

// AI Agent管理模块内容
function getAIAgentContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">AI Agent 管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium" onclick="window.aiAgentManager.importConfig()">
                        导入配置
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium" onclick="window.aiAgentManager.exportConfig()">
                        导出配置
                    </button>
                </div>
            </div>

            <!-- 标签页 -->
            <div class="border-b border-border">
                <nav class="flex space-x-6">
                    <button class="py-1.5 px-1 border-b-2 border-primary text-primary text-sm font-medium">AI Agent 列表</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm">全局配置</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm">使用统计</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm">性能监控</button>
                </nav>
            </div>

            <!-- AI Agent 卡片列表 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="ai-agent-cards">
                <!-- 卡片将通过JavaScript动态生成 -->
            </div>

            <!-- 加载状态 -->
            <div id="loading-indicator" class="hidden flex items-center justify-center py-12">
                <div class="flex items-center space-x-2 text-muted-foreground">
                    <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span class="text-sm">正在加载 AI Agent...</span>
                </div>
            </div>

            <!-- 空状态 -->
            <div id="empty-state" class="hidden text-center py-12">
                <div class="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <h3 class="text-lg font-medium mb-2">暂无 AI Agent</h3>
                <p class="text-muted-foreground text-sm">请添加或配置 AI Agent 以开始使用</p>
            </div>
            </div>

            <!-- 使用统计 -->
            <div class="bg-card border border-border rounded-lg p-4">
                <h2 class="text-base font-semibold mb-3">今日使用统计</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="text-center">
                        <div class="text-xl font-bold text-primary">23</div>
                        <div class="text-xs text-muted-foreground">代码生成次数</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xl font-bold text-success">15</div>
                        <div class="text-xs text-muted-foreground">代码审查次数</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xl font-bold text-warning">8</div>
                        <div class="text-xs text-muted-foreground">优化建议次数</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 开发流程模块内容
function getDevelopmentContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">开发流程</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        新建需求
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        AI助手
                    </button>
                </div>
            </div>

            <!-- AI代码生成工作台 -->
            <div class="bg-card border border-border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                    <h2 class="text-base font-semibold">AI代码生成工作台</h2>
                    <div class="flex space-x-1.5">
                        <select class="px-2 py-1 border border-border rounded text-xs">
                            <option>Claude Code</option>
                            <option>Gemini Code</option>
                            <option>协同模式</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <!-- 需求描述 -->
                    <div>
                        <label class="block text-xs font-medium mb-2">需求描述</label>
                        <textarea class="w-full h-24 p-2 border border-border rounded text-xs resize-none"
                                  placeholder="描述您的功能需求，AI将为您生成相应的代码...">创建一个用户注册API，包含以下功能：
1. 邮箱格式验证
2. 密码强度检查
3. 用户名重复检查
4. 发送验证邮件

技术要求：Spring Boot + MySQL + Redis</textarea>
                        <div class="flex items-center justify-between mt-2">
                            <div class="flex space-x-1">
                                <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">Java</span>
                                <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">Spring Boot</span>
                                <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">MySQL</span>
                            </div>
                            <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs hover:bg-gray-800 font-medium">
                                生成代码
                            </button>
                        </div>
                    </div>

                    <!-- 生成结果 -->
                    <div>
                        <label class="block text-xs font-medium mb-2">生成代码</label>
                        <div class="h-24 p-2 bg-muted border border-border rounded font-mono text-xs overflow-auto">
                            <pre class="text-foreground">@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(
        @Valid @RequestBody UserDto dto) {
        // 验证逻辑
        User user = userService.register(dto);
        return ResponseEntity.ok(user);
    }
}</pre>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                            <div class="flex items-center space-x-2 text-xs">
                                <span class="text-success">✅ 语法正确</span>
                                <span class="text-success">✅ 最佳实践</span>
                                <span class="text-warning">⚠️ 需要优化</span>
                            </div>
                            <div class="flex space-x-1">
                                <button class="px-2 py-1 border border-border rounded text-xs hover:bg-accent">复制</button>
                                <button class="px-2 py-1 border border-border rounded text-xs hover:bg-accent">应用</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 最近生成记录 -->
            <div class="bg-card border border-border rounded-lg p-4">
                <h2 class="text-base font-semibold mb-3">最近生成记录</h2>
                <div class="space-y-2">
                    <div class="flex items-center justify-between p-2 border border-border rounded">
                        <div class="flex-1">
                            <p class="text-sm font-medium">用户注册API实现</p>
                            <p class="text-xs text-muted-foreground">Spring Boot + MySQL + Redis | 2分钟前</p>
                        </div>
                        <div class="flex items-center space-x-1.5">
                            <span class="px-1.5 py-0.5 bg-success text-success-foreground text-xs rounded">已应用</span>
                            <button class="text-muted-foreground hover:text-foreground text-xs">查看</button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-2 border border-border rounded">
                        <div class="flex-1">
                            <p class="text-sm font-medium">数据库连接池配置</p>
                            <p class="text-xs text-muted-foreground">HikariCP配置优化 | 1小时前</p>
                        </div>
                        <div class="flex items-center space-x-1.5">
                            <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">草稿</span>
                            <button class="text-muted-foreground hover:text-foreground text-xs">查看</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 项目管理模块内容
function getProjectsContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">项目管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        新建项目
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        导入项目
                    </button>
                </div>
            </div>

            <!-- 项目统计 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-card border border-border rounded-lg p-4 text-center">
                    <div class="text-xl font-bold text-primary">12</div>
                    <div class="text-xs text-muted-foreground">总项目数</div>
                </div>
                <div class="bg-card border border-border rounded-lg p-4 text-center">
                    <div class="text-xl font-bold text-success">8</div>
                    <div class="text-xs text-muted-foreground">进行中</div>
                </div>
                <div class="bg-card border border-border rounded-lg p-4 text-center">
                    <div class="text-xl font-bold text-warning">3</div>
                    <div class="text-xs text-muted-foreground">待启动</div>
                </div>
                <div class="bg-card border border-border rounded-lg p-4 text-center">
                    <div class="text-xl font-bold text-muted-foreground">1</div>
                    <div class="text-xs text-muted-foreground">已完成</div>
                </div>
            </div>

            <!-- 项目列表 -->
            <div class="bg-card border border-border rounded-lg">
                <div class="p-4 border-b border-border">
                    <div class="flex items-center justify-between">
                        <h2 class="text-base font-semibold">项目列表</h2>
                        <div class="flex space-x-2">
                            <input type="text" placeholder="搜索项目..."
                                   class="px-2 py-1.5 border border-border rounded text-xs">
                            <select class="px-2 py-1.5 border border-border rounded text-xs">
                                <option>全部状态</option>
                                <option>进行中</option>
                                <option>待启动</option>
                                <option>已完成</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-muted">
                            <tr>
                                <th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">项目名称</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">负责人</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">进度</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">状态</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">截止日期</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr class="hover:bg-accent">
                                <td class="px-4 py-3">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                                            <span class="text-primary-foreground font-bold text-xs">AI</span>
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium">AI开发平台</div>
                                            <div class="text-xs text-muted-foreground">智能化开发工具平台</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center">
                                        <div class="w-6 h-6 bg-muted rounded-full flex items-center justify-center mr-1.5">
                                            <span class="text-xs">张</span>
                                        </div>
                                        <span class="text-xs">张三</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="w-full bg-muted rounded-full h-1.5">
                                        <div class="bg-primary h-1.5 rounded-full" style="width: 75%"></div>
                                    </div>
                                    <span class="text-xs text-muted-foreground mt-0.5">75%</span>
                                </td>
                                <td class="px-4 py-3">
                                    <span class="px-1.5 py-0.5 bg-success text-success-foreground text-xs rounded-full">进行中</span>
                                </td>
                                <td class="px-4 py-3 text-xs text-muted-foreground">2025-02-15</td>
                                <td class="px-4 py-3">
                                    <div class="flex space-x-1.5">
                                        <button class="text-primary hover:underline text-xs">查看</button>
                                        <button class="text-muted-foreground hover:text-foreground text-xs">编辑</button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="hover:bg-accent">
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mr-3">
                                            <span class="text-muted-foreground font-bold text-sm">E</span>
                                        </div>
                                        <div>
                                            <div class="font-medium">电商管理系统</div>
                                            <div class="text-sm text-muted-foreground">在线商城后台管理</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-muted rounded-full flex items-center justify-center mr-2">
                                            <span class="text-xs">李</span>
                                        </div>
                                        <span class="text-sm">李四</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="w-full bg-muted rounded-full h-2">
                                        <div class="bg-warning h-2 rounded-full" style="width: 45%"></div>
                                    </div>
                                    <span class="text-xs text-muted-foreground mt-1">45%</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded-full">进行中</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">2025-03-01</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-primary hover:underline text-sm">查看</button>
                                        <button class="text-muted-foreground hover:text-foreground text-sm">编辑</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// 运维监控模块内容
function getMonitoringContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">运维监控</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        新建告警
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        监控配置
                    </button>
                </div>
            </div>

            <!-- 系统状态概览 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">系统状态</p>
                            <p class="text-xl font-bold text-success">正常</p>
                            <p class="text-xs text-success">↗️ 99.9% 可用性</p>
                        </div>
                        <div class="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                            <span class="text-base text-success">✅</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">响应时间</p>
                            <p class="text-xl font-bold">1.2s</p>
                            <p class="text-xs text-success">↘️ -0.3s (优化)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">⚡</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">活跃用户</p>
                            <p class="text-xl font-bold">1,234</p>
                            <p class="text-xs text-success">↗️ +15% (今日)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">👥</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">错误率</p>
                            <p class="text-xl font-bold text-success">0.1%</p>
                            <p class="text-xs text-success">↘️ -0.05% (改善)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">📊</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 监控图表 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">CPU使用率</h2>
                    <div class="h-32 bg-muted rounded flex items-center justify-center">
                        <span class="text-muted-foreground text-sm">CPU使用率图表</span>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">内存使用率</h2>
                    <div class="h-32 bg-muted rounded flex items-center justify-center">
                        <span class="text-muted-foreground text-sm">内存使用率图表</span>
                    </div>
                </div>
            </div>

            <!-- 告警列表 -->
            <div class="bg-card border border-border rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold">最近告警</h2>
                    <button class="text-sm text-muted-foreground hover:text-foreground">查看全部</button>
                </div>
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-warning rounded-full"></div>
                            <div>
                                <p class="font-medium">数据库连接数过高</p>
                                <p class="text-sm text-muted-foreground">当前连接数: 85/100 | 5分钟前</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">警告</span>
                            <button class="text-muted-foreground hover:text-foreground text-sm">处理</button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-success rounded-full"></div>
                            <div>
                                <p class="font-medium">磁盘空间不足告警已解决</p>
                                <p class="text-sm text-muted-foreground">磁盘使用率: 75% | 1小时前</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded">已解决</span>
                            <button class="text-muted-foreground hover:text-foreground text-sm">查看</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 开发资源管理模块内容
function getResourcesContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">开发资源管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        添加服务器
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        创建数据库
                    </button>
                </div>
            </div>

            <!-- 资源概览 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">服务器</p>
                            <p class="text-xl font-bold">25台</p>
                            <p class="text-xs text-success">↗️ +2 (本周)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">🖥️</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">数据库实例</p>
                            <p class="text-xl font-bold">12个</p>
                            <p class="text-xs text-muted-foreground">运行中</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">🗄️</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">容器</p>
                            <p class="text-xl font-bold">48个</p>
                            <p class="text-xs text-success">↗️ +8 (今日)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">🐳</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">存储使用</p>
                            <p class="text-xl font-bold">6.5TB</p>
                            <p class="text-xs text-muted-foreground">/ 10TB</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">💾</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 标签页 -->
            <div class="border-b border-border">
                <nav class="flex space-x-8">
                    <button class="py-2 px-1 border-b-2 border-primary text-primary font-medium">服务器管理</button>
                    <button class="py-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">数据库管理</button>
                    <button class="py-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">容器管理</button>
                    <button class="py-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">存储管理</button>
                </nav>
            </div>

            <!-- 服务器列表 -->
            <div class="bg-card border border-border rounded-lg">
                <div class="p-6 border-b border-border">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">服务器列表</h2>
                        <div class="flex space-x-3">
                            <input type="text" placeholder="搜索服务器..."
                                   class="px-3 py-2 border border-border rounded-lg text-sm">
                            <select class="px-3 py-2 border border-border rounded-lg text-sm">
                                <option>全部状态</option>
                                <option>运行中</option>
                                <option>维护中</option>
                                <option>异常</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-muted">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">服务器名称</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">IP地址</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">类型</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">状态</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">CPU</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">内存</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr class="hover:bg-accent">
                                <td class="px-6 py-4 font-medium">web-server-01</td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">192.168.1.10</td>
                                <td class="px-6 py-4 text-sm">物理机</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">运行中</span>
                                </td>
                                <td class="px-6 py-4 text-sm">45%</td>
                                <td class="px-6 py-4 text-sm">60%</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-primary hover:underline text-sm">监控</button>
                                        <button class="text-muted-foreground hover:text-foreground text-sm">配置</button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="hover:bg-accent">
                                <td class="px-6 py-4 font-medium">db-server-01</td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">192.168.1.20</td>
                                <td class="px-6 py-4 text-sm">虚拟机</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">运行中</span>
                                </td>
                                <td class="px-6 py-4 text-sm">30%</td>
                                <td class="px-6 py-4 text-sm">80%</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-primary hover:underline text-sm">监控</button>
                                        <button class="text-muted-foreground hover:text-foreground text-sm">配置</button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="hover:bg-accent">
                                <td class="px-6 py-4 font-medium">backup-server-01</td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">192.168.1.40</td>
                                <td class="px-6 py-4 text-sm">物理机</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded-full">异常</span>
                                </td>
                                <td class="px-6 py-4 text-sm">95%</td>
                                <td class="px-6 py-4 text-sm">90%</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-destructive hover:underline text-sm">修复</button>
                                        <button class="text-muted-foreground hover:text-foreground text-sm">重启</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// 系统管理模块内容
function getSystemContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">系统管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        新建用户
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        系统设置
                    </button>
                </div>
            </div>

            <!-- 系统概览 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">总用户数</p>
                            <p class="text-xl font-bold">156</p>
                            <p class="text-xs text-success">↗️ +12 (本月)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">👥</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-muted-foreground">活跃用户</p>
                            <p class="text-xl font-bold">89</p>
                            <p class="text-xs text-success">↗️ +5 (今日)</p>
                        </div>
                        <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-base">🟢</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-muted-foreground">角色数量</p>
                            <p class="text-2xl font-bold">8</p>
                            <p class="text-xs text-muted-foreground">权限角色</p>
                        </div>
                        <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-xl">🔐</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-muted-foreground">系统版本</p>
                            <p class="text-2xl font-bold">v2.1.0</p>
                            <p class="text-xs text-muted-foreground">最新版本</p>
                        </div>
                        <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <span class="text-xl">⚙️</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 标签页 -->
            <div class="border-b border-border">
                <nav class="flex space-x-8">
                    <button class="py-2 px-1 border-b-2 border-primary text-primary font-medium">用户管理</button>
                    <button class="py-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">权限管理</button>
                    <button class="py-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">系统配置</button>
                    <button class="py-2 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">审计日志</button>
                </nav>
            </div>

            <!-- 用户管理 -->
            <div class="bg-card border border-border rounded-lg">
                <div class="p-6 border-b border-border">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold">用户列表</h2>
                        <div class="flex space-x-3">
                            <input type="text" placeholder="搜索用户..."
                                   class="px-3 py-2 border border-border rounded-lg text-sm">
                            <select class="px-3 py-2 border border-border rounded-lg text-sm">
                                <option>全部角色</option>
                                <option>管理员</option>
                                <option>开发者</option>
                                <option>测试员</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-muted">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">用户</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">邮箱</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">角色</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">状态</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">最后登录</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border">
                            <tr class="hover:bg-accent">
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                                            <span class="text-primary-foreground font-bold text-sm">张</span>
                                        </div>
                                        <div>
                                            <div class="font-medium">张三</div>
                                            <div class="text-sm text-muted-foreground">高级开发工程师</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">zhangsan@example.com</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">管理员</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">活跃</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">2小时前</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-primary hover:underline text-sm">编辑</button>
                                        <button class="text-muted-foreground hover:text-foreground text-sm">权限</button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="hover:bg-accent">
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                                            <span class="text-muted-foreground font-bold text-sm">李</span>
                                        </div>
                                        <div>
                                            <div class="font-medium">李四</div>
                                            <div class="text-sm text-muted-foreground">前端开发工程师</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">lisi@example.com</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">开发者</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">活跃</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-muted-foreground">1天前</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-2">
                                        <button class="text-primary hover:underline text-sm">编辑</button>
                                        <button class="text-muted-foreground hover:text-foreground text-sm">权限</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// 开发管理模块内容
function getDevelopmentManagementContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">开发管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        新建任务
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        AI助手配置
                    </button>
                </div>
            </div>

            <!-- 标签页 -->
            <div class="border-b border-border">
                <nav class="flex space-x-6">
                    <button class="py-1.5 px-1 border-b-2 border-primary text-primary text-sm font-medium" data-tab="task-assignment">任务分配</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm" data-tab="ai-agent-selection">AI Agent选择</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm" data-tab="code-generation">代码生成</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm" data-tab="progress-tracking">进度跟踪</button>
                </nav>
            </div>

            <!-- AI Agent选择界面 -->
            <div class="bg-card border border-border rounded-lg p-4" data-tab-content="ai-agent-selection">
                <h2 class="text-base font-semibold mb-3">AI开发助手选择</h2>
                <p class="text-xs text-muted-foreground mb-4">当前任务: 用户登录优化需求 - 登录方式优化功能</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Claude Code -->
                    <div class="border border-border rounded-lg p-3 hover:bg-accent cursor-pointer">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span class="text-primary-foreground font-bold text-xs">C</span>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-sm">Claude Code</h3>
                                    <div class="flex items-center space-x-1">
                                        <div class="flex">
                                            <span class="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</span>
                                        </div>
                                        <span class="text-xs text-muted-foreground">推荐</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-1.5 h-1.5 bg-success rounded-full status-indicator online"></div>
                                <span class="text-xs text-success">在线</span>
                            </div>
                        </div>
                        <p class="text-xs text-muted-foreground mb-2">特长: 代码生成、逻辑优化、注释生成</p>
                        <p class="text-xs text-muted-foreground mb-2">适用: React组件开发、业务逻辑实现</p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">响应时间: 1.2s</span>
                            <span class="text-muted-foreground">今日使用: 23次</span>
                        </div>
                        <div class="mt-2">
                            <button class="w-full px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs hover:bg-gray-800" data-agent="claude-code" data-action="select-agent">✅ 选择</button>
                        </div>
                    </div>

                    <!-- Cursor AI -->
                    <div class="border border-border rounded-lg p-3 hover:bg-accent cursor-pointer">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <span class="text-white font-bold text-xs">Cu</span>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-sm">Cursor AI</h3>
                                    <div class="flex items-center space-x-1">
                                        <div class="flex">
                                            <span class="text-yellow-400 text-xs">⭐⭐⭐⭐</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-1.5 h-1.5 bg-success rounded-full status-indicator online"></div>
                                <span class="text-xs text-success">在线</span>
                            </div>
                        </div>
                        <p class="text-xs text-muted-foreground mb-2">特长: 智能补全、重构建议、错误修复</p>
                        <p class="text-xs text-muted-foreground mb-2">适用: 代码编辑、实时补全、代码优化</p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">响应时间: 0.8s</span>
                            <span class="text-muted-foreground">今日使用: 45次</span>
                        </div>
                        <div class="mt-2">
                            <button class="w-full px-3 py-1.5 border border-border rounded text-xs hover:bg-accent" data-agent="cursor-ai" data-action="select-agent">选择</button>
                        </div>
                    </div>

                    <!-- GitHub Copilot -->
                    <div class="border border-border rounded-lg p-3 opacity-60" data-agent="github-copilot">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                                    <span class="text-white font-bold text-xs">GH</span>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-sm">GitHub Copilot</h3>
                                    <div class="flex items-center space-x-1">
                                        <div class="flex">
                                            <span class="text-yellow-400 text-xs">⭐⭐⭐</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                                <span class="text-xs text-destructive">离线</span>
                            </div>
                        </div>
                        <p class="text-xs text-muted-foreground mb-2">特长: 代码建议、模式识别、多语言支持</p>
                        <p class="text-xs text-muted-foreground mb-2">适用: 通用代码生成、API调用、数据处理</p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">最后在线: 2小时前</span>
                            <span class="text-muted-foreground">今日使用: 12次</span>
                        </div>
                        <div class="mt-2">
                            <button class="w-full px-3 py-1.5 bg-muted text-muted-foreground rounded text-xs cursor-not-allowed" disabled>❌ 离线</button>
                        </div>
                    </div>

                    <!-- Augment Code -->
                    <div class="border border-border rounded-lg p-3 hover:bg-accent cursor-pointer" data-agent="augment-code">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                    <span class="text-white font-bold text-xs">A</span>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-sm">Augment Code</h3>
                                    <div class="flex items-center space-x-1">
                                        <div class="flex">
                                            <span class="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</span>
                                        </div>
                                        <span class="text-xs text-muted-foreground">全栈</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-1.5 h-1.5 bg-success rounded-full status-indicator online"></div>
                                <span class="text-xs text-success">在线</span>
                            </div>
                        </div>
                        <p class="text-xs text-muted-foreground mb-2">特长: 全栈开发、架构设计、项目管理</p>
                        <p class="text-xs text-muted-foreground mb-2">适用: 完整功能开发、系统集成、代码重构</p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted-foreground">响应时间: 1.5s</span>
                            <span class="text-muted-foreground">今日使用: 8次</span>
                        </div>
                        <div class="mt-2">
                            <button class="w-full px-3 py-1.5 border border-border rounded text-xs hover:bg-accent" data-agent="augment-code" data-action="select-agent">选择</button>
                        </div>
                    </div>
                </div>

                <!-- 协同模式选择 -->
                <div class="mt-4 p-3 bg-muted rounded-lg">
                    <h3 class="text-sm font-medium mb-2">协同模式</h3>
                    <div class="flex space-x-2">
                        <button class="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-mode="single">单一Agent</button>
                        <button class="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded" data-mode="multi">多Agent协作</button>
                        <button class="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded hover:bg-accent" data-mode="smart">智能切换</button>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex space-x-2 mt-4">
                    <button class="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-gray-800" data-action="start-ai-development">🚀 开始AI开发</button>
                    <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="performance-compare">📊 性能对比</button>
                    <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="agent-management">⚙️ Agent管理</button>
                </div>
            </div>

            <!-- 开发任务列表 -->
            <div class="bg-card border border-border rounded-lg p-4">
                <h2 class="text-base font-semibold mb-3">开发任务</h2>
                <div class="space-y-2">
                    <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-task-id="task-001">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <p class="text-sm font-medium">手机号登录功能</p>
                                <p class="text-xs text-muted-foreground">分配给: 张开发 | AI助手: Claude Code | 预计: 3天</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-1.5 py-0.5 bg-warning text-warning-foreground text-xs rounded">进行中</span>
                                <span class="text-xs text-muted-foreground">60%</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer hover-card" data-task-id="task-002">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <p class="text-sm font-medium">密码重置功能</p>
                                <p class="text-xs text-muted-foreground">分配给: 李前端 | AI助手: Cursor AI | 预计: 2天</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">待开始</span>
                                <span class="text-xs text-muted-foreground">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 任务分配界面 -->
            <div class="hidden" data-tab-content="task-assignment">
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">智能任务分配</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h3 class="font-medium text-sm mb-2">待分配任务</h3>
                            <div class="space-y-2">
                                <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer" data-task="unassigned-1">
                                    <h4 class="font-medium text-sm">手机号登录功能</h4>
                                    <p class="text-xs text-muted-foreground mt-1">预估工作量: 3天 | 技能要求: React, Node.js</p>
                                    <div class="flex items-center space-x-2 mt-2">
                                        <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">🟡 中优先级</span>
                                        <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">未分配</span>
                                    </div>
                                </div>
                                <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer" data-task="unassigned-2">
                                    <h4 class="font-medium text-sm">密码重置功能</h4>
                                    <p class="text-xs text-muted-foreground mt-1">预估工作量: 2天 | 技能要求: Vue.js, PHP</p>
                                    <div class="flex items-center space-x-2 mt-2">
                                        <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">🟢 低优先级</span>
                                        <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">未分配</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-medium text-sm mb-2">团队成员负载</h3>
                            <div class="space-y-3">
                                <div class="p-3 border border-border rounded">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center space-x-2">
                                            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">张</div>
                                            <div>
                                                <p class="font-medium text-sm">张开发</p>
                                                <p class="text-xs text-muted-foreground">React, Node.js, TypeScript</p>
                                            </div>
                                        </div>
                                        <span class="text-xs text-warning">75%</span>
                                    </div>
                                    <div class="w-full bg-muted rounded-full h-2">
                                        <div class="bg-warning h-2 rounded-full" style="width: 75%"></div>
                                    </div>
                                    <p class="text-xs text-muted-foreground mt-1">当前任务: 2个 | 预计完成: 5天后</p>
                                </div>
                                <div class="p-3 border border-border rounded">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center space-x-2">
                                            <div class="w-8 h-8 bg-success rounded-full flex items-center justify-center text-success-foreground text-xs font-bold">李</div>
                                            <div>
                                                <p class="font-medium text-sm">李前端</p>
                                                <p class="text-xs text-muted-foreground">Vue.js, CSS, JavaScript</p>
                                            </div>
                                        </div>
                                        <span class="text-xs text-success">45%</span>
                                    </div>
                                    <div class="w-full bg-muted rounded-full h-2">
                                        <div class="bg-success h-2 rounded-full" style="width: 45%"></div>
                                    </div>
                                    <p class="text-xs text-muted-foreground mt-1">当前任务: 1个 | 预计完成: 2天后</p>
                                </div>
                            </div>
                            <button class="w-full mt-3 px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-gray-800" data-action="auto-assign">🤖 智能分配</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 代码生成界面 -->
            <div class="hidden" data-tab-content="code-generation">
                <div class="bg-card border border-border rounded-lg p-4">
                    <h2 class="text-base font-semibold mb-3">AI代码生成</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h3 class="font-medium text-sm mb-2">需求输入</h3>
                            <textarea class="w-full h-32 px-3 py-2 border border-border rounded resize-none" placeholder="请输入详细的功能需求描述...">实现用户手机号登录功能，包括手机号验证、短信验证码发送、验证码校验、登录状态管理等功能。</textarea>
                            <div class="grid grid-cols-2 gap-2 mt-3">
                                <div>
                                    <label class="block text-xs font-medium mb-1">技术栈</label>
                                    <select class="w-full px-2 py-1.5 border border-border rounded text-xs">
                                        <option>React + Node.js</option>
                                        <option>Vue.js + PHP</option>
                                        <option>Angular + Java</option>
                                        <option>Next.js + TypeScript</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium mb-1">代码风格</label>
                                    <select class="w-full px-2 py-1.5 border border-border rounded text-xs">
                                        <option>标准风格</option>
                                        <option>简洁风格</option>
                                        <option>详细注释</option>
                                        <option>企业级</option>
                                    </select>
                                </div>
                            </div>
                            <button class="w-full mt-3 px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-gray-800" data-action="generate-code">🚀 生成代码</button>
                        </div>
                        <div>
                            <h3 class="font-medium text-sm mb-2">生成结果</h3>
                            <div class="border border-border rounded p-3 bg-muted h-64 overflow-y-auto">
                                <pre class="text-xs"><code>// 手机号登录组件
import React, { useState } from 'react';

const PhoneLogin = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    // 发送验证码逻辑
  };

  const handleLogin = async () => {
    // 登录验证逻辑
  };

  return (
    &lt;div className="login-form"&gt;
      {/* 登录表单内容 */}
    &lt;/div&gt;
  );
};

export default PhoneLogin;</code></pre>
                            </div>
                            <div class="flex space-x-2 mt-3">
                                <button class="flex-1 px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="copy-code">📋 复制</button>
                                <button class="flex-1 px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="download-code">💾 下载</button>
                                <button class="flex-1 px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" data-action="optimize-code">⚡ 优化</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 进度跟踪界面 -->
            <div class="hidden" data-tab-content="progress-tracking">
                <div class="space-y-4">
                    <div class="bg-card border border-border rounded-lg p-4">
                        <h2 class="text-base font-semibold mb-3">开发进度总览</h2>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-primary">8</div>
                                <div class="text-xs text-muted-foreground">总任务数</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-warning">3</div>
                                <div class="text-xs text-muted-foreground">进行中</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-success">4</div>
                                <div class="text-xs text-muted-foreground">已完成</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-muted-foreground">1</div>
                                <div class="text-xs text-muted-foreground">待开始</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-card border border-border rounded-lg p-4">
                        <h2 class="text-base font-semibold mb-3">任务进度详情</h2>
                        <div class="space-y-3">
                            <div class="p-3 border border-border rounded">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-medium text-sm">手机号登录功能</h3>
                                    <div class="flex items-center space-x-2">
                                        <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">进行中</span>
                                        <span class="text-xs text-muted-foreground">张开发</span>
                                    </div>
                                </div>
                                <div class="w-full bg-muted rounded-full h-2 mb-2">
                                    <div class="bg-warning h-2 rounded-full progress-bar" style="width: 75%"></div>
                                </div>
                                <div class="flex justify-between text-xs text-muted-foreground">
                                    <span>进度: 75% | AI助手: Claude Code</span>
                                    <span>预计完成: 1天后</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// AI Agent管理器
class AIAgentManager {
    constructor() {
        this.agents = [...aiAgents];
        this.loadConfig();
        this.cleanupBackups();
    }

    // 生成AI Agent卡片HTML
    generateAgentCard(agent) {
        const statusConfig = {
            'active': { color: 'bg-success', text: '运行中', textColor: 'text-success' },
            'inactive': { color: 'bg-muted', text: '未启用', textColor: 'text-muted-foreground' },
            'error': { color: 'bg-destructive', text: '异常', textColor: 'text-destructive' }
        };

        const status = statusConfig[agent.status];
        const capabilities = agent.capabilities.slice(0, 3).map(cap =>
            `<span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">${cap}</span>`
        ).join('');

        return `
            <div class="group bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/20 cursor-pointer relative overflow-hidden"
                 data-agent-id="${agent.id}"
                 onmouseenter="this.style.transform = 'translateY(-8px)'; this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'"
                 onmouseleave="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'">

                <!-- 背景装饰 -->
                <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

                <div class="relative z-10">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-primary to-gray-600 rounded-lg flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                ${agent.icon}
                            </div>
                            <div>
                                <h3 class="font-semibold text-base group-hover:text-primary transition-colors duration-200">${agent.name}</h3>
                                <p class="text-sm text-muted-foreground">v${agent.version}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 ${status.color} rounded-full animate-pulse"></div>
                            <span class="text-sm ${status.textColor} font-medium">${status.text}</span>
                        </div>
                    </div>

                    <p class="text-sm text-muted-foreground mb-4 line-clamp-2 group-hover:text-foreground transition-colors duration-200">${agent.description}</p>

                    <!-- 示例信息 -->
                    <div class="bg-muted/30 rounded-lg p-3 mb-4 text-xs">
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-foreground">使用示例</span>
                            <span class="text-muted-foreground">${agent.examples.useCase}</span>
                        </div>
                        <div class="space-y-1">
                            <div class="flex justify-between">
                                <span class="text-muted-foreground">响应时间:</span>
                                <span class="font-medium">${agent.examples.performance.responseTime}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground">准确率:</span>
                                <span class="font-medium">${agent.examples.performance.accuracy}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground">今日使用:</span>
                                <span class="font-medium">${agent.examples.performance.dailyUsage} 次</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-1 mb-4">
                        ${capabilities}
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex space-x-2">
                            <button class="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                                    onclick="event.stopPropagation(); window.aiAgentManager.openConfig('${agent.id}')"
                                    title="配置 ${agent.name}">
                                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                                </svg>
                                配置
                            </button>
                            <button class="px-3 py-1.5 border border-border text-sm rounded-md hover:bg-accent hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                                    onclick="event.stopPropagation(); window.aiAgentManager.showStats('${agent.id}')"
                                    title="查看 ${agent.name} 统计">
                                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                                </svg>
                                统计
                            </button>
                        </div>
                        <button class="text-sm ${agent.status === 'active' ? 'text-destructive hover:text-red-600' : 'text-success hover:text-green-600'} font-medium transition-all duration-200 hover:scale-105 px-2 py-1 rounded hover:bg-opacity-10 ${agent.status === 'active' ? 'hover:bg-red-500' : 'hover:bg-green-500'}"
                                onclick="event.stopPropagation(); window.aiAgentManager.toggleAgent('${agent.id}')"
                                title="${agent.status === 'active' ? '停用' : '启用'} ${agent.name}">
                            ${agent.status === 'active' ? '停用' : '启用'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 渲染所有AI Agent卡片
    renderAgents() {
        const container = document.getElementById('ai-agent-cards');
        const loadingIndicator = document.getElementById('loading-indicator');
        const emptyState = document.getElementById('empty-state');

        if (!container) return;

        // 显示加载状态
        if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }
        if (emptyState) {
            emptyState.classList.add('hidden');
        }

        // 模拟加载延迟以显示加载动画
        setTimeout(() => {
            if (this.agents.length === 0) {
                // 显示空状态
                container.innerHTML = '';
                if (emptyState) {
                    emptyState.classList.remove('hidden');
                }
            } else {
                // 渲染卡片
                container.innerHTML = this.agents.map(agent => this.generateAgentCard(agent)).join('');
                if (emptyState) {
                    emptyState.classList.add('hidden');
                }

                // 添加卡片入场动画
                this.animateCardsIn();
            }

            // 隐藏加载状态
            if (loadingIndicator) {
                loadingIndicator.classList.add('hidden');
            }
        }, 300);
    }

    // 卡片入场动画
    animateCardsIn() {
        const cards = document.querySelectorAll('[data-agent-id]');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // 切换Agent状态
    toggleAgent(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        if (agent.status === 'active') {
            agent.status = 'inactive';
            agent.config.enabled = false;
        } else {
            agent.status = 'active';
            agent.config.enabled = true;
        }

        this.saveConfig();
        this.renderAgents();
        this.showNotification(`${agent.name} 已${agent.status === 'active' ? '启用' : '停用'}`);
    }

    // 打开配置弹窗
    openConfig(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        this.showConfigModal(agent);
    }

    // 显示配置弹窗
    showConfigModal(agent) {
        const modalHtml = this.generateConfigModal(agent);

        // 创建模态框容器
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modalContainer.innerHTML = modalHtml;

        document.body.appendChild(modalContainer);

        // 绑定事件
        this.bindConfigModalEvents(modalContainer, agent);

        // 阻止背景滚动
        document.body.style.overflow = 'hidden';
    }

    // 生成配置弹窗HTML
    generateConfigModal(agent) {
        const configFields = this.generateConfigFields(agent);

        return `
            <div class="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between p-6 border-b border-border">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-primary to-gray-600 rounded-lg flex items-center justify-center text-xl">
                            ${agent.icon}
                        </div>
                        <div>
                            <h2 class="text-xl font-semibold">${agent.name} 配置</h2>
                            <p class="text-sm text-muted-foreground">v${agent.version}</p>
                        </div>
                    </div>
                    <button class="text-muted-foreground hover:text-foreground p-2" onclick="window.aiAgentManager.closeConfigModal()">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>

                <form id="agent-config-form" class="p-6 space-y-6">
                    <!-- 基础配置 -->
                    <div>
                        <h3 class="text-lg font-medium mb-4">基础配置</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="text-sm font-medium">启用状态</label>
                                    <p class="text-xs text-muted-foreground">控制此AI Agent是否可用</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" class="sr-only peer" name="enabled" ${agent.config.enabled ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- 特定配置 -->
                    <div>
                        <h3 class="text-lg font-medium mb-4">Agent 配置</h3>
                        <div class="space-y-4">
                            ${configFields}
                        </div>
                    </div>

                    <!-- 能力展示 -->
                    <div>
                        <h3 class="text-lg font-medium mb-4">支持能力</h3>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${agent.capabilities.map(cap =>
                                `<span class="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">${cap}</span>`
                            ).join('')}
                        </div>
                    </div>

                    <!-- 使用示例 -->
                    <div>
                        <h3 class="text-lg font-medium mb-4">使用示例</h3>
                        <div class="bg-muted/50 rounded-lg p-4 space-y-3">
                            <div>
                                <label class="block text-sm font-medium mb-1">应用场景</label>
                                <p class="text-sm text-muted-foreground">${agent.examples.useCase}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">示例输入</label>
                                <p class="text-sm text-muted-foreground bg-background border border-border rounded p-2 font-mono">${agent.examples.samplePrompt}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">示例输出</label>
                                <p class="text-sm text-muted-foreground bg-background border border-border rounded p-2">${agent.examples.sampleResponse}</p>
                            </div>
                            <div class="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                                <div class="text-center">
                                    <div class="text-lg font-semibold text-primary">${agent.examples.performance.responseTime}</div>
                                    <div class="text-xs text-muted-foreground">响应时间</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-lg font-semibold text-success">${agent.examples.performance.accuracy}</div>
                                    <div class="text-xs text-muted-foreground">准确率</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-lg font-semibold text-warning">${agent.examples.performance.dailyUsage}</div>
                                    <div class="text-xs text-muted-foreground">今日使用</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="flex items-center justify-between p-6 border-t border-border bg-muted/30">
                    <div class="flex space-x-2">
                        <button type="button" class="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors" onclick="window.aiAgentManager.testConnection('${agent.id}')">
                            测试连接
                        </button>
                        <button type="button" class="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors" onclick="window.aiAgentManager.resetConfig('${agent.id}')">
                            重置配置
                        </button>
                    </div>
                    <div class="flex space-x-2">
                        <button type="button" class="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors" onclick="window.aiAgentManager.closeConfigModal()">
                            取消
                        </button>
                        <button type="button" class="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors" onclick="window.aiAgentManager.saveConfig('${agent.id}')">
                            保存配置
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成特定Agent的配置字段
    generateConfigFields(agent) {
        const config = agent.config;
        let fields = '';

        switch (agent.id) {
            case 'gemini-cli':
                fields = `
                    <div>
                        <label class="block text-sm font-medium mb-2">API 密钥</label>
                        <input type="password" name="apiKey" value="${config.apiKey || ''}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="输入 Gemini API 密钥">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">模型版本</label>
                        <select name="model" class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="gemini-pro" ${config.model === 'gemini-pro' ? 'selected' : ''}>Gemini Pro</option>
                            <option value="gemini-pro-vision" ${config.model === 'gemini-pro-vision' ? 'selected' : ''}>Gemini Pro Vision</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">最大令牌数</label>
                        <input type="number" name="maxTokens" value="${config.maxTokens || 4096}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               min="1" max="8192">
                    </div>
                `;
                break;

            case 'claude-code':
                fields = `
                    <div>
                        <label class="block text-sm font-medium mb-2">API 密钥</label>
                        <input type="password" name="apiKey" value="${config.apiKey || ''}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="输入 Claude API 密钥">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">模型版本</label>
                        <select name="model" class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="claude-3-sonnet" ${config.model === 'claude-3-sonnet' ? 'selected' : ''}>Claude 3 Sonnet</option>
                            <option value="claude-3-opus" ${config.model === 'claude-3-opus' ? 'selected' : ''}>Claude 3 Opus</option>
                            <option value="claude-3-haiku" ${config.model === 'claude-3-haiku' ? 'selected' : ''}>Claude 3 Haiku</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">温度设置</label>
                        <input type="range" name="temperature" value="${config.temperature || 0.1}"
                               class="w-full" min="0" max="1" step="0.1"
                               oninput="this.nextElementSibling.textContent = this.value">
                        <span class="text-sm text-muted-foreground">${config.temperature || 0.1}</span>
                    </div>
                `;
                break;

            case 'augment-code':
                fields = `
                    <div>
                        <label class="block text-sm font-medium mb-2">API 密钥</label>
                        <input type="password" name="apiKey" value="${config.apiKey || ''}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="输入 Augment Code API 密钥">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">上下文窗口</label>
                        <select name="contextWindow" class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="small" ${config.contextWindow === 'small' ? 'selected' : ''}>小 (4K)</option>
                            <option value="medium" ${config.contextWindow === 'medium' ? 'selected' : ''}>中 (16K)</option>
                            <option value="large" ${config.contextWindow === 'large' ? 'selected' : ''}>大 (128K)</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <label class="text-sm font-medium">自动重构</label>
                            <p class="text-xs text-muted-foreground">启用智能代码重构建议</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" name="autoRefactor" ${config.autoRefactor ? 'checked' : ''}>
                            <div class="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                `;
                break;

            case 'codex':
                fields = `
                    <div>
                        <label class="block text-sm font-medium mb-2">API 密钥</label>
                        <input type="password" name="apiKey" value="${config.apiKey || ''}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="输入 OpenAI API 密钥">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">模型版本</label>
                        <select name="model" class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="code-davinci-002" ${config.model === 'code-davinci-002' ? 'selected' : ''}>Code Davinci 002</option>
                            <option value="code-cushman-001" ${config.model === 'code-cushman-001' ? 'selected' : ''}>Code Cushman 001</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">最大令牌数</label>
                        <input type="number" name="maxTokens" value="${config.maxTokens || 2048}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               min="1" max="4096">
                    </div>
                `;
                break;

            case 'cursor':
                fields = `
                    <div>
                        <label class="block text-sm font-medium mb-2">API 密钥</label>
                        <input type="password" name="apiKey" value="${config.apiKey || ''}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="输入 Cursor API 密钥">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">API 端点</label>
                        <input type="url" name="endpoint" value="${config.endpoint || 'https://api.cursor.sh'}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="https://api.cursor.sh">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">启用功能</label>
                        <div class="space-y-2">
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="features" value="autocomplete"
                                       ${config.features?.includes('autocomplete') ? 'checked' : ''}
                                       class="rounded border-border">
                                <span class="text-sm">自动补全</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="features" value="refactor"
                                       ${config.features?.includes('refactor') ? 'checked' : ''}
                                       class="rounded border-border">
                                <span class="text-sm">代码重构</span>
                            </label>
                        </div>
                    </div>
                `;
                break;

            default:
                fields = `
                    <div>
                        <label class="block text-sm font-medium mb-2">API 密钥</label>
                        <input type="password" name="apiKey" value="${config.apiKey || ''}"
                               class="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                               placeholder="输入 API 密钥">
                    </div>
                `;
        }

        return fields;
    }

    // 绑定配置弹窗事件
    bindConfigModalEvents(modalContainer, agent) {
        // 点击背景关闭
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                this.closeConfigModal();
            }
        });

        // ESC键关闭
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeConfigModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // 关闭配置弹窗
    closeConfigModal() {
        const modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        if (modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    }

    // 保存配置
    saveConfig(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        const form = document.getElementById('agent-config-form');
        if (!form) return;

        const formData = new FormData(form);
        const newConfig = { ...agent.config };

        // 基础配置
        newConfig.enabled = formData.get('enabled') === 'on';

        // 特定配置
        switch (agentId) {
            case 'gemini-cli':
                newConfig.apiKey = formData.get('apiKey') || '';
                newConfig.model = formData.get('model') || 'gemini-pro';
                newConfig.maxTokens = parseInt(formData.get('maxTokens')) || 4096;
                break;

            case 'claude-code':
                newConfig.apiKey = formData.get('apiKey') || '';
                newConfig.model = formData.get('model') || 'claude-3-sonnet';
                newConfig.temperature = parseFloat(formData.get('temperature')) || 0.1;
                break;

            case 'augment-code':
                newConfig.apiKey = formData.get('apiKey') || '';
                newConfig.contextWindow = formData.get('contextWindow') || 'large';
                newConfig.autoRefactor = formData.get('autoRefactor') === 'on';
                break;

            case 'codex':
                newConfig.apiKey = formData.get('apiKey') || '';
                newConfig.model = formData.get('model') || 'code-davinci-002';
                newConfig.maxTokens = parseInt(formData.get('maxTokens')) || 2048;
                break;

            case 'cursor':
                newConfig.apiKey = formData.get('apiKey') || '';
                newConfig.endpoint = formData.get('endpoint') || 'https://api.cursor.sh';
                newConfig.features = formData.getAll('features');
                break;
        }

        // 验证配置
        const validation = this.validateConfig(agentId, newConfig);
        if (!validation.valid) {
            this.showNotification(validation.message, 'error');
            return;
        }

        // 更新配置
        agent.config = newConfig;
        agent.status = newConfig.enabled ? 'active' : 'inactive';

        // 保存到localStorage
        this.saveConfig();

        // 重新渲染卡片
        this.renderAgents();

        // 关闭弹窗
        this.closeConfigModal();

        this.showNotification(`${agent.name} 配置已保存`);
    }

    // 验证配置
    validateConfig(agentId, config) {
        // API密钥验证
        if (!config.apiKey || config.apiKey.trim() === '') {
            return { valid: false, message: 'API 密钥不能为空' };
        }

        // 特定验证
        switch (agentId) {
            case 'gemini-cli':
                if (config.maxTokens < 1 || config.maxTokens > 8192) {
                    return { valid: false, message: '最大令牌数必须在 1-8192 之间' };
                }
                break;

            case 'claude-code':
                if (config.temperature < 0 || config.temperature > 1) {
                    return { valid: false, message: '温度设置必须在 0-1 之间' };
                }
                break;

            case 'codex':
                if (config.maxTokens < 1 || config.maxTokens > 4096) {
                    return { valid: false, message: '最大令牌数必须在 1-4096 之间' };
                }
                break;

            case 'cursor':
                try {
                    new URL(config.endpoint);
                } catch {
                    return { valid: false, message: 'API 端点格式不正确' };
                }
                break;
        }

        return { valid: true };
    }

    // 测试连接
    testConnection(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        // 模拟连接测试
        this.showNotification(`正在测试 ${agent.name} 连接...`);

        setTimeout(() => {
            const success = Math.random() > 0.3; // 70% 成功率
            if (success) {
                this.showNotification(`${agent.name} 连接测试成功`);
            } else {
                this.showNotification(`${agent.name} 连接测试失败，请检查配置`, 'error');
            }
        }, 2000);
    }

    // 重置配置
    resetConfig(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        if (confirm(`确定要重置 ${agent.name} 的配置吗？此操作不可撤销。`)) {
            // 重置为默认配置
            const defaultAgent = aiAgents.find(a => a.id === agentId);
            if (defaultAgent) {
                agent.config = { ...defaultAgent.config };
                agent.status = defaultAgent.status;

                this.saveConfig();
                this.closeConfigModal();
                this.renderAgents();

                this.showNotification(`${agent.name} 配置已重置`);
            }
        }
    }

    // 显示统计信息
    showStats(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        this.showStatsModal(agent);
    }

    // 显示统计信息弹窗
    showStatsModal(agent) {
        const modalHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-card border border-border rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between p-6 border-b border-border">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-primary to-gray-600 rounded-lg flex items-center justify-center text-xl">
                                ${agent.icon}
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold">${agent.name} 使用统计</h2>
                                <p class="text-sm text-muted-foreground">v${agent.version}</p>
                            </div>
                        </div>
                        <button class="text-muted-foreground hover:text-foreground p-2" onclick="this.closest('.fixed').remove(); document.body.style.overflow = ''">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>

                    <div class="p-6 space-y-6">
                        <!-- 性能指标 -->
                        <div>
                            <h3 class="text-lg font-medium mb-4">性能指标</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-muted/30 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-primary mb-1">${agent.examples.performance.responseTime}</div>
                                    <div class="text-sm text-muted-foreground">平均响应时间</div>
                                </div>
                                <div class="bg-muted/30 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-success mb-1">${agent.examples.performance.accuracy}</div>
                                    <div class="text-sm text-muted-foreground">准确率</div>
                                </div>
                                <div class="bg-muted/30 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-warning mb-1">${agent.examples.performance.dailyUsage}</div>
                                    <div class="text-sm text-muted-foreground">今日使用次数</div>
                                </div>
                            </div>
                        </div>

                        <!-- 使用示例 -->
                        <div>
                            <h3 class="text-lg font-medium mb-4">典型使用场景</h3>
                            <div class="bg-muted/30 rounded-lg p-4">
                                <div class="mb-3">
                                    <label class="block text-sm font-medium mb-2">应用场景</label>
                                    <p class="text-sm text-muted-foreground">${agent.examples.useCase}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="block text-sm font-medium mb-2">示例输入</label>
                                    <div class="bg-background border border-border rounded p-3 font-mono text-sm">
                                        ${agent.examples.samplePrompt}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">示例输出</label>
                                    <div class="bg-background border border-border rounded p-3 text-sm">
                                        ${agent.examples.sampleResponse}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 支持能力 -->
                        <div>
                            <h3 class="text-lg font-medium mb-4">核心能力</h3>
                            <div class="grid grid-cols-2 gap-3">
                                ${agent.capabilities.map(cap => `
                                    <div class="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                                        <div class="w-2 h-2 bg-success rounded-full"></div>
                                        <span class="text-sm">${cap}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- 配置信息 -->
                        <div>
                            <h3 class="text-lg font-medium mb-4">当前配置</h3>
                            <div class="bg-muted/30 rounded-lg p-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span class="text-muted-foreground">状态:</span>
                                        <span class="ml-2 font-medium ${agent.status === 'active' ? 'text-success' : agent.status === 'error' ? 'text-destructive' : 'text-muted-foreground'}">${
                                            agent.status === 'active' ? '运行中' :
                                            agent.status === 'error' ? '异常' : '未启用'
                                        }</span>
                                    </div>
                                    <div>
                                        <span class="text-muted-foreground">API密钥:</span>
                                        <span class="ml-2 font-medium">${agent.config.apiKey ? '已配置' : '未配置'}</span>
                                    </div>
                                    ${agent.config.model ? `
                                        <div>
                                            <span class="text-muted-foreground">模型:</span>
                                            <span class="ml-2 font-medium">${agent.config.model}</span>
                                        </div>
                                    ` : ''}
                                    ${agent.config.maxTokens ? `
                                        <div>
                                            <span class="text-muted-foreground">最大令牌:</span>
                                            <span class="ml-2 font-medium">${agent.config.maxTokens}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end p-6 border-t border-border bg-muted/30">
                        <button class="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors"
                                onclick="window.aiAgentManager.openConfig('${agent.id}'); this.closest('.fixed').remove(); document.body.style.overflow = ''">
                            配置 Agent
                        </button>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstElementChild);
        document.body.style.overflow = 'hidden';
    }

    // 导出配置
    exportConfig() {
        const config = {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            agents: this.agents.map(agent => ({
                id: agent.id,
                enabled: agent.config.enabled,
                config: agent.config
            }))
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-agents-config-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('配置已导出');
    }

    // 导入配置
    importConfig() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target.result);
                    this.applyConfig(config);
                    this.showNotification('配置导入成功');
                } catch (error) {
                    this.showNotification('配置文件格式错误', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    // 应用配置
    applyConfig(config) {
        if (!config.agents) return;

        config.agents.forEach(importedAgent => {
            const agent = this.agents.find(a => a.id === importedAgent.id);
            if (agent) {
                agent.config = { ...agent.config, ...importedAgent.config };
                agent.status = importedAgent.enabled ? 'active' : 'inactive';
            }
        });

        this.saveConfig();
        this.renderAgents();
    }

    // 保存配置到localStorage
    saveConfig() {
        const config = {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            agents: this.agents.map(agent => ({
                id: agent.id,
                status: agent.status,
                config: agent.config
            }))
        };

        // 保存当前配置
        localStorage.setItem('ai-agents-config', JSON.stringify(config));

        // 创建备份（保留最近5个备份）
        this.createBackup(config);
    }

    // 创建配置备份
    createBackup(config) {
        const backups = this.getBackups();

        // 添加新备份
        backups.unshift({
            ...config,
            backupId: Date.now(),
            backupName: `自动备份 ${new Date().toLocaleString()}`
        });

        // 只保留最近5个备份
        const recentBackups = backups.slice(0, 5);

        localStorage.setItem('ai-agents-backups', JSON.stringify(recentBackups));
    }

    // 获取所有备份
    getBackups() {
        const saved = localStorage.getItem('ai-agents-backups');
        return saved ? JSON.parse(saved) : [];
    }

    // 恢复备份
    restoreBackup(backupId) {
        const backups = this.getBackups();
        const backup = backups.find(b => b.backupId === backupId);

        if (!backup) {
            this.showNotification('备份不存在', 'error');
            return;
        }

        if (confirm(`确定要恢复到 "${backup.backupName}" 吗？当前配置将被覆盖。`)) {
            this.applyConfig(backup);
            this.showNotification('配置已恢复');
        }
    }

    // 清理过期备份
    cleanupBackups() {
        const backups = this.getBackups();
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

        const validBackups = backups.filter(backup =>
            backup.backupId > oneWeekAgo
        );

        localStorage.setItem('ai-agents-backups', JSON.stringify(validBackups));
    }

    // 从localStorage加载配置
    loadConfig() {
        const saved = localStorage.getItem('ai-agents-config');
        if (!saved) return;

        try {
            const config = JSON.parse(saved);
            config.agents.forEach(savedAgent => {
                const agent = this.agents.find(a => a.id === savedAgent.id);
                if (agent) {
                    agent.status = savedAgent.status;
                    agent.config = { ...agent.config, ...savedAgent.config };
                }
            });
        } catch (error) {
            console.error('Failed to load config:', error);
        }
    }

    // 显示通知
    showNotification(message, type = 'success') {
        // 移除现有通知
        const existingNotifications = document.querySelectorAll('.ai-agent-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        // 创建通知元素
        const notification = document.createElement('div');
        const iconMap = {
            'success': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>`,
            'error': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>`,
            'info': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>`
        };

        const colorMap = {
            'success': 'bg-green-500 border-green-400',
            'error': 'bg-red-500 border-red-400',
            'info': 'bg-blue-500 border-blue-400'
        };

        notification.className = `ai-agent-notification fixed top-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 shadow-lg border-l-4 ${colorMap[type]} transform translate-x-full transition-all duration-300 ease-out`;

        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                ${iconMap[type] || iconMap['info']}
                <span>${message}</span>
                <button class="ml-2 text-white/80 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // 入场动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动移除
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, type === 'error' ? 5000 : 3000);
    }
}

// 导出模块内容函数
window.moduleContent = {
    getRequirementManagementContent,
    getDevelopmentManagementContent,
    getAIAgentContent,
    getDevelopmentContent,
    getProjectsContent,
    getMonitoringContent,
    getResourcesContent,
    getSystemContent
};

// 初始化AI Agent管理器
window.aiAgentManager = new AIAgentManager();

// 开发模式下的测试功能
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.testAIAgentManager = {
        // 测试所有功能
        runAllTests() {
            console.log('🧪 开始测试 AI Agent 管理器...');

            // 测试渲染
            console.log('✅ 测试渲染功能');
            window.aiAgentManager.renderAgents();

            // 测试通知
            console.log('✅ 测试通知系统');
            window.aiAgentManager.showNotification('测试成功通知', 'success');
            setTimeout(() => {
                window.aiAgentManager.showNotification('测试错误通知', 'error');
            }, 1000);
            setTimeout(() => {
                window.aiAgentManager.showNotification('测试信息通知', 'info');
            }, 2000);

            // 测试配置保存和加载
            console.log('✅ 测试配置保存和加载');
            const originalConfig = JSON.stringify(window.aiAgentManager.agents);
            window.aiAgentManager.saveConfig();
            window.aiAgentManager.loadConfig();
            const loadedConfig = JSON.stringify(window.aiAgentManager.agents);
            console.log('配置保存/加载:', originalConfig === loadedConfig ? '✅ 成功' : '❌ 失败');

            // 测试备份功能
            console.log('✅ 测试备份功能');
            const backups = window.aiAgentManager.getBackups();
            console.log('备份数量:', backups.length);

            console.log('🎉 所有测试完成！');
        },

        // 重置所有数据
        resetAllData() {
            if (confirm('确定要重置所有 AI Agent 数据吗？此操作不可撤销。')) {
                localStorage.removeItem('ai-agents-config');
                localStorage.removeItem('ai-agents-backups');
                window.location.reload();
            }
        },

        // 模拟错误
        simulateError() {
            window.aiAgentManager.showNotification('这是一个模拟错误', 'error');
        }
    };

    console.log('🔧 开发模式已启用，可使用以下测试命令：');
    console.log('- window.testAIAgentManager.runAllTests() - 运行所有测试');
    console.log('- window.testAIAgentManager.resetAllData() - 重置所有数据');
    console.log('- window.testAIAgentManager.simulateError() - 模拟错误');
}
