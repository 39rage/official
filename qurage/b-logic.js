let currentCategory = 'discography';
let isAutoScrolling = false;

// 1. カテゴリー切り替え
function changeCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderInfiniteCarousel();
}

// 2. 無限カルーセル生成
function renderInfiniteCarousel() {
    const viewport = document.getElementById('albumCarousel');
    const wrapper = document.createElement('div');
    wrapper.className = 'infinite-wrapper';
    wrapper.id = 'infiniteWrapper';
    
    const albums = allAlbums.filter(a => a.category === currentCategory);
    
    // 無限ループのためにデータを3倍にする（中央のセットを使う）
    const tripledAlbums = [...albums, ...albums, ...albums];

    wrapper.innerHTML = tripledAlbums.map((album, idx) => `
        <div class="carousel-item" data-id="${album.id}" data-index="${idx}">
            <img src="${album.img}" alt="${album.title}">
        </div>
    `).join('');

    viewport.innerHTML = '';
    viewport.appendChild(wrapper);

    // 初期位置を中央のセットの先頭にする
    const items = wrapper.querySelectorAll('.carousel-item');
    const scrollCenter = () => {
        const firstMiddleItem = items[albums.length];
        viewport.scrollLeft = firstMiddleItem.offsetLeft - viewport.offsetWidth / 2 + firstMiddleItem.offsetWidth / 2;
        selectAlbumB(albums[0].id, firstMiddleItem);
    };
    
    setTimeout(scrollCenter, 10);

    // スクロール検知：端に行ったら瞬間移動
    viewport.addEventListener('scroll', () => {
        if (isAutoScrolling) return;

        const singleWidth = albums.length * (200 + 30); // 1セットの幅
        if (viewport.scrollLeft < singleWidth * 0.5) {
            viewport.scrollLeft += singleWidth; // 左端近くなら右へジャンプ
        } else if (viewport.scrollLeft > singleWidth * 1.5) {
            viewport.scrollLeft -= singleWidth; // 右端近くなら左へジャンプ
        }
        updateActiveCenter();
    });
}

// 3. 中心にあるアイテムを特定してアクティブにする
function updateActiveCenter() {
    const viewport = document.getElementById('albumCarousel');
    const items = document.querySelectorAll('.carousel-item');
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach(item => {
        const center = item.offsetLeft - viewport.scrollLeft - viewport.offsetWidth / 2 + item.offsetWidth / 2;
        const distance = Math.abs(center);
        if (distance < minDistance) {
            minDistance = distance;
            closestItem = item;
        }
    });

    if (closestItem && !closestItem.classList.contains('active')) {
        const albumId = closestItem.getAttribute('data-id');
        selectAlbumB(albumId, closestItem);
    }
}

// 4. アルバム選択・情報更新
function selectAlbumB(albumId, element) {
    document.querySelectorAll('.carousel-item').forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    const album = allAlbums.find(a => a.id === albumId);
    if (!album) return;

    const detail = document.getElementById('albumDetail');
    // UNRELEASEDでもBOOTHボタン以外は同様に出す設定
    const boothBtn = (album.booth && album.booth !== '#') 
        ? `<a href="${album.booth}" target="_blank" class="booth-btn-b">Download at BOOTH</a>` 
        : '';

    detail.innerHTML = `
        <h2 class="b-title-main">${album.title}</h2>
        <p class="b-subtitle">${album.subtitle}</p>
        <p class="b-desc">${album.desc}</p>
        ${boothBtn}
    `;

    const albumTracks = allTracks.filter(t => t.albumId === albumId).sort((a, b) => a.file.localeCompare(b.file));
    initAudioPlayer(albumTracks);
}

// ページ初期化
function initGamePage() {
    renderHeader();
    renderPlayerPart('album'); 
    renderInfiniteCarousel();
    
    // サイドバーをカテゴリ切り替え用に改造
    const side = document.getElementById('sidebar-part');
    side.innerHTML = `
        <button class="cat-btn active" onclick="changeCategory('discography', this)">💿 DISCOGRAPHY</button>
        <button class="cat-btn" onclick="changeCategory('unreleased', this)">👾 UNRELEASED</button>
    `;

    // アイテムクリックで中央に寄せる
    document.getElementById('albumCarousel').addEventListener('click', (e) => {
        const item = e.target.closest('.carousel-item');
        if (item) {
            isAutoScrolling = true;
            const viewport = document.getElementById('albumCarousel');
            viewport.scrollTo({
                left: item.offsetLeft - viewport.offsetWidth / 2 + item.offsetWidth / 2,
                behavior: 'smooth'
            });
            setTimeout(() => { isAutoScrolling = false; }, 500);
        }
    });
}
