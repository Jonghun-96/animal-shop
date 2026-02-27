// 1. 폴더 내 모든 이미지를 객체 형태로 가져옴
const imageModules: any = import.meta.glob('../images/animals/*.png', { eager: true });

// 2. 파일명만 키값으로 갖는 깨끗한 객체로 변환
// 예: { "peacock.png": "/assets/peacock.hash.png", ... }
const images: { [key: string]: string } = {};
for (const path in imageModules) {
  const fileName = path.split('/').pop() || ''; 
  images[fileName] = imageModules[path].default;
}



import { Animal } from "../types/animal";


export const animals :Animal[] = [
  {
    id: 1,
    name: `공작새`,
    category: `bird`,
    price: 23500,
    isSpecial: false,
    seedLikes: 329,
    img: images[`peacock.png`],
    description: `내가 제일 화려해`,
    stock: 8
  },
  {
    id: 2,
    name: `오리`,
    category: `bird`,
    price: 17000,
    isSpecial: false,
    seedLikes: 740,
    img: images[`duck.png`],
    description: `뒤뚱뒤뚱 출근 중`,
    stock: 4
  },
  {
    id: 3,
    name: `코끼리`,
    category: `large`,
    price: 22000,
    isSpecial: false,
    seedLikes: 14,
    img: images[`elephant.png`],
    description: `덩치는 제일 큽니다`,
    stock: 10
  },
  {
    id: 4,
    name: `곰`,
    category: `large`,
    price: 19000,
    isSpecial: false,
    seedLikes: 26,
    img: images[`bear.png`],
    description: `보기만 해도 따뜻함`,
    stock: 11
  },
  {
    id: 5,
    name: `기린`,
    category: `large`,
    price: 24000,
    isSpecial: false,
    seedLikes: 33,
    img: images[`giraffe.png`],
    description: `멀리 보는 친구`,
    stock: 10
  },
  {
    id: 6,
    name: `하마`,
    category: `large`,
    price: 20000,
    isSpecial: false,
    seedLikes: 6,
    img: images[`hippo.png`],
    description: `부피만큼 포근함도 큼`,
    stock: 10
  },
  {
    id: 7,
    name: `사자`,
    category: `large`,
    price: 21000,
    isSpecial: false,
    seedLikes: 9,
    img: images[`lion.png`],
    description: `초원의 왕이 되고 싶어`,
    stock: 2
  },
  {
    id: 8,
    name: `펭귄`,
    category: `bird`,
    price: 20000,
    isSpecial: false,
    seedLikes: 556,
    img: images[`penguin.png`],
    description: `빙판 위의 뒤뚱러!`,
    stock: 0
  },
  {
    id: 9,
    name: `여우`,
    category: `medium`,
    price: 19000,
    isSpecial: false,
    seedLikes: 44,
    img: images[`fox.png`],
    description: `여우짓 잘해요`,
    stock: 10
  },
  {
    id: 10,
    name: `거북이`,
    category: `small`,
    price: 18000,
    isSpecial: false,
    seedLikes: 154,
    img: images[`turtle.png`],
    description: `느려도 괜찮아`,
    stock: 0
  },
  {
    id: 11,
    name: `닭`,
    category: `bird`,
    price: 18000,
    isSpecial: false,
    seedLikes: 19,
    img: images[`chicken.png`],
    description: `알 낳고 퇴근합니다`,
    stock: 10
  },
  {
    id: 12,
    name: `양`,
    category: `medium`,
    price: 18000,
    isSpecial: false,
    seedLikes: 338,
    img: images[`sheep.png`],
    description: `포근함 100% 충전`,
    stock: 8
  },
  {
    id: 13,
    name: `너구리`,
    category: `small`,
    price: 18000,
    isSpecial: false,
    seedLikes: 26,
    img: images[`raccoon.png`],
    description: `몰래 간식 숨겨두는 타입`,
    stock: 11
  },
  {
    id: 14,
    name: `브레멘 음악대`,
    category: `large`,
    price: 32000,
    isSpecial: true,
    seedLikes: 30,
    img: images[`bremen_musicians.png`],
    description: `오늘도 연습 중..`,
    stock: 2
  },
  {
    id: 15,
    name: `악어`,
    category: `large`,
    price: 17000,
    isSpecial: false,
    seedLikes: 7,
    img: images[`crocodile.png`],
    description: `악어떼가 나올라`,
    stock: 10
  },
  {
    id: 16,
    name: `돼지`,
    category: `medium`,
    price: 15000,
    isSpecial: false,
    seedLikes: 5,
    img: images[`pig.png`],
    description: `먹고 바로 눕기 장인`,
    stock: 10
  },
  {
    id: 17,
    name: `사막여우`,
    category: `medium`,
    price: 17200,
    isSpecial: false,
    seedLikes:  402,
    img: images[`desert_fox.png`],
    description: `사막의 귀염둥이`,
    stock: 10
  },
  {
    id: 18,
    name: `토끼`,
    category: `small`,
    price: 17000,
    isSpecial: false,
    seedLikes: 427,
    img: images[`rabbit.png`],
    description: `깡총깡총 잘 뛰어다님`,
    stock: 11
  },
  {
    id: 19,
    name: `다람쥐`,
    category: `small`,
    price: 18800,
    isSpecial: false,
    seedLikes: 890,
    img: images[`squirrel.png`],
    description: `볼따구 안에 도토리 있음`,
    stock: 15
  },
  {
    id: 20,
    name: `물개`,
    category: `medium`,
    price: 18000,
    isSpecial: false,
    seedLikes: 563,
    img: images[`seal.png`],
    description: `박수 담당입니다`,
    stock: 1
  },
  {
    id: 21,
    name: `올빼미`,
    category: `bird`,
    price: 18300,
    isSpecial: false,
    seedLikes: 12,
    img: images[`owl.png`],
    description: `밤샘 감시 중`,
    stock: 10
  },
  {
    id: 22,
    name: `족제비`,
    category: `small`,
    price: 19000,
    isSpecial: false,
    seedLikes: 27,
    img: images[`ferret.png`],
    description: `행복한 세상이 좋아`,
    stock: 10
  },
  {
    id: 23,
    name: `고양이`,
    category: `small`,
    price: 18500,
    isSpecial: false,
    seedLikes: 335,
    img: images[`cat.png`],
    description: `냥냥펀치!`,
    stock: 0
  },
  {
    id: 24,
    name: `루돌프와 산타`,
    category: `large`,
    price: 40000,
    isSpecial: true,
    seedLikes: 108,
    img: images[`rudolph_santa.png`],
    description: `연말에 제일 바빠요`,
    stock: 7
  },
  {
    id: 25,
    name: `강아지`,
    category: `small`,
    price: 18100,
    isSpecial: false,
    seedLikes: 34,
    img: images[`puppy.png`],
    description: `고양이 라이벌입니다`,
    stock: 2
  },
  {
    id: 26,
    name: `카피바라`,
    category: `small`,
    price: 17400,
    isSpecial: false,
    seedLikes: 16,
    img: images[`capybara.png`],
    description: `온순하고 느긋합니다`,
    stock: 10
  },
  {
    id: 27,
    name: `말`,
    category: `large`,
    price: 19000,
    isSpecial: false,
    seedLikes: 9,
    img: images[`horse.png`],
    description: `마라톤 1등`,
    stock: 12
  },
  {
    id: 28,
    name: `참새`,
    category: `bird`,
    price: 19000,
    isSpecial: false,
    seedLikes: 39,
    img: images[`sparrow.png`],
    description: `뭐든지 잘 주워먹음`,
    stock: 3
  },
  {
    id: 29,
    name: `개구리`,
    category: `small`,
    price: 17400,
    isSpecial: false,
    seedLikes: 48,
    img: images[`frog.png`],
    description: `비오는 날이 좋아`,
    stock: 10
  },
  {
    id: 30,
    name: `독수리`,
    category: `bird`,
    price: 20000,
    isSpecial: false,
    seedLikes: 17,
    img: images[`eagle.png`],
    description: `하늘의 제왕`,
    stock: 16
  },
  {
    id: 31,
    name: `생쥐`,
    category: `small`,
    price: 17500,
    isSpecial: false,
    seedLikes: 130,
    img: images[`mouse.png`],
    description: `이름은 제리일거 같네요`,
    stock: 0
  },
  {
    id: 32,
    name: `백조`,
    category: `bird`,
    price: 19000,
    isSpecial: false,
    seedLikes: 224,
    img: images[`swan.png`],
    description: `우아함의 끝판왕`,
    stock: 10
  },
  {
    id: 33,
    name: `앵무새`,
    category: `bird`,
    price: 19000,
    isSpecial: false,
    seedLikes: 347,
    img: images[`parrot.png`],
    description: `말동무가 되어줍니다`,
    stock: 4
  },  
  {
    id: 34,
    name: `타조`,
    category: `bird`,
    price: 17000,
    isSpecial: false,
    seedLikes: 92,
    img: images[`ostrich.png`],
    description: `날지는 못한다네요`,
    stock: 10
  },  
  {
    id: 35,
    name: `플라밍고`,
    category: `bird`,
    price: 17000,
    isSpecial: false,
    seedLikes: 130,
    img: images[`flamingo.png`],
    description: `모델포즈를 잘합니다`,
    stock: 7
  },  
  {
    id: 36,
    name: `원숭이`,
    category: `small`,
    price: 15500,
    isSpecial: false,
    seedLikes: 332,
    img: images[`monkey.png`],
    description: `쌀을 잘 팔아요`,
    stock: 0
  },  
  {
    id: 37,
    name: `코뿔소`,
    category: `large`,
    price: 18000,
    isSpecial: false,
    seedLikes: 22,
    img: images[`rhino.png`],
    description: `뿔이 멋진 강력한 탱커`,
    stock: 10
  },  
  {
    id: 38,
    name: `미어캣`,
    category: `small`,
    price: 19000,
    isSpecial: false,
    seedLikes: 370,
    img: images[`meerkat.png`],
    description: `당신을 지켜봅니다`,
    stock: 13
  },  
  {
  id: 39,
  name: `봄꽃사슴`,
  category: `medium`,
  price: 39000,
  isSpecial: true,
  seedLikes: 188,
  img: images[`springflower_deer.png`],
  description: `봄내음을 품은 사슴`,
  stock: 21
},    
  {
    id: 40,
    name: `알파카`,
    category: `medium`,
    price: 18000,
    isSpecial: false,
    seedLikes: 866,
    img: images[`alpaca.png`],
    description: `침을 자주 뱉습니다`,
    stock: 14
  },    
  {
    id: 41,
    name: `낙타`,
    category: `medium`,
    price: 16800,
    isSpecial: false,
    seedLikes: 47,
    img: images[`camel.png`],
    description: `사막의 택시`,
    stock: 5
  },
  {
    id: 42,
    name: `고슴도치`,
    category: `small`,
    price: 17900,
    isSpecial: false,
    seedLikes: 32,
    img: images[`hedgehog.png`],
    description: `따봉도치야 고마워`,
    stock: 5
  },
  {
    id: 43,
    name: `딱따구리`,
    category: `bird`,
    price: 19900,
    isSpecial: false,
    seedLikes: 240,
    img: images[`woodpecker.png`],
    description: `딱딱딱딱딱딱`,
    stock: 2
  },  
  {
    id: 44,
    name: `코알라`,
    category: `small`,
    price: 18800,
    isSpecial: false,
    seedLikes: 26,
    img: images[`koala.png`],
    description: `잠이 많아요`,
    stock: 9
  },
  {
    id: 45,
    name: `젖소`,
    category: `large`,
    price: 16500,
    isSpecial: false,
    seedLikes: 11,
    img: images[`milkcow.png`],
    description: `4구 대형 우유통 보유`,
    stock: 20
  },
  {
    id: 46,
    name: `치타`,
    category: `medium`,
    price: 17800,
    isSpecial: false,
    seedLikes: 19,
    img: images[`cheetah.png`],
    description: `동물계의 우사인볼트`,
    stock: 10
  }, 
  {
    id: 47,
    name: `호랑이`,
    category: `large`,
    price: 20800,
    isSpecial: false,
    seedLikes: 37,
    img: images[`tiger.png`],
    description: `떡 하나 주면 안 잡아 먹지`,
    stock: 10
  },  
  {
    id: 48,
    name: `구미호`,
    category: `large`,
    price: 33000,
    isSpecial: true,
    seedLikes: 121,
    img: images[`gumiho.png`],
    description: `아홉 꼬리를 가진 요물`,
    stock: 10
  },  
  {
    id: 49,
    name: `해태`,
    category: `large`,
    price: 35000,
    isSpecial: true,
    seedLikes: 366,
    img: images[`haetae.png`],
    description: `불을 뿜는 수호신`,
    stock: 11
  },  
  {
    id: 50,
    name: `해치`,
    category: `large`,
    price: 35000,
    isSpecial: true,
    seedLikes: 281,
    img: images[`haechi.png`],
    description: `용맹함과 지혜의 상징`,
    stock: 7
  },  
  {
    id: 51,
    name: `상어`,
    category: `large`,
    price: 16500,
    isSpecial: false,
    seedLikes: 40,
    img: images[`shark.png`],
    description: `바다의 포식자`,
    stock: 4
  }, 
  {
    id: 52,
    name: `스컹크`,
    category: `small`,
    price: 18800,
    isSpecial: false,
    seedLikes: 70,
    img: images[`skunk.png`],
    description: `향기(?)를 조심하세요`,
    stock: 15
  },
  {
    id: 53,
    name: `수달`,
    category: `small`,
    price: 21500,
    isSpecial: false,
    seedLikes: 174,
    img: images[`otter.png`],
    description: `물놀이 전문가`,
    stock: 17
  },
  {
    id: 54,
    name: `사슴`,
    category: `medium`,
    price: 16000,
    isSpecial: false,
    seedLikes: 71,
    img: images[`deer.png`],
    description: `숲 속의 평화로운 친구`,
    stock: 8
  },
  {
    id: 55,
    name: `판다`,
    category: `large`,
    price: 24500,
    isSpecial: false,
    seedLikes: 558,
    img: images[`panda.png`],
    description: `쿵푸도 잘함`,
    stock: 0
  },
]
