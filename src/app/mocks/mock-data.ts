export const MOCK_USERS = {
  data: [
  			{ id: 1, name: 'Ana Souza', email: 'ana.souza@email.com' },
  			{ id: 2, name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com' },
  			{ id: 3, name: 'Mariana Lima', email: 'mariana.lima@email.com' }
		],
	success: true,
  	message: '',
  	errors: []		
};

export const MOCK_PRODUCTS = { 
	data: [
	  {
		id: 1,
		name: "Cerveja Puro Malte",
		price: 9.99,
		image: "https://example.com/cerveja.jpg",
		description: "Cerveja puro malte premium, 600ml.",
		category: "Cervejas",
		rating: {
		  rate: 4.5,
		  count: 120
		}
	  },
	  {
		id: 2,
		name: "Cerveja IPA Artesanal",
		price: 14.99,
		image: "https://example.com/ipa.jpg",
		description: "Cerveja IPA de alta fermentação, amargor intenso, 500ml.",
		category: "Cervejas",
		rating: {
		  rate: 4.7,
		  count: 95
		}
	  },
	  {
		id: 3,
		name: "Cerveja Lager Premium",
		price: 8.99,
		image: "https://example.com/lager.jpg",
		description: "Cerveja lager leve e refrescante, 600ml.",
		category: "Cervejas",
		rating: {
		  rate: 4.6,
		  count: 130
		}
	  },
	  {
		id: 4,
		name: "Cerveja Weiss Alemã",
		price: 12.99,
		image: "https://example.com/weiss.jpg",
		description: "Cerveja de trigo com notas frutadas, 500ml.",
		category: "Cervejas",
		rating: {
		  rate: 4.8,
		  count: 110
		}
	  },
	  {
		id: 5,
		name: "Vinho Tinto Seco",
		price: 59.99,
		image: "https://example.com/vinho.jpg",
		description: "Vinho tinto seco de alta qualidade, 750ml.",
		category: "Vinhos",
		rating: {
		  rate: 4.7,
		  count: 150
		}
	  },
	  {
		id: 6,
		name: "Vinho Branco Chardonnay",
		price: 49.99,
		image: "https://example.com/vinho-branco.jpg",
		description: "Vinho branco suave e aromático, 750ml.",
		category: "Vinhos",
		rating: {
		  rate: 4.6,
		  count: 100
		}
	  }
	],
	success: true,
  	message: '',
  	errors: []
  };
  

export const MOCK_CATEGORIES = {
  data: ['Cervejas', 'Vinhos'],
  success: true,
  message: '',
  errors: []
};