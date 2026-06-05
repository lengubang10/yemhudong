// Sáng/Tối
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Chỉnh size chữ (Chỉ chạy khi ở trang read.html)
let currentSize = 18;
function changeFontSize(step) {
    const content = document.getElementById('reading-content');
    if (!content) return; // Nếu không ở trang đọc thì bỏ qua, tránh báo lỗi
    currentSize += step * 2; 
    if(currentSize >= 14 && currentSize <= 30) content.style.fontSize = currentSize + 'px';
    else currentSize -= step * 2; 
}

// Tim
let isHearted = false;
function toggleHeart(element) {
    const icon = element.querySelector('i');
    const countSpan = element.querySelector('span');
    if(!isHearted) {
        icon.classList.add('heart-active');
        countSpan.innerText = "1.3k"; 
    } else {
        icon.classList.remove('heart-active');
        countSpan.innerText = "1.2k"; 
    }
    isHearted = !isHearted;
}

// Chống Copy
document.addEventListener('contextmenu', event => {
    if (event.target.closest('.anti-copy')) {
        event.preventDefault();
        alert("Yểm Hử Đông: Chức năng copy đã bị khóa nhé! 😾");
    }
});

document.addEventListener('copy', event => {
    const selection = window.getSelection();
    if (selection.anchorNode && selection.anchorNode.parentElement.closest('.anti-copy')) {
        event.preventDefault();
        alert("Yểm Hử Đông: Không được copy truyện nha! 😾");
    }
});

function inlineComment() { alert("Mở khung bình luận riêng cho đoạn văn này."); }
