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
			loadFavorite: () => {
				const testPrivado = () => {
					//const data = { object_id: id, tipo: entity };
					fetch("https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/users/favorites", {
						method: "GET",
						//mode: "cors",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + sessionStorage.getItem("u_token")
						}
						//body: JSON.stringify(data)
					})
						.then(response => response.json())
						.then(data => {
							console.log("Success:", data);
							// sessionStorage.setItem("u_token", data.token);
							// setRedirect(true);
						})
						.catch(error => {
							console.error("Error:", error);
						});
				};
				testPrivado();
				const store = getStore();
			},

			addFavorite: (entity, id) => {
				const testPrivado = () => {
					const data = { object_id: id, tipo: entity };
					fetch("https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/users/favorites", {
						method: "POST",
						//mode: "cors",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + sessionStorage.getItem("u_token")
						},
						body: JSON.stringify(data)
					})
						.then(response => response.json())
						.then(data => {
							console.log("Success:", data);
							// sessionStorage.setItem("u_token", data.token);
							// setRedirect(true);
						})
						.catch(error => {
							console.error("Error:", error);
						});
				};
				testPrivado();
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
				fetch("https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/character")
					.then(res => res.json())
					.then(data => {
						return setStore({ character: data });
					});

				fetch("https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/planets")
					.then(res => res.json())
					.then(data => {
						return setStore({ planets: data });
					});
			},
			fetchEntity: (entity, id) => {
				fetch(`https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/${entity}/${id}`)
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
