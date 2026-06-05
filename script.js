// 1. CHỨC NĂNG SÁNG/TỐI (DARK MODE) - LƯU TRẠNG THÁI
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
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if(themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// 2. CHỈNH SIZE CHỮ (Chỉ áp dụng ở trang đọc truyện)
let currentSize = 18;
function changeFontSize(step) {
    const content = document.getElementById('reading-content');
    if (!content) return;
    
    currentSize += step * 2; 
    if(currentSize >= 14 && currentSize <= 30) {
        content.style.fontSize = currentSize + 'px';
    } else {
        currentSize -= step * 2; 
    }
}

// 3. NÚT THẢ TIM
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

// 4. CHỐNG COPY (Chỉ áp dụng cho vùng có class anti-copy)
document.addEventListener('contextmenu', event => {
    if (event.target.closest('.anti-copy')) {
        event.preventDefault();
        alert("Yểm Hử Đông: Chức năng copy đã bị khóa để bảo vệ tác giả! 😾");
    }
});

document.addEventListener('copy', event => {
    if (window.getSelection().anchorNode.parentElement.closest('.anti-copy')) {
        event.preventDefault();
        alert("Yểm Hử Đông: Không được copy truyện nha! 😾");
    }
});

// 5. BÌNH LUẬN THEO ĐOẠN (Mô phỏng)
function inlineComment(element) {
    alert("Mở khung bình luận riêng cho đoạn văn này (Cần Backend để lưu).");
}
