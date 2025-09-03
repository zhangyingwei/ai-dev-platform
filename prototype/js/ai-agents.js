/**
 * AI Agent 管理系统
 * 负责处理 AI Agent 的配置、状态管理和数据持久化
 */

class AIAgentManager {
    constructor() {
        this.agents = this.initializeAgents();
        this.currentAgent = null;
        this.init();
    }

    /**
     * 初始化预设的 AI Agent 配置
     */
    initializeAgents() {
        const defaultAgents = {
            'augment-code': {
                id: 'augment-code',
                name: 'Augment Code',
                description: '智能代码助手，提供代码生成和优化建议',
                icon: '🚀',
                iconBg: 'from-primary to-gray-800',
                enabled: true,
                apiKey: '',
                customParams: {
                    temperature: 0.7,
                    max_tokens: 1000
                },
                lastUpdated: Date.now()
            },
            'claude-code': {
                id: 'claude-code',
                name: 'Claude Code',
                description: 'Anthropic Claude 代码分析和重构工具',
                icon: '🤖',
                iconBg: 'from-orange-500 to-red-600',
                enabled: false,
                apiKey: '',
                customParams: {
                    model: 'claude-3-sonnet',
                    temperature: 0.5
                },
                lastUpdated: Date.now()
            },
            'gemini-cli': {
                id: 'gemini-cli',
                name: 'Gemini CLI',
                description: 'Google Gemini 命令行集成工具',
                icon: '💎',
                iconBg: 'from-blue-500 to-purple-600',
                enabled: false,
                apiKey: '',
                customParams: {
                    model: 'gemini-pro',
                    safety_settings: 'default'
                },
                lastUpdated: Date.now()
            },
            'cursor': {
                id: 'cursor',
                name: 'Cursor',
                description: 'AI 驱动的代码编辑器集成',
                icon: '⚡',
                iconBg: 'from-yellow-500 to-orange-600',
                enabled: false,
                apiKey: '',
                customParams: {
                    auto_complete: true,
                    suggestions: 'enhanced'
                },
                lastUpdated: Date.now()
            },
            'codex': {
                id: 'codex',
                name: 'Codex',
                description: 'OpenAI Codex 代码生成引擎',
                icon: '🧠',
                iconBg: 'from-green-500 to-teal-600',
                enabled: false,
                apiKey: '',
                customParams: {
                    engine: 'code-davinci-002',
                    temperature: 0.1
                },
                lastUpdated: Date.now()
            },
            'github-copilot': {
                id: 'github-copilot',
                name: 'GitHub Copilot',
                description: 'GitHub 官方 AI 编程助手',
                icon: '🐙',
                iconBg: 'from-gray-700 to-black',
                enabled: false,
                apiKey: '',
                customParams: {
                    suggestions: 'auto',
                    language_support: 'all'
                },
                lastUpdated: Date.now()
            }
        };

        // 从 localStorage 加载已保存的配置
        const savedConfig = this.loadConfig();
        
        // 合并默认配置和已保存的配置
        Object.keys(defaultAgents).forEach(agentId => {
            if (savedConfig[agentId]) {
                defaultAgents[agentId] = { ...defaultAgents[agentId], ...savedConfig[agentId] };
            }
        });

        return defaultAgents;
    }

    /**
     * 初始化事件监听器
     */
    init() {
        this.bindEvents();
        this.updateAgentCards();
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 配置按钮点击事件
        document.querySelectorAll('.config-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const agentCard = e.target.closest('.agent-card');
                const agentId = agentCard.dataset.agentId;
                this.openConfigModal(agentId);
            });
        });

        // 模态弹窗关闭事件
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeConfigModal();
        });

        document.getElementById('cancel-config').addEventListener('click', () => {
            this.closeConfigModal();
        });

        // 点击模态背景关闭
        document.getElementById('config-modal').addEventListener('click', (e) => {
            if (e.target.id === 'config-modal') {
                this.closeConfigModal();
            }
        });

        // 密码显示/隐藏切换
        document.getElementById('toggle-password').addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // 配置表单提交
        document.getElementById('agent-config-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAgentConfig();
        });

        // 重置配置
        document.getElementById('reset-config').addEventListener('click', () => {
            this.resetAgentConfig();
        });

        // 连接测试
        document.getElementById('test-connection').addEventListener('click', () => {
            this.testConnection();
        });

        // 导入/导出功能
        document.getElementById('import-config').addEventListener('click', () => {
            this.importConfig();
        });

        document.getElementById('export-config').addEventListener('click', () => {
            this.exportConfig();
        });

        document.getElementById('import-file-input').addEventListener('change', (e) => {
            this.handleImportFile(e);
        });
    }

    /**
     * 更新 Agent 卡片显示状态
     */
    updateAgentCards() {
        Object.values(this.agents).forEach(agent => {
            const card = document.querySelector(`[data-agent-id="${agent.id}"]`);
            if (card) {
                const statusIndicator = card.querySelector('.status-indicator span');
                
                if (agent.enabled && agent.apiKey) {
                    statusIndicator.className = 'px-2 py-1 bg-success text-success-foreground text-xs rounded-full font-medium';
                    statusIndicator.textContent = '已启用';
                } else if (!agent.enabled) {
                    statusIndicator.className = 'px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded-full font-medium';
                    statusIndicator.textContent = '已禁用';
                } else {
                    statusIndicator.className = 'px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium';
                    statusIndicator.textContent = '未配置';
                }
            }
        });
    }

    /**
     * 打开配置模态弹窗
     */
    openConfigModal(agentId) {
        this.currentAgent = this.agents[agentId];
        if (!this.currentAgent) return;

        // 更新模态弹窗内容
        document.getElementById('modal-agent-icon').innerHTML = `<span class="text-2xl">${this.currentAgent.icon}</span>`;
        document.getElementById('modal-agent-name').textContent = `${this.currentAgent.name} 配置`;
        
        // 填充表单数据
        document.getElementById('agent-enabled').checked = this.currentAgent.enabled;
        document.getElementById('api-key').value = this.currentAgent.apiKey || '';
        document.getElementById('custom-params').value = JSON.stringify(this.currentAgent.customParams, null, 2);

        // 显示模态弹窗
        document.getElementById('config-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    /**
     * 关闭配置模态弹窗
     */
    closeConfigModal() {
        document.getElementById('config-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentAgent = null;
        this.clearTestResult();
    }

    /**
     * 切换密码显示/隐藏
     */
    togglePasswordVisibility() {
        const input = document.getElementById('api-key');
        const button = document.getElementById('toggle-password');
        
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = `
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                </svg>
            `;
        } else {
            input.type = 'password';
            button.innerHTML = `
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
            `;
        }
    }

    /**
     * 保存 Agent 配置
     */
    saveAgentConfig() {
        if (!this.currentAgent) return;

        try {
            // 获取表单数据
            const enabled = document.getElementById('agent-enabled').checked;
            const apiKey = document.getElementById('api-key').value.trim();
            const customParamsText = document.getElementById('custom-params').value.trim();

            // 验证 JSON 格式
            let customParams = {};
            if (customParamsText) {
                try {
                    customParams = JSON.parse(customParamsText);
                } catch (e) {
                    this.showToast('自定义参数格式错误，请检查 JSON 语法', 'error');
                    return;
                }
            }

            // 更新配置
            this.currentAgent.enabled = enabled;
            this.currentAgent.apiKey = apiKey;
            this.currentAgent.customParams = customParams;
            this.currentAgent.lastUpdated = Date.now();

            // 保存到 localStorage
            this.saveConfig();

            // 更新界面
            this.updateAgentCards();

            // 显示成功提示
            this.showToast('配置已保存', 'success');

            // 关闭模态弹窗
            this.closeConfigModal();

        } catch (error) {
            console.error('保存配置失败:', error);
            this.showToast('保存配置失败，请重试', 'error');
        }
    }

    /**
     * 重置 Agent 配置
     */
    resetAgentConfig() {
        if (!this.currentAgent) return;

        // 重置为默认值
        document.getElementById('agent-enabled').checked = false;
        document.getElementById('api-key').value = '';
        document.getElementById('custom-params').value = JSON.stringify(this.currentAgent.customParams, null, 2);
        
        this.clearTestResult();
        this.showToast('配置已重置', 'info');
    }

    /**
     * 测试连接
     */
    async testConnection() {
        if (!this.currentAgent) return;

        const apiKey = document.getElementById('api-key').value.trim();
        if (!apiKey) {
            this.showToast('请先输入 API 密钥', 'warning');
            return;
        }

        const testBtn = document.getElementById('test-connection');
        const testText = testBtn.querySelector('.test-text');
        const loadingDots = testBtn.querySelector('.loading-dots');
        const resultDiv = document.getElementById('test-result');

        // 显示加载状态
        testText.textContent = '测试中';
        loadingDots.classList.remove('hidden');
        testBtn.disabled = true;

        try {
            // 模拟 API 连接测试
            await this.simulateApiTest(apiKey);
            
            // 显示成功结果
            resultDiv.className = 'mt-2 text-sm text-success';
            resultDiv.textContent = '✓ 连接测试成功';
            resultDiv.classList.remove('hidden');

        } catch (error) {
            // 显示错误结果
            resultDiv.className = 'mt-2 text-sm text-destructive';
            resultDiv.textContent = `✗ 连接测试失败: ${error.message}`;
            resultDiv.classList.remove('hidden');
        } finally {
            // 恢复按钮状态
            testText.textContent = '测试连接';
            loadingDots.classList.add('hidden');
            testBtn.disabled = false;
        }
    }

    /**
     * 模拟 API 测试
     */
    async simulateApiTest(apiKey) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 简单的 API 密钥格式验证
                if (apiKey.length < 10) {
                    reject(new Error('API 密钥格式不正确'));
                } else if (apiKey.startsWith('invalid')) {
                    reject(new Error('API 密钥无效'));
                } else {
                    resolve();
                }
            }, 2000);
        });
    }

    /**
     * 清除测试结果
     */
    clearTestResult() {
        const resultDiv = document.getElementById('test-result');
        resultDiv.classList.add('hidden');
        resultDiv.textContent = '';
    }

    /**
     * 导出配置
     */
    exportConfig() {
        try {
            const config = {
                version: '1.0.0',
                exportTime: new Date().toISOString(),
                agents: this.agents
            };

            const dataStr = JSON.stringify(config, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `ai-agents-config-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
            link.click();

            this.showToast('配置已导出', 'success');

        } catch (error) {
            console.error('导出配置失败:', error);
            this.showToast('导出配置失败', 'error');
        }
    }

    /**
     * 导入配置
     */
    importConfig() {
        document.getElementById('import-file-input').click();
    }

    /**
     * 处理导入文件
     */
    handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);
                
                // 验证配置格式
                if (!config.agents || typeof config.agents !== 'object') {
                    throw new Error('配置文件格式不正确');
                }

                // 合并配置
                Object.keys(config.agents).forEach(agentId => {
                    if (this.agents[agentId]) {
                        this.agents[agentId] = { ...this.agents[agentId], ...config.agents[agentId] };
                        this.agents[agentId].lastUpdated = Date.now();
                    }
                });

                // 保存并更新界面
                this.saveConfig();
                this.updateAgentCards();
                
                this.showToast('配置导入成功', 'success');

            } catch (error) {
                console.error('导入配置失败:', error);
                this.showToast('导入配置失败：' + error.message, 'error');
            }
        };

        reader.readAsText(file);
        // 清空文件输入，允许重复选择同一文件
        event.target.value = '';
    }

    /**
     * 保存配置到 localStorage
     */
    saveConfig() {
        try {
            // 过滤敏感信息进行加密存储
            const configToSave = {};
            Object.keys(this.agents).forEach(agentId => {
                const agent = this.agents[agentId];
                configToSave[agentId] = {
                    ...agent,
                    apiKey: agent.apiKey ? this.encryptApiKey(agent.apiKey) : ''
                };
            });

            localStorage.setItem('ai-agents-config', JSON.stringify(configToSave));
        } catch (error) {
            console.error('保存配置失败:', error);
            this.showToast('保存配置失败', 'error');
        }
    }

    /**
     * 从 localStorage 加载配置
     */
    loadConfig() {
        try {
            const saved = localStorage.getItem('ai-agents-config');
            if (!saved) return {};

            const config = JSON.parse(saved);
            
            // 解密 API 密钥
            Object.keys(config).forEach(agentId => {
                if (config[agentId].apiKey) {
                    config[agentId].apiKey = this.decryptApiKey(config[agentId].apiKey);
                }
            });

            return config;
        } catch (error) {
            console.error('加载配置失败:', error);
            return {};
        }
    }

    /**
     * 简单的 API 密钥加密（Base64编码）
     */
    encryptApiKey(apiKey) {
        return btoa(apiKey);
    }

    /**
     * 简单的 API 密钥解密（Base64解码）
     */
    decryptApiKey(encryptedKey) {
        try {
            return atob(encryptedKey);
        } catch (error) {
            return '';
        }
    }

    /**
     * 显示 Toast 通知
     */
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        const typeStyles = {
            success: 'bg-success text-success-foreground',
            error: 'bg-destructive text-destructive-foreground',
            warning: 'bg-warning text-warning-foreground',
            info: 'bg-muted text-foreground'
        };

        toast.className = `${typeStyles[type]} px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0`;
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-sm font-medium">${message}</span>
                <button class="ml-2 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;

        container.appendChild(toast);

        // 触发动画
        setTimeout(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        }, 100);

        // 自动移除
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('translate-x-full', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
}

// 初始化 AI Agent 管理器
document.addEventListener('DOMContentLoaded', () => {
    window.aiAgentManager = new AIAgentManager();
});
