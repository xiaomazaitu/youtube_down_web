// API基础URL
// const API_BASE_URL = 'https://vkdown.com';
const API_BASE_URL = 'http://127.0.0.1:5000';
let currentVideoFilename = null; // 保存视频文件名
let taskId = null; // 保存任务ID
let pollInterval = null; // 轮询定时器


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
    
    // 检查网络连接状态
    if (!checkNetworkStatus()) {
        setButtonLoading(false);
        return;
    }
    
    // 显示加载状态
    setButtonLoading(true);
    hideError();
    hideResult(); // 隐藏之前的结果
    
    try {
        // 调用API获取视频信息
        console.log('Starting Download API');
        const data = await fetchVideoInfo(url);
        
        console.log('Download API response:', data);
        
        // 检查返回的数据是否存在task_id
        if (data && data.hasOwnProperty('task_id')) {
            taskId = data.task_id;
            console.log('Starting polling for task ID:', taskId);
            startPolling(taskId);
        } else {
            console.error('Missing task_id in response data');
            throw new Error(getTranslation('parse_error'));
        }
    } catch (error) {
        console.error('Download form submission error:', error);
        showError(error.message || getTranslation('parse_error'));
        setButtonLoading(false);
    }
});

// 下载按钮事件
downloadBtn.addEventListener('click', function() {
    console.log('Download button clicked');
    console.log('Current video URL:', currentVideoUrl);
    console.log('Current video filename:', currentVideoFilename);
    
    if (currentVideoUrl && currentVideoFilename) {
        // 创建临时下载链接
        const link = document.createElement('a');
        link.href = currentVideoUrl;
        link.download = currentVideoFilename;
        link.style.display = 'none';
        
        // 添加到页面并触发下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示下载成功提示
        alert(getTranslation('download_alert'));
    } else {
        console.error('Missing video URL or filename for download');
        showError(getTranslation('invalid_download'));
    }
});

// 获取视频信息
async function fetchVideoInfo(url) {
    // 实际API调用代码
    try {
        console.log('Sending request to:', `${API_BASE_URL}/download`);
        console.log('Request body:', { url: url });
        
        const response = await fetch(`${API_BASE_URL}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ url: url }),
            credentials: 'include' // 添加credentials选项以处理跨域请求
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            throw new Error(getTranslation('network_error'));
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error(getTranslation('network_error'));
    }
}

// 显示结果
function showResult(filename) {
    // 设置视频标题为文件名
    videoTitle.textContent = filename;
    
    // 保存视频文件名和下载链接
    currentVideoFilename = filename;
    currentVideoUrl = `${API_BASE_URL}/video/${filename}`;
    
    // 显示结果容器
    resultContainer.classList.remove('d-none');
    resultContainer.classList.add('fade-in');
    
    // 滚动到结果区域
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 隐藏结果
function hideResult() {
    resultContainer.classList.add('d-none');
    resultContainer.classList.remove('fade-in');
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

// 检查网络连接状态
function checkNetworkStatus() {
    if (!navigator.onLine) {
        showError(getTranslation('network_error'));
        return false;
    }
    return true;
}

// 开始轮询任务状态
function startPolling(taskId) {
    // 清除之前的轮询定时器
    if (pollInterval) {
        clearInterval(pollInterval);
    }
    
    // 设置轮询定时器，每2秒查询一次状态
    let pollCount = 0;
    const maxPollCount = 30; // 最多轮询30次（1分钟）
    
    pollInterval = setInterval(async function() {
        // 检查是否超过最大轮询次数
        if (pollCount >= maxPollCount) {
            console.log('Max polling attempts reached');
            stopPolling();
            setButtonLoading(false);
            showError(getTranslation('network_error'));
            return;
        }
        
        pollCount++;
        
        try {
            const statusData = await fetchTaskStatus(taskId);
            handleTaskStatus(statusData);
        } catch (error) {
            console.error('Polling error:', error);
            // 如果是网络错误，继续轮询
            if (error.message === getTranslation('network_error')) {
                // 继续轮询
                console.log('Network error, continuing to poll...');
            } else {
                // 其他错误，停止轮询
                showError(error.message || getTranslation('network_error'));
                stopPolling();
                setButtonLoading(false);
            }
        }
    }, 2000);
}

// 停止轮询
function stopPolling() {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
}

// 获取任务状态
async function fetchTaskStatus(taskId) {
    try {
        console.log('Checking task status for ID:', taskId);
        const response = await fetch(`${API_BASE_URL}/status/${taskId}`, {
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include' // 添加credentials选项以处理跨域请求
        });
        
        console.log('Status check response status:', response.status);
        
        if (!response.ok) {
            throw new Error(getTranslation('network_error'));
        }
        
        const data = await response.json();
        console.log('Status check response data:', data);
        return data;
    } catch (error) {
        console.error('Status check error:', error);
        throw new Error(getTranslation('network_error'));
    }
}

// 处理任务状态
function handleTaskStatus(data) {
    console.log('Task status:', data); // 调试信息
    
    // 检查数据是否存在
    if (!data) {
        console.error('Invalid task status data');
        stopPolling();
        setButtonLoading(false);
        showError(getTranslation('parse_error'));
        return;
    }
    
    // 检查状态字段是否存在
    if (!data.hasOwnProperty('state')) {
        console.error('Missing state field in task status data');
        stopPolling();
        setButtonLoading(false);
        showError(getTranslation('parse_error'));
        return;
    }
    
    switch (data.state) {
        case 'PENDING':
            // 任务等待中，继续轮询
            console.log('Task is pending...');
            break;
        case 'PROGRESS':
            // 下载进行中，显示进度信息
            console.log('Task is in progress:', data.status);
            // 可以在这里更新UI显示进度，而不是显示错误
            break;
        case 'SUCCESS':
            // 下载完成，显示结果
            console.log('Task completed successfully');
            // 检查filename字段是否存在
            if (!data.hasOwnProperty('filename')) {
                console.error('Missing filename field in success status data');
                stopPolling();
                setButtonLoading(false);
                showError(getTranslation('parse_error'));
                return;
            }
            stopPolling();
            setButtonLoading(false);
            showResult(data.filename);
            break;
        case 'FAILURE':
            // 下载失败，显示错误信息
            console.log('Task failed:', data.status);
            stopPolling();
            setButtonLoading(false);
            // 检查status字段是否存在
            if (data.hasOwnProperty('status')) {
                showError(data.status);
            } else {
                showError(getTranslation('parse_error'));
            }
            break;
        default:
            // 未知状态
            console.log('Unknown task state:', data.state);
            stopPolling();
            setButtonLoading(false);
            showError(getTranslation('parse_error'));
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
    const currentLang = localStorage.getItem('language') || 'ru';
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
    
    // 输出API基础URL到控制台
    console.log('API Base URL:', API_BASE_URL);
    
    // 可以在这里添加一些初始化代码
    console.log('视频下载助手已加载');
});