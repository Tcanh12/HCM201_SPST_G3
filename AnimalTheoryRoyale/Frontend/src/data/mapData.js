/**
 * Map metadata for the map selection system
 * Each map has a unique key, name, description, difficulty, and visual config
 * The actual 3D scenes will be created in Phase 2
 */

export const MAPS = [
  {
    key: 'knowledge_campus',
    name: 'Knowledge Campus Arena',
    nameVi: 'Học Viện Tri Thức',
    description: 'Khu học viện cân bằng với thư viện, quảng trường và tượng đài ánh sáng. Phù hợp cho mọi cấp độ.',
    difficulty: 'Normal',
    knowledgeDensity: 'Trung bình',
    terrain: 'Bằng phẳng, có sông và cầu',
    icon: '🏛️',
    color: '#D4A843',
    isDefault: true,
  },
  {
    key: 'pac_bo_forest',
    name: 'Pác Bó Forest',
    nameVi: 'Rừng Pác Bó',
    description: 'Lấy cảm hứng từ rừng Pác Bó — suối nhỏ, hang đá, rừng cây, đường mòn. Nhiều nơi ẩn nấp.',
    difficulty: 'Hard',
    knowledgeDensity: 'Thấp',
    terrain: 'Đồi núi, nhiều cover',
    icon: '🌲',
    color: '#10B981',
    isDefault: false,
  },
  {
    key: 'nha_rong_harbor',
    name: 'Nhà Rồng Harbor',
    nameVi: 'Bến Nhà Rồng',
    description: 'Bến cảng lấy cảm hứng từ Bến Nhà Rồng — cầu gỗ, tàu, khu vực hẹp. Giao tranh cận chiến.',
    difficulty: 'Medium',
    knowledgeDensity: 'Cao',
    terrain: 'Nhiều cầu, nước, khu vực hẹp',
    icon: '⛵',
    color: '#06B6D4',
    isDefault: false,
  },
  {
    key: 'viet_bac_mountain',
    name: 'Việt Bắc Mountain',
    nameVi: 'Núi Việt Bắc',
    description: 'Rừng núi với căn cứ, lều trại, đồi cao. Nhiều địa hình bất lợi nhưng nhiều cơ hội phục kích.',
    difficulty: 'Hard',
    knowledgeDensity: 'Trung bình',
    terrain: 'Nhiều đồi, cover nhiều',
    icon: '⛰️',
    color: '#8B5CF6',
    isDefault: false,
  },
  {
    key: 'ba_dinh_square',
    name: 'Ba Đình Square',
    nameVi: 'Quảng Trường Ba Đình',
    description: 'Không gian mở, quảng trường trung tâm. Nơi xuất hiện nhiều cột Boss. Giao tranh mạnh mẽ.',
    difficulty: 'Easy',
    knowledgeDensity: 'Rất Cao',
    terrain: 'Mở, ít cover',
    icon: '🏟️',
    color: '#EF4444',
    isDefault: false,
  },
];

/**
 * Get map data by key
 */
export function getMapData(key) {
  return MAPS.find(m => m.key === key) || MAPS[0];
}

/**
 * Get default map
 */
export function getDefaultMap() {
  return MAPS.find(m => m.isDefault) || MAPS[0];
}
