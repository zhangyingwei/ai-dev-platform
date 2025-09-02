// 需求管理页面专用JavaScript

class RequirementManagement {
    constructor() {
        this.currentTab = 'requirement-input';
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
        
        // 顶部操作按钮
        this.bindTopButtons();
        
        // 需求录入功能
        this.bindRequirementInputFeatures();
        
        // 需求审批功能
        this.bindRequirementApprovalFeatures();
        
        // AI拆解功能
        this.bindAIBreakdownFeatures();
        
        // 需求跟踪功能
        this.bindRequirementTrackingFeatures();
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
            'requirement-input': '需求录入',
            'requirement-approval': '需求审批',
            'ai-breakdown': 'AI拆解',
            'requirement-tracking': '需求跟踪'
        };
        return tabNames[tabId] || tabId;
    }

    bindTopButtons() {
        // 新建需求按钮
        const newReqBtn = document.querySelector('[data-action="new-requirement"]');
        if (newReqBtn) {
            newReqBtn.addEventListener('click', () => this.showNewRequirementModal());
        }
        
        // 需求模板按钮
        const templatesBtn = document.querySelector('[data-action="requirement-templates"]');
        if (templatesBtn) {
            templatesBtn.addEventListener('click', () => this.showRequirementTemplates());
        }
        
        // 批量操作按钮
        const batchOpsBtn = document.querySelector('[data-action="batch-operations"]');
        if (batchOpsBtn) {
            batchOpsBtn.addEventListener('click', () => this.showBatchOperations());
        }
    }

    bindRequirementInputFeatures() {
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
        
        // 需求列表项点击
        document.querySelectorAll('[data-requirement-id]').forEach(item => {
            item.addEventListener('click', () => this.viewRequirement(item));
        });
    }

    bindRequirementApprovalFeatures() {
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
        
        // 批量操作按钮
        const batchApproveBtn = document.querySelector('[data-action="batch-approve"]');
        if (batchApproveBtn) {
            batchApproveBtn.addEventListener('click', () => this.batchApprove());
        }
        
        const batchRejectBtn = document.querySelector('[data-action="batch-reject"]');
        if (batchRejectBtn) {
            batchRejectBtn.addEventListener('click', () => this.batchReject());
        }
    }

    bindAIBreakdownFeatures() {
        // AI拆解按钮
        const aiBreakdownBtn = document.querySelector('[data-action="start-ai-breakdown"]');
        if (aiBreakdownBtn) {
            aiBreakdownBtn.addEventListener('click', () => this.startAIBreakdown());
        }
        
        const confirmBreakdownBtn = document.querySelector('[data-action="confirm-breakdown"]');
        if (confirmBreakdownBtn) {
            confirmBreakdownBtn.addEventListener('click', () => this.confirmBreakdown());
        }
        
        const editBreakdownBtn = document.querySelector('[data-action="edit-breakdown"]');
        if (editBreakdownBtn) {
            editBreakdownBtn.addEventListener('click', () => this.editBreakdown());
        }
    }

    bindRequirementTrackingFeatures() {
        // 需求跟踪相关的事件绑定
        // 这里可以添加图表交互、筛选等功能
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

    // 创建模态框
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">${title}</h2>
                    <button class="text-muted-foreground hover:text-foreground" onclick="window.requirementManagement.closeModal()">✕</button>
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
        this.showLoadingModal('正在保存草稿...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('草稿保存成功', 'success');
        }, 1500);
    }

    // 提交审批
    submitForApproval() {
        const textarea = document.querySelector('textarea');
        if (!textarea || !textarea.value.trim()) {
            this.showNotification('请填写需求描述', 'error');
            return;
        }

        this.showLoadingModal('正在提交审批...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('需求已提交审批，请等待产品经理审核', 'success');
        }, 2000);
    }

    // 查看需求详情
    viewRequirement(item) {
        const requirementId = item.dataset.requirementId;
        const title = item.querySelector('p').textContent;

        const modal = this.createModal('需求详情', `
            <div class="space-y-4">
                <div>
                    <h3 class="font-medium text-sm mb-2">需求标题</h3>
                    <p class="text-sm">${title}</p>
                </div>
                <div>
                    <h3 class="font-medium text-sm mb-2">需求描述</h3>
                    <p class="text-sm text-muted-foreground">详细的需求描述内容...</p>
                </div>
                <div>
                    <h3 class="font-medium text-sm mb-2">状态历史</h3>
                    <div class="space-y-2">
                        <div class="flex items-center space-x-2 text-xs">
                            <span class="w-2 h-2 bg-success rounded-full"></span>
                            <span>2025-01-21 14:30 - 需求已创建</span>
                        </div>
                        <div class="flex items-center space-x-2 text-xs">
                            <span class="w-2 h-2 bg-warning rounded-full"></span>
                            <span>2025-01-21 15:00 - 等待审批</span>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.requirementManagement.editRequirement('${requirementId}')">编辑需求</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">关闭</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
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
                    <button class="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded" onclick="window.requirementManagement.createNewRequirement()">创建需求</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">取消</button>
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
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.requirementManagement.confirmRejectRequirement('${requirementId}')">确认拒绝</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">取消</button>
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

    // 编辑拆解结果
    editBreakdown() {
        this.showNotification('进入拆解编辑模式', 'info');
    }

    // 批量审批
    batchApprove() {
        this.showLoadingModal('正在批量审批需求...');

        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('批量审批完成，共处理 2 个需求', 'success');
        }, 2000);
    }

    // 批量拒绝
    batchReject() {
        const modal = this.createModal('批量拒绝确认', `
            <div class="space-y-4">
                <p class="text-sm">确定要批量拒绝选中的需求吗？</p>
                <textarea class="w-full h-24 px-3 py-2 border border-border rounded resize-none" placeholder="请输入拒绝原因..."></textarea>
                <div class="flex space-x-2 pt-4">
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.requirementManagement.confirmBatchReject()">确认拒绝</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">取消</button>
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

    // 显示需求模板
    showRequirementTemplates() {
        const modal = this.createModal('需求模板库', `
            <div class="space-y-4">
                <div class="grid grid-cols-1 gap-3">
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.requirementManagement.useRequirementTemplate('login')">
                        <h3 class="font-medium">登录功能模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">包含用户名/手机号登录、密码重置、记住登录状态等功能</p>
                    </div>
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.requirementManagement.useRequirementTemplate('export')">
                        <h3 class="font-medium">数据导出模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">支持Excel/CSV导出、筛选条件、分页导出等功能</p>
                    </div>
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.requirementManagement.useRequirementTemplate('search')">
                        <h3 class="font-medium">搜索功能模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">全文搜索、高级筛选、搜索历史、搜索建议等功能</p>
                    </div>
                    <div class="p-4 border border-border rounded hover:bg-accent cursor-pointer" onclick="window.requirementManagement.useRequirementTemplate('notification')">
                        <h3 class="font-medium">通知系统模板</h3>
                        <p class="text-sm text-muted-foreground mt-1">站内消息、邮件通知、短信通知、推送通知等功能</p>
                    </div>
                </div>
                <div class="flex justify-end pt-4">
                    <button class="px-4 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">关闭</button>
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
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.requirementManagement.batchApprove()">
                        <div class="font-medium">批量审批通过</div>
                        <div class="text-sm text-muted-foreground">将选中的需求批量设置为通过状态</div>
                    </button>
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.requirementManagement.batchReject()">
                        <div class="font-medium">批量拒绝</div>
                        <div class="text-sm text-muted-foreground">将选中的需求批量设置为拒绝状态</div>
                    </button>
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.requirementManagement.batchExport()">
                        <div class="font-medium">批量导出</div>
                        <div class="text-sm text-muted-foreground">将选中的需求导出为Excel文件</div>
                    </button>
                    <button class="w-full p-3 border border-border rounded hover:bg-accent text-left" onclick="window.requirementManagement.batchDelete()">
                        <div class="font-medium text-destructive">批量删除</div>
                        <div class="text-sm text-muted-foreground">永久删除选中的需求（谨慎操作）</div>
                    </button>
                </div>
                <div class="flex justify-end pt-4">
                    <button class="px-4 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">关闭</button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
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
                    <button class="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded" onclick="window.requirementManagement.confirmBatchDelete()">确认删除</button>
                    <button class="flex-1 px-3 py-2 border border-border rounded" onclick="window.requirementManagement.closeModal()">取消</button>
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

    // 编辑需求
    editRequirement(requirementId) {
        this.closeModal();
        this.showNotification(`正在编辑需求: ${requirementId}`, 'info');
        // 这里可以实现具体的编辑逻辑
    }

    // 显示模板选择
    showTemplateModal() {
        this.showRequirementTemplates();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.requirementManagement = new RequirementManagement();
});
