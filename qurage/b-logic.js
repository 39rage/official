let currentTracks = [];
let audio = new Audio();
let currentCategory = 'discography';
let currentIndex = 0;

// カテゴリーの切り替え
function changeCategory(cat, btn) {
    currentCategory = cat;
    // ボタンの見た目更新
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    renderMusicList();
}

// 楽曲リストの描画
function renderMusicList() {
    const listWrapper = document.getElementById('musicList');
    
    // カテゴリーに属するアルバムのIDを取得
    const albumIds = allAlbums.filter(a => a.category === currentCategory).map(a => a.id);
    
    // そのアルバムに属する曲を抽出し、アルバム順→日付順にソート
    const tracks = allTracks.filter(t => albumIds.includes(t.albumId)).sort((a, b) => {
        const indexA = allAlbums.findIndex(alb => alb.id === a.albumId);
        const indexB = allAlbums.findIndex(alb => alb.id === b.albumId);
        if (indexA !== indexB) return indexA - indexB;
        return a.file.localeCompare(b.file);
    });
    currentTracks = tracks;

    listWrapper.innerHTML = tracks.map((track, idx) => {
        const album = allAlbums.find(a => a.id === track.albumId);
        const num = (idx + 1 < 10) ? '0' + (idx + 1) : (idx + 1);
        return `
        <div class="music-card" onclick="selectMusic(${idx}, this)">
            <span class="m-num">${num}</span>
            <div class="m-title-area">
                <div class="m-title">${track.title}</div>
                <div class="m-album-name">${album.title}</div>
            </div>
        </div>`;
    }).join('');

    // 最初の曲を自動選択
    if (tracks.length > 0) {
        const firstCard = listWrapper.querySelector('.music-card');
        selectMusic(0, firstCard);
    }
}

// 楽曲選択時の処理
function selectMusic(idx, element) {
    currentIndex = idx;
    // 見た目更新
    document.querySelectorAll('.music-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');

    const track = currentTracks[idx];
    const album = allAlbums.find(a => a.id === track.albumId);

    // パネル情報の更新
    document.getElementById('targetJacket').src = album.img;
    document.getElementById('targetTitle').textContent = track.title;
    document.getElementById('targetSub').textContent = album.subtitle;
    document.getElementById('targetDesc').textContent = album.desc;
    
    const boothBtn = document.getElementById('boothLink');
    if(album.booth && album.booth !== "#") {
        boothBtn.parentElement.style.display = "block";
        boothBtn.href = album.booth;
    } else {
        boothBtn.parentElement.style.display = "none";
    }

    // オーディオ設定
    audio.src = "audio/" + track.file;
    updatePlayIcon(false);
}

// プレイヤーロジック
const playBtn = document.getElementById('playBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeText = document.getElementById('currentTime');
const durationText = document.getElementById('duration');

function updatePlayIcon(isPlaying) {
    playBtn.textContent = isPlaying ? "PAUSE" : "PLAY";
    playBtn.style.background = isPlaying ? "#fff" : "var(--cyber-orange)";
    playBtn.style.color = isPlaying ? "#000" : "#fff";
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(e => console.log(e));
        updatePlayIcon(true);
    } else {
        audio.pause();
        updatePlayIcon(false);
    }
});

// 前後の曲
document.getElementById('prevBtn').addEventListener('click', () => {
    let nextIdx = (currentIndex - 1 + currentTracks.length) % currentTracks.length;
    const cards = document.querySelectorAll('.music-card');
    selectMusic(nextIdx, cards[nextIdx]);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    let nextIdx = (currentIndex + 1) % currentTracks.length;
    const cards = document.querySelectorAll('.music-card');
    selectMusic(nextIdx, cards[nextIdx]);
});

audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        let m = Math.floor(audio.currentTime / 60), s = Math.floor(audio.currentTime % 60);
        currentTimeText.textContent = `${m}:${(s < 10) ? '0'+s : s}`;
    }
});

audio.addEventListener('loadedmetadata', () => {
    let m = Math.floor(audio.duration / 60), s = Math.floor(audio.duration % 60);
    durationText.textContent = `${m}:${(s < 10) ? '0'+s : s}`;
});

seekBar.addEventListener('input', () => audio.currentTime = (seekBar.value / 100) * audio.duration);

// 初期起動
window.onload = () => {
    renderMusicList();
};
