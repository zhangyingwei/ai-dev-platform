class SystemResourcesManager {
    constructor() {
        this.currentTab = 'servers';
        this.resources = this.initResourcesData();
        this.init();
    }

    init() {
        this.initTabSwitching();
        this.bindEvents();
        this.loadResourceData();
    }

    initTabSwitching() {
        const tabButtons = document.querySelectorAll('[data-tab]');
        const tabContents = document.querySelectorAll('[data-tab-content]');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // 更新按钮状态
                tabButtons.forEach(btn => {
                    btn.classList.remove('border-primary', 'text-primary', 'font-medium');
                    btn.classList.add('border-transparent', 'text-muted-foreground');
                });
                button.classList.remove('border-transparent', 'text-muted-foreground');
                button.classList.add('border-primary', 'text-primary', 'font-medium');

                // 更新内容显示
                tabContents.forEach(content => {
                    if (content.getAttribute('data-tab-content') === targetTab) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });

                this.currentTab = targetTab;
                this.loadResourceData();
            });
        });
    }

    bindEvents() {
        // 绑定全局函数
        window.openAddResourceModal = () => this.openAddResourceModal();
        window.editResource = (id) => this.editResource(id);
        window.deleteResource = (id) => this.deleteResource(id);
        window.monitorResource = (id) => this.monitorResource(id);
    }

    initResourcesData() {
        return {
            servers: [
                {
                    id: 'srv-001',
                    name: '生产服务器',
                    ip: '192.168.1.100',
                    status: 'running',
                    cpu: 45,
                    memory: { used: 8, total: 16 },
                    disk: { used: 120, total: 500 },
                    type: 'production'
                },
                {
                    id: 'srv-002',
                    name: '测试服务器',
                    ip: '192.168.1.101',
                    status: 'maintenance',
                    cpu: 15,
                    memory: { used: 4, total: 8 },
                    disk: { used: 80, total: 200 },
                    type: 'testing'
                },
                {
                    id: 'srv-003',
                    name: '开发服务器',
                    ip: '192.168.1.102',
                    status: 'running',
                    cpu: 25,
                    memory: { used: 6, total: 16 },
                    disk: { used: 150, total: 500 },
                    type: 'development'
                }
            ],
            databases: [
                {
                    id: 'db-001',
                    name: 'MySQL主库',
                    type: 'MySQL 8.0',
                    status: 'running',
                    connections: { current: 45, max: 200 },
                    storage: { used: 25, total: 100 },
                    qps: 1250
                },
                {
                    id: 'db-002',
                    name: 'Redis缓存',
                    type: 'Redis 7.0',
                    status: 'running',
                    memory: { used: 2.5, total: 8 },
                    keys: 125000,
                    hitRate: 95.2
                },
                {
                    id: 'db-003',
                    name: 'MongoDB',
                    type: 'MongoDB 6.0',
                    status: 'running',
                    collections: 15,
                    documents: 2500000,
                    storageSize: 12
                }
            ],
            knowledgeBase: [
                {
                    id: 'kb-001',
                    name: 'API文档知识库',
                    description: '包含所有API接口文档、参数说明、示例代码等',
                    status: 'available',
                    docCount: 156,
                    lastUpdate: '2小时前',
                    usage: 'high',
                    category: 'api-docs'
                },
                {
                    id: 'kb-002',
                    name: '技术规范知识库',
                    description: '开发规范、代码标准、架构设计指南等',
                    status: 'available',
                    docCount: 89,
                    lastUpdate: '1天前',
                    usage: 'medium',
                    category: 'tech-docs'
                },
                {
                    id: 'kb-003',
                    name: '业务流程知识库',
                    description: '业务流程图、用户故事、需求分析等',
                    status: 'available',
                    docCount: 67,
                    lastUpdate: '3小时前',
                    usage: 'high',
                    category: 'business-docs'
                },
                {
                    id: 'kb-004',
                    name: '第三方集成知识库',
                    description: '第三方API文档、SDK使用指南、集成案例等',
                    status: 'updating',
                    docCount: 43,
                    lastUpdate: '正在更新',
                    usage: 'medium',
                    category: 'integration-docs'
                }
            ],
            apis: [
                {
                    id: 'api-001',
                    name: '用户管理API',
                    endpoint: '/api/v1/users',
                    status: 'active',
                    version: 'v1.2.0',
                    requests: 15420,
                    avgResponse: 120,
                    uptime: 99.9
                },
                {
                    id: 'api-002',
                    name: '支付接口API',
                    endpoint: '/api/v1/payments',
                    status: 'active',
                    version: 'v2.1.0',
                    requests: 8750,
                    avgResponse: 250,
                    uptime: 99.8
                },
                {
                    id: 'api-003',
                    name: '订单管理API',
                    endpoint: '/api/v1/orders',
                    status: 'maintenance',
                    version: 'v1.5.0',
                    requests: 12300,
                    avgResponse: 180,
                    uptime: 98.5
                }
            ],
            storage: [
                {
                    id: 'storage-001',
                    name: '文件存储',
                    type: 'AWS S3',
                    status: 'active',
                    used: 2.5,
                    total: 10,
                    files: 125000,
                    bandwidth: 1.2
                },
                {
                    id: 'storage-002',
                    name: '图片CDN',
                    type: 'CloudFlare',
                    status: 'active',
                    used: 1.8,
                    total: 5,
                    files: 85000,
                    bandwidth: 2.8
                }
            ]
        };
    }

    loadResourceData() {
        // 这里可以根据当前标签页加载相应的数据
        console.log(`Loading ${this.currentTab} data...`);
    }

    openAddResourceModal() {
        // 打开添加资源的弹窗
        alert(`打开添加${this.getTabName(this.currentTab)}的弹窗`);
    }

    editResource(id) {
        console.log(`编辑资源: ${id}`);
        alert(`编辑资源: ${id}`);
    }

    deleteResource(id) {
        if (confirm('确定要删除这个资源吗？')) {
            console.log(`删除资源: ${id}`);
            alert(`资源 ${id} 已删除`);
        }
    }

    monitorResource(id) {
        console.log(`监控资源: ${id}`);
        alert(`打开资源 ${id} 的监控面板`);
    }

    getTabName(tabId) {
        const tabNames = {
            'servers': '服务器',
            'databases': '数据库',
            'knowledge-base': '知识库',
            'apis': 'API接口',
            'storage': '存储资源'
        };
        return tabNames[tabId] || tabId;
    }

    // 获取知识库列表（供其他模块调用）
    getKnowledgeBaseList() {
        return this.resources.knowledgeBase.filter(kb => kb.status === 'available');
    }

    // 根据分类获取知识库
    getKnowledgeBaseByCategory(category) {
        return this.resources.knowledgeBase.filter(kb => 
            kb.category === category && kb.status === 'available'
        );
    }

    // 搜索知识库
    searchKnowledgeBase(query) {
        return this.resources.knowledgeBase.filter(kb =>
            kb.name.toLowerCase().includes(query.toLowerCase()) ||
            kb.description.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// 初始化系统资源管理器
document.addEventListener('DOMContentLoaded', function() {
    window.systemResourcesManager = new SystemResourcesManager();
});

// 导出给其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SystemResourcesManager;
}
