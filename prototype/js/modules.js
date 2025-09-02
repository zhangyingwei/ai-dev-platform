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

// AI插件管理模块内容
function getAIPluginsContent() {
    return `
        <div class="space-y-6">
            <!-- 页面标题 -->
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">AI插件管理</h1>
                <div class="flex space-x-2">
                    <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                        安装插件
                    </button>
                    <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                        插件市场
                    </button>
                </div>
            </div>

            <!-- 标签页 -->
            <div class="border-b border-border">
                <nav class="flex space-x-6">
                    <button class="py-1.5 px-1 border-b-2 border-primary text-primary text-sm font-medium">已安装插件</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm">插件市场</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm">插件配置</button>
                    <button class="py-1.5 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground text-sm">使用统计</button>
                </nav>
            </div>

            <!-- 已安装插件列表 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-card border border-border rounded-lg p-4 card-hover">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span class="text-primary-foreground font-bold text-sm">C</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-sm">Claude Code Assistant</h3>
                                <p class="text-xs text-muted-foreground">v2.1.0</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-1">
                            <div class="w-1.5 h-1.5 bg-success rounded-full"></div>
                            <span class="text-xs text-success">运行中</span>
                        </div>
                    </div>
                    <p class="text-xs text-muted-foreground mb-3">Anthropic官方代码生成助手，支持多种编程语言的智能代码生成和优化。</p>
                    <div class="flex items-center justify-between">
                        <div class="flex space-x-1.5">
                            <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent">配置</button>
                            <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent">统计</button>
                        </div>
                        <button class="text-destructive text-xs hover:underline">停用</button>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4 card-hover">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                <span class="text-muted-foreground font-bold text-sm">G</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-sm">Gemini Code Assistant</h3>
                                <p class="text-xs text-muted-foreground">v1.8.5</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-1">
                            <div class="w-1.5 h-1.5 bg-success rounded-full"></div>
                            <span class="text-xs text-success">运行中</span>
                        </div>
                    </div>
                    <p class="text-xs text-muted-foreground mb-3">Google Gemini驱动的代码助手，擅长代码分析和重构建议。</p>
                    <div class="flex items-center justify-between">
                        <div class="flex space-x-1.5">
                            <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent">配置</button>
                            <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent">统计</button>
                        </div>
                        <button class="text-destructive text-xs hover:underline">停用</button>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-lg p-4 card-hover">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-2">
                            <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                <span class="text-muted-foreground font-bold text-sm">GH</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-sm">GitHub Copilot</h3>
                                <p class="text-xs text-muted-foreground">v1.156.0</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-1">
                            <div class="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                            <span class="text-xs text-destructive">已停用</span>
                        </div>
                    </div>
                    <p class="text-xs text-muted-foreground mb-3">GitHub官方AI编程助手，基于OpenAI Codex模型。</p>
                    <div class="flex items-center justify-between">
                        <div class="flex space-x-1.5">
                            <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent">配置</button>
                            <button class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-accent">统计</button>
                        </div>
                        <button class="text-success text-xs hover:underline">启用</button>
                    </div>
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

// 导出模块内容函数
window.moduleContent = {
    getRequirementManagementContent,
    getDevelopmentManagementContent,
    getAIPluginsContent,
    getDevelopmentContent,
    getProjectsContent,
    getMonitoringContent,
    getResourcesContent,
    getSystemContent
};
