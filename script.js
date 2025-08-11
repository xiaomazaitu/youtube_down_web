// API基础URL
const API_BASE_URL = 'http://localhost:8000';

// 获取DOM元素
const downloadForm = document.getElementById('downloadForm');
const videoUrlInput = document.getElementById('videoUrl');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const pasteBtn = document.getElementById('pasteBtn');
const buttonText = document.getElementById('buttonText');
const buttonSpinner = document.getElementById('buttonSpinner');
const resultContainer = document.getElementById('resultContainer');
const videoTitle = document.getElementById('videoTitle');
const downloadBtn = document.getElementById('downloadBtn');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');
let currentVideoUrl = null;

// 清空按钮事件
clearBtn.addEventListener('click', function() {
    videoUrlInput.value = '';
    videoUrlInput.focus();
    hideError();
    toggleActionButtons(); // 切换按钮显示状态
});

// 粘贴按钮事件
pasteBtn.addEventListener('click', async function() {
    try {
        const text = await navigator.clipboard.readText();
        videoUrlInput.value = text;
        hideError();
        toggleActionButtons(); // 切换按钮显示状态
    } catch (err) {
        showError(getTranslation('paste_button'));
    }
});

// 切换操作按钮显示状态
function toggleActionButtons() {
    if (videoUrlInput.value.trim() === '') {
        // 输入框为空，显示粘贴按钮，隐藏清空按钮
        pasteBtn.classList.remove('d-none');
        clearBtn.classList.add('d-none');
    } else {
        // 输入框不为空，显示清空按钮，隐藏粘贴按钮
        pasteBtn.classList.add('d-none');
        clearBtn.classList.remove('d-none');
    }
}

// 监听输入框变化
videoUrlInput.addEventListener('input', toggleActionButtons);
downloadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const url = videoUrlInput.value.trim();
    
    if (!url) {
        showError(getTranslation('clear_button'));
        return;
    }
    
    // 显示加载状态
    setButtonLoading(true);
    hideError();
    
    try {
        // 调用API获取视频信息
        const data = await fetchVideoInfo(url);
        
        // 显示结果
        showResult(data);
    } catch (error) {
        showError(error.message || getTranslation('parse_error'));
    } finally {
        setButtonLoading(false);
    }
});

// 下载按钮事件
downloadBtn.addEventListener('click', function() {
    if (currentVideoUrl) {
        // 创建临时下载链接
        const link = document.createElement('a');
        link.href = currentVideoUrl;
        link.download = videoTitle.textContent || 'video.mp4';
        link.style.display = 'none';
        
        // 添加到页面并触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示下载成功提示
        alert(getTranslation('download_alert'));
    } else {
        showError(getTranslation('invalid_download'));
    }
});

// 获取视频信息
async function fetchVideoInfo(url) {
    // 实际API调用代码
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/download/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });
        
        if (!response.ok) {
            throw new Error(getTranslation('network_error'));
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(getTranslation('network_error'));
    }
}

// 显示结果
function showResult(data) {
    if (data.code === 200) {
        // 设置视频标题
        videoTitle.textContent = data.data.text;
        
        // 保存视频下载链接
        currentVideoUrl = data.data.medias.resource_url;
        
        // 显示结果容器
        resultContainer.classList.remove('d-none');
        resultContainer.classList.add('fade-in');
        
        // 滚动到结果区域
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        throw new Error(data.message || '解析失败');
    }
}

// 显示错误信息
function showError(message) {
    errorMessage.textContent = message;
    errorContainer.classList.remove('d-none');
    errorContainer.classList.add('fade-in');
}

// 隐藏错误信息
function hideError() {
    errorContainer.classList.add('d-none');
    errorContainer.classList.remove('fade-in');
}

// 设置按钮加载状态
function setButtonLoading(loading) {
    if (loading) {
        buttonText.textContent = getTranslation('submit_loading');
        buttonSpinner.classList.remove('d-none');
        submitBtn.disabled = true;
    } else {
        buttonText.textContent = getTranslation('submit_button');
        buttonSpinner.classList.add('d-none');
        submitBtn.disabled = false;
    }
}

// 语言切换功能
function initLanguageSwitcher() {
    // 语言映射
    const languageMap = {
        'zh-CN': '中文',
        'en': 'English',
        'ru': 'Русский',
        'ja': '日本語',
        'es': 'Español'
    };
    
    // 获取当前语言
    const currentLang = localStorage.getItem('language') || 'zh-CN';
    document.getElementById('currentLanguage').textContent = languageMap[currentLang];
    
    // 为每个语言选项添加点击事件
    document.querySelectorAll('[data-lang]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            
            // 更新当前语言显示
            document.getElementById('currentLanguage').textContent = languageMap[selectedLang];
            
            // 保存语言选择
            localStorage.setItem('language', selectedLang);
            
            // 应用翻译
            applyTranslations();
        });
    });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言切换器
    initLanguageSwitcher();
    
    // 应用翻译
    applyTranslations();
    
    // 可以在这里添加一些初始化代码
    console.log('视频下载助手已加载');
});