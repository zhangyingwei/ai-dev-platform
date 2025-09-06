// 代码编辑器管理类
class CodeEditor {
    constructor() {
        this.editor = null;
        this.diffEditor = null;
        this.currentFile = null;
        this.fileTree = {};
        this.isInitialized = false;
        this.reviewComments = new Map(); // 存储代码审查评论
        this.reviewMode = false; // 是否处于审查模式
        this.changes = new Map(); // 存储代码更改
        this.changeStatus = new Map(); // 存储更改状态 (pending, accepted, rejected)
        this.isDiffMode = false; // 是否处于Diff模式
        this.lineChanges = new Map(); // 存储行级更改
        this.decorations = []; // 存储编辑器装饰
        this.inlineWidgets = new Map(); // 存储内联操作组件
    }

    // 初始化Monaco Editor
    async initialize() {
        if (this.isInitialized) return;

        return new Promise((resolve, reject) => {
            require.config({ 
                paths: { 
                    'vs': 'https://unpkg.com/monaco-editor@0.44.0/min/vs' 
                } 
            });

            require(['vs/editor/editor.main'], () => {
                this.isInitialized = true;
                resolve();
            }, reject);
        });
    }

    // 创建代码编辑器
    createEditor(containerId, options = {}) {
        const defaultOptions = {
            value: '',
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 12,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            folding: true,
            selectOnLineNumbers: true,
            matchBrackets: 'always',
            autoIndent: 'full',
            formatOnPaste: true,
            formatOnType: true,
            ...options
        };

        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return null;
        }

        this.editor = monaco.editor.create(container, defaultOptions);

        // 添加代码审查相关的事件监听
        this.setupReviewFeatures();

        // 设置行级点击事件
        this.setupLineClickEvents();

        return this.editor;
    }

    // 创建Diff编辑器
    createDiffEditor(containerId, originalContent, modifiedContent, options = {}) {
        const defaultOptions = {
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 12,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            readOnly: true,
            renderSideBySide: true,
            ...options
        };

        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return null;
        }

        this.diffEditor = monaco.editor.createDiffEditor(container, defaultOptions);
        
        const originalModel = monaco.editor.createModel(originalContent, 'javascript');
        const modifiedModel = monaco.editor.createModel(modifiedContent, 'javascript');
        
        this.diffEditor.setModel({
            original: originalModel,
            modified: modifiedModel
        });

        return this.diffEditor;
    }

    // 设置代码审查功能
    setupReviewFeatures() {
        if (!this.editor) return;

        // 添加右键菜单项
        this.editor.addAction({
            id: 'add-review-comment',
            label: '添加审查评论',
            contextMenuGroupId: 'navigation',
            contextMenuOrder: 1.5,
            run: (editor) => {
                const position = editor.getPosition();
                this.addReviewComment(position.lineNumber);
            }
        });

        // 监听鼠标点击事件，显示已有评论
        this.editor.onMouseDown((e) => {
            if (e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
                const lineNumber = e.target.position.lineNumber;
                this.showReviewComment(lineNumber);
            }
        });
    }

    // 添加审查评论
    addReviewComment(lineNumber) {
        const comment = prompt('请输入审查评论:');
        if (comment && comment.trim()) {
            const commentData = {
                id: Date.now(),
                lineNumber: lineNumber,
                comment: comment.trim(),
                author: 'Current User', // 实际应用中应该从用户系统获取
                timestamp: new Date().toISOString(),
                resolved: false
            };

            this.reviewComments.set(lineNumber, commentData);
            this.renderReviewMarkers();
            this.updateReviewPanel();
        }
    }

    // 显示审查评论
    showReviewComment(lineNumber) {
        const comment = this.reviewComments.get(lineNumber);
        if (comment) {
            // 创建评论弹窗
            this.showCommentPopup(comment);
        }
    }

    // 渲染审查标记
    renderReviewMarkers() {
        if (!this.editor) return;

        const decorations = Array.from(this.reviewComments.values()).map(comment => ({
            range: new monaco.Range(comment.lineNumber, 1, comment.lineNumber, 1),
            options: {
                isWholeLine: true,
                className: comment.resolved ? 'review-comment-resolved' : 'review-comment-pending',
                glyphMarginClassName: comment.resolved ? 'review-glyph-resolved' : 'review-glyph-pending',
                hoverMessage: { value: `**审查评论**: ${comment.comment}` }
            }
        }));

        this.editor.deltaDecorations([], decorations);
    }

    // 显示评论弹窗
    showCommentPopup(comment) {
        // 创建评论弹窗HTML
        const popup = document.createElement('div');
        popup.className = 'review-comment-popup';
        popup.innerHTML = `
            <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-3 max-w-sm">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-medium text-gray-900">${comment.author}</span>
                    <span class="text-xs text-gray-500">${new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <p class="text-xs text-gray-700 mb-2">${comment.comment}</p>
                <div class="flex space-x-2">
                    <button onclick="codeEditor.resolveComment(${comment.lineNumber})" 
                            class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200">
                        ${comment.resolved ? '已解决' : '标记解决'}
                    </button>
                    <button onclick="codeEditor.deleteComment(${comment.lineNumber})" 
                            class="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">
                        删除
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            class="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                        关闭
                    </button>
                </div>
            </div>
        `;

        // 定位弹窗
        document.body.appendChild(popup);
        
        // 3秒后自动关闭
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 5000);
    }

    // 解决评论
    resolveComment(lineNumber) {
        const comment = this.reviewComments.get(lineNumber);
        if (comment) {
            comment.resolved = !comment.resolved;
            this.renderReviewMarkers();
            this.updateReviewPanel();
        }
    }

    // 删除评论
    deleteComment(lineNumber) {
        this.reviewComments.delete(lineNumber);
        this.renderReviewMarkers();
        this.updateReviewPanel();
    }

    // 更新审查面板
    updateReviewPanel() {
        const panel = document.getElementById('reviewPanel');
        if (!panel) return;

        const comments = Array.from(this.reviewComments.values());
        const pendingComments = comments.filter(c => !c.resolved);
        const resolvedComments = comments.filter(c => c.resolved);

        panel.innerHTML = `
            <div class="space-y-3">
                <div>
                    <h5 class="text-xs font-medium text-gray-900 mb-2">待解决 (${pendingComments.length})</h5>
                    ${pendingComments.map(comment => `
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-xs font-medium text-gray-900">第${comment.lineNumber}行</span>
                                <span class="text-xs text-gray-500">${comment.author}</span>
                            </div>
                            <p class="text-xs text-gray-700">${comment.comment}</p>
                        </div>
                    `).join('')}
                </div>
                <div>
                    <h5 class="text-xs font-medium text-gray-900 mb-2">已解决 (${resolvedComments.length})</h5>
                    ${resolvedComments.map(comment => `
                        <div class="bg-green-50 border border-green-200 rounded p-2 mb-2">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-xs font-medium text-gray-900">第${comment.lineNumber}行</span>
                                <span class="text-xs text-gray-500">${comment.author}</span>
                            </div>
                            <p class="text-xs text-gray-700">${comment.comment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 加载文件内容
    loadFile(filePath, content, language = 'javascript') {
        if (!this.editor) return;

        this.currentFile = filePath;
        this.editor.setValue(content);
        monaco.editor.setModelLanguage(this.editor.getModel(), language);
        
        // 更新文件标签
        this.updateFileTab(filePath);
    }

    // 更新文件标签
    updateFileTab(filePath) {
        const fileTab = document.getElementById('currentFileTab');
        if (fileTab) {
            const fileName = filePath.split('/').pop();
            fileTab.textContent = fileName;
        }
    }

    // 获取当前文件内容
    getCurrentContent() {
        return this.editor ? this.editor.getValue() : '';
    }

    // 设置主题
    setTheme(theme) {
        if (this.editor) {
            monaco.editor.setTheme(theme);
        }
        if (this.diffEditor) {
            this.diffEditor.updateOptions({ theme: theme });
        }
    }

    // 初始化代码更改跟踪
    initializeChangeTracking() {
        // 模拟一些代码更改
        this.changes.set('change_1', {
            id: 'change_1',
            file: 'src/components/Login.jsx',
            startLine: 15,
            endLine: 18,
            description: '优化表单验证逻辑',
            type: 'modification',
            originalCode: `const validateForm = () => {
    return email && password;
};`,
            modifiedCode: `const validateForm = () => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email) && password.length >= 6;
};`
        });

        this.changes.set('change_2', {
            id: 'change_2',
            file: 'src/components/Login.jsx',
            startLine: 25,
            endLine: 30,
            description: '添加错误处理机制',
            type: 'addition',
            originalCode: '',
            modifiedCode: `const handleError = (error) => {
    console.error('Login error:', error);
    setErrorMessage('登录失败，请重试');
    setIsLoading(false);
};`
        });

        this.changes.set('change_3', {
            id: 'change_3',
            file: 'src/components/Login.jsx',
            startLine: 42,
            endLine: 45,
            description: '更新CSS类名以符合新的设计系统',
            type: 'modification',
            originalCode: `<div className="login-container">
    <div className="login-form">`,
            modifiedCode: `<div className="auth-container">
    <div className="auth-form auth-form--login">`
        });

        // 初始化所有更改为待审查状态
        this.changes.forEach((change, id) => {
            this.changeStatus.set(id, 'pending');
        });

        // 初始化行级更改跟踪
        this.initializeLineChanges();
    }

    // 初始化行级更改跟踪
    initializeLineChanges() {
        // 将更改映射到具体的行
        this.changes.forEach((change, id) => {
            for (let line = change.startLine; line <= change.endLine; line++) {
                this.lineChanges.set(line, {
                    changeId: id,
                    type: change.type,
                    status: 'pending',
                    description: change.description
                });
            }
        });
    }

    // 接受更改
    acceptChange(changeId) {
        if (this.changes.has(changeId)) {
            this.changeStatus.set(changeId, 'accepted');
            // 更新相关行的状态
            this.updateLineChangeStatus(changeId, 'accepted');
            // 清除内联组件
            this.clearInlineWidgets();
            // 重新渲染装饰
            this.renderLineDecorations();
            this.updateChangeDisplay();
            return true;
        }
        return false;
    }

    // 拒绝更改
    rejectChange(changeId) {
        if (this.changes.has(changeId)) {
            this.changeStatus.set(changeId, 'rejected');
            // 更新相关行的状态
            this.updateLineChangeStatus(changeId, 'rejected');
            // 清除内联组件
            this.clearInlineWidgets();
            // 重新渲染装饰
            this.renderLineDecorations();
            this.updateChangeDisplay();
            return true;
        }
        return false;
    }

    // 更新行级更改状态
    updateLineChangeStatus(changeId, status) {
        this.lineChanges.forEach((lineChange, lineNumber) => {
            if (lineChange.changeId === changeId) {
                lineChange.status = status;
            }
        });
    }

    // 渲染行级装饰
    renderLineDecorations() {
        if (!this.editor) return;

        // 清除之前的装饰
        this.decorations = this.editor.deltaDecorations(this.decorations, []);

        const newDecorations = [];
        this.lineChanges.forEach((lineChange, lineNumber) => {
            let className, glyphClassName;

            switch(lineChange.status) {
                case 'pending':
                    className = 'line-change-pending';
                    glyphClassName = 'glyph-pending';
                    break;
                case 'accepted':
                    className = 'line-change-accepted';
                    glyphClassName = 'glyph-accepted';
                    break;
                case 'rejected':
                    className = 'line-change-rejected';
                    glyphClassName = 'glyph-rejected';
                    break;
            }

            newDecorations.push({
                range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                options: {
                    isWholeLine: true,
                    className: className,
                    glyphMarginClassName: glyphClassName,
                    hoverMessage: {
                        value: `**${lineChange.description}** (${lineChange.status})\n\n点击行号进行操作`
                    }
                }
            });
        });

        this.decorations = this.editor.deltaDecorations([], newDecorations);
    }

    // 设置行级点击事件
    setupLineClickEvents() {
        if (!this.editor) return;

        this.editor.onMouseDown((e) => {
            if (e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS) {
                const lineNumber = e.target.position.lineNumber;
                const lineChange = this.lineChanges.get(lineNumber);

                if (lineChange && lineChange.status === 'pending') {
                    this.showInlineActions(lineNumber, lineChange);
                }
            }
        });
    }

    // 显示内联操作
    showInlineActions(lineNumber, lineChange) {
        // 移除之前的内联组件
        this.clearInlineWidgets();

        const widget = {
            domNode: null,
            getId: () => `inline-actions-${lineNumber}`,
            getDomNode: () => {
                if (!widget.domNode) {
                    widget.domNode = document.createElement('div');
                    widget.domNode.className = 'inline-actions-widget';
                    widget.domNode.innerHTML = `
                        <div class="inline-actions-container">
                            <div class="inline-actions-content">
                                <span class="change-description">${lineChange.description}</span>
                                <div class="action-buttons">
                                    <button class="action-btn accept-btn" onclick="window.codeEditor.acceptChange('${lineChange.changeId}')">
                                        ✅ 接受
                                    </button>
                                    <button class="action-btn reject-btn" onclick="window.codeEditor.rejectChange('${lineChange.changeId}')">
                                        ❌ 拒绝
                                    </button>
                                    <button class="action-btn close-btn" onclick="window.codeEditor.clearInlineWidgets()">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }
                return widget.domNode;
            },
            getPosition: () => ({
                position: { lineNumber: lineNumber, column: 1 },
                preference: [monaco.editor.ContentWidgetPositionPreference.BELOW]
            })
        };

        this.editor.addContentWidget(widget);
        this.inlineWidgets.set(lineNumber, widget);
    }

    // 清除内联组件
    clearInlineWidgets() {
        this.inlineWidgets.forEach((widget, lineNumber) => {
            this.editor.removeContentWidget(widget);
        });
        this.inlineWidgets.clear();
    }

    // 获取更改统计
    getChangeStats() {
        let accepted = 0, rejected = 0, pending = 0;

        this.changeStatus.forEach(status => {
            switch(status) {
                case 'accepted': accepted++; break;
                case 'rejected': rejected++; break;
                case 'pending': pending++; break;
            }
        });

        return { accepted, rejected, pending };
    }

    // 更新更改显示
    updateChangeDisplay() {
        const stats = this.getChangeStats();

        // 更新统计信息
        if (window.app) {
            window.app.updateChangeStats(stats.accepted, stats.rejected, stats.pending);
        }

        // 不再需要更新更改列表显示，因为已经删除了右侧面板
        // this.updateChangesListDisplay();
    }

    // 注意：updateChangesListDisplay方法已删除，因为右侧面板已被移除

    // 获取已接受的更改
    getAcceptedChanges() {
        const acceptedChanges = [];
        this.changeStatus.forEach((status, id) => {
            if (status === 'accepted') {
                acceptedChanges.push(this.changes.get(id));
            }
        });
        return acceptedChanges;
    }

    // 销毁编辑器
    dispose() {
        if (this.editor) {
            this.editor.dispose();
            this.editor = null;
        }
        if (this.diffEditor) {
            this.diffEditor.dispose();
            this.diffEditor = null;
        }
    }
}

// 全局代码编辑器实例
window.codeEditor = new CodeEditor();
