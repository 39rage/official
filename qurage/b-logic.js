// アルバムリストを3倍にして「無限スクロール」をシミュレートする
function renderVerticalList() {
    const listContainer = document.getElementById('albumList');
    const albums = allAlbums.filter(a => a.category === 'discography');
    
    // リストを複製（無限ループ感を作るため）
    const tripledAlbums = [...albums, ...albums, ...albums];

    listContainer.innerHTML = tripledAlbums.map((album, idx) => `
        <div class="carousel-item" onclick="selectAlbumB('${album.id}', this)" data-id="${album.id}">
            <img src="${album.img}" alt="${album.title}">
        </div>
    `).join('');

    // 真ん中の位置にスクロール
    const area = document.getElementById('albumScrollArea');
    const target = listContainer.children[albums.length];
    area.scrollTop = target.offsetTop - area.offsetHeight / 2 + 70;
    
    selectAlbumB(albums[0].id, target);
}

function selectAlbumB(albumId, element) {
    // 見た目の切り替え
    document.querySelectorAll('.carousel-item').forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    const album = allAlbums.find(a => a.id === albumId);
    if (!album) return;

    // パネル情報の更新
    const detail = document.getElementById('albumDetail');
    const boothBtn = (album.booth !== '#') 
        ? `<a href="${album.booth}" target="_blank" class="booth-btn-b">Download at BOOTH</a>` 
        : '';

    detail.innerHTML = `
        <h2 class="b-title-main">${album.title}</h2>
        <p class="b-subtitle">${album.subtitle}</p>
        <p class="b-desc">${album.desc}</p>
        ${boothBtn}
    `;

    // 右側のプレイヤーを更新（アルバムの曲をセット）
    const albumTracks = allTracks.filter(t => t.albumId === albumId).sort((a, b) => a.file.localeCompare(b.file));
    initAudioPlayer(albumTracks);
}

// パターンBの初期化
function initGamePage() {
    // Aのパーツ機能を流用
    renderHeader();
    renderPlayerPart('album'); 
    renderVerticalList();
    
    // カテゴリー選択（B用に特別に動作させる）
    const side = document.getElementById('sidebar-part');
    side.innerHTML = `
        <button class="cat-btn active" id="btn-disco">💿 DISCOGRAPHY</button>
        <button class="cat-btn" id="btn-un">👾 UNRELEASED</button>
    `;
    
    // 本来のサイドバー機能を一部復旧（ハンバーガーメニュー等）
    const burgerBtn = document.getElementById('burgerBtn');
    if(burgerBtn) {
        burgerBtn.addEventListener('click', () => { 
            burgerBtn.classList.toggle('open');
            // Bではサイドバー自体を出す代わりに別の演出も可能ですが、一旦Aのロジックに合わせます
        });
    }
}
