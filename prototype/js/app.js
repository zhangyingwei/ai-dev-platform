// AI开发平台原型系统 - 主要JavaScript逻辑

class AIDevPlatform {
    constructor() {
        this.currentModule = 'workspace';
        this.sidebarCollapsed = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadModule('workspace');
        this.setupResponsive();
    }

    setupEventListeners() {
        // 侧边栏切换
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // 导航菜单点击
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(item);
            });
        });

        // 移动端遮罩点击
        const mobileOverlay = document.getElementById('mobile-overlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => this.closeMobileSidebar());
        }
    }

    setupResponsive() {
        // 响应式处理
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                this.closeMobileSidebar();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (window.innerWidth < 1024) {
            // 移动端：显示/隐藏侧边栏
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        } else {
            // 桌面端：折叠/展开侧边栏
            this.sidebarCollapsed = !this.sidebarCollapsed;
            if (this.sidebarCollapsed) {
                sidebar.classList.add('w-16');
                sidebar.classList.remove('w-64');
            } else {
                sidebar.classList.add('w-64');
                sidebar.classList.remove('w-16');
            }
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }

    handleNavigation(navItem) {
        // 更新导航状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active', 'bg-accent', 'text-accent-foreground');
        });
        navItem.classList.add('active', 'bg-accent', 'text-accent-foreground');

        // 获取模块名称
        const moduleText = navItem.querySelector('span:last-child').textContent;
        let moduleName = '';
        
        switch (moduleText) {
            case '工作台':
                moduleName = 'workspace';
                break;
            case 'AI Agent 管理':
                moduleName = 'ai-agents';
                break;
            case '开发流程':
                moduleName = 'development';
                break;
            case '项目管理':
                moduleName = 'projects';
                break;
            case '运维监控':
                moduleName = 'monitoring';
                break;
            case '开发资源管理':
                moduleName = 'resources';
                break;
            case '系统管理':
                moduleName = 'system';
                break;
        }

        this.loadModule(moduleName);
        this.closeMobileSidebar();
    }

    loadModule(moduleName) {
        this.currentModule = moduleName;
        const content = this.getModuleContent(moduleName);
        document.getElementById('main-content').innerHTML = content;

        // 更新面包屑
        this.updateBreadcrumb(moduleName);

        // 延迟初始化模块特定的功能，确保DOM元素已经渲染
        setTimeout(() => {
            this.initModuleFeatures(moduleName);
        }, 100);
    }

    updateBreadcrumb(moduleName) {
        const moduleNames = {
            'workspace': '工作台',
            'requirement-management': '需求管理',
            'development-management': '开发管理',
            'ai-agents': 'AI Agent 管理',
            'development': '开发流程',
            'projects': '项目管理',
            'monitoring': '运维监控',
            'resources': '开发资源管理',
            'system': '系统管理'
        };

        const breadcrumb = document.querySelector('nav.text-sm');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <span>首页</span>
                <span class="mx-2">/</span>
                <span class="text-foreground">${moduleNames[moduleName]}</span>
            `;
        }
    }

    getModuleContent(moduleName) {
        switch (moduleName) {
            case 'workspace':
                return this.getWorkspaceContent();
            case 'requirement-management':
                return window.moduleContent.getRequirementManagementContent();
            case 'development-management':
                return window.moduleContent.getDevelopmentManagementContent();
            case 'ai-agents':
                return window.moduleContent.getAIAgentContent();
            case 'development':
                return window.moduleContent.getDevelopmentContent();
            case 'projects':
                return window.moduleContent.getProjectsContent();
            case 'monitoring':
                return this.getMonitoringContent();
            case 'resources':
                return this.getResourcesContent();
            case 'system':
                return this.getSystemContent();
            default:
                return this.getWorkspaceContent();
        }
    }

    getWorkspaceContent() {
        return `
            <div class="space-y-6">
                <!-- 页面标题 -->
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold">个人工作台</h1>
                    <div class="flex space-x-3">
                        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-gray-800 transition-colors">
                            新建任务
                        </button>
                        <button class="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                            设置
                        </button>
                    </div>
                </div>

                <!-- 统计卡片 -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-card border border-border rounded-lg p-6 card-hover">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-muted-foreground">今日任务</p>
                                <p class="text-2xl font-bold">8</p>
                                <p class="text-xs text-success">↗️ +2 (昨日)</p>
                            </div>
                            <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <span class="text-xl">📋</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-card border border-border rounded-lg p-6 card-hover">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-muted-foreground">AI使用次数</p>
                                <p class="text-2xl font-bold">23</p>
                                <p class="text-xs text-success">↗️ +15 (今日)</p>
                            </div>
                            <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <span class="text-xl">🤖</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-card border border-border rounded-lg p-6 card-hover">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-muted-foreground">代码提交</p>
                                <p class="text-2xl font-bold">12</p>
                                <p class="text-xs text-muted-foreground">本周</p>
                            </div>
                            <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <span class="text-xl">💻</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-card border border-border rounded-lg p-6 card-hover">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-muted-foreground">项目进度</p>
                                <p class="text-2xl font-bold">75%</p>
                                <p class="text-xs text-warning">⚠️ 需关注</p>
                            </div>
                            <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <span class="text-xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 主要内容区域 -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- 今日任务 -->
                    <div class="lg:col-span-2">
                        <div class="bg-card border border-border rounded-lg p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-semibold">今日任务 (5)</h2>
                                <button class="text-sm text-muted-foreground hover:text-foreground">查看全部</button>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-3 p-3 border border-border rounded-lg">
                                    <input type="checkbox" class="rounded">
                                    <div class="flex-1">
                                        <p class="font-medium">完成用户注册API开发</p>
                                        <p class="text-sm text-muted-foreground">优先级: 高 | 截止: 今天 18:00</p>
                                    </div>
                                    <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">进行中</span>
                                </div>
                                
                                <div class="flex items-center space-x-3 p-3 border border-border rounded-lg">
                                    <input type="checkbox" class="rounded">
                                    <div class="flex-1">
                                        <p class="font-medium">修复登录页面样式问题</p>
                                        <p class="text-sm text-muted-foreground">优先级: 中 | 截止: 明天 12:00</p>
                                    </div>
                                    <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">待开始</span>
                                </div>
                                
                                <div class="flex items-center space-x-3 p-3 border border-border rounded-lg">
                                    <input type="checkbox" checked class="rounded">
                                    <div class="flex-1">
                                        <p class="font-medium line-through text-muted-foreground">优化数据库查询性能</p>
                                        <p class="text-sm text-muted-foreground">优先级: 中 | 已完成</p>
                                    </div>
                                    <span class="px-2 py-1 bg-success text-success-foreground text-xs rounded">已完成</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- AI助手状态 -->
                    <div class="space-y-6">
                        <div class="bg-card border border-border rounded-lg p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-semibold">AI助手状态</h2>
                                <button class="text-sm text-muted-foreground hover:text-foreground">配置</button>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between p-3 border border-border rounded-lg">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-2 h-2 bg-success rounded-full"></div>
                                        <span class="font-medium">Claude Code</span>
                                    </div>
                                    <span class="text-sm text-muted-foreground">1.2s</span>
                                </div>
                                
                                <div class="flex items-center justify-between p-3 border border-border rounded-lg">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-2 h-2 bg-success rounded-full"></div>
                                        <span class="font-medium">Gemini Code</span>
                                    </div>
                                    <span class="text-sm text-muted-foreground">0.8s</span>
                                </div>
                                
                                <div class="flex items-center justify-between p-3 border border-border rounded-lg">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-2 h-2 bg-destructive rounded-full"></div>
                                        <span class="font-medium">Cursor AI</span>
                                    </div>
                                    <span class="text-sm text-muted-foreground">离线</span>
                                </div>
                            </div>
                        </div>

                        <!-- 快速操作 -->
                        <div class="bg-card border border-border rounded-lg p-6">
                            <h2 class="text-lg font-semibold mb-4">快速操作</h2>
                            <div class="grid grid-cols-2 gap-3">
                                <button class="p-3 border border-border rounded-lg hover:bg-accent transition-colors text-center">
                                    <div class="text-xl mb-1">🚀</div>
                                    <div class="text-sm">AI生成</div>
                                </button>
                                <button class="p-3 border border-border rounded-lg hover:bg-accent transition-colors text-center">
                                    <div class="text-xl mb-1">🔍</div>
                                    <div class="text-sm">代码审查</div>
                                </button>
                                <button class="p-3 border border-border rounded-lg hover:bg-accent transition-colors text-center">
                                    <div class="text-xl mb-1">🧪</div>
                                    <div class="text-sm">运行测试</div>
                                </button>
                                <button class="p-3 border border-border rounded-lg hover:bg-accent transition-colors text-center">
                                    <div class="text-xl mb-1">📊</div>
                                    <div class="text-sm">生成报告</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initModuleFeatures(moduleName) {
        // 初始化模块特定的交互功能
        switch (moduleName) {
            case 'workspace':
                this.initWorkspaceFeatures();
                break;
            case 'requirement-management':
                this.initRequirementManagementFeatures();
                break;
            case 'development-management':
                this.initDevelopmentManagementFeatures();
                break;
            case 'ai-agents':
                this.initAIAgentFeatures();
                break;
            // 其他模块的初始化将在后续添加
        }
    }

    // 需求管理模块功能初始化
    initRequirementManagementFeatures() {
        // 标签页切换
        this.initTabSwitching();

        // 顶部操作按钮
        const newReqBtn = document.querySelector('[data-action="new-requirement"]');
        if (newReqBtn) {
            newReqBtn.addEventListener('click', () => this.showNewRequirementModal());
        }

        const templatesBtn = document.querySelector('[data-action="requirement-templates"]');
        if (templatesBtn) {
            templatesBtn.addEventListener('click', () => this.showRequirementTemplates());
        }

        const batchOpsBtn = document.querySelector('[data-action="batch-operations"]');
        if (batchOpsBtn) {
            batchOpsBtn.addEventListener('click', () => this.showBatchOperations());
        }

        // 语音输入按钮
        const voiceBtn = document.querySelector('[data-action="voice-input"]');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.handleVoiceInput());
        }

        // 使用模板按钮
        const templateBtn = document.querySelector('[data-action="use-template"]');
        if (templateBtn) {
            templateBtn.addEventListener('click', () => this.showTemplateModal());
        }

        // 需求分类按钮
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', () => this.selectCategory(btn));
        });

        // 优先级按钮
        document.querySelectorAll('[data-priority]').forEach(btn => {
            btn.addEventListener('click', () => this.selectPriority(btn));
        });

        // 保存草稿按钮
        const saveDraftBtn = document.querySelector('[data-action="save-draft"]');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => this.saveDraft());
        }

        // 提交审批按钮
        const submitBtn = document.querySelector('[data-action="submit-approval"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitForApproval());
        }

        // 审批操作按钮
        document.querySelectorAll('[data-action="approve-requirement"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.approveRequirement(btn.dataset.requirementId);
            });
        });

        document.querySelectorAll('[data-action="reject-requirement"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.rejectRequirement(btn.dataset.requirementId);
            });
        });

        document.querySelectorAll('[data-action="edit-requirement"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editRequirement(btn.dataset.requirementId);
            });
        });

        // AI拆解按钮
        const aiBreakdownBtn = document.querySelector('[data-action="start-ai-breakdown"]');
        if (aiBreakdownBtn) {
            aiBreakdownBtn.addEventListener('click', () => this.startAIBreakdown());
        }

        const confirmBreakdownBtn = document.querySelector('[data-action="confirm-breakdown"]');
        if (confirmBreakdownBtn) {
            confirmBreakdownBtn.addEventListener('click', () => this.confirmBreakdown());
        }

        // 批量操作按钮
        const batchApproveBtn = document.querySelector('[data-action="batch-approve"]');
        if (batchApproveBtn) {
            batchApproveBtn.addEventListener('click', () => this.batchApprove());
        }

        const batchRejectBtn = document.querySelector('[data-action="batch-reject"]');
        if (batchRejectBtn) {
            batchRejectBtn.addEventListener('click', () => this.batchReject());
        }

        // 需求列表项点击
        document.querySelectorAll('[data-requirement-id]').forEach(item => {
            item.addEventListener('click', () => this.viewRequirement(item));
        });
    }

    // 开发管理模块功能初始化
    initDevelopmentManagementFeatures() {
        // 标签页切换
        this.initTabSwitching();

        // AI Agent选择按钮
        document.querySelectorAll('[data-action="select-agent"]').forEach(btn => {
            btn.addEventListener('click', () => this.selectAIAgent(btn));
        });

        // 协同模式选择
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => this.selectCollaborationMode(btn));
        });

        // 开始AI开发按钮
        const startDevBtn = document.querySelector('[data-action="start-ai-development"]');
        if (startDevBtn) {
            startDevBtn.addEventListener('click', () => this.startAIDevelopment());
        }

        // 性能对比按钮
        const compareBtn = document.querySelector('[data-action="performance-compare"]');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.showPerformanceComparison());
        }

        // Agent管理按钮
        const manageBtn = document.querySelector('[data-action="agent-management"]');
        if (manageBtn) {
            manageBtn.addEventListener('click', () => this.showAgentManagement());
        }

        // 任务列表项点击
        document.querySelectorAll('[data-task-id]').forEach(item => {
            item.addEventListener('click', () => this.viewTask(item));
        });

        // 智能分配按钮
        const autoAssignBtn = document.querySelector('[data-action="auto-assign"]');
        if (autoAssignBtn) {
            autoAssignBtn.addEventListener('click', () => this.autoAssignTasks());
        }

        // 代码生成按钮
        const generateCodeBtn = document.querySelector('[data-action="generate-code"]');
        if (generateCodeBtn) {
            generateCodeBtn.addEventListener('click', () => this.generateCode());
        }

        // 代码操作按钮
        const copyCodeBtn = document.querySelector('[data-action="copy-code"]');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', () => this.copyCode());
        }

        const downloadCodeBtn = document.querySelector('[data-action="download-code"]');
        if (downloadCodeBtn) {
            downloadCodeBtn.addEventListener('click', () => this.downloadCode());
        }

        const optimizeCodeBtn = document.querySelector('[data-action="optimize-code"]');
        if (optimizeCodeBtn) {
            optimizeCodeBtn.addEventListener('click', () => this.optimizeCode());
        }
    }

    // AI Agent管理模块功能初始化
    initAIAgentFeatures() {
        // 渲染AI Agent卡片
        if (window.aiAgentManager) {
            window.aiAgentManager.renderAgents();
        }

        // 标签页切换
        this.initTabSwitching();
    }

    initWorkspaceFeatures() {
        // 任务复选框交互
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskRow = e.target.closest('.flex');
                const taskText = taskRow.querySelector('p.font-medium');
                const statusBadge = taskRow.querySelector('span.px-2');

                if (e.target.checked) {
                    taskText.classList.add('line-through', 'text-muted-foreground');
                    statusBadge.className = 'px-2 py-1 bg-success text-success-foreground text-xs rounded';
                    statusBadge.textContent = '已完成';
                } else {
                    taskText.classList.remove('line-through', 'text-muted-foreground');
                    statusBadge.className = 'px-2 py-1 bg-muted text-muted-foreground text-xs rounded';
                    statusBadge.textContent = '待开始';
                }
            });
        });
    }

    // 通用标签页切换功能
    initTabSwitching() {
        const tabButtons = document.querySelectorAll('[data-tab]');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const parentNav = button.closest('nav');
                const siblingTabs = parentNav.querySelectorAll('[data-tab]');

                // 移除所有激活状态
                siblingTabs.forEach(btn => {
                    btn.classList.remove('border-primary', 'text-primary');
                    btn.classList.add('border-transparent', 'text-muted-foreground');
                });

                // 激活当前标签
                button.classList.add('border-primary', 'text-primary');
                button.classList.remove('border-transparent', 'text-muted-foreground');

                // 显示对应内容
                const tabName = button.dataset.tab;
                this.showTabContent(tabName, button.textContent.trim());
            });
        });
    }

    // 显示标签页内容
    showTabContent(tabId, tabName) {
        // 根据标签ID和名称显示不同内容
        console.log(`切换到标签页: ${tabName} (ID: ${tabId})`);

        // 隐藏所有标签页内容
        document.querySelectorAll('[data-tab-content]').forEach(content => {
            content.classList.add('hidden');
        });

        // 显示当前标签页内容
        const targetContent = document.querySelector(`[data-tab-content="${tabId}"]`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        // 根据不同的标签页ID实现具体的内容切换逻辑
        switch (tabId) {
            case 'requirement-input':
                this.showRequirementInputContent();
                break;
            case 'requirement-approval':
                this.showRequirementApprovalContent();
                break;
            case 'ai-breakdown':
                this.showAIBreakdownContent();
                break;
            case 'requirement-tracking':
                this.showRequirementTrackingContent();
                break;
            case 'task-assignment':
                this.showTaskAssignmentContent();
                break;
            case 'ai-agent-selection':
                this.showAIAgentSelectionContent();
                break;
            case 'code-generation':
                this.showCodeGenerationContent();
                break;
            case 'progress-tracking':
                this.showProgressTrackingContent();
                break;
            default:
                this.showNotification(`切换到标签页: ${tabName}`, 'info');
        }
    }

    // 显示需求录入内容
    showRequirementInputContent() {
        this.showNotification('已切换到需求录入页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示需求审批内容
    showRequirementApprovalContent() {
        this.showNotification('已切换到需求审批页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示AI拆解内容
    showAIBreakdownContent() {
        this.showNotification('已切换到AI拆解页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示需求跟踪内容
    showRequirementTrackingContent() {
        this.showNotification('已切换到需求跟踪页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示任务分配内容
    showTaskAssignmentContent() {
        this.showNotification('已切换到任务分配页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示AI Agent选择内容
    showAIAgentSelectionContent() {
        this.showNotification('已切换到AI Agent选择页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示代码生成内容
    showCodeGenerationContent() {
        this.showNotification('已切换到代码生成页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 显示进度跟踪内容
    showProgressTrackingContent() {
        this.showNotification('已切换到进度跟踪页面', 'info');
        // 这里可以实现具体的内容切换逻辑
    }

    // 语音输入功能
    handleVoiceInput() {
        this.showNotification('语音输入功能启动中...', 'info');

        // 模拟语音识别
        setTimeout(() => {
            const textarea = document.querySelector('textarea');
            if (textarea) {
                textarea.value = '用户希望能够通过手机号快速登录系统，提升登录体验和安全性。';
                this.showNotification('语音识别完成！', 'success');
            }
        }, 2000);
    }

    // 显示模板选择模态框
    showTemplateModal() {
        const modal = this.createModal('选择需求模板', `
            <div class="space-y-3">
                <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.selectTemplate('功能需求')">
                    <h3 class="font-medium">功能需求模板</h3>
                    <p class="text-sm text-muted-foreground">用于描述系统功能性需求</p>
                </div>
                <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.selectTemplate('性能需求')">
                    <h3 class="font-medium">性能需求模板</h3>
                    <p class="text-sm text-muted-foreground">用于描述系统性能指标要求</p>
                </div>
                <div class="p-3 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.selectTemplate('界面需求')">
                    <h3 class="font-medium">界面需求模板</h3>
                    <p class="text-sm text-muted-foreground">用于描述UI/UX设计需求</p>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 选择模板
    selectTemplate(templateType) {
        const templates = {
            '功能需求': '作为[用户角色]，我希望[功能描述]，以便[业务价值]。\n\n验收标准：\n1. [标准1]\n2. [标准2]\n3. [标准3]',
            '性能需求': '系统需要满足以下性能指标：\n\n响应时间：[具体时间]\n并发用户数：[具体数量]\n可用性：[百分比]\n吞吐量：[具体指标]',
            '界面需求': '界面设计要求：\n\n页面布局：[描述]\n交互方式：[描述]\n视觉风格：[描述]\n响应式要求：[描述]'
        };

        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = templates[templateType] || '';
            this.showNotification(`已应用${templateType}模板`, 'success');
        }

        // 关闭模态框
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    // 选择需求分类
    selectCategory(button) {
        const categoryGroup = button.closest('div').querySelectorAll('[data-category]');

        // 移除其他按钮的激活状态
        categoryGroup.forEach(btn => {
            btn.classList.remove('bg-primary', 'text-primary-foreground');
            btn.classList.add('bg-muted', 'text-muted-foreground');
        });

        // 激活当前按钮
        button.classList.add('bg-primary', 'text-primary-foreground');
        button.classList.remove('bg-muted', 'text-muted-foreground');

        const category = button.dataset.category;
        this.showNotification(`已选择分类: ${button.textContent}`, 'info');
    }

    // 选择优先级
    selectPriority(button) {
        const priorityGroup = button.closest('div').querySelectorAll('[data-priority]');

        // 移除其他按钮的激活状态
        priorityGroup.forEach(btn => {
            btn.classList.remove('bg-warning', 'text-warning-foreground');
            btn.classList.add('bg-muted', 'text-muted-foreground');
        });

        // 激活当前按钮
        button.classList.add('bg-warning', 'text-warning-foreground');
        button.classList.remove('bg-muted', 'text-muted-foreground');

        const priority = button.dataset.priority;
        this.showNotification(`已选择优先级: ${button.textContent}`, 'info');
    }

    // 保存草稿
    saveDraft() {
        const formData = this.collectRequirementFormData();
        if (formData.title || formData.description) {
            // 模拟保存到本地存储
            localStorage.setItem('requirement_draft', JSON.stringify(formData));
            this.showNotification('草稿已保存', 'success');
        } else {
            this.showNotification('请至少填写标题或描述', 'warning');
        }
    }

    // 提交审批
    submitForApproval() {
        const formData = this.collectRequirementFormData();
        if (this.validateRequirementForm(formData)) {
            this.showLoadingModal('正在提交审批...');

            // 模拟提交过程
            setTimeout(() => {
                this.hideLoadingModal();
                this.showNotification('需求已提交审批，请等待产品经理审核', 'success');
                this.clearRequirementForm();
            }, 2000);
        }
    }

    // 收集需求表单数据
    collectRequirementFormData() {
        const customerSelect = document.querySelector('select');
        const titleInput = document.querySelector('input[type="text"]');
        const descriptionTextarea = document.querySelector('textarea');
        const selectedCategory = document.querySelector('.bg-primary.text-primary-foreground');
        const selectedPriority = document.querySelector('.bg-warning.text-warning-foreground');

        return {
            customer: customerSelect?.value || '',
            title: titleInput?.value || '',
            description: descriptionTextarea?.value || '',
            category: selectedCategory?.textContent || '功能需求',
            priority: selectedPriority?.textContent || '🟡 中',
            timestamp: new Date().toISOString()
        };
    }

    // 验证需求表单
    validateRequirementForm(formData) {
        if (!formData.title.trim()) {
            this.showNotification('请填写需求标题', 'error');
            return false;
        }
        if (!formData.description.trim()) {
            this.showNotification('请填写需求描述', 'error');
            return false;
        }
        if (formData.description.length < 10) {
            this.showNotification('需求描述至少需要10个字符', 'error');
            return false;
        }
        return true;
    }

    // 清空需求表单
    clearRequirementForm() {
        const titleInput = document.querySelector('input[type="text"]');
        const descriptionTextarea = document.querySelector('textarea');

        if (titleInput) titleInput.value = '';
        if (descriptionTextarea) descriptionTextarea.value = '';

        // 重置分类和优先级按钮
        document.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.includes('功能需求') || btn.textContent.includes('🟡 中')) {
                btn.classList.add('bg-primary', 'text-primary-foreground');
                btn.classList.remove('bg-muted', 'text-muted-foreground');
            }
        });
    }

    // 查看需求详情
    viewRequirement(requirementElement) {
        const title = requirementElement.querySelector('p.font-medium')?.textContent || '';
        const info = requirementElement.querySelector('p.text-muted-foreground')?.textContent || '';
        const status = requirementElement.querySelector('span')?.textContent || '';

        const modal = this.createModal('需求详情', `
            <div class="space-y-4">
                <div>
                    <h3 class="font-medium mb-2">需求标题</h3>
                    <p class="text-sm">${title}</p>
                </div>
                <div>
                    <h3 class="font-medium mb-2">基本信息</h3>
                    <p class="text-sm text-muted-foreground">${info}</p>
                </div>
                <div>
                    <h3 class="font-medium mb-2">当前状态</h3>
                    <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">${status}</span>
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.app.editRequirement('${title}')">编辑</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">关闭</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 选择AI Agent
    selectAIAgent(button) {
        const agentCard = button.closest('[data-agent]');
        const agentName = agentCard.querySelector('h3')?.textContent || '';
        const agentId = button.dataset.agent;

        // 移除其他Agent的选中状态
        document.querySelectorAll('[data-agent]').forEach(card => {
            card.classList.remove('ring-2', 'ring-primary');
            const btn = card.querySelector('[data-action="select-agent"]');
            if (btn && !btn.disabled) {
                btn.textContent = '选择';
                btn.classList.remove('bg-primary', 'text-primary-foreground');
                btn.classList.add('border', 'border-border');
            }
        });

        // 选中当前Agent
        if (!button.disabled) {
            agentCard.classList.add('ring-2', 'ring-primary');
            button.textContent = '✅ 已选择';
            button.classList.add('bg-primary', 'text-primary-foreground');
            button.classList.remove('border', 'border-border');

            this.showNotification(`已选择 ${agentName}`, 'success');
        }
    }

    // 选择协同模式
    selectCollaborationMode(button) {
        const modeGroup = button.closest('div').querySelectorAll('[data-mode]');

        // 移除其他模式的激活状态
        modeGroup.forEach(btn => {
            btn.classList.remove('bg-primary', 'text-primary-foreground');
            btn.classList.add('bg-muted', 'text-muted-foreground');
        });

        // 激活当前模式
        button.classList.add('bg-primary', 'text-primary-foreground');
        button.classList.remove('bg-muted', 'text-muted-foreground');

        const mode = button.dataset.mode;
        this.showNotification(`已选择协同模式: ${button.textContent}`, 'info');
    }

    // 开始AI开发
    startAIDevelopment() {
        const selectedAgentCard = document.querySelector('.ring-2.ring-primary');
        const selectedAgent = selectedAgentCard?.querySelector('h3')?.textContent;
        const selectedModeBtn = document.querySelector('[data-mode].bg-primary.text-primary-foreground');
        const selectedMode = selectedModeBtn?.textContent;

        if (!selectedAgent) {
            this.showNotification('请先选择AI Agent', 'warning');
            return;
        }

        if (!selectedMode) {
            this.showNotification('请先选择协同模式', 'warning');
            return;
        }

        this.showLoadingModal(`正在启动 ${selectedAgent} 进行AI开发...`);

        // 模拟AI开发过程
        setTimeout(() => {
            this.hideLoadingModal();
            this.showAIDevelopmentProgress();
        }, 3000);
    }

    // 显示AI开发进度
    showAIDevelopmentProgress() {
        const modal = this.createModal('AI开发进度', `
            <div class="space-y-4">
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span>🤖 正在分析需求...</span>
                        <span class="text-success">100%</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                        <div class="bg-success h-2 rounded-full" style="width: 100%"></div>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span>📝 正在生成组件...</span>
                        <span class="text-warning">70%</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                        <div class="bg-warning h-2 rounded-full" style="width: 70%"></div>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span>🧪 正在生成测试...</span>
                        <span class="text-muted-foreground">40%</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                        <div class="bg-muted-foreground h-2 rounded-full" style="width: 40%"></div>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span>📚 正在生成文档...</span>
                        <span class="text-muted-foreground">0%</span>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2">
                        <div class="bg-muted h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </div>
                <div class="pt-4">
                    <p class="text-sm text-muted-foreground">预计完成时间: 45秒</p>
                </div>
            </div>
        `);
        document.body.appendChild(modal);

        // 模拟进度更新
        setTimeout(() => {
            this.closeModal();
            this.showNotification('AI开发完成！代码已生成', 'success');
        }, 5000);
    }

    // 显示性能对比
    showPerformanceComparison() {
        const modal = this.createModal('AI Agent性能对比', `
            <div class="space-y-4">
                <div class="grid grid-cols-4 gap-4 text-center text-sm font-medium border-b pb-2">
                    <div>Agent</div>
                    <div>响应时间</div>
                    <div>成功率</div>
                    <div>代码质量</div>
                </div>
                <div class="grid grid-cols-4 gap-4 text-center text-sm">
                    <div class="font-medium">Claude Code</div>
                    <div class="text-success">1.2s</div>
                    <div class="text-success">95%</div>
                    <div class="text-success">92分</div>
                </div>
                <div class="grid grid-cols-4 gap-4 text-center text-sm">
                    <div class="font-medium">Cursor AI</div>
                    <div class="text-success">0.8s</div>
                    <div class="text-success">98%</div>
                    <div class="text-warning">88分</div>
                </div>
                <div class="grid grid-cols-4 gap-4 text-center text-sm">
                    <div class="font-medium">GitHub Copilot</div>
                    <div class="text-warning">2.1s</div>
                    <div class="text-warning">85%</div>
                    <div class="text-warning">85分</div>
                </div>
                <div class="grid grid-cols-4 gap-4 text-center text-sm">
                    <div class="font-medium">Augment Code</div>
                    <div class="text-warning">1.5s</div>
                    <div class="text-success">93%</div>
                    <div class="text-success">94分</div>
                </div>
                <div class="pt-4 border-t">
                    <p class="text-xs text-muted-foreground">* 数据基于最近30天的使用统计</p>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 显示Agent管理
    showAgentManagement() {
        const modal = this.createModal('AI Agent管理', `
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="font-medium">Agent配置</h3>
                    <button class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm" onclick="window.app.addNewAgent()">添加Agent</button>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between p-3 border border-border rounded">
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-success rounded-full"></div>
                            <span class="font-medium">Claude Code</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="px-2 py-1 text-xs border border-border rounded" onclick="window.app.configureAgent('Claude Code')">配置</button>
                            <button class="px-2 py-1 text-xs border border-border rounded" onclick="window.app.testAgent('Claude Code')">测试</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-3 border border-border rounded">
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-success rounded-full"></div>
                            <span class="font-medium">Cursor AI</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="px-2 py-1 text-xs border border-border rounded" onclick="window.app.configureAgent('Cursor AI')">配置</button>
                            <button class="px-2 py-1 text-xs border border-border rounded" onclick="window.app.testAgent('Cursor AI')">测试</button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-3 border border-border rounded opacity-60">
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-destructive rounded-full"></div>
                            <span class="font-medium">GitHub Copilot</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="px-2 py-1 text-xs border border-border rounded" onclick="window.app.configureAgent('GitHub Copilot')">配置</button>
                            <button class="px-2 py-1 text-xs bg-muted text-muted-foreground rounded cursor-not-allowed">离线</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 查看任务详情
    viewTask(taskElement) {
        const title = taskElement.querySelector('p.font-medium')?.textContent || '';
        const info = taskElement.querySelector('p.text-muted-foreground')?.textContent || '';
        const status = taskElement.querySelector('span')?.textContent || '';
        const progress = taskElement.querySelector('span:last-child')?.textContent || '';

        const modal = this.createModal('开发任务详情', `
            <div class="space-y-4">
                <div>
                    <h3 class="font-medium mb-2">任务名称</h3>
                    <p class="text-sm">${title}</p>
                </div>
                <div>
                    <h3 class="font-medium mb-2">分配信息</h3>
                    <p class="text-sm text-muted-foreground">${info}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h3 class="font-medium mb-2">状态</h3>
                        <span class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">${status}</span>
                    </div>
                    <div>
                        <h3 class="font-medium mb-2">进度</h3>
                        <span class="text-sm">${progress}</span>
                    </div>
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.app.editTask('${title}')">编辑任务</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">关闭</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 处理插件操作
    handlePluginAction(button) {
        const action = button.textContent.trim();
        const pluginCard = button.closest('.bg-card');
        const pluginName = pluginCard.querySelector('h3')?.textContent || '';

        switch (action) {
            case '启动':
                this.startPlugin(pluginName, button);
                break;
            case '停止':
                this.stopPlugin(pluginName, button);
                break;
            case '配置':
                this.configurePlugin(pluginName);
                break;
            case '卸载':
                this.uninstallPlugin(pluginName);
                break;
        }
    }

    // 启动插件
    startPlugin(pluginName, button) {
        this.showNotification(`正在启动 ${pluginName}...`, 'info');

        setTimeout(() => {
            button.textContent = '停止';
            button.classList.remove('bg-success');
            button.classList.add('bg-destructive');

            const statusIndicator = button.closest('.bg-card').querySelector('.w-1\\.5.h-1\\.5');
            if (statusIndicator) {
                statusIndicator.classList.remove('bg-muted');
                statusIndicator.classList.add('bg-success');
            }

            this.showNotification(`${pluginName} 启动成功`, 'success');
        }, 1500);
    }

    // 停止插件
    stopPlugin(pluginName, button) {
        this.showNotification(`正在停止 ${pluginName}...`, 'info');

        setTimeout(() => {
            button.textContent = '启动';
            button.classList.remove('bg-destructive');
            button.classList.add('bg-success');

            const statusIndicator = button.closest('.bg-card').querySelector('.w-1\\.5.h-1\\.5');
            if (statusIndicator) {
                statusIndicator.classList.remove('bg-success');
                statusIndicator.classList.add('bg-muted');
            }

            this.showNotification(`${pluginName} 已停止`, 'info');
        }, 1000);
    }

    // 配置插件
    configurePlugin(pluginName) {
        const modal = this.createModal(`配置 ${pluginName}`, `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">API密钥</label>
                    <input type="password" class="w-full px-3 py-2 border border-border rounded" placeholder="请输入API密钥">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">并发数</label>
                    <input type="number" class="w-full px-3 py-2 border border-border rounded" value="5" min="1" max="20">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">超时时间(秒)</label>
                    <input type="number" class="w-full px-3 py-2 border border-border rounded" value="30" min="5" max="300">
                </div>
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="debug-mode" checked>
                    <label for="debug-mode" class="text-sm">启用调试模式</label>
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.app.savePluginConfig('${pluginName}')">保存配置</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.testPluginConnection('${pluginName}')">测试连接</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 卸载插件
    uninstallPlugin(pluginName) {
        const confirmModal = this.createModal('确认卸载', `
            <div class="space-y-4">
                <p class="text-sm">确定要卸载 <strong>${pluginName}</strong> 吗？</p>
                <p class="text-xs text-muted-foreground">卸载后将清除所有相关配置和数据，此操作不可撤销。</p>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.app.confirmUninstall('${pluginName}')">确认卸载</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(confirmModal);
    }

    // 显示插件市场
    showPluginMarket() {
        const modal = this.createModal('插件市场', `
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="font-medium">推荐插件</h3>
                    <input type="text" class="px-3 py-1 border border-border rounded text-sm" placeholder="搜索插件...">
                </div>
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    <div class="flex items-center justify-between p-3 border border-border rounded">
                        <div class="flex-1">
                            <h4 class="font-medium">Gemini Code Assistant</h4>
                            <p class="text-sm text-muted-foreground">Google官方代码助手</p>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</span>
                                <span class="text-xs text-muted-foreground">4.8分 | 1.2k下载</span>
                            </div>
                        </div>
                        <button class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm" onclick="window.app.installPlugin('Gemini Code Assistant')">安装</button>
                    </div>
                    <div class="flex items-center justify-between p-3 border border-border rounded">
                        <div class="flex-1">
                            <h4 class="font-medium">CodeT5 Generator</h4>
                            <p class="text-sm text-muted-foreground">基于T5的代码生成器</p>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-yellow-400 text-xs">⭐⭐⭐⭐</span>
                                <span class="text-xs text-muted-foreground">4.2分 | 856下载</span>
                            </div>
                        </div>
                        <button class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm" onclick="window.app.installPlugin('CodeT5 Generator')">安装</button>
                    </div>
                    <div class="flex items-center justify-between p-3 border border-border rounded">
                        <div class="flex-1">
                            <h4 class="font-medium">AI Code Reviewer</h4>
                            <p class="text-sm text-muted-foreground">智能代码审查工具</p>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-yellow-400 text-xs">⭐⭐⭐⭐</span>
                                <span class="text-xs text-muted-foreground">4.5分 | 2.1k下载</span>
                            </div>
                        </div>
                        <button class="px-3 py-1 border border-border rounded text-sm">已安装</button>
                    </div>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 通用工具函数
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">${title}</h2>
                    <button class="text-muted-foreground hover:text-foreground" onclick="window.app.closeModal()">✕</button>
                </div>
                <div>${content}</div>
            </div>
        `;

        // 点击遮罩关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        return modal;
    }

    // 关闭模态框
    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    // 显示加载模态框
    showLoadingModal(message) {
        const modal = this.createModal('请稍候', `
            <div class="text-center py-8">
                <div class="loading-dots mb-4">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="text-sm text-muted-foreground">${message}</p>
            </div>
        `);
        modal.querySelector('button').style.display = 'none'; // 隐藏关闭按钮
        document.body.appendChild(modal);
    }

    // 隐藏加载模态框
    hideLoadingModal() {
        this.closeModal();
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const typeClasses = {
            'success': 'bg-success text-success-foreground',
            'error': 'bg-destructive text-destructive-foreground',
            'warning': 'bg-warning text-warning-foreground',
            'info': 'bg-primary text-primary-foreground'
        };

        notification.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 ${typeClasses[type]} fade-in`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-sm">${message}</span>
                <button class="ml-2 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;

        document.body.appendChild(notification);

        // 自动消失
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // 保存插件配置
    savePluginConfig(pluginName) {
        const modal = document.querySelector('.modal-overlay');
        const apiKey = modal.querySelector('input[type="password"]').value;
        const concurrency = modal.querySelector('input[type="number"]').value;
        const timeout = modal.querySelectorAll('input[type="number"]')[1].value;
        const debugMode = modal.querySelector('input[type="checkbox"]').checked;

        if (!apiKey.trim()) {
            this.showNotification('请输入API密钥', 'error');
            return;
        }

        // 模拟保存配置
        const config = {
            apiKey,
            concurrency: parseInt(concurrency),
            timeout: parseInt(timeout),
            debugMode
        };

        localStorage.setItem(`plugin_config_${pluginName}`, JSON.stringify(config));
        this.closeModal();
        this.showNotification(`${pluginName} 配置已保存`, 'success');
    }

    // 测试插件连接
    testPluginConnection(pluginName) {
        this.showNotification(`正在测试 ${pluginName} 连接...`, 'info');

        // 模拟连接测试
        setTimeout(() => {
            const success = Math.random() > 0.3; // 70%成功率
            if (success) {
                this.showNotification(`${pluginName} 连接测试成功`, 'success');
            } else {
                this.showNotification(`${pluginName} 连接测试失败，请检查配置`, 'error');
            }
        }, 2000);
    }

    // 确认卸载插件
    confirmUninstall(pluginName) {
        this.closeModal();
        this.showLoadingModal(`正在卸载 ${pluginName}...`);

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification(`${pluginName} 已成功卸载`, 'success');

            // 从界面中移除插件卡片
            const pluginCards = document.querySelectorAll('.bg-card');
            pluginCards.forEach(card => {
                if (card.querySelector('h3')?.textContent === pluginName) {
                    card.style.opacity = '0.5';
                    card.style.pointerEvents = 'none';
                    setTimeout(() => card.remove(), 500);
                }
            });
        }, 2000);
    }

    // 安装插件
    installPlugin(pluginName) {
        this.closeModal();
        this.showLoadingModal(`正在安装 ${pluginName}...`);

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification(`${pluginName} 安装成功`, 'success');
        }, 3000);
    }

    // 配置Agent
    configureAgent(agentName) {
        const modal = this.createModal(`配置 ${agentName}`, `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">API端点</label>
                    <input type="url" class="w-full px-3 py-2 border border-border rounded" placeholder="https://api.example.com">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">认证密钥</label>
                    <input type="password" class="w-full px-3 py-2 border border-border rounded" placeholder="请输入认证密钥">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">模型版本</label>
                    <select class="w-full px-3 py-2 border border-border rounded">
                        <option>最新版本</option>
                        <option>稳定版本</option>
                        <option>测试版本</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">最大Token数</label>
                    <input type="number" class="w-full px-3 py-2 border border-border rounded" value="4096" min="1024" max="32768">
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.app.saveAgentConfig('${agentName}')">保存配置</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 测试Agent
    testAgent(agentName) {
        this.showNotification(`正在测试 ${agentName} 连接...`, 'info');

        setTimeout(() => {
            const success = Math.random() > 0.2; // 80%成功率
            if (success) {
                this.showNotification(`${agentName} 测试成功，响应时间: ${(Math.random() * 2 + 0.5).toFixed(1)}s`, 'success');
            } else {
                this.showNotification(`${agentName} 测试失败，请检查网络和配置`, 'error');
            }
        }, 1500);
    }

    // 添加新Agent
    addNewAgent() {
        const modal = this.createModal('添加AI Agent', `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Agent名称</label>
                    <input type="text" class="w-full px-3 py-2 border border-border rounded" placeholder="请输入Agent名称">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Agent类型</label>
                    <select class="w-full px-3 py-2 border border-border rounded">
                        <option>代码生成</option>
                        <option>代码审查</option>
                        <option>文档生成</option>
                        <option>测试生成</option>
                        <option>自定义</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">API端点</label>
                    <input type="url" class="w-full px-3 py-2 border border-border rounded" placeholder="https://api.example.com">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">描述</label>
                    <textarea class="w-full px-3 py-2 border border-border rounded h-20 resize-none" placeholder="请描述Agent的功能和特点"></textarea>
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.app.createNewAgent()">创建Agent</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 创建新Agent
    createNewAgent() {
        const modal = document.querySelector('.modal-overlay');
        const name = modal.querySelector('input[type="text"]').value;
        const type = modal.querySelector('select').value;
        const endpoint = modal.querySelector('input[type="url"]').value;
        const description = modal.querySelector('textarea').value;

        if (!name.trim() || !endpoint.trim()) {
            this.showNotification('请填写Agent名称和API端点', 'error');
            return;
        }

        this.closeModal();
        this.showLoadingModal('正在创建Agent...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification(`${name} Agent创建成功`, 'success');
        }, 2000);
    }

    // 保存Agent配置
    saveAgentConfig(agentName) {
        const modal = document.querySelector('.modal-overlay');
        const endpoint = modal.querySelector('input[type="url"]').value;
        const apiKey = modal.querySelector('input[type="password"]').value;
        const model = modal.querySelector('select').value;
        const maxTokens = modal.querySelector('input[type="number"]').value;

        if (!endpoint.trim() || !apiKey.trim()) {
            this.showNotification('请填写API端点和认证密钥', 'error');
            return;
        }

        const config = {
            endpoint,
            apiKey,
            model,
            maxTokens: parseInt(maxTokens)
        };

        localStorage.setItem(`agent_config_${agentName}`, JSON.stringify(config));
        this.closeModal();
        this.showNotification(`${agentName} 配置已保存`, 'success');
    }

    // 编辑需求
    editRequirement(title) {
        this.closeModal();
        this.showNotification(`正在编辑需求: ${title}`, 'info');
        // 这里可以实现具体的编辑逻辑
    }

    // 编辑任务
    editTask(title) {
        this.closeModal();
        this.showNotification(`正在编辑任务: ${title}`, 'info');
        // 这里可以实现具体的编辑逻辑
    }

    // 显示新建需求模态框
    showNewRequirementModal() {
        const modal = this.createModal('新建需求', `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">客户信息</label>
                    <select class="w-full px-3 py-2 border border-border rounded">
                        <option value="">请选择客户</option>
                        <option value="abc">ABC公司 - 企业管理系统项目</option>
                        <option value="xyz">XYZ集团 - 电商平台项目</option>
                        <option value="def">DEF科技 - 移动应用项目</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">需求标题</label>
                    <input type="text" class="w-full px-3 py-2 border border-border rounded" placeholder="请输入需求标题">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">需求描述</label>
                    <textarea class="w-full h-32 px-3 py-2 border border-border rounded resize-none" placeholder="详细描述需求内容..."></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">需求分类</label>
                        <select class="w-full px-3 py-2 border border-border rounded">
                            <option value="functional">功能需求</option>
                            <option value="performance">性能需求</option>
                            <option value="ui">界面需求</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">优先级</label>
                        <select class="w-full px-3 py-2 border border-border rounded">
                            <option value="high">🔴 高</option>
                            <option value="medium" selected>🟡 中</option>
                            <option value="low">🟢 低</option>
                        </select>
                    </div>
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.app.createNewRequirement()">创建需求</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 创建新需求
    createNewRequirement() {
        const modal = document.querySelector('.modal-overlay');
        const customer = modal.querySelector('select').value;
        const title = modal.querySelector('input[type="text"]').value;
        const description = modal.querySelector('textarea').value;
        const category = modal.querySelectorAll('select')[1].value;
        const priority = modal.querySelectorAll('select')[2].value;

        if (!customer || !title.trim() || !description.trim()) {
            this.showNotification('请填写完整的需求信息', 'error');
            return;
        }

        this.closeModal();
        this.showLoadingModal('正在创建需求...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('需求创建成功，已提交审批', 'success');
            // 这里可以刷新需求列表
        }, 2000);
    }

    // 显示需求模板
    showRequirementTemplates() {
        const modal = this.createModal('需求模板库', `
            <div class="space-y-4">
                <div class="grid grid-cols-1 gap-3">
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.useRequirementTemplate('login')">
                        <h3 class="font-medium">登录功能模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">包含用户名/手机号登录、密码重置、记住登录状态等功能</p>
                    </div>
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.useRequirementTemplate('export')">
                        <h3 class="font-medium">数据导出模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">支持Excel/CSV导出、筛选条件、分页导出等功能</p>
                    </div>
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.useRequirementTemplate('search')">
                        <h3 class="font-medium">搜索功能模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">全文搜索、高级筛选、搜索历史、搜索建议等功能</p>
                    </div>
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.app.useRequirementTemplate('notification')">
                        <h3 class="font-medium">通知系统模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">站内消息、邮件通知、短信通知、推送通知等功能</p>
                    </div>
                </div>
                <div class="flex justify-end pt-4">
                    <button class="px-4 py-2 border border-border rounded" onclick="window.app.closeModal()">关闭</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 使用需求模板
    useRequirementTemplate(templateType) {
        this.closeModal();
        this.showNotification(`已应用${templateType}模板，正在打开新建需求页面`, 'success');
        setTimeout(() => {
            this.showNewRequirementModal();
        }, 500);
    }

    // 显示批量操作
    showBatchOperations() {
        const modal = this.createModal('批量操作', `
            <div class="space-y-4">
                <div class="space-y-3">
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.app.batchApprove()">
                        <div class="font-medium">批量审批通过</div>
                        <div class="text-sm text-muted-foreground">将选中的需求批量设置为通过状态</div>
                    </button>
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.app.batchReject()">
                        <div class="font-medium">批量拒绝</div>
                        <div class="text-sm text-muted-foreground">将选中的需求批量设置为拒绝状态</div>
                    </button>
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.app.batchExport()">
                        <div class="font-medium">批量导出</div>
                        <div class="text-sm text-muted-foreground">将选中的需求导出为Excel文件</div>
                    </button>
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.app.batchDelete()">
                        <div class="font-medium text-destructive">批量删除</div>
                        <div class="text-sm text-muted-foreground">永久删除选中的需求（谨慎操作）</div>
                    </button>
                </div>
                <div class="flex justify-end pt-4">
                    <button class="px-4 py-2 border border-border rounded" onclick="window.app.closeModal()">关闭</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 审批需求
    approveRequirement(requirementId) {
        this.showLoadingModal('正在审批需求...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('需求审批通过，已进入开发排期', 'success');

            // 更新UI状态
            const requirementElement = document.querySelector(`[data-requirement-id="${requirementId}"]`);
            if (requirementElement) {
                const statusBadge = requirementElement.querySelector('span');
                if (statusBadge) {
                    statusBadge.className = 'px-2 py-1 bg-success text-success-foreground text-xs rounded';
                    statusBadge.textContent = '已通过';
                }

                // 隐藏审批按钮
                const approveBtn = requirementElement.querySelector('[data-action="approve-requirement"]');
                const rejectBtn = requirementElement.querySelector('[data-action="reject-requirement"]');
                if (approveBtn) approveBtn.style.display = 'none';
                if (rejectBtn) rejectBtn.style.display = 'none';
            }
        }, 1500);
    }

    // 拒绝需求
    rejectRequirement(requirementId) {
        const modal = this.createModal('拒绝需求', `
            <div class="space-y-4">
                <p class="text-sm">请说明拒绝原因：</p>
                <textarea class="w-full h-24 px-3 py-2 border border-border rounded resize-none" placeholder="请输入拒绝原因..."></textarea>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.app.confirmRejectRequirement('${requirementId}')">确认拒绝</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 确认拒绝需求
    confirmRejectRequirement(requirementId) {
        const modal = document.querySelector('.modal-overlay');
        const reason = modal.querySelector('textarea').value;

        if (!reason.trim()) {
            this.showNotification('请填写拒绝原因', 'error');
            return;
        }

        this.closeModal();
        this.showLoadingModal('正在处理拒绝操作...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('需求已拒绝，已通知提交人', 'info');

            // 更新UI状态
            const requirementElement = document.querySelector(`[data-requirement-id="${requirementId}"]`);
            if (requirementElement) {
                const statusBadge = requirementElement.querySelector('span');
                if (statusBadge) {
                    statusBadge.className = 'px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded';
                    statusBadge.textContent = '已拒绝';
                }

                // 隐藏审批按钮
                const approveBtn = requirementElement.querySelector('[data-action="approve-requirement"]');
                const rejectBtn = requirementElement.querySelector('[data-action="reject-requirement"]');
                if (approveBtn) approveBtn.style.display = 'none';
                if (rejectBtn) rejectBtn.style.display = 'none';
            }
        }, 1500);
    }

    // 开始AI拆解
    startAIBreakdown() {
        this.showLoadingModal('AI正在分析需求，请稍候...');

        // 模拟AI分析过程
        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('AI拆解完成，请查看拆解结果', 'success');

            // 这里可以更新拆解结果的显示
        }, 3000);
    }

    // 确认拆解结果
    confirmBreakdown() {
        this.showLoadingModal('正在保存拆解结果...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('拆解结果已确认，任务已创建', 'success');
        }, 1500);
    }

    // 批量审批
    batchApprove() {
        this.closeModal();
        this.showLoadingModal('正在批量审批需求...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('批量审批完成，共处理 2 个需求', 'success');
        }, 2000);
    }

    // 批量拒绝
    batchReject() {
        this.closeModal();
        const modal = this.createModal('批量拒绝确认', `
            <div class="space-y-4">
                <p class="text-sm">确定要批量拒绝选中的需求吗？</p>
                <textarea class="w-full h-24 px-3 py-2 border border-border rounded resize-none" placeholder="请输入拒绝原因..."></textarea>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.app.confirmBatchReject()">确认拒绝</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 确认批量拒绝
    confirmBatchReject() {
        this.closeModal();
        this.showLoadingModal('正在批量拒绝需求...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('批量拒绝完成，共处理 2 个需求', 'info');
        }, 2000);
    }

    // 批量导出
    batchExport() {
        this.closeModal();
        this.showLoadingModal('正在生成Excel文件...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('导出完成，文件已下载', 'success');
        }, 2500);
    }

    // 批量删除
    batchDelete() {
        this.closeModal();
        const modal = this.createModal('批量删除确认', `
            <div class="space-y-4">
                <div class="flex items-center space-x-2 text-destructive">
                    <span class="text-lg">⚠️</span>
                    <span class="font-medium">危险操作</span>
                </div>
                <p class="text-sm">确定要永久删除选中的需求吗？此操作不可撤销！</p>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.app.confirmBatchDelete()">确认删除</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.app.closeModal()">取消</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    // 确认批量删除
    confirmBatchDelete() {
        this.closeModal();
        this.showLoadingModal('正在删除需求...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('批量删除完成，共删除 2 个需求', 'info');
        }, 2000);
    }

    // 智能任务分配
    autoAssignTasks() {
        this.showLoadingModal('AI正在分析团队负载和技能匹配...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('智能分配完成！已为2个任务分配最佳开发人员', 'success');

            // 模拟更新任务分配状态
            const unassignedTasks = document.querySelectorAll('[data-task^="unassigned"]');
            unassignedTasks.forEach((task, index) => {
                const statusSpan = task.querySelector('span:last-child');
                if (statusSpan) {
                    statusSpan.className = 'px-2 py-1 bg-success text-success-foreground text-xs rounded';
                    statusSpan.textContent = index === 0 ? '已分配给张开发' : '已分配给李前端';
                }
            });
        }, 3000);
    }

    // 生成代码
    generateCode() {
        const textarea = document.querySelector('textarea');
        const techStack = document.querySelector('select').value;
        const codeStyle = document.querySelectorAll('select')[1].value;

        if (!textarea.value.trim()) {
            this.showNotification('请输入需求描述', 'error');
            return;
        }

        this.showLoadingModal('AI正在生成代码，请稍候...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('代码生成完成！', 'success');

            // 更新代码显示区域
            const codeArea = document.querySelector('pre code');
            if (codeArea) {
                codeArea.innerHTML = `// ${techStack} - ${codeStyle}
import React, { useState, useEffect } from 'react';
import { validatePhone, sendSMS, verifyCode } from './api';

const PhoneLogin = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!validatePhone(phone)) {
      alert('请输入正确的手机号');
      return;
    }

    setLoading(true);
    try {
      await sendSMS(phone);
      setStep(2);
      this.showNotification('验证码已发送', 'success');
    } catch (error) {
      alert('发送验证码失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await verifyCode(phone, code);
      if (result.success) {
        localStorage.setItem('token', result.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert('验证码错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    &lt;div className="login-form"&gt;
      &lt;h2&gt;手机号登录&lt;/h2&gt;
      {step === 1 ? (
        &lt;div&gt;
          &lt;input
            type="tel"
            value={phone}
            onChange={(e) =&gt; setPhone(e.target.value)}
            placeholder="请输入手机号"
          /&gt;
          &lt;button onClick={handleSendCode} disabled={loading}&gt;
            {loading ? '发送中...' : '发送验证码'}
          &lt;/button&gt;
        &lt;/div&gt;
      ) : (
        &lt;div&gt;
          &lt;input
            type="text"
            value={code}
            onChange={(e) =&gt; setCode(e.target.value)}
            placeholder="请输入验证码"
          /&gt;
          &lt;button onClick={handleLogin} disabled={loading}&gt;
            {loading ? '登录中...' : '登录'}
          &lt;/button&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
};

export default PhoneLogin;`;
            }
        }, 4000);
    }

    // 复制代码
    copyCode() {
        const codeArea = document.querySelector('pre code');
        if (codeArea) {
            const text = codeArea.textContent;
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('代码已复制到剪贴板', 'success');
            }).catch(() => {
                this.showNotification('复制失败，请手动复制', 'error');
            });
        }
    }

    // 下载代码
    downloadCode() {
        const codeArea = document.querySelector('pre code');
        if (codeArea) {
            const text = codeArea.textContent;
            const blob = new Blob([text], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'PhoneLogin.jsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showNotification('代码文件已下载', 'success');
        }
    }

    // 优化代码
    optimizeCode() {
        this.showLoadingModal('AI正在优化代码...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('代码优化完成！已应用最佳实践和性能优化', 'success');

            // 这里可以更新代码显示，添加优化后的版本
        }, 2500);
    }
}

// 全局模块加载函数
function loadModule(moduleName, clickedElement) {
    if (window.app) {
        window.app.loadModule(moduleName);

        // 更新导航菜单的激活状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active', 'bg-accent', 'text-accent-foreground', 'shadow-sm');
            item.classList.add('hover:bg-accent', 'hover:text-accent-foreground');
        });

        // 激活当前点击的菜单项
        if (clickedElement) {
            const navItem = clickedElement.closest('.nav-item');
            if (navItem) {
                navItem.classList.add('active', 'bg-accent', 'text-accent-foreground', 'shadow-sm');
                navItem.classList.remove('hover:bg-accent', 'hover:text-accent-foreground');
            }
        } else {
            // 如果没有传入元素，根据模块名查找对应的导航项
            const moduleNavMap = {
                'requirement-management': '需求管理',
                'development-management': '开发管理',
                'ai-agents': 'AI Agent 管理'
            };

            const targetText = moduleNavMap[moduleName];
            if (targetText) {
                document.querySelectorAll('.nav-item').forEach(item => {
                    const span = item.querySelector('span');
                    if (span && span.textContent === targetText) {
                        item.classList.add('active', 'bg-accent', 'text-accent-foreground', 'shadow-sm');
                        item.classList.remove('hover:bg-accent', 'hover:text-accent-foreground');
                    }
                });
            }
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new AIDevPlatform();
});
