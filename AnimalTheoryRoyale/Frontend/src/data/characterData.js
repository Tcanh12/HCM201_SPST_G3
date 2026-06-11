/**
 * Enhanced character data for premium lobby display
 * Contains role descriptions, outfit info, skill details, and visual config
 * This is client-side presentation data — actual stats come from the API
 */
import { Crown, Rabbit, Cat, Shell, Shield, Wind, Dices, Orbit, Drum, Zap, Crosshair, Blocks, ScanEye, Footprints, ShieldHalf } from 'lucide-react';

/** Icon lookup for rendering - use getCharacterIcon(id) */
export const CHARACTER_ICONS = {
  1: Crown,       // Voi (Crown = power/strength)
  2: Rabbit,     // Thỏ
  3: Cat,        // Cáo
  4: Shell,      // Rùa
};

export const CHARACTER_DATA = {
  1: {
    id: 1,
    name: 'Voi',
    animalType: 'Elephant',
    role: 'Tanker',
    roleVi: 'Cận Chiến',
    iconName: 'Crown',
    description: 'Người bảo vệ kiên cường với sức mạnh phi thường. Voi mang hình ảnh sức mạnh, bền bỉ — tượng trưng cho ý chí kiên cường của dân tộc.',
    shortDesc: 'Máu cao, chậm nhưng vững chãi.',
    outfit: 'Giáp nhẹ phong cách trống đồng, tông đỏ/vàng',
    colors: {
      primary: '#8B1A1A',
      secondary: '#D4A843',
      glow: 'rgba(139, 26, 26, 0.4)',
      bg: 'rgba(139, 26, 26, 0.12)',
      border: '#D4A843',
      gradient: 'linear-gradient(135deg, #8B1A1A, #D4A843)',
    },
    skills: {
      passive: { name: 'Bền Bỉ', desc: 'Giảm sát thương nhận từ bo 20%', iconName: 'Shield' },
      push: { name: 'Đẩy Lùi', desc: 'Đẩy văng đối thủ trước mặt ra xa', iconName: 'Wind' },
      double: { name: 'Liều Ăn Nhiều', desc: 'Đúng x2 điểm, Sai x2 sát thương', iconName: 'Dices' },
      dizzy: { name: 'Chóng Mặt', desc: 'Gây choáng kẻ địch xung quanh 5s', iconName: 'Orbit' },
      ultimate: { name: 'Dậm Đất', desc: 'Sóng chấn động hình trống đồng, gây sát thương và làm chậm', iconName: 'Drum', visualDesc: 'Sóng xung kích hình trống đồng / ánh sáng vàng' },
    },
    statLabels: { hp: 'Rất Cao', speed: 'Chậm', damage: 'Trung Bình' },
    accessories: ['Mặt nạ trống đồng mini', 'Vòng cổ vàng khắc hoa văn'],
  },
  2: {
    id: 2,
    name: 'Thỏ',
    animalType: 'Rabbit',
    role: 'Speedster',
    roleVi: 'Tốc Độ',
    iconName: 'Rabbit',
    description: 'Nhanh như gió, linh hoạt và khó bắt. Thỏ đại diện cho sự nhanh nhẹn, thông minh — tượng trưng cho tinh thần sáng tạo.',
    shortDesc: 'Cực nhanh, máu thấp, farm điểm hiệu quả.',
    outfit: 'Áo choàng nhỏ phong cách trinh sát, tông xanh ngọc/trắng',
    colors: {
      primary: '#1B8C5A',
      secondary: '#A7F3D0',
      glow: 'rgba(27, 140, 90, 0.4)',
      bg: 'rgba(27, 140, 90, 0.12)',
      border: '#34D399',
      gradient: 'linear-gradient(135deg, #1B8C5A, #A7F3D0)',
    },
    skills: {
      passive: { name: 'Linh Hoạt', desc: 'Di chuyển nhanh hơn 15% khi máu dưới 50%', iconName: 'Zap' },
      push: { name: 'Đẩy Lùi', desc: 'Đẩy văng đối thủ trước mặt ra xa', iconName: 'Wind' },
      double: { name: 'Liều Ăn Nhiều', desc: 'Đúng x2 điểm, Sai x2 sát thương', iconName: 'Dices' },
      dizzy: { name: 'Chóng Mặt', desc: 'Gây choáng kẻ địch xung quanh 5s', iconName: 'Orbit' },
      ultimate: { name: 'Lướt Nhanh', desc: 'Lao cực nhanh theo hướng nhìn để né đòn', iconName: 'Footprints', visualDesc: 'Vệt sáng xanh/vàng khi chạy' },
    },
    statLabels: { hp: 'Thấp', speed: 'Rất Nhanh', damage: 'Thấp' },
    accessories: ['Khăn quàng cổ gió', 'Kính phi công jade'],
  },
  3: {
    id: 3,
    name: 'Cáo',
    animalType: 'Fox',
    role: 'Strategist',
    roleVi: 'Chiến Thuật',
    iconName: 'Cat',
    description: 'Khôn ngoan, sắc sảo và đầy mưu lược. Cáo là bộ óc chiến thuật — tượng trưng cho trí tuệ và tầm nhìn xa.',
    shortDesc: 'Cân bằng mọi chỉ số, kỹ năng đa dạng.',
    outfit: 'Áo vest học giả với kính trí tuệ, tông cam/vàng',
    colors: {
      primary: '#D97706',
      secondary: '#FCD34D',
      glow: 'rgba(217, 119, 6, 0.4)',
      bg: 'rgba(217, 119, 6, 0.12)',
      border: '#F59E0B',
      gradient: 'linear-gradient(135deg, #D97706, #FCD34D)',
    },
    skills: {
      passive: { name: 'Nhạy Bén', desc: 'Thấy được bẫy trong phạm vi gần', iconName: 'ScanEye' },
      push: { name: 'Đẩy Lùi', desc: 'Đẩy văng đối thủ trước mặt ra xa', iconName: 'Wind' },
      double: { name: 'Liều Ăn Nhiều', desc: 'Đúng x2 điểm, Sai x2 sát thương', iconName: 'Dices' },
      dizzy: { name: 'Chóng Mặt', desc: 'Gây choáng kẻ địch xung quanh 5s', iconName: 'Orbit' },
      ultimate: { name: 'Bẫy Ảo Ảnh', desc: 'Đặt bẫy tàng hình, địch dẫm phải sẽ mất máu và bị chậm', iconName: 'Crosshair', visualDesc: 'Hologram, ảo ảnh, nhiễu điều khiển' },
    },
    statLabels: { hp: 'Trung Bình', speed: 'Nhanh', damage: 'Trung Bình' },
    accessories: ['Kính tròn học giả', 'Cuốn sách nhỏ bên hông'],
  },
  4: {
    id: 4,
    name: 'Rùa',
    animalType: 'Turtle',
    role: 'Defender',
    roleVi: 'Phòng Thủ',
    iconName: 'Shell',
    description: 'Kiên nhẫn và bất khả xâm phạm. Rùa là biểu tượng của sự trường tồn — tượng trưng cho trí tuệ và sự bền vững.',
    shortDesc: 'Phòng thủ cao, khiên bảo vệ mạnh.',
    outfit: 'Mai có họa tiết mạch công nghệ phát sáng, tông xanh dương/ngọc',
    colors: {
      primary: '#1E3A5F',
      secondary: '#67E8F9',
      glow: 'rgba(30, 58, 95, 0.4)',
      bg: 'rgba(30, 58, 95, 0.12)',
      border: '#06B6D4',
      gradient: 'linear-gradient(135deg, #1E3A5F, #67E8F9)',
    },
    skills: {
      passive: { name: 'Bất Khuất', desc: 'Giảm 30% thời gian bị choáng', iconName: 'Blocks' },
      push: { name: 'Đẩy Lùi', desc: 'Đẩy văng đối thủ trước mặt ra xa', iconName: 'Wind' },
      double: { name: 'Liều Ăn Nhiều', desc: 'Đúng x2 điểm, Sai x2 sát thương', iconName: 'Dices' },
      dizzy: { name: 'Chóng Mặt', desc: 'Gây choáng kẻ địch xung quanh 5s', iconName: 'Orbit' },
      ultimate: { name: 'Mai Rùa', desc: 'Tạo khiên năng lượng hình vòng tròn bảo vệ', iconName: 'ShieldHalf', visualDesc: 'Khiên năng lượng hình vòng tròn phát sáng' },
    },
    statLabels: { hp: 'Cao', speed: 'Chậm', damage: 'Thấp' },
    accessories: ['Mai phát sáng mạch tri thức', 'Vòng tay năng lượng xanh'],
  },
};

/**
 * Get character data by ID with fallback
 */
export function getCharacterData(id) {
  return CHARACTER_DATA[id] || CHARACTER_DATA[1];
}

/**
 * Get all characters as array
 */
export function getAllCharacters() {
  return Object.values(CHARACTER_DATA);
}
