import { sendInlineKeyboard, sendLocation, sendVideo, sendPhoto, sendDocument } from './senders.js';

export default class Sites {
  static info = {
    shohona: {
      name: 'ЖК "Shohona" | Chilonzor 9',
      video: 'BAACAgIAAxkBAAEIMVVf3fBflGhb6D1uGSh_naAy-TanOQAC3AcAAmtkoUmDx4BkjnEvqR4E',
      description: 'Ж/К " Shohona"\n\nКурилишимиз 2022 йил 1, 2 - чоракларда куриб тугалланиш мулжалланган умумий майдон 0,4 гектарда жойлашган. Умумий 5 та подезд 201 та квартирадан 1, 2, 3, 4 хонадан иборат 39,5 квадрат метрдан 117 метр квадратгача. 9 этажлик килиб куриш мулжалланган. Батафсил маьлумотларни Сотув булимларимиздан олишингиз мумкун.',
      location: [41.286218, 69.202932], // [latitude, longtitude]
  
      catalog: {
        file_id: 'BQACAgIAAxkBAAEII0df15KpgqklqyUoG3CwEssoSZd28wACcAwAAh3yuUrAPQoi-F-kMh4E',
        description: '',
      },
  
      prices: {
        file_id: '',
        description: '',
      },
  
      discounts: {
        file_id: 'BQACAgIAAxkBAAEII0df15KpgqklqyUoG3CwEssoSZd28wACcAwAAh3yuUrAPQoi-F-kMh4E',
        description: '',
      },
    },
    farhod: {
      name: 'ЖК "Farhod" | Uchtepa 12', // readable name
      video: 'BAACAgIAAxkBAAEIE-xfz60ECr1H_W0BAAHfAk6S8uNL73oAAtwFAAIokiFKXoJe6qJRHRUeBA',
      description: 'Ж/К "Farhod"\n\nКурилишимиз 2021 йил 2 - чоракда тугалланиш мулжалланган умумий майдон 0,7 гектарда жойлашган. Умумий 7 та подезд 234 та квартирадан 1, 2, 3 хонадан иборат 46 метр квадратдан 93,5 метр квадратгача. 9 этажлик килиб курилган. Батафсил маьлумотларни Сотув булимларимиздан олишингиз мумкун.',
      location: [41.281519, 69.187071], // [latitude, longtitude]
  
      catalog: {
        file_id: 'BQACAgIAAxkBAAEII0Vf15KAu53t0AjWzWsEDu4hLWGVSgACbwwAAh3yuUqBvjawNOFAFB4E',
        description: '',
      },
  
      prices: {
        file_id: 'BQACAgIAAxkBAAEINEBf35lGofUDHeKwtyeuB_zqJvXmKwACiQ0AAlSo-EojC37DBfOX-h4E',
        description: '',
      },
  
      discounts: {
        file_id: '',
        description: '',
      },
    },
    grand_park: {
      name: 'ЖК "Grand Park" | Chilonzor 17',
      video: 'BAACAgIAAxkBAAEIMVtf3fDAvRpuFDY2L4Yp9bkhKSImQgACSggAAs0lEUrzb4cfWc6O-h4E',
      description: 'Ж/К "Chilonzor Grand Park"\n\nКурилишимиз 2021 йил 1 - чоракда тугалланиш мулжалланган умумий майдон 1,05 гектарда жойлашган . Умумуй 12 та подезд 378 та квартирадан  1, 2, 3 хонадан иборат 39,52 квадрат метрдан 119,03 метр квадратгача. 7 - этажни танласангиз 8-этаж кушиб берилади. Батафсил маьлумотларни Сотув булимларимиздан олишингиз мумкун.',
      location: [41.271168, 69.194307], // [latitude, longtitude]
  
      catalog: {
        file_id: 'BQACAgIAAxkBAAEII0lf15Lb_a4NDKJTj7c5Xob2l2UurwACdAwAAh3yuUrHPh7z6-OmSB4E',
        description: '',
      },
  
      prices: {
        file_id: 'BQACAgIAAxkBAAEINEJf35lPiD3aM3YeiGze4cS41T2byAACig0AAlSo-EoxmJ9CO141Hx4E',
        description: '',
      },
  
      discounts: {
        file_id: '',
        description: '',
      },
    },
  };

  static makeActions() {
    return Object.entries(this.info).reduce((acc, [site, params]) => {
      const { video, description, location: [latitude, longtitude] } = params;
      const { catalog, prices, discounts } = params;
    
      return {
        ...acc,
        [site]: (ctx) => {
          ctx.deleteMessage();
      
          const chatId = ctx.chat.id;
      
          
          const elements = [
            [
              ['Narxlar | Цены', `${site}Price`],
              ['Chegirmalar | Получить скидку', `${site}Discount`]
            ],
            [
              ['Katalog | Каталог', `${site}Catalog`],
              ['Uy lokatsiyasi | Локация объекта', `${site}Location`],
            ],
            [
              ['Obyektlarga qaytish | Назад к объектам', 'sites'],
            ],
          ];
          video
            ? sendVideo(chatId, video, description, elements)
            : sendPhoto(chatId, photo, description, elements); // in case there is no video
        },
      
        [`${site}Price`]: (ctx) => {
          ctx.deleteMessage();
          const { file_id, description } = prices;
          const elements = [
            [
              ['Orqaga | Назад', site],
            ],
          ];
          const chatId = ctx.chat.id;
          sendDocument(chatId, file_id, description, elements);
        },
      
        [`${site}Discount`]: (ctx) => {
      
        },
      
        [`${site}Catalog`]: (ctx) => {
          ctx.deleteMessage();
          const elements = [
            [
              ['Orqaga | Назад', site],
            ],
          ];
          sendDocument(ctx.chat.id, catalog.file_id, catalog.description, elements);
        },
      
        [`${site}Location`]: (ctx) => {
          ctx.deleteMessage();
      
          const elements = [
            [
              ['Orqaga | Назад', site],
            ],
          ];
      
          return sendLocation(ctx.chat.id, latitude, longtitude, elements);
        },
      };
    }, {})
  }
}
