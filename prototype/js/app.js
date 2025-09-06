// AI开发平台主应用脚本

class AIDevPlatform {
    constructor() {
        this.currentUser = '演示用户';
        this.currentRole = 'leader'; // 默认角色为领导
        this.isRecording = false;
        this.recordingStartTime = null;
        this.recordingTimer = null;
        this.mediaRecorder = null;
        this.audioChunks = [];

        this.initDB();
        this.initEventListeners();
        this.loadMockData();
        this.startRealTimeUpdates();
        this.initializeApp();
    }

    // 初始化IndexedDB
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('AIDevPlatformDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // 用户表
                if (!db.objectStoreNames.contains('users')) {
                    const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    userStore.createIndex('username', 'username', { unique: true });
                }
                
                // 项目表
                if (!db.objectStoreNames.contains('projects')) {
                    const projectStore = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
                    projectStore.createIndex('name', 'name');
                }
                
                // 需求表
                if (!db.objectStoreNames.contains('requirements')) {
                    const reqStore = db.createObjectStore('requirements', { keyPath: 'id', autoIncrement: true });
                    reqStore.createIndex('projectId', 'projectId');
                    reqStore.createIndex('status', 'status');
                }
                
                // 录音表
                if (!db.objectStoreNames.contains('recordings')) {
                    const recStore = db.createObjectStore('recordings', { keyPath: 'id', autoIncrement: true });
                    recStore.createIndex('requirementId', 'requirementId');
                }
            };
        });
    }

    // 初始化事件监听器
    initEventListeners() {
        // 角色选择器
        document.getElementById('roleSelector').addEventListener('change', (e) => {
            this.switchRole(e.target.value);
        });

        // 导航按钮
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showPage(e.target.dataset.page);
            });
        });

        // 新建需求按钮
        document.getElementById('newRequirementBtn').addEventListener('click', () => {
            this.showNewRequirementPage();
        });

        // 录音控制
        document.getElementById('recordBtn').addEventListener('click', () => {
            this.toggleRecording();
        });

        // AI拆分按钮
        document.getElementById('aiSplitBtn').addEventListener('click', () => {
            this.performAISplit();
        });

        // 保存需求按钮
        document.getElementById('saveRequirementBtn').addEventListener('click', () => {
            this.saveRequirement();
        });

        // 返回项目列表按钮
        document.getElementById('backToProjectList').addEventListener('click', () => {
            this.showProjectList();
        });

        // 项目详情标签页切换
        document.querySelectorAll('.project-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProjectTab(e.target.dataset.tab);
            });
        });

        // 需求详情相关事件
        document.getElementById('backToRequirementList').addEventListener('click', () => {
            this.showRequirementList();
        });

        document.getElementById('aiSplitRequirementBtn').addEventListener('click', () => {
            this.aiSplitRequirement();
        });

        document.getElementById('addSubRequirementBtn').addEventListener('click', () => {
            this.addSubRequirement();
        });

        document.getElementById('convertToTasksBtn').addEventListener('click', () => {
            this.convertToTasks();
        });

        document.getElementById('acceptAISplitBtn').addEventListener('click', () => {
            this.acceptAISplit();
        });

        document.getElementById('cancelAISplitBtn').addEventListener('click', () => {
            this.cancelAISplit();
        });

        // 开发模块切换事件
        document.querySelectorAll('.dev-module-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDevModule(e.target.dataset.module);
            });
        });

        // 开发任务相关事件
        document.getElementById('backToTaskList').addEventListener('click', () => {
            this.showTaskList();
        });

        // 开发配置弹窗事件
        document.getElementById('closeDevConfigModal').addEventListener('click', () => {
            this.closeDevConfigModal();
        });

        document.getElementById('cancelDevConfig').addEventListener('click', () => {
            this.closeDevConfigModal();
        });

        document.getElementById('startDevelopment').addEventListener('click', () => {
            this.startDevelopment();
        });

        // Prompt生成方式切换
        document.querySelectorAll('input[name="promptMethod"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.togglePromptMethod(e.target.value);
            });
        });

        document.getElementById('generateAIPrompt').addEventListener('click', () => {
            this.generateAIPrompt();
        });

        // 仓库详情相关事件
        document.getElementById('backToCodeTab').addEventListener('click', () => {
            this.backToCodeTab();
        });
    }

    // 初始化应用
    initializeApp() {
        // 从缓存中读取上次选择的角色，如果没有则使用默认角色
        const cachedRole = localStorage.getItem('aiDevPlatform_userRole') || 'leader';
        this.currentRole = cachedRole;
        document.getElementById('roleSelector').value = cachedRole;

        // 根据角色调整界面
        this.adjustUIForRole(cachedRole);

        // 显示仪表板
        this.showPage('dashboard');

        // 初始化仪表板内容
        this.loadDashboard();

        // 修复项目标签页的DOM结构
        this.fixProjectTabsStructure();

        // 修复系统管理页面的DOM结构
        this.fixSystemPageStructure();

        // 加载用户头像和设置
        this.loadSavedAvatar();
        this.loadUserSettings();
    }

    // 修复项目标签页的DOM结构
    fixProjectTabsStructure() {
        const projectDetailView = document.getElementById('projectDetailView');
        if (!projectDetailView) return;

        const tabsToFix = [
            'projectDeployTab',
            'projectMonitorTab',
            'projectResourceTab',
            'projectTeamTab'
        ];

        tabsToFix.forEach(tabId => {
            const tab = document.getElementById(tabId);
            if (tab && tab.parentElement !== projectDetailView) {
                console.log(`Fixed ${tabId} position`);
                projectDetailView.appendChild(tab);
            }
        });
    }

    // 修复系统管理页面的DOM结构
    fixSystemPageStructure() {
        const systemPage = document.getElementById('systemPage');
        const main = document.querySelector('main');

        if (systemPage && main) {
            // 检查systemPage是否在正确的位置（main元素的直接子元素）
            if (systemPage.parentElement !== main) {
                console.log('修复systemPage位置：从', systemPage.parentElement.id || systemPage.parentElement.tagName, '移动到main');
                // 将systemPage从当前位置移除并添加到main元素的末尾
                systemPage.remove();
                main.appendChild(systemPage);
            }
        }
    }

    // 切换角色
    switchRole(newRole) {
        const oldRole = this.currentRole;
        this.currentRole = newRole;

        // 保存角色到localStorage以实现持久化
        localStorage.setItem('aiDevPlatform_userRole', newRole);

        // 根据新角色调整界面
        this.adjustUIForRole(newRole);

        // 更新仪表板角色显示
        this.updateDashboardRole(newRole);

        // 更新快捷操作
        this.updateQuickActions(newRole);

        // 检查当前页面是否对新角色可见
        const currentPage = this.getCurrentPage();
        if (!this.isPageAccessibleForRole(currentPage, newRole)) {
            // 如果当前页面对新角色不可见，跳转到仪表板
            this.showPage('dashboard');
        }

        console.log(`角色从 ${this.getRoleDisplayName(oldRole)} 切换到 ${this.getRoleDisplayName(newRole)}`);
    }

    // 获取当前页面
    getCurrentPage() {
        const visiblePage = document.querySelector('.page-content:not(.hidden)');
        if (visiblePage) {
            const pageId = visiblePage.id;
            return pageId.replace('Page', '');
        }
        return 'dashboard';
    }

    // 检查页面是否对角色可见
    isPageAccessibleForRole(page, role) {
        const rolePermissions = {
            'super_admin': ['dashboard', 'requirements', 'projects', 'code', 'deploy', 'monitor', 'system', 'resources'],
            'sales': ['dashboard', 'requirements'],
            'leader': ['dashboard', 'requirements', 'projects', 'resources'],
            'dev_manager': ['dashboard', 'projects', 'resources'],
            'developer': ['dashboard', 'projects'],
            'programmer': ['dashboard', 'projects']
        };

        return rolePermissions[role] && rolePermissions[role].includes(page);
    }

    // 获取角色显示名称
    getRoleDisplayName(role) {
        const roleNames = {
            'super_admin': '超级管理员',
            'sales': '销售/售前',
            'leader': '领导',
            'dev_manager': '研发管理',
            'developer': '研发人员',
            'programmer': '开发人员'
        };
        return roleNames[role] || role;
    }

    // 根据角色调整UI
    adjustUIForRole(role) {
        const navBtns = document.querySelectorAll('.nav-btn');
        const systemManagementBtn = document.getElementById('systemManagementBtn');
        const resourceManagementBtn = document.getElementById('resourceManagementBtn');

        // 重置所有按钮显示
        navBtns.forEach(btn => btn.style.display = 'block');

        // 系统管理和资源管理按钮默认隐藏
        if (systemManagementBtn) {
            systemManagementBtn.style.display = 'none';
        }
        if (resourceManagementBtn) {
            resourceManagementBtn.style.display = 'none';
        }

        // 根据角色隐藏不相关的功能
        switch(role) {
            case 'super_admin':
                // 超级管理员可以看到所有模块，包括系统管理和资源管理
                if (systemManagementBtn) {
                    systemManagementBtn.style.display = 'block';
                }
                if (resourceManagementBtn) {
                    resourceManagementBtn.style.display = 'block';
                }
                break;
            case 'sales':
                // 销售只能看到需求管理
                navBtns.forEach(btn => {
                    if (!['dashboard', 'requirements'].includes(btn.dataset.page)) {
                        btn.style.display = 'none';
                    }
                });
                break;
            case 'leader':
                // 领导可以看到除系统管理外的所有模块，包括资源管理
                if (resourceManagementBtn) {
                    resourceManagementBtn.style.display = 'block';
                }
                navBtns.forEach(btn => {
                    if (btn.dataset.page === 'system') {
                        btn.style.display = 'none';
                    }
                });
                break;
            case 'dev_manager':
                // 研发管理主要关注项目管理和资源管理
                if (resourceManagementBtn) {
                    resourceManagementBtn.style.display = 'block';
                }
                navBtns.forEach(btn => {
                    if (['requirements', 'system'].includes(btn.dataset.page)) {
                        btn.style.display = 'none';
                    }
                });
                break;
            case 'developer':
                // 研发人员主要关注项目管理
                navBtns.forEach(btn => {
                    if (['requirements', 'system'].includes(btn.dataset.page)) {
                        btn.style.display = 'none';
                    }
                });
                break;
            case 'programmer':
                // 开发人员主要关注项目管理
                navBtns.forEach(btn => {
                    if (['requirements', 'system'].includes(btn.dataset.page)) {
                        btn.style.display = 'none';
                    }
                });
                break;
        }

        // 更新导航按钮的活跃状态
        this.updateNavActiveState();
    }

    // 更新导航按钮活跃状态
    updateNavActiveState() {
        const currentPage = this.getCurrentPage();
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('text-gray-900', 'border-b-2', 'border-gray-900');
            btn.classList.add('text-gray-700');

            if (btn.dataset.page === currentPage) {
                btn.classList.remove('text-gray-700');
                btn.classList.add('text-gray-900', 'border-b-2', 'border-gray-900');
            }
        });
    }

    // 显示页面
    showPage(pageName) {
        // 隐藏所有页面
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.add('hidden');
            page.style.display = 'none';
        });

        // 显示目标页面
        const targetPage = document.getElementById(pageName + 'Page');
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.style.display = 'block';
            console.log(`显示页面: ${pageName}, 元素ID: ${targetPage.id}`);
        } else {
            console.error(`页面元素未找到: ${pageName}Page`);
        }

        // 更新导航状态
        this.updateNavActiveState();

        // 加载页面数据
        this.loadPageData(pageName);
    }

    // 加载页面数据
    loadPageData(pageName) {
        switch(pageName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'requirements':
                this.loadRequirements();
                break;
            case 'projects':
                this.loadProjects();
                break;
            case 'code':
                this.loadCodeRepos();
                break;
            case 'deploy':
                this.loadDeployments();
                break;
            case 'monitor':
                this.loadMonitorData();
                break;
            case 'system':
                this.loadSystemManagement();
                break;
            case 'resources':
                this.loadResourcesPage();
                break;
        }
    }

    // 加载仪表板
    loadDashboard() {
        this.updateDashboardRole(this.currentRole);
        this.updateQuickActions(this.currentRole);
    }

    // 更新仪表板角色显示
    updateDashboardRole(role) {
        const roleElement = document.getElementById('dashboardRole');
        if (roleElement) {
            roleElement.textContent = this.getRoleDisplayName(role);
        }
    }

    // 更新快捷操作
    updateQuickActions(role) {
        const quickActionsContainer = document.getElementById('roleQuickActions');
        if (!quickActionsContainer) return;

        const actions = this.getQuickActionsForRole(role);
        quickActionsContainer.innerHTML = actions.map(action => `
            <button onclick="app.${action.action}()" class="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <span class="text-lg">${action.icon}</span>
                <div>
                    <p class="text-xs font-medium text-gray-900">${action.title}</p>
                    <p class="text-xs text-gray-600">${action.description}</p>
                </div>
            </button>
        `).join('');
    }

    // 获取角色对应的快捷操作
    getQuickActionsForRole(role) {
        const actions = {
            'super_admin': [
                { icon: '🔧', title: '系统管理', description: '管理系统配置和用户权限', action: 'quickSystemManagement' },
                { icon: '📊', title: '全局监控', description: '查看所有项目和系统状态', action: 'quickGlobalMonitor' },
                { icon: '🛡️', title: '安全审计', description: '查看系统安全日志和审计', action: 'quickSecurityAudit' }
            ],
            'sales': [
                { icon: '🎤', title: '录音收集需求', description: '使用语音快速记录客户需求', action: 'quickCreateRequirement' },
                { icon: '📋', title: '查看需求列表', description: '管理和跟踪所有需求', action: 'quickViewRequirements' },
                { icon: '🤖', title: 'AI需求分析', description: '智能分析和拆分需求', action: 'quickAIAnalysis' }
            ],
            'leader': [
                { icon: '📊', title: '项目概览', description: '查看所有项目状态', action: 'quickViewProjects' },
                { icon: '✅', title: '需求审批', description: '审批待处理的需求', action: 'quickApproveRequirements' },
                { icon: '🖥️', title: '资源管理', description: '管理主机和容器资源', action: 'quickResourceManagement' }
            ],
            'dev_manager': [
                { icon: '🏗️', title: '项目管理', description: '创建和管理开发项目', action: 'quickViewProjects' },
                { icon: '🖥️', title: '资源管理', description: '管理主机和容器资源', action: 'quickResourceManagement' },
                { icon: '📈', title: '监控中心', description: '查看系统监控数据', action: 'quickMonitorCenter' }
            ],
            'developer': [
                { icon: '🏗️', title: '我的项目', description: '查看参与的项目', action: 'quickViewProjects' },
                { icon: '💻', title: '代码仓库', description: '管理代码和AI工具', action: 'quickCodeManagement' },
                { icon: '🔧', title: '技术决策', description: '参与技术方案讨论', action: 'quickTechDecision' }
            ],
            'programmer': [
                { icon: '💻', title: '代码开发', description: '查看开发任务', action: 'quickCodeDevelopment' },
                { icon: '🤖', title: 'AI编程助手', description: '使用AI工具辅助编程', action: 'quickAIProgramming' },
                { icon: '🏗️', title: '项目详情', description: '查看项目开发进度', action: 'quickViewProjects' }
            ]
        };

        return actions[role] || [];
    }

    // 显示需求收集器
    showRequirementCollector() {
        const collector = document.getElementById('requirementCollector');
        collector.classList.remove('hidden');
        
        // 清空表单
        document.getElementById('requirementTitle').value = '';
        document.getElementById('requirementDescription').value = '';
        document.getElementById('aiSplitResult').classList.add('hidden');
    }

    // 切换录音状态
    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    // 开始录音
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // 显示音频播放器
                document.getElementById('audioSource').src = audioUrl;
                document.getElementById('audioPlayback').classList.remove('hidden');
                
                // 模拟语音转文字
                this.simulateTranscription();
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.recordingStartTime = Date.now();

            // 更新UI
            document.getElementById('recordBtn').innerHTML = '<span>⏹️</span><span>停止录音</span>';
            document.getElementById('recordBtn').classList.remove('bg-red-600', 'hover:bg-red-700');
            document.getElementById('recordBtn').classList.add('bg-gray-600', 'hover:bg-gray-700');
            document.getElementById('recordingStatus').classList.remove('hidden');

            // 开始计时
            this.startRecordingTimer();

        } catch (error) {
            console.error('录音失败:', error);
            alert('无法访问麦克风，请检查权限设置');
        }
    }

    // 停止录音
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            
            this.isRecording = false;
            clearInterval(this.recordingTimer);

            // 更新UI
            document.getElementById('recordBtn').innerHTML = '<span>🎤</span><span>开始录音</span>';
            document.getElementById('recordBtn').classList.remove('bg-gray-600', 'hover:bg-gray-700');
            document.getElementById('recordBtn').classList.add('bg-red-600', 'hover:bg-red-700');
            document.getElementById('recordingStatus').classList.add('hidden');
        }
    }

    // 开始录音计时
    startRecordingTimer() {
        this.recordingTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('recordTime').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // 模拟语音转文字
    simulateTranscription() {
        document.getElementById('transcriptArea').classList.remove('hidden');
        document.getElementById('transcriptText').textContent = '转换中...';

        // 模拟转换延迟
        setTimeout(() => {
            const mockTranscript = `客户希望在现有的电商平台基础上，增加一个智能推荐功能。
具体需求包括：
1. 基于用户浏览历史的商品推荐
2. 个性化的首页展示
3. 相关商品推荐
4. 购买后的推荐功能
客户希望这个功能能够提升用户体验，增加销售转化率。
预期在3个月内完成开发和上线。`;
            
            document.getElementById('transcriptText').textContent = mockTranscript;
            
            // 自动填充到需求描述
            document.getElementById('requirementDescription').value = mockTranscript;
        }, 2000);
    }

    // 执行AI拆分
    performAISplit() {
        const description = document.getElementById('requirementDescription').value;
        if (!description.trim()) {
            alert('请先输入需求描述');
            return;
        }

        // 模拟AI分析
        const suggestions = [
            {
                title: '用户行为分析模块',
                description: '收集和分析用户浏览、搜索、购买行为数据',
                priority: 'high',
                estimatedHours: 40
            },
            {
                title: '推荐算法引擎',
                description: '实现协同过滤和内容推荐算法',
                priority: 'high',
                estimatedHours: 60
            },
            {
                title: '个性化首页',
                description: '根据用户偏好动态生成首页内容',
                priority: 'medium',
                estimatedHours: 30
            },
            {
                title: '相关商品推荐',
                description: '在商品详情页显示相关推荐',
                priority: 'medium',
                estimatedHours: 20
            },
            {
                title: '购买后推荐',
                description: '订单完成后的推荐功能',
                priority: 'low',
                estimatedHours: 15
            }
        ];

        // 显示拆分结果
        const resultContainer = document.getElementById('splitSuggestions');
        resultContainer.innerHTML = suggestions.map(item => `
            <div class="border border-blue-200 rounded p-2">
                <div class="flex justify-between items-start mb-1">
                    <h5 class="text-xs font-medium text-blue-900">${item.title}</h5>
                    <span class="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">${item.priority}</span>
                </div>
                <p class="text-blue-700 text-xs mb-1">${item.description}</p>
                <p class="text-xs text-blue-600">预估工时: ${item.estimatedHours}小时</p>
            </div>
        `).join('');

        document.getElementById('aiSplitResult').classList.remove('hidden');
    }

    // 保存需求
    async saveRequirement() {
        const title = document.getElementById('requirementTitle').value;
        const description = document.getElementById('requirementDescription').value;

        if (!title.trim() || !description.trim()) {
            alert('请填写需求标题和描述');
            return;
        }

        const requirement = {
            title: title,
            description: description,
            status: 'draft',
            priority: 'medium',
            creator: this.currentUser,
            createdAt: new Date().toISOString(),
            projectId: 1 // 默认项目
        };

        // 保存到IndexedDB
        await this.saveToDB('requirements', requirement);

        alert('需求保存成功');
        
        // 隐藏收集器并刷新列表
        document.getElementById('requirementCollector').classList.add('hidden');
        this.loadRequirements();
    }

    // 加载需求列表
    async loadRequirements() {
        const requirements = await this.getFromDB('requirements');
        const tbody = document.getElementById('requirementsList');

        tbody.innerHTML = requirements.map(req => `
            <tr>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${req.title}</td>
                <td class="px-4 py-2 whitespace-nowrap">
                    <span class="px-1.5 py-0.5 inline-flex text-xs leading-4 font-medium rounded-full
                        ${req.priority === 'high' ? 'bg-red-100 text-red-800' :
                          req.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}">
                        ${req.priority}
                    </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                    <span class="px-1.5 py-0.5 inline-flex text-xs leading-4 font-medium rounded-full
                        ${req.status === 'approved' ? 'bg-green-100 text-green-800' :
                          req.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'}">
                        ${req.status}
                    </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${req.creator}</td>
                <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                    ${new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-xs font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-1">编辑</button>
                    <button class="text-green-600 hover:text-green-900 mr-1">审批</button>
                    <button class="text-red-600 hover:text-red-900">删除</button>
                </td>
            </tr>
        `).join('');
    }

    // 保存数据到IndexedDB
    async saveToDB(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // 从IndexedDB获取数据
    async getFromDB(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // 加载模拟数据
    async loadMockData() {
        // 等待数据库初始化完成
        await this.initDB();

        // 检查是否已有数据
        const existingReqs = await this.getFromDB('requirements');
        if (existingReqs.length === 0) {
            // 添加模拟需求数据
            const mockRequirements = [
                {
                    title: '用户登录功能优化',
                    description: '优化用户登录流程，增加第三方登录支持',
                    status: 'approved',
                    priority: 'high',
                    creator: '张三',
                    createdAt: '2024-01-15T10:00:00Z',
                    projectId: 1
                },
                {
                    title: '支付模块重构',
                    description: '重构现有支付模块，支持更多支付方式',
                    status: 'submitted',
                    priority: 'medium',
                    creator: '李四',
                    createdAt: '2024-01-14T14:30:00Z',
                    projectId: 1
                },
                {
                    title: '数据报表功能',
                    description: '增加销售数据报表和分析功能',
                    status: 'draft',
                    priority: 'low',
                    creator: '王五',
                    createdAt: '2024-01-13T09:15:00Z',
                    projectId: 2
                }
            ];

            for (const req of mockRequirements) {
                await this.saveToDB('requirements', req);
            }
        }
    }

    // 加载项目数据
    async loadProjects() {
        // 模拟项目数据加载
        const projects = [
            {
                id: 1,
                name: '电商平台重构',
                description: '重构现有电商平台，提升性能和用户体验',
                status: '进行中',
                progress: 75,
                members: 8,
                deadline: '2024-03-15'
            },
            {
                id: 2,
                name: '移动端应用',
                description: '开发配套的移动端应用，支持iOS和Android',
                status: '规划中',
                progress: 45,
                members: 5,
                deadline: '2024-04-30'
            },
            {
                id: 3,
                name: '数据分析系统',
                description: '构建数据分析和报表系统',
                status: '测试中',
                progress: 90,
                members: 3,
                deadline: '2024-02-28'
            }
        ];

        // 这里可以添加项目卡片的动态生成逻辑
        console.log('项目数据已加载:', projects);
    }

    // 加载代码仓库数据
    async loadCodeRepos() {
        const repos = [
            {
                name: 'ecommerce-platform',
                description: '电商平台主仓库',
                language: 'JavaScript',
                stars: 24,
                branches: 8,
                commits: 156,
                status: '活跃'
            },
            {
                name: 'mobile-app',
                description: '移动端应用仓库',
                language: 'React Native',
                stars: 12,
                branches: 3,
                commits: 89,
                status: '开发中'
            },
            {
                name: 'data-analytics',
                description: '数据分析系统',
                language: 'Python',
                stars: 18,
                branches: 2,
                commits: 234,
                status: '归档'
            }
        ];

        console.log('代码仓库数据已加载:', repos);
    }

    // 加载部署数据
    async loadDeployments() {
        const deployments = [
            {
                environment: '生产环境',
                version: 'v2.1.1',
                status: '成功',
                strategy: '蓝绿部署',
                deployer: '张三',
                time: '2024-01-15 14:30'
            },
            {
                environment: '测试环境',
                version: 'v2.1.2',
                status: '进行中',
                strategy: '滚动更新',
                deployer: '李四',
                time: '2024-01-15 15:45'
            }
        ];

        console.log('部署数据已加载:', deployments);
    }

    // 加载监控数据
    async loadMonitorData() {
        const monitorData = {
            availability: 99.9,
            responseTime: 245,
            errorRate: 0.1,
            activeUsers: 1234,
            resources: {
                cpu: 45,
                memory: 68,
                disk: 32,
                network: 78
            },
            alerts: [
                {
                    type: 'error',
                    title: '数据库连接超时',
                    description: '生产环境数据库响应时间超过阈值',
                    time: '5分钟前'
                },
                {
                    type: 'warning',
                    title: '内存使用率偏高',
                    description: '服务器内存使用率达到80%',
                    time: '15分钟前'
                },
                {
                    type: 'info',
                    title: '部署完成通知',
                    description: 'v2.1.2版本已成功部署到测试环境',
                    time: '1小时前'
                }
            ],
            services: [
                { name: 'Web服务', version: 'nginx:1.20', status: 'healthy' },
                { name: '应用服务', version: 'node:18.17', status: 'healthy' },
                { name: '数据库', version: 'postgresql:15', status: 'warning' },
                { name: '缓存服务', version: 'redis:7.0', status: 'healthy' },
                { name: '文件存储', version: 'minio:latest', status: 'healthy' },
                { name: '消息队列', version: 'rabbitmq:3.11', status: 'healthy' }
            ]
        };

        console.log('监控数据已加载:', monitorData);

        // 更新监控页面的实时数据
        this.updateMonitorDisplay(monitorData);
    }

    // 更新监控显示
    updateMonitorDisplay(data) {
        // 这里可以添加实时更新监控数据的逻辑
        // 例如更新图表、指标等
        if (document.getElementById('monitorPage').classList.contains('hidden')) {
            return; // 如果监控页面不可见，则不更新
        }

        // 模拟实时数据更新
        console.log('监控数据已更新');
    }

    // 模拟实时数据更新
    startRealTimeUpdates() {
        // 每30秒更新一次监控数据
        setInterval(() => {
            const monitorPage = document.getElementById('monitorPage');
            if (this.currentUser && monitorPage && !monitorPage.classList.contains('hidden')) {
                this.loadMonitorData();
            }
        }, 30000);
    }

    // 添加新项目
    async createProject(projectData) {
        try {
            await this.saveToDB('projects', projectData);
            this.loadProjects();
            return true;
        } catch (error) {
            console.error('创建项目失败:', error);
            return false;
        }
    }

    // 添加新仓库
    async createRepository(repoData) {
        try {
            await this.saveToDB('repositories', repoData);
            this.loadCodeRepos();
            return true;
        } catch (error) {
            console.error('创建仓库失败:', error);
            return false;
        }
    }

    // 执行部署
    async performDeployment(deploymentData) {
        try {
            await this.saveToDB('deployments', deploymentData);
            this.loadDeployments();
            return true;
        } catch (error) {
            console.error('部署失败:', error);
            return false;
        }
    }

    // 处理告警
    async handleAlert(alertId, action) {
        try {
            // 这里可以添加告警处理逻辑
            console.log(`处理告警 ${alertId}: ${action}`);
            return true;
        } catch (error) {
            console.error('处理告警失败:', error);
            return false;
        }
    }

    // 显示项目详情
    showProjectDetail(projectId) {
        // 隐藏项目列表，显示项目详情
        document.getElementById('projectListView').classList.add('hidden');
        document.getElementById('projectDetailView').classList.remove('hidden');

        // 加载项目详情数据
        this.loadProjectDetail(projectId);

        // 默认显示概览标签页
        this.switchProjectTab('overview');
    }

    // 显示项目列表
    showProjectList() {
        // 隐藏项目详情视图
        document.getElementById('projectDetailView').classList.add('hidden');

        // 重置所有项目标签页状态
        this.resetProjectTabsState();

        // 显示项目列表视图
        document.getElementById('projectListView').classList.remove('hidden');
    }

    // 重置项目标签页状态
    resetProjectTabsState() {
        // 隐藏所有标签页内容
        document.querySelectorAll('.project-tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });

        // 重置所有标签按钮状态
        document.querySelectorAll('.project-tab-btn').forEach(btn => {
            btn.classList.remove('bg-gray-900', 'text-white');
            btn.classList.add('text-gray-500', 'hover:text-gray-700');
        });

        // 清理可能的子模块状态
        this.resetDevModulesState();

        // 清理需求详情状态
        this.resetRequirementDetailState();

        // 清理仓库详情状态
        this.resetRepositoryDetailState();
    }

    // 重置开发模块状态
    resetDevModulesState() {
        // 隐藏所有开发子模块
        document.querySelectorAll('.dev-module').forEach(module => {
            module.classList.add('hidden');
        });

        // 重置开发模块导航按钮状态
        document.querySelectorAll('.dev-module-btn').forEach(btn => {
            btn.classList.remove('bg-gray-900', 'text-white');
            btn.classList.add('text-gray-500', 'hover:text-gray-700');
        });
    }

    // 重置需求详情状态
    resetRequirementDetailState() {
        // 隐藏需求详情视图，显示需求列表视图
        const requirementDetailView = document.getElementById('requirementDetailView');
        const requirementListView = document.getElementById('requirementListView');

        if (requirementDetailView) {
            requirementDetailView.classList.add('hidden');
        }

        if (requirementListView) {
            requirementListView.classList.remove('hidden');
        }

        // 隐藏开发任务详情视图，显示任务列表视图
        const taskDetailView = document.getElementById('taskDetailView');
        const taskListView = document.getElementById('taskListView');

        if (taskDetailView) {
            taskDetailView.classList.add('hidden');
        }

        if (taskListView) {
            taskListView.classList.remove('hidden');
        }
    }

    // 重置仓库详情状态
    resetRepositoryDetailState() {
        // 隐藏仓库详情视图
        const repositoryDetailView = document.getElementById('repositoryDetailView');
        if (repositoryDetailView) {
            repositoryDetailView.classList.add('hidden');
        }
    }

    // 切换项目详情标签页
    switchProjectTab(tabName) {
        // 隐藏所有标签页内容
        document.querySelectorAll('.project-tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });

        // 隐藏仓库详情页面
        const repositoryDetailView = document.getElementById('repositoryDetailView');
        if (repositoryDetailView) {
            repositoryDetailView.classList.add('hidden');
        }

        // 显示目标标签页
        const targetTab = document.getElementById(`project${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`);
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }

        // 更新标签按钮状态
        document.querySelectorAll('.project-tab-btn').forEach(btn => {
            btn.classList.remove('border-gray-900', 'text-gray-900');
            btn.classList.add('border-transparent', 'text-gray-500');
        });

        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('border-transparent', 'text-gray-500');
            activeBtn.classList.add('border-gray-900', 'text-gray-900');
        }

        // 如果是开发标签页，确保显示需求模块
        if (tabName === 'development') {
            this.switchDevModule('requirements');
        }

        // 加载对应标签页的数据
        this.loadProjectTabData(tabName);
    }

    // 加载项目详情数据
    async loadProjectDetail(projectId) {
        const projects = {
            1: {
                name: '电商平台重构',
                description: '重构现有电商平台，提升性能和用户体验',
                status: '进行中'
            },
            2: {
                name: '移动端应用',
                description: '开发配套的移动端应用，支持iOS和Android',
                status: '规划中'
            },
            3: {
                name: '数据分析系统',
                description: '构建数据分析和报表系统',
                status: '测试中'
            }
        };

        const project = projects[projectId];
        if (project) {
            document.getElementById('projectDetailTitle').textContent = project.name;
            document.getElementById('projectDetailDesc').textContent = project.description;

            const statusElement = document.getElementById('projectDetailStatus');
            statusElement.textContent = project.status;

            // 根据状态设置样式
            statusElement.className = 'px-3 py-1 text-sm rounded-full';
            if (project.status === '进行中') {
                statusElement.classList.add('bg-green-100', 'text-green-800');
            } else if (project.status === '规划中') {
                statusElement.classList.add('bg-blue-100', 'text-blue-800');
            } else if (project.status === '测试中') {
                statusElement.classList.add('bg-yellow-100', 'text-yellow-800');
            }
        }
    }

    // 加载项目标签页数据
    loadProjectTabData(tabName) {
        switch(tabName) {
            case 'development':
                this.loadProjectDevelopment();
                break;
            case 'code':
                this.loadProjectCode();
                break;
            case 'deploy':
                this.loadProjectDeployments();
                break;
            case 'monitor':
                this.loadProjectMonitor();
                break;
            case 'resource':
                this.loadProjectResource();
                break;
            case 'team':
                this.loadProjectTeam();
                break;
            default:
                // overview 标签页数据已经在HTML中静态显示
                break;
        }
    }

    // 加载项目需求数据
    loadProjectRequirements() {
        console.log('加载项目需求数据');
    }

    // 加载项目代码数据
    loadProjectCode() {
        console.log('加载项目代码数据');

        // 模拟代码仓库数据
        const repoData = {
            commits: [
                { id: 'abc123', message: '优化登录界面UI', author: '张三', time: '2小时前', branch: 'feature/login-ui' },
                { id: 'def456', message: '修复支付模块bug', author: '李四', time: '5小时前', branch: 'hotfix/payment-fix' },
                { id: 'ghi789', message: '添加用户权限管理', author: '王五', time: '1天前', branch: 'feature/user-permission' },
                { id: 'jkl012', message: '更新API文档', author: '赵六', time: '2天前', branch: 'docs/api-update' }
            ],
            branches: [
                { name: 'main', commits: 156, lastUpdate: '2小时前', status: 'active' },
                { name: 'develop', commits: 89, lastUpdate: '5小时前', status: 'active' },
                { name: 'feature/login-ui', commits: 12, lastUpdate: '2小时前', status: 'active' },
                { name: 'hotfix/payment-fix', commits: 3, lastUpdate: '5小时前', status: 'merged' }
            ],
            pullRequests: [
                { id: 1, title: '登录界面UI优化', author: '张三', status: 'open', reviews: 2, changes: '+45 -12' },
                { id: 2, title: '支付模块重构', author: '李四', status: 'reviewing', reviews: 1, changes: '+128 -67' },
                { id: 3, title: '用户权限管理', author: '王五', status: 'merged', reviews: 3, changes: '+89 -23' }
            ]
        };

        // 更新最近代码活动 - 使用更精确的选择器
        const activityContainer = document.querySelector('#projectCodeTab .bg-white.rounded-lg.shadow-sm.border.border-gray-200:last-child .divide-y.divide-gray-200');
        if (activityContainer) {
            activityContainer.innerHTML = repoData.commits.map(commit => {
                const icons = ['✓', '📝', '🔧', '🚀'];
                const colors = ['green', 'blue', 'yellow', 'purple'];
                const randomIndex = Math.floor(Math.random() * icons.length);

                return `
                    <div class="p-3 flex items-center space-x-3">
                        <div class="w-6 h-6 bg-${colors[randomIndex]}-100 rounded-full flex items-center justify-center">
                            <span class="text-xs">${icons[randomIndex]}</span>
                        </div>
                        <div class="flex-1">
                            <p class="text-xs text-gray-900">${commit.author} 提交了: ${commit.message}</p>
                            <p class="text-xs text-gray-500">${commit.branch} • ${commit.time}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 更新仓库统计信息（更新现有的仓库信息）
        const repoContainer = document.querySelector('#projectCodeTab .bg-white.rounded-lg.shadow-sm.border.border-gray-200:first-child .divide-y.divide-gray-200');
        if (repoContainer) {
            const firstRepo = repoContainer.querySelector('div:first-child');
            if (firstRepo) {
                const commits = firstRepo.querySelector('.text-xs.text-gray-500');
                if (commits) {
                    commits.innerHTML = `React • ⭐ 15 • 🔀 ${repoData.branches.length}分支 • 📝 ${repoData.commits.length + 85}提交`;
                }
            }
        }
    }

    // 显示仓库详情
    showRepositoryDetail(repoName) {
        console.log(`显示仓库详情: ${repoName}`);

        // 隐藏代码标签页，显示仓库详情页面
        document.getElementById('projectCodeTab').classList.add('hidden');
        document.getElementById('repositoryDetailView').classList.remove('hidden');

        // 加载仓库数据
        this.loadRepositoryData(repoName);
    }

    // 返回代码标签页
    backToCodeTab() {
        document.getElementById('repositoryDetailView').classList.add('hidden');
        document.getElementById('projectCodeTab').classList.remove('hidden');
    }

    // 加载仓库数据
    loadRepositoryData(repoName) {
        // 模拟仓库数据
        const repoData = {
            'ecommerce-frontend': {
                name: 'ecommerce-frontend',
                title: 'ecommerce-frontend',
                description: '电商平台前端应用，基于React构建的现代化用户界面',
                language: 'JavaScript',
                languageColor: '#f1e05a',
                stars: 15,
                forks: 5,
                commits: 89,
                status: '活跃',
                lastUpdate: '2小时前',
                cloneUrl: 'https://git.example.com/ecommerce/frontend.git',
                files: [
                    { name: 'src', type: 'folder', lastCommit: '优化登录界面UI', time: '2小时前', author: '张三' },
                    { name: 'public', type: 'folder', lastCommit: '更新favicon', time: '1天前', author: '李四' },
                    { name: 'package.json', type: 'file', lastCommit: '升级依赖版本', time: '3天前', author: '王五' },
                    { name: 'README.md', type: 'file', lastCommit: '更新文档', time: '5天前', author: '张三' },
                    { name: '.gitignore', type: 'file', lastCommit: '初始化项目', time: '30天前', author: '张三' }
                ],
                contributors: [
                    { name: '张三', avatar: '张', commits: 45, additions: 2340, deletions: 567 },
                    { name: '李四', avatar: '李', commits: 28, additions: 1890, deletions: 234 },
                    { name: '王五', avatar: '王', commits: 16, additions: 890, deletions: 123 }
                ],
                languages: [
                    { name: 'JavaScript', percentage: 68.5, color: '#f1e05a' },
                    { name: 'CSS', percentage: 18.2, color: '#563d7c' },
                    { name: 'HTML', percentage: 13.3, color: '#e34c26' }
                ],
                recentCommits: [
                    { hash: 'abc123', message: '优化登录界面UI', author: '张三', time: '2小时前' },
                    { hash: 'def456', message: '修复响应式布局问题', author: '李四', time: '5小时前' },
                    { hash: 'ghi789', message: '添加加载动画', author: '王五', time: '1天前' }
                ],
                readme: `# 电商平台前端

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
\`\`\``
            },
            'ecommerce-backend': {
                name: 'ecommerce-backend',
                title: 'ecommerce-backend',
                description: '电商平台后端API服务，提供完整的业务逻辑和数据接口',
                language: 'JavaScript',
                languageColor: '#f1e05a',
                stars: 12,
                forks: 3,
                commits: 67,
                status: '活跃',
                lastUpdate: '4小时前',
                cloneUrl: 'https://git.example.com/ecommerce/backend.git',
                files: [
                    { name: 'src', type: 'folder', lastCommit: '添加支付接口', time: '4小时前', author: '李四' },
                    { name: 'config', type: 'folder', lastCommit: '更新数据库配置', time: '1天前', author: '王五' },
                    { name: 'tests', type: 'folder', lastCommit: '添加单元测试', time: '2天前', author: '张三' },
                    { name: 'package.json', type: 'file', lastCommit: '升级Express版本', time: '3天前', author: '李四' },
                    { name: 'README.md', type: 'file', lastCommit: '更新API文档', time: '5天前', author: '王五' }
                ],
                contributors: [
                    { name: '李四', avatar: '李', commits: 38, additions: 3240, deletions: 567 },
                    { name: '王五', avatar: '王', commits: 19, additions: 1560, deletions: 234 },
                    { name: '张三', avatar: '张', commits: 10, additions: 780, deletions: 123 }
                ],
                languages: [
                    { name: 'JavaScript', percentage: 78.5, color: '#f1e05a' },
                    { name: 'JSON', percentage: 12.2, color: '#292929' },
                    { name: 'Shell', percentage: 9.3, color: '#89e051' }
                ],
                recentCommits: [
                    { hash: 'xyz789', message: '添加支付接口', author: '李四', time: '4小时前' },
                    { hash: 'uvw456', message: '优化数据库查询', author: '王五', time: '8小时前' },
                    { hash: 'rst123', message: '修复用户认证bug', author: '张三', time: '1天前' }
                ],
                readme: `# 电商平台后端API

基于Node.js和Express构建的电商平台后端服务。

## 功能特性

- 🔐 JWT身份认证
- 📊 RESTful API设计
- 🗄️ MongoDB数据存储
- 🚀 高性能缓存

## 技术栈

- Node.js
- Express
- MongoDB
- Redis
- JWT

## API文档

访问 \`/api/docs\` 查看完整的API文档。

## 环境配置

\`\`\`bash
cp .env.example .env
npm install
npm run dev
\`\`\``
            },
            'ecommerce-mobile': {
                name: 'ecommerce-mobile',
                title: 'ecommerce-mobile',
                description: '电商平台移动端应用，支持iOS和Android双平台',
                language: 'JavaScript',
                languageColor: '#f1e05a',
                stars: 8,
                forks: 2,
                commits: 34,
                status: '开发中',
                lastUpdate: '6小时前',
                cloneUrl: 'https://git.example.com/ecommerce/mobile.git',
                files: [
                    { name: 'src', type: 'folder', lastCommit: '添加商品详情页', time: '6小时前', author: '王五' },
                    { name: 'android', type: 'folder', lastCommit: '更新Android配置', time: '2天前', author: '赵六' },
                    { name: 'ios', type: 'folder', lastCommit: '更新iOS配置', time: '2天前', author: '赵六' },
                    { name: 'package.json', type: 'file', lastCommit: '添加新依赖', time: '3天前', author: '王五' },
                    { name: 'README.md', type: 'file', lastCommit: '更新开发指南', time: '1周前', author: '王五' }
                ],
                contributors: [
                    { name: '王五', avatar: '王', commits: 22, additions: 1840, deletions: 267 },
                    { name: '赵六', avatar: '赵', commits: 12, additions: 890, deletions: 134 }
                ],
                languages: [
                    { name: 'JavaScript', percentage: 72.5, color: '#f1e05a' },
                    { name: 'Java', percentage: 15.2, color: '#b07219' },
                    { name: 'Objective-C', percentage: 12.3, color: '#438eff' }
                ],
                recentCommits: [
                    { hash: 'mno789', message: '添加商品详情页', author: '王五', time: '6小时前' },
                    { hash: 'pqr456', message: '优化购物车功能', author: '王五', time: '1天前' },
                    { hash: 'stu123', message: '修复导航问题', author: '赵六', time: '2天前' }
                ],
                readme: `# 电商平台移动端

基于React Native开发的跨平台移动应用。

## 功能特性

- 📱 跨平台支持
- 🎨 原生UI体验
- 🔄 热更新支持
- 📊 性能监控

## 技术栈

- React Native
- TypeScript
- Redux Toolkit
- React Navigation

## 开发环境

\`\`\`bash
npm install
npx react-native run-ios
npx react-native run-android
\`\`\`

## 构建发布

\`\`\`bash
npm run build:ios
npm run build:android
\`\`\``
            }
        };

        const repo = repoData[repoName];
        if (!repo) return;

        // 更新基本信息
        document.getElementById('repoDetailName').textContent = repo.name;
        document.getElementById('repoDetailStatus').textContent = repo.status;
        document.getElementById('repoDetailTitle').textContent = repo.title;
        document.getElementById('repoDetailDescription').textContent = repo.description;
        document.getElementById('repoLanguage').textContent = repo.language;
        document.getElementById('repoLanguageColor').style.backgroundColor = repo.languageColor;
        document.getElementById('repoStars').textContent = `⭐ ${repo.stars}`;
        document.getElementById('repoForks').textContent = `🔀 ${repo.forks} 分支`;
        document.getElementById('repoCommits').textContent = `📝 ${repo.commits} 提交`;
        document.getElementById('repoLastUpdate').textContent = `更新于 ${repo.lastUpdate}`;
        document.getElementById('repoCloneUrl').value = repo.cloneUrl;
        document.getElementById('repoCommitCount').textContent = `${repo.commits} commits`;

        // 更新文件列表
        this.updateFileList(repo.files);

        // 更新README
        this.updateReadme(repo.readme);

        // 更新贡献者
        this.updateContributors(repo.contributors);

        // 更新语言统计
        this.updateLanguageStats(repo.languages);

        // 更新最近提交
        this.updateRecentCommits(repo.recentCommits);
    }

    // 更新文件列表
    updateFileList(files) {
        const container = document.getElementById('repoFileList');
        if (!container) return;

        container.innerHTML = files.map(file => `
            <div class="p-3 hover:bg-gray-50 cursor-pointer">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="text-sm">${file.type === 'folder' ? '📁' : '📄'}</span>
                        <span class="text-sm font-medium text-gray-900">${file.name}</span>
                    </div>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>${file.lastCommit}</span>
                        <span>${file.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 更新README
    updateReadme(readme) {
        const container = document.getElementById('repoReadmeContent');
        if (!container) return;

        // 简单的Markdown渲染
        const html = readme
            .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mb-3">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold mb-2">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-md font-medium mb-2">$1</h3>')
            .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
            .replace(/```bash\n([\s\S]*?)\n```/g, '<pre class="bg-gray-100 p-3 rounded text-sm overflow-x-auto"><code>$1</code></pre>')
            .replace(/```\n([\s\S]*?)\n```/g, '<pre class="bg-gray-100 p-3 rounded text-sm overflow-x-auto"><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
            .replace(/\n\n/g, '</p><p class="mb-2">')
            .replace(/\n/g, '<br>');

        container.innerHTML = `<div class="prose prose-sm max-w-none">${html}</div>`;
    }

    // 更新贡献者
    updateContributors(contributors) {
        const container = document.getElementById('repoContributors');
        if (!container) return;

        container.innerHTML = contributors.map(contributor => `
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                        ${contributor.avatar}
                    </div>
                    <span class="text-sm font-medium">${contributor.name}</span>
                </div>
                <span class="text-xs text-gray-500">${contributor.commits} commits</span>
            </div>
        `).join('');
    }

    // 更新语言统计
    updateLanguageStats(languages) {
        const container = document.getElementById('repoLanguageStats');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-2">
                ${languages.map(lang => `
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center space-x-2">
                            <span class="w-3 h-3 rounded-full" style="background-color: ${lang.color}"></span>
                            <span>${lang.name}</span>
                        </div>
                        <span class="text-gray-500">${lang.percentage}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1">
                        <div class="h-1 rounded-full" style="width: ${lang.percentage}%; background-color: ${lang.color}"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // 更新最近提交
    updateRecentCommits(commits) {
        const container = document.getElementById('repoRecentCommits');
        if (!container) return;

        container.innerHTML = commits.map(commit => `
            <div class="border-b border-gray-200 pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0">
                <div class="text-sm font-medium text-gray-900 mb-1">${commit.message}</div>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>${commit.author}</span>
                    <span>${commit.time}</span>
                </div>
                <div class="text-xs text-gray-400 mt-1">${commit.hash}</div>
            </div>
        `).join('');
    }

    // 复制到剪贴板
    copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.select();
            document.execCommand('copy');

            // 显示复制成功提示
            const button = element.nextElementSibling;
            if (button) {
                const originalText = button.textContent;
                button.textContent = '✓';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 1000);
            }
        }
    }

    // 加载项目部署数据
    loadProjectDeployments() {
        console.log('加载项目部署数据');

        // 模拟部署环境数据
        const deployData = {
            environments: [
                { name: '开发环境', status: 'running', version: 'v2.1.3-dev', url: 'https://dev.example.com', lastDeploy: '2小时前' },
                { name: '测试环境', status: 'running', version: 'v2.1.2', url: 'https://test.example.com', lastDeploy: '1天前' },
                { name: '生产环境', status: 'running', version: 'v2.1.1', url: 'https://app.example.com', lastDeploy: '3天前' }
            ],
            deployHistory: [
                { id: 1, env: '开发环境', version: 'v2.1.3-dev', status: 'success', time: '2小时前', duration: '2分30秒', deployer: '张三' },
                { id: 2, env: '测试环境', version: 'v2.1.2', status: 'success', time: '1天前', duration: '3分15秒', deployer: '李四' },
                { id: 3, env: '开发环境', version: 'v2.1.2-dev', status: 'failed', time: '1天前', duration: '1分45秒', deployer: '张三' },
                { id: 4, env: '生产环境', version: 'v2.1.1', status: 'success', time: '3天前', duration: '5分20秒', deployer: '王五' }
            ],
            pipelines: [
                { name: 'CI/CD Pipeline', status: 'running', stage: 'Testing', progress: 65, duration: '8分钟' },
                { name: 'Security Scan', status: 'completed', stage: 'Completed', progress: 100, duration: '3分钟' },
                { name: 'Performance Test', status: 'pending', stage: 'Waiting', progress: 0, duration: '-' }
            ]
        };

        // 更新环境状态
        const envContainers = document.querySelectorAll('#projectDeployTab .grid-cols-1.lg\\:grid-cols-3 > div');
        deployData.environments.forEach((env, index) => {
            if (envContainers[index]) {
                const container = envContainers[index];
                const nameElement = container.querySelector('h3');
                const statusBadge = container.querySelector('.w-1\\.5.h-1\\.5');
                const urlElement = container.querySelector('.text-xs.text-gray-600');
                const versionElements = container.querySelectorAll('.text-xs.text-gray-500');

                if (nameElement) nameElement.textContent = env.name;
                if (statusBadge) {
                    statusBadge.className = `w-1.5 h-1.5 rounded-full ${env.status === 'running' ? 'bg-green-500' : 'bg-red-500'}`;
                }
                if (urlElement) urlElement.textContent = env.url;
                if (versionElements[0]) versionElements[0].textContent = `版本: ${env.version}`;
                if (versionElements[1]) versionElements[1].textContent = `更新: ${env.lastDeploy}`;
            }
        });

        // 更新部署历史
        const historyContainer = document.querySelector('#projectDeployTab .overflow-x-auto tbody');
        if (historyContainer) {
            historyContainer.innerHTML = deployData.deployHistory.map(deploy => `
                <tr>
                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${deploy.env}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${deploy.version}</td>
                    <td class="px-4 py-2 whitespace-nowrap">
                        <span class="px-1.5 py-0.5 text-xs ${deploy.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full">
                            ${deploy.status === 'success' ? '成功' : '失败'}
                        </span>
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${deploy.time}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${deploy.duration}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${deploy.deployer}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-xs">
                        <button class="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                        <button class="text-green-600 hover:text-green-900">重新部署</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // 加载项目监控数据
    loadProjectMonitor() {
        console.log('加载项目监控数据');

        // 模拟监控数据
        const monitorData = {
            metrics: [
                { name: 'CPU使用率', value: '35%', trend: 'up', color: 'blue' },
                { name: '内存使用率', value: '58%', trend: 'stable', color: 'green' },
                { name: '磁盘使用率', value: '42%', trend: 'down', color: 'yellow' },
                { name: '网络带宽', value: '67%', trend: 'up', color: 'purple' }
            ],
            alerts: [
                { level: 'warning', message: 'API响应时间偏高', detail: '支付接口平均响应时间超过500ms', time: '10分钟前' },
                { level: 'info', message: '部署完成通知', detail: 'v2.1.2版本已成功部署到测试环境', time: '1小时前' },
                { level: 'success', message: '系统恢复正常', detail: '数据库连接已恢复正常', time: '2小时前' }
            ],
            performance: [
                { metric: '响应时间', current: '245ms', target: '<300ms', status: 'good' },
                { metric: '吞吐量', current: '1,234 req/min', target: '>1,000 req/min', status: 'good' },
                { metric: '错误率', current: '0.12%', target: '<0.5%', status: 'good' },
                { metric: '可用性', current: '99.95%', target: '>99.9%', status: 'excellent' }
            ],
            logs: [
                { level: 'INFO', message: 'User login successful', service: 'auth-service', time: '14:32:15' },
                { level: 'WARN', message: 'High memory usage detected', service: 'api-gateway', time: '14:31:42' },
                { level: 'ERROR', message: 'Database connection timeout', service: 'user-service', time: '14:30:18' },
                { level: 'INFO', message: 'Payment processed successfully', service: 'payment-service', time: '14:29:55' }
            ]
        };

        // 更新关键指标
        const metricsContainers = document.querySelectorAll('#projectMonitorTab .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 > div');
        const metricsMapping = [
            { name: '系统可用性', value: '99.8%', color: 'green' },
            { name: '响应时间', value: '180ms', color: 'blue' },
            { name: '错误率', value: '0.2%', color: 'yellow' },
            { name: '活跃用户', value: '856', color: 'purple' }
        ];

        metricsMapping.forEach((metric, index) => {
            if (metricsContainers[index]) {
                const container = metricsContainers[index];
                const nameElement = container.querySelector('.text-xs.text-gray-600');
                const valueElement = container.querySelector('.text-lg.font-bold');

                if (nameElement) nameElement.textContent = metric.name;
                if (valueElement) {
                    valueElement.textContent = metric.value;
                    valueElement.className = `text-lg font-bold text-${metric.color}-600`;
                }
            }
        });

        // 更新告警信息（保持现有的告警，只更新时间）
        const alertsContainer = document.querySelector('#projectMonitorTab .space-y-2');
        if (alertsContainer) {
            const existingAlerts = alertsContainer.querySelectorAll('.flex.items-start');
            if (existingAlerts.length >= 3) {
                // 更新第一个告警的时间
                const firstAlertTime = existingAlerts[0].querySelector('.text-xs.text-yellow-600');
                if (firstAlertTime) firstAlertTime.textContent = '10分钟前';

                // 更新第二个告警的时间
                const secondAlertTime = existingAlerts[1].querySelector('.text-xs.text-blue-600');
                if (secondAlertTime) secondAlertTime.textContent = '1小时前';

                // 更新第三个告警的时间
                const thirdAlertTime = existingAlerts[2].querySelector('.text-xs.text-green-600');
                if (thirdAlertTime) thirdAlertTime.textContent = '2小时前';
            }
        }

        // 更新系统资源数据
        const resourceBars = document.querySelectorAll('#projectMonitorTab .bg-gray-200 .h-1\\.5');
        const resourceValues = ['35%', '58%', '42%', '67%'];
        const resourceColors = ['bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600'];

        resourceBars.forEach((bar, index) => {
            if (index < resourceValues.length) {
                bar.style.width = resourceValues[index];
                bar.className = `${resourceColors[index]} h-1.5 rounded-full`;
            }
        });
    }

    // 加载项目团队数据
    loadProjectTeam() {
        console.log('加载项目团队数据');

        // 模拟团队数据
        const teamData = [
            {
                name: '张三',
                role: '前端开发工程师',
                avatar: '张',
                tasks: { completed: 8, total: 10 },
                commits: 45,
                hours: 120,
                score: 92,
                status: 'online'
            },
            {
                name: '李四',
                role: '后端开发工程师',
                avatar: '李',
                tasks: { completed: 6, total: 8 },
                commits: 32,
                hours: 98,
                score: 88,
                status: 'online'
            },
            {
                name: '王五',
                role: '测试工程师',
                avatar: '王',
                tasks: { completed: 5, total: 6 },
                commits: 0,
                testCases: 156,
                hours: 76,
                score: 95,
                status: 'away'
            },
            {
                name: '赵六',
                role: 'UI设计师',
                avatar: '赵',
                tasks: { completed: 4, total: 5 },
                designs: 28,
                hours: 64,
                score: 90,
                status: 'offline'
            },
            {
                name: '孙七',
                role: '产品经理',
                avatar: '孙',
                tasks: { completed: 7, total: 8 },
                documents: 12,
                hours: 85,
                score: 93,
                status: 'online'
            },
            {
                name: '周八',
                role: 'DevOps工程师',
                avatar: '周',
                tasks: { completed: 3, total: 4 },
                deployments: 15,
                hours: 72,
                score: 87,
                status: 'online'
            }
        ];

        // 更新团队成员列表
        const teamContainer = document.querySelector('#projectTeamTab .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
        if (teamContainer) {
            teamContainer.innerHTML = teamData.map(member => {
                const statusColor = member.status === 'online' ? 'bg-green-500' :
                                   member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400';

                // 根据角色显示不同的统计信息
                let extraStat = '';
                if (member.role.includes('测试')) {
                    extraStat = `
                        <div class="flex justify-between">
                            <span>测试用例</span>
                            <span class="text-gray-900 font-medium">${member.testCases}个</span>
                        </div>
                    `;
                } else if (member.role.includes('设计')) {
                    extraStat = `
                        <div class="flex justify-between">
                            <span>设计稿</span>
                            <span class="text-gray-900 font-medium">${member.designs}个</span>
                        </div>
                    `;
                } else if (member.role.includes('产品')) {
                    extraStat = `
                        <div class="flex justify-between">
                            <span>需求文档</span>
                            <span class="text-gray-900 font-medium">${member.documents}个</span>
                        </div>
                    `;
                } else if (member.role.includes('DevOps')) {
                    extraStat = `
                        <div class="flex justify-between">
                            <span>部署次数</span>
                            <span class="text-gray-900 font-medium">${member.deployments}次</span>
                        </div>
                    `;
                } else {
                    extraStat = `
                        <div class="flex justify-between">
                            <span>代码提交</span>
                            <span class="text-gray-900 font-medium">${member.commits}次</span>
                        </div>
                    `;
                }

                return `
                    <div class="border border-gray-200 rounded-lg p-3">
                        <div class="flex items-center space-x-2 mb-2">
                            <div class="relative">
                                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span class="text-xs">${member.avatar}</span>
                                </div>
                                <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColor} rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h4 class="text-xs font-medium text-gray-900">${member.name}</h4>
                                <p class="text-xs text-gray-600">${member.role}</p>
                            </div>
                        </div>
                        <div class="space-y-1 text-xs text-gray-600">
                            <div class="flex justify-between">
                                <span>完成任务</span>
                                <span class="text-gray-900 font-medium">${member.tasks.completed}/${member.tasks.total}</span>
                            </div>
                            ${extraStat}
                            <div class="flex justify-between">
                                <span>工作时长</span>
                                <span class="text-gray-900 font-medium">${member.hours}h</span>
                            </div>
                            <div class="flex justify-between">
                                <span>效率评分</span>
                                <span class="text-${member.score >= 90 ? 'green' : member.score >= 85 ? 'blue' : 'yellow'}-600 font-medium">${member.score}分</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 加载项目资源数据
    loadProjectResource() {
        console.log('加载项目资源数据');

        // 模拟AI编程工具数据更新
        const aiToolsData = {
            'GitHub Copilot': {
                usage: Math.floor(Math.random() * 50) + 150,
                codeGenerated: (Math.random() * 1 + 2).toFixed(1) + 'k',
                acceptanceRate: Math.floor(Math.random() * 10) + 75
            },
            'Claude Dev': {
                usage: Math.floor(Math.random() * 20) + 40,
                reviews: Math.floor(Math.random() * 10) + 15,
                adoptionRate: Math.floor(Math.random() * 10) + 80
            }
        };

        // 更新GitHub Copilot统计
        const copilotCard = document.querySelector('#projectResourceTab .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div:first-child');
        if (copilotCard) {
            const usageSpan = copilotCard.querySelector('.space-y-1 .flex:first-child span:last-child');
            const codeSpan = copilotCard.querySelector('.space-y-1 .flex:nth-child(2) span:last-child');
            const rateSpan = copilotCard.querySelector('.space-y-1 .flex:nth-child(3) span:last-child');

            if (usageSpan) usageSpan.textContent = `${aiToolsData['GitHub Copilot'].usage}次`;
            if (codeSpan) codeSpan.textContent = `${aiToolsData['GitHub Copilot'].codeGenerated}行`;
            if (rateSpan) rateSpan.textContent = `${aiToolsData['GitHub Copilot'].acceptanceRate}%`;
        }

        // 更新Claude Dev统计
        const claudeCard = document.querySelector('#projectResourceTab .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div:nth-child(2)');
        if (claudeCard) {
            const usageSpan = claudeCard.querySelector('.space-y-1 .flex:first-child span:last-child');
            const reviewSpan = claudeCard.querySelector('.space-y-1 .flex:nth-child(2) span:last-child');
            const adoptionSpan = claudeCard.querySelector('.space-y-1 .flex:nth-child(3) span:last-child');

            if (usageSpan) usageSpan.textContent = `${aiToolsData['Claude Dev'].usage}次`;
            if (reviewSpan) reviewSpan.textContent = `${aiToolsData['Claude Dev'].reviews}个PR`;
            if (adoptionSpan) adoptionSpan.textContent = `${aiToolsData['Claude Dev'].adoptionRate}%`;
        }

        // 模拟数据库资源数据更新
        const dbData = {
            mysql: {
                storage: Math.floor(Math.random() * 2) + 2,
                connections: Math.floor(Math.random() * 20) + 40,
                qps: Math.floor(Math.random() * 500) + 1000,
                latency: Math.floor(Math.random() * 10) + 10
            },
            redis: {
                memory: (Math.random() * 0.5 + 1).toFixed(1),
                connections: Math.floor(Math.random() * 10) + 20,
                hitRate: (Math.random() * 2 + 97).toFixed(1),
                latency: (Math.random() * 0.5 + 0.5).toFixed(1)
            }
        };

        // 更新MySQL统计
        const mysqlCard = document.querySelector('#projectResourceTab .space-y-3 > div:first-child');
        if (mysqlCard) {
            const storageDiv = mysqlCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:first-child .font-medium');
            const connectionsDiv = mysqlCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:nth-child(2) .font-medium');
            const qpsDiv = mysqlCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:nth-child(3) .font-medium');
            const latencyDiv = mysqlCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:nth-child(4) .font-medium');

            if (storageDiv) storageDiv.textContent = `${dbData.mysql.storage}.3GB / 10GB`;
            if (connectionsDiv) connectionsDiv.textContent = `${dbData.mysql.connections} / 200`;
            if (qpsDiv) qpsDiv.textContent = `${dbData.mysql.qps.toLocaleString()}`;
            if (latencyDiv) latencyDiv.textContent = `${dbData.mysql.latency}ms`;
        }

        // 更新Redis统计
        const redisCard = document.querySelector('#projectResourceTab .space-y-3 > div:nth-child(2)');
        if (redisCard) {
            const memoryDiv = redisCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:first-child .font-medium');
            const connectionsDiv = redisCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:nth-child(2) .font-medium');
            const hitRateDiv = redisCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:nth-child(3) .font-medium');
            const latencyDiv = redisCard.querySelector('.grid-cols-2.md\\:grid-cols-4 > div:nth-child(4) .font-medium');

            if (memoryDiv) memoryDiv.textContent = `${dbData.redis.memory}GB / 4GB`;
            if (connectionsDiv) connectionsDiv.textContent = `${dbData.redis.connections} / 100`;
            if (hitRateDiv) hitRateDiv.textContent = `${dbData.redis.hitRate}%`;
            if (latencyDiv) latencyDiv.textContent = `${dbData.redis.latency}ms`;
        }

        // 模拟其他应用资源数据更新
        const appResourcesData = {
            minio: {
                storage: Math.floor(Math.random() * 10) + 40,
                files: Math.floor(Math.random() * 2000) + 12000,
                access: Math.floor(Math.random() * 1000) + 8000
            },
            rabbitmq: {
                queues: Math.floor(Math.random() * 3) + 7,
                processing: Math.floor(Math.random() * 500) + 1000,
                backlog: Math.floor(Math.random() * 50) + 10
            },
            elasticsearch: {
                indices: Math.floor(Math.random() * 5) + 13,
                documents: (Math.random() * 0.5 + 2).toFixed(1),
                qps: Math.floor(Math.random() * 100) + 400
            },
            docker: {
                images: Math.floor(Math.random() * 10) + 30,
                storage: Math.floor(Math.random() * 5) + 10,
                pulls: Math.floor(Math.random() * 200) + 500
            }
        };

        // 更新MinIO统计
        const minioCard = document.querySelector('#projectResourceTab .grid-cols-1.md\\:grid-cols-2 > div:first-child');
        if (minioCard) {
            const storageSpan = minioCard.querySelector('.space-y-1 .flex:first-child span:last-child');
            const filesSpan = minioCard.querySelector('.space-y-1 .flex:nth-child(2) span:last-child');
            const accessSpan = minioCard.querySelector('.space-y-1 .flex:nth-child(3) span:last-child');

            if (storageSpan) storageSpan.textContent = `${appResourcesData.minio.storage}GB / 100GB`;
            if (filesSpan) filesSpan.textContent = appResourcesData.minio.files.toLocaleString();
            if (accessSpan) accessSpan.textContent = `${appResourcesData.minio.access.toLocaleString()}/天`;
        }

        // 更新RabbitMQ统计
        const rabbitmqCard = document.querySelector('#projectResourceTab .grid-cols-1.md\\:grid-cols-2 > div:nth-child(2)');
        if (rabbitmqCard) {
            const queuesSpan = rabbitmqCard.querySelector('.space-y-1 .flex:first-child span:last-child');
            const processingSpan = rabbitmqCard.querySelector('.space-y-1 .flex:nth-child(2) span:last-child');
            const backlogSpan = rabbitmqCard.querySelector('.space-y-1 .flex:nth-child(3) span:last-child');

            if (queuesSpan) queuesSpan.textContent = `${appResourcesData.rabbitmq.queues}个`;
            if (processingSpan) processingSpan.textContent = `${appResourcesData.rabbitmq.processing.toLocaleString()}/分钟`;
            if (backlogSpan) backlogSpan.textContent = `${appResourcesData.rabbitmq.backlog}条`;
        }

        // 更新Elasticsearch统计
        const esCard = document.querySelector('#projectResourceTab .grid-cols-1.md\\:grid-cols-2 > div:nth-child(3)');
        if (esCard) {
            const indicesSpan = esCard.querySelector('.space-y-1 .flex:first-child span:last-child');
            const documentsSpan = esCard.querySelector('.space-y-1 .flex:nth-child(2) span:last-child');
            const qpsSpan = esCard.querySelector('.space-y-1 .flex:nth-child(3) span:last-child');

            if (indicesSpan) indicesSpan.textContent = `${appResourcesData.elasticsearch.indices}个`;
            if (documentsSpan) documentsSpan.textContent = `${appResourcesData.elasticsearch.documents}M`;
            if (qpsSpan) qpsSpan.textContent = `${appResourcesData.elasticsearch.qps}/秒`;
        }

        // 更新Docker Registry统计
        const dockerCard = document.querySelector('#projectResourceTab .grid-cols-1.md\\:grid-cols-2 > div:nth-child(4)');
        if (dockerCard) {
            const imagesSpan = dockerCard.querySelector('.space-y-1 .flex:first-child span:last-child');
            const storageSpan = dockerCard.querySelector('.space-y-1 .flex:nth-child(2) span:last-child');
            const pullsSpan = dockerCard.querySelector('.space-y-1 .flex:nth-child(3) span:last-child');

            if (imagesSpan) imagesSpan.textContent = `${appResourcesData.docker.images}个`;
            if (storageSpan) storageSpan.textContent = `${appResourcesData.docker.storage}GB`;
            if (pullsSpan) pullsSpan.textContent = `${appResourcesData.docker.pulls}/天`;
        }
    }

    // 快捷操作方法
    quickCreateRequirement() {
        this.showPage('requirements');
        setTimeout(() => {
            document.getElementById('newRequirementBtn').click();
        }, 100);
    }

    quickViewRequirements() {
        this.showPage('requirements');
    }

    quickAIAnalysis() {
        this.showPage('requirements');
        setTimeout(() => {
            document.getElementById('newRequirementBtn').click();
            setTimeout(() => {
                document.getElementById('aiSplitBtn').scrollIntoView();
            }, 200);
        }, 100);
    }

    quickViewProjects() {
        this.showPage('projects');
    }

    quickApproveRequirements() {
        this.showPage('requirements');
        // 可以添加筛选逻辑显示待审批需求
    }

    quickTeamManagement() {
        this.showPage('projects');
        // 可以添加团队管理相关逻辑
    }

    quickDeployManagement() {
        this.showPage('projects');
        // 可以自动切换到部署标签页
    }

    quickMonitorCenter() {
        this.showPage('projects');
        // 可以自动切换到监控标签页
    }

    quickCodeManagement() {
        this.showPage('projects');
        // 可以自动切换到代码标签页
    }

    quickTechDecision() {
        this.showPage('projects');
    }

    quickCodeDevelopment() {
        this.showPage('projects');
    }

    quickAIProgramming() {
        this.showPage('projects');
        // 可以自动切换到代码标签页并聚焦AI工具
    }

    // 超级管理员专属快捷操作
    quickSystemManagement() {
        alert('🔧 系统管理功能\n\n• 用户权限管理\n• 系统配置设置\n• 数据库管理\n• 备份与恢复\n• 系统性能优化');
    }

    quickGlobalMonitor() {
        this.showPage('projects');
        // 显示全局监控面板
        setTimeout(() => {
            alert('📊 全局监控中心\n\n• 所有项目状态概览\n• 系统资源使用情况\n• 实时性能指标\n• 告警和通知管理\n• 用户活动监控');
        }, 100);
    }

    quickSecurityAudit() {
        alert('🛡️ 安全审计中心\n\n• 用户登录日志\n• 权限变更记录\n• 系统操作审计\n• 安全威胁检测\n• 合规性检查报告');
    }

    // 需求详情相关方法
    showRequirementDetail(requirementId) {
        // 隐藏需求列表，显示需求详情
        document.getElementById('requirementListView').classList.add('hidden');
        document.getElementById('requirementDetailView').classList.remove('hidden');

        // 加载需求详情数据
        this.loadRequirementDetail(requirementId);
    }

    showRequirementList() {
        // 隐藏需求详情，显示需求列表
        document.getElementById('requirementDetailView').classList.add('hidden');
        document.getElementById('requirementListView').classList.remove('hidden');
    }

    loadRequirementDetail(requirementId) {
        // 模拟需求数据
        const requirements = {
            1: {
                title: '用户登录功能优化',
                description: '优化现有的用户登录流程，提升用户体验。包括登录界面美化、登录速度优化、错误提示改进、记住密码功能等。需要支持多种登录方式，包括用户名密码、手机号验证码、第三方登录等。',
                priority: '高',
                status: '已完成',
                assignee: '张三',
                estimate: '16h',
                subRequirements: [
                    { id: 1, title: '登录界面UI优化', description: '美化登录页面设计，提升视觉效果', priority: '中', status: '已完成', estimate: '4h' },
                    { id: 2, title: '登录速度优化', description: '优化登录接口响应速度，减少等待时间', priority: '高', status: '已完成', estimate: '6h' },
                    { id: 3, title: '第三方登录集成', description: '集成微信、QQ等第三方登录方式', priority: '中', status: '已完成', estimate: '6h' }
                ]
            },
            2: {
                title: '支付模块重构',
                description: '重构现有支付模块，提升安全性和稳定性。支持多种支付方式，包括支付宝、微信支付、银行卡支付等。需要完善支付流程监控和异常处理机制。',
                priority: '中',
                status: '进行中',
                assignee: '李四',
                estimate: '32h',
                subRequirements: [
                    { id: 4, title: '支付接口重构', description: '重构支付核心接口，提升安全性', priority: '高', status: '进行中', estimate: '12h' },
                    { id: 5, title: '支付方式扩展', description: '新增更多支付方式支持', priority: '中', status: '待开始', estimate: '8h' },
                    { id: 6, title: '支付监控系统', description: '建立支付流程监控和报警机制', priority: '中', status: '待开始', estimate: '6h' },
                    { id: 7, title: '异常处理优化', description: '完善支付异常情况的处理逻辑', priority: '高', status: '待开始', estimate: '6h' }
                ]
            },
            3: {
                title: '商品推荐算法',
                description: '开发智能商品推荐算法，基于用户行为数据和商品特征，为用户推荐个性化商品。需要考虑推荐准确性、多样性和实时性。',
                priority: '低',
                status: '待开始',
                assignee: '王五',
                estimate: '24h',
                subRequirements: []
            }
        };

        const requirement = requirements[requirementId];
        if (requirement) {
            // 更新需求详情显示
            document.getElementById('requirementDetailTitle').textContent = requirement.title;
            document.getElementById('originalTitle').textContent = requirement.title;
            document.getElementById('originalDescription').textContent = requirement.description;
            document.getElementById('originalAssignee').textContent = requirement.assignee;
            document.getElementById('originalEstimate').textContent = requirement.estimate;

            // 更新优先级显示
            const priorityElement = document.getElementById('originalPriority');
            const priorityClass = requirement.priority === '高' ? 'bg-red-100 text-red-800' :
                                 requirement.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                                 'bg-green-100 text-green-800';
            priorityElement.innerHTML = `<span class="px-1.5 py-0.5 text-xs ${priorityClass} rounded-full">${requirement.priority}</span>`;

            // 更新状态显示
            const statusElement = document.getElementById('originalStatus');
            const statusClass = requirement.status === '已完成' ? 'bg-green-100 text-green-800' :
                               requirement.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                               'bg-gray-100 text-gray-800';
            statusElement.innerHTML = `<span class="px-1.5 py-0.5 text-xs ${statusClass} rounded-full">${requirement.status}</span>`;

            // 加载子需求列表
            this.loadSubRequirements(requirement.subRequirements);

            // 显示或隐藏转为研发任务按钮
            this.updateConvertToTasksButton(requirement.subRequirements);

            // 存储当前需求ID
            this.currentRequirementId = requirementId;
        }
    }

    loadSubRequirements(subRequirements) {
        const container = document.getElementById('subRequirementsList');

        if (subRequirements.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <p class="text-xs">暂无子需求</p>
                    <p class="text-xs mt-1">点击上方按钮添加或使用AI拆分</p>
                </div>
            `;
            return;
        }

        container.innerHTML = subRequirements.map(sub => `
            <div class="border border-gray-200 rounded-lg p-3">
                <div class="flex justify-between items-start mb-2">
                    <h5 class="text-xs font-medium text-gray-900">${sub.title}</h5>
                    <div class="flex space-x-1">
                        <span class="px-1.5 py-0.5 text-xs ${sub.priority === '高' ? 'bg-red-100 text-red-800' :
                                                            sub.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'} rounded-full">${sub.priority}</span>
                        <span class="px-1.5 py-0.5 text-xs ${sub.status === '已完成' ? 'bg-green-100 text-green-800' :
                                                            sub.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'} rounded-full">${sub.status}</span>
                    </div>
                </div>
                <p class="text-xs text-gray-600 mb-2">${sub.description}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>预估工时: ${sub.estimate}</span>
                    <div class="space-x-1">
                        <button class="text-blue-600 hover:text-blue-900">编辑</button>
                        <button class="text-red-600 hover:text-red-900">删除</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // AI辅助拆分需求
    async aiSplitRequirement() {
        const aiButton = document.getElementById('aiSplitRequirementBtn');
        const originalText = aiButton.textContent;

        // 显示加载状态
        aiButton.textContent = '分析中...';
        aiButton.disabled = true;

        // 模拟AI分析过程
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 生成AI拆分建议
        const suggestions = this.generateAISplitSuggestions();

        // 显示拆分结果
        this.showAISplitResult(suggestions);

        // 恢复按钮状态
        aiButton.textContent = originalText;
        aiButton.disabled = false;
    }

    generateAISplitSuggestions() {
        // 根据当前需求生成AI拆分建议
        const suggestions = [
            {
                title: '前端界面开发',
                description: '开发用户界面相关功能，包括页面布局、交互效果等',
                priority: '高',
                estimate: '8h'
            },
            {
                title: '后端接口开发',
                description: '开发服务端API接口，处理业务逻辑',
                priority: '高',
                estimate: '12h'
            },
            {
                title: '数据库设计',
                description: '设计和优化数据库表结构',
                priority: '中',
                estimate: '4h'
            },
            {
                title: '测试用例编写',
                description: '编写单元测试和集成测试用例',
                priority: '中',
                estimate: '6h'
            },
            {
                title: '文档编写',
                description: '编写技术文档和用户手册',
                priority: '低',
                estimate: '4h'
            }
        ];

        return suggestions;
    }

    showAISplitResult(suggestions) {
        const resultContainer = document.getElementById('aiSplitRequirementResult');
        const suggestionsContainer = document.getElementById('aiSplitRequirementSuggestions');

        suggestionsContainer.innerHTML = suggestions.map((item, index) => `
            <div class="border border-blue-200 rounded p-2">
                <div class="flex justify-between items-start mb-1">
                    <h6 class="text-xs font-medium text-blue-900">${item.title}</h6>
                    <div class="flex space-x-1">
                        <span class="text-xs px-1.5 py-0.5 ${item.priority === '高' ? 'bg-red-100 text-red-800' :
                                                            item.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'} rounded">${item.priority}</span>
                        <span class="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">${item.estimate}</span>
                    </div>
                </div>
                <p class="text-xs text-blue-700">${item.description}</p>
            </div>
        `).join('');

        resultContainer.classList.remove('hidden');

        // 存储AI建议
        this.currentAISuggestions = suggestions;
    }

    acceptAISplit() {
        if (this.currentAISuggestions) {
            // 将AI建议转换为子需求
            const subRequirements = this.currentAISuggestions.map((suggestion, index) => ({
                id: Date.now() + index,
                title: suggestion.title,
                description: suggestion.description,
                priority: suggestion.priority,
                status: '待开始',
                estimate: suggestion.estimate
            }));

            // 更新子需求列表
            this.loadSubRequirements(subRequirements);

            // 隐藏AI拆分结果
            this.cancelAISplit();

            console.log('已采用AI拆分建议');
        }
    }

    cancelAISplit() {
        document.getElementById('aiSplitRequirementResult').classList.add('hidden');
        this.currentAISuggestions = null;
    }

    // 更新转为研发任务按钮的显示状态
    updateConvertToTasksButton(subRequirements) {
        const convertSection = document.getElementById('convertToTasksSection');

        // 如果有子需求，显示转为研发任务按钮
        if (subRequirements && subRequirements.length > 0) {
            convertSection.classList.remove('hidden');
        } else {
            convertSection.classList.add('hidden');
        }
    }

    // 转为研发任务（从需求列表）
    convertRequirementToTasks(requirementId) {
        // 模拟需求数据
        const requirements = {
            1: {
                title: '用户登录功能优化',
                subRequirements: [
                    { id: 1, title: '登录界面UI优化', description: '美化登录页面设计，提升视觉效果', priority: '中', status: '已完成', estimate: '4h' },
                    { id: 2, title: '登录速度优化', description: '优化登录接口响应速度，减少等待时间', priority: '高', status: '已完成', estimate: '6h' },
                    { id: 3, title: '第三方登录集成', description: '集成微信、QQ等第三方登录方式', priority: '中', status: '已完成', estimate: '6h' }
                ]
            },
            2: {
                title: '支付模块重构',
                subRequirements: [
                    { id: 4, title: '支付接口重构', description: '重构支付核心接口，提升安全性', priority: '高', status: '进行中', estimate: '12h' },
                    { id: 5, title: '支付方式扩展', description: '新增更多支付方式支持', priority: '中', status: '待开始', estimate: '8h' },
                    { id: 6, title: '支付监控系统', description: '建立支付流程监控和报警机制', priority: '中', status: '待开始', estimate: '6h' },
                    { id: 7, title: '异常处理优化', description: '完善支付异常情况的处理逻辑', priority: '高', status: '待开始', estimate: '6h' }
                ]
            }
        };

        const requirement = requirements[requirementId];
        if (requirement && requirement.subRequirements.length > 0) {
            this.convertSubRequirementsToTasks(requirement.subRequirements, requirement.title);
        } else {
            alert('该需求尚未拆分，无法转为研发任务');
        }
    }

    // 转为研发任务（从需求详情页面）
    convertToTasks() {
        const subRequirements = this.getCurrentSubRequirements();
        if (subRequirements.length > 0) {
            const requirementTitle = document.getElementById('requirementDetailTitle').textContent;
            this.convertSubRequirementsToTasks(subRequirements, requirementTitle);
        } else {
            alert('请先拆分需求再转为研发任务');
        }
    }

    // 将子需求转换为研发任务
    convertSubRequirementsToTasks(subRequirements, parentTitle) {
        // 显示确认对话框
        const confirmed = confirm(`确定要将"${parentTitle}"的${subRequirements.length}个子需求转为研发任务吗？`);
        if (!confirmed) return;

        // 模拟转换过程
        const tasks = subRequirements.map(sub => ({
            id: Date.now() + Math.random(),
            title: sub.title,
            description: sub.description,
            priority: sub.priority,
            status: sub.status === '已完成' ? '已完成' : '待开始',
            assignee: this.getRandomAssignee(),
            estimate: sub.estimate,
            parentRequirement: parentTitle
        }));

        // 添加到开发任务列表
        this.addTasksToList(tasks);

        // 显示成功消息
        alert(`成功转换${tasks.length}个研发任务！请切换到"开发任务"模块查看。`);

        // 可选：自动切换到开发任务模块
        this.switchDevModule('tasks');
    }

    // 获取随机负责人
    getRandomAssignee() {
        const assignees = ['张三', '李四', '王五', '赵六'];
        return assignees[Math.floor(Math.random() * assignees.length)];
    }

    addSubRequirement() {
        // 创建简单的添加子需求对话框
        const title = prompt('请输入子需求标题:');
        if (!title) return;

        const description = prompt('请输入子需求描述:');
        if (!description) return;

        const priority = prompt('请输入优先级 (高/中/低):', '中');
        const estimate = prompt('请输入预估工时 (如: 4h):', '4h');

        // 创建新的子需求
        const newSubRequirement = {
            id: Date.now(),
            title: title,
            description: description,
            priority: priority || '中',
            status: '待开始',
            estimate: estimate || '4h'
        };

        // 获取当前子需求列表
        const container = document.getElementById('subRequirementsList');
        const currentSubRequirements = this.getCurrentSubRequirements();

        // 添加新需求
        currentSubRequirements.push(newSubRequirement);

        // 重新加载列表
        this.loadSubRequirements(currentSubRequirements);

        console.log('已添加新的子需求:', newSubRequirement);
    }

    getCurrentSubRequirements() {
        // 从当前需求ID获取子需求数据
        if (!this.currentRequirementId) return [];

        const requirements = {
            1: [
                { id: 1, title: '登录界面UI优化', description: '美化登录页面设计，提升视觉效果', priority: '中', status: '已完成', estimate: '4h' },
                { id: 2, title: '登录速度优化', description: '优化登录接口响应速度，减少等待时间', priority: '高', status: '已完成', estimate: '6h' },
                { id: 3, title: '第三方登录集成', description: '集成微信、QQ等第三方登录方式', priority: '中', status: '已完成', estimate: '6h' }
            ],
            2: [
                { id: 4, title: '支付接口重构', description: '重构支付核心接口，提升安全性', priority: '高', status: '进行中', estimate: '12h' },
                { id: 5, title: '支付方式扩展', description: '新增更多支付方式支持', priority: '中', status: '待开始', estimate: '8h' },
                { id: 6, title: '支付监控系统', description: '建立支付流程监控和报警机制', priority: '中', status: '待开始', estimate: '6h' },
                { id: 7, title: '异常处理优化', description: '完善支付异常情况的处理逻辑', priority: '高', status: '待开始', estimate: '6h' }
            ],
            3: []
        };

        return requirements[this.currentRequirementId] || [];
    }

    // 添加任务到开发任务列表
    addTasksToList(tasks) {
        // 逐个添加任务到列表
        tasks.forEach(task => {
            this.addTaskToList(task);
        });

        console.log('已添加任务到列表:', tasks);
    }

    // 开发模块相关方法
    switchDevModule(moduleName) {
        // 隐藏所有开发模块
        document.querySelectorAll('.dev-module').forEach(module => {
            module.classList.add('hidden');
        });

        // 移除所有模块按钮的活跃状态
        document.querySelectorAll('.dev-module-btn').forEach(btn => {
            btn.classList.remove('border-gray-900', 'text-gray-900');
            btn.classList.add('border-transparent', 'text-gray-500');
        });

        // 显示选中的模块
        const targetModule = document.getElementById(`${moduleName}Module`);
        if (targetModule) {
            targetModule.classList.remove('hidden');
        }

        // 激活选中的模块按钮
        const activeBtn = document.querySelector(`[data-module="${moduleName}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('border-transparent', 'text-gray-500');
            activeBtn.classList.add('border-gray-900', 'text-gray-900');
        }

        // 如果是需求模块，确保显示需求列表视图
        if (moduleName === 'requirements') {
            this.showRequirementList();
        } else if (moduleName === 'tasks') {
            this.showTaskList();
        }
    }

    loadProjectDevelopment() {
        console.log('加载项目开发数据');
        // 默认显示需求模块
        this.switchDevModule('requirements');

        // 初始化一些示例开发任务（如果任务列表为空）
        const tasksList = document.getElementById('tasksList');
        if (tasksList && tasksList.children.length === 1 && tasksList.children[0].children.length === 1) {
            // 添加一些示例任务
            const sampleTasks = [
                {
                    id: 1001,
                    name: '登录界面UI优化',
                    description: '美化登录页面设计，提升视觉效果',
                    priority: '中',
                    status: '开发中',
                    assignee: '张三',
                    estimate: '4h'
                },
                {
                    id: 1002,
                    name: '支付接口重构',
                    description: '重构支付核心接口，提升安全性',
                    priority: '高',
                    status: '待开始',
                    assignee: '李四',
                    estimate: '12h'
                }
            ];

            // 清空默认的空状态提示
            tasksList.innerHTML = '';

            // 添加示例任务
            sampleTasks.forEach(task => {
                this.addTaskToList(task);
            });
        }
    }

    // 开发任务相关方法
    showTaskList() {
        document.getElementById('taskDetailView').classList.add('hidden');
        document.getElementById('taskListView').classList.remove('hidden');
    }

    showTaskDetail(taskId) {
        document.getElementById('taskListView').classList.add('hidden');
        document.getElementById('taskDetailView').classList.remove('hidden');
        this.loadTaskDetail(taskId);
    }

    convertToTask(subRequirementId) {
        // 将子需求转换为开发任务
        console.log('转换子需求为开发任务:', subRequirementId);

        // 这里应该从子需求数据中获取信息
        const task = {
            id: Date.now(),
            name: '登录界面UI优化', // 从子需求获取
            description: '美化登录页面设计，提升视觉效果',
            priority: '中',
            status: '待开始',
            assignee: '张三',
            estimate: '4h',
            sourceRequirementId: this.currentRequirementId,
            sourceSubRequirementId: subRequirementId
        };

        // 添加到开发任务列表
        this.addTaskToList(task);

        // 切换到开发任务模块
        this.switchDevModule('tasks');

        alert('子需求已成功转换为开发任务！');
    }

    addTaskToList(task) {
        const tbody = document.getElementById('tasksList');

        // 如果是第一个任务，清除空状态提示
        if (tbody.children.length === 1 && tbody.children[0].children.length === 1) {
            tbody.innerHTML = '';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${task.title || task.name}</td>
            <td class="px-4 py-2 whitespace-nowrap">
                <span class="px-1.5 py-0.5 text-xs ${task.priority === '高' ? 'bg-red-100 text-red-800' :
                                                    task.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'} rounded-full">${task.priority}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
                <span class="px-1.5 py-0.5 text-xs ${task.status === '已完成' ? 'bg-green-100 text-green-800' :
                                                    task.status === '开发中' ? 'bg-blue-100 text-blue-800' :
                                                    task.status === '配置中' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-gray-100 text-gray-800'} rounded-full">${task.status}</span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${task.assignee}</td>
            <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-900">${task.estimate}</td>
            <td class="px-4 py-2 whitespace-nowrap text-xs">
                <button onclick="app.showDevConfig(${task.id})" class="text-blue-600 hover:text-blue-900 mr-2">开始开发</button>
                <button onclick="app.showTaskDetail(${task.id})" class="text-green-600 hover:text-green-900">查看</button>
            </td>
        `;

        tbody.appendChild(row);
    }

    // 开发配置弹窗相关方法
    showDevConfig(taskId) {
        this.currentTaskId = taskId;

        // 显示任务信息
        const taskInfo = document.getElementById('configTaskInfo');
        taskInfo.innerHTML = `
            <div class="text-xs">
                <p><strong>任务名称:</strong> 登录界面UI优化</p>
                <p><strong>优先级:</strong> 中</p>
                <p><strong>预估工时:</strong> 4h</p>
                <p><strong>描述:</strong> 美化登录页面设计，提升视觉效果</p>
            </div>
        `;

        // 显示弹窗
        document.getElementById('devConfigModal').classList.remove('hidden');
    }

    closeDevConfigModal() {
        document.getElementById('devConfigModal').classList.add('hidden');
        this.currentTaskId = null;
    }

    togglePromptMethod(method) {
        const manualArea = document.getElementById('manualPromptArea');
        const aiArea = document.getElementById('aiPromptArea');

        if (method === 'manual') {
            manualArea.classList.remove('hidden');
            aiArea.classList.add('hidden');
        } else {
            manualArea.classList.add('hidden');
            aiArea.classList.remove('hidden');
        }
    }

    async generateAIPrompt() {
        const button = document.getElementById('generateAIPrompt');
        const originalText = button.textContent;

        button.textContent = '生成中...';
        button.disabled = true;

        // 模拟AI生成过程
        await new Promise(resolve => setTimeout(resolve, 2000));

        const generatedPrompt = `基于需求"登录界面UI优化"，请执行以下开发任务：

1. 分析当前登录页面的UI设计
2. 优化页面布局和视觉效果
3. 改进用户交互体验
4. 确保响应式设计兼容性
5. 测试并验证改进效果

请使用现代化的设计原则，注重用户体验和视觉美观。`;

        document.getElementById('aiGeneratedPrompt').value = generatedPrompt;
        document.getElementById('generatedPrompt').classList.remove('hidden');

        button.textContent = originalText;
        button.disabled = false;
    }

    startDevelopment() {
        // 获取配置信息
        const promptMethod = document.querySelector('input[name="promptMethod"]:checked').value;
        const prompt = promptMethod === 'manual' ?
            document.getElementById('manualPrompt').value :
            document.getElementById('aiGeneratedPrompt').value;

        const selectedTools = Array.from(document.querySelectorAll('input[name="devTools"]:checked'))
            .map(cb => cb.value);

        const customTool = document.getElementById('customTool').value;
        if (customTool) {
            selectedTools.push(customTool);
        }

        const projectPath = document.getElementById('projectPath').value;
        const branchInfo = document.getElementById('branchInfo').value;

        // 验证配置
        if (!prompt.trim()) {
            alert('请输入或生成开发prompt');
            return;
        }

        if (selectedTools.length === 0) {
            alert('请选择至少一个开发工具');
            return;
        }

        // 启动开发流程
        this.launchDevelopment({
            taskId: this.currentTaskId,
            prompt: prompt,
            tools: selectedTools,
            projectPath: projectPath,
            branch: branchInfo
        });

        this.closeDevConfigModal();
    }

    launchDevelopment(config) {
        console.log('启动开发流程:', config);

        // 更新任务状态为"开发中"
        this.updateTaskStatus(config.taskId, '开发中');

        // 显示开发详情页面
        this.showTaskDetail(config.taskId);

        // 模拟开发过程
        this.simulateDevelopmentProcess(config);
    }

    updateTaskStatus(taskId, status) {
        // 更新任务列表中的状态显示
        // 这里简化处理，实际应该更新数据源
        console.log(`任务 ${taskId} 状态更新为: ${status}`);
    }

    async loadTaskDetail(taskId) {
        const content = document.getElementById('taskDetailContent');

        content.innerHTML = `
            <div class="flex h-full" id="resizableLayout" style="height: 600px;">
                <!-- 左侧：文件浏览器 -->
                <div class="flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200" id="leftPanel" style="width: 300px; height: 100%;">
                    <div class="p-3 border-b border-gray-200 bg-gray-50">
                        <h5 class="text-xs font-semibold text-gray-900">文件浏览器</h5>
                    </div>
                    <div id="fileTreeContainer" style="height: calc(100% - 45px);"></div>
                </div>

                <!-- 左侧分隔条 -->
                <div class="resizer" id="leftResizer" style="width: 4px; cursor: col-resize; background-color: #e5e7eb; position: relative;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 2px; height: 20px; background-color: #9ca3af; border-radius: 1px;"></div>
                </div>

                <!-- 中间：代码编辑器 -->
                <div class="flex-1 flex flex-col" id="centerPanel" style="min-width: 400px;">
                    <!-- 编辑器工具栏 -->
                    <div class="bg-white rounded-t-lg border border-gray-200 border-b-0">
                        <!-- 第一行：文件标签和操作按钮 -->
                        <div class="flex items-center justify-between p-2 border-b border-gray-200">
                            <div class="flex items-center space-x-2">
                                <span id="currentFileTab" class="text-xs font-medium text-gray-900">Login.jsx</span>
                                <span class="text-xs text-gray-500">●</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <!-- 操作控制按钮 -->
                                <button onclick="app.pauseDevelopment()" class="toolbar-btn bg-blue-100 text-blue-700 hover:bg-blue-200" title="暂停开发">
                                    <span>⏸️</span>
                                    <span>暂停</span>
                                </button>
                                <button onclick="app.restartDevelopment()" class="toolbar-btn bg-green-100 text-green-700 hover:bg-green-200" title="重启任务">
                                    <span>🔄</span>
                                    <span>重启</span>
                                </button>
                                <button onclick="app.terminateDevelopment()" class="toolbar-btn bg-red-100 text-red-700 hover:bg-red-200" title="终止任务">
                                    <span>⏹️</span>
                                    <span>终止</span>
                                </button>

                                <!-- 分隔线 -->
                                <div class="w-px h-4 bg-gray-300 mx-1"></div>

                                <!-- 代码审查按钮 -->
                                <button onclick="app.toggleDiffMode()" id="diffModeBtn" class="toolbar-btn bg-blue-200 text-blue-800 hover:bg-blue-300" title="切换Diff模式">
                                    <span>📊</span>
                                    <span>Diff</span>
                                </button>
                                <button onclick="app.acceptAllChanges()" class="toolbar-btn bg-green-100 text-green-700 hover:bg-green-200" title="接受所有更改">
                                    <span>✅</span>
                                    <span>接受全部</span>
                                </button>
                                <button onclick="app.rejectAllChanges()" class="toolbar-btn bg-red-100 text-red-700 hover:bg-red-200" title="拒绝所有更改">
                                    <span>❌</span>
                                    <span>拒绝全部</span>
                                </button>

                                <!-- 分隔线 -->
                                <div class="w-px h-4 bg-gray-300 mx-1"></div>

                                <!-- 文件操作按钮 -->
                                <button onclick="app.saveCurrentFile()" class="toolbar-btn bg-blue-600 text-white hover:bg-blue-700" title="保存文件">
                                    <span>💾</span>
                                    <span>保存</span>
                                </button>
                                <button onclick="app.commitChanges()" class="toolbar-btn bg-purple-600 text-white hover:bg-purple-700" title="提交更改">
                                    <span>📤</span>
                                    <span>提交</span>
                                </button>

                                <!-- 分隔线 -->
                                <div class="w-px h-4 bg-gray-300 mx-1"></div>

                                <!-- 布局重置按钮 -->
                                <button onclick="app.resetLayoutToDefault()" class="toolbar-btn bg-gray-100 text-gray-700 hover:bg-gray-200" title="重置布局 (Ctrl+R)">
                                    <span>🔄</span>
                                    <span>重置布局</span>
                                </button>
                            </div>
                        </div>

                        <!-- 第二行：审查进度和统计信息 -->
                        <div class="flex items-center justify-between p-2 bg-gray-50 text-xs">
                            <!-- 左侧：统计指标 -->
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-600">新增:</span>
                                    <span class="text-green-600 font-medium">+12</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-600">删除:</span>
                                    <span class="text-red-600 font-medium">-5</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-600">文件:</span>
                                    <span class="text-blue-600 font-medium">3</span>
                                </div>
                                <div class="w-px h-3 bg-gray-300"></div>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-600">已接受:</span>
                                    <span id="acceptedChanges" class="text-green-600 font-medium">0</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-600">已拒绝:</span>
                                    <span id="rejectedChanges" class="text-red-600 font-medium">0</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-600">待审查:</span>
                                    <span id="pendingChanges" class="text-yellow-600 font-medium">3</span>
                                </div>
                            </div>

                            <!-- 右侧：审查进度 -->
                            <div class="flex items-center space-x-3">
                                <span class="text-gray-600">审查进度:</span>
                                <div class="flex items-center space-x-2">
                                    <div class="w-24 bg-gray-200 rounded-full h-1.5">
                                        <div id="reviewProgressBar" class="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style="width: 0%"></div>
                                    </div>
                                    <span id="reviewProgress" class="text-gray-900 font-medium min-w-8">0%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 编辑器主体 -->
                    <div class="bg-white border border-gray-200 border-t-0 rounded-b-lg flex flex-col flex-1">
                            <!-- 普通编辑模式 -->
                            <div id="normalEditorContainer" class="flex-1 monaco-editor-container hidden"></div>

                            <!-- Diff编辑模式 -->
                            <div id="diffEditorContainer" class="flex-1 monaco-editor-container">
                                <!-- Diff模式下的更改操作面板 -->
                                <div id="diffActionsPanel" class="absolute top-2 right-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                                    <div class="flex flex-col space-y-1">
                                        <button onclick="app.acceptChange(this)" class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                                            ✅ 接受此更改
                                        </button>
                                        <button onclick="app.rejectChange(this)" class="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                                            ❌ 拒绝此更改
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧分隔条 -->
                <div class="resizer" id="rightResizer" style="width: 4px; cursor: col-resize; background-color: #e5e7eb; position: relative;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 2px; height: 20px; background-color: #9ca3af; border-radius: 1px;"></div>
                </div>

                <!-- 右侧：执行监控 -->
                <div class="flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200" id="rightPanel" style="width: 300px; height: 100%;">
                    <div class="p-3 border-b border-gray-200 bg-gray-50">
                        <h5 class="text-xs font-semibold text-gray-900">执行监控</h5>
                    </div>
                    <div class="p-3 h-full overflow-auto">
                        <!-- 执行状态 -->
                        <div class="mb-4">
                            <h6 class="text-xs font-medium text-gray-700 mb-2">当前状态</h6>
                            <div class="space-y-2">
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-xs text-gray-700">环境初始化完成</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span class="text-xs text-gray-700">正在分析代码结构</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <span class="text-xs text-gray-500">等待执行UI优化</span>
                                </div>
                            </div>
                        </div>

                        <!-- 执行日志 -->
                        <div>
                            <h6 class="text-xs font-medium text-gray-700 mb-2">执行日志</h6>
                            <div class="bg-gray-900 text-green-400 font-mono text-xs p-3 rounded h-80 overflow-auto">
                                <div>[10:30:15] 开始分析登录组件...</div>
                                <div>[10:30:16] 检测到React组件结构</div>
                                <div>[10:30:17] 分析CSS样式文件...</div>
                                <div>[10:30:18] 发现可优化的UI元素</div>
                                <div class="text-yellow-400">[10:30:19] 正在生成优化建议...</div>
                                <div class="animate-pulse text-blue-400">[10:30:20] 执行中...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 初始化代码编辑器和文件树
        await this.initializeCodeEditor();

        // 初始化可调整大小的布局
        this.initializeResizableLayout();

        // 初始化键盘快捷键
        this.initializeKeyboardShortcuts();

        // 添加模态框到页面
        this.addModalsToPage();
    }

    // 切换可折叠面板
    toggleCollapse(panelId) {
        const content = document.getElementById(panelId + 'Content');
        const toggle = document.getElementById(panelId + 'Toggle');

        if (content && toggle) {
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                toggle.classList.remove('collapsed');
            } else {
                content.classList.remove('expanded');
                content.classList.add('collapsed');
                toggle.classList.add('collapsed');
            }
        }
    }

    // 初始化代码编辑器
    async initializeCodeEditor() {
        try {
            // 初始化Monaco Editor
            await window.codeEditor.initialize();

            // 初始化文件树
            window.fileTree.initialize('fileTreeContainer');

            // 创建普通编辑器
            window.codeEditor.createEditor('normalEditorContainer', {
                value: '// 请从左侧文件树选择文件进行编辑',
                language: 'javascript',
                theme: 'vs-dark'
            });

            // 初始化更改跟踪
            window.codeEditor.initializeChangeTracking();

            // 默认加载Login.jsx文件
            setTimeout(() => {
                window.fileTree.openFile('src/components/Login.jsx');
                // 渲染行级装饰
                setTimeout(() => {
                    window.codeEditor.renderLineDecorations();
                    // 默认切换到Diff模式
                    this.toggleDiffMode();
                }, 200);
            }, 500);

        } catch (error) {
            console.error('初始化代码编辑器失败:', error);
        }
    }

    // 切换Diff模式
    toggleDiffMode() {
        const normalContainer = document.getElementById('normalEditorContainer');
        const diffContainer = document.getElementById('diffEditorContainer');
        const diffBtn = document.getElementById('diffModeBtn');

        if (normalContainer.classList.contains('hidden')) {
            // 切换到普通模式
            normalContainer.classList.remove('hidden');
            diffContainer.classList.add('hidden');
            diffBtn.classList.remove('bg-blue-200', 'text-blue-800');
            diffBtn.classList.add('bg-gray-100', 'text-gray-700');

            if (window.codeEditor.diffEditor) {
                window.codeEditor.diffEditor.dispose();
                window.codeEditor.diffEditor = null;
            }
        } else {
            // 切换到Diff模式
            normalContainer.classList.add('hidden');
            diffContainer.classList.remove('hidden');
            diffBtn.classList.remove('bg-gray-100', 'text-gray-700');
            diffBtn.classList.add('bg-blue-200', 'text-blue-800');

            // 创建Diff编辑器
            const originalContent = window.codeEditor.getCurrentContent();
            const modifiedContent = this.getModifiedContent(originalContent);

            window.codeEditor.createDiffEditor('diffEditorContainer', originalContent, modifiedContent);

            // 显示更改操作面板
            document.getElementById('diffActionsPanel').classList.remove('hidden');
        }
    }

    // 获取修改后的内容（模拟）
    getModifiedContent(originalContent) {
        // 这里模拟一些修改
        return originalContent.replace(
            'placeholder="邮箱"',
            'placeholder="请输入邮箱地址"'
        ).replace(
            'placeholder="密码"',
            'placeholder="请输入密码"'
        ).replace(
            'className="login-btn"',
            'className="login-btn btn-primary"'
        );
    }

    // 开发控制方法
    pauseDevelopment() {
        console.log('暂停开发任务');
        alert('开发任务已暂停');
        // 这里可以添加暂停开发的逻辑
    }

    restartDevelopment() {
        console.log('重启开发任务');
        alert('开发任务已重启');
        // 这里可以添加重启开发的逻辑
    }

    terminateDevelopment() {
        if (confirm('确定要终止开发任务吗？此操作不可撤销。')) {
            console.log('终止开发任务');
            alert('开发任务已终止');
            // 这里可以添加终止开发的逻辑
        }
    }

    // 代码更改审查方法
    acceptAllChanges() {
        if (confirm('确定要接受所有代码更改吗？')) {
            console.log('接受所有更改');

            // 通过代码编辑器接受所有更改
            if (window.codeEditor && window.codeEditor.changes) {
                window.codeEditor.changes.forEach((change, id) => {
                    window.codeEditor.acceptChange(id);
                });
                alert('已接受所有代码更改');
            }
        }
    }

    rejectAllChanges() {
        if (confirm('确定要拒绝所有代码更改吗？')) {
            console.log('拒绝所有更改');

            // 通过代码编辑器拒绝所有更改
            if (window.codeEditor && window.codeEditor.changes) {
                window.codeEditor.changes.forEach((change, id) => {
                    window.codeEditor.rejectChange(id);
                });
                alert('已拒绝所有代码更改');
            }
        }
    }

    acceptChange(element) {
        console.log('接受单个更改');
        // 这里可以添加接受单个更改的逻辑
        alert('已接受此更改');
    }

    rejectChange(element) {
        console.log('拒绝单个更改');
        // 这里可以添加拒绝单个更改的逻辑
        alert('已拒绝此更改');
    }

    // 提交更改
    commitChanges() {
        if (!window.codeEditor) {
            alert('代码编辑器未初始化');
            return;
        }

        const acceptedChanges = window.codeEditor.getAcceptedChanges();
        if (acceptedChanges.length === 0) {
            alert('没有已接受的更改可以提交');
            return;
        }

        if (confirm(`确定要提交 ${acceptedChanges.length} 个已接受的更改吗？`)) {
            console.log('提交代码更改:', acceptedChanges);

            // 模拟提交过程
            const commitMessage = prompt('请输入提交信息:', '优化登录界面UI和用户体验');
            if (commitMessage) {
                // 这里可以添加实际的Git提交逻辑
                alert(`代码更改已提交\n提交信息: ${commitMessage}\n更改数量: ${acceptedChanges.length}`);

                // 重置更改状态
                this.resetChanges();
            }
        }
    }

    // 重置更改状态
    resetChanges() {
        if (window.codeEditor) {
            // 清空所有更改
            window.codeEditor.changes.clear();
            window.codeEditor.changeStatus.clear();
            window.codeEditor.lineChanges.clear();

            // 重新初始化更改跟踪
            window.codeEditor.initializeChangeTracking();

            // 重新渲染行级装饰
            window.codeEditor.renderLineDecorations();
        }
    }

    // 更新更改统计
    updateChangeStats(accepted, rejected, pending) {
        document.getElementById('acceptedChanges').textContent = accepted;
        document.getElementById('rejectedChanges').textContent = rejected;
        document.getElementById('pendingChanges').textContent = pending;

        const total = accepted + rejected + pending;
        const progress = total > 0 ? Math.round((accepted + rejected) / total * 100) : 0;

        document.getElementById('reviewProgress').textContent = progress + '%';
        document.getElementById('reviewProgressBar').style.width = progress + '%';
    }

    // 注意：updateChangesList方法已删除，因为更改列表面板已被移除

    // 保存当前文件
    saveCurrentFile() {
        if (window.codeEditor.currentFile) {
            const content = window.codeEditor.getCurrentContent();
            console.log('保存文件:', window.codeEditor.currentFile, content);
            alert('文件保存成功');
        } else {
            alert('没有打开的文件');
        }
    }

    simulateDevelopmentProcess(config) {
        console.log('模拟开发过程:', config);

        // 这里可以添加更多的开发过程模拟
        // 比如定期更新执行日志、状态变化等
        setTimeout(() => {
            console.log('开发过程模拟完成');
        }, 5000);
    }

    // 添加模态框到页面
    addModalsToPage() {
        // 检查是否已经添加过模态框
        if (document.getElementById('requirementModal')) {
            return;
        }

        const modalHTML = `
            <!-- 需求信息模态框 -->
            <div id="requirementModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center" onclick="app.hideRequirementModal()">
                <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto" onclick="event.stopPropagation()">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                                <span class="text-blue-600 mr-2">📋</span>
                                需求信息
                            </h3>
                            <button onclick="app.hideRequirementModal()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <span class="text-sm font-medium text-gray-600">任务名称:</span>
                                    <p class="text-gray-900 mt-1">登录界面UI优化</p>
                                </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-600">优先级:</span>
                                    <p class="mt-1"><span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">中</span></p>
                                </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-600">状态:</span>
                                    <p class="mt-1"><span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">开发中</span></p>
                                </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-600">负责人:</span>
                                    <p class="text-gray-900 mt-1">张三</p>
                                </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-600">预估工时:</span>
                                    <p class="text-gray-900 mt-1">4小时</p>
                                </div>
                                <div>
                                    <span class="text-sm font-medium text-gray-600">创建时间:</span>
                                    <p class="text-gray-900 mt-1">2024-01-15 10:30</p>
                                </div>
                            </div>
                            <div>
                                <span class="text-sm font-medium text-gray-600">需求描述:</span>
                                <p class="text-gray-700 mt-2 leading-relaxed">
                                    优化登录界面的用户体验，包括视觉设计改进、交互流程优化、响应式布局适配等。
                                    确保界面美观、易用，符合现代Web应用的设计标准。
                                </p>
                            </div>
                            <div>
                                <span class="text-sm font-medium text-gray-600">验收标准:</span>
                                <ul class="text-gray-700 mt-2 space-y-1 list-disc list-inside">
                                    <li>界面设计符合UI规范</li>
                                    <li>支持移动端响应式布局</li>
                                    <li>用户交互流程顺畅</li>
                                    <li>通过所有测试用例</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 开发Prompt模态框 -->
            <div id="promptModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center" onclick="app.hidePromptModal()">
                <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-auto" onclick="event.stopPropagation()">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                                <span class="text-green-600 mr-2">🚀</span>
                                开发Prompt
                            </h3>
                            <button onclick="app.hidePromptModal()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-medium text-gray-900 mb-2">任务概述</h4>
                                <p class="text-gray-700">基于需求"登录界面UI优化"，请执行以下开发任务：</p>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">开发步骤</h4>
                                <ol class="space-y-2 text-gray-700">
                                    <li class="flex items-start">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                                        <span>分析当前登录页面的UI设计，识别需要优化的元素和交互流程</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                                        <span>优化页面布局和视觉效果，提升整体美观度和用户体验</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                                        <span>改进用户交互体验，包括表单验证、错误提示、加载状态等</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                                        <span>确保响应式设计兼容性，适配不同屏幕尺寸和设备</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">5</span>
                                        <span>测试并验证改进效果，确保功能正常且性能良好</span>
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">技术要求</h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div class="bg-green-50 p-3 rounded-lg">
                                        <h5 class="text-sm font-medium text-green-800 mb-1">前端技术</h5>
                                        <ul class="text-sm text-green-700 space-y-1">
                                            <li>• 使用React Hooks进行状态管理</li>
                                            <li>• 确保组件的可复用性</li>
                                            <li>• 添加适当的错误处理</li>
                                        </ul>
                                    </div>
                                    <div class="bg-blue-50 p-3 rounded-lg">
                                        <h5 class="text-sm font-medium text-blue-800 mb-1">设计规范</h5>
                                        <ul class="text-sm text-blue-700 space-y-1">
                                            <li>• 遵循无障碍设计原则</li>
                                            <li>• 保持设计系统一致性</li>
                                            <li>• 优化加载性能</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 显示需求信息模态框
    showRequirementModal() {
        const modal = document.getElementById('requirementModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // 隐藏需求信息模态框
    hideRequirementModal() {
        const modal = document.getElementById('requirementModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // 显示开发Prompt模态框
    showPromptModal() {
        const modal = document.getElementById('promptModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // 隐藏开发Prompt模态框
    hidePromptModal() {
        const modal = document.getElementById('promptModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // 初始化可调整大小的布局
    initializeResizableLayout() {
        const leftResizer = document.getElementById('leftResizer');
        const rightResizer = document.getElementById('rightResizer');
        const leftPanel = document.getElementById('leftPanel');
        const centerPanel = document.getElementById('centerPanel');
        const rightPanel = document.getElementById('rightPanel');
        const container = document.getElementById('resizableLayout');

        if (!leftResizer || !rightResizer || !leftPanel || !centerPanel || !rightPanel || !container) {
            console.error('Resizable layout elements not found');
            return;
        }

        // 确保所有元素都在正确的容器中
        this.fixLayoutStructure();

        // 从localStorage加载保存的布局
        this.loadLayoutPreferences();

        // 左侧分隔条拖拽
        this.setupResizer(leftResizer, leftPanel, centerPanel, 'left');

        // 右侧分隔条拖拽
        this.setupResizer(rightResizer, centerPanel, rightPanel, 'right');
    }

    // 修复布局结构，确保所有元素都在正确的容器中
    fixLayoutStructure() {
        const container = document.getElementById('resizableLayout');
        const rightResizer = document.getElementById('rightResizer');
        const rightPanel = document.getElementById('rightPanel');

        if (!container || !rightResizer || !rightPanel) {
            return;
        }

        // 检查右侧分隔条和右侧面板是否在正确的容器中
        if (rightResizer.parentElement !== container) {
            container.appendChild(rightResizer);
            console.log('Fixed rightResizer position');
        }

        if (rightPanel.parentElement !== container) {
            container.appendChild(rightPanel);
            console.log('Fixed rightPanel position');
        }
    }

    // 设置分隔条拖拽功能
    setupResizer(resizer, leftElement, rightElement, side) {
        let isResizing = false;
        let startX = 0;
        let startLeftWidth = 0;
        let startRightWidth = 0;

        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startLeftWidth = leftElement.offsetWidth;
            startRightWidth = rightElement.offsetWidth;

            document.body.classList.add('resizing');
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            e.preventDefault();
        });

        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;
            const container = document.getElementById('resizableLayout');
            const containerWidth = container.offsetWidth;

            // 计算分隔条的宽度（4px * 2 = 8px）
            const resizerWidth = 8;
            const minPanelWidth = 200;
            const maxPanelWidth = containerWidth * 0.6; // 最大60%

            if (side === 'left') {
                // 左侧分隔条：调整左侧面板宽度
                const newLeftWidth = Math.max(minPanelWidth, Math.min(startLeftWidth + deltaX, maxPanelWidth));
                leftElement.style.width = newLeftWidth + 'px';
            } else {
                // 右侧分隔条：调整右侧面板宽度
                const newRightWidth = Math.max(minPanelWidth, Math.min(startRightWidth - deltaX, maxPanelWidth));
                rightElement.style.width = newRightWidth + 'px';
            }

            // 防止默认行为
            e.preventDefault();
        };

        const handleMouseUp = () => {
            if (isResizing) {
                isResizing = false;
                document.body.classList.remove('resizing');
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);

                // 保存布局偏好
                this.saveLayoutPreferences();
            }
        };
    }

    // 保存布局偏好到localStorage
    saveLayoutPreferences() {
        const leftPanel = document.getElementById('leftPanel');
        const rightPanel = document.getElementById('rightPanel');

        if (leftPanel && rightPanel) {
            const preferences = {
                leftWidth: leftPanel.offsetWidth,
                rightWidth: rightPanel.offsetWidth,
                timestamp: Date.now()
            };

            localStorage.setItem('aiDevPlatform_layoutPreferences', JSON.stringify(preferences));
        }
    }

    // 从localStorage加载布局偏好
    loadLayoutPreferences() {
        try {
            const saved = localStorage.getItem('aiDevPlatform_layoutPreferences');
            if (saved) {
                const preferences = JSON.parse(saved);
                const leftPanel = document.getElementById('leftPanel');
                const rightPanel = document.getElementById('rightPanel');

                if (leftPanel && rightPanel && preferences.leftWidth && preferences.rightWidth) {
                    leftPanel.style.width = preferences.leftWidth + 'px';
                    rightPanel.style.width = preferences.rightWidth + 'px';
                }
            }
        } catch (error) {
            console.error('Failed to load layout preferences:', error);
        }
    }

    // 重置布局为默认值
    resetLayoutToDefault() {
        const leftPanel = document.getElementById('leftPanel');
        const rightPanel = document.getElementById('rightPanel');

        if (leftPanel && rightPanel) {
            leftPanel.style.width = '300px';
            rightPanel.style.width = '300px';

            // 清除保存的偏好
            localStorage.removeItem('aiDevPlatform_layoutPreferences');

            console.log('Layout reset to default');
        }
    }

    // 重置到默认状态
    resetToDefault() {
        // 清除角色缓存
        localStorage.removeItem('aiDevPlatform_userRole');

        // 清除其他可能的缓存
        localStorage.removeItem('aiDevPlatform_layoutPreferences');

        console.log('已清除所有缓存，重置到默认状态');

        // 刷新页面
        location.reload();
    }

    // 初始化键盘快捷键
    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+R 或 Cmd+R：重置布局
            if ((e.ctrlKey || e.metaKey) && e.key === 'r' && e.target.closest('#taskDetailView')) {
                e.preventDefault();
                this.resetLayoutToDefault();
                return;
            }

            // Ctrl+S 或 Cmd+S：保存文件
            if ((e.ctrlKey || e.metaKey) && e.key === 's' && e.target.closest('#taskDetailView')) {
                e.preventDefault();
                this.saveCurrentFile();
                return;
            }
        });
    }

    // ==================== 系统管理模块 ====================

    // 加载系统管理页面
    loadSystemManagement() {
        console.log('加载系统管理模块');

        // 初始化系统管理标签页
        this.initSystemTabs();

        // 加载默认标签页（组织架构）
        this.loadOrgStructure();

        // 初始化事件监听器
        this.initSystemEventListeners();
    }

    // 初始化系统管理标签页
    initSystemTabs() {
        const tabBtns = document.querySelectorAll('.system-tab-btn');
        const tabContents = document.querySelectorAll('.system-tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有活跃状态
                tabBtns.forEach(b => {
                    b.classList.remove('active', 'border-gray-900', 'text-gray-900');
                    b.classList.add('border-transparent', 'text-gray-500');
                });
                tabContents.forEach(content => content.classList.add('hidden'));

                // 激活当前标签
                btn.classList.add('active', 'border-gray-900', 'text-gray-900');
                btn.classList.remove('border-transparent', 'text-gray-500');

                // 显示对应内容
                const tabId = btn.id.replace('Tab', 'Content');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }

                // 加载对应数据
                this.loadSystemTabData(btn.id);
            });
        });
    }

    // 加载系统标签页数据
    loadSystemTabData(tabId) {
        switch(tabId) {
            case 'orgStructureTab':
                this.loadOrgStructure();
                break;
            case 'userManagementTab':
                this.loadUserManagement();
                break;
            case 'roleManagementTab':
                this.loadRoleManagement();
                break;
            case 'permissionManagementTab':
                this.loadPermissionManagement();
                break;
        }
    }

    // 初始化系统管理事件监听器
    initSystemEventListeners() {
        // 组织架构相关事件
        const addOrgNodeBtn = document.getElementById('addOrgNodeBtn');
        if (addOrgNodeBtn) {
            addOrgNodeBtn.addEventListener('click', () => this.showAddOrgNodeDialog());
        }

        // 用户管理相关事件
        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.showAddUserDialog());
        }

        const importUsersBtn = document.getElementById('importUsersBtn');
        if (importUsersBtn) {
            importUsersBtn.addEventListener('click', () => this.showImportUsersDialog());
        }

        const exportUsersBtn = document.getElementById('exportUsersBtn');
        if (exportUsersBtn) {
            exportUsersBtn.addEventListener('click', () => this.exportUsers());
        }

        // 角色管理相关事件
        const addRoleBtn = document.getElementById('addRoleBtn');
        if (addRoleBtn) {
            addRoleBtn.addEventListener('click', () => this.showAddRoleDialog());
        }

        // 权限管理相关事件
        const savePermissionChanges = document.getElementById('savePermissionChanges');
        if (savePermissionChanges) {
            savePermissionChanges.addEventListener('click', () => this.savePermissionChanges());
        }

        // 搜索和筛选事件
        this.initSystemSearchAndFilters();
    }

    // 初始化搜索和筛选功能
    initSystemSearchAndFilters() {
        // 用户搜索
        const userSearchInput = document.getElementById('userSearchInput');
        if (userSearchInput) {
            userSearchInput.addEventListener('input', () => this.filterUsers());
        }

        // 用户状态筛选
        const userStatusFilter = document.getElementById('userStatusFilter');
        if (userStatusFilter) {
            userStatusFilter.addEventListener('change', () => this.filterUsers());
        }

        // 用户部门筛选
        const userDeptFilter = document.getElementById('userDeptFilter');
        if (userDeptFilter) {
            userDeptFilter.addEventListener('change', () => this.filterUsers());
        }

        // 角色搜索
        const roleSearchInput = document.getElementById('roleSearchInput');
        if (roleSearchInput) {
            roleSearchInput.addEventListener('input', () => this.filterRoles());
        }

        // 角色类型筛选
        const roleTypeFilter = document.getElementById('roleTypeFilter');
        if (roleTypeFilter) {
            roleTypeFilter.addEventListener('change', () => this.filterRoles());
        }
    }

    // ==================== 组织架构管理 ====================

    // 加载组织架构
    loadOrgStructure() {
        console.log('加载组织架构数据');

        // 模拟组织架构数据
        const orgData = {
            id: 'root',
            name: 'AI开发平台',
            type: 'company',
            children: [
                {
                    id: 'tech',
                    name: '技术部',
                    type: 'department',
                    manager: '张三',
                    memberCount: 15,
                    children: [
                        {
                            id: 'frontend',
                            name: '前端组',
                            type: 'team',
                            manager: '李四',
                            memberCount: 5,
                            children: []
                        },
                        {
                            id: 'backend',
                            name: '后端组',
                            type: 'team',
                            manager: '王五',
                            memberCount: 6,
                            children: []
                        },
                        {
                            id: 'devops',
                            name: 'DevOps组',
                            type: 'team',
                            manager: '赵六',
                            memberCount: 4,
                            children: []
                        }
                    ]
                },
                {
                    id: 'product',
                    name: '产品部',
                    type: 'department',
                    manager: '孙七',
                    memberCount: 8,
                    children: [
                        {
                            id: 'pm',
                            name: '产品经理组',
                            type: 'team',
                            manager: '周八',
                            memberCount: 4,
                            children: []
                        },
                        {
                            id: 'design',
                            name: '设计组',
                            type: 'team',
                            manager: '吴九',
                            memberCount: 4,
                            children: []
                        }
                    ]
                },
                {
                    id: 'sales',
                    name: '销售部',
                    type: 'department',
                    manager: '郑十',
                    memberCount: 12,
                    children: []
                }
            ]
        };

        this.orgStructureData = orgData;
        this.renderOrgTree(orgData);
    }

    // 渲染组织架构树
    renderOrgTree(data, container = null) {
        if (!container) {
            container = document.getElementById('orgTree');
            container.innerHTML = '';
        }

        const createNode = (node, level = 0) => {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = `org-node cursor-pointer p-2 rounded hover:bg-gray-100 ${level > 0 ? 'ml-4' : ''}`;
            nodeDiv.dataset.nodeId = node.id;

            const icon = node.type === 'company' ? '🏢' :
                        node.type === 'department' ? '🏛️' : '👥';

            nodeDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="text-sm">${icon}</span>
                    <span class="font-medium text-sm">${node.name}</span>
                    ${node.memberCount ? `<span class="text-xs text-gray-500">(${node.memberCount}人)</span>` : ''}
                </div>
            `;

            nodeDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOrgNode(node);
            });

            container.appendChild(nodeDiv);

            if (node.children && node.children.length > 0) {
                node.children.forEach(child => createNode(child, level + 1));
            }
        };

        createNode(data);
    }

    // 选择组织节点
    selectOrgNode(node) {
        // 移除之前的选中状态
        document.querySelectorAll('.org-node').forEach(n => {
            n.classList.remove('bg-blue-100', 'border-blue-300');
        });

        // 添加当前选中状态
        const nodeElement = document.querySelector(`[data-node-id="${node.id}"]`);
        if (nodeElement) {
            nodeElement.classList.add('bg-blue-100', 'border-blue-300');
        }

        // 显示节点详情
        this.showOrgNodeDetails(node);
    }

    // 显示组织节点详情
    showOrgNodeDetails(node) {
        const detailsContainer = document.getElementById('orgNodeDetails');
        const placeholder = document.getElementById('orgNodePlaceholder');
        const infoContainer = document.getElementById('orgNodeInfo');

        if (detailsContainer && placeholder && infoContainer) {
            placeholder.classList.add('hidden');
            detailsContainer.classList.remove('hidden');

            infoContainer.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">名称</label>
                        <p class="mt-1 text-sm text-gray-900">${node.name}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">类型</label>
                        <p class="mt-1 text-sm text-gray-900">${this.getOrgTypeDisplayName(node.type)}</p>
                    </div>
                    ${node.manager ? `
                        <div>
                            <label class="block text-sm font-medium text-gray-700">负责人</label>
                            <p class="mt-1 text-sm text-gray-900">${node.manager}</p>
                        </div>
                    ` : ''}
                    ${node.memberCount ? `
                        <div>
                            <label class="block text-sm font-medium text-gray-700">成员数量</label>
                            <p class="mt-1 text-sm text-gray-900">${node.memberCount}人</p>
                        </div>
                    ` : ''}
                    <div>
                        <label class="block text-sm font-medium text-gray-700">创建时间</label>
                        <p class="mt-1 text-sm text-gray-900">2024-01-01</p>
                    </div>
                </div>
            `;

            // 设置当前选中的节点
            this.selectedOrgNode = node;
        }
    }

    // 获取组织类型显示名称
    getOrgTypeDisplayName(type) {
        const typeMap = {
            'company': '公司',
            'department': '部门',
            'team': '小组'
        };
        return typeMap[type] || type;
    }

    // ==================== 用户管理 ====================

    // 加载用户管理
    loadUserManagement() {
        console.log('加载用户管理数据');

        // 模拟用户数据
        const userData = [
            {
                id: 1,
                name: '张三',
                email: 'zhangsan@example.com',
                phone: '13800138001',
                department: '技术部-前端组',
                role: '前端开发工程师',
                status: 'active',
                lastLogin: '2024-01-15 10:30',
                avatar: null
            },
            {
                id: 2,
                name: '李四',
                email: 'lisi@example.com',
                phone: '13800138002',
                department: '技术部-后端组',
                role: '后端开发工程师',
                status: 'active',
                lastLogin: '2024-01-15 09:45',
                avatar: null
            },
            {
                id: 3,
                name: '王五',
                email: 'wangwu@example.com',
                phone: '13800138003',
                department: '技术部-DevOps组',
                role: 'DevOps工程师',
                status: 'vacation',
                lastLogin: '2024-01-10 16:20',
                avatar: null
            },
            {
                id: 4,
                name: '赵六',
                email: 'zhaoliu@example.com',
                phone: '13800138004',
                department: '产品部-设计组',
                role: 'UI设计师',
                status: 'active',
                lastLogin: '2024-01-15 11:15',
                avatar: null
            },
            {
                id: 5,
                name: '孙七',
                email: 'sunqi@example.com',
                phone: '13800138005',
                department: '销售部',
                role: '销售经理',
                status: 'inactive',
                lastLogin: '2024-01-05 14:30',
                avatar: null
            }
        ];

        this.userData = userData;
        this.currentUserPage = 1;
        this.userPageSize = 10;
        this.renderUserTable();
        this.updateUserPagination();
    }

    // 渲染用户表格
    renderUserTable() {
        const tbody = document.getElementById('userTableBody');
        if (!tbody) return;

        const filteredUsers = this.getFilteredUsers();
        const startIndex = (this.currentUserPage - 1) * this.userPageSize;
        const endIndex = startIndex + this.userPageSize;
        const pageUsers = filteredUsers.slice(startIndex, endIndex);

        tbody.innerHTML = pageUsers.map(user => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                            <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span class="text-sm font-medium text-gray-700">${user.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div class="ml-3">
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                            <div class="text-sm text-gray-500">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.department}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.role}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getUserStatusClass(user.status)}">
                        ${this.getUserStatusText(user.status)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.lastLogin}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onclick="app.editUser(${user.id})" class="text-blue-600 hover:text-blue-900">编辑</button>
                    <button onclick="app.toggleUserStatus(${user.id})" class="text-green-600 hover:text-green-900">
                        ${user.status === 'active' ? '禁用' : '启用'}
                    </button>
                    <button onclick="app.deleteUser(${user.id})" class="text-red-600 hover:text-red-900">删除</button>
                </td>
            </tr>
        `).join('');
    }

    // 获取筛选后的用户
    getFilteredUsers() {
        if (!this.userData) return [];

        let filtered = [...this.userData];

        // 搜索筛选
        const searchTerm = document.getElementById('userSearchInput')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.department.toLowerCase().includes(searchTerm)
            );
        }

        // 状态筛选
        const statusFilter = document.getElementById('userStatusFilter')?.value;
        if (statusFilter) {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        // 部门筛选
        const deptFilter = document.getElementById('userDeptFilter')?.value;
        if (deptFilter) {
            filtered = filtered.filter(user => user.department.includes(deptFilter));
        }

        return filtered;
    }

    // 获取用户状态样式类
    getUserStatusClass(status) {
        const statusClasses = {
            'active': 'bg-green-100 text-green-800',
            'inactive': 'bg-red-100 text-red-800',
            'vacation': 'bg-yellow-100 text-yellow-800'
        };
        return statusClasses[status] || 'bg-gray-100 text-gray-800';
    }

    // 获取用户状态文本
    getUserStatusText(status) {
        const statusTexts = {
            'active': '活跃',
            'inactive': '离职',
            'vacation': '休假'
        };
        return statusTexts[status] || status;
    }

    // 更新用户分页
    updateUserPagination() {
        const filteredUsers = this.getFilteredUsers();
        const totalCount = filteredUsers.length;
        const startIndex = (this.currentUserPage - 1) * this.userPageSize + 1;
        const endIndex = Math.min(this.currentUserPage * this.userPageSize, totalCount);

        const pageInfo = document.getElementById('userPageInfo');
        const totalCountElement = document.getElementById('userTotalCount');

        if (pageInfo) pageInfo.textContent = `${startIndex}-${endIndex}`;
        if (totalCountElement) totalCountElement.textContent = totalCount;

        // 更新分页按钮状态
        const prevBtn = document.getElementById('userPrevPageBtn');
        const nextBtn = document.getElementById('userNextPageBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentUserPage <= 1;
            prevBtn.onclick = () => {
                if (this.currentUserPage > 1) {
                    this.currentUserPage--;
                    this.renderUserTable();
                    this.updateUserPagination();
                }
            };
        }

        if (nextBtn) {
            const maxPage = Math.ceil(totalCount / this.userPageSize);
            nextBtn.disabled = this.currentUserPage >= maxPage;
            nextBtn.onclick = () => {
                if (this.currentUserPage < maxPage) {
                    this.currentUserPage++;
                    this.renderUserTable();
                    this.updateUserPagination();
                }
            };
        }
    }

    // 筛选用户
    filterUsers() {
        this.currentUserPage = 1;
        this.renderUserTable();
        this.updateUserPagination();
    }

    // ==================== 角色管理 ====================

    // 加载角色管理
    loadRoleManagement() {
        console.log('加载角色管理数据');

        // 模拟角色数据
        const roleData = [
            {
                id: 1,
                name: '超级管理员',
                code: 'super_admin',
                type: 'system',
                description: '系统超级管理员，拥有所有权限',
                userCount: 1,
                createdAt: '2024-01-01',
                permissions: ['all']
            },
            {
                id: 2,
                name: '领导',
                code: 'leader',
                type: 'system',
                description: '公司领导，可以查看所有项目和需求',
                userCount: 3,
                createdAt: '2024-01-01',
                permissions: ['dashboard', 'requirements', 'projects']
            },
            {
                id: 3,
                name: '研发管理',
                code: 'dev_manager',
                type: 'system',
                description: '研发管理人员，负责项目和团队管理',
                userCount: 5,
                createdAt: '2024-01-01',
                permissions: ['dashboard', 'projects']
            },
            {
                id: 4,
                name: '前端开发工程师',
                code: 'frontend_dev',
                type: 'custom',
                description: '前端开发工程师，负责前端功能开发',
                userCount: 8,
                createdAt: '2024-01-05',
                permissions: ['dashboard', 'projects', 'code']
            },
            {
                id: 5,
                name: '销售经理',
                code: 'sales_manager',
                type: 'custom',
                description: '销售经理，负责客户需求收集和管理',
                userCount: 4,
                createdAt: '2024-01-10',
                permissions: ['dashboard', 'requirements']
            }
        ];

        this.roleData = roleData;
        this.renderRoleTable();
    }

    // 渲染角色表格
    renderRoleTable() {
        const tbody = document.getElementById('roleTableBody');
        if (!tbody) return;

        const filteredRoles = this.getFilteredRoles();

        tbody.innerHTML = filteredRoles.map(role => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${role.name}</div>
                    <div class="text-sm text-gray-500">${role.code}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getRoleTypeClass(role.type)}">
                        ${this.getRoleTypeText(role.type)}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">${role.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${role.userCount}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${role.createdAt}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onclick="app.editRole(${role.id})" class="text-blue-600 hover:text-blue-900">编辑</button>
                    <button onclick="app.viewRolePermissions(${role.id})" class="text-green-600 hover:text-green-900">权限</button>
                    ${role.type === 'custom' ? `<button onclick="app.deleteRole(${role.id})" class="text-red-600 hover:text-red-900">删除</button>` : ''}
                </td>
            </tr>
        `).join('');
    }

    // 获取筛选后的角色
    getFilteredRoles() {
        if (!this.roleData) return [];

        let filtered = [...this.roleData];

        // 搜索筛选
        const searchTerm = document.getElementById('roleSearchInput')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(role =>
                role.name.toLowerCase().includes(searchTerm) ||
                role.code.toLowerCase().includes(searchTerm) ||
                role.description.toLowerCase().includes(searchTerm)
            );
        }

        // 类型筛选
        const typeFilter = document.getElementById('roleTypeFilter')?.value;
        if (typeFilter) {
            filtered = filtered.filter(role => role.type === typeFilter);
        }

        return filtered;
    }

    // 获取角色类型样式类
    getRoleTypeClass(type) {
        const typeClasses = {
            'system': 'bg-blue-100 text-blue-800',
            'custom': 'bg-green-100 text-green-800'
        };
        return typeClasses[type] || 'bg-gray-100 text-gray-800';
    }

    // 获取角色类型文本
    getRoleTypeText(type) {
        const typeTexts = {
            'system': '系统角色',
            'custom': '自定义角色'
        };
        return typeTexts[type] || type;
    }

    // 筛选角色
    filterRoles() {
        this.renderRoleTable();
    }

    // ==================== 权限管理 ====================

    // 加载权限管理
    loadPermissionManagement() {
        console.log('加载权限管理数据');

        // 模拟权限模块数据
        const permissionModules = [
            {
                id: 'dashboard',
                name: '仪表板',
                permissions: ['view']
            },
            {
                id: 'requirements',
                name: '需求管理',
                permissions: ['view', 'create', 'edit', 'delete', 'manage']
            },
            {
                id: 'projects',
                name: '项目管理',
                permissions: ['view', 'create', 'edit', 'delete', 'manage']
            },
            {
                id: 'code',
                name: '代码管理',
                permissions: ['view', 'create', 'edit', 'delete']
            },
            {
                id: 'deploy',
                name: '部署管理',
                permissions: ['view', 'create', 'edit', 'manage']
            },
            {
                id: 'monitor',
                name: '监控中心',
                permissions: ['view', 'manage']
            },
            {
                id: 'resources',
                name: '资源管理',
                permissions: ['view', 'create', 'edit', 'delete', 'manage']
            },
            {
                id: 'system',
                name: '系统管理',
                permissions: ['view', 'create', 'edit', 'delete', 'manage']
            }
        ];

        this.permissionModules = permissionModules;
        this.loadPermissionRoleFilter();
        this.renderPermissionMatrix();
    }

    // 加载权限角色筛选器
    loadPermissionRoleFilter() {
        const roleFilter = document.getElementById('permissionRoleFilter');
        if (!roleFilter || !this.roleData) return;

        roleFilter.innerHTML = '<option value="">选择角色</option>' +
            this.roleData.map(role => `<option value="${role.code}">${role.name}</option>`).join('');

        roleFilter.addEventListener('change', () => {
            this.renderPermissionMatrix();
        });
    }

    // 渲染权限矩阵
    renderPermissionMatrix() {
        const tbody = document.getElementById('permissionMatrixBody');
        const roleFilter = document.getElementById('permissionRoleFilter');

        if (!tbody || !this.permissionModules) return;

        const selectedRole = roleFilter?.value;
        const roleData = selectedRole ? this.roleData?.find(r => r.code === selectedRole) : null;

        tbody.innerHTML = this.permissionModules.map(module => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                    ${module.name}
                </td>
                ${['view', 'create', 'edit', 'delete', 'manage'].map(permission => {
                    const hasPermission = module.permissions.includes(permission);
                    const isChecked = roleData && (
                        roleData.permissions.includes('all') ||
                        roleData.permissions.includes(module.id) ||
                        roleData.permissions.includes(`${module.id}.${permission}`)
                    );

                    return `
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                            ${hasPermission ? `
                                <input type="checkbox"
                                       ${isChecked ? 'checked' : ''}
                                       ${!selectedRole ? 'disabled' : ''}
                                       data-module="${module.id}"
                                       data-permission="${permission}"
                                       class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            ` : '<span class="text-gray-300">-</span>'}
                        </td>
                    `;
                }).join('')}
            </tr>
        `).join('');
    }

    // ==================== 对话框和操作方法 ====================

    // 显示添加组织节点对话框
    showAddOrgNodeDialog() {
        alert('添加部门功能\n\n这里将显示添加部门的对话框，包括：\n• 部门名称\n• 部门类型\n• 上级部门\n• 负责人选择');
    }

    // 显示添加用户对话框
    showAddUserDialog() {
        alert('添加用户功能\n\n这里将显示添加用户的对话框，包括：\n• 基本信息（姓名、邮箱、电话）\n• 部门分配\n• 角色分配\n• 初始密码设置');
    }

    // 显示导入用户对话框
    showImportUsersDialog() {
        alert('批量导入用户功能\n\n支持：\n• Excel文件导入\n• CSV文件导入\n• 模板下载\n• 导入预览和验证');
    }

    // 导出用户
    exportUsers() {
        alert('导出用户功能\n\n支持导出格式：\n• Excel格式\n• CSV格式\n• 包含用户基本信息和权限信息');
    }

    // 显示添加角色对话框
    showAddRoleDialog() {
        alert('添加角色功能\n\n这里将显示添加角色的对话框，包括：\n• 角色名称和编码\n• 角色描述\n• 权限配置\n• 角色继承设置');
    }

    // 编辑用户
    editUser(userId) {
        const user = this.userData?.find(u => u.id === userId);
        if (user) {
            alert(`编辑用户: ${user.name}\n\n这里将显示用户编辑对话框`);
        }
    }

    // 切换用户状态
    toggleUserStatus(userId) {
        const user = this.userData?.find(u => u.id === userId);
        if (user) {
            const newStatus = user.status === 'active' ? 'inactive' : 'active';
            const action = newStatus === 'active' ? '启用' : '禁用';

            if (confirm(`确定要${action}用户 ${user.name} 吗？`)) {
                user.status = newStatus;
                this.renderUserTable();
                alert(`用户 ${user.name} 已${action}`);
            }
        }
    }

    // 删除用户
    deleteUser(userId) {
        const user = this.userData?.find(u => u.id === userId);
        if (user && confirm(`确定要删除用户 ${user.name} 吗？此操作不可恢复。`)) {
            this.userData = this.userData.filter(u => u.id !== userId);
            this.renderUserTable();
            this.updateUserPagination();
            alert(`用户 ${user.name} 已删除`);
        }
    }

    // 编辑角色
    editRole(roleId) {
        const role = this.roleData?.find(r => r.id === roleId);
        if (role) {
            alert(`编辑角色: ${role.name}\n\n这里将显示角色编辑对话框`);
        }
    }

    // 查看角色权限
    viewRolePermissions(roleId) {
        const role = this.roleData?.find(r => r.id === roleId);
        if (role) {
            // 切换到权限管理标签页并选择该角色
            document.getElementById('permissionManagementTab')?.click();
            setTimeout(() => {
                const roleFilter = document.getElementById('permissionRoleFilter');
                if (roleFilter) {
                    roleFilter.value = role.code;
                    this.renderPermissionMatrix();
                }
            }, 100);
        }
    }

    // 删除角色
    deleteRole(roleId) {
        const role = this.roleData?.find(r => r.id === roleId);
        if (role && role.type === 'custom' && confirm(`确定要删除角色 ${role.name} 吗？此操作不可恢复。`)) {
            this.roleData = this.roleData.filter(r => r.id !== roleId);
            this.renderRoleTable();
            alert(`角色 ${role.name} 已删除`);
        }
    }

    // 保存权限更改
    savePermissionChanges() {
        const roleFilter = document.getElementById('permissionRoleFilter');
        const selectedRole = roleFilter?.value;

        if (!selectedRole) {
            alert('请先选择一个角色');
            return;
        }

        // 收集权限矩阵中的选中状态
        const checkboxes = document.querySelectorAll('#permissionMatrixBody input[type="checkbox"]');
        const permissions = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const module = checkbox.dataset.module;
                const permission = checkbox.dataset.permission;
                permissions.push(`${module}.${permission}`);
            }
        });

        // 更新角色权限
        const role = this.roleData?.find(r => r.code === selectedRole);
        if (role) {
            role.permissions = permissions;
            alert(`角色 ${role.name} 的权限已保存\n\n权限数量: ${permissions.length}`);
        }
    }

    // ==================== 资源管理模块 ====================

    // 加载资源管理页面
    loadResourcesPage() {
        console.log('加载资源管理页面');

        // 初始化标签页切换
        this.initResourceTabs();

        // 加载主机管理数据
        this.loadHostManagement();

        // 加载容器管理数据
        this.loadContainerManagement();

        // 初始化搜索和筛选功能
        this.initResourceSearchAndFilter();
    }

    // 初始化资源管理标签页
    initResourceTabs() {
        const tabBtns = document.querySelectorAll('.resource-tab-btn');
        const tabContents = document.querySelectorAll('.resource-tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有活动状态
                tabBtns.forEach(b => {
                    b.classList.remove('active', 'border-gray-900', 'text-gray-900');
                    b.classList.add('border-transparent', 'text-gray-500');
                });
                tabContents.forEach(content => content.classList.add('hidden'));

                // 激活当前标签
                btn.classList.add('active', 'border-gray-900', 'text-gray-900');
                btn.classList.remove('border-transparent', 'text-gray-500');

                // 显示对应内容
                const targetId = btn.id.replace('Tab', 'Content');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            });
        });
    }

    // 加载主机管理
    loadHostManagement() {
        console.log('加载主机管理数据');

        // 模拟主机数据
        this.hostData = [
            {
                id: 1,
                name: 'web-server-01',
                ip: '192.168.1.100',
                port: 22,
                username: 'root',
                status: 'online',
                os: 'Ubuntu 20.04',
                cpu: { cores: 8, usage: 45 },
                memory: { total: 32, used: 18 },
                disk: { total: 500, used: 280 },
                lastSeen: '2024-01-15 10:30:00',
                tags: ['web', 'production']
            },
            {
                id: 2,
                name: 'db-server-01',
                ip: '192.168.1.101',
                port: 22,
                username: 'admin',
                status: 'online',
                os: 'CentOS 8',
                cpu: { cores: 16, usage: 72 },
                memory: { total: 64, used: 48 },
                disk: { total: 1000, used: 650 },
                lastSeen: '2024-01-15 10:29:45',
                tags: ['database', 'production']
            },
            {
                id: 3,
                name: 'app-server-01',
                ip: '192.168.1.102',
                port: 22,
                username: 'deploy',
                status: 'offline',
                os: 'Ubuntu 22.04',
                cpu: { cores: 4, usage: 0 },
                memory: { total: 16, used: 0 },
                disk: { total: 200, used: 120 },
                lastSeen: '2024-01-15 09:15:30',
                tags: ['application', 'staging']
            },
            {
                id: 4,
                name: 'monitor-server',
                ip: '192.168.1.103',
                port: 22,
                username: 'monitor',
                status: 'online',
                os: 'Ubuntu 20.04',
                cpu: { cores: 2, usage: 25 },
                memory: { total: 8, used: 4 },
                disk: { total: 100, used: 45 },
                lastSeen: '2024-01-15 10:31:15',
                tags: ['monitoring', 'tools']
            },
            {
                id: 5,
                name: 'backup-server',
                ip: '192.168.1.104',
                port: 22,
                username: 'backup',
                status: 'error',
                os: 'CentOS 7',
                cpu: { cores: 4, usage: 0 },
                memory: { total: 16, used: 0 },
                disk: { total: 2000, used: 1200 },
                lastSeen: '2024-01-14 23:45:00',
                tags: ['backup', 'storage']
            }
        ];

        this.renderHostTable();
        this.updateHostStatistics();
    }

    // 渲染主机表格
    renderHostTable() {
        const tbody = document.getElementById('hostTableBody');
        if (!tbody || !this.hostData) return;

        tbody.innerHTML = this.hostData.map(host => {
            const statusColor = {
                'online': 'bg-green-100 text-green-800',
                'offline': 'bg-gray-100 text-gray-800',
                'error': 'bg-red-100 text-red-800'
            }[host.status];

            const statusIcon = {
                'online': '🟢',
                'offline': '⚪',
                'error': '🔴'
            }[host.status];

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="${host.id}">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div>
                                <div class="text-sm font-medium text-gray-900">${host.name}</div>
                                <div class="text-sm text-gray-500">${host.ip}:${host.port}</div>
                                <div class="text-xs text-gray-400">${host.os}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}">
                            ${statusIcon} ${host.status}
                        </span>
                        <div class="text-xs text-gray-500 mt-1">${host.lastSeen}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="space-y-1">
                            <div class="flex justify-between">
                                <span>CPU:</span>
                                <span>${host.cpu.usage}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-blue-600 h-1 rounded-full" style="width: ${host.cpu.usage}%"></div>
                            </div>
                            <div class="flex justify-between">
                                <span>内存:</span>
                                <span>${host.memory.used}/${host.memory.total}GB</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-green-600 h-1 rounded-full" style="width: ${(host.memory.used/host.memory.total*100)}%"></div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>用户: ${host.username}</div>
                        <div class="text-xs text-gray-500">SSH ${host.port}</div>
                        <div class="flex flex-wrap gap-1 mt-1">
                            ${host.tags.map(tag => `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">${tag}</span>`).join('')}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button onclick="app.connectToHost(${host.id})" class="text-blue-600 hover:text-blue-900" title="SSH连接">🔗</button>
                            <button onclick="app.monitorHost(${host.id})" class="text-green-600 hover:text-green-900" title="监控">📊</button>
                            <button onclick="app.editHost(${host.id})" class="text-yellow-600 hover:text-yellow-900" title="编辑">✏️</button>
                            <button onclick="app.deleteHost(${host.id})" class="text-red-600 hover:text-red-900" title="删除">🗑️</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // 更新主机统计信息
    updateHostStatistics() {
        if (!this.hostData) return;

        const onlineCount = this.hostData.filter(h => h.status === 'online').length;
        const offlineCount = this.hostData.filter(h => h.status === 'offline' || h.status === 'error').length;
        const totalMemory = this.hostData.reduce((sum, h) => sum + h.memory.total, 0);
        const totalCpuCores = this.hostData.reduce((sum, h) => sum + h.cpu.cores, 0);

        document.getElementById('onlineHostCount').textContent = onlineCount;
        document.getElementById('offlineHostCount').textContent = offlineCount;
        document.getElementById('totalMemory').textContent = `${totalMemory} GB`;
        document.getElementById('totalCpuCores').textContent = totalCpuCores;
    }

    // 显示添加主机对话框
    showAddHostDialog() {
        const hostInfo = prompt(`添加新主机

请输入主机信息（格式：名称,IP地址,端口,用户名,标签）
例如：web-server-02,192.168.1.105,22,root,web,production`);

        if (hostInfo && hostInfo.trim()) {
            const parts = hostInfo.split(',').map(p => p.trim());
            if (parts.length >= 4) {
                const newHost = {
                    id: Date.now(),
                    name: parts[0],
                    ip: parts[1],
                    port: parseInt(parts[2]) || 22,
                    username: parts[3],
                    status: 'offline',
                    os: 'Unknown',
                    cpu: { cores: 4, usage: 0 },
                    memory: { total: 8, used: 0 },
                    disk: { total: 100, used: 0 },
                    lastSeen: '从未连接',
                    tags: parts.slice(4).filter(tag => tag.length > 0)
                };

                this.hostData.push(newHost);
                this.renderHostTable();
                this.updateHostStatistics();
                alert(`主机 ${newHost.name} 添加成功！`);
            } else {
                alert('输入格式错误，请按照示例格式输入');
            }
        }
    }

    // 连接到主机
    connectToHost(hostId) {
        const host = this.hostData?.find(h => h.id === hostId);
        if (host) {
            alert(`SSH连接到主机: ${host.name}

连接信息：
IP地址: ${host.ip}
端口: ${host.port}
用户名: ${host.username}

这里将打开SSH连接终端...`);
        }
    }

    // 监控主机
    monitorHost(hostId) {
        const host = this.hostData?.find(h => h.id === hostId);
        if (host) {
            alert(`主机监控: ${host.name}

实时监控信息：
CPU使用率: ${host.cpu.usage}% (${host.cpu.cores}核心)
内存使用: ${host.memory.used}GB / ${host.memory.total}GB
磁盘使用: ${host.disk.used}GB / ${host.disk.total}GB
状态: ${host.status}
最后连接: ${host.lastSeen}

这里将显示详细的监控图表...`);
        }
    }

    // 编辑主机
    editHost(hostId) {
        const host = this.hostData?.find(h => h.id === hostId);
        if (host) {
            const newName = prompt('主机名称:', host.name);
            if (newName && newName.trim()) {
                host.name = newName.trim();
                this.renderHostTable();
                alert(`主机信息已更新`);
            }
        }
    }

    // 删除主机
    deleteHost(hostId) {
        const host = this.hostData?.find(h => h.id === hostId);
        if (host && confirm(`确定要删除主机 "${host.name}" 吗？\n\n此操作不可撤销。`)) {
            this.hostData = this.hostData.filter(h => h.id !== hostId);
            this.renderHostTable();
            this.updateHostStatistics();
            alert(`主机 "${host.name}" 已删除`);
        }
    }

    // 批量主机操作
    batchHostOperation() {
        const selectedHosts = Array.from(document.querySelectorAll('#hostTableBody input[type="checkbox"]:checked'))
            .map(cb => parseInt(cb.value));

        if (selectedHosts.length === 0) {
            alert('请先选择要操作的主机');
            return;
        }

        const operation = prompt(`批量操作 (${selectedHosts.length}台主机)

请选择操作类型：
1. 批量执行命令
2. 批量重启
3. 批量更新
4. 批量删除

请输入操作编号:`);

        if (operation) {
            switch(operation.trim()) {
                case '1':
                    const command = prompt('请输入要执行的命令:');
                    if (command) {
                        alert(`将在${selectedHosts.length}台主机上执行命令: ${command}\n\n这里将显示执行结果...`);
                    }
                    break;
                case '2':
                    if (confirm(`确定要重启${selectedHosts.length}台主机吗？`)) {
                        alert(`正在重启${selectedHosts.length}台主机...`);
                    }
                    break;
                case '3':
                    if (confirm(`确定要更新${selectedHosts.length}台主机的系统吗？`)) {
                        alert(`正在更新${selectedHosts.length}台主机...`);
                    }
                    break;
                case '4':
                    if (confirm(`确定要删除${selectedHosts.length}台主机吗？\n\n此操作不可撤销。`)) {
                        this.hostData = this.hostData.filter(h => !selectedHosts.includes(h.id));
                        this.renderHostTable();
                        this.updateHostStatistics();
                        alert(`已删除${selectedHosts.length}台主机`);
                    }
                    break;
                default:
                    alert('无效的操作编号');
            }
        }
    }

    // 刷新资源数据
    refreshResourceData() {
        alert('正在刷新资源数据...\n\n这里将重新获取所有主机和容器的最新状态信息。');
        this.loadHostManagement();
        this.loadContainerManagement();
    }

    // 加载容器管理
    loadContainerManagement() {
        console.log('加载容器管理数据');

        // 模拟容器服务数据
        this.containerData = [
            {
                id: 1,
                name: 'nginx-web',
                image: 'nginx:1.21',
                status: 'running',
                replicas: { desired: 3, running: 3 },
                ports: ['80:80', '443:443'],
                cpu: { limit: '500m', usage: '245m' },
                memory: { limit: '512Mi', usage: '328Mi' },
                network: 'web-network',
                created: '2024-01-10 14:30:00',
                updated: '2024-01-15 10:15:00'
            },
            {
                id: 2,
                name: 'mysql-db',
                image: 'mysql:8.0',
                status: 'running',
                replicas: { desired: 1, running: 1 },
                ports: ['3306:3306'],
                cpu: { limit: '1000m', usage: '720m' },
                memory: { limit: '2Gi', usage: '1.5Gi' },
                network: 'db-network',
                created: '2024-01-08 09:20:00',
                updated: '2024-01-14 16:45:00'
            },
            {
                id: 3,
                name: 'redis-cache',
                image: 'redis:7.0',
                status: 'running',
                replicas: { desired: 2, running: 2 },
                ports: ['6379:6379'],
                cpu: { limit: '200m', usage: '85m' },
                memory: { limit: '256Mi', usage: '128Mi' },
                network: 'cache-network',
                created: '2024-01-12 11:10:00',
                updated: '2024-01-15 08:30:00'
            },
            {
                id: 4,
                name: 'api-service',
                image: 'node:18-alpine',
                status: 'stopped',
                replicas: { desired: 2, running: 0 },
                ports: ['3000:3000'],
                cpu: { limit: '500m', usage: '0m' },
                memory: { limit: '1Gi', usage: '0Mi' },
                network: 'api-network',
                created: '2024-01-13 15:45:00',
                updated: '2024-01-15 09:20:00'
            },
            {
                id: 5,
                name: 'monitoring',
                image: 'prometheus:latest',
                status: 'error',
                replicas: { desired: 1, running: 0 },
                ports: ['9090:9090'],
                cpu: { limit: '300m', usage: '0m' },
                memory: { limit: '512Mi', usage: '0Mi' },
                network: 'monitoring-network',
                created: '2024-01-14 12:00:00',
                updated: '2024-01-15 07:15:00'
            }
        ];

        this.renderContainerTable();
        this.updateClusterStatistics();
    }

    // 渲染容器服务表格
    renderContainerTable() {
        const tbody = document.getElementById('containerTableBody');
        if (!tbody || !this.containerData) return;

        tbody.innerHTML = this.containerData.map(container => {
            const statusColor = {
                'running': 'bg-green-100 text-green-800',
                'stopped': 'bg-gray-100 text-gray-800',
                'error': 'bg-red-100 text-red-800'
            }[container.status];

            const statusIcon = {
                'running': '🟢',
                'stopped': '⚪',
                'error': '🔴'
            }[container.status];

            const cpuUsagePercent = container.cpu.usage === '0m' ? 0 :
                (parseInt(container.cpu.usage) / parseInt(container.cpu.limit)) * 100;

            const memoryUsagePercent = container.memory.usage === '0Mi' ? 0 :
                (parseFloat(container.memory.usage) / parseFloat(container.memory.limit)) * 100;

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="${container.id}">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div>
                                <div class="text-sm font-medium text-gray-900">${container.name}</div>
                                <div class="text-sm text-gray-500">${container.image}</div>
                                <div class="text-xs text-gray-400">网络: ${container.network}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}">
                            ${statusIcon} ${container.status}
                        </span>
                        <div class="text-xs text-gray-500 mt-1">更新: ${container.updated}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="flex items-center">
                            <span class="font-medium">${container.replicas.running}/${container.replicas.desired}</span>
                            ${container.replicas.running === container.replicas.desired ?
                                '<span class="ml-2 text-green-600">✓</span>' :
                                '<span class="ml-2 text-red-600">⚠</span>'}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="space-y-1">
                            <div class="flex justify-between">
                                <span>CPU:</span>
                                <span>${container.cpu.usage}/${container.cpu.limit}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-blue-600 h-1 rounded-full" style="width: ${cpuUsagePercent}%"></div>
                            </div>
                            <div class="flex justify-between">
                                <span>内存:</span>
                                <span>${container.memory.usage}/${container.memory.limit}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-green-600 h-1 rounded-full" style="width: ${memoryUsagePercent}%"></div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="space-y-1">
                            ${container.ports.map(port => `<div class="text-xs bg-gray-100 px-2 py-1 rounded">${port}</div>`).join('')}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <button onclick="app.startContainer(${container.id})" class="text-green-600 hover:text-green-900" title="启动">▶️</button>
                            <button onclick="app.stopContainer(${container.id})" class="text-red-600 hover:text-red-900" title="停止">⏹️</button>
                            <button onclick="app.restartContainer(${container.id})" class="text-blue-600 hover:text-blue-900" title="重启">🔄</button>
                            <button onclick="app.viewContainerLogs(${container.id})" class="text-purple-600 hover:text-purple-900" title="日志">📋</button>
                            <button onclick="app.scaleContainer(${container.id})" class="text-yellow-600 hover:text-yellow-900" title="扩缩容">📊</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // 更新集群统计信息
    updateClusterStatistics() {
        if (!this.containerData) return;

        const runningServices = this.containerData.filter(c => c.status === 'running').length;
        const totalNodes = 3; // 模拟集群节点数

        document.getElementById('clusterNodeCount').textContent = totalNodes;
        document.getElementById('clusterServiceCount').textContent = runningServices;
    }

    // 显示创建集群对话框
    showCreateClusterDialog() {
        alert(`创建Docker集群

集群配置选项：
• 集群类型: Docker Swarm / Kubernetes
• 节点选择: 从已配置主机中选择
• 网络配置: 自定义网络设置
• 存储配置: 共享存储设置

这里将显示集群创建向导...`);
    }

    // 显示部署服务对话框
    showDeployServiceDialog() {
        const serviceInfo = prompt(`部署新服务

请输入服务信息（格式：服务名,镜像,端口,副本数）
例如：web-app,nginx:latest,80:80,2`);

        if (serviceInfo && serviceInfo.trim()) {
            const parts = serviceInfo.split(',').map(p => p.trim());
            if (parts.length >= 3) {
                const newService = {
                    id: Date.now(),
                    name: parts[0],
                    image: parts[1],
                    status: 'running',
                    replicas: { desired: parseInt(parts[3]) || 1, running: parseInt(parts[3]) || 1 },
                    ports: [parts[2]],
                    cpu: { limit: '500m', usage: '100m' },
                    memory: { limit: '512Mi', usage: '256Mi' },
                    network: 'default-network',
                    created: new Date().toLocaleString(),
                    updated: new Date().toLocaleString()
                };

                this.containerData.push(newService);
                this.renderContainerTable();
                this.updateClusterStatistics();
                alert(`服务 ${newService.name} 部署成功！`);
            } else {
                alert('输入格式错误，请按照示例格式输入');
            }
        }
    }

    // 启动容器
    startContainer(containerId) {
        const container = this.containerData?.find(c => c.id === containerId);
        if (container) {
            container.status = 'running';
            container.replicas.running = container.replicas.desired;
            container.updated = new Date().toLocaleString();
            this.renderContainerTable();
            this.updateClusterStatistics();
            alert(`容器服务 "${container.name}" 已启动`);
        }
    }

    // 停止容器
    stopContainer(containerId) {
        const container = this.containerData?.find(c => c.id === containerId);
        if (container && confirm(`确定要停止容器服务 "${container.name}" 吗？`)) {
            container.status = 'stopped';
            container.replicas.running = 0;
            container.cpu.usage = '0m';
            container.memory.usage = '0Mi';
            container.updated = new Date().toLocaleString();
            this.renderContainerTable();
            this.updateClusterStatistics();
            alert(`容器服务 "${container.name}" 已停止`);
        }
    }

    // 重启容器
    restartContainer(containerId) {
        const container = this.containerData?.find(c => c.id === containerId);
        if (container && confirm(`确定要重启容器服务 "${container.name}" 吗？`)) {
            container.status = 'running';
            container.replicas.running = container.replicas.desired;
            container.updated = new Date().toLocaleString();
            this.renderContainerTable();
            alert(`容器服务 "${container.name}" 正在重启...`);
        }
    }

    // 查看容器日志
    viewContainerLogs(containerId) {
        const container = this.containerData?.find(c => c.id === containerId);
        if (container) {
            alert(`容器日志: ${container.name}

最近日志输出：
[2024-01-15 10:30:15] INFO: Service started successfully
[2024-01-15 10:30:16] INFO: Listening on port ${container.ports[0]}
[2024-01-15 10:30:17] INFO: Health check passed
[2024-01-15 10:30:18] DEBUG: Processing request from 192.168.1.100
[2024-01-15 10:30:19] INFO: Request completed successfully

这里将显示完整的日志查看器...`);
        }
    }

    // 扩缩容容器
    scaleContainer(containerId) {
        const container = this.containerData?.find(c => c.id === containerId);
        if (container) {
            const newReplicas = prompt(`容器扩缩容: ${container.name}

当前副本数: ${container.replicas.desired}
请输入新的副本数:`, container.replicas.desired);

            if (newReplicas && !isNaN(newReplicas)) {
                const replicas = parseInt(newReplicas);
                if (replicas >= 0 && replicas <= 10) {
                    container.replicas.desired = replicas;
                    container.replicas.running = container.status === 'running' ? replicas : 0;
                    container.updated = new Date().toLocaleString();
                    this.renderContainerTable();
                    alert(`容器服务 "${container.name}" 已扩缩容到 ${replicas} 个副本`);
                } else {
                    alert('副本数必须在0-10之间');
                }
            }
        }
    }

    // 批量容器操作
    batchContainerOperation() {
        const selectedContainers = Array.from(document.querySelectorAll('#containerTableBody input[type="checkbox"]:checked'))
            .map(cb => parseInt(cb.value));

        if (selectedContainers.length === 0) {
            alert('请先选择要操作的容器服务');
            return;
        }

        const operation = prompt(`批量操作 (${selectedContainers.length}个服务)

请选择操作类型：
1. 批量启动
2. 批量停止
3. 批量重启
4. 批量删除
5. 批量扩容

请输入操作编号:`);

        if (operation) {
            switch(operation.trim()) {
                case '1':
                    selectedContainers.forEach(id => this.startContainer(id));
                    break;
                case '2':
                    if (confirm(`确定要停止${selectedContainers.length}个容器服务吗？`)) {
                        selectedContainers.forEach(id => {
                            const container = this.containerData?.find(c => c.id === id);
                            if (container) {
                                container.status = 'stopped';
                                container.replicas.running = 0;
                            }
                        });
                        this.renderContainerTable();
                        this.updateClusterStatistics();
                    }
                    break;
                case '3':
                    if (confirm(`确定要重启${selectedContainers.length}个容器服务吗？`)) {
                        selectedContainers.forEach(id => this.restartContainer(id));
                    }
                    break;
                case '4':
                    if (confirm(`确定要删除${selectedContainers.length}个容器服务吗？\n\n此操作不可撤销。`)) {
                        this.containerData = this.containerData.filter(c => !selectedContainers.includes(c.id));
                        this.renderContainerTable();
                        this.updateClusterStatistics();
                        alert(`已删除${selectedContainers.length}个容器服务`);
                    }
                    break;
                case '5':
                    const replicas = prompt('请输入新的副本数:', '2');
                    if (replicas && !isNaN(replicas)) {
                        selectedContainers.forEach(id => {
                            const container = this.containerData?.find(c => c.id === id);
                            if (container) {
                                container.replicas.desired = parseInt(replicas);
                                container.replicas.running = container.status === 'running' ? parseInt(replicas) : 0;
                            }
                        });
                        this.renderContainerTable();
                        alert(`已将${selectedContainers.length}个服务扩容到${replicas}个副本`);
                    }
                    break;
                default:
                    alert('无效的操作编号');
            }
        }
    }

    // 快捷操作：资源管理
    quickResourceManagement() {
        this.showPage('resources');
    }

    // ==================== 头像和用户管理功能 ====================

    // 显示头像菜单
    showAvatarMenu() {
        const menu = document.getElementById('avatarMenu');
        if (menu) {
            menu.classList.toggle('hidden');
        }

        // 点击其他地方关闭菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#userAvatar') && !e.target.closest('#avatarMenu')) {
                menu.classList.add('hidden');
            }
        }, { once: true });
    }

    // 显示头像上传对话框
    showAvatarUpload() {
        const modal = document.getElementById('avatarUploadModal');
        if (modal) {
            modal.classList.remove('hidden');
            // 关闭头像菜单
            document.getElementById('avatarMenu').classList.add('hidden');
        }
    }

    // 关闭头像上传对话框
    closeAvatarUpload() {
        const modal = document.getElementById('avatarUploadModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // 处理头像文件上传
    handleAvatarFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        // 检查文件类型
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件');
            return;
        }

        // 检查文件大小 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('图片文件不能超过5MB');
            return;
        }

        // 读取文件并显示预览
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('avatarPreview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="头像预览" class="avatar avatar-xl">`;
                this.currentAvatarData = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }

    // 选择预设头像
    selectPresetAvatar(letter) {
        const preview = document.getElementById('avatarPreview');
        if (preview) {
            const gradients = {
                'A': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'B': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'C': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'D': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            };

            preview.innerHTML = letter;
            preview.className = 'avatar avatar-xl avatar-default';
            preview.style.background = gradients[letter] || gradients['A'];

            this.currentAvatarData = {
                type: 'preset',
                letter: letter,
                gradient: gradients[letter]
            };
        }
    }

    // 保存头像
    saveAvatar() {
        if (this.currentAvatarData) {
            const userAvatar = document.getElementById('userAvatar');
            if (userAvatar) {
                if (typeof this.currentAvatarData === 'string') {
                    // 上传的图片
                    userAvatar.innerHTML = `<img src="${this.currentAvatarData}" alt="用户头像" class="avatar">`;
                } else if (this.currentAvatarData.type === 'preset') {
                    // 预设头像
                    userAvatar.innerHTML = this.currentAvatarData.letter;
                    userAvatar.style.background = this.currentAvatarData.gradient;
                }

                // 保存到本地存储
                localStorage.setItem('userAvatar', JSON.stringify(this.currentAvatarData));

                alert('头像已更新');
                this.closeAvatarUpload();
            }
        }
    }

    // 加载保存的头像
    loadSavedAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            try {
                const avatarData = JSON.parse(savedAvatar);
                const userAvatar = document.getElementById('userAvatar');

                if (userAvatar) {
                    if (typeof avatarData === 'string') {
                        // 上传的图片
                        userAvatar.innerHTML = `<img src="${avatarData}" alt="用户头像" class="avatar">`;
                    } else if (avatarData.type === 'preset') {
                        // 预设头像
                        userAvatar.innerHTML = avatarData.letter;
                        userAvatar.style.background = avatarData.gradient;
                    }
                }
            } catch (e) {
                console.error('加载头像失败:', e);
            }
        }
    }

    // 显示用户设置
    showUserSettings() {
        const modal = document.getElementById('userSettingsModal');
        if (modal) {
            modal.classList.remove('hidden');
            // 关闭头像菜单
            document.getElementById('avatarMenu').classList.add('hidden');
        }
    }

    // 关闭用户设置
    closeUserSettings() {
        const modal = document.getElementById('userSettingsModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // 保存用户设置
    saveUserSettings() {
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const userDepartment = document.getElementById('userDepartment').value;

        // 保存到本地存储
        const userSettings = {
            name: userName,
            email: userEmail,
            department: userDepartment
        };
        localStorage.setItem('userSettings', JSON.stringify(userSettings));

        // 更新显示
        const userNameDisplay = document.querySelector('.flex.flex-col span.text-sm.font-medium');
        if (userNameDisplay) {
            userNameDisplay.textContent = userName;
        }

        alert('设置已保存');
        this.closeUserSettings();
    }

    // 加载用户设置
    loadUserSettings() {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);

                // 更新表单
                const userName = document.getElementById('userName');
                const userEmail = document.getElementById('userEmail');
                const userDepartment = document.getElementById('userDepartment');

                if (userName) userName.value = settings.name || '演示用户';
                if (userEmail) userEmail.value = settings.email || 'demo@example.com';
                if (userDepartment) userDepartment.value = settings.department || 'tech';

                // 更新显示
                const userNameDisplay = document.querySelector('.flex.flex-col span.text-sm.font-medium');
                if (userNameDisplay && settings.name) {
                    userNameDisplay.textContent = settings.name;
                }
            } catch (e) {
                console.error('加载用户设置失败:', e);
            }
        }
    }

    // 退出登录
    logout() {
        if (confirm('确定要退出登录吗？')) {
            // 清除本地存储
            localStorage.removeItem('userAvatar');
            localStorage.removeItem('userSettings');
            localStorage.removeItem('currentRole');

            // 重置到默认状态
            this.resetToDefault();
            alert('已退出登录');
        }
    }

    // ==================== 新建需求页面功能 ====================

    // 显示新建需求页面
    showNewRequirementPage() {
        this.showPage('newRequirement');
        this.initializeMarkdownEditor();
        this.initializeRecording();
        this.initializeFileUpload();
    }

    // 返回需求管理页面
    backToRequirements() {
        this.showPage('requirements');
    }

    // 初始化Markdown编辑器
    initializeMarkdownEditor() {
        const editorElement = document.getElementById('markdownEditor');
        if (!editorElement) return;

        // 检查SimpleMarkdownEditor是否已加载
        if (typeof SimpleMarkdownEditor === 'undefined') {
            console.error('SimpleMarkdownEditor未加载，使用普通文本框');
            return;
        }

        try {
            this.markdownEditor = new SimpleMarkdownEditor(editorElement, {
                placeholder: '请输入需求描述...\n\n支持Markdown语法，可以使用以下格式：\n# 标题\n**粗体** *斜体*\n- 列表项\n1. 有序列表\n[链接](URL)\n`代码`\n\n请详细描述您的需求...',
                toolbar: true,
                preview: true,
                autosave: {
                    enabled: true,
                    uniqueId: "requirement_draft",
                    delay: 5000,
                },
                onChange: () => {
                    this.autoSaveDraft();
                }
            });

            console.log('Markdown编辑器初始化成功');
        } catch (error) {
            console.error('Markdown编辑器初始化失败:', error);
        }
    }

    // 处理粘贴的图片
    handlePastedImage(blob, callback) {
        const formData = new FormData();
        formData.append('image', blob);

        // 模拟图片上传
        setTimeout(() => {
            const imageUrl = URL.createObjectURL(blob);
            callback(imageUrl, `pasted-image-${Date.now()}`);
        }, 500);
    }

    // 预览Markdown
    previewMarkdown() {
        if (this.markdownEditor && this.markdownEditor.togglePreview) {
            // 使用内置的预览功能
            this.markdownEditor.togglePreview();
        } else {
            // 如果没有编辑器，显示提示
            alert('请先初始化Markdown编辑器');
        }
    }

    // 清空编辑器
    clearEditor() {
        if (confirm('确定要清空编辑器内容吗？')) {
            if (this.markdownEditor && this.markdownEditor.value) {
                this.markdownEditor.value('');
            } else {
                // 如果编辑器未初始化，直接清空textarea
                const editorElement = document.getElementById('markdownEditor');
                if (editorElement) {
                    editorElement.value = '';
                }
            }
        }
    }

    // 插入转录文本到编辑器
    insertTranscription() {
        const transcriptionText = document.getElementById('transcriptionText').textContent;
        if (transcriptionText && transcriptionText !== '转换中...') {
            if (this.markdownEditor && this.markdownEditor.value) {
                const currentContent = this.markdownEditor.value();
                const newContent = currentContent + '\n\n## 语音转录\n\n' + transcriptionText;
                this.markdownEditor.value(newContent);
            } else {
                // 如果编辑器未初始化，直接插入到textarea
                const editorElement = document.getElementById('markdownEditor');
                if (editorElement) {
                    const currentContent = editorElement.value;
                    const newContent = currentContent + '\n\n## 语音转录\n\n' + transcriptionText;
                    editorElement.value = newContent;
                }
            }
        }
    }

    // 自动保存草稿
    autoSaveDraft() {
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }

        this.autoSaveTimer = setTimeout(() => {
            this.saveDraftRequirement(true); // true表示静默保存
        }, 5000); // 5秒后自动保存
    }

    // 保存草稿
    saveDraftRequirement(silent = false) {
        const editorElement = document.getElementById('markdownEditor');
        let content = '';

        if (this.markdownEditor && this.markdownEditor.value) {
            content = this.markdownEditor.value();
        } else if (editorElement) {
            content = editorElement.value;
        }

        const attachments = this.getUploadedFiles();
        const audioFile = this.getCurrentAudioFile();

        const draft = {
            content: content,
            attachments: attachments,
            audioFile: audioFile,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('requirementDraft', JSON.stringify(draft));

        if (!silent) {
            this.showNotification('草稿已保存', 'success');
        }
    }

    // 提交需求
    submitRequirement() {
        const editorElement = document.getElementById('markdownEditor');
        let content = '';

        if (this.markdownEditor && this.markdownEditor.value) {
            content = this.markdownEditor.value();
        } else if (editorElement) {
            content = editorElement.value;
        }

        if (!content.trim()) {
            alert('请输入需求描述');
            return;
        }

        const requirement = {
            id: Date.now(),
            title: this.generateRequirementTitle(content),
            content: content,
            attachments: this.getUploadedFiles(),
            audioFile: this.getCurrentAudioFile(),
            status: 'submitted',
            priority: 'medium',
            createdAt: new Date().toISOString(),
            createdBy: '演示用户'
        };

        // 保存到数据库（这里使用localStorage模拟）
        const requirements = JSON.parse(localStorage.getItem('requirements') || '[]');
        requirements.push(requirement);
        localStorage.setItem('requirements', JSON.stringify(requirements));

        // 清除草稿
        localStorage.removeItem('requirementDraft');

        this.showNotification('需求提交成功', 'success');

        // 返回需求管理页面
        setTimeout(() => {
            this.backToRequirements();
            this.loadRequirements(); // 刷新需求列表
        }, 1000);
    }

    // 生成需求标题
    generateRequirementTitle(content) {
        // 从内容中提取第一行作为标题，或者生成一个默认标题
        const lines = content.split('\n');
        const firstLine = lines[0].replace(/^#+\s*/, '').trim(); // 移除markdown标题符号

        if (firstLine && firstLine.length > 0) {
            return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
        }

        return `需求_${new Date().toLocaleDateString()}`;
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ==================== 录音功能 ====================

    // 初始化录音功能
    initializeRecording() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordingStartTime = null;
        this.recordingTimer = null;
        this.isRecording = false;
    }

    // 切换录音状态
    async toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            await this.startRecording();
        }
    }

    // 开始录音
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            this.isRecording = true;
            this.recordingStartTime = Date.now();

            // 更新UI
            this.updateRecordingUI(true);

            // 开始计时
            this.startRecordingTimer();

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                this.processRecording();
            };

            this.mediaRecorder.start();

        } catch (error) {
            console.error('录音失败:', error);
            alert('无法访问麦克风，请检查权限设置');
        }
    }

    // 停止录音
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;

            // 停止所有音频轨道
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());

            // 更新UI
            this.updateRecordingUI(false);

            // 停止计时
            this.stopRecordingTimer();
        }
    }

    // 更新录音UI
    updateRecordingUI(isRecording) {
        const recordButton = document.getElementById('recordButton');
        const recordingStatus = document.getElementById('recordingStatus');

        if (isRecording) {
            recordButton.className = 'w-20 h-20 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors';
            recordButton.innerHTML = '<i data-feather="square" class="icon-xl"></i>';
            recordingStatus.classList.remove('hidden');
        } else {
            recordButton.className = 'w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors';
            recordButton.innerHTML = '<i data-feather="mic" class="icon-xl"></i>';
            recordingStatus.classList.add('hidden');
        }

        // 重新渲染图标
        feather.replace();
    }

    // 开始录音计时
    startRecordingTimer() {
        const recordingTime = document.getElementById('recordingTime');

        this.recordingTimer = setInterval(() => {
            const elapsed = Date.now() - this.recordingStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);

            recordingTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // 停止录音计时
    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
    }

    // 处理录音结果
    processRecording() {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // 显示音频播放器
        this.showAudioPlayback(audioUrl);

        // 开始语音转文字
        this.startTranscription(audioBlob);

        // 保存录音文件
        this.currentAudioFile = {
            blob: audioBlob,
            url: audioUrl,
            timestamp: new Date().toISOString()
        };
    }

    // 显示音频播放器
    showAudioPlayback(audioUrl) {
        const audioPlayback = document.getElementById('audioPlayback');
        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');

        audioSource.src = audioUrl;
        audioPlayer.load();
        audioPlayback.classList.remove('hidden');
    }

    // 删除录音
    deleteRecording() {
        if (confirm('确定要删除这个录音吗？')) {
            const audioPlayback = document.getElementById('audioPlayback');
            const transcriptionArea = document.getElementById('transcriptionArea');

            audioPlayback.classList.add('hidden');
            transcriptionArea.classList.add('hidden');

            this.currentAudioFile = null;

            // 清理URL对象
            if (this.currentAudioFile && this.currentAudioFile.url) {
                URL.revokeObjectURL(this.currentAudioFile.url);
            }
        }
    }

    // 开始语音转文字
    startTranscription() {
        if (!this.currentAudioFile) {
            this.showToast('没有可转换的录音文件', 'error');
            return;
        }

        const transcriptionArea = document.getElementById('transcriptionArea');
        const transcriptionText = document.getElementById('transcriptionText');

        transcriptionArea.classList.remove('hidden');
        transcriptionText.textContent = '正在转换中...';

        // 模拟语音转文字（实际项目中需要集成真实的语音识别API）
        setTimeout(() => {
            const mockTranscription = this.generateMockTranscription();
            transcriptionText.textContent = mockTranscription;
            this.showToast('语音转文字完成');
        }, 2000);
    }

    // 生成模拟转录文本
    generateMockTranscription() {
        const mockTexts = [
            '我需要开发一个用户登录功能，包括用户名密码登录和第三方登录。',
            '希望能够实现一个数据导出功能，支持Excel和PDF格式。',
            '需要优化系统的性能，特别是数据库查询的响应速度。',
            '要求添加消息推送功能，支持邮件和短信通知。',
            '希望能够实现文件上传功能，支持多种文件格式。'
        ];

        return mockTexts[Math.floor(Math.random() * mockTexts.length)];
    }

    // 获取当前音频文件
    getCurrentAudioFile() {
        return this.currentAudioFile || null;
    }

    // ==================== 附件上传功能 ====================

    // 初始化附件上传
    initializeFileUpload() {
        this.uploadedFiles = [];
    }

    // 处理文件选择
    handleFileSelect(event) {
        const files = Array.from(event.target.files);
        this.processFiles(files);
    }

    // 处理拖拽上传
    handleFileDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        const files = Array.from(event.dataTransfer.files);
        this.processFiles(files);

        // 移除拖拽样式
        event.target.classList.remove('border-blue-400', 'bg-blue-50');
    }

    // 处理拖拽悬停
    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();

        // 添加拖拽样式
        event.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
    }

    // 处理拖拽离开
    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        // 移除拖拽样式
        event.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
    }

    // 处理文件
    processFiles(files) {
        files.forEach(file => {
            if (this.validateFile(file)) {
                this.uploadFile(file);
            }
        });
    }

    // 验证文件
    validateFile(file) {
        const maxSize = 50 * 1024 * 1024; // 50MB
        const allowedTypes = [
            'image/', 'audio/', 'video/',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'text/markdown'
        ];

        if (file.size > maxSize) {
            alert(`文件 "${file.name}" 超过50MB限制`);
            return false;
        }

        const isAllowed = allowedTypes.some(type => file.type.startsWith(type) || file.type === type);
        if (!isAllowed) {
            alert(`文件 "${file.name}" 格式不支持`);
            return false;
        }

        return true;
    }

    // 上传文件
    uploadFile(file) {
        const fileId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const fileInfo = {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            url: URL.createObjectURL(file),
            uploadProgress: 0,
            uploaded: false
        };

        this.uploadedFiles.push(fileInfo);
        this.renderFileItem(fileInfo);
        this.simulateUpload(fileInfo);
    }

    // 渲染文件项
    renderFileItem(fileInfo) {
        const uploadedFiles = document.getElementById('uploadedFiles');

        const fileItem = document.createElement('div');
        fileItem.id = `file-${fileInfo.id}`;
        fileItem.className = 'bg-gray-50 rounded-lg p-4 border border-gray-200';

        fileItem.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                        ${this.getFileIcon(fileInfo.type)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">${fileInfo.name}</p>
                        <p class="text-xs text-gray-500">${this.formatFileSize(fileInfo.size)}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="upload-progress hidden">
                        <div class="w-20 bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="upload-status text-xs text-gray-500">准备上传</div>
                    <button onclick="app.removeFile('${fileInfo.id}')" class="text-red-600 hover:text-red-700">
                        <i data-feather="x" class="icon-sm"></i>
                    </button>
                </div>
            </div>
            ${fileInfo.type.startsWith('image/') ? `
                <div class="mt-3">
                    <img src="${fileInfo.url}" alt="${fileInfo.name}" class="max-w-full h-32 object-cover rounded">
                </div>
            ` : ''}
        `;

        uploadedFiles.appendChild(fileItem);
        feather.replace();
    }

    // 获取文件图标
    getFileIcon(fileType) {
        if (fileType.startsWith('image/')) {
            return '<i data-feather="image" class="icon text-green-600"></i>';
        } else if (fileType.startsWith('audio/')) {
            return '<i data-feather="music" class="icon text-blue-600"></i>';
        } else if (fileType.startsWith('video/')) {
            return '<i data-feather="video" class="icon text-purple-600"></i>';
        } else if (fileType === 'application/pdf') {
            return '<i data-feather="file-text" class="icon text-red-600"></i>';
        } else if (fileType.includes('word')) {
            return '<i data-feather="file-text" class="icon text-blue-600"></i>';
        } else {
            return '<i data-feather="file" class="icon text-gray-600"></i>';
        }
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 模拟文件上传
    simulateUpload(fileInfo) {
        const fileItem = document.getElementById(`file-${fileInfo.id}`);
        const progressBar = fileItem.querySelector('.upload-progress');
        const progressFill = fileItem.querySelector('.upload-progress .bg-blue-600');
        const statusText = fileItem.querySelector('.upload-status');

        progressBar.classList.remove('hidden');
        statusText.textContent = '上传中...';

        let progress = 0;
        const uploadInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(uploadInterval);

                fileInfo.uploaded = true;
                fileInfo.uploadProgress = 100;

                progressBar.classList.add('hidden');
                statusText.textContent = '上传完成';
                statusText.className = 'upload-status text-xs text-green-600';
            }

            progressFill.style.width = `${progress}%`;
            fileInfo.uploadProgress = progress;
        }, 200);
    }

    // 移除文件
    removeFile(fileId) {
        const fileIndex = this.uploadedFiles.findIndex(f => f.id === fileId);
        if (fileIndex > -1) {
            const fileInfo = this.uploadedFiles[fileIndex];

            // 清理URL对象
            if (fileInfo.url) {
                URL.revokeObjectURL(fileInfo.url);
            }

            // 从数组中移除
            this.uploadedFiles.splice(fileIndex, 1);

            // 从DOM中移除
            const fileItem = document.getElementById(`file-${fileId}`);
            if (fileItem) {
                fileItem.remove();
            }
        }
    }

    // 获取已上传文件
    getUploadedFiles() {
        return this.uploadedFiles ? this.uploadedFiles.filter(f => f.uploaded) : [];
    }

    // 初始化资源搜索和筛选功能
    initResourceSearchAndFilter() {
        // 主机搜索
        const hostSearchInput = document.getElementById('hostSearchInput');
        if (hostSearchInput) {
            hostSearchInput.addEventListener('input', (e) => {
                this.filterHosts(e.target.value);
            });
        }

        // 主机状态筛选
        const hostStatusFilter = document.getElementById('hostStatusFilter');
        if (hostStatusFilter) {
            hostStatusFilter.addEventListener('change', (e) => {
                this.filterHostsByStatus(e.target.value);
            });
        }

        // 容器搜索
        const containerSearchInput = document.getElementById('containerSearchInput');
        if (containerSearchInput) {
            containerSearchInput.addEventListener('input', (e) => {
                this.filterContainers(e.target.value);
            });
        }

        // 容器状态筛选
        const containerStatusFilter = document.getElementById('containerStatusFilter');
        if (containerStatusFilter) {
            containerStatusFilter.addEventListener('change', (e) => {
                this.filterContainersByStatus(e.target.value);
            });
        }

        // 全选功能
        const selectAllHosts = document.getElementById('selectAllHosts');
        if (selectAllHosts) {
            selectAllHosts.addEventListener('change', (e) => {
                const checkboxes = document.querySelectorAll('#hostTableBody input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = e.target.checked);
            });
        }

        const selectAllContainers = document.getElementById('selectAllContainers');
        if (selectAllContainers) {
            selectAllContainers.addEventListener('change', (e) => {
                const checkboxes = document.querySelectorAll('#containerTableBody input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = e.target.checked);
            });
        }
    }

    // 筛选主机
    filterHosts(searchTerm) {
        if (!this.hostData) return;

        const filteredHosts = this.hostData.filter(host =>
            host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            host.ip.includes(searchTerm) ||
            host.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        this.renderFilteredHostTable(filteredHosts);
    }

    // 按状态筛选主机
    filterHostsByStatus(status) {
        if (!this.hostData) return;

        const filteredHosts = status ?
            this.hostData.filter(host => host.status === status) :
            this.hostData;

        this.renderFilteredHostTable(filteredHosts);
    }

    // 渲染筛选后的主机表格
    renderFilteredHostTable(hosts) {
        const tbody = document.getElementById('hostTableBody');
        if (!tbody) return;

        // 使用相同的渲染逻辑，但使用筛选后的数据
        const originalData = this.hostData;
        this.hostData = hosts;
        this.renderHostTable();
        this.hostData = originalData;
    }

    // 筛选容器
    filterContainers(searchTerm) {
        if (!this.containerData) return;

        const filteredContainers = this.containerData.filter(container =>
            container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            container.image.toLowerCase().includes(searchTerm.toLowerCase()) ||
            container.network.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderFilteredContainerTable(filteredContainers);
    }

    // 按状态筛选容器
    filterContainersByStatus(status) {
        if (!this.containerData) return;

        const filteredContainers = status ?
            this.containerData.filter(container => container.status === status) :
            this.containerData;

        this.renderFilteredContainerTable(filteredContainers);
    }

    // 渲染筛选后的容器表格
    renderFilteredContainerTable(containers) {
        const tbody = document.getElementById('containerTableBody');
        if (!tbody) return;

        // 使用相同的渲染逻辑，但使用筛选后的数据
        const originalData = this.containerData;
        this.containerData = containers;
        this.renderContainerTable();
        this.containerData = originalData;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AIDevPlatform();
});
