// AI开发平台原型系统 - 增强版主应用逻辑

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
        this.setupMobileSupport();
    }

    setupEventListeners() {
        // 侧边栏切换
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // 导航菜单点击 - 允许超链接跳转
        document.querySelectorAll('.nav-item').forEach(item => {
            // 检查是否有有效的href属性
            const href = item.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                // 有有效链接，允许默认跳转行为
                return;
            } else {
                // 没有有效链接，使用SPA路由
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleNavigation(item);
                });
            }
        });

        // 移动端遮罩点击
        const mobileOverlay = document.getElementById('mobile-overlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => this.closeMobileSidebar());
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
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

    setupMobileSupport() {
        // 移动端触摸支持
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diffX = currentX - startX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && startX < 50) {
                    // 从左边缘向右滑动，打开侧边栏
                    this.openMobileSidebar();
                } else if (diffX < 0 && startX > window.innerWidth - 50) {
                    // 从右边缘向左滑动，关闭侧边栏
                    this.closeMobileSidebar();
                }
            }
        });
    }

    handleKeyboard(e) {
        // Ctrl + K: 全局搜索
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder="搜索..."]');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Esc: 关闭弹窗/侧边栏
        if (e.key === 'Escape') {
            this.closeMobileSidebar();
        }

        // Ctrl + 1-7: 切换模块 - 支持超链接跳转
        if (e.ctrlKey && e.key >= '1' && e.key <= '7') {
            e.preventDefault();
            const moduleIndex = parseInt(e.key) - 1;
            const navItems = document.querySelectorAll('.nav-item');
            if (navItems[moduleIndex]) {
                const navItem = navItems[moduleIndex];
                const href = navItem.getAttribute('href');
                if (href && href !== '#' && href !== '') {
                    // 有有效链接，直接跳转
                    window.location.href = href;
                } else {
                    // 没有有效链接，使用SPA路由
                    this.handleNavigation(navItem);
                }
            }
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (window.innerWidth < 1024) {
            // 移动端：显示/隐藏侧边栏
            const isHidden = sidebar.classList.contains('-translate-x-full');
            if (isHidden) {
                this.openMobileSidebar();
            } else {
                this.closeMobileSidebar();
            }
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

    openMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
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
            case 'AI插件管理':
                moduleName = 'ai-plugins';
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
        
        // 初始化模块特定的功能
        this.initModuleFeatures(moduleName);
        
        // 添加加载动画
        this.showLoadingAnimation();
    }

    showLoadingAnimation() {
        const content = document.getElementById('main-content');
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.opacity = '1';
        }, 100);
    }

    updateBreadcrumb(moduleName) {
        const moduleNames = {
            'workspace': '工作台',
            'ai-plugins': 'AI插件管理',
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
            case 'ai-plugins':
                return window.moduleContent ? window.moduleContent.getAIPluginsContent() : this.getPlaceholderContent('AI插件管理');
            case 'development':
                return window.moduleContent ? window.moduleContent.getDevelopmentContent() : this.getPlaceholderContent('开发流程');
            case 'projects':
                return window.moduleContent ? window.moduleContent.getProjectsContent() : this.getPlaceholderContent('项目管理');
            case 'monitoring':
                return window.moduleContent ? window.moduleContent.getMonitoringContent() : this.getPlaceholderContent('运维监控');
            case 'resources':
                return window.moduleContent ? window.moduleContent.getResourcesContent() : this.getPlaceholderContent('开发资源管理');
            case 'system':
                return window.moduleContent ? window.moduleContent.getSystemContent() : this.getPlaceholderContent('系统管理');
            default:
                return this.getWorkspaceContent();
        }
    }

    getPlaceholderContent(moduleName) {
        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold">${moduleName}</h1>
                    <div class="flex space-x-3">
                        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-gray-800 transition-colors">
                            新建
                        </button>
                    </div>
                </div>
                <div class="bg-card border border-border rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">${moduleName}概览</h2>
                    <p class="text-muted-foreground">${moduleName}功能正在开发中...</p>
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
            case 'ai-plugins':
                this.initAIPluginsFeatures();
                break;
            case 'development':
                this.initDevelopmentFeatures();
                break;
            // 其他模块的初始化将在后续添加
        }
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

    initAIPluginsFeatures() {
        // AI插件启用/停用交互
        document.querySelectorAll('button[class*="text-destructive"], button[class*="text-success"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const isEnable = e.target.textContent === '启用';
                const statusIndicator = e.target.closest('.bg-card').querySelector('.w-2.h-2');
                const statusText = statusIndicator.nextElementSibling;
                
                if (isEnable) {
                    statusIndicator.className = 'w-2 h-2 bg-success rounded-full';
                    statusText.textContent = '运行中';
                    statusText.className = 'text-xs text-success';
                    e.target.textContent = '停用';
                    e.target.className = 'text-destructive text-sm hover:underline';
                } else {
                    statusIndicator.className = 'w-2 h-2 bg-destructive rounded-full';
                    statusText.textContent = '已停用';
                    statusText.className = 'text-xs text-destructive';
                    e.target.textContent = '启用';
                    e.target.className = 'text-success text-sm hover:underline';
                }
            });
        });
    }

    initDevelopmentFeatures() {
        // 代码生成按钮交互
        const generateButton = document.querySelector('button:contains("生成代码")');
        if (generateButton) {
            generateButton.addEventListener('click', () => {
                this.simulateCodeGeneration();
            });
        }
    }

    simulateCodeGeneration() {
        const codeArea = document.querySelector('.font-mono pre');
        if (codeArea) {
            codeArea.textContent = '正在生成代码...';
            setTimeout(() => {
                codeArea.innerHTML = `@RestController
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
}`;
            }, 2000);
        }
    }

    getWorkspaceContent() {
        return `
            <div class="space-y-6">
                <!-- 页面标题 -->
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold">个人工作台</h1>
                    <div class="flex space-x-2">
                        <button class="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                            新建任务
                        </button>
                        <button class="px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium">
                            设置
                        </button>
                    </div>
                </div>

                <!-- 统计卡片 -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-card border border-border rounded-lg p-4 card-hover cursor-pointer group">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-2">
                                    <p class="text-sm font-medium text-muted-foreground">今日任务</p>
                                    <div class="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                                </div>
                                <p class="text-3xl font-bold tracking-tight">8</p>
                                <div class="flex items-center space-x-1 mt-2">
                                    <svg class="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <p class="text-xs text-success font-medium">+2 vs 昨日</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 bg-gradient-to-br from-warning/20 to-warning/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012-2v1a2 2 0 00-2 2H6a2 2 0 00-2 2z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-card border border-border rounded-lg p-4 card-hover cursor-pointer group">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <p class="text-sm font-medium text-muted-foreground">AI使用次数</p>
                                    <div class="w-1.5 h-1.5 bg-success rounded-full"></div>
                                </div>
                                <p class="text-2xl font-bold tracking-tight">23</p>
                                <div class="flex items-center space-x-1 mt-1">
                                    <svg class="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <p class="text-xs text-success font-medium">+15 今日新增</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-card border border-border rounded-lg p-4 card-hover cursor-pointer group">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <p class="text-sm font-medium text-muted-foreground">代码提交</p>
                                    <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                                </div>
                                <p class="text-2xl font-bold tracking-tight">12</p>
                                <div class="flex items-center space-x-1 mt-1">
                                    <svg class="w-3 h-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                    </svg>
                                    <p class="text-xs text-muted-foreground font-medium">本周统计</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 bg-gradient-to-br from-muted/30 to-muted/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-card border border-border rounded-lg p-4 card-hover cursor-pointer group">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <p class="text-sm font-medium text-muted-foreground">项目进度</p>
                                    <div class="w-1.5 h-1.5 bg-warning rounded-full animate-pulse"></div>
                                </div>
                                <p class="text-2xl font-bold tracking-tight">75%</p>
                                <div class="flex items-center space-x-1 mt-1">
                                    <svg class="w-3 h-3 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                    <p class="text-xs text-warning font-medium">需要关注</p>
                                </div>
                                <div class="w-full bg-muted rounded-full h-1 mt-2">
                                    <div class="bg-warning h-1 rounded-full progress-bar" style="width: 75%"></div>
                                </div>
                            </div>
                            <div class="w-10 h-10 bg-gradient-to-br from-warning/20 to-warning/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 主要内容区域 -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <!-- 今日任务 -->
                    <div class="lg:col-span-2">
                        <div class="bg-card border border-border rounded-lg p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center space-x-2">
                                    <h2 class="text-base font-semibold">今日任务</h2>
                                    <span class="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-full font-medium">5个</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <button class="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors">
                                        筛选
                                    </button>
                                    <button class="px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors font-medium">
                                        查看全部
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="group flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-warning/50 hover:bg-warning/5 transition-all cursor-pointer">
                                    <div class="flex items-center">
                                        <input type="checkbox" class="w-4 h-4 rounded border-2 border-border focus:ring-2 focus:ring-warning/20 text-warning">
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <p class="font-medium text-foreground group-hover:text-warning transition-colors">完成用户注册API开发</p>
                                            <div class="w-2 h-2 bg-warning rounded-full"></div>
                                        </div>
                                        <div class="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>今天 18:00</span>
                                            </span>
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>高优先级</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-1.5">
                                        <span class="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full font-medium border border-warning/20">进行中</span>
                                        <button class="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-all">
                                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="group flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-muted-foreground/30 hover:bg-accent/50 transition-all cursor-pointer">
                                    <div class="flex items-center">
                                        <input type="checkbox" class="w-4 h-4 rounded border-2 border-border focus:ring-2 focus:ring-primary/20 text-primary">
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <p class="font-medium text-foreground">修复登录页面样式问题</p>
                                            <div class="w-2 h-2 bg-muted-foreground rounded-full"></div>
                                        </div>
                                        <div class="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>明天 12:00</span>
                                            </span>
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>中优先级</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-1.5">
                                        <span class="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full font-medium">待开始</span>
                                        <button class="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-all">
                                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="group flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-success/50 hover:bg-success/5 transition-all cursor-pointer opacity-75">
                                    <div class="flex items-center">
                                        <input type="checkbox" checked class="w-4 h-4 rounded border-2 border-success focus:ring-2 focus:ring-success/20 text-success">
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <p class="font-medium text-muted-foreground line-through">优化数据库查询性能</p>
                                            <div class="w-2 h-2 bg-success rounded-full"></div>
                                        </div>
                                        <div class="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>已完成</span>
                                            </span>
                                            <span class="flex items-center space-x-1">
                                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>中优先级</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-1.5">
                                        <span class="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full font-medium border border-success/20">已完成</span>
                                        <button class="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-all">
                                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- 添加任务按钮 -->
                            <div class="mt-3 pt-3 border-t border-border">
                                <button class="w-full flex items-center justify-center space-x-1.5 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors border border-dashed border-border hover:border-primary/30">
                                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-xs font-medium">添加新任务</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- AI助手状态 -->
                    <div class="space-y-4">
                        <div class="bg-card border border-border rounded-lg p-4">
                            <div class="flex items-center justify-between mb-3">
                                <h2 class="text-base font-semibold">AI助手状态</h2>
                                <button class="text-xs text-muted-foreground hover:text-foreground">配置</button>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between p-2 border border-border rounded">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-1.5 h-1.5 bg-success rounded-full"></div>
                                        <span class="text-sm font-medium">Claude Code</span>
                                    </div>
                                    <span class="text-xs text-muted-foreground">1.2s</span>
                                </div>

                                <div class="flex items-center justify-between p-2 border border-border rounded">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-1.5 h-1.5 bg-success rounded-full"></div>
                                        <span class="text-sm font-medium">Gemini Code</span>
                                    </div>
                                    <span class="text-xs text-muted-foreground">0.8s</span>
                                </div>

                                <div class="flex items-center justify-between p-2 border border-border rounded">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                                        <span class="text-sm font-medium">Cursor AI</span>
                                    </div>
                                    <span class="text-xs text-muted-foreground">离线</span>
                                </div>
                            </div>
                        </div>

                        <!-- 快速操作 -->
                        <div class="bg-card border border-border rounded-lg p-4">
                            <h2 class="text-base font-semibold mb-3">快速操作</h2>
                            <div class="grid grid-cols-2 gap-2">
                                <button class="p-2 border border-border rounded hover:bg-accent transition-colors text-center">
                                    <div class="text-base mb-0.5">🚀</div>
                                    <div class="text-xs">AI生成</div>
                                </button>
                                <button class="p-2 border border-border rounded hover:bg-accent transition-colors text-center">
                                    <div class="text-base mb-0.5">🔍</div>
                                    <div class="text-xs">代码审查</div>
                                </button>
                                <button class="p-2 border border-border rounded hover:bg-accent transition-colors text-center">
                                    <div class="text-base mb-0.5">🧪</div>
                                    <div class="text-xs">运行测试</div>
                                </button>
                                <button class="p-2 border border-border rounded hover:bg-accent transition-colors text-center">
                                    <div class="text-base mb-0.5">📊</div>
                                    <div class="text-xs">生成报告</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new AIDevPlatform();
});
