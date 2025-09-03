// 开发管理页面专用JavaScript

class DevelopmentManagement {
    constructor() {
        this.currentTab = 'dev-tasks';
        this.selectedAgent = null;
        this.selectedMode = null;
        this.init();
    }

    init() {
        this.loadContent();
        this.initEventListeners();
    }

    loadContent() {
        // 内容已经在HTML中，直接初始化功能
        setTimeout(() => {
            this.initFeatures();
        }, 100);
    }

    initEventListeners() {
        // 页面加载完成后的事件监听
        document.addEventListener('DOMContentLoaded', () => {
            this.loadContent();
        });
    }

    initFeatures() {
        // 标签页切换
        this.initTabSwitching();

        // 研发任务功能
        this.bindDevTasksFeatures();

        // 项目问题管理功能
        this.bindProjectIssuesFeatures();

        // 项目筛选功能
        this.initProjectFiltering();
    }

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
                this.showTabContent(tabName);
            });
        });
    }

    showTabContent(tabId) {
        // 隐藏所有标签页内容
        document.querySelectorAll('[data-tab-content]').forEach(content => {
            content.classList.add('hidden');
        });
        
        // 显示当前标签页内容
        const targetContent = document.querySelector(`[data-tab-content="${tabId}"]`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
        
        this.currentTab = tabId;
        this.showNotification(`切换到${this.getTabName(tabId)}`, 'info');
    }

    getTabName(tabId) {
        const tabNames = {
            'dev-tasks': '研发任务',
            'development-tasks': '开发任务'
        };
        return tabNames[tabId] || tabId;
    }

    bindDevTasksFeatures() {
        // 研发任务相关功能绑定
        this.selectedRequirements = new Set();
        this.promptTemplates = this.initPromptTemplates();
        this.agentModels = this.initAgentModels();

        // 绑定全局函数到window对象
        window.updateSelectedCount = () => this.updateSelectedCount();
        window.selectAllRequirements = () => this.selectAllRequirements();
        window.clearAllRequirements = () => this.clearAllRequirements();
        window.startDevelopment = () => this.startDevelopment();
        window.loadPromptTemplate = () => this.loadPromptTemplate();
        window.optimizePrompt = () => this.optimizePrompt();
        window.scorePrompt = () => this.scorePrompt();
        window.closeOrchestrationModal = () => this.closeOrchestrationModal();
        window.submitDevelopment = () => this.submitDevelopment();
        window.attachSelectedDocs = () => this.attachSelectedDocs();
        window.openAgentConfigModal = () => this.openAgentConfigModal();
        window.closeAgentConfigModal = () => this.closeAgentConfigModal();
        window.saveAgentConfig = () => this.saveAgentConfig();
        window.startTask = (taskId) => this.startTask(taskId);
        window.editTask = (taskId) => this.editTask(taskId);
        window.viewTaskDetails = (taskId) => this.viewTaskDetails(taskId);
        window.deleteTask = (taskId) => this.deleteTask(taskId);
        window.refreshDevelopingTasks = () => this.refreshDevelopingTasks();
        window.openCloudEditor = (taskId) => this.openCloudEditor(taskId);
        window.stopTask = (taskId) => this.stopTask(taskId);
        window.toggleAutoScroll = () => this.toggleAutoScroll();
        window.clearLogs = () => this.clearLogs();
        window.previewFile = (fileName) => this.previewFile(fileName);
        window.viewGeneratedFile = (fileName) => this.viewGeneratedFile(fileName);
        window.viewAllFiles = (taskId) => this.viewAllFiles(taskId);
        window.downloadCode = (taskId) => this.downloadCode(taskId);
        window.viewExecutionReport = (taskId) => this.viewExecutionReport(taskId);
        window.rerunTask = (taskId) => this.rerunTask(taskId);
        window.shareTask = (taskId) => this.shareTask(taskId);
        window.closeCloudEditor = () => this.closeCloudEditor();
        window.saveAllFiles = () => this.saveAllFiles();
        window.toggleFullscreen = () => this.toggleFullscreen();
        window.pauseAgent = () => this.pauseAgent();
        window.restartAgent = () => this.restartAgent();
        window.stopAgent = () => this.stopAgent();

        // 绑定Agent和模型选择事件
        this.bindAgentModelSelection();

        // 绑定知识库选择事件
        this.bindKnowledgeBaseSelection();

        // 初始化知识库数据
        this.initKnowledgeBaseData();

        // 当前Agent配置
        this.currentAgentConfig = {
            agent: null,
            model: null
        };

        // 绑定开发任务功能
        this.bindDevelopmentTasksFeatures();

        // 初始化任务状态管理
        this.initTaskStateManagement();
    }

    initPromptTemplates() {
        return {
            'default': `# 开发任务说明

## 需求概述
{requirements_summary}

## 具体需求
{requirements_details}

## 技术要求
- 请使用最佳实践进行开发
- 确保代码质量和可维护性
- 添加必要的注释和文档
- 进行充分的测试

## 交付标准
- 功能完整实现
- 代码通过测试
- 文档完善
- 符合团队编码规范`,

            'frontend': `# 前端开发任务

## 需求概述
{requirements_summary}

## 具体需求
{requirements_details}

## 技术栈要求
- React/Vue.js 最新版本
- TypeScript 强类型支持
- 响应式设计，支持移动端
- 组件化开发

## 设计要求
- 遵循UI/UX设计规范
- 保证用户体验流畅
- 支持多浏览器兼容
- 性能优化

## 交付标准
- 组件可复用
- 代码结构清晰
- 样式规范统一
- 交互体验良好`,

            'backend': `# 后端开发任务

## 需求概述
{requirements_summary}

## 具体需求
{requirements_details}

## 技术栈要求
- RESTful API 设计
- 数据库设计优化
- 安全性考虑
- 性能优化

## 开发要求
- 接口文档完善
- 错误处理机制
- 日志记录规范
- 单元测试覆盖

## 交付标准
- API 接口稳定
- 数据安全可靠
- 性能满足要求
- 文档完整准确`,

            'fullstack': `# 全栈开发任务

## 需求概述
{requirements_summary}

## 具体需求
{requirements_details}

## 技术栈要求
- 前后端分离架构
- 统一的数据格式
- 完整的用户体验
- 系统集成

## 开发要求
- 前后端协调开发
- 数据流设计合理
- 接口对接顺畅
- 整体功能完整

## 交付标准
- 前后端功能完整
- 数据交互正常
- 用户体验良好
- 系统稳定可靠`,

            'api': `# API开发任务

## 需求概述
{requirements_summary}

## 具体需求
{requirements_details}

## API设计要求
- RESTful 设计原则
- 统一的响应格式
- 完善的错误处理
- 版本控制策略

## 技术要求
- 接口性能优化
- 安全认证机制
- 限流和防护
- 监控和日志

## 交付标准
- 接口文档完整
- 功能测试通过
- 性能满足要求
- 安全性验证`
        };
    }

    initAgentModels() {
        return {
            agents: {
                'claude-code': {
                    name: 'Claude Code',
                    description: '专业代码生成和优化',
                    supportedModels: ['claude-3-opus', 'claude-3-sonnet'],
                    costMultiplier: 1.2
                },
                'github-copilot': {
                    name: 'GitHub Copilot',
                    description: '智能代码补全和生成',
                    supportedModels: ['gpt-4', 'gpt-3.5-turbo'],
                    costMultiplier: 1.0
                },
                'cursor-ai': {
                    name: 'Cursor AI',
                    description: '全栈开发助手',
                    supportedModels: ['gpt-4', 'claude-3-opus', 'gemini-pro'],
                    costMultiplier: 1.1
                },
                'augment-code': {
                    name: 'Augment Code',
                    description: '企业级代码生成平台',
                    supportedModels: ['gpt-4', 'claude-3-opus', 'claude-3-sonnet'],
                    costMultiplier: 0.9
                },
                'custom-agent': {
                    name: '自定义 Agent',
                    description: '用户自定义配置',
                    supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet', 'gemini-pro', 'codellama'],
                    costMultiplier: 1.0
                }
            },
            models: {
                'gpt-4': {
                    name: 'GPT-4',
                    provider: 'OpenAI',
                    costPerToken: 0.00003,
                    avgTokensPerMinute: 1000,
                    quality: 'high'
                },
                'gpt-3.5-turbo': {
                    name: 'GPT-3.5 Turbo',
                    provider: 'OpenAI',
                    costPerToken: 0.000002,
                    avgTokensPerMinute: 1500,
                    quality: 'medium'
                },
                'claude-3-opus': {
                    name: 'Claude 3 Opus',
                    provider: 'Anthropic',
                    costPerToken: 0.000015,
                    avgTokensPerMinute: 800,
                    quality: 'high'
                },
                'claude-3-sonnet': {
                    name: 'Claude 3 Sonnet',
                    provider: 'Anthropic',
                    costPerToken: 0.000003,
                    avgTokensPerMinute: 1200,
                    quality: 'medium'
                },
                'gemini-pro': {
                    name: 'Gemini Pro',
                    provider: 'Google',
                    costPerToken: 0.0000025,
                    avgTokensPerMinute: 1300,
                    quality: 'medium'
                },
                'codellama': {
                    name: 'Code Llama',
                    provider: 'Meta',
                    costPerToken: 0.000001,
                    avgTokensPerMinute: 2000,
                    quality: 'medium'
                }
            }
        };
    }

    initKnowledgeBaseData() {
        this.knowledgeBase = [
            { id: 'payment-api', name: '支付API文档', category: 'api', description: '支付相关接口文档和示例' },
            { id: 'user-api', name: '用户API文档', category: 'api', description: '用户管理相关接口文档' },
            { id: 'order-api', name: '订单API文档', category: 'api', description: '订单处理相关接口文档' },
            { id: 'third-party-api', name: '第三方接口文档', category: 'api', description: '第三方服务集成文档' },
            { id: 'react-guide', name: 'React开发指南', category: 'tech', description: 'React框架开发最佳实践' },
            { id: 'nodejs-guide', name: 'Node.js最佳实践', category: 'tech', description: 'Node.js后端开发规范' },
            { id: 'database-schema', name: '数据库设计文档', category: 'tech', description: '数据库表结构和关系设计' },
            { id: 'security-guide', name: '安全开发规范', category: 'tech', description: '安全编码和防护指南' },
            { id: 'ui-components', name: 'UI组件库文档', category: 'tech', description: '前端组件使用说明' },
            { id: 'deployment-guide', name: '部署运维文档', category: 'tech', description: '系统部署和运维指南' }
        ];

        this.selectedDocs = new Set();
    }

    bindKnowledgeBaseSelection() {
        const searchInput = document.getElementById('knowledge-search');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchKnowledgeBase(e.target.value);
            });

            // 初始显示所有文档
            this.searchKnowledgeBase('');
        }
    }

    searchKnowledgeBase(query) {
        const resultsContainer = document.getElementById('knowledge-search-results');
        if (!resultsContainer) return;

        const filteredDocs = this.knowledgeBase.filter(doc =>
            doc.name.toLowerCase().includes(query.toLowerCase()) ||
            doc.description.toLowerCase().includes(query.toLowerCase())
        );

        resultsContainer.innerHTML = '';

        if (filteredDocs.length === 0) {
            resultsContainer.innerHTML = '<div class="text-sm text-muted-foreground p-2">未找到相关文档</div>';
            return;
        }

        filteredDocs.forEach(doc => {
            const isSelected = this.selectedDocs.has(doc.id);
            const docHtml = `
                <div class="flex items-center justify-between p-2 border border-border rounded hover:bg-accent cursor-pointer" onclick="toggleDocSelection('${doc.id}')">
                    <div class="flex-1">
                        <div class="text-sm font-medium">${doc.name}</div>
                        <div class="text-xs text-muted-foreground">${doc.description}</div>
                    </div>
                    <div class="ml-2">
                        ${isSelected ?
                            '<span class="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">已选择</span>' :
                            '<span class="text-xs text-muted-foreground">点击选择</span>'
                        }
                    </div>
                </div>
            `;
            resultsContainer.insertAdjacentHTML('beforeend', docHtml);
        });

        // 绑定全局函数
        window.toggleDocSelection = (docId) => this.toggleDocSelection(docId);
    }

    toggleDocSelection(docId) {
        if (this.selectedDocs.has(docId)) {
            this.selectedDocs.delete(docId);
        } else {
            this.selectedDocs.add(docId);
        }

        this.updateSelectedDocsList();
        this.updateSelectedDocsCount();

        // 重新搜索以更新显示状态
        const searchInput = document.getElementById('knowledge-search');
        if (searchInput) {
            this.searchKnowledgeBase(searchInput.value);
        }
    }

    updateSelectedDocsList() {
        const listContainer = document.getElementById('selected-docs-list');
        if (!listContainer) return;

        listContainer.innerHTML = '';

        if (this.selectedDocs.size === 0) {
            listContainer.innerHTML = '<div class="text-sm text-muted-foreground">暂无选择的文档</div>';
            return;
        }

        this.selectedDocs.forEach(docId => {
            const doc = this.knowledgeBase.find(d => d.id === docId);
            if (doc) {
                const docHtml = `
                    <div class="flex items-center justify-between p-2 bg-card border border-border rounded">
                        <div class="flex-1">
                            <span class="text-sm font-medium">${doc.name}</span>
                            <span class="text-xs text-muted-foreground ml-2">(${doc.category === 'api' ? 'API文档' : '技术文档'})</span>
                        </div>
                        <button class="text-xs text-destructive hover:text-destructive/80" onclick="toggleDocSelection('${doc.id}')">
                            移除
                        </button>
                    </div>
                `;
                listContainer.insertAdjacentHTML('beforeend', docHtml);
            }
        });
    }

    updateSelectedDocsCount() {
        const countElement = document.getElementById('selected-docs-count');
        if (countElement) {
            countElement.textContent = this.selectedDocs.size;
        }
    }

    bindAgentModelSelection() {
        const agentSelect = document.getElementById('agent-select');
        const modelSelect = document.getElementById('model-select');

        if (agentSelect) {
            agentSelect.addEventListener('change', () => {
                this.updateAvailableModels();
                this.updateCostEstimate();
            });
        }

        if (modelSelect) {
            modelSelect.addEventListener('change', () => {
                this.updateCostEstimate();
            });
        }
    }

    updateAvailableModels() {
        const agentSelect = document.getElementById('agent-select');
        const modelSelect = document.getElementById('model-select');
        const selectedAgent = agentSelect.value;

        // 清空模型选择
        modelSelect.innerHTML = '<option value="">请选择模型</option>';

        if (selectedAgent && this.agentModels.agents[selectedAgent]) {
            const supportedModels = this.agentModels.agents[selectedAgent].supportedModels;

            supportedModels.forEach(modelId => {
                if (this.agentModels.models[modelId]) {
                    const model = this.agentModels.models[modelId];
                    const option = document.createElement('option');
                    option.value = modelId;
                    option.textContent = `${model.name} (${model.provider})`;
                    modelSelect.appendChild(option);
                }
            });
        }

        this.updateCostEstimate();
    }

    updateCostEstimate() {
        const agentSelect = document.getElementById('agent-select');
        const modelSelect = document.getElementById('model-select');
        const selectedAgent = agentSelect.value;
        const selectedModel = modelSelect.value;

        let estimatedCost = 0;
        let estimatedTime = 0;

        if (selectedAgent && selectedModel && this.selectedRequirements.size > 0) {
            const agent = this.agentModels.agents[selectedAgent];
            const model = this.agentModels.models[selectedModel];

            // 根据需求数量和复杂度估算token数量
            const requirementsCount = this.selectedRequirements.size;
            const avgTokensPerRequirement = 5000; // 平均每个需求5000 tokens
            const totalTokens = requirementsCount * avgTokensPerRequirement;

            // 计算成本
            estimatedCost = totalTokens * model.costPerToken * agent.costMultiplier;

            // 计算时间（分钟）
            estimatedTime = Math.ceil(totalTokens / model.avgTokensPerMinute);
        }

        // 更新显示
        document.getElementById('estimated-cost').textContent = `$${estimatedCost.toFixed(2)}`;
        document.getElementById('estimated-time').textContent = `${estimatedTime}分钟`;
    }

    bindKnowledgeBaseSelection() {
        const apiDocsSelect = document.getElementById('api-docs-select');
        const techDocsSelect = document.getElementById('tech-docs-select');

        if (apiDocsSelect) {
            apiDocsSelect.addEventListener('change', () => this.updateSelectedDocsCount());
        }

        if (techDocsSelect) {
            techDocsSelect.addEventListener('change', () => this.updateSelectedDocsCount());
        }
    }

    updateSelectedDocsCount() {
        const apiDocsSelect = document.getElementById('api-docs-select');
        const techDocsSelect = document.getElementById('tech-docs-select');

        let totalSelected = 0;

        if (apiDocsSelect) {
            totalSelected += apiDocsSelect.selectedOptions.length;
        }

        if (techDocsSelect) {
            totalSelected += techDocsSelect.selectedOptions.length;
        }

        const countElement = document.getElementById('selected-docs-count');
        if (countElement) {
            countElement.textContent = totalSelected;
        }
    }

    attachSelectedDocs() {
        const promptEditor = document.getElementById('prompt-editor');

        if (this.selectedDocs.size === 0) {
            this.showNotification('请先选择要附加的文档', 'warning');
            return;
        }

        // 收集选中的文档信息
        const selectedDocsInfo = [];
        this.selectedDocs.forEach(docId => {
            const doc = this.knowledgeBase.find(d => d.id === docId);
            if (doc) {
                selectedDocsInfo.push({
                    type: doc.category === 'api' ? 'API文档' : '技术文档',
                    name: doc.name,
                    description: doc.description
                });
            }
        });

        // 生成文档引用文本
        const docsReference = this.generateDocsReference(selectedDocsInfo);

        // 附加到Prompt
        const currentPrompt = promptEditor.value;
        const updatedPrompt = currentPrompt + '\n\n' + docsReference;
        promptEditor.value = updatedPrompt;

        this.showNotification(`已附加${selectedDocsInfo.length}个文档到Prompt`, 'success');
    }

    generateDocsReference(selectedDocs) {
        let reference = '## 相关文档参考\n\n';

        const apiDocs = selectedDocs.filter(doc => doc.type === 'API文档');
        const techDocs = selectedDocs.filter(doc => doc.type === '技术文档');

        if (apiDocs.length > 0) {
            reference += '### API文档\n';
            apiDocs.forEach(doc => {
                reference += `- ${doc.name}\n`;
            });
            reference += '\n';
        }

        if (techDocs.length > 0) {
            reference += '### 技术文档\n';
            techDocs.forEach(doc => {
                reference += `- ${doc.name}\n`;
            });
            reference += '\n';
        }

        reference += '请在开发过程中参考以上文档，确保实现符合规范和接口要求。\n';

        return reference;
    }

    openAgentConfigModal() {
        const modal = document.getElementById('agent-config-modal');
        modal.classList.remove('hidden');

        // 同步当前配置到弹窗
        const agentSelect = document.getElementById('agent-select');
        const modelSelect = document.getElementById('model-select');

        if (this.currentAgentConfig.agent) {
            agentSelect.value = this.currentAgentConfig.agent;
            this.updateAvailableModels();
        }

        if (this.currentAgentConfig.model) {
            modelSelect.value = this.currentAgentConfig.model;
        }

        this.updateModalCostEstimate();
    }

    closeAgentConfigModal() {
        const modal = document.getElementById('agent-config-modal');
        modal.classList.add('hidden');
    }

    saveAgentConfig() {
        const agentSelect = document.getElementById('agent-select');
        const modelSelect = document.getElementById('model-select');

        const selectedAgent = agentSelect.value;
        const selectedModel = modelSelect.value;

        if (!selectedAgent) {
            this.showNotification('请选择AI Agent', 'warning');
            return;
        }

        if (!selectedModel) {
            this.showNotification('请选择模型', 'warning');
            return;
        }

        // 保存配置
        this.currentAgentConfig.agent = selectedAgent;
        this.currentAgentConfig.model = selectedModel;

        // 更新显示
        this.updateAgentConfigDisplay();

        // 关闭弹窗
        this.closeAgentConfigModal();

        const agentName = this.agentModels.agents[selectedAgent].name;
        const modelName = this.agentModels.models[selectedModel].name;

        this.showNotification(`已配置Agent: ${agentName} + ${modelName}`, 'success');
    }

    updateAgentConfigDisplay() {
        const agentNameElement = document.getElementById('selected-agent-name');
        const modelNameElement = document.getElementById('selected-model-name');

        if (this.currentAgentConfig.agent && this.currentAgentConfig.model) {
            const agentName = this.agentModels.agents[this.currentAgentConfig.agent].name;
            const modelName = this.agentModels.models[this.currentAgentConfig.model].name;

            agentNameElement.textContent = agentName;
            modelNameElement.textContent = modelName;
        } else {
            agentNameElement.textContent = '未选择';
            modelNameElement.textContent = '未选择';
        }

        // 更新成本估算
        this.updateCostEstimate();
    }

    updateModalCostEstimate() {
        const agentSelect = document.getElementById('agent-select');
        const modelSelect = document.getElementById('model-select');
        const selectedAgent = agentSelect.value;
        const selectedModel = modelSelect.value;

        let estimatedCost = 0;
        let estimatedTime = 0;

        if (selectedAgent && selectedModel && this.selectedRequirements.size > 0) {
            const agent = this.agentModels.agents[selectedAgent];
            const model = this.agentModels.models[selectedModel];

            // 根据需求数量和复杂度估算token数量
            const requirementsCount = this.selectedRequirements.size;
            const avgTokensPerRequirement = 5000; // 平均每个需求5000 tokens
            const totalTokens = requirementsCount * avgTokensPerRequirement;

            // 计算成本
            estimatedCost = totalTokens * model.costPerToken * agent.costMultiplier;

            // 计算时间（分钟）
            estimatedTime = Math.ceil(totalTokens / model.avgTokensPerMinute);
        }

        // 更新弹窗中的显示
        document.getElementById('modal-estimated-cost').textContent = `$${estimatedCost.toFixed(2)}`;
        document.getElementById('modal-estimated-time').textContent = `${estimatedTime}分钟`;
    }

    updateSelectedCount() {
        const checkboxes = document.querySelectorAll('.requirement-checkbox:checked');
        const count = checkboxes.length;

        // 更新选中数量显示
        document.getElementById('selected-requirements-count').textContent = `已选择 ${count} 个需求`;

        // 更新开始开发按钮状态
        const startBtn = document.getElementById('start-development-btn');
        if (startBtn) {
            startBtn.disabled = count === 0;
            if (count === 0) {
                startBtn.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // 更新选中的需求集合
        this.selectedRequirements.clear();
        checkboxes.forEach(checkbox => {
            this.selectedRequirements.add({
                id: checkbox.dataset.requirementId,
                name: checkbox.dataset.requirementName,
                workload: checkbox.dataset.workload
            });
        });

        // 更新成本估算
        this.updateCostEstimate();
    }

    bindDevelopmentTasksFeatures() {
        // 开发任务状态切换功能
        const devTaskFilterButtons = document.querySelectorAll('[data-dev-task-filter]');
        const devTaskContents = document.querySelectorAll('[data-dev-task-content]');

        devTaskFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetFilter = this.getAttribute('data-dev-task-filter');

                // 更新按钮状态
                devTaskFilterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-primary-foreground');
                    btn.classList.add('text-muted-foreground');
                });
                this.classList.remove('text-muted-foreground');
                this.classList.add('bg-primary', 'text-primary-foreground');

                // 更新内容显示
                devTaskContents.forEach(content => {
                    if (content.getAttribute('data-dev-task-content') === targetFilter) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });

        // 初始化拖拽排序功能
        this.initDragAndDrop();
    }

    initDragAndDrop() {
        const queue = document.getElementById('pending-tasks-queue');
        if (!queue) return;

        let draggedElement = null;

        // 为每个任务项添加拖拽事件
        const taskItems = queue.querySelectorAll('[data-task-id]');
        taskItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedElement = item;
                item.style.opacity = '0.5';
                e.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', (e) => {
                item.style.opacity = '1';
                draggedElement = null;
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedElement && draggedElement !== item) {
                    const rect = item.getBoundingClientRect();
                    const midpoint = rect.top + rect.height / 2;

                    if (e.clientY < midpoint) {
                        queue.insertBefore(draggedElement, item);
                    } else {
                        queue.insertBefore(draggedElement, item.nextSibling);
                    }

                    this.showNotification('任务顺序已更新', 'success');
                }
            });
        });
    }

    startTask(taskId) {
        console.log(`开始执行任务: ${taskId}`);

        if (confirm(`确定要开始执行任务 ${taskId} 吗？`)) {
            // 从待开发队列中移除任务
            const task = this.moveTaskToNextState(taskId, 'pending', 'developing');

            if (task) {
                // 更新任务状态
                task.status = 'developing';
                task.startedAt = new Date();

                // 更新UI显示
                this.renderPendingTasks();
                this.renderDevelopingTasks();

                this.showNotification(`任务 ${task.name} 已开始执行`, 'success');

                // 模拟开发过程
                this.simulateTaskDevelopment(task);

                // 提示用户可以查看开发中任务
                setTimeout(() => {
                    this.showNotification(`任务正在开发中，可在"开发中"标签页查看进度`, 'info');
                }, 1000);
            }
        }
    }

    moveTaskToNextState(taskId, fromState, toState) {
        const fromArray = this.taskStates[fromState];
        const toArray = this.taskStates[toState];

        const taskIndex = fromArray.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return null;

        const task = fromArray.splice(taskIndex, 1)[0];
        toArray.push(task);

        return task;
    }

    simulateTaskDevelopment(task) {
        // 模拟开发过程，定期更新进度
        const progressInterval = setInterval(() => {
            task.progress += Math.random() * 10;
            task.actualTime += 1;
            task.actualCost += 0.05;

            if (task.progress >= 100) {
                task.progress = 100;
                task.status = 'completed';
                task.completedAt = new Date();

                // 移动到已完成状态
                this.moveTaskToNextState(task.id, 'developing', 'completed');

                // 更新UI
                this.renderDevelopingTasks();
                this.renderCompletedTasks();

                this.showNotification(`任务 ${task.name} 已完成！`, 'success');

                clearInterval(progressInterval);
            }

            // 更新开发中任务的显示
            this.updateDevelopingTaskProgress(task);

        }, 2000); // 每2秒更新一次进度

        // 保存定时器引用以便后续清理
        task.progressInterval = progressInterval;
    }

    renderDevelopingTasks() {
        // 这里可以实现开发中任务的渲染逻辑
        console.log('渲染开发中任务:', this.taskStates.developing);
    }

    renderCompletedTasks() {
        // 这里可以实现已完成任务的渲染逻辑
        console.log('渲染已完成任务:', this.taskStates.completed);
    }

    updateDevelopingTaskProgress(task) {
        // 更新开发中任务的进度显示
        const progressElements = document.querySelectorAll(`[data-task-id="${task.id}"] .progress-bar`);
        progressElements.forEach(element => {
            element.style.width = `${task.progress}%`;
        });

        const progressTexts = document.querySelectorAll(`[data-task-id="${task.id}"] .progress-text`);
        progressTexts.forEach(element => {
            element.textContent = `${Math.round(task.progress)}%`;
        });
    }

    editTask(taskId) {
        console.log(`编辑任务: ${taskId}`);
        alert(`打开任务 ${taskId} 的编辑界面`);
        // 这里可以打开任务编辑弹窗
    }

    viewTaskDetails(taskId) {
        console.log(`查看任务详情: ${taskId}`);
        alert(`显示任务 ${taskId} 的详细信息`);
        // 这里可以打开任务详情弹窗
    }

    deleteTask(taskId) {
        if (confirm(`确定要删除任务 ${taskId} 吗？此操作不可撤销。`)) {
            console.log(`删除任务: ${taskId}`);

            // 从所有状态中查找并删除任务
            let taskFound = false;
            let taskName = '';

            for (const state in this.taskStates) {
                const taskIndex = this.taskStates[state].findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    const task = this.taskStates[state][taskIndex];
                    taskName = task.name;

                    // 清理定时器
                    if (task.progressInterval) {
                        clearInterval(task.progressInterval);
                    }

                    // 从数组中删除
                    this.taskStates[state].splice(taskIndex, 1);
                    taskFound = true;
                    break;
                }
            }

            if (taskFound) {
                // 更新相应的UI
                this.renderPendingTasks();
                this.renderDevelopingTasks();
                this.renderCompletedTasks();

                this.showNotification(`任务 ${taskName} 已删除`, 'success');
            } else {
                this.showNotification(`未找到任务 ${taskId}`, 'error');
            }
        }
    }

    // 添加标签页切换功能
    switchToTab(tabId) {
        const tabButtons = document.querySelectorAll('[data-tab]');
        const tabContents = document.querySelectorAll('[data-tab-content]');

        tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.remove('border-transparent', 'text-muted-foreground');
                button.classList.add('border-primary', 'text-primary', 'font-medium');
            } else {
                button.classList.remove('border-primary', 'text-primary', 'font-medium');
                button.classList.add('border-transparent', 'text-muted-foreground');
            }
        });

        tabContents.forEach(content => {
            if (content.getAttribute('data-tab-content') === tabId) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    refreshDevelopingTasks() {
        console.log('刷新开发中任务状态');
        this.showNotification('任务状态已刷新', 'info');

        // 模拟更新进度
        this.updateTaskProgress();
    }

    updateTaskProgress() {
        // 模拟进度更新
        const progressBar = document.querySelector('[data-dev-task-content="developing"] .bg-primary');
        if (progressBar) {
            const currentWidth = parseInt(progressBar.style.width) || 65;
            const newWidth = Math.min(100, currentWidth + Math.random() * 10);
            progressBar.style.width = `${newWidth}%`;

            // 更新进度文本
            const progressText = progressBar.parentElement.previousElementSibling.querySelector('.font-medium');
            if (progressText) {
                progressText.textContent = `${Math.round(newWidth)}%`;
            }
        }
    }

    openCloudEditor(taskId) {
        console.log(`打开云端编辑器: ${taskId}`);
        this.showNotification('正在启动云端编辑器...', 'info');

        // 显示云端编辑器弹窗
        const modal = document.getElementById('cloud-editor-modal');
        if (modal) {
            modal.classList.remove('hidden');

            // 初始化编辑器
            this.initCloudEditor(taskId);
        }
    }

    stopTask(taskId) {
        if (confirm(`确定要停止任务 ${taskId} 吗？已生成的代码将会保留。`)) {
            console.log(`停止任务: ${taskId}`);
            this.showNotification(`任务 ${taskId} 已停止`, 'warning');

            // 模拟任务停止
            const statusElement = document.querySelector('[data-dev-task-content="developing"] .animate-pulse');
            if (statusElement) {
                statusElement.textContent = '已停止';
                statusElement.classList.remove('animate-pulse', 'bg-success', 'text-success-foreground');
                statusElement.classList.add('bg-warning', 'text-warning-foreground');
            }
        }
    }

    toggleAutoScroll() {
        const logsContainer = document.getElementById('task-logs');
        if (logsContainer) {
            this.autoScrollEnabled = !this.autoScrollEnabled;

            if (this.autoScrollEnabled) {
                logsContainer.scrollTop = logsContainer.scrollHeight;
                this.showNotification('自动滚动已开启', 'info');
                this.startLogSimulation();
            } else {
                this.showNotification('自动滚动已关闭', 'info');
                this.stopLogSimulation();
            }
        }
    }

    startLogSimulation() {
        if (this.logSimulationInterval) {
            clearInterval(this.logSimulationInterval);
        }

        const logs = [
            '[14:32:50] 优化CSS样式...',
            '[14:32:55] 添加响应式断点...',
            '[14:33:00] 生成测试文件...',
            '[14:33:05] 运行代码检查...',
            '[14:33:10] 修复ESLint警告...',
            '[14:33:15] 更新文档注释...'
        ];

        let logIndex = 0;
        this.logSimulationInterval = setInterval(() => {
            if (this.autoScrollEnabled && logIndex < logs.length) {
                this.addLogEntry(logs[logIndex], 'info');
                logIndex++;
            } else if (logIndex >= logs.length) {
                this.stopLogSimulation();
            }
        }, 3000);
    }

    stopLogSimulation() {
        if (this.logSimulationInterval) {
            clearInterval(this.logSimulationInterval);
            this.logSimulationInterval = null;
        }
    }

    addLogEntry(message, type = 'info') {
        const logsContainer = document.getElementById('task-logs');
        if (logsContainer) {
            const logEntry = document.createElement('div');
            logEntry.className = `text-${type}`;
            logEntry.textContent = message;

            logsContainer.appendChild(logEntry);

            if (this.autoScrollEnabled) {
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }
        }
    }

    clearLogs() {
        const logsContainer = document.getElementById('task-logs');
        if (logsContainer) {
            logsContainer.innerHTML = '<div class="text-info">[' + new Date().toLocaleTimeString() + '] 日志已清空</div>';
            this.showNotification('日志已清空', 'info');
        }
    }

    previewFile(fileName) {
        console.log(`预览文件: ${fileName}`);

        // 模拟文件预览
        const mockFileContent = {
            'Header.tsx': `import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;`,
            'Navigation.tsx': `import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  items: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={\`py-4 px-1 border-b-2 font-medium text-sm \${
                item.active
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }\`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;`
        };

        const content = mockFileContent[fileName] || '// 文件内容加载中...';

        // 创建简单的预览弹窗
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b border-border">
                    <h3 class="text-lg font-semibold">文件预览: ${fileName}</h3>
                    <button class="p-2 hover:bg-accent rounded-md" onclick="this.closest('.fixed').remove()">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <pre class="bg-muted rounded p-4 overflow-auto max-h-96 text-sm font-mono">${content}</pre>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    viewGeneratedFile(fileName) {
        console.log(`查看生成的文件: ${fileName}`);

        // 模拟已完成任务的文件内容
        const completedFileContent = {
            'PaymentService.ts': `import { WechatPay } from './WechatPay';
import { AlipayPay } from './AlipayPay';

export interface PaymentProvider {
  processPayment(amount: number, orderId: string): Promise<PaymentResult>;
  refund(transactionId: string, amount: number): Promise<RefundResult>;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message?: string;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  message?: string;
}

export class PaymentService {
  private providers: Map<string, PaymentProvider> = new Map();

  constructor() {
    this.providers.set('wechat', new WechatPay());
    this.providers.set('alipay', new AlipayPay());
  }

  async processPayment(
    provider: string,
    amount: number,
    orderId: string
  ): Promise<PaymentResult> {
    const paymentProvider = this.providers.get(provider);

    if (!paymentProvider) {
      throw new Error(\`Unsupported payment provider: \${provider}\`);
    }

    try {
      return await paymentProvider.processPayment(amount, orderId);
    } catch (error) {
      console.error('Payment processing failed:', error);
      return {
        success: false,
        transactionId: '',
        message: 'Payment processing failed'
      };
    }
  }

  async refund(
    provider: string,
    transactionId: string,
    amount: number
  ): Promise<RefundResult> {
    const paymentProvider = this.providers.get(provider);

    if (!paymentProvider) {
      throw new Error(\`Unsupported payment provider: \${provider}\`);
    }

    return await paymentProvider.refund(transactionId, amount);
  }
}`,
            'WechatPay.ts': `import { PaymentProvider, PaymentResult, RefundResult } from './PaymentService';

export class WechatPay implements PaymentProvider {
  private apiKey: string;
  private merchantId: string;

  constructor() {
    this.apiKey = process.env.WECHAT_API_KEY || '';
    this.merchantId = process.env.WECHAT_MERCHANT_ID || '';
  }

  async processPayment(amount: number, orderId: string): Promise<PaymentResult> {
    // 微信支付API调用逻辑
    try {
      const response = await this.callWechatAPI({
        amount: amount * 100, // 转换为分
        out_trade_no: orderId,
        body: \`Order \${orderId}\`,
        trade_type: 'NATIVE'
      });

      return {
        success: true,
        transactionId: response.transaction_id,
        message: 'Payment successful'
      };
    } catch (error) {
      return {
        success: false,
        transactionId: '',
        message: 'Wechat payment failed'
      };
    }
  }

  async refund(transactionId: string, amount: number): Promise<RefundResult> {
    // 微信退款API调用逻辑
    try {
      const response = await this.callWechatRefundAPI({
        transaction_id: transactionId,
        refund_fee: amount * 100,
        total_fee: amount * 100
      });

      return {
        success: true,
        refundId: response.refund_id,
        message: 'Refund successful'
      };
    } catch (error) {
      return {
        success: false,
        refundId: '',
        message: 'Wechat refund failed'
      };
    }
  }

  private async callWechatAPI(params: any): Promise<any> {
    // 模拟微信API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          transaction_id: 'wx_' + Date.now(),
          return_code: 'SUCCESS'
        });
      }, 1000);
    });
  }

  private async callWechatRefundAPI(params: any): Promise<any> {
    // 模拟微信退款API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          refund_id: 'wx_refund_' + Date.now(),
          return_code: 'SUCCESS'
        });
      }, 1000);
    });
  }
}`
        };

        const content = completedFileContent[fileName] || '// 文件内容不可用';
        this.showFilePreview(fileName, content);
    }

    showFilePreview(fileName, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-card border border-border rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b border-border">
                    <h3 class="text-lg font-semibold">文件预览: ${fileName}</h3>
                    <div class="flex space-x-2">
                        <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" onclick="copyToClipboard('${fileName}')">
                            📋 复制代码
                        </button>
                        <button class="p-2 hover:bg-accent rounded-md" onclick="this.closest('.fixed').remove()">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="p-4 overflow-auto max-h-[75vh]">
                    <pre class="bg-muted rounded p-4 text-sm font-mono overflow-auto">${content}</pre>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    viewAllFiles(taskId) {
        console.log(`查看任务所有文件: ${taskId}`);
        alert(`显示任务 ${taskId} 的所有生成文件列表`);
    }

    downloadCode(taskId) {
        console.log(`下载代码: ${taskId}`);
        this.showNotification(`正在准备下载任务 ${taskId} 的代码包...`, 'info');

        // 模拟下载过程
        setTimeout(() => {
            this.showNotification(`任务 ${taskId} 的代码包下载已开始`, 'success');
        }, 2000);
    }

    viewExecutionReport(taskId) {
        console.log(`查看执行报告: ${taskId}`);

        // 创建执行报告弹窗
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b border-border">
                    <h3 class="text-lg font-semibold">执行报告: ${taskId}</h3>
                    <button class="p-2 hover:bg-accent rounded-md" onclick="this.closest('.fixed').remove()">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
                <div class="p-4 overflow-auto max-h-[75vh] space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-muted rounded-lg p-4">
                            <h4 class="font-medium mb-2">执行概要</h4>
                            <div class="space-y-1 text-sm">
                                <div>开始时间: 2024-01-20 16:22:15</div>
                                <div>结束时间: 2024-01-20 16:45:32</div>
                                <div>总耗时: 23分17秒</div>
                                <div>状态: 成功完成</div>
                            </div>
                        </div>
                        <div class="bg-muted rounded-lg p-4">
                            <h4 class="font-medium mb-2">资源消耗</h4>
                            <div class="space-y-1 text-sm">
                                <div>Token消耗: 45,230</div>
                                <div>实际成本: $3.85</div>
                                <div>预算使用: 91.7%</div>
                                <div>效率评分: 4.8/5.0</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-muted rounded-lg p-4">
                        <h4 class="font-medium mb-2">代码质量分析</h4>
                        <div class="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <div class="text-muted-foreground">代码复杂度</div>
                                <div class="font-medium text-success">优秀</div>
                            </div>
                            <div>
                                <div class="text-muted-foreground">测试覆盖率</div>
                                <div class="font-medium text-success">92%</div>
                            </div>
                            <div>
                                <div class="text-muted-foreground">代码规范</div>
                                <div class="font-medium text-success">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    rerunTask(taskId) {
        if (confirm(`确定要重新执行任务 ${taskId} 吗？这将创建一个新的任务实例。`)) {
            console.log(`重新执行任务: ${taskId}`);
            this.showNotification(`任务 ${taskId} 已加入执行队列`, 'success');
        }
    }

    shareTask(taskId) {
        console.log(`分享任务: ${taskId}`);

        // 模拟生成分享链接
        const shareUrl = `https://ai-dev-platform.com/tasks/${taskId}`;

        // 复制到剪贴板
        navigator.clipboard.writeText(shareUrl).then(() => {
            this.showNotification('分享链接已复制到剪贴板', 'success');
        }).catch(() => {
            // 降级处理
            prompt('分享链接:', shareUrl);
        });
    }

    initCloudEditor(taskId) {
        // 设置任务名称
        const taskNameElement = document.getElementById('editor-task-name');
        if (taskNameElement) {
            taskNameElement.textContent = `任务: ${taskId}`;
        }

        // 初始化文件树
        this.initFileTree();

        // 初始化Monaco Editor
        this.initMonacoEditor();

        // 初始化Agent监控
        this.initAgentMonitoring();

        // 模拟文件变更监控
        this.startFileChangeMonitoring();
    }

    initFileTree() {
        const fileTree = document.getElementById('file-tree');
        if (!fileTree) return;

        const mockFileStructure = {
            'src': {
                'components': {
                    'Header.tsx': 'file',
                    'Navigation.tsx': 'file',
                    'Layout.tsx': 'file'
                },
                'styles': {
                    'layout.css': 'file',
                    'components.css': 'file'
                },
                'utils': {
                    'helpers.ts': 'file'
                }
            },
            'tests': {
                'components.test.tsx': 'file'
            },
            'package.json': 'file',
            'README.md': 'file'
        };

        fileTree.innerHTML = this.generateFileTreeHTML(mockFileStructure);
    }

    generateFileTreeHTML(structure, level = 0) {
        let html = '';

        for (const [name, content] of Object.entries(structure)) {
            const indent = '  '.repeat(level);

            if (content === 'file') {
                html += `
                    <div class="${indent} flex items-center space-x-2 py-1 px-2 hover:bg-accent rounded cursor-pointer" onclick="openFileInEditor('${name}')">
                        <span class="text-xs">📄</span>
                        <span class="text-sm">${name}</span>
                    </div>
                `;
            } else {
                html += `
                    <div class="${indent} flex items-center space-x-2 py-1 px-2 hover:bg-accent rounded cursor-pointer" onclick="toggleFolder(this)">
                        <span class="text-xs folder-icon">📁</span>
                        <span class="text-sm font-medium">${name}</span>
                    </div>
                    <div class="folder-content">
                        ${this.generateFileTreeHTML(content, level + 1)}
                    </div>
                `;
            }
        }

        return html;
    }

    initMonacoEditor() {
        // 检查Monaco Editor是否已加载
        if (typeof require !== 'undefined') {
            require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }});
            require(['vs/editor/editor.main'], () => {
                this.createMonacoEditor();
            });
        } else {
            // 如果Monaco Editor未加载，显示占位符
            const container = document.getElementById('monaco-editor-container');
            if (container) {
                container.innerHTML = `
                    <div class="flex items-center justify-center h-full bg-muted">
                        <div class="text-center">
                            <div class="text-lg font-medium mb-2">Monaco Editor 加载中...</div>
                            <div class="text-sm text-muted-foreground">正在初始化代码编辑器</div>
                        </div>
                    </div>
                `;
            }
        }
    }

    createMonacoEditor() {
        const container = document.getElementById('monaco-editor-container');
        if (!container) return;

        // 创建Monaco Editor实例
        this.monacoEditor = monaco.editor.create(container, {
            value: `// 欢迎使用云端编辑器
// 这里将显示Agent生成的代码

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;`,
            language: 'typescript',
            theme: 'vs-dark',
            automaticLayout: true,
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false
        });

        // 创建编辑器标签页
        this.createEditorTab('Header.tsx', true);

        // 绑定全局函数
        window.openFileInEditor = (fileName) => this.openFileInEditor(fileName);
        window.toggleFolder = (element) => this.toggleFolder(element);
    }

    createEditorTab(fileName, isActive = false) {
        const tabsContainer = document.getElementById('editor-tabs');
        if (!tabsContainer) return;

        const tab = document.createElement('div');
        tab.className = `flex items-center space-x-2 px-4 py-2 border-r border-border cursor-pointer ${isActive ? 'bg-card' : 'bg-muted hover:bg-accent'}`;
        tab.innerHTML = `
            <span class="text-sm">${fileName}</span>
            <button class="text-xs hover:text-destructive" onclick="closeEditorTab('${fileName}')">×</button>
        `;

        tab.addEventListener('click', () => this.switchToTab(fileName));
        tabsContainer.appendChild(tab);

        // 绑定关闭标签页函数
        window.closeEditorTab = (fileName) => this.closeEditorTab(fileName);
    }

    openFileInEditor(fileName) {
        console.log(`打开文件: ${fileName}`);

        // 模拟文件内容
        const fileContents = {
            'Header.tsx': `import React from 'react';\n\n// Header组件代码...`,
            'Navigation.tsx': `import React from 'react';\n\n// Navigation组件代码...`,
            'Layout.tsx': `import React from 'react';\n\n// Layout组件代码...`,
            'layout.css': `/* 布局样式 */\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}`,
        };

        const content = fileContents[fileName] || `// ${fileName} 文件内容`;

        if (this.monacoEditor) {
            this.monacoEditor.setValue(content);
        }

        // 创建新标签页
        this.createEditorTab(fileName, true);

        this.showNotification(`已打开文件: ${fileName}`, 'info');
    }

    toggleFolder(element) {
        const folderContent = element.nextElementSibling;
        const icon = element.querySelector('.folder-icon');

        if (folderContent.style.display === 'none') {
            folderContent.style.display = 'block';
            icon.textContent = '📂';
        } else {
            folderContent.style.display = 'none';
            icon.textContent = '📁';
        }
    }

    initAgentMonitoring() {
        // 初始化Agent监控日志
        const editorLogs = document.getElementById('editor-logs');
        if (editorLogs) {
            editorLogs.innerHTML = `
                <div class="text-success">[${new Date().toLocaleTimeString()}] Agent已连接</div>
                <div class="text-info">[${new Date().toLocaleTimeString()}] 开始监控代码生成过程</div>
                <div class="text-info">[${new Date().toLocaleTimeString()}] 正在分析项目结构...</div>
            `;
        }

        // 初始化文件变更监控
        const fileChanges = document.getElementById('file-changes');
        if (fileChanges) {
            fileChanges.innerHTML = `
                <div class="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span>Header.tsx</span>
                    <span class="text-success">已生成</span>
                </div>
                <div class="flex items-center justify-between text-xs p-2 bg-muted rounded">
                    <span>Navigation.tsx</span>
                    <span class="text-warning">生成中...</span>
                </div>
            `;
        }
    }

    startFileChangeMonitoring() {
        // 模拟Agent执行过程和文件变更监控
        const agentTasks = [
            { time: 2000, message: '正在分析需求文档...', type: 'info' },
            { time: 4000, message: '开始生成Header组件...', type: 'info' },
            { time: 6000, message: 'Header.tsx 生成完成', type: 'success', file: 'Header.tsx' },
            { time: 8000, message: '开始生成Navigation组件...', type: 'info' },
            { time: 10000, message: 'Navigation.tsx 生成完成', type: 'success', file: 'Navigation.tsx' },
            { time: 12000, message: '开始生成Layout组件...', type: 'info' },
            { time: 15000, message: '正在优化响应式布局...', type: 'warning' },
            { time: 18000, message: 'Layout.tsx 生成完成', type: 'success', file: 'Layout.tsx' },
            { time: 20000, message: '开始生成样式文件...', type: 'info' },
            { time: 22000, message: 'layout.css 生成完成', type: 'success', file: 'layout.css' },
            { time: 24000, message: '正在运行代码检查...', type: 'info' },
            { time: 26000, message: '代码检查通过', type: 'success' },
            { time: 28000, message: '正在生成测试文件...', type: 'info' },
            { time: 30000, message: '所有文件生成完成！', type: 'success' }
        ];

        agentTasks.forEach(task => {
            setTimeout(() => {
                this.addEditorLog(`[${new Date().toLocaleTimeString()}] ${task.message}`, task.type);

                if (task.file) {
                    this.updateFileChangeStatus(task.file, 'completed');
                }

                // 更新进度
                const progress = Math.min(100, (agentTasks.indexOf(task) + 1) / agentTasks.length * 100);
                this.updateAgentProgress(progress);

            }, task.time);
        });
    }

    updateFileChangeStatus(fileName, status) {
        const fileChanges = document.getElementById('file-changes');
        if (!fileChanges) return;

        // 查找现有的文件状态项
        const existingItem = Array.from(fileChanges.children).find(item =>
            item.textContent.includes(fileName)
        );

        if (existingItem) {
            const statusSpan = existingItem.querySelector('span:last-child');
            if (statusSpan) {
                statusSpan.textContent = status === 'completed' ? '已完成' : '生成中...';
                statusSpan.className = status === 'completed' ? 'text-success' : 'text-warning';
            }
        } else {
            // 添加新的文件状态项
            const newItem = document.createElement('div');
            newItem.className = 'flex items-center justify-between text-xs p-2 bg-muted rounded';
            newItem.innerHTML = `
                <span>${fileName}</span>
                <span class="${status === 'completed' ? 'text-success' : 'text-warning'}">
                    ${status === 'completed' ? '已完成' : '生成中...'}
                </span>
            `;
            fileChanges.appendChild(newItem);
        }
    }

    updateAgentProgress(progress) {
        // 更新右侧监控面板的进度
        const progressElements = document.querySelectorAll('#cloud-editor-modal [data-progress]');
        progressElements.forEach(element => {
            element.textContent = `${Math.round(progress)}%`;
        });

        // 更新开发中任务的进度
        const developingProgressBar = document.querySelector('[data-dev-task-content="developing"] .bg-primary');
        if (developingProgressBar) {
            developingProgressBar.style.width = `${progress}%`;
        }

        const developingProgressText = document.querySelector('[data-dev-task-content="developing"] .font-medium');
        if (developingProgressText && developingProgressText.textContent.includes('%')) {
            developingProgressText.textContent = `${Math.round(progress)}%`;
        }
    }

    addEditorLog(message, type = 'info') {
        const editorLogs = document.getElementById('editor-logs');
        if (editorLogs) {
            const logEntry = document.createElement('div');
            logEntry.className = `text-${type}`;
            logEntry.textContent = message;

            editorLogs.appendChild(logEntry);
            editorLogs.scrollTop = editorLogs.scrollHeight;
        }
    }

    closeCloudEditor() {
        const modal = document.getElementById('cloud-editor-modal');
        if (modal) {
            modal.classList.add('hidden');

            // 清理Monaco Editor实例
            if (this.monacoEditor) {
                this.monacoEditor.dispose();
                this.monacoEditor = null;
            }
        }
    }

    saveAllFiles() {
        console.log('保存所有文件');
        this.showNotification('所有文件已保存', 'success');
        this.addEditorLog(`[${new Date().toLocaleTimeString()}] 所有文件已保存`, 'success');
    }

    toggleFullscreen() {
        const modal = document.getElementById('cloud-editor-modal');
        if (modal) {
            if (modal.classList.contains('fullscreen')) {
                modal.classList.remove('fullscreen');
                modal.style.position = 'fixed';
                modal.style.inset = '0';
            } else {
                modal.classList.add('fullscreen');
                modal.style.position = 'fixed';
                modal.style.inset = '0';
                modal.style.zIndex = '9999';
            }
        }
    }

    pauseAgent() {
        console.log('暂停Agent');
        this.showNotification('Agent已暂停', 'warning');
        this.addEditorLog(`[${new Date().toLocaleTimeString()}] Agent已暂停`, 'warning');
    }

    restartAgent() {
        console.log('重启Agent');
        this.showNotification('Agent已重启', 'info');
        this.addEditorLog(`[${new Date().toLocaleTimeString()}] Agent已重启`, 'info');
    }

    stopAgent() {
        if (confirm('确定要停止Agent吗？这将终止当前的代码生成过程。')) {
            console.log('停止Agent');
            this.showNotification('Agent已停止', 'destructive');
            this.addEditorLog(`[${new Date().toLocaleTimeString()}] Agent已停止`, 'destructive');
        }
    }

    switchToTab(fileName) {
        console.log(`切换到标签页: ${fileName}`);
        // 这里可以实现标签页切换逻辑
    }

    closeEditorTab(fileName) {
        console.log(`关闭标签页: ${fileName}`);
        // 这里可以实现关闭标签页逻辑
    }

    initTaskStateManagement() {
        // 初始化任务状态数据
        this.taskStates = {
            pending: [],
            developing: [],
            completed: []
        };

        // 任务状态转换映射
        this.stateTransitions = {
            'pending': 'developing',
            'developing': 'completed',
            'completed': null
        };
    }

    // 重写submitDevelopment方法，实现完整的任务创建流程
    submitDevelopment() {
        const selectedRequirements = this.getSelectedRequirements();
        const agentConfig = this.currentAgentConfig;
        const promptContent = document.getElementById('prompt-editor').value;

        if (selectedRequirements.length === 0) {
            this.showNotification('请先选择需求', 'warning');
            return;
        }

        if (!agentConfig.agent || !agentConfig.model) {
            this.showNotification('请先配置Agent和模型', 'warning');
            return;
        }

        if (!promptContent.trim()) {
            this.showNotification('请输入开发Prompt', 'warning');
            return;
        }

        // 创建新的开发任务
        const newTask = this.createDevelopmentTask(selectedRequirements, agentConfig, promptContent);

        // 添加到待开发队列
        this.addTaskToPendingQueue(newTask);

        // 关闭编排弹窗
        this.closeOrchestrationModal();

        // 切换到开发任务标签页
        this.switchToTab('development-tasks');

        this.showNotification(`开发任务已创建: ${newTask.name}`, 'success');
    }

    createDevelopmentTask(requirements, agentConfig, prompt) {
        const taskId = 'task-' + Date.now();
        const estimatedTime = requirements.length * 8; // 每个需求预估8分钟
        const estimatedCost = requirements.length * 1.5; // 每个需求预估$1.5

        return {
            id: taskId,
            name: this.generateTaskName(requirements),
            requirements: requirements,
            agent: agentConfig.agent,
            model: agentConfig.model,
            prompt: prompt,
            status: 'pending',
            estimatedTime: estimatedTime,
            estimatedCost: estimatedCost,
            createdAt: new Date(),
            progress: 0,
            actualTime: 0,
            actualCost: 0,
            generatedFiles: [],
            logs: []
        };
    }

    generateTaskName(requirements) {
        if (requirements.length === 1) {
            return requirements[0].name;
        } else if (requirements.length <= 3) {
            return requirements.map(req => req.name).join('、');
        } else {
            return `${requirements[0].name}等${requirements.length}个需求`;
        }
    }

    getSelectedRequirements() {
        const checkboxes = document.querySelectorAll('.requirement-checkbox:checked');
        return Array.from(checkboxes).map(checkbox => ({
            id: checkbox.getAttribute('data-requirement-id'),
            name: checkbox.getAttribute('data-requirement-name'),
            workload: checkbox.getAttribute('data-workload')
        }));
    }

    addTaskToPendingQueue(task) {
        // 添加到内存中的任务列表
        this.taskStates.pending.push(task);

        // 更新DOM显示
        this.renderPendingTasks();
    }

    renderPendingTasks() {
        const queueContainer = document.getElementById('pending-tasks-queue');
        if (!queueContainer) return;

        // 清空现有内容
        queueContainer.innerHTML = '';

        // 渲染所有待开发任务
        this.taskStates.pending.forEach(task => {
            const taskElement = this.createTaskElement(task);
            queueContainer.appendChild(taskElement);
        });

        // 重新初始化拖拽功能
        this.initDragAndDrop();
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'border border-border rounded-lg p-4 hover:bg-accent cursor-move';
        taskDiv.setAttribute('data-task-id', task.id);
        taskDiv.setAttribute('draggable', 'true');

        taskDiv.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <span class="text-lg cursor-move">⋮⋮</span>
                    <h3 class="font-medium text-base">${task.name}</h3>
                    <span class="px-2 py-1 bg-warning text-warning-foreground text-xs rounded">队列中</span>
                </div>
                <div class="text-xs text-muted-foreground">
                    提交时间: ${task.createdAt.toLocaleString()}
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                    <span class="text-xs text-muted-foreground">Agent配置:</span>
                    <div class="text-sm">${this.getAgentDisplayName(task.agent)} + ${this.getModelDisplayName(task.model)}</div>
                </div>
                <div>
                    <span class="text-xs text-muted-foreground">预估成本:</span>
                    <div class="text-sm">$${task.estimatedCost.toFixed(2)}</div>
                </div>
                <div>
                    <span class="text-xs text-muted-foreground">预估时间:</span>
                    <div class="text-sm">${task.estimatedTime}分钟</div>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-gray-800" onclick="startTask('${task.id}')">
                    开始执行
                </button>
                <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" onclick="editTask('${task.id}')">
                    编辑
                </button>
                <button class="px-3 py-1.5 border border-border rounded text-sm hover:bg-accent" onclick="viewTaskDetails('${task.id}')">
                    详情
                </button>
                <button class="px-3 py-1.5 border border-destructive text-destructive rounded text-sm hover:bg-destructive hover:text-destructive-foreground" onclick="deleteTask('${task.id}')">
                    删除
                </button>
            </div>
        `;

        return taskDiv;
    }

    getAgentDisplayName(agentId) {
        const agentNames = {
            'claude-code': 'Claude Code',
            'github-copilot': 'GitHub Copilot',
            'cursor-ai': 'Cursor AI',
            'augment-code': 'Augment Code',
            'custom-agent': '自定义 Agent'
        };
        return agentNames[agentId] || agentId;
    }

    getModelDisplayName(modelId) {
        const modelNames = {
            'gpt-4': 'GPT-4',
            'gpt-3.5-turbo': 'GPT-3.5 Turbo',
            'claude-3-opus': 'Claude 3 Opus',
            'claude-3-sonnet': 'Claude 3 Sonnet',
            'gemini-pro': 'Gemini Pro',
            'codellama': 'Code Llama'
        };
        return modelNames[modelId] || modelId;
    }

    selectAllRequirements() {
        const checkboxes = document.querySelectorAll('.requirement-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        this.updateSelectedCount();
        this.showNotification('已选择所有需求', 'info');
    }

    clearAllRequirements() {
        const checkboxes = document.querySelectorAll('.requirement-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        this.updateSelectedCount();
        this.showNotification('已清空选择', 'info');
    }

    startDevelopment() {
        if (this.selectedRequirements.size === 0) {
            this.showNotification('请先选择需要开发的需求', 'warning');
            return;
        }

        this.openOrchestrationModal();
    }

    openOrchestrationModal() {
        const modal = document.getElementById('development-orchestration-modal');

        // 填充选中的需求列表
        this.populateSelectedRequirements();

        // 生成初始prompt
        this.generateInitialPrompt();

        // 显示弹窗
        modal.classList.remove('hidden');
    }

    populateSelectedRequirements() {
        const container = document.getElementById('selected-requirements-list');
        container.innerHTML = '';

        let totalWorkload = 0;

        this.selectedRequirements.forEach(req => {
            const workloadDays = parseInt(req.workload.replace('天', '')) || 0;
            totalWorkload += workloadDays;

            const reqHtml = `
                <div class="p-3 border border-border rounded">
                    <div class="font-medium text-sm">${req.name}</div>
                    <div class="text-xs text-muted-foreground mt-1">预估: ${req.workload}</div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', reqHtml);
        });

        // 更新统计信息
        document.getElementById('total-selected-count').textContent = this.selectedRequirements.size;
        document.getElementById('total-estimated-workload').textContent = `${totalWorkload}天`;
        document.getElementById('ready-requirements-count').textContent = this.selectedRequirements.size;
    }

    generateInitialPrompt() {
        const requirements = Array.from(this.selectedRequirements);
        const summary = `开发${requirements.length}个功能需求：${requirements.map(r => r.name).join('、')}`;
        const details = requirements.map((req, index) =>
            `${index + 1}. ${req.name} (预估工时: ${req.workload})`
        ).join('\n');

        const template = this.promptTemplates['default'];
        const prompt = template
            .replace('{requirements_summary}', summary)
            .replace('{requirements_details}', details);

        document.getElementById('prompt-editor').value = prompt;
    }

    loadPromptTemplate() {
        const templateSelect = document.getElementById('prompt-template-select');
        const selectedTemplate = templateSelect.value;

        if (!this.promptTemplates[selectedTemplate]) {
            this.showNotification('模板不存在', 'error');
            return;
        }

        const requirements = Array.from(this.selectedRequirements);
        const summary = `开发${requirements.length}个功能需求：${requirements.map(r => r.name).join('、')}`;
        const details = requirements.map((req, index) =>
            `${index + 1}. ${req.name} (预估工时: ${req.workload})`
        ).join('\n');

        const template = this.promptTemplates[selectedTemplate];
        const prompt = template
            .replace('{requirements_summary}', summary)
            .replace('{requirements_details}', details);

        document.getElementById('prompt-editor').value = prompt;
        this.showNotification(`已加载${templateSelect.options[templateSelect.selectedIndex].text}`, 'success');
    }

    optimizePrompt() {
        const promptEditor = document.getElementById('prompt-editor');
        const currentPrompt = promptEditor.value.trim();

        if (!currentPrompt) {
            this.showNotification('请先输入Prompt内容', 'warning');
            return;
        }

        this.showLoadingModal('AI正在优化Prompt，请稍候...');

        // 模拟AI优化过程
        setTimeout(() => {
            this.hideLoadingModal();

            // 显示优化建议
            const suggestions = [
                '建议添加更具体的技术栈要求',
                '建议明确代码质量标准',
                '建议增加错误处理要求',
                '建议添加性能优化指标',
                '建议完善测试覆盖要求'
            ];

            this.showOptimizationSuggestions(suggestions);

            // 生成优化后的prompt
            const optimizedPrompt = this.generateOptimizedPrompt(currentPrompt);
            promptEditor.value = optimizedPrompt;

            this.showNotification('Prompt优化完成！', 'success');
        }, 3000);
    }

    generateOptimizedPrompt(originalPrompt) {
        // 这里可以实现更复杂的优化逻辑
        const optimizations = [
            '\n## 代码质量要求\n- 代码覆盖率不低于80%\n- 遵循SOLID原则\n- 使用设计模式优化代码结构',
            '\n## 性能指标\n- 页面加载时间不超过2秒\n- API响应时间不超过500ms\n- 内存使用优化',
            '\n## 安全要求\n- 输入验证和过滤\n- SQL注入防护\n- XSS攻击防护'
        ];

        return originalPrompt + optimizations.join('');
    }

    showOptimizationSuggestions(suggestions) {
        const container = document.getElementById('suggestions-list');
        const section = document.getElementById('optimization-suggestions');

        container.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionHtml = `
                <div class="flex items-start space-x-2 p-2 bg-card border border-border rounded">
                    <span class="text-primary">💡</span>
                    <span class="text-sm">${suggestion}</span>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', suggestionHtml);
        });

        section.classList.remove('hidden');
    }

    scorePrompt() {
        const promptEditor = document.getElementById('prompt-editor');
        const currentPrompt = promptEditor.value.trim();

        if (!currentPrompt) {
            this.showNotification('请先输入Prompt内容', 'warning');
            return;
        }

        this.showLoadingModal('AI正在分析Prompt质量...');

        // 模拟AI打分过程
        setTimeout(() => {
            this.hideLoadingModal();

            // 生成评分结果
            const scores = this.calculatePromptScores(currentPrompt);
            this.displayPromptScores(scores);

            this.showNotification('Prompt评分完成！', 'success');
        }, 2500);
    }

    calculatePromptScores(prompt) {
        // 模拟评分算法
        const length = prompt.length;
        const hasRequirements = prompt.includes('需求') || prompt.includes('要求');
        const hasTechnical = prompt.includes('技术') || prompt.includes('开发');
        const hasStandards = prompt.includes('标准') || prompt.includes('规范');
        const hasDetails = prompt.includes('具体') || prompt.includes('详细');

        const clarity = Math.min(95, 60 + (hasRequirements ? 15 : 0) + (hasDetails ? 20 : 0));
        const completeness = Math.min(95, 50 + (hasTechnical ? 20 : 0) + (hasStandards ? 25 : 0));
        const specificity = Math.min(95, 40 + Math.min(30, length / 50) + (hasDetails ? 25 : 0));
        const overall = Math.round((clarity + completeness + specificity) / 3);

        return { overall, clarity, completeness, specificity };
    }

    displayPromptScores(scores) {
        document.getElementById('overall-score').textContent = scores.overall;
        document.getElementById('clarity-score').textContent = scores.clarity;
        document.getElementById('completeness-score').textContent = scores.completeness;
        document.getElementById('specificity-score').textContent = scores.specificity;

        // 生成反馈
        const feedback = [];
        if (scores.clarity < 80) feedback.push('建议增加需求描述的清晰度');
        if (scores.completeness < 80) feedback.push('建议补充技术要求和标准');
        if (scores.specificity < 80) feedback.push('建议添加更具体的实现细节');
        if (scores.overall >= 90) feedback.push('✅ Prompt质量优秀，可以直接使用');

        const feedbackContainer = document.getElementById('score-feedback');
        feedbackContainer.innerHTML = '';
        feedback.forEach(item => {
            const feedbackHtml = `
                <div class="text-sm ${item.startsWith('✅') ? 'text-success' : 'text-muted-foreground'}">
                    ${item}
                </div>
            `;
            feedbackContainer.insertAdjacentHTML('beforeend', feedbackHtml);
        });

        document.getElementById('prompt-score-section').classList.remove('hidden');
    }

    closeOrchestrationModal() {
        const modal = document.getElementById('development-orchestration-modal');
        modal.classList.add('hidden');

        // 清理状态
        document.getElementById('optimization-suggestions').classList.add('hidden');
        document.getElementById('prompt-score-section').classList.add('hidden');
    }

    submitDevelopment() {
        const prompt = document.getElementById('prompt-editor').value.trim();
        const selectedAgent = document.getElementById('agent-select').value;
        const selectedModel = document.getElementById('model-select').value;

        // 验证必填项
        if (!prompt) {
            this.showNotification('请输入开发Prompt', 'warning');
            return;
        }

        if (!selectedAgent) {
            this.showNotification('请选择AI Agent', 'warning');
            return;
        }

        if (!selectedModel) {
            this.showNotification('请选择模型', 'warning');
            return;
        }

        if (this.selectedRequirements.size === 0) {
            this.showNotification('没有选中的需求', 'error');
            return;
        }

        // 获取成本和时间估算
        const estimatedCost = document.getElementById('estimated-cost').textContent;
        const estimatedTime = document.getElementById('estimated-time').textContent;

        this.showLoadingModal('正在提交开发任务...');

        // 模拟提交过程
        setTimeout(() => {
            this.hideLoadingModal();
            this.closeOrchestrationModal();

            // 清空选择
            this.clearAllRequirements();

            const agentName = this.agentModels.agents[selectedAgent].name;
            const modelName = this.agentModels.models[selectedModel].name;

            this.showNotification(`成功提交${this.selectedRequirements.size}个需求的开发任务！使用${agentName} + ${modelName}`, 'success');

            // 这里可以添加实际的提交逻辑
            console.log('提交开发任务:', {
                requirements: Array.from(this.selectedRequirements),
                prompt: prompt,
                agent: selectedAgent,
                model: selectedModel,
                estimatedCost: estimatedCost,
                estimatedTime: estimatedTime,
                timestamp: new Date().toISOString()
            });
        }, 2000);
    }











    // 项目筛选功能
    initProjectFiltering() {
        // 初始化项目数据
        this.projects = {
            'ai-platform': { name: 'AI开发平台', color: 'bg-purple-100 text-purple-800', icon: '🤖' },
            'payment-system': { name: '支付系统', color: 'bg-green-100 text-green-800', icon: '💳' },
            'mobile-app': { name: '移动应用', color: 'bg-blue-100 text-blue-800', icon: '📱' },
            'data-analytics': { name: '数据分析平台', color: 'bg-purple-100 text-purple-800', icon: '📊' }
        };
    }

    filterRequirementsByProject() {
        const selectedProject = document.getElementById('project-filter').value;
        const requirementElements = document.querySelectorAll('[data-tab-content="dev-tasks"] .border.border-border.rounded-lg, [data-tab-content="dev-tasks"] .border.border-destructive.rounded-lg');

        requirementElements.forEach(element => {
            if (!selectedProject) {
                element.style.display = 'block';
            } else {
                const projectBadge = element.querySelector('.px-2.py-1');
                const projectText = projectBadge ? projectBadge.textContent.trim() : '';
                const projectMatch = this.getProjectKeyByName(projectText);

                if (projectMatch === selectedProject) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            }
        });

        this.showNotification(selectedProject ? `已筛选${this.projects[selectedProject].name}的需求` : '显示所有项目需求', 'info');
    }

    getProjectKeyByName(displayName) {
        for (const [key, project] of Object.entries(this.projects)) {
            if (displayName.includes(project.name) || displayName.includes(project.icon)) {
                return key;
            }
        }
        return null;
    }

    // 项目问题管理功能
    bindProjectIssuesFeatures() {
        // 绑定问题管理相关事件
        this.initIssueManagement();
    }

    initIssueManagement() {
        // 初始化问题数据
        this.issues = [
            {
                id: 'issue-001',
                title: '支付接口调用失败',
                project: 'payment-system',
                priority: 'high',
                status: 'in-progress',
                assignee: '张开发',
                createdAt: '2024-01-21 09:30',
                description: '微信支付接口在生产环境中出现间歇性调用失败，错误代码：SYSTEMERROR',
                relatedTask: '支付模块开发任务 > 微信支付集成'
            },
            {
                id: 'issue-002',
                title: '移动端布局兼容性问题',
                project: 'mobile-app',
                priority: 'medium',
                status: 'open',
                assignee: '李前端',
                createdAt: '2024-01-20 16:45',
                description: '在iOS Safari浏览器中，部分页面元素显示异常，需要优化CSS兼容性',
                relatedTask: '前端模块开发任务 > 响应式布局优化'
            },
            {
                id: 'issue-003',
                title: '数据库连接超时',
                project: 'data-analytics',
                priority: 'low',
                status: 'resolved',
                assignee: '王后端',
                createdAt: '2024-01-19 14:20',
                description: '优化数据库连接池配置，解决了连接超时问题',
                solution: '调整连接池最大连接数从20增加到50，设置连接超时时间为30秒'
            }
        ];
    }

    filterIssuesByProject() {
        const selectedProject = document.getElementById('issue-project-filter').value;
        const issueElements = document.querySelectorAll('[data-tab-content="project-issues"] .border.border-border.rounded-lg, [data-tab-content="project-issues"] .border.border-destructive.rounded-lg');

        issueElements.forEach(element => {
            if (!selectedProject) {
                element.style.display = 'block';
            } else {
                const projectBadge = element.querySelector('.px-2.py-1');
                const projectText = projectBadge ? projectBadge.textContent.trim() : '';
                const projectMatch = this.getProjectKeyByName(projectText);

                if (projectMatch === selectedProject) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            }
        });

        this.showNotification(selectedProject ? `已筛选${this.projects[selectedProject].name}的问题` : '显示所有项目问题', 'info');
    }

    createNewRequirement() {
        // 创建新需求的模态框
        const modal = this.createRequirementModal();
        document.body.appendChild(modal);
        modal.classList.remove('hidden');
    }

    createRequirementModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-card border border-border rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold">新建项目需求</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-muted-foreground hover:text-foreground">✕</button>
                </div>

                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">需求标题</label>
                        <input type="text" class="w-full px-3 py-2 border border-border rounded-md" placeholder="请输入需求标题">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">所属项目</label>
                            <select class="w-full px-3 py-2 border border-border rounded-md">
                                <option value="">选择项目</option>
                                <option value="ai-platform">AI开发平台</option>
                                <option value="payment-system">支付系统</option>
                                <option value="mobile-app">移动应用</option>
                                <option value="data-analytics">数据分析平台</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">优先级</label>
                            <select class="w-full px-3 py-2 border border-border rounded-md">
                                <option value="low">🟢 低优先级</option>
                                <option value="medium">🟡 中优先级</option>
                                <option value="high">🔴 高优先级</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">预估工时</label>
                            <input type="text" class="w-full px-3 py-2 border border-border rounded-md" placeholder="如：3天">
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">负责人</label>
                            <select class="w-full px-3 py-2 border border-border rounded-md">
                                <option value="">选择负责人</option>
                                <option value="zhang">张开发</option>
                                <option value="li">李前端</option>
                                <option value="wang">王后端</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">需求描述</label>
                        <textarea class="w-full px-3 py-2 border border-border rounded-md h-24" placeholder="请详细描述需求内容和验收标准..."></textarea>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-2 border border-border rounded-md hover:bg-accent">取消</button>
                        <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-gray-800">创建需求</button>
                    </div>
                </form>
            </div>
        `;

        return modal;
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
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.developmentManagement = new DevelopmentManagement();
});

// 全局函数，供HTML调用
function filterRequirementsByProject() {
    if (window.developmentManagement) {
        window.developmentManagement.filterRequirementsByProject();
    }
}

function createNewRequirement() {
    if (window.developmentManagement) {
        window.developmentManagement.createNewRequirement();
    }
}

function updateSelectedCount() {
    if (window.developmentManagement) {
        window.developmentManagement.updateSelectedCount();
    }
}

function selectAllRequirements() {
    if (window.developmentManagement) {
        window.developmentManagement.selectAllRequirements();
    }
}

function clearAllRequirements() {
    if (window.developmentManagement) {
        window.developmentManagement.clearAllRequirements();
    }
}

function startDevelopment() {
    if (window.developmentManagement) {
        window.developmentManagement.startDevelopment();
    }
}
