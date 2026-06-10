import { Landmark, Trees, Ship, Mountain, Flag } from "lucide-react";

export const MAP_CONFIGS = {
  academy: {
    key: "academy",
    id: "academy",
    name: "Học Viện Tri Thức",
    nameVi: "Học Viện Tri Thức",
    subtitle: "Khu học viện cân bằng với thư viện, quảng trường và tượng đài ánh sáng.",
    description: "Khu học viện cân bằng với thư viện, quảng trường và tượng đài ánh sáng. Phù hợp cho mọi cấp độ.",
    difficulty: "NORMAL",
    knowledgeDensity: "Trung bình",
    icon: Landmark,
    theme: "academy",
    accentColor: "#fbbf24",
    color: "#fbbf24",
    groundColor: "#334155",
    fogColor: "#1e293b",
    skyColor: "#172033",
    ambientLight: 1.2,
    directionalLight: 1.7,
    spawnPoints: [
      [-6, 0, -6],
      [6, 0, -6],
      [-6, 0, 6],
      [6, 0, 6]
    ],
    zoneLayout: "balanced",
    props: ["library", "courtyard", "statue", "books"],
    isDefault: true,
  },

  pacbo: {
    key: "pacbo",
    id: "pacbo",
    name: "Rừng Pác Bó",
    nameVi: "Rừng Pác Bó",
    subtitle: "Lấy cảm hứng từ suối, hang đá, rừng cây và hành trình cách mạng.",
    description: "Lấy cảm hứng từ rừng Pác Bó — suối nhỏ, hang đá, rừng cây, đường mòn. Nhiều nơi ẩn nấp.",
    difficulty: "HARD",
    knowledgeDensity: "Thấp",
    icon: Trees,
    theme: "forest",
    accentColor: "#22c55e",
    color: "#22c55e",
    groundColor: "#1f4d36",
    fogColor: "#163522",
    skyColor: "#10271b",
    ambientLight: 1.15,
    directionalLight: 1.6,
    spawnPoints: [
      [-8, 0, -5],
      [7, 0, -6],
      [-7, 0, 7],
      [8, 0, 6]
    ],
    zoneLayout: "scattered",
    props: ["trees", "rocks", "stream", "cave"],
    isDefault: false,
  },

  nharong: {
    key: "nharong",
    id: "nharong",
    name: "Bến Nhà Rồng",
    nameVi: "Bến Nhà Rồng",
    subtitle: "Không gian bến cảng, mặt nước, cầu gỗ và biểu tượng ra đi tìm đường cứu nước.",
    description: "Bến cảng lấy cảm hứng từ Bến Nhà Rồng — cầu gỗ, tàu, khu vực hẹp. Giao tranh cận chiến.",
    difficulty: "MEDIUM",
    knowledgeDensity: "Cao",
    icon: Ship,
    theme: "harbor",
    accentColor: "#38bdf8",
    color: "#38bdf8",
    groundColor: "#244761",
    fogColor: "#123044",
    skyColor: "#123047",
    ambientLight: 1.25,
    directionalLight: 1.75,
    spawnPoints: [
      [-7, 0, -4],
      [7, 0, -4],
      [-7, 0, 5],
      [7, 0, 5]
    ],
    zoneLayout: "linear",
    props: ["dock", "boat", "water", "crates"],
    isDefault: false,
  },

  vietbac: {
    key: "vietbac",
    id: "vietbac",
    name: "Núi Việt Bắc",
    nameVi: "Núi Việt Bắc",
    subtitle: "Địa hình núi rừng, căn cứ, lều trại và những đường mòn kháng chiến.",
    description: "Rừng núi với căn cứ, lều trại, đồi cao. Nhiều địa hình bất lợi nhưng nhiều cơ hội phục kích.",
    difficulty: "HARD",
    knowledgeDensity: "Trung bình",
    icon: Mountain,
    theme: "mountain",
    accentColor: "#a78bfa",
    color: "#a78bfa",
    groundColor: "#334155",
    fogColor: "#1e293b",
    skyColor: "#111827",
    ambientLight: 1.1,
    directionalLight: 1.55,
    spawnPoints: [
      [-9, 0, -6],
      [9, 0, -6],
      [-5, 0, 8],
      [5, 0, 8]
    ],
    zoneLayout: "vertical",
    props: ["mountains", "pineTrees", "tents", "campfire"],
    isDefault: false,
  },

  badinh: {
    key: "badinh",
    id: "badinh",
    name: "Quảng Trường Ba Đình",
    nameVi: "Quảng Trường Ba Đình",
    subtitle: "Không gian mở, quảng trường trung tâm, cờ đỏ sao vàng và các cột mốc lớn.",
    description: "Không gian mở, quảng trường trung tâm. Nơi xuất hiện nhiều cột Boss. Giao tranh mạnh mẽ.",
    difficulty: "EASY",
    knowledgeDensity: "Rất Cao",
    icon: Flag,
    theme: "square",
    accentColor: "#fb7185",
    color: "#fb7185",
    groundColor: "#475569",
    fogColor: "#0f172a",
    skyColor: "#1f2937",
    ambientLight: 1.35,
    directionalLight: 1.9,
    spawnPoints: [
      [-5, 0, -5],
      [5, 0, -5],
      [-5, 0, 5],
      [5, 0, 5]
    ],
    zoneLayout: "open",
    props: ["flag", "square", "monument", "flowerBeds"],
    isDefault: false,
  }
};

export const MAPS = Object.values(MAP_CONFIGS);

export function getMapData(key) {
  return MAP_CONFIGS[key] || MAP_CONFIGS.academy;
}

export function getDefaultMap() {
  return MAP_CONFIGS.academy;
}

export function getMapConfig(mapId) {
  if (!mapId || !(mapId in MAP_CONFIGS)) {
    return MAP_CONFIGS.academy;
  }
  return MAP_CONFIGS[mapId];
}
