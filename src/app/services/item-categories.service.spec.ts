import { TestBed, inject } from '@angular/core/testing';

import { ItemCategoriesService } from './item-categories.service';

describe('ItemCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemCategoriesService]
    });
  });

  it('should be created', inject([ItemCategoriesService], (service: ItemCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});


const CATEGORIES = {
  'Kirana': {
    'Dal': {
      'Tuar': {},
      'Chana': {},
      'Moong': {},
      'Arhar': {}
    },

    'Aata': {
      'Makki': {},
      'Wheat': {}
    },
    'Rice': {
      'Basmati': {},
    },
    'Dry Fruits': {
      'Kaju': {},
      'Akhrot': {},
      'Pista': {},
      'Kishmish': {},
      'Badam': {},
      'Alsi': {},
      'Anjeer': {}
    },
    'Edible Oil':
    {
      'Sunflower': {},
      'Moongfali': {},
      'Sarso': {}
    },
    'Ghee': {},
    'Masala': {
      'Garam Masala': {}
    },
    'Sugar and Salt': {}
  },
  'Vegetables and Fruits': {
    'Fruits': {},
    'Vegetables': {}
  },
  'Beverages': {
    'Soft Drinks': {},
    'Juices': {},
    'Tea & Coffee': {
      'Tea': {
        'Green Tea': {
          'Ginger': {},
          'Lemon': {},
          'Tulsi': {},
        },
      },
      'Coffee': {

      }
    },
    'Health & Energy Drinks': {
    },

  },
  'Stationary & Books': {

    'Pencil, Rubber, Pen & Colors': {
      'Pencil': {

      },
      'Rubber': {

      },
      'Pen': {
      },
    },
    'Color': {

      'Sketch Pen': {

      },
      'Water Color': {

      },
      'Pencil Colors': {

      },
      'Wax Crayons': {

      },
    },
    'Registers & Copies': {

    },
    'Box': {
    },
    'Kids\' Books': {
      'Reading book': {

      },
      'Writing book': {

      }

    },
  },
  'Home care': {
    'Cleaners': {
      'Toilet cleaners': {

      },
      'Floor Cleaners': {

      },
      'Multipurpose cleaners': {

      }
    },
    'Dish Washers': {

      'Dish Washing Bar': {

      },
      'Dish Washing Jels & Powder': {

      },
      'Scrubbers & Cleaning Aids': {

      }
    },

    'Cleaning Tools & Brushes': {

      'Jadhu & Pocha': {

      },

      'Cleaning Cloths & Pads': {

      },
      'Dustbins': {

      },
      'Dustpans': {

      },
      'Other Brushes': {

      }
    },
    'Pooja Needs': {

      'Incense sticks': {

      },
      'Other pooja items': {

      }
    },
    'Repellents': {
      'Mosquito Repellents': {

      },
      'Sprays': {

      },
      'Creams & other repellents': {

      }
    },
    'Home & Car Fresheners': {

      'Air Fresheners': {

      },
      'Car Fresheners': {

      }
    },

    'Tissues & Disposables': {
      'Kitchen & dining disposables': {

      },

      'Toilet & others disposables': {

      }

    },
    'Premium Home Care': {
      'Fabric care': {

      },
      'Wipes Cleaners & Others': {

      }

    },

    'Shoe Care': {
      'Shoe Polish': {

      },
    }




  }

}





}


