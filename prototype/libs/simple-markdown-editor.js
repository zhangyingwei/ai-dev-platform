/**
 * Simple Markdown Editor
 * 轻量级Markdown编辑器
 */
class SimpleMarkdownEditor {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            placeholder: '请输入内容...',
            toolbar: true,
            preview: true,
            autosave: false,
            ...options
        };
        
        this.isPreviewMode = false;
        this.isSideBySide = false;
        
        this.init();
    }
    
    init() {
        this.createEditor();
        this.bindEvents();
        
        if (this.options.autosave) {
            this.setupAutosave();
        }
    }
    
    createEditor() {
        // 创建编辑器容器
        this.container = document.createElement('div');
        this.container.className = 'markdown-editor-container';
        
        // 创建工具栏
        if (this.options.toolbar) {
            this.createToolbar();
        }
        
        // 创建编辑器主体
        this.createEditorBody();
        
        // 创建状态栏
        this.createStatusBar();
        
        // 替换原始元素
        this.element.parentNode.replaceChild(this.container, this.element);
    }
    
    createToolbar() {
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'markdown-toolbar';
        
        const buttons = [
            { name: 'wysiwyg', icon: '📝', title: '所见即所得', action: () => this.toggleWysiwyg() },
            { name: 'separator' },
            { name: 'bold', icon: 'B', title: '粗体', action: () => this.insertText('**', '**') },
            { name: 'italic', icon: 'I', title: '斜体', action: () => this.insertText('*', '*') },
            { name: 'heading', icon: 'H', title: '标题', action: () => this.insertText('## ', '') },
            { name: 'separator' },
            { name: 'quote', icon: '"', title: '引用', action: () => this.insertText('> ', '') },
            { name: 'list', icon: '•', title: '列表', action: () => this.insertText('- ', '') },
            { name: 'ordered-list', icon: '1.', title: '有序列表', action: () => this.insertText('1. ', '') },
            { name: 'separator' },
            { name: 'link', icon: '🔗', title: '链接', action: () => this.insertText('[', '](url)') },
            { name: 'image', icon: '🖼️', title: '图片', action: () => this.insertText('![', '](url)') },
            { name: 'code', icon: '<>', title: '代码', action: () => this.insertText('`', '`') },
            { name: 'separator' },
            { name: 'preview', icon: '👁️', title: '预览', action: () => this.togglePreview() },
            { name: 'side-by-side', icon: '⚌', title: '分屏', action: () => this.toggleSideBySide() },
        ];
        
        buttons.forEach(button => {
            if (button.name === 'separator') {
                const separator = document.createElement('div');
                separator.className = 'separator';
                this.toolbar.appendChild(separator);
            } else {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.innerHTML = button.icon;
                btn.title = button.title;
                btn.onclick = button.action;
                this.toolbar.appendChild(btn);
            }
        });
        
        this.container.appendChild(this.toolbar);
    }
    
    createEditorBody() {
        this.editorWrapper = document.createElement('div');
        this.editorWrapper.className = 'markdown-editor-wrapper';

        // 创建文本输入区域
        this.textarea = document.createElement('textarea');
        this.textarea.className = 'markdown-editor-input';
        this.textarea.placeholder = this.options.placeholder;
        this.textarea.value = this.element.value || '';

        // 创建预览区域
        this.preview = document.createElement('div');
        this.preview.className = 'markdown-editor-preview hidden';

        // 创建WYSIWYG编辑区域
        this.wysiwygEditor = document.createElement('div');
        this.wysiwygEditor.className = 'markdown-wysiwyg-editor hidden';
        this.wysiwygEditor.contentEditable = true;
        this.wysiwygEditor.innerHTML = '<p>开始输入...</p>';

        this.editorWrapper.appendChild(this.textarea);
        this.editorWrapper.appendChild(this.wysiwygEditor);
        this.editorWrapper.appendChild(this.preview);
        this.container.appendChild(this.editorWrapper);
    }
    
    createStatusBar() {
        this.statusBar = document.createElement('div');
        this.statusBar.className = 'markdown-status-bar';
        
        this.statusLeft = document.createElement('span');
        this.statusRight = document.createElement('span');
        
        this.statusBar.appendChild(this.statusLeft);
        this.statusBar.appendChild(this.statusRight);
        this.container.appendChild(this.statusBar);
        
        this.updateStatus();
    }
    
    bindEvents() {
        this.textarea.addEventListener('input', () => {
            this.updatePreview();
            this.updateStatus();

            if (this.options.onChange) {
                this.options.onChange(this.value());
            }
        });

        this.textarea.addEventListener('keydown', (e) => {
            // Tab键插入空格
            if (e.key === 'Tab') {
                e.preventDefault();
                this.insertText('    ', '');
            }
        });

        // WYSIWYG编辑器事件
        this.wysiwygEditor.addEventListener('input', () => {
            this.syncWysiwygToMarkdown();
            this.updateStatus();

            if (this.options.onChange) {
                this.options.onChange(this.value());
            }
        });

        this.wysiwygEditor.addEventListener('keyup', () => {
            this.syncWysiwygToMarkdown();
            this.updateStatus();
        });

        this.wysiwygEditor.addEventListener('paste', () => {
            setTimeout(() => {
                this.syncWysiwygToMarkdown();
                this.updateStatus();
            }, 10);
        });

        this.wysiwygEditor.addEventListener('keydown', (e) => {
            // 处理快捷键
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'b':
                        e.preventDefault();
                        this.execCommand('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.execCommand('italic');
                        break;
                }
            }

            // 处理回车键
            if (e.key === 'Enter') {
                setTimeout(() => {
                    this.syncWysiwygToMarkdown();
                    this.updateStatus();
                }, 10);
            }
        });
    }
    
    setupAutosave() {
        if (this.options.autosave.enabled) {
            setInterval(() => {
                const content = this.value();
                if (content !== this.lastSavedContent) {
                    localStorage.setItem(this.options.autosave.uniqueId, content);
                    this.lastSavedContent = content;
                    this.statusLeft.textContent = '已自动保存';
                    setTimeout(() => {
                        this.updateStatus();
                    }, 2000);
                }
            }, this.options.autosave.delay || 5000);
            
            // 加载保存的内容
            const saved = localStorage.getItem(this.options.autosave.uniqueId);
            if (saved && !this.textarea.value) {
                this.textarea.value = saved;
                this.updatePreview();
            }
        }
    }
    
    insertText(before, after) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selectedText = this.textarea.value.substring(start, end);
        const newText = before + selectedText + after;
        
        this.textarea.setRangeText(newText, start, end, 'end');
        this.textarea.focus();
        
        this.updatePreview();
        this.updateStatus();
    }
    
    togglePreview() {
        this.isPreviewMode = !this.isPreviewMode;
        this.isSideBySide = false;
        
        if (this.isPreviewMode) {
            this.textarea.style.display = 'none';
            this.preview.classList.remove('hidden');
            this.preview.style.borderLeft = 'none';
        } else {
            this.textarea.style.display = 'block';
            this.preview.classList.add('hidden');
        }
        
        this.updatePreview();
    }
    
    toggleSideBySide() {
        this.isSideBySide = !this.isSideBySide;
        this.isPreviewMode = false;
        this.isWysiwygMode = false;

        if (this.isSideBySide) {
            this.textarea.style.display = 'block';
            this.wysiwygEditor.classList.add('hidden');
            this.preview.classList.remove('hidden');
            this.preview.style.borderLeft = '1px solid #e5e7eb';
        } else {
            this.preview.classList.add('hidden');
        }

        this.updatePreview();
    }

    toggleWysiwyg() {
        this.isWysiwygMode = !this.isWysiwygMode;
        this.isPreviewMode = false;
        this.isSideBySide = false;

        if (this.isWysiwygMode) {
            this.textarea.style.display = 'none';
            this.preview.classList.add('hidden');
            this.wysiwygEditor.classList.remove('hidden');
            this.syncMarkdownToWysiwyg();
        } else {
            this.textarea.style.display = 'block';
            this.wysiwygEditor.classList.add('hidden');
            this.syncWysiwygToMarkdown();
        }
    }

    syncMarkdownToWysiwyg() {
        const markdownContent = this.textarea.value;
        const htmlContent = this.markdownToHtml(markdownContent);
        this.wysiwygEditor.innerHTML = htmlContent || '<p>开始输入...</p>';
    }

    syncWysiwygToMarkdown() {
        if (!this.isWysiwygMode) return;

        const htmlContent = this.wysiwygEditor.innerHTML;
        const markdownContent = this.htmlToMarkdown(htmlContent);
        this.textarea.value = markdownContent;

        // 触发textarea的input事件以确保其他监听器能收到更新
        const event = new Event('input', { bubbles: true });
        this.textarea.dispatchEvent(event);
    }

    execCommand(command) {
        document.execCommand(command, false, null);
        this.syncWysiwygToMarkdown();
    }

    htmlToMarkdown(html) {
        // 创建临时DOM元素来解析HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // 递归处理DOM节点
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                const children = Array.from(node.childNodes).map(processNode).join('');

                switch (tagName) {
                    case 'h1':
                        return `# ${children}\n\n`;
                    case 'h2':
                        return `## ${children}\n\n`;
                    case 'h3':
                        return `### ${children}\n\n`;
                    case 'h4':
                        return `#### ${children}\n\n`;
                    case 'h5':
                        return `##### ${children}\n\n`;
                    case 'h6':
                        return `###### ${children}\n\n`;
                    case 'strong':
                    case 'b':
                        return `**${children}**`;
                    case 'em':
                    case 'i':
                        return `*${children}*`;
                    case 'code':
                        return `\`${children}\``;
                    case 'a':
                        const href = node.getAttribute('href') || '';
                        return `[${children}](${href})`;
                    case 'img':
                        const src = node.getAttribute('src') || '';
                        const alt = node.getAttribute('alt') || '';
                        return `![${alt}](${src})`;
                    case 'blockquote':
                        return `> ${children}\n\n`;
                    case 'ul':
                        return `${children}\n`;
                    case 'ol':
                        return `${children}\n`;
                    case 'li':
                        return `- ${children}\n`;
                    case 'p':
                        return `${children}\n\n`;
                    case 'br':
                        return '\n';
                    case 'div':
                        return `${children}\n`;
                    default:
                        return children;
                }
            }

            return '';
        };

        const markdown = processNode(tempDiv)
            // 清理多余的换行
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        return markdown;
    }
    
    updatePreview() {
        if (!this.preview.classList.contains('hidden')) {
            this.preview.innerHTML = this.markdownToHtml(this.textarea.value);
        }
    }
    
    updateStatus() {
        const content = this.textarea.value;
        const lines = content.split('\n').length;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const chars = content.length;
        
        this.statusRight.textContent = `${lines} 行, ${words} 词, ${chars} 字符`;
    }
    
    markdownToHtml(markdown) {
        // 简单的Markdown转HTML实现
        let html = markdown
            // 标题
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // 粗体和斜体
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // 代码
            .replace(/`(.*?)`/gim, '<code>$1</code>')
            // 链接
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
            // 图片
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1">')
            // 引用
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            // 列表
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/^(\d+)\. (.*$)/gim, '<li>$1. $2</li>')
            // 换行
            .replace(/\n/gim, '<br>');
            
        // 包装列表项
        html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
        
        return html;
    }
    
    value(val) {
        if (val !== undefined) {
            this.textarea.value = val;
            this.updatePreview();
            this.updateStatus();
            return this;
        }
        return this.textarea.value;
    }
    
    focus() {
        this.textarea.focus();
        return this;
    }
    
    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.replaceChild(this.element, this.container);
        }
    }
}

// 全局暴露
window.SimpleMarkdownEditor = SimpleMarkdownEditor;
