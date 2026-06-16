import { Shield, Zap, Brain, BookOpen, Clock, Flag } from 'lucide-react';

export const CHARACTER_ICONS = {
  1: Shield,
  2: Zap,
  3: Brain,
  4: Shield,
};

export const CHARACTER_DATA = {
  "1": {
    "id": 1,
    "name": "Trâu Kiên Định",
    "animalType": "Trâu",
    "role": "Tanker",
    "roleVi": "Đỡ đòn / nhiều máu",
    "iconName": "Shield",
    "description": "Đại diện cho sự bền bỉ của phong trào quần chúng, chịu áp lực tốt và bảo vệ đội trong thử thách kiến thức.",
    "shortDesc": "Nhiều máu, giữ đội hình tốt.",
    "outfit": "Trang phục học giả cách mạng, có sổ tay, huy hiệu và phụ kiện theo chủ đề VNR202.",
    "colors": {
      "primary": "#7C2D12",
      "secondary": "#F97316",
      "glow": "#FDBA74",
      "bg": "#FFF7ED",
      "border": "#EA580C",
      "gradient": "linear-gradient(135deg, #7C2D12, #F97316)"
    },
    "skills": {
      "passive": {
        "name": "Ghi nhớ nền tảng",
        "desc": "Tăng lợi thế nhỏ khi trả lời đúng câu hỏi cùng chương.",
        "iconName": "BookOpen",
        "visualDesc": "Vòng sáng kiến thức hiện quanh nhân vật."
      },
      "push": {
        "name": "Đẩy lùi sai lệch",
        "desc": "Đẩy nhẹ đối thủ khỏi vùng tranh chấp câu hỏi.",
        "iconName": "Zap",
        "visualDesc": "Làn sóng ánh sáng phóng ra phía trước."
      },
      "double": {
        "name": "Lập luận kép",
        "desc": "Nhân đôi điểm cho câu trả lời đúng tiếp theo.",
        "iconName": "Brain",
        "visualDesc": "Hai thẻ kiến thức xoay quanh nhân vật."
      },
      "dizzy": {
        "name": "Nhiễu mốc thời gian",
        "desc": "Làm chậm đối thủ trong thời gian ngắn.",
        "iconName": "Clock",
        "visualDesc": "Các mốc năm xoay quanh đối thủ."
      },
      "ultimate": {
        "name": "Thành lũy Nghệ Tĩnh",
        "desc": "Tạo hiệu ứng mạnh hỗ trợ đội trong thử thách kế tiếp.",
        "iconName": "Flag",
        "visualDesc": "Lá cờ phát sáng và tạo vùng hỗ trợ."
      }
    },
    "statLabels": {
      "hp": "Máu rất cao",
      "speed": "Tốc độ thấp",
      "damage": "Sát thương vừa"
    },
    "accessories": [
      "huy hiệu 1930",
      "túi tài liệu",
      "khăn đỏ"
    ]
  },
  "2": {
    "id": 2,
    "name": "Sóc Tốc Ký",
    "animalType": "Sóc",
    "role": "Speedster",
    "roleVi": "Tốc độ cao",
    "iconName": "Zap",
    "description": "Đại diện cho khả năng nắm bắt thời cơ, di chuyển nhanh và phù hợp thử thách timeline.",
    "shortDesc": "Nhanh, linh hoạt, chớp thời cơ.",
    "outfit": "Trang phục học giả cách mạng, có sổ tay, huy hiệu và phụ kiện theo chủ đề VNR202.",
    "colors": {
      "primary": "#1D4ED8",
      "secondary": "#60A5FA",
      "glow": "#BFDBFE",
      "bg": "#EFF6FF",
      "border": "#2563EB",
      "gradient": "linear-gradient(135deg, #1D4ED8, #60A5FA)"
    },
    "skills": {
      "passive": {
        "name": "Ghi nhớ nền tảng",
        "desc": "Tăng lợi thế nhỏ khi trả lời đúng câu hỏi cùng chương.",
        "iconName": "BookOpen",
        "visualDesc": "Vòng sáng kiến thức hiện quanh nhân vật."
      },
      "push": {
        "name": "Đẩy lùi sai lệch",
        "desc": "Đẩy nhẹ đối thủ khỏi vùng tranh chấp câu hỏi.",
        "iconName": "Zap",
        "visualDesc": "Làn sóng ánh sáng phóng ra phía trước."
      },
      "double": {
        "name": "Lập luận kép",
        "desc": "Nhân đôi điểm cho câu trả lời đúng tiếp theo.",
        "iconName": "Brain",
        "visualDesc": "Hai thẻ kiến thức xoay quanh nhân vật."
      },
      "dizzy": {
        "name": "Nhiễu mốc thời gian",
        "desc": "Làm chậm đối thủ trong thời gian ngắn.",
        "iconName": "Clock",
        "visualDesc": "Các mốc năm xoay quanh đối thủ."
      },
      "ultimate": {
        "name": "Lệnh Tổng khởi nghĩa",
        "desc": "Tạo hiệu ứng mạnh hỗ trợ đội trong thử thách kế tiếp.",
        "iconName": "Flag",
        "visualDesc": "Lá cờ phát sáng và tạo vùng hỗ trợ."
      }
    },
    "statLabels": {
      "hp": "Máu thấp",
      "speed": "Tốc độ rất cao",
      "damage": "Sát thương thấp"
    },
    "accessories": [
      "cuộn timeline",
      "bút tốc ký",
      "kính học giả"
    ]
  },
  "3": {
    "id": 3,
    "name": "Mèo Biện Luận",
    "animalType": "Mèo",
    "role": "Balanced",
    "roleVi": "Cân bằng",
    "iconName": "Brain",
    "description": "Đại diện cho tư duy phân tích văn kiện, phù hợp câu hỏi so sánh và nhận xét.",
    "shortDesc": "Cân bằng, phân tích tốt.",
    "outfit": "Trang phục học giả cách mạng, có sổ tay, huy hiệu và phụ kiện theo chủ đề VNR202.",
    "colors": {
      "primary": "#4C1D95",
      "secondary": "#A78BFA",
      "glow": "#DDD6FE",
      "bg": "#F5F3FF",
      "border": "#7C3AED",
      "gradient": "linear-gradient(135deg, #4C1D95, #A78BFA)"
    },
    "skills": {
      "passive": {
        "name": "Ghi nhớ nền tảng",
        "desc": "Tăng lợi thế nhỏ khi trả lời đúng câu hỏi cùng chương.",
        "iconName": "BookOpen",
        "visualDesc": "Vòng sáng kiến thức hiện quanh nhân vật."
      },
      "push": {
        "name": "Đẩy lùi sai lệch",
        "desc": "Đẩy nhẹ đối thủ khỏi vùng tranh chấp câu hỏi.",
        "iconName": "Zap",
        "visualDesc": "Làn sóng ánh sáng phóng ra phía trước."
      },
      "double": {
        "name": "So sánh văn kiện",
        "desc": "Nhân đôi điểm cho câu trả lời đúng tiếp theo.",
        "iconName": "Brain",
        "visualDesc": "Hai thẻ kiến thức xoay quanh nhân vật."
      },
      "dizzy": {
        "name": "Nhiễu mốc thời gian",
        "desc": "Làm chậm đối thủ trong thời gian ngắn.",
        "iconName": "Clock",
        "visualDesc": "Các mốc năm xoay quanh đối thủ."
      },
      "ultimate": {
        "name": "Chớp thời cơ",
        "desc": "Tạo hiệu ứng mạnh hỗ trợ đội trong thử thách kế tiếp.",
        "iconName": "Flag",
        "visualDesc": "Lá cờ phát sáng và tạo vùng hỗ trợ."
      }
    },
    "statLabels": {
      "hp": "Máu vừa",
      "speed": "Tốc độ vừa",
      "damage": "Sát thương vừa"
    },
    "accessories": [
      "sổ Cương lĩnh",
      "bút máy",
      "nơ học giả"
    ]
  },
  "4": {
    "id": 4,
    "name": "Rùa Hộ Mệnh",
    "animalType": "Rùa",
    "role": "Defender",
    "roleVi": "Phòng thủ",
    "iconName": "Shield",
    "description": "Đại diện cho bài học xây dựng tổ chức và bảo toàn lực lượng, mạnh về hỗ trợ và phòng thủ.",
    "shortDesc": "Phòng thủ, hỗ trợ, giữ điểm.",
    "outfit": "Trang phục học giả cách mạng, có sổ tay, huy hiệu và phụ kiện theo chủ đề VNR202.",
    "colors": {
      "primary": "#166534",
      "secondary": "#22C55E",
      "glow": "#BBF7D0",
      "bg": "#F0FDF4",
      "border": "#16A34A",
      "gradient": "linear-gradient(135deg, #166534, #22C55E)"
    },
    "skills": {
      "passive": {
        "name": "Ghi nhớ nền tảng",
        "desc": "Tăng lợi thế nhỏ khi trả lời đúng câu hỏi cùng chương.",
        "iconName": "BookOpen",
        "visualDesc": "Vòng sáng kiến thức hiện quanh nhân vật."
      },
      "push": {
        "name": "Đẩy lùi sai lệch",
        "desc": "Đẩy nhẹ đối thủ khỏi vùng tranh chấp câu hỏi.",
        "iconName": "Zap",
        "visualDesc": "Làn sóng ánh sáng phóng ra phía trước."
      },
      "double": {
        "name": "Lập luận kép",
        "desc": "Nhân đôi điểm cho câu trả lời đúng tiếp theo.",
        "iconName": "Brain",
        "visualDesc": "Hai thẻ kiến thức xoay quanh nhân vật."
      },
      "dizzy": {
        "name": "Nhiễu mốc thời gian",
        "desc": "Làm chậm đối thủ trong thời gian ngắn.",
        "iconName": "Clock",
        "visualDesc": "Các mốc năm xoay quanh đối thủ."
      },
      "ultimate": {
        "name": "Pác Pó phòng tuyến",
        "desc": "Tạo hiệu ứng mạnh hỗ trợ đội trong thử thách kế tiếp.",
        "iconName": "Flag",
        "visualDesc": "Lá cờ phát sáng và tạo vùng hỗ trợ."
      }
    },
    "statLabels": {
      "hp": "Máu cao",
      "speed": "Tốc độ thấp",
      "damage": "Sát thương thấp"
    },
    "accessories": [
      "mai bản đồ",
      "sách nhỏ",
      "đèn học"
    ]
  }
};

export function getCharacterData(id) {
  return CHARACTER_DATA[id] || CHARACTER_DATA[1];
}

export function getAllCharacters() {
  return Object.values(CHARACTER_DATA);
}
