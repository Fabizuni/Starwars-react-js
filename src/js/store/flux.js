const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			character: [],
			planets: [],
			characterEntity: {},
			planetsEntity: {},
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			addFavorite: (entity, id) => {
				const store = getStore();
				const hasEntity = store.favorites.find(favorite => {
					return id === favorite.id && favorite.entity === entity;
				});

				if (!hasEntity) {
					setStore({ favorites: store.favorites.concat({ entity, id }) });
				}
			},
			removeFavorite: (entity, id) => {
				const store = getStore();
				const filteredFavorites = store.favorites.filter(favorite => {
					return id !== favorite.id;
				});

				setStore({ favorites: filteredFavorites });
			},

			loadSomeData: () => {
				fetch("https://3000-lavender-skink-b7m9ieww.ws-us03.gitpod.io/character")
					.then(res => res.json())
					.then(data => {
						return setStore({ character: data });
					});

				fetch("https://3000-lavender-skink-b7m9ieww.ws-us03.gitpod.io/planets")
					.then(res => res.json())
					.then(data => {
						return setStore({ planets: data });
					});
			},
			fetchEntity: (entity, id) => {
				fetch(`https://3000-lavender-skink-b7m9ieww.ws-us03.gitpod.io/${entity}/${id}`)
					.then(res => res.json())
					.then(data => {
						return setStore({ [`${entity}Entity`]: data });
					});
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
