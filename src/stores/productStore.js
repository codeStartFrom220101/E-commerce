import { defineStore } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
      { id: 1, name: '虎虎玩偶', price: 320, sold: 50, createdAt: '2024-04-25', image: 'https://picsum.photos/seed/1/600/400' },
      { id: 2, name: '木頭大象筷架', price: 180, sold: 30, createdAt: '2024-04-20', image: 'https://picsum.photos/seed/2/600/400' },
      { id: 3, name: '愛心河馬搖搖杯', price: 250, sold: 45, createdAt: '2024-04-22', image: 'https://picsum.photos/seed/3/600/400' },
      { id: 4, name: '萌兔擺飾', price: 199, sold: 60, createdAt: '2024-04-23', image: 'https://picsum.photos/seed/4/600/400' },
      { id: 5, name: '超人氣刺蝟', price: 320, sold: 90, createdAt: '2024-04-10', image: 'https://picsum.photos/seed/5/600/400' },
      { id: 6, name: '可愛鴨子組', price: 280, sold: 85, createdAt: '2024-04-12', image: 'https://picsum.photos/seed/6/600/400' },
      { id: 7, name: '療癒白熊', price: 300, sold: 70, createdAt: '2024-04-15', image: 'https://picsum.photos/seed/7/600/400' },
      { id: 8, name: '幸福花鹿', price: 350, sold: 40, createdAt: '2024-04-18', image: 'https://picsum.photos/seed/8/600/400' },
      { id: 9, name: '松鼠小物', price: 260, sold: 55, createdAt: '2024-04-17', image: 'https://picsum.photos/seed/9/600/400' },
      { id: 10, name: '萌虎杯墊組', price: 150, sold: 35, createdAt: '2024-04-19', image: 'https://picsum.photos/seed/10/600/400' },
      { id: 11, name: '森林系筆袋', price: 220, sold: 20, createdAt: '2024-04-21', image: 'https://picsum.photos/seed/11/600/400' },
      { id: 12, name: '胖胖貓擺飾', price: 270, sold: 65, createdAt: '2024-04-16', image: 'https://picsum.photos/seed/12/600/400' },
      { id: 13, name: '療癒狐狸燈', price: 390, sold: 75, createdAt: '2024-04-14', image: 'https://picsum.photos/seed/13/600/400' },
      { id: 14, name: '雲朵羊玩偶', price: 310, sold: 50, createdAt: '2024-04-13', image: 'https://picsum.photos/seed/14/600/400' },
      { id: 15, name: '小熊收納盒', price: 240, sold: 25, createdAt: '2024-04-11', image: 'https://picsum.photos/seed/15/600/400' },
      { id: 16, name: '貓頭鷹杯子', price: 260, sold: 42, createdAt: '2024-04-09', image: 'https://picsum.photos/seed/16/600/400' },
      { id: 17, name: '療癒章魚君', price: 330, sold: 68, createdAt: '2024-04-08', image: 'https://picsum.photos/seed/17/600/400' },
      { id: 18, name: '可愛樹懶', price: 290, sold: 58, createdAt: '2024-04-07', image: 'https://picsum.photos/seed/18/600/400' },
      { id: 19, name: '森林兔夜燈', price: 350, sold: 32, createdAt: '2024-04-06', image: 'https://picsum.photos/seed/19/600/400' },
      { id: 20, name: '迷你長頸鹿', price: 210, sold: 48, createdAt: '2024-04-05', image: 'https://picsum.photos/seed/20/600/400' },
    ]
  }),

  getters: {
    newArrivals: (state) => {
      return [...state.products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
    },
    bestsellers: (state) => {
      return [...state.products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
    }
  }
})
