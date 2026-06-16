const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'nguyen-ai-quoc.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Ho_Chi_Minh_1921.jpg' },
  { name: 'hoi-nghi-thanh-lap-dang.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Thanh_lap_Dang_Cong_san_Viet_Nam.jpg' },
  { name: 'xo-viet-nghe-tinh.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Demonstrations_of_peasants_in_Nghe_An_province.jpg' },
  { name: 'nha-tu-de-quoc.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Con_Dao_prison.jpg' },
  { name: 'bao-dan-chung.jpg', url: 'https://upload.wikimedia.org/wikipedia/vi/9/91/Trang_nhat_bao_Dan_Chung.jpg' },
  { name: 'coc-bo.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Coc_Bo_cave.jpg' },
  { name: 'ba-dinh-1945.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Ho_Chi_Minh_declares_independence_1945.jpg' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return resolve(download(response.headers.location, dest));
      }
      if (response.statusCode !== 200) {
        return reject(new Error('Status: ' + response.statusCode));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  for (const img of images) {
    const dest = path.join(__dirname, 'Frontend', 'public', 'images', 'vnr202', img.name);
    try {
      await download(img.url, dest);
      console.log('Downloaded', img.name);
    } catch (e) {
      console.log('Error downloading', img.name, e.message);
    }
  }
})();
