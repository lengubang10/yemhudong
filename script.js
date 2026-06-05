/* ==========================================================================
   1. ĐỔI CHẾ ĐỘ SÁNG / TỐI & CHUYỂN ĐỔI TRANG (PAGE)
   ========================================================================== */
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.className = 'dark-mode';
    if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        let isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}

function openStory(title) {
    document.getElementById('current-story-title').innerText = title;
    showPage('reading-section');
}

/* ==========================================================================
   2. TÌM KIẾM TRUYỆN & BỘ LỌC THỂ LOẠI (HỌC HỎI ĐỘNG CHĂN RÙA)
   ========================================================================== */
const searchInput = document.getElementById('search-input');
if(searchInput) {
    searchInput.addEventListener('input', function(e) {
        let val = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.story-card').forEach(card => {
            let name = card.querySelector('h4').innerText.toLowerCase();
            if(name.includes(val)) card.style.display = 'block';
            else card.style.display = 'none';
        });
    });
}

function filterGenre(genre) {
    document.querySelectorAll('.story-card').forEach(card => {
        if(genre === 'all') { card.style.display = 'block'; return; }
        let cGenres = card.getAttribute('data-genre');
        if(cGenres.includes(genre)) card.style.display = 'block';
        else card.style.display = 'none';
    });
}

/* ==========================================================================
   3. TÙY CHỈNH SIZE CHỮ ĐỌC TRUYỆN
   ========================================================================== */
let sizeNum = 18;
function changeFontSize(val) {
    sizeNum += val;
    if(sizeNum < 14) sizeNum = 14;
    if(sizeNum > 30) sizeNum = 30;
    document.getElementById('story-text').style.fontSize = sizeNum + 'px';
    document.getElementById('font-size-label').innerText = sizeNum + 'px';
}

/* ==========================================================================
   4. THẢ TIM, CHIA SẺ & BÌNH LUẬN ĐOẠN VĂN
   ========================================================================== */
function toggleHeart(btn) {
    btn.classList.toggle('liked');
    let countNode = btn.querySelector('.count');
    let cCount = parseInt(countNode.innerText);
    if(btn.classList.contains('liked')) {
        countNode.innerText = cCount + 1;
        btn.innerHTML = `<i class="fas fa-heart"></i> Đã thích (<span class="count">${cCount + 1}</span>)`;
    } else {
        countNode.innerText = cCount - 1;
        btn.innerHTML = `<i class="far fa-heart"></i> Yêu thích (<span class="count">${cCount - 1}</span>)`;
    }
}

function sharePage() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Đã copy link truyện Yểm Hử Đông thành công rồi nha! 💕");
    });
}

function commentParagraph(id) {
    let text = prompt(`Viết thảo luận siêu ngắn cho đoạn văn [${id}]:`);
    if(text && text.trim() !== "") {
        alert(`Bình luận đoạn ${id} đang được hệ thống kiểm duyệt nhé: \n"${text}"`);
    }
}

function submitMainComment() {
    let area = document.getElementById('main-comment-input');
    let box = document.getElementById('comment-list-box');
    if(area.value.trim() !== "") {
        let div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `<div class="c-avatar">✨</div><div class="c-info"><h5>Độc giả dấu tên</h5><p>${area.value}</p></div>`;
        box.insertBefore(div, box.firstChild);
        area.value = "";
    }
}

/* ==========================================================================
   5. ĐĂNG NHẬP / UP ẢNH AVATAR VÀ LƯU TRUYỆN (LOCALSTORAGE)
   ========================================================================== */
let isLoggedIn = false;
let savedStories = [];

function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
}
function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function handleLogin() {
    let user = document.getElementById('username').value.trim();
    if(user === "") { alert("Vui lòng điền tên tài khoản nha!"); return; }
    
    isLoggedIn = true;
    document.getElementById('auth-form-box').style.display = 'none';
    document.getElementById('user-profile-box').style.display = 'block';
    document.getElementById('display-name').innerText = user;
    document.getElementById('auth-btn').innerHTML = `<i class="fas fa-user-check"></i> ${user}`;
    renderSavedList();
}

function uploadAvatar(event) {
    let reader = new FileReader();
    reader.onload = function() {
        document.getElementById('user-avatar').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function saveToLibrary() {
    let currentTitle = document.getElementById('current-story-title').innerText;
    if(!isLoggedIn) {
        alert("Hãy bấm nút Đăng Nhập góc phải trước khi lưu tủ sách nha!");
        openAuthModal();
        return;
    }
    if(!savedStories.includes(currentTitle)) {
        savedStories.push(currentTitle);
        renderSavedList();
        alert(`Đã thêm truyện "${currentTitle}" vào kho lưu trữ cá nhân của bạn! ✨`);
    } else {
        alert("Bộ truyện này đã có sẵn trong tủ sách của bạn rồi nè.");
    }
}

function renderSavedList() {
    let box = document.getElementById('saved-list-box');
    if(savedStories.length === 0) {
        box.innerHTML = `<p style="font-size:13px; color:#888;">Chưa có truyện nào được lưu cả~</p>`;
        return;
    }
    box.innerHTML = "";
    savedStories.forEach(title => {
        let item = document.createElement('div');
        item.style = "background:var(--primary-light); padding:10px; border-radius:10px; margin-bottom:8px; font-size:13px; font-weight:700; display:flex; justify-content:space-between; align-items:center;";
        item.innerHTML = `<span>📖 ${title}</span><button class="btn-cute-sm" style="padding:4px 10px; font-size:11px;" onclick="closeAuthModal(); openStory('${title}')">Đọc tiếp</button>`;
        box.appendChild(item);
    });
}

/* ==========================================================================
   6. BẢO MẬT CHỐNG SAO CHÉP (CHỐNG COPY ĐỘC QUYỀN TRUYỆN)
   ========================================================================== */
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p') || e.key === 'F12') {
        e.preventDefault();
        alert("Truyện độc quyền tại Yểm Hử Đông - Xin vui lòng đừng sao chép đi nơi khác nha! 😉");
    }
});
